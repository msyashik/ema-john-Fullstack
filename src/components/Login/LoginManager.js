import React from "react";
import firebaseConfig from "../../firebase.config";
import firebase from "firebase/app";
import "firebase/auth";

export const initializeLoginFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
};

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      };
      return signedInUser;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};

export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      // The signed-in user info.
      var user = result.user;
      return user;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signOutUser = {
        isSignIn: false,
        name: "",
        email: "",
        photo: "",
      };
      return signOutUser;
    })
    .catch((err) => console.log(err));
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUser = res.user;
      newUser.message = "You have successfully created your account!";
      newUser.messageColor = "green";
      updateUserName(name);
      return newUser;
    })
    .catch((error) => {
      const newUser = {};
      newUser.message = "Sorry! Your account is already created!";
      newUser.messageColor = "red";
      return newUser;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      return res.user;
      //   setLoggedInUser(user);
      //   history.replace(from);
    })
    .catch((error) => {
      const singedInUser = {};
      singedInUser.message = error.message;
      return singedInUser;
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(function () {
      // Update successful.
      console.log("user name updated successfully!");
    })
    .catch(function (error) {
      // An error happened.
      console.log(error);
    });
};

const LoginManager = () => {
  return <div></div>;
};

export default LoginManager;
