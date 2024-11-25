import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} type="submit">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
