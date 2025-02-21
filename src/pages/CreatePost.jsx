import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, createPost, updatePost } from "../services/api";

const CreatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const data = await getPost(id);
        console.log("Found existing post, populating fields...");
        console.log("Received data:", data);
        const post = data.post;
        setFormData({
          title: post.title,
          content: post.content,
        });
      } catch (err) {
        setError(err.message || "Failed to fetch post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (id) {
        await updatePost(id, formData);
      } else {
        await createPost(formData);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create/edit post");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="create-post">
      <h1>{id ? "Edit Post" : "Create Post"}</h1>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="form-control"
            rows="10"
          />
        </div>
        <div className="button-group">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="cancel-button"
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} className="submit-button">
            {id ? "Update Post" : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
