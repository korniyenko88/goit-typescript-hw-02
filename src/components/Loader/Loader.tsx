import { BallTriangle } from 'react-loader-spinner';
import styles from './Loader.module.css'; // Підключіть стилі, якщо вони є

const Loader = () => {
  return (
    <div className={styles.loaderLocation}>
      <BallTriangle
        height={80}
        width={80}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
