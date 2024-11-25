import styles from "./ErrorMessage.module.css"

const ErrorMessage = ({ message }) => {
  return <div className={styles.err} style={{ color: 'red', textAlign: 'center' }}>{message}</div>;
};

export default ErrorMessage;
