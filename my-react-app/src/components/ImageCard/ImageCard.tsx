import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  return (
    <div>
      <img
        onClick={onClick}
        className={styles.cardImg}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
