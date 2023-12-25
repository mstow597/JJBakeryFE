import styles from "./AuthFormInputs.module.css";

export const NameInput = (props) => {
  return (
    <input
      className={styles.input}
      type="text"
      name="name"
      placeholder="Your Name"
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
};

export const PhoneInput = (props) => {
  return (
    <input
      className={styles.input}
      type="tel"
      name="phone"
      placeholder="Phone Number (US or International)"
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
};

export const EmailInput = (props) => {
  return (
    <input
      className={styles.input}
      type="email"
      name="email"
      placeholder="Email"
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
};

export const EmailConfirmInput = (props) => {
  return (
    <input
      className={styles.input}
      type="text"
      name="emailConfirm"
      placeholder="Email Confirmation"
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
};

export const PasswordInput = (props) => {
  return (
    <input
      className={styles.input}
      type="password"
      name="password"
      placeholder={props.placeholder || "Password"}
      value={props.value}
      onChange={props.onChange}
      onFocus={props.onFocus ? props.onFocus : undefined}
      onBlur={props.onBlur ? props.onBlur : undefined}
    ></input>
  );
};

export const PasswordConfirmInput = (props) => {
  return (
    <input
      className={styles.input}
      type="password"
      name="passwordConfirm"
      placeholder="Password Confirmation"
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
};

export const SubmitInput = (props) => {
  const { isSubmitting, allInputsValid, modifiedClass } = props;
  let className = !isSubmitting && allInputsValid ? styles.button : styles.submitting;

  if (modifiedClass) {
    className += ` ${styles[modifiedClass]}`;
  }

  console.log(className);

  return (
    <input
      className={className}
      type="submit"
      disabled={isSubmitting || !allInputsValid}
      value={isSubmitting ? "Submitting..." : "Submit"}
    ></input>
  );
};

export const CancelInput = (props) => {
  return (
    <button className={`${styles.button} ${styles["button-close"]}`} onClick={props.onClick}>
      Cancel
    </button>
  );
};

export const MessageBox = (props) => {
  return;
};
