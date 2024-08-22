import { signOut } from "firebase/auth";
import { useAuth, UserProps } from "../../contexts/auth";
import { auth, db } from "../../services/firebaseConnection";
import React from "react";
import { doc, getDoc } from "firebase/firestore";

export default function Welcome() {
  const { showNotification, user, setUser } = useAuth();

  React.useEffect(() => {}, []);

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
    showNotification({
      message: "Bem vindo",
      type: "success",
    });
  };

  return (
    <div>
      <div>
        <h1>Seja Bem vindo ao HealthGame</h1>
        <p>Olá, @{user?.username}</p>
        <button onClick={handleSignOut}>Sair</button>
      </div>
    </div>
  );
}
