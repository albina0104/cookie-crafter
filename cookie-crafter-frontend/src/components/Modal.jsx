import ReactDom from 'react-dom';
import './modal.css';
import closeCircle from '../assets/close-circle.svg';

export function Modal({ open, children, onClose, size }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className='modal-overlay' onClick={onClose}></div>
      <div
        className={
          'modal ' +
          (size == 'big'
            ? 'modal--big'
            : size == 'fullscreen'
              ? 'modal--fullscreen'
              : 'modal--small')
        }
      >
        <button className='modal__close-button' onClick={onClose} type='button'>
          <img
            src={closeCircle}
            alt='Close'
            className='modal__close-button__icon'
          />
        </button>
        <section className='modal__content'>{children}</section>
      </div>
    </>,
    document.getElementById('portal')
  );
}
