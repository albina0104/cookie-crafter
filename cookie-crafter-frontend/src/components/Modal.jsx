import ReactDom from 'react-dom';
import './modal.css';
import closeCircle from '../assets/close-circle.svg';

export function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className='modal-overlay' onClick={onClose}></div>
      <div className='modal'>
        <button className='modal__close-button' onClick={onClose} type='button'>
          <img
            src={closeCircle}
            alt='Close'
            className='modal__close-button__icon'
          />
        </button>
        <div className='modal__content'>{children}</div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
