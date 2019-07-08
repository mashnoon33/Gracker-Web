import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyAgA9N_ZLKBjAXTpECCRMafKIafzzuDnZk",
	authDomain: "garcker-mash-studio.firebaseapp.com",
	databaseURL: "https://garcker-mash-studio.firebaseio.com",
	storageBucket: "garcker-mash-studio.appspot.com",
	appId: "1:551481167824:web:b1f389e80c18dc5a",
	projectId: "garcker-mash-studio",
};

firebase.initializeApp(config);
firebase
	.firestore()
	.enablePersistence()
	.catch(function(err) {
		if (err.code === "failed-precondition") {
			// Multiple tabs open, persistence can only be enabled
			// in one tab at a a time.
			// ...
		} else if (err.code === "unimplemented") {
			// The current browser does not support all of the
			// features required to enable persistence
			// ...
		}
	});
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
