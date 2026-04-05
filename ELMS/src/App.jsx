import LandingPage      from "./pages/landingPage";
import LoginPage        from "./pages/auth/login";
import RegisterPage     from "./pages/auth/register";
// import AdminHomePage    from "./pages/home/AdminHomePage";
// import EmployeeHomePage from "./pages/home/EmployeeHomePage";


  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

  // function ProtectedRoute({ children, role }) {
  //   const token    = localStorage.getItem("token");
  //   const userRole = localStorage.getItem("role"); // "admin" | "employee"
  //   if (!token) return <Navigate to="/login" replace />;
  //   if (role && userRole !== role) return <Navigate to="/login" replace />;
  //   return children;
  // }

  export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/"         element={<LandingPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="*"         element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

// Temporary: uncomment the page you want to preview
// export default function App() {
//   return <LandingPage />;
//   return <LoginPage />;
//   return <RegisterPage />;
//   // return <AdminHomePage />;
//   // return <EmployeeHomePage />;
// }