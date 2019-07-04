import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  storageBucket: process.env.REACT_APP_storageBucket,
  projectId: "garcker-mash-studio",
  appId: process.env.REACT_APP_appId
};

firebase.initializeApp(config);
firebase.firestore().enablePersistence()
  .catch(function (err) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;

