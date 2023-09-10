import styles from "./Button.module.css";

export default (props) => {
  const { isSubmitting, classes, submitSuccess } = props;

  const isSubmittingClass =
    isSubmitting || submitSuccess ? `${styles.submitting}` : "";

  const propsClasses = classes ? `${styles[classes]}` : "";

  const isDisabled = isSubmitting || submitSuccess;

  const className = `${styles.button} ${isSubmittingClass} ${propsClasses}`;
  return (
    <button onClick={props.onClick} className={className} disabled={isDisabled}>
      {props.children}
    </button>
  );
};
