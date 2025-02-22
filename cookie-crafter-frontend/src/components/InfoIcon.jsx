import { useState } from 'react';
import infoIcon from '../assets/info.svg';
import './infoIcon.css';
import { Modal } from './Modal';

export function InfoIcon() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className='info-button'>
        <img src={infoIcon} alt='Info' className='info-icon' />
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        adipisci illo at pariatur vel? Veniam quisquam non repudiandae, officia
        aliquam ipsam neque soluta error perspiciatis quia odio, sint rem
        repellendus!
      </Modal>
    </>
  );
}
