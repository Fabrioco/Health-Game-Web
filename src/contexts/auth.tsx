import React from "react";
import { auth, db, provider } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Notification from "../components/notification/Notification";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type AuthProviderChildrenType = {
  children: React.ReactNode;
};

export interface UserProps {
  uid: string;
  username: string;
  email: string;
  photoURL: string;
}

type ContextAuthProviderProps = {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  showNotification: ({
    message,
    type,
  }: {
    message: string;
    type: string;
  }) => void;
  sigInWithGoogle: () => void;
  user: UserProps | null;
  setUser: (user: UserProps) => void;
  navigateTo: (route: string) => void;
};

const ContextAuthProvider = React.createContext({} as ContextAuthProviderProps);

export function AuthProvider({ children }: AuthProviderChildrenType) {
  const [user, setUser] = React.useState<UserProps | null>(null);
  const [notification, setNotification] = React.useState({
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showNotification({
          message: "Logado com sucesso!",
          type: "success",
        });
        window.location.href = "/welcome";
      })
      .catch((error) => {
        if (error.message === "auth/user-not-found") {
          showNotification({
            message: "Email não encontrado",
            type: "error",
          });
        } else if (error.message === "auth/wrong-password") {
          showNotification({
            message: "Senha inválida",
            type: "error",
          });
        }
      });
  };
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

  const sigInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        window.location.href = "/welcome";
        showNotification({
          message: "Logado com sucesso!",
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error);
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

  const navigateTo = (route: string) => {
    navigate(`/${route}`);
  };

  return (
    <ContextAuthProvider.Provider
      value={{
        signIn,
        signUp,
        showNotification,
        sigInWithGoogle,
        user,
        setUser,
        navigateTo,
      }}
    >
      {children}
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </ContextAuthProvider.Provider>
  );
}

export const useAuth = () => React.useContext(ContextAuthProvider);
