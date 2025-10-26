import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";

// Icons
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GroupIcon from "@mui/icons-material/Group";

import MenuBarAdmin from "../../components/MenuBarAdmin";
import Footer from "../../components/Footer";

import StudentIssuedPasses from "../../components/passes/StudentIssuedPasses";
import UniStudentIssuedPasses from "../../components/passes/UniStudentsIssuedPasses";
import AdultsIssuedPasses from "../../components/passes/AdultIssuedPasses";

const IssuedPasses = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (_event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <MenuBarAdmin />
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight: "80vh",
          bgcolor: "#f9f9f9",
          p: isMobile ? 1.5 : 3,
          gap: isMobile ? 2 : 3,
        }}
      >
        {/* Tabs Section */}
        <Paper
          elevation={4}
          sx={{
            width: isMobile ? "100%" : 240,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Tabs
            orientation={isMobile ? "horizontal" : "vertical"}
            value={selectedTab}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            onChange={handleChange}
            aria-label="issued passes tabs"
            indicatorColor="primary"
            textColor="primary"
            centered={isMobile}
          >
            {/* Students */}
            {isMobile ? (
              <Tooltip title="Student Season Passes" arrow>
                <Tab icon={<SchoolIcon />} />
              </Tooltip>
            ) : (
              <Tab
                label="Student Season Passes"
                icon={<SchoolIcon />}
                iconPosition="start"
              />
            )}

            {/* Uni Students */}
            {isMobile ? (
              <Tooltip title="University Student Season Passes" arrow>
                <Tab icon={<AccountBalanceIcon />} />
              </Tooltip>
            ) : (
              <Tab
                label="University Student Season Passes"
                icon={<AccountBalanceIcon />}
                iconPosition="start"
              />
            )}

            {/* Adults */}
            {isMobile ? (
              <Tooltip title="Adult Season Passes" arrow>
                <Tab icon={<GroupIcon />} />
              </Tooltip>
            ) : (
              <Tab
                label="Adult Season Passes"
                icon={<GroupIcon />}
                iconPosition="start"
              />
            )}
          </Tabs>
        </Paper>

        {/* Content Section */}
        <Paper
          elevation={4}
          sx={{
            flex: 1,
            borderRadius: 3,
            p: isMobile ? 2 : 3,
            width: "100%",
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight={700}
            mb={2}
            textAlign={isMobile ? "center" : "left"}
          >
            {selectedTab === 0 && "Issued Passes – Students"}
            {selectedTab === 1 && "Issued Passes – University Students"}
            {selectedTab === 2 && "Issued Passes – Adults"}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {selectedTab === 0 && <StudentIssuedPasses />}
          {selectedTab === 1 && <UniStudentIssuedPasses />}
          {selectedTab === 2 && <AdultsIssuedPasses />}
        </Paper>
      </Box>

      <Footer />
    </div>
  );
};

export default IssuedPasses;
