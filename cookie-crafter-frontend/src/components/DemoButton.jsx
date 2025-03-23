import { useState } from 'react';
import { Modal } from './Modal';
import './demoButton.css';
import videoIcon from '../assets/video-icon.svg';

export function DemoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className='demo-button'>
        <img src={videoIcon} />
        Demo
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} size='fullscreen'>
        <video controls autoPlay loop>
          <source src='/cookie-crafter-usage-demo.webm' type='video/webm' />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </>
  );
}
