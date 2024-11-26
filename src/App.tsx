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

export interface Image {
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
  alt_description: string;
  description: string;
  likes: number;
  id: string;
}

function App() {
  const YOUR_ACCESS_KEY: string = 'myHNeFHoPkXbeMBmHoSmpyKTa-dnwJKGx5ag4R9Kc-s';
  const [images, setImages] = useState<Image[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [imageModal, setImageModal] = useState<Image | null>(null);
  const [perPage, setPerPage] = useState<number>(8);
  const [error, setError] = useState<string | null>(null);

  const lastImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePerPage = (): void => {
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
    const fetchImages = async (): Promise<void> => {
      if (!searchTerm) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get<{
          results: Image[];
          total: number;
          total_pages: number;
        }>(`
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
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || 'Error fetching data');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error occurred');
        }
        toast.error('Error fetching images.');
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [searchTerm, page, perPage]);

  const handleSearch = (term: string) => {
    if (!term || term.trim() === '') {
      toast.error('Please enter a search term');

      return;
    }
    setSearchTerm(term);
    setImages([]);
    setPage(1);
    setError(null);
  };
  const handleLoadMore = ():void => {
    setPage(prevPage => prevPage + 1);
  };

useEffect(() => {
  if (!lastImageRef.current) return;

  const timeoutId = setTimeout(() => {
    lastImageRef.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 100);

  return () => clearTimeout(timeoutId);
}, [images.length]);

  const openModal = (image: Image): void => {
    if (!imageModal || imageModal.id !== image.id) {
      setImageModal(image);
    }
  };

  const closeModal = (): void => {
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
