import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(username, password, passwordConf, adminCode);
      if (data.errors) {
        const errorMessages = data.errors.map((error) => error.msg || error);
        console.log("errors", errorMessages);
        setError(errorMessages);
        return;
      }
      console.log("Signup successful", data);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to signup"
      );
    }
  };

  return (
    <div>
      <h1>Signup</h1>
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
        <div>
          <label htmlFor="password_conf">Confirm Password</label>
          <input
            type="password"
            name="password_conf"
            id="password_conf"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="adminCode">Admin Code:</label>
          <input
            type="password"
            name="adminCode"
            id="adminCode"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
