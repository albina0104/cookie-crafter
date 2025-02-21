import ReactDom from 'react-dom';
import './modal.css';

export function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className='modal-overlay' onClick={onClose}></div>
      <div className='modal'>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  );
}
