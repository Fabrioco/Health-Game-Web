import logo from "../../assets/images/logo.png";
import "./homeStyles.css";

export default function Home() {
  return (
    <div className="container">
      <div className="content">
        <img src={logo} alt="logo.png" className="logo" />
        <div className="buttons">
          <a href="/signin" className="login-link-button">
            Sign In
          </a>
          <a href="/signup" className="register-link-button">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
