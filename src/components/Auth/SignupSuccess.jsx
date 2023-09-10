import { useDispatch } from "react-redux";
import Modal from "../UI/Modal/Modal";
import { uiActions } from "../../store/ui";
import Button from "../UI/Button/Button";
import styles from "./SignupSuccess.module.css";

export default () => {
  const dispatch = useDispatch();
  const signupSuccessCloseHandler = () => {
    dispatch(uiActions.closeSignupSuccess());
  };

  return (
    <Modal onClose={signupSuccessCloseHandler} classes="signup-success">
      <div className={styles["signup-success"]}>
        <h3 className={styles["signup-success-heading"]}>Success!</h3>
        <p className={styles["signup-success-description"]}>
          Congratulations, you have successfully signed up for an account.
          Please visit your email to verify your account before signing in.
          Thank you!
        </p>
        <Button onClick={signupSuccessCloseHandler}>Close</Button>
      </div>
    </Modal>
  );
};
