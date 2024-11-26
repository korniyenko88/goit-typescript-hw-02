import React from "react";
import styles from "./ErrorMessage.module.css"


interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.err} style={{ color: 'red', textAlign: 'center' }}>
      {message}
    </div>
  );
};

export default ErrorMessage;
