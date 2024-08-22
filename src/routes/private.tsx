import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../services/firebaseConnection";
import { useNavigate } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const navigate = useNavigate();
  const [signed, setSigned] = React.useState(false);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSigned(true);
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
