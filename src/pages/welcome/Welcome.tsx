import { signOut } from "firebase/auth";
import { useAuth, UserProps } from "../../contexts/auth";
import { auth, db } from "../../services/firebaseConnection";
import React from "react";
import { doc, getDoc } from "firebase/firestore";
import Button from "../../components/button/Button";
import pet from "../../assets/images/pet.png";

import "./welcomeStyles.css";

export default function Welcome() {
  const { showNotification, user, setUser } = useAuth();
  const [end, setEnd] = React.useState(1);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        showNotification({
          message: "Deslogado com sucesso!",
          type: "success",
        });
      })
      .catch((error) => {
        showNotification({
          message: error.message,
          type: "error",
        });
      });
  };

  React.useEffect(() => {
    if (auth.currentUser) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const docRef = doc(db, "players", `${auth.currentUser?.uid}`);
    const data = await getDoc(docRef);
    setUser(data.data() as UserProps);
  };

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
          </div>
          <div className="buttons">
            <Button
              onClick={
                end === 1 ? handleSignOut : () => setEnd((end) => end - 1)
              }
              type="button"
            >
              {end === 1 ? <p>Sair da conta</p> : <p>VOLTAR</p>}
            </Button>
            <Button onClick={() => setEnd((end) => end + 1)} type="button">
              AVANÇAR
            </Button>
          </div>
        </div>

        <img src={pet} alt="pet image" className="img-pet" />
      </div>
    </div>
  );
}
