import React, { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Drawer,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { grayColor } from "../constants/color";

const Home = () => {
  const { user } = useSelector((state) => state.auth); 
  const [openProfile, setOpenProfile] = useState(false);

  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  return (
    <Box bgcolor={grayColor} height={"100%"} position="relative">
      {/* Mobile / Tablet profile button (top-right) */}
      <IconButton
        onClick={handleOpenProfile}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          display: { xs: "flex", md: "none" }, // show only on phone & tablet
        }}
      >
        <Avatar src={user?.avatar?.url}>
          {user?.name ? user.name[0] : "U"}
        </Avatar>
      </IconButton>

      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a friend to chat
      </Typography>

      {/* Slide-out profile drawer for small screens */}
      <Drawer
        anchor="right"
        open={openProfile}
        onClose={handleCloseProfile}
        sx={{
          "& .MuiDrawer-paper": {
            width: "80vw",
            maxWidth: 360,
          },
        }}
      >
        <Box p={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={user?.avatar?.url}
              sx={{ width: 64, height: 64, fontSize: 28 }}
            >
              {user?.name ? user.name[0] : "U"}
            </Avatar>
            <Box>
              <Typography variant="h6">{user?.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                @{user?.username}
              </Typography>
            </Box>
          </Stack>

          {user?.bio && (
            <Typography mt={2} variant="body2">
              {user.bio}
            </Typography>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default AppLayout()(Home);
