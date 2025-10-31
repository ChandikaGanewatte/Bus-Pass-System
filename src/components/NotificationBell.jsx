import React, { useEffect, useState } from "react";
import { IconButton, Badge, Menu, MenuItem, Typography, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { listenToUserNotifications } from "../services/firebaseCommonService";

const NotificationBell = ({ userId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = listenToUserNotifications(userId, (data) => {
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.isRead).length);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMarkAsRead = async (id) => {
    const docRef = doc(db, "notifications", id);
    await updateDoc(docRef, { isRead: true });
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ sx: { width: 300, maxHeight: 400 } }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        {notifications.length === 0 ? (
          <MenuItem disabled>No notifications</MenuItem>
        ) : (
          notifications.map((n) => (
            <MenuItem
              key={n.id}
              onClick={() => handleMarkAsRead(n.id)}
              sx={{
                whiteSpace: "normal",
                alignItems: "flex-start",
                backgroundColor: !n.isRead ? "rgba(25, 118, 210, 0.08)" : "transparent",
              }}
            >
              <Box>
                <Typography variant="subtitle2">{n.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {n.message}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default NotificationBell;
