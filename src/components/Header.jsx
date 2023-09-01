import Button from "./Button";
import style from "./Header.module.css";

function Header() {
  return (
    <div className={style.header}>
      <div className={style.headerContent}>
        <h1>Fight Predictor</h1>
        {/* <Button>Fighter API</Button> */}
      </div>
    </div>
  );
}

export default Header;
