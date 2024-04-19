import * as React from 'react';
import firebase from 'firebase/app';
import { Spinner, Box, Text, Button, Input } from '@chakra-ui/react';
import withAuth from '../auth/withAuth';
import { useUser } from '../auth/useUser';
import { useCollection } from 'react-firebase-hooks/firestore';

const Private = () => {
  const { user, logout }: { user: any; logout: () => void } = useUser();
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [isQuoter, setIsQuoter] = React.useState<boolean>(false);

  const [admins, adminsLoading, adminsError] = useCollection(
    firebase.firestore().collection('admins'),
    {}
  );

  const [quoters, quotersLoading, quotersError] = useCollection(
    firebase.firestore().collection('quoters'),
    {}
  );

  React.useEffect(() => {
    admins &&
      admins.docs.map((doc) => {
        const adminPhone = doc.data().phone;
        if (user && user.phone.includes(adminPhone)) {
          setIsAdmin(true);
          return true;
        }
        return false;
      });
  }, [admins, user, setIsAdmin]);

  React.useEffect(() => {
    quoters &&
    quoters.docs.map((doc) => {
      const quoterPhone = doc.data().phone;
      if (user && user.phone.includes(quoterPhone)) {
        setIsQuoter(true);
        return true;
      }
      return false;
    });
  }, [user, quoters, setIsQuoter]);

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
      <Box
        bg="white"
        w={{ base: 'full', md: '60%' }}
        mx="auto"
        position="relative"
        zIndex={10}
        p={4}
      >
        {adminsLoading || quotersLoading && <Spinner />}
        <Text size="lg">Private Page</Text>
        {adminsError && adminsError.code !== 'permission-denied' && (
          <strong>Error: {JSON.stringify(adminsError)}</strong>
        )}
        {quotersError && quotersError.code !== 'permission-denied' && (
          <strong>Error: {JSON.stringify(quotersError)}</strong>
        )}
        {user?.id && (
          <div>
            <div>ID: {user.id}</div>
            <div>Phone: {user.phone}</div>
            <div>Is Admin: {isAdmin ? 'True' : 'False'}</div>
            <div>Is Quoter: {isQuoter ? 'True' : 'False'}</div>
            <br />
            <Button
              w={{ base: '100%', lg: 'auto' }}
              type="submit"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        )}
      </Box>
    </Box>
  );
};

// export default withAuth(Private);
export default Private;
