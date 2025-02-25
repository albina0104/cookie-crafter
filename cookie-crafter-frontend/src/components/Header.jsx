import logo from '../assets/cookie-crafter-logo-transparent-3.webp';
import './header.css';
import { InfoIcon } from './InfoIcon';

export function Header() {
  return (
    <header id='header'>
      <h1>
        <img src={logo} alt='Cookie Crafter' id='cookie-crafter-logo' />
      </h1>
      <div id='header__text'>
        <p>
          <strong>Welcome to Cookie Crafter!</strong>
        </p>
        <p>
          Want to test{' '}
          <a
            href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies'
            target='_blank'
            rel='noreferrer'
          >
            HTTP cookies
          </a>{' '}
          without the hassle of setting up a server?{' '}
          <strong>
            Cookie Crafter is your playground for hands-on testing!
          </strong>{' '}
          Choose attributes, create cookies, and inspect their behavior using
          your browser&apos;s DevTools.{' '}
          <InfoIcon>
            <h2>How to use the tool:</h2>

            <ol>
              <li>Open DevTools in your browser to record network requests.</li>
              <li>
                Fill out the form on the site (choose cookie attributes and
                request parameters).
              </li>
              <li>
                Click the <strong>&quot;Create&quot;</strong> button.
              </li>
              <li>
                Inspect DevTools:
                <ul>
                  <li>
                    In the <strong>&quot;Network&quot;</strong> tab, inspect the{' '}
                    <code>createCookie</code> request:
                    <ul>
                      <li>
                        Check cookies sent to the server in the{' '}
                        <strong>Request Headers</strong> (<code>Cookie</code>{' '}
                        header).
                      </li>
                      <li>
                        Check cookies received from the server in the{' '}
                        <strong>Response Headers</strong> (
                        <code>Set-Cookie</code> header).
                      </li>
                    </ul>
                  </li>
                  <li>
                    In the <strong>&quot;Application&quot;</strong> or{' '}
                    <strong>&quot;Storage&quot;</strong> tab, check cookies
                    saved in the browser in the &quot;Cookies&quot; section.
                  </li>
                </ul>
              </li>
            </ol>
          </InfoIcon>{' '}
        </p>
      </div>
    </header>
  );
}
