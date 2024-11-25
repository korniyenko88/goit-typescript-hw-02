import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      
    >
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          ✖
        </button>
        <h2 className={styles.modalTitle}>
          {image.description || image.alt_description}
        </h2>
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className={styles.image}
        />
        <p className={styles.description}>Likes: {image.likes}</p>
        <p className={styles.description}>Photographer: {image.user.name}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
