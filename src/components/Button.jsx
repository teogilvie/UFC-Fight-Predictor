import style from "./Button.module.css";

function Button({ onClick, addClass, children }) {
  return (
    <button onClick={onClick} className={`${style.button} ${addClass}`}>
      {children}
    </button>
  );
}

export default Button;
