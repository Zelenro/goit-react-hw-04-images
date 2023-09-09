import React, { useEffect } from 'react';
import { ModalWrapper, OverlayWrapper } from './Modal.styled';

export const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <OverlayWrapper onClick={handleClick}>
      <ModalWrapper>
        <img src={src} alt={alt} />
      </ModalWrapper>
    </OverlayWrapper>
  );
};


