import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Welcome from "../pages/welcome/Welcome";
import { AuthProvider } from "../contexts/auth";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/welcome:profileName" element={<Welcome />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
