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
import { useNotification } from "../context/NotificationContext";

const seasonPass = [
  "Student Season Pass",
  "University Student Season Pass",
  "Adult Season Pass",
];

const days = ["20", "24", "30"];

const PriceCal = () => {
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    fare: "",
    seasonPass: "",
    days: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fare || !formData.seasonPass || !formData.days) {
      showNotification("Please fill all required fields.", "error");
      return;
    }

    if (result.success) {
      showNotification("Complaint submitted successfully!", "success");
      setFormData({ date: null, fare: "", seasonPass: "", days: "" });
    } else {
      alert("Error: " + result.message);
    }
  };

  // Calculate using numeric conversion (guard against invalid input)
  const calculatePrice = () => {
    // parse numbers
    const fareNum = parseFloat(formData.fare);
    const daysNum = parseInt(formData.days, 10);

    // debug logs (open browser console)
    console.log("calculatePrice called:", {
      fare: formData.fare,
      fareNum,
      days: formData.days,
      daysNum,
      seasonPass: formData.seasonPass,
    });

    if (Number.isNaN(fareNum) || Number.isNaN(daysNum)) {
      showNotification("Fare and Days must be valid numbers.", "error");
      return;
    }

    if (!formData.seasonPass) {
      showNotification("Please choose a season pass type.", "error");
      return;
    }

    let price = 0;

    // Student Season Pass
    if (formData.seasonPass === "Student Season Pass") {
      price = (fareNum * 2 * daysNum * 27) / 100;
    }
    // University Student Season Pass
    else if (formData.seasonPass === "University Student Season Pass") {
      price = (fareNum * 2 * daysNum * 32) / 100;
    }
    // Adult Season Pass
    else if (formData.seasonPass === "Adult Season Pass") {
      price = (fareNum * 2 * daysNum * 66) / 100;
    }

    // set price fixed to 2 decimals
    setFormData((prev) => ({ ...prev, price: price.toFixed(2) }));
    showNotification("Price calculated successfully!", "success");
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
            Price Cal
          </Typography>

          {/* Fare */}
          <TextField
            fullWidth
            label="Fare"
            name="fare"
            value={formData.fare}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Season Pass */}
          <TextField
            select
            fullWidth
            label="Season Pass"
            name="seasonPass"
            value={formData.seasonPass}
            onChange={handleChange}
            margin="normal"
            required
          >
            {seasonPass.map((sp) => (
              <MenuItem key={sp} value={sp}>
                {sp}
              </MenuItem>
            ))}
          </TextField>

          {/* Days */}
          <TextField
            select
            fullWidth
            label="Days"
            name="days"
            value={formData.days}
            onChange={handleChange}
            margin="normal"
            required
          >
            {days.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </TextField>

          {/* Price Button */}
          <Button
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.2 }}
            onClick={calculatePrice}
          >
            Calculate Price
          </Button>

          {/* Calculated Price */}
          <TextField
            fullWidth
            label="Calculated Price"
            name="price"
            value={formData.price}
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Paper>
      </Box>
      <Footer />
    </div>
  );
};
export default PriceCal;
