import { useEffect } from 'react';
import css from './Modal.module.css';
import propTypes from 'prop-types';

export default function Modal({ onClose, largeImg }) {
  useEffect(() => {
    const onCloseByEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onCloseByEsc);
    return () => {
      window.removeEventListener('keydown', onCloseByEsc);
    };
  }, [onClose]);

  const onCloseByOverlay = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={onCloseByOverlay}>
      <div className={css.Modal}>
        <img src={largeImg} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClick: propTypes.func,
  onClose: propTypes.func.isRequired,
  largeImg: propTypes.string.isRequired,
};
