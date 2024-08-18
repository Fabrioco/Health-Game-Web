import React from "react";
import logo from "../../assets/images/logo.png";
import Input from "../../components/input/Input";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import Button from "../../components/button/Button";
import "./loginStyles.css";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState("password");
  return (
    <div className="container-login">
      <div className="content-login">
        <img src={logo} alt="logo.png" className="logo" />
        <form className="form-login">
          <label htmlFor="Email" className="label">
            Email
          </label>
          <Input
            label={"Email"}
            type={"email"}
            placeholder={"exemplo@email.com"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="Password" className="label">
            Senha
          </label>
          <div className="input-password">
            <Input
              label={"Password"}
              type={showPassword}
              placeholder={"********"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {showPassword === "password" ? (
              <FaEyeSlash onClick={() => setShowPassword("text")} />
            ) : (
              <FaEye onClick={() => setShowPassword("password")} />
            )}
          </div>
          <Button type="submit" onClick={() => {}}>
            Entrar
          </Button>
        </form>
        <div className="login-footer">
          <p className="login-footer-text">
            Não tem uma conta?{" "}
            <a href="/signup" className="register-link">
              Crie uma agora
            </a>
          </p>

          <a href="#" className="forgot-password">
            Esqueceu sua senha?
          </a>
        </div>

        <div className="buttons-login">
          <Button type="button" onClick={() => {}}>
            <FaGoogle />
          </Button>
          <Button type="button" onClick={() => {}}>
            <FaFacebook />
          </Button>
        </div>
      </div>
    </div>
  );
}
