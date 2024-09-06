import { signOut } from "firebase/auth";
import { useAuth, UserProps } from "../../contexts/auth";
import { auth, db } from "../../services/firebaseConnection";
import React from "react";
import { doc, getDoc } from "firebase/firestore";
import Button from "../../components/button/Button";
import pet from "../../assets/images/pet.png";
import demo from "../../assets/images/demonstration.png";

import "./welcomeStyles.css";

export default function Welcome() {
  const { user, navigateTo, logOut } = useAuth();
  const [end, setEnd] = React.useState(1);

  const handleSignOut = () => {
    logOut();
  };

  console.log(user?.username)

  return (
    <div className="container">
      <div className="content-welcome">
        <div className="stage-message">
          <div className="messages">
            <p className="message">
              Olá, {user?.username}! Seja bem vindo ao HealthGame! Sua jornada
              para uma vida mais saudável começa agora!
            </p>

            {end >= 2 && (
              <p className="message">
                Me chamo, Healthie! E vou te ajudar na sua jornada!
              </p>
            )}

            {end >= 3 && (
              <p className="message">
                Veja o passo a passo de como começar, caso precise, você pode
                voltar as etapas para entender melhor!
              </p>
            )}
            {end >= 4 && (
              <div className="message" style={{ display: "flex", gap: 10 }}>
                <img src={demo} alt="demonstration.png" className="img-demo" />
                <div>
                  <p>
                    <b>Nivel</b> - Você sobe de nivel sempre que completar uma
                    tarefa.
                  </p>
                  <p>
                    <b>Troféu</b> - Você pode ganhar troféus quando fizer uma
                    conquista por um tempo determinado. Exemplo: beber água por
                    10 dias.
                  </p>
                  <p>
                    <b>Lista de amigos</b> - Você pode procurar amigos e ver seu
                    perfil, conquistas e adicionar pessoas.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="buttons">
            <Button
              onClick={
                end === 1 ? handleSignOut : () => setEnd((end) => end - 1)
              }
              type="button"
            >
              {end === 1 ? <p>Sair da conta</p> : <p>voltar</p>}
            </Button>
            <Button
              onClick={
                end === 4
                  ? () => navigateTo("dashboard")
                  : () => setEnd((end) => end + 1)
              }
              type="button"
            >
              {end === 4 ? <p>Começar</p> : <p>Avançar</p>}
            </Button>
          </div>
        </div>

        <img src={pet} alt="pet image" className="img-pet" />
      </div>
    </div>
  );
}
