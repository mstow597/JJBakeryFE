import styles from './MainNavButton.module.css';

export default (props) => {
  return (
    <button onClick={props.onClick} className={styles['btn--main-nav']}>
      {props.children}
    </button>
  );
};
