import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./homeStyles.css";
import React from "react";

export default function Home() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const userStoraged = localStorage.getItem("@User");
    if (userStoraged) navigate("/dashboard");
  }, []);
  return (
    <div className="container">
      <div className="content">
        <img src={logo} alt="logo.png" className="logo" />
        <div className="buttons">
          <a href="/signin" className="login-link-button">
            Entrar
          </a>
          <a href="/signup" className="register-link-button">
            Registrar-se
          </a>
        </div>
      </div>
    </div>
  );
}
