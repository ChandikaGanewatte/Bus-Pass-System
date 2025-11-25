import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";
import { submitComplaint } from "../services/firebaseCommonService"; // import our service
import { useNotification } from "../context/NotificationContext";

export const depots = [
  "Colombo Head Office",
  "Angoda",
  "Awissawella",
  "Central Bus Stand",
  "Homagama",
  "Kesbewa",
  "Katubadda",
  "Maharagama",
  "Mattakkuliya",
  "Meethotamulla",
  "Moratuwa",
  "Rathmalana",
  "Thalangama",
  "Udahamulla",
  "Eastern",
  "Akkaraipattu",
  "Ampara",
  "Batticola",
  "Eravur",
  "Kattankudy",
  "Kalmunai",
  "Kanthale",
  "Muttur",
  "Trincomalee",
  "Valaichchenai",
  "Gampaha region office",
  "Divulapitiya",
  "Gampaha",
  "Ja-Ela",
  "Kirindiwela",
  "Kelaniya",
  "Kadawatha",
  "Negombo",
  "Nittambuwa",
  "Walisara",
  "Kalutara region Office",
  "Kalutara",
  "Aluthgama",
  "Horana",
  "Mathugama",
  "Panadura",
  "Kandy region office",
  "Kandy North",
  "Kandy South",
  "Theldeniya",
  "Ududumbara",
  "Wattegama",
  "Yatinuwara",
  "Northern region office",
  "Jaffna",
  "Kilinochchi",
  "Karayinagar",
  "Mannar",
  "Pointpedro",
  "Vavniya",
  "Mullaithivu",
  "Nuwara-Eliya region office",
  "Gampola",
  "Hanguranketha",
  "Hatton",
  "Kotmale",
  "Nuwaraeliya",
  "Nawalapitiya",
  "Walapane",
  "Rajarata region office",
  "Anuradhapura",
  "Dambulla",
  "Horowpothana",
  "Kebithigollawa",
  "Kakirawa",
  "Mathale",
  "Polonnaruwa",
  "Sabaragamuwa region office",
  "Balangoda",
  "Deraniyagala",
  "Embilipitiya",
  "Godakawela",
  "Kegalle",
  "Kalawana",
  "Mawanella",
  "Rambukkana",
  "Rathnapura",
  "Southern region office",
  "Amblangoda",
  "Akuressa",
  "Ambalanthota",
  "Elpitita",
  "Galle",
  "Hakmana",
  "Koggala",
  "Katharagama",
  "Mathara",
  "Tangalle",
  "Udugama",
  "Uva region office",
  "Bibila",
  "Badulla",
  "Bandarawela",
  "Dehiaththakandiya",
  "Kappetipola",
  "Monaragala",
  "Mahiyanganaya",
  "Thanamalwila",
  "Wayamba region office",
  "Alawwa",
  "Chilaw",
  "Galgamuwa",
  "Kurunegala North",
  "Kurunegala South",
  "Kuliyapitiya",
  "Maho",
  "Nikawearatiya",
  "Puttalam",
  "Wennappuwa",
  "Wariyapola"
];

const reasons = ["Delay in Service", "Damaged Goods", "Rude Staff", "Other"];

const ComplainsPage = () => {
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    depot: "",
    bus_No: "",
    reason: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.depot || !formData.bus_No || !formData.reason || !formData.message) {
      showNotification("Please fill all required fields.", "error");
      return;
    }

    // Call Firebase service
    const result = await submitComplaint({
      userId: "USER_ID_HERE",
      depot: formData.depot,
      bus_No: formData.bus_No,
      reason: formData.reason,
      message: formData.message,
    });

    if (result.success) {
      showNotification("Complaint submitted successfully!", "success");
      setFormData({ date: null, depot: "", bus_No: "", reason: "", message: "" });
    } else {
      alert("Error: " + result.message);
    }
  };

  return (
    <div>
      <MenuBar />
      <Box
        sx={{
          minHeight: "80vh",
          bgcolor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{ maxWidth: 500, width: "100%", p: 4, borderRadius: 3 }}
        >
          <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
            Submit a Complaint
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Depot Dropdown */}
            <TextField
              select
              fullWidth
              label="Depot"
              name="depot"
              value={formData.depot}
              onChange={handleChange}
              margin="normal"
              required
            >
              {depots.map((depot) => (
                <MenuItem key={depot} value={depot}>
                  {depot}
                </MenuItem>
              ))}
            </TextField>

            {/* Bus No */}
            <TextField
              fullWidth
              label="Bus No"
              name="bus_No"
              value={formData.bus_No}
              onChange={handleChange}
              margin="normal"
              required
            />

            {/* Reason Dropdown */}
            <TextField
              select
              fullWidth
              label="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              margin="normal"
              required
            >
              {reasons.map((reason) => (
                <MenuItem key={reason} value={reason}>
                  {reason}
                </MenuItem>
              ))}
            </TextField>

            {/* Message Box */}
            <TextField
              fullWidth
              label="Complaint Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1.2, borderRadius: 2 }}
            >
              Submit Complaint
            </Button>
          </form>
        </Paper>
      </Box>
      <Footer />
    </div>
  );
};

export default ComplainsPage;