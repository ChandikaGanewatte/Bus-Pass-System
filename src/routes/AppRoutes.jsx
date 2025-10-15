import { Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/contactUs";
import ComplainsPage from "../pages/ComplainsPage";

import Students from "../pages/apply_pass/Students";
import UniStudents from "../pages/apply_pass/UniStudents";
import Adults from "../pages/apply_pass/Adults";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/contact_us" element={<ContactUs />} />
            <Route path="/complains" element={<ComplainsPage />} />

            <Route path="/bus_passes/apply_pass_students" element={<Students />} />
            <Route path="/bus_passes/apply_pass_uni_students" element={<UniStudents />} />
            <Route path="/bus_passes/apply_pass_adults" element={<Adults />} />
        </Routes>
    );
};

export default AppRoutes;
