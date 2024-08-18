import React from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import logo from "../../assets/images/logo.png";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";

export default function Register() {
  return (
    <div>
      <div>
        <img src={logo} alt="logo.png" />
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="username">Nome de usuário</label>
          <Input
            label="username"
            type="text"
            placeholder="Player_1"
            onChange={() => {}}
            value=""
          />
          <label htmlFor="email">Email</label>
          <Input
            label="email"
            type="email"
            placeholder="exemplo@email.com"
            onChange={() => {}}
            value=""
          />
          <label htmlFor="password">Senha</label>
          <Input
            label="password"
            type="password"
            placeholder="********"
            onChange={() => {}}
            value=""
          />
          <label htmlFor="passwordRepeat">Confirme Sua Senha</label>
          <Input
            label="passwordRepeat"
            type="password"
            placeholder="********"
            onChange={() => {}}
            value=""
          />
          <input type="checkbox" name="checkbox" id="checkbox" />
          <label htmlFor="checkbox">
            Eu li e concordo com os termos e condições
          </label>
          <Button type="submit" onClick={() => {}}>
            Cadastrar
          </Button>
        </form>
        <div>
          <Button onClick={() => {}} type="button">
            <FaFacebook />
          </Button>
          <Button onClick={() => {}} type="button">
            <FaGoogle />
          </Button>
        </div>
        <a href=""></a>
      </div>
    </div>
  );
}
