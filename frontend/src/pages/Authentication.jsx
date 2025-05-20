import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState(0); // 0 = login, 1 = signup

  const { handleRegister, handleLogin } = useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        let result = await handleRegister(name, username, password);
        setMessage(result);
        setError("");
        setFormState(0);
        setUsername("");
        setPassword("");
        setName("");
      }
    } catch (err) {
      let message = err?.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

  return (
    <div className="authPageContainer">
      <div className="authCard">
        <h2 className="authTitle">{formState === 0 ? "Sign In" : "Sign Up"}</h2>

        <div className="authToggle">
          <button
            className={
              formState === 0 ? "authToggleBtn active" : "authToggleBtn"
            }
            onClick={() => setFormState(0)}
          >
            Sign In
          </button>
          <button
            className={
              formState === 1 ? "authToggleBtn active" : "authToggleBtn"
            }
            onClick={() => setFormState(1)}
          >
            Sign Up
          </button>
        </div>

        <form className="authForm" onSubmit={(e) => e.preventDefault()}>
          {formState === 1 && (
            <input
              type="text"
              className="authInput"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="text"
            className="authInput"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="authInput"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="authError">{error}</p>}

          <button className="authSubmitBtn" onClick={handleAuth}>
            {formState === 0 ? "Login" : "Register"}
          </button>

          {message && <p className="authSuccess">{message}</p>}
        </form>
      </div>
    </div>
  );
}
