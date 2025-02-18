import './createCookieForm.css';

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

    fetch(`http://${apiDomain}/api/createCookie`, requestParams);
  }

  return (
    <>
      <div>
        <p>Create a cookie</p>
        <form onSubmit={handleSubmit} id='create-cookie-form'>
          <fieldset>
            <legend>Cookie attributes:</legend>

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
            <legend>Other request parameters:</legend>

            <fieldset className='radiobutton-fieldset'>
              <legend>Origin</legend>

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
              <legend>Credentials</legend>

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

          <button type='submit' className='create-cookie-form__submit-button'>
            Create
          </button>
        </form>
      </div>
    </>
  );
}
