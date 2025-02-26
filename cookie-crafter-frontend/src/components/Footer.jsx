import { useState } from 'react';
import './footer.css';
import { Modal } from './Modal';

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
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          repudiandae ipsam excepturi nisi voluptas esse ab quos error id
          debitis maxime fugiat optio officiis sed mollitia, illum reiciendis
          ipsum dolore.
        </Modal>
      </section>
    </footer>
  );
}
