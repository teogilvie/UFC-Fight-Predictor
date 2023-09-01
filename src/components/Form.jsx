import styles from "./Form.module.css";

function Form({ name, onNameInput, children }) {
  return (
    <div>
      <form className={styles.form}>
        <h3>{children}</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameInput(e.target.value)}
        ></input>
      </form>
    </div>
  );
}

export default Form;
