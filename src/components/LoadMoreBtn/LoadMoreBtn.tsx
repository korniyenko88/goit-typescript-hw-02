import styles from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
};

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} type="submit">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
