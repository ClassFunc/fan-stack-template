import admin from 'firebase-admin';
import cookies from '../../../utils/setCookie';
import isEmpty from 'lodash/isEmpty';

export default cookies((req, res) => {
  // Get the ID token passed and the CSRF token.
  const {idToken, csrfToken} = req.body;
  // Guard against CSRF attacks.
  if (isEmpty(csrfToken) || csrfToken !== req.cookies.csrfToken) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
    return;
  }
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  admin.auth().createSessionCookie(idToken, {expiresIn}).then(
      (sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = {
          maxAge: expiresIn,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production' && req.secure,
        };
        res.setCookie('session', sessionCookie, options);

        res.send({status: 'success'});
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
      },
  );
});

