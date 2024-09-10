import React from "react";
import logo from "../../assets/images/logo.png";
import Input from "../../components/input/Input";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Button from "../../components/button/Button";
import "./loginStyles.css";
import { useAuth } from "../../contexts/auth";

export default function Login() {
  const { showNotification, sigInWithGoogle, signIn } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checkbox, setCheckbox] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState("password");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showNotification({
        message: "Preencha todos os campos",
        type: "error",
      });
      return;
    }

    signIn(email, password, checkbox);
  };

  const signInGoogle = () => {
    sigInWithGoogle();
  };

  return (
    <div className="container-form">
      <div className="content-form">
        <img src={logo} alt="logo.png" className="logo" />
        <form className="form" onSubmit={handleLogin}>
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
          <div>
            <label htmlFor="remember">Lembrar de mim</label>
            <input
              type="checkbox"
              id="remember"
              checked={checkbox}
              onChange={() => setCheckbox(!checkbox)}
            />
          </div>
          <Button type="submit" onClick={() => {}}>
            Entrar
          </Button>
        </form>
        <div className="form-footer">
          <p className="form-footer-text">
            Não tem uma conta?{" "}
            <a href="/signup" className="link">
              Crie uma agora
            </a>
          </p>

          <a href="#" className="forgot-password">
            Esqueceu sua senha?
          </a>
        </div>

        <div className="buttons-form">
          <Button type="button" onClick={signInGoogle}>
            <FaGoogle />
          </Button>
        </div>
      </div>
    </div>
  );
}
