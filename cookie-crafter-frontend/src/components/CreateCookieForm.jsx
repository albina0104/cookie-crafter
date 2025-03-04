import { ToastContainer, toast } from 'react-toastify';
import { Header } from './Header';
import { InfoIcon } from './InfoIcon';
import { Footer } from './Footer';
import './createCookieForm.css';
import cookieIcon from '../assets/cookie-icon.svg';
import eraserIcon from '../assets/eraser-circle.svg';

export function CreateCookieForm() {
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      cookieName: e.target.elements.cookieName.value,
      cookieValue: e.target.elements.cookieValue.value,
      domain: e.target.elements.domain.value,
      path: e.target.elements.path.value,
      maxAge: e.target.elements.maxAge.value,
      httpOnly: e.target.elements.httpOnly.checked,
      secure: e.target.elements.secure.checked,
    };
    if (e.target.elements.sameSite.value !== 'not specified') {
      formData.sameSite = e.target.elements.sameSite.value;
    }

    const protocol = e.target.elements.protocol.value;

    let apiDomain;
    if (e.target.elements.origin.value == 'same origin') {
      apiDomain = import.meta.env.VITE_SITE_DOMAIN;
    } else {
      apiDomain = import.meta.env.VITE_API_DOMAIN;
    }

    const requestParams = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData),
    };
    if (e.target.elements.credentials.value !== 'not specified') {
      requestParams.credentials = e.target.elements.credentials.value;
    }

    fetch(`${protocol}://${apiDomain}/api/createCookie`, requestParams)
      .then((response) => {
        if (!response.ok) {
          response
            .json()
            .then((data) => {
              toast.error(
                `Error: ${data.errorMessage}. Response status: ${response.status}.`
              );
            })
            .catch(
              toast.error(
                `An error occurred. Response status: ${response.status}.`
              )
            );
        } else {
          toast.success(`You got a cookie! 🍪`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('An error occurred. Check the console for details.');
      });
  }

  return (
    <>
      <div className='create-cookie-form__container'>
        <ToastContainer />
        <form onSubmit={handleSubmit} id='create-cookie-form'>
          <Header />
          <fieldset>
            <legend>
              Cookie attributes{' '}
              <InfoIcon>
                <h2>Cookie attributes</h2>
                <p>Read about cookie attributes on MDN Docs:</p>
                <ul>
                  <li>
                    <a
                      href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Using HTTP cookies
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <code>Cookie</code> request header
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <code>Set-Cookie</code> response header
                    </a>
                  </li>
                </ul>
              </InfoIcon>
            </legend>

            <label htmlFor='cookieName' className='cookie-attributes__label'>
              Cookie name
            </label>
            <input
              type='text'
              id='cookieName'
              defaultValue='my_cookie'
              className='cookie-attributes__input'
            />

            <label htmlFor='cookieValue' className='cookie-attributes__label'>
              Cookie value
            </label>
            <input
              type='text'
              id='cookieValue'
              defaultValue='test_value'
              className='cookie-attributes__input'
            />

            <label htmlFor='domain' className='cookie-attributes__label'>
              Domain
            </label>
            <input
              type='text'
              id='domain'
              defaultValue={import.meta.env.VITE_SITE_DOMAIN}
              className='cookie-attributes__input'
            />

            <label htmlFor='path' className='cookie-attributes__label'>
              Path
            </label>
            <input
              type='text'
              id='path'
              defaultValue='/'
              className='cookie-attributes__input'
            />

            <label htmlFor='maxAge' className='cookie-attributes__label'>
              Max-Age
            </label>
            <input
              type='text'
              id='maxAge'
              defaultValue='100'
              className='cookie-attributes__input'
            />

            <div>
              <label
                htmlFor='httpOnly'
                className='cookie-attributes__checkbox-label'
              >
                <input
                  type='checkbox'
                  id='httpOnly'
                  className='cookie-attributes__checkbox'
                />
                HttpOnly
              </label>

              <label
                htmlFor='secure'
                className='cookie-attributes__checkbox-label'
              >
                <input
                  type='checkbox'
                  id='secure'
                  className='cookie-attributes__checkbox'
                />
                Secure
              </label>
            </div>
            <br />

            <fieldset className='radiobutton-fieldset'>
              <legend>SameSite</legend>

              <label className='radiobutton-label'>
                <input
                  type='radio'
                  id='sameSiteStrict'
                  name='sameSite'
                  value='Strict'
                />
                Strict
              </label>

              <label className='radiobutton-label'>
                <input
                  type='radio'
                  id='sameSiteLax'
                  name='sameSite'
                  value='Lax'
                />
                Lax
              </label>

              <label className='radiobutton-label'>
                <input
                  type='radio'
                  id='sameSiteNone'
                  name='sameSite'
                  value='None'
                />
                None
              </label>

              <label className='radiobutton-label'>
                <input
                  type='radio'
                  id='sameSiteNotSpecified'
                  name='sameSite'
                  value='not specified'
                  defaultChecked
                />
                not specified
              </label>
            </fieldset>
          </fieldset>

          <fieldset className='other-params-fieldset'>
            <legend>Other request parameters</legend>

            <fieldset className='radiobutton-fieldset'>
              <legend>
                Protocol{' '}
                <InfoIcon>
                  <h2>Protocol</h2>
                  <p>
                    Determines whether the request is sent over an unencrypted
                    (HTTP) or encrypted (HTTPS) connection.
                  </p>
                </InfoIcon>
              </legend>

              <label className='radiobutton-label'>
                <input type='radio' id='http' name='protocol' value='http' />
                HTTP
              </label>

              <label className='radiobutton-label'>
                <input
                  type='radio'
                  id='https'
                  name='protocol'
                  value='https'
                  defaultChecked
                />
                HTTPS
              </label>
            </fieldset>

            <fieldset className='radiobutton-fieldset'>
              <legend>
                Origin{' '}
                <InfoIcon>
                  <h2>Origin</h2>
                  <ul>
                    <li>
                      <strong>same origin</strong> - the request will be sent to
                      the <code>{import.meta.env.VITE_SITE_DOMAIN}</code> domain
                      (the same domain as this site)
                    </li>
                    <li>
                      <strong>cross-origin</strong> - the request will be sent
                      to the <code>{import.meta.env.VITE_API_DOMAIN}</code>{' '}
                      domain (a different origin)
                    </li>
                  </ul>
                </InfoIcon>
              </legend>

              <label className='radiobutton-label'>
                <input
                  type='radio'
                  id='sameOrigin'
                  name='origin'
                  value='same origin'
                />
                same origin
              </label>

              <label className='radiobutton-label'>
                <input
                  type='radio'
                  id='crossOrigin'
                  name='origin'
                  value='cross-origin'
                  defaultChecked
                />
                cross-origin
              </label>
            </fieldset>

            <fieldset className='radiobutton-fieldset'>
              <legend>
                Credentials{' '}
                <InfoIcon>
                  <h2>Credentials</h2>
                  <p>
                    This is an option of the JavaScript Fetch API for making
                    HTTP requests. It determines whether cookies will be sent
                    with the request.
                  </p>
                  <p>
                    Read more about the Fetch API on MDN Docs: <br />
                    <a
                      href='https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#including_credentials'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Using the Fetch API - Including credentials
                    </a>
                  </p>
                  <ul>
                    <li>
                      <strong>
                        <code>include</code>
                      </strong>{' '}
                      - cookies will be sent with the request
                    </li>
                    <li>
                      <strong>
                        <code>omit</code>
                      </strong>{' '}
                      - cookies will not be sent with the request
                    </li>
                    <li>
                      <strong>not specified</strong> (same as{' '}
                      <code>same-origin</code>) - the browser will only send
                      cookies with same-origin requests
                    </li>
                  </ul>
                </InfoIcon>
              </legend>

              <label className='radiobutton-label'>
                <input
                  type='radio'
                  id='credentialsInclude'
                  name='credentials'
                  value='include'
                  defaultChecked
                />
                include
              </label>

              <label className='radiobutton-label'>
                <input
                  type='radio'
                  id='credentialsOmit'
                  name='credentials'
                  value='omit'
                />
                omit
              </label>

              <label className='radiobutton-label'>
                <input
                  type='radio'
                  id='credentialsNotSpecified'
                  name='credentials'
                  value='not specified'
                />
                not specified
              </label>
            </fieldset>
          </fieldset>

          <div className='create-cookie-form__button-container'>
            <button type='submit' className='create-cookie-form__button'>
              <img src={cookieIcon} />
              Create cookie!
            </button>

            <button type='reset' className='create-cookie-form__button'>
              <img src={eraserIcon} />
              Reset form
            </button>
          </div>

          <Footer />
        </form>
      </div>
    </>
  );
}
