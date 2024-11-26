import { Image } from '../../App';
import styles from './ImageCard.module.css';

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}
const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
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
