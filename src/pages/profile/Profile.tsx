import { useAuth } from "../../contexts/auth";
import "./profileStyles.css";

export default function Profile() {
  const { logOut } = useAuth();
  return (
    <div className="container">
      <div className="profile-content">
        <h1>teste</h1>
        <button onClick={() => logOut()}>Sair</button>
      </div>
    </div>
  );
}
