import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PriveteRoute";

import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/contactUs";
import ComplainsPage from "../pages/ComplainsPage";
import TermsAndConditions from "../pages/TermsAndConditions";

import Students from "../pages/apply_pass/Students";
import UniStudents from "../pages/apply_pass/UniStudents";
import Adults from "../pages/apply_pass/Adults";

import ProfilePage from "../pages/user/ProfilePage";
import BusPassPage from "../pages/user/busPassPage";

import Dashboard from "../pages/admin/Dashboard";
import IssuedPasses from "../pages/admin/IssuedPasses";
import PendingPasses from "../pages/admin/PendingPasses";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/contact_us" element={<ContactUs />} />
            <Route path="/complains" element={<ComplainsPage />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/bus_passes" element={<BusPassPage />} />

            {/* ************************* PROTECTED ROUTES ************************* */}
            <Route path="/" element={
                <PrivateRoute allowedRoles={["user"]}>
                    <HomePage />
                </PrivateRoute>
            } />

            <Route path="/bus_passes/apply_pass_students" element={
                <PrivateRoute allowedRoles={["user"]}>
                    <Students />
                </PrivateRoute>
            } />
            <Route path="/bus_passes/apply_pass_uni_students" element={
                <PrivateRoute allowedRoles={["user"]}>
                    <UniStudents />
                </PrivateRoute>
            } />
            <Route path="/bus_passes/apply_pass_adults" element={
                <PrivateRoute allowedRoles={["user"]}>
                    <Adults />
                </PrivateRoute>
            } />

            <Route path="/profile" element={
                <PrivateRoute allowedRoles={["user"]}>
                    <ProfilePage />
                </PrivateRoute>
            } />


            {/* ************************* ADMIN ROUTES ************************* */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/issued_passes" element={<IssuedPasses />} />
            <Route path="/admin/pending_passes" element={<PendingPasses />} />
        </Routes>
    );
};

export default AppRoutes;
