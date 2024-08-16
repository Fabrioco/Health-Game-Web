import "./buttonStyles.css";

type ButtonProps = {
  text: string;
  type: "submit" | "reset" | "button";
  onClick: () => void;
};

export default function Button({ text, type, onClick }: ButtonProps) {
  return (
    <button type={type} className="button" onClick={onClick}>
      {text}
    </button>
  );
}
