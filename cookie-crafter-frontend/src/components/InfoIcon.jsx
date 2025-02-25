import { useState } from 'react';
import infoIcon from '../assets/info.svg';
import './infoIcon.css';
import { Modal } from './Modal';

export function InfoIcon({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='info-button'
        type='button'
      >
        <img src={infoIcon} alt='Info' className='info-icon' />
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Modal>
    </>
  );
}
