import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";
import Modal from "../UI/Modal/Modal";
import styles from "./ContactSuccess.module.css";
import Button from "../UI/Button/Button";

export default () => {
  const dispatch = useDispatch();

  const closeContactSuccessHandler = () => {
    dispatch(uiActions.closeContactSuccess());
  };

  return (
    <Modal onClose={closeContactSuccessHandler} classes="contact-success">
      <div className={styles["contact-success"]}>
        <h3 className={styles["contact-success-heading"]}>
          Thank You for Reaching Out!
        </h3>
        <p className={styles["contact-success-message"]}>
          We appreciate you getting in touch with us. Our team is hard at work
          reviewing your message and will reach out to you shortly. In the
          meantime, feel free to explore more of our delicious offerings!
        </p>
        <Button onClick={closeContactSuccessHandler}>Close</Button>
      </div>
    </Modal>
  );
};
