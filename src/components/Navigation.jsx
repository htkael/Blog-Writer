import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, isAuthenticated, user, setUser } = useAuth();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.username}</span>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/create">Create Post</Link>
            <button onClick={() => logout()}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
