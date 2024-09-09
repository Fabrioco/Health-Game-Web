import React from "react";
import { useAuth } from "../../contexts/auth";
import { FaTrophy } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import "./dashboardStyles.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const signOut = () => {
    logOut();
  };

  console.log(user);

  return (
    <div className="container">
      <div className="dashboard__content">
        <div className="header-dashboard__content">
          <div className="username-uid">
            <h2 className="username">{user?.username}</h2>
            <h3 className="uid">#{user?.uid}</h3>
          </div>
          <div className="level">
            <div className="bar-progress-outline">
              <div className="bar-progress"></div>
            </div>
            <p className="nivel">10</p>
          </div>
          <div className="trophy">
            <span>4</span>
            <FaTrophy color="#FFC300" size={35} />
          </div>
          <i className="settings">
            <IoSettings
              onClick={() => navigate("/profile")}
              color="#000"
              size={35}
            />
          </i>
        </div>
        <div className="main-dashboard__content">
          <div className="actual-quest-day">
            <span className="title">Tarefas do dia</span>
            <div className="actual-quest">
              <p className="quest-text">
                Beber 200 ml de água 5x em um dia completo.
              </p>
            </div>
            <div className="actual-quest">
              <p>Fazer 30 minutos de exercícios fisíco.</p>
            </div>
          </div>
          <div className="actual-quest-week">
            <span>Tarefas da semana</span>
            <div>
              <p>Utilizar aparelhos eletronicos apenas 3 horas por dia.</p>
              <Button onClick={() => {}} type="button">
                Aceitar
              </Button>
              <Button onClick={() => {}} type="button">
                Recusar
              </Button>
            </div>
          </div>
          <div className="sugestions-quests-day">
            <span>Sugestões de tarefas diarias</span>
            <div>
              <p>Caminhar 500m em um dia completo.</p>
              <Button onClick={() => {}} type="button">
                Aceitar
              </Button>
              <Button onClick={() => {}} type="button">
                Recusar
              </Button>
            </div>
          </div>
          <div className="sugetions-quests-week">
            <span>Sugestões de tarefas semanais</span>
            <div>
              <p>Comer 1 maçã por 5 dias.</p>
            </div>
          </div>
          <div className="list-friends"></div>
        </div>
      </div>
    </div>
  );
}
