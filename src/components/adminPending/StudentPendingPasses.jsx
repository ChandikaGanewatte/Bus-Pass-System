import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

import { getStudentPendingApplications } from "../../services/firebasePassService";

const StudentPendingPasses = () => {
  const [pendingPasses, setPendingPasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPasses = async () => {
      const pendingApps = await getStudentPendingApplications();
      setPendingPasses(pendingApps);
      setLoading(false);
    };
    fetchPasses();
  }, []);

  return (
    <div>
      <Box>
        {loading ? (
          <Box >
            <CircularProgress />
            <Typography>Loading your pending passes...</Typography>
          </Box>
        ) : pendingPasses.length === 0 ? (
          <Typography color="text.secondary">
            No pending applications found.
          </Typography>
        ) : (
          <List sx={{ bgcolor: "#fff", borderRadius: 2, boxShadow: 2 }}>
            {pendingPasses.map((pass, index) => (
              <React.Fragment key={pass.id}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate(`${pass.id}`)}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="h6" fontWeight={600}>
                          {pass.formData?.name || "Unnamed Pass"}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            📍 Route: {pass.formData?.route || "N/A"}
                          </Typography>
                          <br />
                          <Typography
                            variant="body2"
                            fontStyle="italic"
                            color="text.secondary"
                          >
                            📅 Submitted on:{" "}
                            {pass.appliedAt?.toDate
                              ? pass.appliedAt.toDate().toLocaleDateString()
                              : "Unknown"}
                          </Typography>
                        </>
                      }
                    />
                  </ListItemButton>
                </ListItem>

                {index < pendingPasses.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </div>
  );
};

export default StudentPendingPasses;
