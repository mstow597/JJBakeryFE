import styles from './Response.module.css';

export default (props) => {
  return <div className={styles.response}>{props.children}</div>;
};
