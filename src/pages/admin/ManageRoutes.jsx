import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Papa from "papaparse";

import MenuBarAdmin from "../../components/MenuBarAdmin";
import Footer from "../../components/Footer";

// Firebase functions (later you implement the real ones)
import {
  getBusRoutes,
  uploadRoutesBulk,
} from "../../services/firebaseCommonService";

const ManageRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState({
    routeNo: "",
    name: "",
    lengthKm: "",
    rate:""
  });

  // Fetch route data
  const fetchRoutes = async () => {
    const res = await getBusRoutes();
    if (res.success) setRoutes(res.data);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleOpenAdd = () => {
    setSelectedRoute({ routeNo: "", name: "", lengthKm: "", rate:"" });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    setSelectedRoute({
      ...selectedRoute,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveRoute = () => {
    // TODO: save logic using Firebase
    console.log("Saved Route:", selectedRoute);
    setOpenDialog(false);
  };

  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = results.data.map((row) => ({
          routeNo: row.routeNo?.trim(),
          name: row.name?.trim(),
          lengthKm: Number(row.lengthKm),
          rate: Number(row.rate),
        }));

        // ✅ validation check
        const isValid = data.every(
          (r) => r.routeNo && r.name && r.lengthKm > 0 && r.rate > 0
        );

        if (!isValid) {
          console.log("error 1");
          return;
        }

        const res = await uploadRoutesBulk(data);
        if (res.success) {
          console.log("success");

          fetchRoutes(); // refresh list
        } else {
          console.log("error 2");
        }
      },
    });
  };

  return (
    <div>
      <MenuBarAdmin />
      <Box sx={{ p: 3, minHeight: "85vh", bgcolor: "#f5f5f5" }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Manage Bus Routes
        </Typography>

        <Paper sx={{ p: 2, borderRadius: 3 }}>
          {/* Top Action Buttons */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleOpenAdd}
            >
              Add Route
            </Button>

            <Button
              startIcon={<UploadFileIcon />}
              variant="outlined"
              color="primary"
              component="label"
            >
              Upload CSV
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={handleCSVUpload}
              />
            </Button>
          </Box>

          {/* Routes Table */}
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Route No</TableCell>
                  <TableCell>Route Name</TableCell>
                  <TableCell>Length (km)</TableCell>
                  <TableCell>Rate (Rs / km)</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {routes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                      No routes available
                    </TableCell>
                  </TableRow>
                ) : (
                  routes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell>{route.routeNo}</TableCell>
                      <TableCell>{route.name}</TableCell>
                      <TableCell>{route.lengthKm} km</TableCell>
                      <TableCell>Rs. {route.rate}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Add Route Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {selectedRoute.id ? "Edit Route" : "Add New Route"}
        </DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <TextField
            fullWidth
            margin="dense"
            label="Route Number"
            name="routeNo"
            value={selectedRoute.routeNo}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            label="Route Name"
            name="name"
            value={selectedRoute.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            type="number"
            margin="dense"
            label="Length (km)"
            name="lengthKm"
            value={selectedRoute.lengthKm}
            onChange={handleInputChange}
            required
          />

          <TextField
            fullWidth
            type="number"
            margin="dense"
            label="Rate (Rs / km)"
            name="rate"
            value={selectedRoute.rate}
            onChange={handleInputChange}
            required
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveRoute}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ManageRoutes;
