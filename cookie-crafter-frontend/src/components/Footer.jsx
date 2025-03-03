import { useState } from 'react';
import './footer.css';
import { Modal } from './Modal';
import logo from '../assets/cookie-crafter-logo-transparent-2.webp';

export function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer>
      <section>
        <p>Cookie Crafter &copy; 2025</p>
      </section>
      <section>
        <p>Created by Albina Salkayeva</p>
      </section>
      <section>
        <button
          onClick={() => setIsOpen(true)}
          className='about-button'
          type='button'
        >
          About
        </button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} big={true}>
          <h2>About</h2>
          <div className='about-modal-content'>
            <img
              src={logo}
              alt='Cookie Crafter'
              className='cookie-crafter-logo-big'
            />
            <div className='about-modal-content__text'>
              <ul>
                <li>Created by Albina Salkayeva</li>
                <li>Logo generated with ChatGPT (DALL·E)</li>
                <li>
                  Icons sourced from{' '}
                  <a
                    href='https://www.svgrepo.com'
                    target='_blank'
                    rel='noreferrer'
                  >
                    SVG Repo
                  </a>
                </li>
                <li>
                  Source code available on{' '}
                  <a
                    href='https://github.com/albina0104/cookie-crafter'
                    target='_blank'
                    rel='noreferrer'
                  >
                    GitHub
                  </a>
                </li>
              </ul>
              <p>
                If you have any questions or feedback about the project, feel
                free to reach out via email at{' '}
                <a href='mailto:salkaeva.a@gmail.com'>salkaeva.a@gmail.com</a>!
              </p>
            </div>
          </div>
        </Modal>
      </section>
    </footer>
  );
}
