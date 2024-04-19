// @ts-nocheck
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

const Notification = () => {
  // requestForToken();
  const router = useRouter();
  const itemLimit = 10;
  const { user, logout }: { user: any; logout: () => void } = useUser();
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [isQuoter, setIsQuoter] = React.useState<boolean>(false);
  const [tableData, setTableData] = React.useState([]);
  const [adminData, setAdminData] = React.useState({});
  const toast = useToast();
  const [admins, adminsLoading, adminsError] = useCollection(
    firebase.firestore().collection('admins'),
    {}
  );

  const [quoters, quotersLoading, quotersError] = useCollection(
    firebase.firestore().collection('quoters'),
    {}
  );

  const [notificationData, notificationDataLoading, notificationDataError] =
    useCollection(firebase.firestore().collection('notifications'), {});

  React.useEffect(() => {
    const dataSet = [];
    notificationData?.docs?.map((doc) => {
      dataSet.push({ id: doc.id, ...doc.data() });
    });
    setTableData(dataSet);
  }, [notificationData]);

  React.useEffect(() => {
    admins?.docs?.map((doc) => {
      const adminPhone = doc.data().phone;
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
        if (user && user.phone.includes(quoterPhone)) {
          setIsQuoter(true);
          return true;
        }
        return false;
      });
  }, [user, quoters, setIsQuoter]);

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
                    <th>Quote Name</th>
                    <th>Message</th>
                    {isAdmin ? '' : <th>Action By</th>}
                  </tr>
                  {tableData?.length > 0 &&
                    tableData?.map((item, index) => {
                      if (isAdmin) {
                        if (item?.notificationType == 'Admin')
                          return (
                            <tr key={item.id}>
                              <td>{item?.quoteData?.quoteName}</td>
                              <td>{item?.message}</td>
                            </tr>
                          );
                      } else {
                        if (item?.to?.contactName == user?.phone) {
                          return (
                            <tr key={item.id}>
                              <td>{item?.quoteData?.quoteName}</td>
                              <td>{item?.message}</td>
                              <td>{item?.from?.name}</td>
                            </tr>
                          );
                        }
                      }
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

//export default withAuth(quoteList);
export default Notification;
