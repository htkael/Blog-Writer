import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { setIsAuthenticated, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      if (data.errors) {
        const errorMessages = data.errors.map((err) => err.msg || err);
        console.log("errors", errorMessages);
        setError(errorMessages);
        return;
      }
      console.log("Login successful", data);
      localStorage.setItem("user", JSON.stringify(data.user.username));
      setIsAuthenticated(true);
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to login");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && (
        <ul className="error-list">
          {error.map((errorMsg, index) => {
            return <li key={index}>{errorMsg}</li>;
          })}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Need an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
