import React, { useEffect } from 'react';
import router from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../utils/firebase/initFirebase';

initFirebase();
const auth = firebase.auth();

const withAuth = (Component) => (props) => {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push('/');
      }
    });
  }, []);

  // useEffect(() => {
  //   const messaging = initFirebase().messaging();
  //   messaging
  //     .requestPermission()
  //     .then((token) => {
  //       return messaging.getToken();
  //     })
  //     .then((token) => {
  //       console.log('token', token);
  //     });
  // });

  return (
    <div>
      <Component {...props} />
    </div>
  );
};

export default withAuth;
