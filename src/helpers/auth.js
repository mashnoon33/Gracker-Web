import {firebaseAuth, googleProvider} from "../config/firebase";

export function loginWithGoogle() {
    return firebaseAuth().signInWithRedirect(googleProvider);
    //return authenticate(loginWithFirebase(googleProvider));
}


export function logout() {
    return firebaseAuth().signOut();
}

