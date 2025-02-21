import { useState, useEffect } from "react";
import { getPosts } from "../services/api";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import "../services/api";
import { deletePost } from "../services/api";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log("Posts:", posts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.posts);
      } catch (err) {
        setError(err.message || "Failed to fetch posts");
      }
    };
    fetchPosts();
  }, []);

  const handleEdit = async (id) => {
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      const data = await deletePost(id);
      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
      console.log("Delete Successful", data);
    } catch (err) {
      setError(err.message || "Failed to delete post");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
