import React, { useState, useEffect } from 'react';
import { getToken } from '../../utils/common.utils';
import firebase from 'firebase';

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

  console.log('Token found', isTokenFound);

  // To load once
  useEffect(() => {
    const messaging = firebase.messaging();
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound, messaging);
      if (data) {
        console.log('Token is', data);
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;
