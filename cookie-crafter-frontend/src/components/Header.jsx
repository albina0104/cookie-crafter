import logo from '../assets/cookie-crafter-logo-transparent-3.webp';
import './header.css';
import { InfoIcon } from './InfoIcon';

export function Header() {
  return (
    <div id='header'>
      <h1>
        <img src={logo} alt='Cookie Crafter' id='cookie-crafter-logo' />
      </h1>
      <div id='header__text'>
        <p>
          <strong>Welcome to Cookie Crafter!</strong>
        </p>
        <p>
          Want to test HTTP cookies without the hassle of setting up a server?{' '}
          <strong>
            Cookie Crafter is your playground for hands-on testing!
          </strong>{' '}
          Choose attributes, create cookies, and inspect their behavior using
          your browser&apos;s DevTools. <InfoIcon />
        </p>
      </div>
    </div>
  );
}
