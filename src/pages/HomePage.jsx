import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const images = [
    "/imgs/slides/img.webp",
    "/imgs/slides/2.jpg",
    "/imgs/slides/3.jpg",
    "/imgs/slides/4.jpg",
    "/imgs/slides/5.jpg",
  ];

  return (
    <div className="home-page-content">
      <MenuBar />
      <div className="home-page-body">
        <div
          className="home-page-section-1"
          onClick={() => navigate("/bus-pass-service")}
          style={{ cursor: "pointer" }}
        >
          <Slider {...settings}>
            {images.map((src, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  height: { xs: "60vh", md: "80vh" },
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,0)", // dark overlay
                  }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    zIndex: 1,
                    fontWeight: 1000,
                    textAlign: "center",
                    px: 2,
                    mt: 10,
                    color: "white",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                  }}
                >
                  Bus Season Pass Service
                </Typography>
              </Box>
            ))}
          </Slider>
        </div>
        <div
          className="home-page-section-2"
          style={{ padding: "60px 20px", backgroundColor: "#f5f5f5" }}
        >
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" fontWeight={700}>
              Bus Season Pass Options
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: "gray" }}>
              Choose the season pass that fits your needs
            </Typography>
          </Box>

          <div className="cards-container">
            <Card sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="180"
                image="/imgs/cards/c_2.jpg" // put image in public/imgs/
                alt="Student Pass"
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  Student Season Pass
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "gray", cursor: "pointer" }}
                  onClick={() => navigate("/student_info")}
                >
                  <u>Click here for more details</u>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/bus_passes/apply_pass_students")}
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>

            {/* Card 2 */}

            <Card sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="180"
                image="/imgs/cards/c_3.jpg"
                alt="University Student Pass"
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  University Student Season Pass
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "gray", cursor: "pointer" }}
                  onClick={() => navigate("/university_info")}
                >
                  <u>Click here for more details</u>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    navigate("/bus_passes/apply_pass_uni_students")
                  }
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>

            {/* Card 3 */}

            <Card sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="180"
                image="/imgs/cards/c_1.jpg"
                alt="Adult Pass"
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  Adult Season Pass
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "gray", cursor: "pointer" }}
                  onClick={() => navigate("/adult_info")}
                >
                  <u>Click here for more details</u>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/bus_passes/apply_pass_adults")}
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
