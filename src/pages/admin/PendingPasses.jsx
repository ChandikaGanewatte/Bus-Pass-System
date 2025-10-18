import React, { useState } from "react";

import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

import MenuBarAdmin from '../../components/MenuBarAdmin'
import Footer from '../../components/Footer'

import StudentIssuedPasses from '../../components/passes/StudentIssuedPasses'
import UniStudentIssuedPasses from '../../components/passes/UniStudentsIssuedPasses'
import AdultsIssuedPasses from '../../components/passes/AdultIssuedPasses'

const PendingPasses = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <MenuBarAdmin />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          minHeight: "80vh",
          bgcolor: "#f9f9f9",
          p: 3,
        }}
      >
        {/* Left-side Vertical Tabs */}
        <Paper
          elevation={4}
          sx={{
            width: 220,
            borderRadius: 3,
            mr: 3,
            overflow: "hidden",
          }}
        >

          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="Issued passes tabs"
            sx={{
              height: "100%",
              "& .MuiTab-root": {
                justifyContent: "flex-start", 
                alignItems: "flex-start",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 2,
                borderBottom: "1px solid #eee",
                width: "100%",
                textAlign: "left", 
                lineHeight: 1.3,
                minHeight: "auto",
              },
              "& .MuiTab-wrapper": {
                width: "100%",
                display: "block", 
                textAlign: "left", 
                whiteSpace: "normal",
              },
            }}
          >
            <Tab label="Student Season Passes" />
            <Tab label="University Student Season Passes" />
            <Tab label="Adult Season Passes" />
          </Tabs>

        </Paper>

        {/* Right-side Tab Content */}
        <Paper
          elevation={4}
          sx={{
            flex: 1,
            borderRadius: 3,
            p: 3,
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={2}>
            {selectedTab === 0 && "Pending Passes – Students"}
            {selectedTab === 1 && "Pending Passes – University Students"}
            {selectedTab === 2 && "Pending Passes – Adults"}
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* Render Tab Content */}
          {selectedTab === 0 && <StudentIssuedPasses />}
          {selectedTab === 1 && <UniStudentIssuedPasses />}
          {selectedTab === 2 && <AdultsIssuedPasses />}
        </Paper>
      </Box>

      <Footer />
    </div>
  )
}

export default PendingPasses