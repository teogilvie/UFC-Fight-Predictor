import styles from "./Form.module.css";

function Form({
  firstName,
  lastName,
  onFirstNameInput,
  onLastNameInput,
  children,
}) {
  return (
    <div>
      <form className={styles.form}>
        <h3>{children}</h3>
        <label>First name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => onFirstNameInput(e.target.value)}
        ></input>
        <label>Last name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => onLastNameInput(e.target.value)}
        ></input>
      </form>
    </div>
  );
}

export default Form;
