import React from "react";
import { auth, db, provider } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
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
  password: string;
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
  logOut: () => Promise<void>;
};

const ContextAuthProvider = React.createContext({} as ContextAuthProviderProps);

export function AuthProvider({ children }: AuthProviderChildrenType) {
  const [user, setUser] = React.useState<UserProps | null>(null);
  const [notification, setNotification] = React.useState({
    message: "",
    type: "",
  });

  React.useEffect(() => {
    const userStoraged = localStorage.getItem("@User");
    if (userStoraged) setUser(JSON.parse(userStoraged));
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        const idUser = value.user.uid;

        const docRef = doc(db, "players", idUser);
        const docSnap = getDoc(docRef);

        if ((await docSnap).exists()) {
          const data: UserProps = {
            uid: idUser,
            username: (await docSnap).data()?.username,
            email: value.user.email!,
            password: (await docSnap).data()?.password,
          };
          setUser(data);
          storageUser(data);
        }

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

  const storageUser = (data: UserProps) => {
    localStorage.setItem("@User", JSON.stringify(data));
  };

  const removeUser = () => {
    localStorage.removeItem("@User");
    setUser(null);
  };

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        removeUser();
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

  return (
    <ContextAuthProvider.Provider
      value={{
        signIn,
        signUp,
        showNotification,
        sigInWithGoogle,
        user,
        setUser,
        logOut,
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
