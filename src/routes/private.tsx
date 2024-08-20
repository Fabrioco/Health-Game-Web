import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../services/firebaseConnection";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [signed, setSigned] = React.useState(false);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSigned(true);
      } else {
        window.location.href = "/";
      }
    });
    return () => unsub();
  }, [window.location.pathname]);

  if (!signed) {
    return null;
  }
  return children;
};
