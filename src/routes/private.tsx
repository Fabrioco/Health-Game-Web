import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../services/firebaseConnection";
import { useNavigate } from "react-router-dom";
import { useAuth, UserProps } from "../contexts/auth";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [signed, setSigned] = React.useState(false);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSigned(true);
        setUser({
          uid: user.uid,
          email: user.email,
          username: user.displayName,
        } as UserProps);
      } else {
        navigate("/");
      }
    });
    return () => unsub();
  }, [navigate]);

  if (!signed) {
    return null;
  }

  return <>{children}</>;
}
