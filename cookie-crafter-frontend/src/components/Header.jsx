import logo from '../assets/cookie-crafter-logo-transparent-3.webp';
import './header.css';
import { InfoIcon } from './InfoIcon';
import { DemoButton } from './DemoButton';

export function Header() {
  return (
    <header id='header'>
      <h1>
        <img src={logo} alt='Cookie Crafter' className='cookie-crafter-logo' />
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
            <div className='how-to-use-modal__header'>
              <h2>How to use the tool</h2>
              <DemoButton />
            </div>

            <ol>
              <li>Open DevTools in your browser to record network requests.</li>
              <li>
                Fill out the form on the site (choose cookie attributes and
                request parameters).
              </li>
              <li>
                Click the <strong>&quot;Create cookie!&quot;</strong> button.
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

            <p>
              Note: The tool works with both HTTP and HTTPS. You can access the
              site via{' '}
              <a
                href={`http://${import.meta.env.VITE_SITE_DOMAIN}`}
              >{`http://${import.meta.env.VITE_SITE_DOMAIN}`}</a>{' '}
              or{' '}
              <a
                href={`https://${import.meta.env.VITE_SITE_DOMAIN}`}
              >{`https://${import.meta.env.VITE_SITE_DOMAIN}`}</a>
              .
            </p>
          </InfoIcon>{' '}
        </p>
      </div>
    </header>
  );
}
