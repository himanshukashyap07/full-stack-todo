import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./app/User/SignupUser";
import Dashboard from "./app/Dashboard"
import Signin from "./app/User/SigninUser";
import ChangePassword from "./app/User/ChangePassword";
import { ProtectedRoute, PublicRoute } from "./api/AuthMiddleware";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Signin/></PublicRoute>}/>
        <Route path="/change-password" element={<ProtectedRoute><ChangePassword/></ProtectedRoute>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
