import * as React from 'react';
import firebase from 'firebase/app';
import {
  Flex,
  Spinner,
  Box,
  Text,
  Button,
  Input,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import withAuth from '../auth/withAuth';
import { useUser } from '../auth/useUser';
import { useCollection } from 'react-firebase-hooks/firestore';
import PhoneLogin from '../components/PhoneLogin/PhoneLogin';
import { useRouter } from 'next/router';
import { onMessageListener } from '../utils/common.utils';
import Link from 'next/link';
const db = firebase.firestore();

const quoteList = () => {
  // requestForToken();
  const router = useRouter();
  const itemLimit = 10;
  const { user, logout }: { user: any; logout: () => void } = useUser();
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [isQuoter, setIsQuoter] = React.useState<boolean>(false);
  const [pagedata, setPagedata] = React.useState(null);
  const [lastDocument, setLastDocument] = React.useState(null);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [allDataLoaded, setAllDataLoaded] = React.useState(false);
  const [tableData, setTableData] = React.useState([]);
  const [adminData, setAdminData] = React.useState<any>({});
  const toast = useToast();
  const [admins, adminsLoading, adminsError] = useCollection(
    //firebase.firestore().collection('admins').where('phone', '==', user ? user.phone : ""),
    firebase.firestore().collection('admins'),
    {}
  );

  const [quoters, quotersLoading, quotersError] = useCollection(
    //firebase.firestore().collection('quoters').where('phone', '==', user ? user.phone : ""),
    firebase.firestore().collection('quoters'),
    {}
  );
  const [quotes, quotesLoading, quotesError] = useCollection(
    //firebase.firestore().collection('quoters').where('phone', '==', user ? user.phone : ""),
    firebase.firestore().collection('quotes'),
    {}
  );

  // React.useEffect(() => {
  //   const messaging = firebase.messaging();
  //   console.log(messaging);
  //   onMessageListener(messaging)
  //     .then((payload) => {
  //       // setShow(true);
  //       // setNotification({
  //       //   title: payload.notification.title,
  //       //   body: payload.notification.body,
  //       // });
  //       console.log(payload);
  //     })
  //     .catch((err) => console.log('failed: ', err));
  // }, []);

  React.useEffect(() => {
    const dataSet = [];
    quotes?.docs?.map((doc) => {
      dataSet.push({ id: doc.id, ...doc.data() });
    });

    setTableData(dataSet);
  }, [quotes]);

  const loadDocuments = (query) => {
    setLoadingMore(true);
    query
      .limit(itemLimit)
      .get()
      .then((value) => {
        const newDocumentsArray = value.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setPagedata((prevData) => [...(prevData || []), ...newDocumentsArray]);
        setLastDocument(value.docs[value.docs.length - 1]);
        if (value.docs.length < itemLimit) {
          setAllDataLoaded(true);
        } else {
          setAllDataLoaded(false);
        }
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  const loadMoreDocuments = () => {
    if (lastDocument) {
      let collectionRef = isAdmin
        ? db.collection('quotes')
        : db.collection('quotes').where('phone', '==', user ? user.phone : '');

      collectionRef = collectionRef.startAfter(lastDocument);

      loadDocuments(collectionRef);
    }
  };

  React.useEffect(() => {
    admins?.docs?.map((doc) => {
      const adminPhone = doc.data().phone;
      console.log(adminPhone);
      if (user && user.phone.includes(adminPhone)) {
        setIsAdmin(true);
        setAdminData(doc.data());
        return true;
      }
      return false;
    });
  }, [admins, user, setIsAdmin]);

  React.useEffect(() => {
    quoters &&
      quoters.docs.map((doc) => {
        const quoterPhone = doc.data().phone;
        console.log(quoterPhone);
        if (user && user.phone.includes(quoterPhone)) {
          setIsQuoter(true);
          return true;
        }
        return false;
      });
  }, [user, quoters, setIsQuoter]);

  React.useEffect(() => {
    let collectionRef = isAdmin
      ? db.collection('quotes')
      : db.collection('quotes').where('phone', '==', user ? user.phone : '');

    collectionRef = collectionRef;

    loadDocuments(collectionRef);
  }, [isAdmin, user]);

  const approveClickHandler = async (item, index, key) => {
    const getTableData = [...tableData];
    let dataSet = item;
    let collectionRef = db.collection('quotes');
    dataSet.quoteDisplay.quoteData.status = key;
    try {
      await collectionRef.doc(item?.id).update(dataSet);
      const docRef = await db.collection('notifications').add({
        from: adminData.phone
          ? adminData
          : {
              name: 'admin',
              email: 'admin@admin.com',
              phone: '+*-***-***-****',
            },
        to: dataSet?.quoteDisplay?.customerDetails,
        quoteData: dataSet.quoteDisplay.quoteData,
        notificationType: 'user',
        message: `Your Quote is ${key}`,
      });
      getTableData[index].quoteDisplay.quoteData.status = key;
      setTableData(getTableData);
      toast({
        title: `${key}.`,
        description: `Quote ${key} successfully!`,
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // setLoader(false);
    }
  };

  const declineClickHandler = (item, index) => {};

  if (!user?.id) {
    return <PhoneLogin />;
  }

  return (
    <Box
      bgAttachment="fixed"
      bgImage="url('/Anduro_BOPP_weave21500SM.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      minH="95vh"
      // minH="screen"
      py={8}
    >
      <div className="container">
        <div className="quote-detail">
          <div className="box">
            <div className="inner-Text-heading">
              <h1 style={{ fontSize: '30px', textAlign: 'center' }}>
                {isAdmin ? 'Quotes List' : isQuoter ? 'Quotes List' : ''}
              </h1>
            </div>
            <div className="table table-sm">
              <table className="user-list-table">
                <tbody>
                  <tr className="table-head">
                    <th>Document ID</th>
                    <th>Quote Name</th>
                    <th>Order Size</th>
                    <th>Order Date</th>
                    <th>Delivery Date</th>
                    <th>Annual Usage</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  {tableData?.length > 0 &&
                    tableData?.map((data, index) => {
                      const returnHtml = (item: any, isAdminButton: any) => (
                        <tr key={item.id}>
                          <td data-attr="Order Size">{item?.id}</td>
                          <td data-attr="Order Size">
                            {item?.quoteDisplay?.orderDetails?.quoteName}
                          </td>
                          <td data-attr="Order Size">
                            {item?.quoteDisplay?.orderDetails?.orderSize}
                          </td>
                          <td data-attr="Order Size">
                            {item?.quoteDisplay?.orderDetails?.orderDate}
                          </td>
                          <td data-attr="Order Size">
                            {
                              item?.quoteDisplay?.orderDetails
                                ?.desiredDeliveryDate
                            }
                          </td>
                          <td data-attr="Order Size">
                            {item?.quoteDisplay?.orderDetails?.annualUsage}
                          </td>
                          <td data-attr="Order Size">
                            {item?.quoteDisplay?.quoteData?.status}
                          </td>

                          {isAdminButton ? (
                            <td data-attr="Action">
                              <button
                                className="approve-btn"
                                onClick={() =>
                                  approveClickHandler(item, index, 'Approved')
                                }
                              >
                                Approve &nbsp;&nbsp;
                              </button>
                              <button
                                className="decline-btn"
                                onClick={() =>
                                  approveClickHandler(item, index, 'Rejected')
                                }
                              >
                                &nbsp;&nbsp;Decline
                              </button>
                            </td>
                          ) : (
                            <td>
                              <button
                                type="button"
                                onClick={() =>
                                  router.push({
                                    pathname: '/',
                                    query: {
                                      data: `x${btoa(JSON.stringify(item))}t`,
                                    },
                                  })
                                }
                                // onClick={() => console.log(item)}
                              >
                                Edit
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                      if (isAdmin) {
                        return returnHtml(data, true);
                      } else if (
                        data?.quoteDisplay?.customerDetails?.contactName ==
                        user?.phone
                      ) {
                        return returnHtml(data, false);
                      }
                    })}
                </tbody>
              </table>
            </div>
            <Flex
              id="formButtons"
              // bg="white"
              py={4}
              px={8}
              d="flex"
              justify={{ base: 'center', lg: 'center' }}
              w={{ base: 'full', lg: 'auto' }}
            >
              <ButtonGroup colorScheme="blue" w={{ base: '100%', lg: 'auto' }}>
                <Button
                  w={{ base: '100%', lg: 'auto' }}
                  onClick={loadMoreDocuments}
                  disabled={loadingMore || allDataLoaded}
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </Button>
              </ButtonGroup>
            </Flex>
          </div>
        </div>
      </div>
    </Box>
  );
};

//export default withAuth(quoteList);
export default quoteList;
