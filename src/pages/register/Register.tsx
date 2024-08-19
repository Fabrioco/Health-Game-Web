import React from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import logo from "../../assets/images/logo.png";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import "./registerStyles.css";
import { useAuth } from "../../contexts/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export default function Register() {
  const { signUp, showNotification, sigInWithGoogle } = useAuth();

  const [showPassword, setShowPassword] = React.useState("password");
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState("password");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPasswod] = React.useState("");
  const [checkbox, setCheckbox] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkbox) {
      showNotification({
        message: "Aceite os termos de uso",
        type: "error",
      });
      return;
    }

    if (!username || !email || !password || !confirmPassword) {
      showNotification({
        message: "Preencha todos os campos",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      showNotification({
        message: "As senhas precisam ser iguais",
        type: "error",
      });
      return;
    }

    const isTaken = await checkUsername(username);
    if (isTaken) {
      showNotification({
        message: "Nome de usuário indisponível",
        type: "error",
      });
      return;
    } else if (!isTaken) {
      signUp(username, email, password);
    }
  };

  const checkUsername = async (player: string): Promise<boolean> => {
    const snapshot = await getDocs(collection(db, "players"));

    const isTaken = snapshot.docs.some((doc) => {
      const data = doc.data();
      return data.username === player;
    });

    return isTaken;
  };

  const signInGoogle = () => {
    sigInWithGoogle();
  };

  return (
    <div className="container-form">
      <div className="content-form">
        <img src={logo} alt="logo.png" className="logo" />
        <form onSubmit={handleLogin} className="form">
          <label htmlFor="username" className="label">
            Nome de usuário
          </label>
          <Input
            label="username"
            type="text"
            placeholder="Player_1"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label htmlFor="email" className="label">
            Email
          </label>
          <Input
            label="email"
            type="email"
            placeholder="exemplo@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="password" className="label">
            Senha
          </label>
          <div className="input-password">
            <Input
              label={"password"}
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
              label={"passwordRepeat"}
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
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              onClick={() => setCheckbox(!checkbox)}
            />
            <label htmlFor="checkbox">
              Eu li e concordo com os termos e condições
            </label>
          </div>
          <Button type="submit" onClick={() => {}}>
            Cadastrar
          </Button>
        </form>
        <div className="buttons-form">
          <Button onClick={signInGoogle} type="button">
            <FaGoogle />
          </Button>
        </div>
        <div className="block-link">
          <p className="text">Ja possui conta?</p>
          <a href="" className="link">
            Clique aqui
          </a>
        </div>
      </div>
    </div>
  );
}
