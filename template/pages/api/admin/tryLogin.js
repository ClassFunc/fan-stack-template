import admin from '../../../firebase/nodeApp';
import checkSession from '../../../middlewares/checkSession';

export default checkSession(async (req, res) => {
  try {
    const user = await admin.auth().getUser(req.uid);
    if (!user) {
      res.status(401).send('UNAUTHORIZED REQUEST!');
      return;
    }
    const snap = await admin.firestore().doc(`users/${user.uid}`).get();
    if (snap.exists) {
      res.json({user: {...user.toJSON(), ...snap.data()}});
    } else {
      res.json({user: user.toJSON()});
    }
  } catch (e) {
    console.log(e);
    res.status(401).send('UNAUTHORIZED REQUEST!');
  }
});
