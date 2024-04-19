import * as React from 'react';
import { Box } from '@chakra-ui/react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../../utils/firebase/initFirebase';
import { setUserCookie } from '../../auth/userCookie';
import { mapUserData } from '../../auth/useUser';

initFirebase();

const uiConfig: any = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
  signInSuccessUrl: '/',
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const userData = await mapUserData(user);
      setUserCookie(userData);
    },
  },
};

function PhoneLogin() {
  return (
    <Box
      bgAttachment="fixed"
      bgImage="url('/Anduro_BOPP_weave21500SM.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="95vh"
      minH="screen"
      py={8}
    >
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Box>
  );
}

export default PhoneLogin;
