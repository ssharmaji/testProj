import * as React from 'react';
import withAuth from '../auth/withAuth';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useUser } from '../auth/useUser';
import { useAppDispatch } from '../state/useAppDispatch';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spinner,
} from '@chakra-ui/react';

const db = firebase.firestore();

const EditAccount = () => {
  const activeLoader = true;

  const { user }: { user: any } = useUser();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [isQuoter, setIsQuoter] = React.useState<boolean>(false);
  const [canViewForm, setCanViewForm] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState(false);
  const [pagedata, setPagedata] = React.useState<any>({
    name: '',
    email: '',
    phone: '',
    docId: '',
  });
  const [documentID, setDocumentID] = React.useState(null);
  const [admins, adminsLoading, adminsError] = useCollection(
    firebase
      .firestore()
      .collection('admins')
      .where('phone', '==', user ? user.phone : ''),
    {}
  );
  const [quoters, quotersLoading, quotersError] = useCollection(
    firebase
      .firestore()
      .collection('quoters')
      .where('phone', '==', user ? user.phone : ''),
    {}
  );

  React.useEffect(() => {
    admins &&
      admins.docs.map((doc) => {
        setDocumentID(doc?.id);
        const adminPhone = doc.data().phone;
        console.log('adminPhone', adminPhone);
        if (user && user?.phone.includes(adminPhone)) {
          setIsAdmin(true);
          setPagedata(doc?.data());
          return true;
        }
        return false;
      });
  }, [admins, user, setIsAdmin]);

  React.useEffect(() => {
    console.log('user.phone', user?.phone);
    quoters &&
      quoters.docs.map((doc) => {
        setDocumentID(doc?.id);
        const quoterPhone = doc.data().phone;
        console.log('quoterPhone', quoterPhone);
        if (user && user.phone.includes(quoterPhone)) {
          setIsQuoter(true);
          setPagedata(doc?.data());
          return true;
        }
        return false;
      });
  }, [user, quoters, setIsQuoter]);

  React.useEffect(() => {
    setCanViewForm(isAdmin || isQuoter);
    setCanViewForm(true);
  }, [isAdmin, isQuoter]);

  const updateClickHandler = async () => {
    setLoader(true);
    const collectionName = isAdmin ? 'admins' : 'quoters';
    const docRef = db.collection(collectionName);

    pagedata.phone = user.phone;

    try {
      if (documentID) {
        await docRef.doc(documentID).update(pagedata);
        console.log('Document updated successfully!!');
      } else {
        const docSnapshot = await docRef.add(pagedata);
        console.log('Document written with ID:', docSnapshot.id);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Box
      className="container-box"
      bgAttachment="fixed"
      bgImage="url('/Anduro_BOPP_weave21500SM.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      minH="95vh"
      py={8}
    >
      <Box mx="auto" position="relative" zIndex={10}>
        {/* {activeLoader || adminsLoading || (quotersLoading && <Spinner />)}
        {adminsError && adminsError.code !== 'permission-denied' && (
          <strong>Error: {JSON.stringify(adminsError)}</strong>
        )}
        {quotersError && quotersError.code !== 'permission-denied' && (
          <strong>Error: {JSON.stringify(quotersError)}</strong>
        )} */}
        {canViewForm && (
          <form>
            <Box>
              <Accordion defaultIndex={[0, 1, 2, 3, 4, 5, 6, 7]} allowMultiple>
                <div className="container">
                  <div className="edit-account">
                    <div className="box">
                      <AccordionItem id="accountInformation">
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <Heading
                              as="h2"
                              py={1}
                              size="md"
                              textTransform="uppercase"
                              textAlign={'center'}
                            >
                              {'Edit Account'}
                            </Heading>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </AccordionItem>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={pagedata?.name}
                          onChange={(e) => {
                            setPagedata({ ...pagedata, name: e.target.value });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          value={pagedata?.email}
                          onChange={(e) => {
                            setPagedata({ ...pagedata, email: e.target.value });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={user?.phone}
                          onChange={(e) => {
                            setPagedata({ ...pagedata, phone: e.target.value });
                          }}
                        />
                      </div>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          paddingTop: '20px',
                        }}
                      >
                        <Button
                          onClick={updateClickHandler}
                          colorScheme="blue"
                          size="sm"
                        >
                          {loader ? 'Updating...' : 'Update'}
                        </Button>
                      </Box>
                    </div>
                  </div>
                </div>
              </Accordion>
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default withAuth(EditAccount);
// export default Home;
