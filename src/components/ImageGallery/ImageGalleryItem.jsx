import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import propTypes from 'prop-types';

export default function ImageGalleryItem({ image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const { webformatURL, largeImageURL } = image;

  return (
    <>
      <li onClick={handleToggleModal} className={css.imageGalleryItem}>
        <img
          src={webformatURL}
          alt="img"
          className={css.ImageGalleryItemImage}
        />
      </li>
      {isModalOpen && (
        <Modal onClose={handleToggleModal} largeImg={largeImageURL} />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  image: propTypes.shape({
    webformatURL: propTypes.string.isRequired,
    largeImageURL: propTypes.string.isRequired,
  }),
};
