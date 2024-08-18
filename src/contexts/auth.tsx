import React from "react";
import { auth, db } from "../services/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Notification from "../components/notification/Notification";
import { doc, setDoc } from "firebase/firestore";

type AuthProviderChildrenType = {
  children: React.ReactNode;
};

type ContextAuthProviderProps = {
  signUp: (username: string, email: string, password: string) => Promise<void>;
  showNotification: ({
    message,
    type,
  }: {
    message: string;
    type: string;
  }) => void;
};

const ContextAuthProvider = React.createContext({} as ContextAuthProviderProps);

export function AuthProvider({ children }: AuthProviderChildrenType) {
  const [notification, setNotification] = React.useState({
    message: "",
    type: "",
  });

  const signUp = async (username: string, email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        showNotification({
          message: "Conta criada com sucesso!",
          type: "success",
        });
        await setDoc(doc(db, "players", user.user.uid), {
          uid: user.user.uid,
          username: username,
          email: email,
          password: password,
        });
        window.location.href = "/welcome";
      })
      .catch((error) => {
        if (error.message === "auth/email-already-in-use") {
          showNotification({
            message: "Email já existe",
            type: "error",
          });
        } else if (error.message === "auth/weak-password") {
          showNotification({
            message: "Senha fraca",
            type: "error",
          });
        }
      });
  };

  const showNotification = ({
    message,
    type,
  }: {
    message: string;
    type: string;
  }) => {
    setNotification({
      message,
      type,
    });
    setTimeout(() => {
      setNotification({
        message: "",
        type: "",
      });
    }, 3000);
  };

  return (
    <ContextAuthProvider.Provider value={{ signUp, showNotification }}>
      {children}
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </ContextAuthProvider.Provider>
  );
}

export const useAuth = () => React.useContext(ContextAuthProvider);
