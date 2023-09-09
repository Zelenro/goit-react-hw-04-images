import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { AppWrapper } from './App.styled';
import { fetchImages } from './api';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(null);

  useEffect(() => {
    if (query !== '') {
      fetchImages(query, page)
        .then(newImages => {
          setImages(prevImages => [...prevImages, ...newImages]);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching images:', error);
          setLoading(false);
        });
    }
  }, [query, page]);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = imageIndex => {
    setShowModal(true);
    setModalImageIndex(imageIndex);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImageIndex(null);
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery>
        {images.map((image, index) => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            onClick={() => openModal(index)}
          />
        ))}
      </ImageGallery>
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <Button onClick={loadMore}>Load more</Button>
      )}
      {showModal && modalImageIndex !== null && (
        <Modal
          onClose={closeModal}
          src={images[modalImageIndex].largeImageURL}
          alt={images[modalImageIndex].tags}
        />
      )}
    </AppWrapper>
  );
};

