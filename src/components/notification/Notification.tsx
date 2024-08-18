import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import "./notificationStyles.css";

export default function Notification({
  message,
  type,
}: {
  message: string;
  type: string;
}) {
  return (
    <div className="notification">
      {type === "success" ? (
        <FaCheckCircle color="green" size={20} />
      ) : (
        <FaExclamationTriangle color="red" size={20} />
      )}
      <span className="message">{message}</span>
    </div>
  );
}
