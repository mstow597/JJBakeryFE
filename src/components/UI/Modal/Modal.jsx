import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  const { classes } = props;
  const className = classes
    ? `${styles[classes]} ${styles.modal}`
    : `${styles.modal}`;

  return <div className={className}>{props.children}</div>;
};

export default (props) => {
  const portalElement = document.getElementById("overlays");
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose}></Backdrop>,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <ModalOverlay classes={props.classes}>{props.children}</ModalOverlay>,
        portalElement,
      )}
    </>
  );
};
