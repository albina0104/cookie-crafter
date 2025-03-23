# Cookie Crafter - HTTP cookie testing playground

Cookie Crafter is a tool for experimenting with HTTP cookies. Set custom attributes, create cookies, and observe their behavior in your browser’s DevTools - no need to set up a server yourself.

![](demo/cookie-crafter-usage-demo.gif)

## Table of Contents

- [Project objectives](#project-objectives)
- [Used technologies](#used-technologies)
- [Cookie Crafter features](#cookie-crafter-features)
- [What I learned / Useful resources](#what-i-learned--useful-resources)
  - [Backend (Java / Spring Boot)](#backend-java--spring-boot)
  - [Frontend](#frontend)
  - [Infrastructure](#infrastructure)
- [Links](#links)
- [Author](#author)

## Project objectives

- There have been times when I wanted to understand how different cookie attributes affect their behavior. The best way to learn is through hands-on testing. But each time, I had to manually set up a local environment with a server and a couple of domains to experiment. My goal with this project is to eliminate that hassle by creating a ready-to-use online playground.
- Prove to myself that I can handle every step of creating and deploying a website on my own (even for a tiny project like this), from frontend and backend development to infrastructure setup and deployment.

## Used technologies

- **React** - Frontend
- **Java / Spring Boot** - Backend
- **Apache** - Reverse proxy
- **Docker** - Running frontend, backend, and Apache containers
- **GitHub Actions** - Build and deployment automation
- **GitHub Container Registry** - Storing Docker images
- **VPS server** - Hosting the website

This repository contains the frontend and backend code. There is a separate repository for Apache: [https://github.com/albina0104/my-apache](https://github.com/albina0104/my-apache)

## Cookie Crafter features

Users can:

- Access the site via HTTP or HTTPS
- View informational pop-ups
- Set HTTP cookie attributes: **Name**, **Value**, **Domain**, **Path**, **Max-Age**, **HttpOnly**, **Secure**, **SameSite**
- Configure request parameters: **protocol** (HTTP/HTTPS), **origin** (same origin / cross origin), and the **`credentials`** option in the JavaScript Fetch API
- Send a request to the API to receive a cookie from the server for inspection in the browser's DevTools

## What I learned / Useful resources

### Backend (Java / Spring Boot)

- I've been searching for the right class to create a cookie:

  - `jakarta.servlet.http.Cookie` - cannot set the `SameSite` attribute, so it is not suitable;
  - `org.springframework.http.ResponseCookie` - cannot be used because it has to create a cookie in one go by chaining methods, conditions cannot be added;
  - `ResponseCookie.ResponseCookieBuilder` - can be used.

- I got this warning in logs:

  ```
  Standard Commons Logging discovery in action with spring-jcl: please remove commons-logging.jar from classpath in order to avoid potential conflicts
  ```

  Solution:
  Add the exclusion to the dependency which brought the warning:

  ```xml
  <!-- https://mvnrepository.com/artifact/commons-validator/commons-validator -->
  <dependency>
      <groupId>commons-validator</groupId>
      <artifactId>commons-validator</artifactId>
      <version>1.9.0</version>
      <exclusions>
        <exclusion>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
        </exclusion>
      </exclusions>
  </dependency>
  ```

  Also it can be removed from Spring dependencies and replaced with another logging solution:
  [Logging Dependencies in Spring - Spring blog](https://spring.io/blog/2009/12/04/logging-dependencies-in-spring).

  (Note: first I added this validator dependency, but later removed it as I found out the necessary validations already happen in Spring code.)

- Spring Framework already has validation for the cookie name, value, domain, and path in the `ResponseCookie` class, it can return this kind of error (the error is based on my error template):

  ```json
  {
    "errorCode": 400,
    "errorMessage": "asdfas/asdfao: invalid cookie domain char '47'"
  }
  ```

  However, it does not validate the `SameSite` attribute, so I handle it in my code.

- Using `@RequestParam` requires receiving request parameters in the `application/x-www-form-urlencoded` content-type (this will not accept a request body in JSON format):

  ```java
  @PostMapping("/api/createCookie")
  public ResponseEntity<Void> createCookie(
          @RequestParam(value = "cookieName") String cookieName,
          @RequestParam(value = "cookieValue") String cookieValue,
          @RequestParam(value = "domain", required = false) String domain,
          @RequestParam(value = "httpOnly", required = false) boolean httpOnly,
          @RequestParam(value = "maxAge", required = false) Integer maxAge,
          @RequestParam(value = "path", required = false) String path,
          @RequestParam(value = "secure", required = false) boolean secure,
          @RequestParam(value = "sameSite", required = false) String sameSite
  ) {
  ```

- Learned to use `@ControllerAdvice` with a custom error template for global exception handling in APIs.

- The `logging.file.path` property in the `application.properties` file is ignored. This works instead:
  ```properties
  logging.file.name=./logs/cookie-crafter-backend.log
  ```
  Spring Boot documentation: [Core Features / Logging](https://docs.spring.io/spring-boot/reference/features/logging.html)

### Frontend

- Learned the differences between an uncontrolled vs controlled form in React: [How to use Forms in React - robinwieruch.de](https://www.robinwieruch.de/react-form/)

- Learned about using the `<input>` field in a form in React and about pitfalls: [Components / `<input>` - React docs](https://react.dev/reference/react-dom/components/input)

- Why the browser might not save a cookie: [Browser is not saving cookie - StackOverflow](https://stackoverflow.com/a/72614577)

- How to convert a JS object into URL-encoded format:

  ```javascript
  const requestParams = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    // formData is an object, will be converted to format like "key1=value1&key2=value2"
    body: new URLSearchParams(formData),
  };
  ```

  Learned from: [Using the Fetch API - MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

- CSS reset code is taken from here: [A Simple and Minimal CSS Reset - codu.co](https://www.codu.co/articles/a-simple-and-minimal-css-reset-xc7ypizf)

- Font was sourced from: https://fonts.google.com/

- Used [Pixlr Express](https://pixlr.com/express/) - an AI editor that removed unwanted background elements from the logo for free.

- How to not harm SEO when you have an image instead of a heading: Wrap the image in an `<h1>` tag and the alt text will be used by Google as the headline (from [this Reddit post](https://www.reddit.com/r/web_design/comments/z4k3kb/comment/ixra1ff/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)).

- How to prevent body scrolling:

  - [Prevent body scrolling but allow overlay scrolling - StackOverflow](https://stackoverflow.com/questions/9280258/prevent-body-scrolling-but-allow-overlay-scrolling)
  - Someone's live example: https://codepen.io/anon/pen/oEMmrm

- How to hide a scroll bar: [Hide scroll bar, but while still being able to scroll - StackOverflow](https://stackoverflow.com/a/49278385)

  ```css
  .create-cookie-form__container {
    ...
    /* Hide scrollbar */
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }
  /* Hide scrollbar */
  .create-cookie-form__container::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
  ```

- Icons were sourced from SVG Repo:

  - info icon - https://www.svgrepo.com/svg/24584/info-icon
  - close icon - https://www.svgrepo.com/svg/495162/close-circle

  There's no obligation to give any attribution if you use icons from SVG Repo, but they would appreciate this, so I added the SVG Repo link to my site.

- How to create modals: [Learn React Portal In 12 Minutes By Building A Modal - Web Dev Simplified - YouTube](https://www.youtube.com/watch?v=LyLa7dU5tp8)

- Learned the difference between "site" and "origin":

  - "cross-site" and "cross-origin" are different terms
  - `site1.com` and `api.site1.com` are considered the same site, but the origin is different
  - `SameSite` cookie attribute is about the same **site**
  - CORS policy in browsers is about **cross-origin** requests

- [How to prevent line break at hyphens in all browsers - StackOverflow](https://stackoverflow.com/questions/8753296/how-to-prevent-line-break-at-hyphens-in-all-browsers). Use an extra `span` tag and the `white-space` CSS property:

  ```css
  .nowrap {
    white-space: nowrap;
  }
  ```

  I used this solution for my email address so that it is never wrapped.

- The response from the JS `fetch()` function has `ok` property, which we can use to check for errors:

  ```javascript
  if (!response.ok) {...}
  ```

- About CSS, learned from experience:

  - Position: `absolute` inside `absolute` works the same way as inside `relative`.

  ```css
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  ```

  - Position: `absolute` (without `absolute` or `relative` parents) works the same way as `fixed`.

- Issue: the markers on list `<li>` elements become invisible in the following conditions:

  - `<li>` has the correct CSS property `display: list-item;`
  - `<ul>` has the CSS property `list-style-type: disc;`
  - `::marker` pseudo-elements are visible in DevTools
  - but markers are not visible on the page
  - markers become invisible only when one of the `<ul>` ancestors - `<div>` has property `flex-direction: column;` on the breakpoint change

  Reason: if one of the `<ul>` ancestors has `overflow: hidden`, `auto`, or `scroll`, it can **clip out the markers** because they’re technically rendered _outside_ the element’s content box.

  Solution: Add this to the `<ul>` styles:

  ```css
  ul {
    list-style-position: inside;
  }
  ```

- Learned important meta tags for SEO: [The essential meta tags at a glance - ionos.com](https://www.ionos.com/digitalguide/websites/web-development/the-most-important-meta-tags-and-their-functions/)

- About dockerizing the app:
  - [How to Dockerize a React App: A Step-by-Step Guide for Developers - Docker.com blog](https://www.docker.com/blog/how-to-dockerize-react-app/)
  - [Containerize a Bun application with Docker - bun.sh](https://bun.sh/guides/ecosystem/docker)

### Infrastructure

- In a user-defined Docker bridge network, one container can communicate with another using the service name:

  ```
  $ docker exec -it b0a sh
  / # curl http://cookie-crafter-backend:8080/api
  {"errorCode":404,"errorMessage":"No static resource api."}/ #
  ```

- How to build an image with GitHub Actions and push to GitHub Container Registry: [Publishing and installing a package with GitHub Actions - GitHub Docs](https://docs.github.com/en/packages/managing-github-packages-using-github-actions-workflows/publishing-and-installing-a-package-with-github-actions)

- How to create a custom Apache image: [Using the HTTPd Docker image - Octopus Deploy Blog](https://octopus.com/blog/using-httpd-docker-image)

- How to generate a self-signed SSL certificate with SAN (Subject Alternative Name = several domains) for local usage (need to add it to trusted certificates in the browser): [OpenSSL generate self signed certificate with SAN in one command (subject alternative name) - Raymii.org](https://raymii.org/s/tutorials/OpenSSL_generate_self_signed_cert_with_Subject_Alternative_name_oneliner.html)

- About Apache SSL configuration: [SSL/TLS Strong Encryption: How-To - Apache Docs](https://httpd.apache.org/docs/2.4/ssl/ssl_howto.html)

- Learned several things to secure my server:

  - [How to Set Up SSH Keys on Ubuntu 20.04 - DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-20-04)
  - [How To Disable Root Login on Ubuntu 20.04 - DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-disable-root-login-on-ubuntu-20-04)
  - [How to Set Up a Firewall with UFW on Ubuntu - DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu)
  - [How To Protect SSH with Fail2Ban on Ubuntu 22.04 - DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-22-04)

- Issue: GitHub Actions runner couldn't connect to the VPS server with an SSH key.

  SSH verbose logs showed this error in the runner:

  ```
  debug1: read_passphrase: can't open /dev/tty: No such device or address
  debug1: No more authentication methods to try.
  ***@***: Permission denied (publickey).
  ```

  So it wanted me to input the passphrase, but there's no such possibility in an automated workflow.

  Possible solutions:

  - Use an SSH key without a passphrase
  - Provide the passphrase to `ssh-agent`: [How to use private SSH keys with passwords in GitHub Actions](https://nts.strzibny.name/how-to-use-ssh-private-keys-with-password/)
    - If you blindly follow this article, you will receive this error:
      ```
      Host key verification failed.
      ```
      To solve this error, you need to add the server domain to known hosts in the runner:
      ```
      mkdir -p ~/.ssh
      ssh-keyscan -H ${{ secrets.SERVER_DOMAIN }} >> ~/.ssh/known_hosts
      ```

- Learned to generate Let's Encrypt TLS certificate with [certbot](https://certbot.eff.org/).

  - Useful video: [How to Request SSL Certificates with Let's Encrypt and Certbot](https://www.youtube.com/watch?v=7haN-Aghlso)
  - How I did it:
    ```
    $ sudo apt install certbot
    $ sudo certbot certonly
    ```
    - Chose the option to spin up a temporary webserver, answered other questions
    - The certificate files were generated

- Issue: Apache in container doesn't see Let's Encrypt certificates.

  - Certbot said it created files in the directory `/etc/letsencrypt/live/cookie-crafter.com/`, but in fact they are just symlinks:

  ```
  $ sudo ls -alh live/cookie-crafter.com
  total 12K
  drwxr-xr-x 2 root root 4.0K Mar 12 15:27 .
  drwx------ 3 root root 4.0K Mar 12 14:08 ..
  -rw-r--r-- 1 root root  692 Mar 12 14:08 README
  lrwxrwxrwx 1 root root   42 Mar 12 14:08 cert.pem -> ../../archive/cookie-crafter.com/cert1.pem
  lrwxrwxrwx 1 root root   43 Mar 12 14:08 chain.pem -> ../../archive/cookie-crafter.com/chain1.pem
  lrwxrwxrwx 1 root root   47 Mar 12 14:08 fullchain.pem -> ../../archive/cookie-crafter.com/fullchain1.pem
  lrwxrwxrwx 1 root root   45 Mar 12 14:08 privkey.pem -> ../../archive/cookie-crafter.com/privkey1.pem
  ```

  - I created the following volume mapping for Apache in `docker-compose.yml`:

  ```yml
  volumes:
    - /etc/letsencrypt/live/cookie-crafter.com:/usr/local/apache2/ssl-certs
  ```

  - But Apache cannot get these files from the container via the symlinks, error:

  ```
  my-apache-1                | AH00526: Syntax error on line 45 of /usr/local/apache2/conf/sites/api.cookie-crafter.com.conf:
  my-apache-1                | SSLCertificateFile: file '/usr/local/apache2/ssl-certs/fullchain.pem' does not exist or is empty
  ```

  Solution: add one more directory in the volume mapping:

  ```
  volumes:
    - /etc/letsencrypt/live/cookie-crafter.com:/usr/local/apache2/ssl-certs/cookie-crafter.com
    - /etc/letsencrypt/archive/cookie-crafter.com:/usr/local/apache2/archive/cookie-crafter.com
  ```

  Then symlinks are followed correctly inside the container.

- Issue: HTTPS connection is not working, the browser shows error:

  ```
  This site can’t provide a secure connection
  cookie-crafter.com sent an invalid response.
  ERR_SSL_PROTOCOL_ERROR
  ```

  - Useful article: [OpenSSL Command to Check Certificate - SSL Insights](https://sslinsights.com/openssl-command-to-check-certificate/)
  - I had the same issue as described here: [LetsEncrypt SSL Error - SSL routines:ssl3_get_record:wrong version number - StackOverflow](https://stackoverflow.com/questions/53104734/letsencrypt-ssl-error-ssl-routinesssl3-get-recordwrong-version-number)

    - This answer helped me: https://stackoverflow.com/a/74403433

      I had the same reason of the issue - I had 2 virtual hosts on the same port 443, and for one I uncommented SSL directives to test the certificate, and decided to uncomment for the second virtual host only after the first one is proved working. But turned out, we cannot do like this!

  Solution: use `SSLEngine on` on both virtual hosts listening on port 443.

## Links

- Repository URL:
  - Frontend and backend: [https://github.com/albina0104/cookie-crafter](https://github.com/albina0104/cookie-crafter)
  - Apache: [https://github.com/albina0104/my-apache](https://github.com/albina0104/my-apache)
- Live site URL: [cookie-crafter.com](https://cookie-crafter.com/)

## Author

- GitHub - [albina0104](https://github.com/albina0104)
