import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './Searchbar';
import fetchImgWithQuery from '../PixabayApi';
import ImageGallery from './ImageGallary';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

import s from './App.module.css';

function App() {
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [imgArray, setImgArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const request = await fetchImgWithQuery(search, page);
        await setImgArray(prevArray => [...prevArray, ...request]);
        scrollImg();
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (search) fetchMyAPI();
  }, [search, page]);

  const onSubmitForm = data => {
    setSearch(data);
    setPage(1);
    setIsLoading(true);
    setError(null);
    setImgArray([]);
  };

  const uploadMorePhotos = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const scrollImg = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const onClickImage = largeImageURL => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  };

  const imgFound = imgArray.length > 0 && !error;
  const imgNotFound = search && imgArray.length === 0 && !error && !isLoading;

  return (
    <div className={s.Container}>
      <Searchbar onSubmitForm={onSubmitForm} />
      {error && <p>Whoops, something went wrong. Try again.</p>}
      {imgFound && (
        <>
          <ImageGallery onClickImage={onClickImage} imgArray={imgArray} />
          {!isLoading && <Button uploadMorePhotos={uploadMorePhotos} />}
          {isLoading && <Loader />}
          {showModal && (
            <Modal largeImageURL={largeImageURL} toggleModal={toggleModal} />
          )}
        </>
      )}
      {imgNotFound && <p>No results were found for your search. Try again.</p>}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
