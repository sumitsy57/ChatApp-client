import React, { useState } from "react";
import { useInputValidation } from "6pp";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { userExists } from "../redux/reducers/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  // Login inputs
  const username = useInputValidation("");
  const password = useInputValidation("");

  // Signup inputs
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const newUsername = useInputValidation("");
  const newPassword = useInputValidation("");
  const confirmPassword = useInputValidation("");

  const [avatar, setAvatar] = useState({
    file: null,
    preview: "",
  });

  const [isLoginPage, setIsLoginPage] = useState(true);

  // Avatar Handler
  const handleAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAvatar({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  /* ---------------------------- LOGIN HANDLER ---------------------------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");

    try {
      const { data } = await axios.post("/api/v1/user/login", {
        username: username.value,
        password: password.value,
      });

      if (data.token) {
        localStorage.setItem("chattu-token", data.token);
      }

      dispatch(userExists(data.user));

      toast.success("Login Successful", { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed", {
        id: toastId,
      });
    }
  };

  /* ---------------------------- SIGNUP HANDLER --------------------------- */
  const handleSignup = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating Account...");

    if (newPassword.value !== confirmPassword.value) {
      toast.error("Passwords do not match", { id: toastId });
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", newUsername.value);
    formData.append("password", newPassword.value);

    try {
      const { data } = await axios.post("/api/v1/user/new", formData);

      if (data.token) {
        localStorage.setItem("chattu-token", data.token);
      }

      dispatch(userExists(data.user));

      toast.success("Account Created Successfully", { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup Failed", {
        id: toastId,
      });
    }
  };

  /* ------------------------------- UI RETURN ------------------------------ */

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: "2rem",
            borderRadius: "1rem",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            mb={3}
          >
            {isLoginPage ? "Login" : "Sign Up"}
          </Typography>

          {isLoginPage ? (
            /* --------------------------- LOGIN FORM --------------------------- */
            <form onSubmit={handleLogin}>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username.value}
                onChange={username.changeHandler}
                required
              />

              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                value={password.value}
                onChange={password.changeHandler}
                required
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ mt: 2 }}
              >
                LOGIN
              </Button>

              <Typography textAlign="center" mt={2}>
                Don't have an account?{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setIsLoginPage(false)}
                >
                  Sign Up Instead
                </span>
              </Typography>
            </form>
          ) : (
            /* --------------------------- SIGNUP FORM -------------------------- */
            <form onSubmit={handleSignup}>
              <label
                style={{
                  fontWeight: "bold",
                  marginTop: "10px",
                  display: "block",
                }}
              >
                Profile Picture
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleAvatar}
                required
              />

              {avatar.preview && (
                <img
                  src={avatar.preview}
                  alt="Avatar Preview"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    marginTop: "10px",
                  }}
                />
              )}

              <TextField
                label="Full Name"
                fullWidth
                margin="normal"
                value={name.value}
                onChange={name.changeHandler}
                required
              />

              <TextField
                label="Bio"
                fullWidth
                margin="normal"
                value={bio.value}
                onChange={bio.changeHandler}
                required
              />

              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={newUsername.value}
                onChange={newUsername.changeHandler}
                required
              />

              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                value={newPassword.value}
                onChange={newPassword.changeHandler}
                required
              />

              <TextField
                label="Confirm Password"
                fullWidth
                margin="normal"
                type="password"
                value={confirmPassword.value}
                onChange={confirmPassword.changeHandler}
                required
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ mt: 2 }}
              >
                SIGN UP
              </Button>

              <Typography textAlign="center" mt={2}>
                Already have an account?{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setIsLoginPage(true)}
                >
                  Login Instead
                </span>
              </Typography>
            </form>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
