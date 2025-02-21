import PropTypes from "prop-types";

const PostCard = ({ post, onEdit, onDelete }) => (
  <div className="post-card">
    <div className="post-header">
      <h2>{post.title}</h2>
      <div className="post-actions">
        <button onClick={() => onEdit(post.id)}>Edit</button>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </div>
    <p>{post.content}</p>
    <div className="post-footer">
      <span>By {post.author.username} </span>
      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
    </div>
  </div>
);

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostCard;
