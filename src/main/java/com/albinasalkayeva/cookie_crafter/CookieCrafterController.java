package com.albinasalkayeva.cookie_crafter;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Set;

/**
 * Controller for creating custom cookies via the Cookie Crafter API.
 */
@RestController
public class CookieCrafterController {

    /**
     * Creates a cookie with the specified attributes.
     *
     * @param cookieName the name of the cookie (required)
     * @param cookieValue the value of the cookie (required)
     * @param domain the Domain attribute (optional)
     * @param httpOnly the HttpOnly flag (optional)
     * @param maxAge the Max-Age attribute in seconds (optional)
     * @param path the Path attribute (optional)
     * @param secure the Secure flag (optional)
     * @param sameSite the SameSite attribute (optional)
     * @return a ResponseEntity with the Set-Cookie header
     */
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
        ResponseCookie.ResponseCookieBuilder cookieBuilder =
                ResponseCookie.from(encodeString(cookieName), encodeString(cookieValue));

        if (domain != null) {
            cookieBuilder.domain(domain);
        }
        if (httpOnly) {
            cookieBuilder.httpOnly(true);
        }
        if (maxAge != null) {
            cookieBuilder.maxAge(maxAge);
        }
        if (path != null) {
            cookieBuilder.path(path);
        }
        if (secure) {
            cookieBuilder.secure(true);
        }
        if (sameSite != null) {
            if (!isValidSameSiteAttribute(sameSite)) {
                throw new IllegalArgumentException("Invalid SameSite attribute: " + encodeString(sameSite));
            }
            cookieBuilder.sameSite(sameSite);
        }
        ResponseCookie cookie = cookieBuilder.build();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.noContent().headers(headers).build();
    }

    private boolean isValidSameSiteAttribute(String sameSite) {
        Set<String> sameSiteValues = Set.of("Strict", "Lax", "None");
        return sameSiteValues.contains(sameSite);
    }

    private String encodeString(String str) {
        return URLEncoder.encode(str, StandardCharsets.UTF_8);
    }
}
