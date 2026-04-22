import "./AdminLogin.css";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;
const LOGIN_URL = `${API_BASE}/auth/login`;

function AdminLogin() {
  // Hooks
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Used to disable the button
  const navigate = useNavigate();
  // ///////////////////////////////////////////////////////

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const logInSubmit = async (e) => {
    e.preventDefault();

    // Removed console.log for security - do not log login credentials

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Get the token and user object
        const { token, user } = data;

        // 2. Save the data to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("adminUser", JSON.stringify(user));

        // Update UI message and clear form
        setMessage("Login Successful! Redirecting...");
        setLoginData({ email: "", password: "" });

        // 3. Redirect to the protected admin home page
        setTimeout(() => {
          navigate("/admin/home", { replace: true });
        }, 500);
      } else {
        // 1. Get the error message from the JSON body (data.error)
        const errorMessage = data.error || "An unknown error occurred.";

        // 2. Display the specific error message to the user
        setMessage(`Login Failed: ${errorMessage}`);

        // 3. Clear the password field (good security practice)
        setLoginData((prevData) => ({
          ...prevData,
          password: "", // Clear password on failed attempt
        }));
      }
    } catch (error) {
      // 1. Log the full error for developer debugging
      console.error("Admin log in error Network or connection error - ", error);

      // 2. Provide a user-friendly message
      setMessage(
        "Could not connect to the server. Please check your network connection.",
      );
    } finally {
      setIsLoading(false); // Re-enable the button
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-bg"></div>

      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin Login</h1>

        <form className="admin-login-form" onSubmit={logInSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={loginData.email}
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={loginData.password}
              placeholder="Password"
            />
          </div>

          <button className="admin-login-btn" disabled={isLoading}>
            <LogIn size={18} style={{ marginRight: "8px" }} />
            {isLoading ? "Processing..." : "Login"}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
