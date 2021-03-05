const admin = require('firebase-admin');

const serviceAccount = require('./nodeApp_service_account.json');

const settings = {timestampsInSnapshots: true};
const adminConfig = {
  ...JSON.parse(process.env.FIREBASE_CONFIG || '{}')
  , credential: admin.credential.cert(serviceAccount),
};
if (!admin.apps.length) {
  admin.initializeApp(adminConfig);
  admin.firestore().settings(settings);
}
module.exports = admin;
