import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PriveteRoute";

import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import ComplainsPage from "../pages/ComplainsPage";
import PriceCal from "../pages/PriceCal";
import TermsAndConditions from "../pages/TermsAndConditions";

import Students from "../pages/apply_pass/Students";
import UniStudents from "../pages/apply_pass/UniStudents";
import Adults from "../pages/apply_pass/Adults";

import StudentInfo from "../pages/user/StudentInfo";
import UniversityInfo from "../pages/user/UniversityInfo";
import AdultInfo from "../pages/user/AdultInfo";

import ProfilePage from "../pages/user/ProfilePage";
import BusPassPage from "../pages/user/BusPassPage";

import Dashboard from "../pages/admin/Dashboard";
import IssuedPasses from "../pages/admin/IssuedPasses";
import PendingPasses from "../pages/admin/PendingPasses";
import PendingPassDetails from "../pages/admin/PendingPassDetail";
import IssuedPassDetails from "../pages/admin/IssuedPassDetails";
import ManageRoutes from "../pages/admin/ManageRoutes";
import AdminRegisterPage from "../pages/admin/AdminRegisterPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about_us" element={<AboutUs />} />
      <Route path="/contact_us" element={<ContactUs />} />
      <Route path="/complains" element={<ComplainsPage />} />
      <Route path="/price_cal" element={<PriceCal />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/bus_passes" element={<BusPassPage />} />
      <Route path="/student_info" element={<StudentInfo />} />
      <Route path="/university_info" element={<UniversityInfo />} />
      <Route path="/adult_info" element={<AdultInfo />} />

      {/* ************************* PROTECTED ROUTES ************************* */}
      <Route
        path="/"
        element={
          <PrivateRoute allowedRoles={["user"]}>
            <HomePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/bus_passes/apply_pass_students"
        element={
          <PrivateRoute allowedRoles={["user"]}>
            <Students />
          </PrivateRoute>
        }
      />
      <Route
        path="/bus_passes/apply_pass_uni_students"
        element={
          <PrivateRoute allowedRoles={["user"]}>
            <UniStudents />
          </PrivateRoute>
        }
      />
      <Route
        path="/bus_passes/apply_pass_adults"
        element={
          <PrivateRoute allowedRoles={["user"]}>
            <Adults />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute allowedRoles={["user"]}>
            <ProfilePage />
          </PrivateRoute>
        }
      />

      {/* ************************* ADMIN ROUTES ************************* */}
      <Route path="/register/admin" element={<AdminRegisterPage />} />

      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* <Route path="/admin" element={<Dashboard />} /> */}

      <Route
        path="/admin/issued_passes"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <IssuedPasses />
          </PrivateRoute>
        }
      />
      {/* <Route path="/admin/issued_passes" element={<IssuedPasses />} /> */}

      <Route
        path="/admin/pending_passes"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <PendingPasses />
          </PrivateRoute>
        }
      />

      {/* <Route path="/admin/pending_passes" element={<PendingPasses />} /> */}

      <Route
        path="/admin/pending_passes/:id"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <PendingPassDetails />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/admin/pending_passes/:id"
        element={<PendingPassDetails />}
      /> */}

      <Route
        path="/admin/issued_passes/:id"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <IssuedPassDetails />
          </PrivateRoute>
        }
      />
      {/* <Route path="/admin/issued_passes/:id" element={<IssuedPassDetails />} /> */}

      <Route
        path="/admin/manage_routes"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <ManageRoutes />
          </PrivateRoute>
        }
      />
      {/* <Route path="/admin/manage_routes" element={<ManageRoutes />} /> */}
    </Routes>
  );
};

export default AppRoutes;
