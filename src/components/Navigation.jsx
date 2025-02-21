import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/create">Create Post</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
      <button onClick={() => logout()}>Log Out</button>
    </nav>
  );
};

export default Navigation;
