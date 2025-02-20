import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/create">Create Post</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navigation;
