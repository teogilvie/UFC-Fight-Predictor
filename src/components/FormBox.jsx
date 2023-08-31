import style from "./FormBox.module.css";

function FormBox({ children }) {
  return <div className={style.formbox}>{children}</div>;
}

export default FormBox;
