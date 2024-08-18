import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
