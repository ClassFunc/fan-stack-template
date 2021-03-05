import admin from 'firebase-admin';

const checkSession = (handler) => async (req, res) => {
  const sessionCookie = req.cookies.session || '';
  // Verify the session cookie. In this case an additional check is added to detect
  // if the user's Firebase session was revoked, user deleted/disabled, etc.
  // console.log({sessionCookie});
  if (!sessionCookie) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
    return;
  }
  try {
    const {sub} = await admin.auth().
        verifySessionCookie(sessionCookie, true /** checkRevoked */);
    if (sub) {
      req.uid = sub;
      return handler(req, res);
    } else {
      res.status(401).send('UNAUTHORIZED REQUEST!');
    }
  } catch (e) {
    // console.log(e);
    res.status(401).send('UNAUTHORIZED REQUEST!');
  }
};

export default checkSession;
