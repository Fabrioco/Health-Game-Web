import React from "react";
import logo from "../../assets/images/logo.png";
import Input from "../../components/input/Input";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import Button from "../../components/button/Button";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <div>
      <div>
        <img src={logo} alt="logo.png" className="logo" />
        <form action="">
          <Input
            label={"Email"}
            type={"exemplo@email.com"}
            placeholder={"Email"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="input-password">
            <Input
              label={"Password"}
              type={"Password"}
              placeholder={"********"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <FaEye />
            <FaEyeSlash />
          </div>
          <Button type="submit" onClick={() => {}}>
            Login
          </Button>
        </form>
        <div>
          <a href="#">Esqueceu sua senha?</a>
        </div>
        <div className="buttons-login">
          <Button type="button" onClick={() => {}}>
            <FaGoogle />
          </Button>
          <Button type="button" onClick={() => {}}>
            <FaFacebook />
          </Button>
        </div>
        <div>
          <p>Não tem uma conta?</p>
          <a href="/signup">Crie uma agora</a>
        </div>
      </div>
    </div>
  );
}
