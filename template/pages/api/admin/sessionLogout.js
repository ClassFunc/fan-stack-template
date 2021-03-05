import cookies from '../../../utils/setCookie';
import pathTo from '../../../utils/pathTo';

const admin = require('firebase-admin');

export default cookies((req, res) => {
  const sessionCookie = req.cookies.session || '';
  res.setCookie('session', '', {maxAge: 0});
  admin.auth().verifySessionCookie(sessionCookie).then((decodedClaims) => {
    return admin.auth().revokeRefreshTokens(decodedClaims.sub);
  }).then(() => {
    res.redirect(pathTo('login'));
  }).catch((error) => {
    res.redirect(pathTo('login'));
  });
});
