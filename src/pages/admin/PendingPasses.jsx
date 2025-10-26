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
  Tooltip
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GroupIcon from "@mui/icons-material/Group";
 
import MenuBarAdmin from '../../components/MenuBarAdmin'
import Footer from '../../components/Footer'

import StudentPendingPasses from "../../components/adminPending/StudentPendingPasses";
import UniStudentsPendingPasses from "../../components/adminPending/UniStudentsPendingPasses";
import AdultsPendingPasses from "../../components/adminPending/AdultsPendingPasses";

const PendingPasses = () => {
  const [selectedTab, setSelectedTab] = useState(0);
   const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
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
        {/* Tabs */}
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
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            value={selectedTab}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="pending passes tabs"
            centered={isMobile}
          >
            {/* Student Tab */}
            {isMobile ? (
              <Tooltip title="Student Season Passes" arrow>
                <Tab icon={<SchoolIcon />} />
              </Tooltip>
            ) : (
              <Tab label="Student Season Passes" icon={<SchoolIcon />} iconPosition="start" />
            )}

            {/* University Student Tab */}
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

            {/* Adult Tab */}
            {isMobile ? (
              <Tooltip title="Adult Season Passes" arrow>
                <Tab icon={<GroupIcon />} />
              </Tooltip>
            ) : (
              <Tab label="Adult Season Passes" icon={<GroupIcon />} iconPosition="start" />
            )}
          </Tabs>
        </Paper>

        {/* Content */}
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
            {selectedTab === 0 && "Pending Passes – Students"}
            {selectedTab === 1 && "Pending Passes – University Students"}
            {selectedTab === 2 && "Pending Passes – Adults"}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {selectedTab === 0 && <StudentPendingPasses />}
          {selectedTab === 1 && <UniStudentsPendingPasses />}
          {selectedTab === 2 && <AdultsPendingPasses />}
        </Paper>
      </Box>

      <Footer />
    </div>
  );
};

export default PendingPasses;