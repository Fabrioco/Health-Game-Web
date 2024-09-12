import Button from "../../../../components/button/Button";
import { useAuth } from "../../../../contexts/auth";
import "./styles.css";
import { IoMdCloseCircle, IoMdLogOut } from "react-icons/io";

interface ModalSettingsProps {
  isOpenModalSettings: string;
  setIsOpenModalSettings: (value: string) => void;
}

export const ModalSettings: React.FC<ModalSettingsProps> = ({
  isOpenModalSettings,
  setIsOpenModalSettings,
}) => {
  const { logOut } = useAuth();

  return (
    <div className={`container-modal ${isOpenModalSettings}`}>
      <div className="content-modal-settings">
        <i>
          <IoMdCloseCircle
            color="#ff0000"
            size={25}
            onClick={() => setIsOpenModalSettings("closed")}
          />
        </i>
        <h1>Configurações</h1>

        <p onClick={logOut}>
          <i>
            <IoMdLogOut color="#000" size={25} />
          </i>
          Sair
        </p>
      </div>
    </div>
  );
};
