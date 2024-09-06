import React from "react";
import { useAuth } from "../../contexts/auth";
import { FaTrophy } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import "./dashboardStyles.css";

export default function Dashboard() {
  const { user, logOut } = useAuth();

  const signOut = () => {
    logOut();
  };

  console.log(user)

  return (
    <div className="container">
      <div className="dashboard__content">
        <header className="header-dashboard__content">
          <h2>{user?.username}</h2>
          <h3>{user?.uid}</h3>
          <div className="bar-progress-outline">
            <div className="bar-progress"></div>
          </div>
          <span>4</span>
          <FaTrophy color="#FFC300" size={35} />
          <IoSettings color="#000" size={35} />
          <IoMdExit onClick={signOut} color="#FF0000" size={35} />
        </header>
        <main></main>
      </div>
    </div>
  );
}
