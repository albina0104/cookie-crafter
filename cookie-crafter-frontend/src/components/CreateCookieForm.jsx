import { objectToQueryParams } from '../functions/objectToQueryParams';

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
      body: objectToQueryParams(formData),
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
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Cookie attributes:</legend>

            <label htmlFor='cookieName'>Cookie name</label>
            <input type='text' id='cookieName' defaultValue='my_cookie' />
            <br />

            <label htmlFor='cookieValue'>Cookie value</label>
            <input type='text' id='cookieValue' defaultValue='test_value' />
            <br />

            <label htmlFor='domain'>Domain</label>
            <input
              type='text'
              id='domain'
              defaultValue={import.meta.env.VITE_SITE_DOMAIN}
            />
            <br />

            <label htmlFor='path'>Path</label>
            <input type='text' id='path' defaultValue='/' />
            <br />

            <label htmlFor='maxAge'>Max-Age</label>
            <input type='text' id='maxAge' defaultValue='100' />
            <br />

            <input type='checkbox' id='httpOnly' />
            <label htmlFor='httpOnly'>HttpOnly</label>
            <br />

            <input type='checkbox' id='secure' />
            <label htmlFor='secure'>Secure</label>
            <br />

            <fieldset>
              <legend>SameSite</legend>

              <input
                type='radio'
                id='sameSiteStrict'
                name='sameSite'
                value='Strict'
              />
              <label htmlFor='sameSiteStrict'>Strict</label>

              <input
                type='radio'
                id='sameSiteLax'
                name='sameSite'
                value='Lax'
              />
              <label htmlFor='sameSiteLax'>Lax</label>

              <input
                type='radio'
                id='sameSiteNone'
                name='sameSite'
                value='None'
              />
              <label htmlFor='sameSiteNone'>None</label>
              <br />

              <input
                type='radio'
                id='sameSiteNotSpecified'
                name='sameSite'
                value='not specified'
                defaultChecked
              />
              <label htmlFor='sameSiteNotSpecified'>not specified</label>
            </fieldset>
          </fieldset>

          <fieldset>
            <legend>Other request parameters:</legend>

            <fieldset>
              <legend>Origin</legend>

              <input
                type='radio'
                id='sameOrigin'
                name='origin'
                value='same origin'
              />
              <label htmlFor='sameOrigin'>same origin</label>

              <input
                type='radio'
                id='crossOrigin'
                name='origin'
                value='cross-origin'
                defaultChecked
              />
              <label htmlFor='crossOrigin'>cross-origin</label>
              <br />
            </fieldset>

            <fieldset>
              <legend>Credentials</legend>

              <input
                type='radio'
                id='credentialsInclude'
                name='credentials'
                value='include'
                defaultChecked
              />
              <label htmlFor='credentialsInclude'>include</label>

              <input
                type='radio'
                id='credentialsOmit'
                name='credentials'
                value='omit'
              />
              <label htmlFor='credentialsOmit'>omit</label>

              <input
                type='radio'
                id='credentialsNotSpecified'
                name='credentials'
                value='not specified'
              />
              <label htmlFor='credentialsNotSpecified'>not specified</label>
              <br />
            </fieldset>
          </fieldset>

          <button type='submit'>Create</button>
        </form>
      </div>
    </>
  );
}
