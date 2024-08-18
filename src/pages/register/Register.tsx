import React from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import logo from "../../assets/images/logo.png";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import "./registerStyles.css";

export default function Register() {
  const [showPassword, setShowPassword] = React.useState("password");
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState("password");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPasswod] = React.useState("");
  return (
    <div className="container-form">
      <div className="content-form">
        <img src={logo} alt="logo.png" className="logo" />
        <form onSubmit={(e) => e.preventDefault()} className="form">
          <label htmlFor="username" className="label">
            Nome de usuário
          </label>
          <Input
            label="username"
            type="text"
            placeholder="Player_1"
            onChange={() => {}}
            value=""
          />
          <label htmlFor="email" className="label">
            Email
          </label>
          <Input
            label="email"
            type="email"
            placeholder="exemplo@email.com"
            onChange={() => {}}
            value=""
          />
          <label htmlFor="password" className="label">
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
          <label htmlFor="passwordRepeat" className="label">
            Confirme Sua Senha
          </label>
          <div className="input-password">
            <Input
              label={"Password"}
              type={showConfirmPassword}
              placeholder={"********"}
              onChange={(e) => setConfirmPasswod(e.target.value)}
              value={confirmPassword}
            />
            {showConfirmPassword === "password" ? (
              <FaEyeSlash onClick={() => setShowConfirmPassword("text")} />
            ) : (
              <FaEye onClick={() => setShowConfirmPassword("password")} />
            )}
          </div>
          <div className="checkbox">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label htmlFor="checkbox">
              Eu li e concordo com os termos e condições
            </label>
          </div>
          <Button type="submit" onClick={() => {}}>
            Cadastrar
          </Button>
        </form>
        <div className="buttons-form">
          <Button onClick={() => {}} type="button">
            <FaGoogle />
          </Button>
          <Button onClick={() => {}} type="button">
            <FaFacebook />
          </Button>
        </div>
        <a href=""></a>
      </div>
    </div>
  );
}
