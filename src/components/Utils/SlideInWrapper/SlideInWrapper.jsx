import styles from './SlideInWrapper.module.css';

export default (props) => {
  return <main className={styles['slide-in-wrapper']}>{props.children}</main>;
};
