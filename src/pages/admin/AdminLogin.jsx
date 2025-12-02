// src/pages/admin/AdminLogin.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useInputValidation } from "6pp";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
} from "@mui/material";

import { adminLogin, getAdmin } from "../../redux/thunks/admin";
// Adjust path if asset is elsewhere
import bgImage from "../../assets/login.jpg";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <Box
      sx={{
        // background image wrapper
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Optional subtle overlay for readability (adjust alpha as needed) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.14)",
          zIndex: 0,
        }}
      />

      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          zIndex: 2, // above bg + overlay
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // transparent / glass effect
            backdropFilter: "blur(4px) saturate(120%)",
            WebkitBackdropFilter: "blur(4px) saturate(120%)",
            backgroundColor: "rgba(255, 255, 255, 0.35)", // adjust alpha to taste
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 2,
            width: "100%",
            boxShadow: "0 8px 30px rgba(2,6,23,0.25)",
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            Admin Login
          </Typography>

          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />

            <Button
              sx={{
                marginTop: "1rem",
              }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
