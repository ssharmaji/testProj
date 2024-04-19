import type { NextApiRequest, NextApiResponse } from 'next';
import * as sgMail from '@sendgrid/mail';
import { IQuoteDisplay } from '../../domain/IQuoteDisplay';
import { getQuoteHtml } from '../../utils/email.utils';
import * as admin from 'firebase-admin';
// import serviceAccountJson from '../../firebaseAdminCredentials.json';

// const serviceAccount = serviceAccountJson as admin.ServiceAccount;

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

const db = admin.firestore();

const addQuoteToFirestore = async (quoteData) => {
  try {
    const docRef = await db.collection('quotes').add(quoteData);
    console.log('Document written with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
};
/*

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

type ReqBody = {
  bagsPerPallet: number;
  bestPrice: string;
  palletTableData: Array<{
    numPallets: number;
    qty: string;
    pxPerThousand: string;
  }>;
  quoteDisplay: IQuoteDisplay;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res
      .status(405)
      .json({ success: false, message: 'Only post requests accepted.' });
  }

  const { bagsPerPallet, bestPrice, palletTableData, quoteDisplay }: ReqBody =
    JSON.parse(req.body);

  if (!bagsPerPallet || !bestPrice || !palletTableData || !quoteDisplay) {
    res
      .status(400)
      .json({ success: false, message: 'Missing request details.' });
  }

  //const to = ['tryon2@mac.com', 'jbeardles@gmail.com'];
  const to = [
    // 'marc@anduromfg.com',
    // 'mduron@anduromfg.com',
    // 'ryan@anduromfg.com',
    // 'quotes@anduromfg.com',
    // 'mtrevino@anduromfg.com',
    // 'tryon2@mac.com',
    'nikgaur241@gmail.com'
  ];
  const from = 'pricing@anduromfg.com';

  const html = getQuoteHtml({
    bagsPerPallet,
    bestPrice,
    palletTableData,
    quoteDisplay,
  });

  const msg = {
    to,
    from,
    subject: 'New Quote Generated',
    text: html,
    html,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
      addQuoteToFirestore({
        bagsPerPallet,
        bestPrice,
        palletTableData,
        quoteDisplay,
      });

      res.json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.status(500);
    });
};
*/
// addQuoteToFirestore({
//   bagsPerPallet,
//   bestPrice,
//   palletTableData,
//   quoteDisplay,
// });
