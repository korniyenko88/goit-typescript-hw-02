import { useState } from 'react';
import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');


  const hendleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    onSearch(inputValue.trim());
    setInputValue('');
  };

  return (
    <div className={styles.searchWraper}>
      <header>
        <form className={styles.seachForm} onSubmit={hendleSubmit}>
          <input
            className={styles.searchInput}
            type="text"
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
            placeholder="Search images and photos"
          />
          <button className={styles.searchBtn} type="submit">
            <svg
              className={styles.searchSvg}
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="20"
              height="20"
              viewBox="0 0 32 32"
            >
              <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
            </svg>
          </button>
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
