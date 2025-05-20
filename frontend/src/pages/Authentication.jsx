import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar } from "@mui/material";
import "./../App.css";

export default function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [formState, setFormState] = useState(0);
  const [open, setOpen] = useState(false);

  const { handleRegister, handleLogin } = useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        // login
        await handleLogin(username, password);
      } else if (formState === 1) {
        let result = await handleRegister(name, username, password);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      let message = err?.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

  return (
    <div>
      <div>
        <Button
          variant={formState === 0 ? "contained" : ""}
          onClick={() => {
            setFormState(0);
          }}
        >
          Sign In
        </Button>
        <Button
          variant={formState === 1 ? "contained" : ""}
          onClick={() => {
            setFormState(1);
          }}
        >
          Sign Up
        </Button>
      </div>

      <div>
        {formState === 1 ? (
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Full Name"
            name="username"
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <></>
        )}

        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={username}
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />

        <p style={{ color: "red" }}>{error}</p>

        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleAuth}
        >
          {formState === 0 ? "Login " : "Register"}
        </Button>
      </div>

      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </div>
  );
}
