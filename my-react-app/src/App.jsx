import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

function App() {
  const YOUR_ACCESS_KEY = 'myHNeFHoPkXbeMBmHoSmpyKTa-dnwJKGx5ag4R9Kc-s';
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [imageModal, setImageModal] = useState(null);
  const [perPage, setPerPage] = useState(8);
  const [error, setError] = useState(null);

  const lastImageRef = useRef(null);

  useEffect(() => {
    const updatePerPage = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const imagesPerRow = Math.floor(vw / 200);
      const rows = Math.floor(vh / 200);

      setPerPage(imagesPerRow + 1);
    };

    updatePerPage();
    window.addEventListener('resize', updatePerPage);

    return () => {
      window.removeEventListener('resize', updatePerPage);
    };
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (!searchTerm) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`
        https://api.unsplash.com/search/photos?client_id=${YOUR_ACCESS_KEY}&query=${searchTerm}&orientation=squarish&page=${page}&per_page=${perPage}`);

        if (data.results.length === 0) {
          throw new Error('No images found.');
        }

        if (page === 1) {
          setImages(data.results);
        } else {
          setImages(prevImages => [...prevImages, ...data.results]);
        }
      } catch (err) {
        setError(err.message);
        toast.error('Error fetching images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm, page, perPage]);

  const handleSearch = term => {
    if (!term || term.trim() === '') {
      toast.error('Please enter a search term');

      return;
    }
    setSearchTerm(term);
    setImages([]);
    setPage(1);
    setError(null);
  };
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  useEffect(() => {
    if (lastImageRef.current) {
      const timeoutId = setTimeout(() => {
        lastImageRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [images.length]);

  const openModal = image => {
    if (!imageModal || imageModal.id !== image.id) {
      setImageModal(image);
    }
  };

  const closeModal = () => {
    setImageModal(null);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={openModal} />
          {images.length > 0 && !loading && (
            <>
              <div ref={lastImageRef} />
              <LoadMoreBtn onClick={handleLoadMore} />
            </>
          )}
        </>
      )}
      {imageModal && <ImageModal image={imageModal} onClose={closeModal} />}
    </>
  );
}

export default App;
