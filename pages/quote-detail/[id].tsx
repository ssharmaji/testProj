import * as React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Image,
  Flex,
  Box,
} from '@chakra-ui/react';

// Code Added BY JAY
import { format } from 'date-fns';
// import { useRouter } from 'next/router';

import { IQuoteDisplay } from '../../domain/IQuoteDisplay';
import {
  bagsPerPalletSelector,
  quoteDisplaySelector,
  quoteStateSelector,
  totalPalletsSelector,
} from '../../state/quote/quote.selectors';

import {
  BagStyle,
  BagDimensions,
  BagSpecs,
  OrderDetails,
  PalletPrices,
} from '../../components/QuoteTables';
import {
  calculateBagTotalSQM,
  calculateMOQ,
  generatePalletTable,
} from '../../utils/quote.utils';
import { IQuoteState } from '../../domain/IQuoteState';
import { BOPP_FABRIC_COSTS } from '../../calculator/CostAtPlant/raw-materials/raw-materials.constants';
import PhoneLogin from '../../components/PhoneLogin/PhoneLogin';
import { useUser } from '../../auth/useUser';
import withAuth from '../../auth/withAuth';
import QuoteCountdown from '../../components/Countdown/QuoteCountdown';
import { useAppDispatch } from '../../state/useAppDispatch';
import { clearQuoteData } from '../../state/quote/quote.slice';
import { BAGS_PER_PALLET } from '../../calculator/calculator.constants';
import firebase from 'firebase/app';

const quoteDetail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user }: { user: any } = useUser();
  const id = router.query.id as string;
  console.log(id);
  const db = firebase.firestore();

  const [canViewQuote, setCanViewQuote] = React.useState<boolean>(true);
  const [isCalculated, setIsCalculated] = React.useState<boolean>(false);
  const [palletDetails, setPalletDetails] = React.useState<
    Array<{
      numPallets: number;
      qty: string;
      pxPerThousand: string;
    }>
  >([]);

  const [accordionOpen, setAccordionOpen] = React.useState({});
  const toggleAccordion = (accordionId) => {
    setAccordionOpen((prev) => ({
      ...prev,
      [accordionId]: !prev[accordionId],
    }));
  };

  const [bestPrice, setBestPrice] = React.useState<string>(null);
  const [devDetails, setDevDetails] = React.useState([]);

  const quoteState: IQuoteState = useSelector(quoteStateSelector);
  const quoteDisplay: IQuoteDisplay = useSelector(quoteDisplaySelector);
  const bagsPerPallet: number = useSelector(bagsPerPalletSelector);
  //const bagsPerPallet: number = 10;
  const totalPallets: number = useSelector(totalPalletsSelector);

  const addQuoteToFirestore = async (quoteData) => {
    try {
      const docRef = await db.collection('users').add(quoteData);
      console.log('Document written with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  React.useEffect(() => {
    if (!user?.id) return;

    const {
      bagName,
      bagStyle,
      containerLength,
      closedEnd,
      estimatedOrderQty,
      extrudateGSM,
      ezOpenTape,
      fabricColor,
      fabricGSM,
      fabricSupplier,
      finalDestination,
      finishedLength,
      gsm,
      gusset,
      handle,
      layerMaterial,
      outerLayerType,
      sleeveLength,
      stickerOrHotMelt,
      width,
      moqKg,
      adLamCharge,
      tapeMtsKg,
      ezOpenTapeMtsKg,
      commissionPercentage,
      AMSAPxToAPOrCaMexCostPercentage,
      APPriceToCustomerPercentage,
    } = quoteState;

    const generatePalletTableDataForBag = (bagIndex) => {
      let palletTableData = {};
      var bagNameIndex = bagName && bagName[bagIndex] ? bagName[bagIndex] : 0;
      var finishedLengthIndex =
        finishedLength && finishedLength[bagIndex]
          ? finishedLength[bagIndex]
          : 0;

      var gussetIndex = gusset && gusset[bagIndex] ? gusset[bagIndex] : 0;
      var sleeveLengthIndex =
        sleeveLength && sleeveLength[bagIndex] ? sleeveLength[bagIndex] : 0;
      var widthIndex = width && width[bagIndex] ? width[bagIndex] : 0;
      var gluePlateDepthIndex =
        gluePlateDepth && gluePlateDepth[bagIndex]
          ? gluePlateDepth[bagIndex]
          : 0;
      var matteFinish = outerLayerType.includes('Matte');

      const BAG_SIZE = (
        parseFloat(widthIndex) +
        parseFloat(gussetIndex) +
        parseFloat(finishedLengthIndex)
      ).toFixed(1);
      const bagsPerPallet = BAGS_PER_PALLET[BAG_SIZE];
      const totalPallets = Math.round(estimatedOrderQty / bagsPerPallet);

      const moqValue: number = calculateMOQ({
        gusset: parseFloat(gussetIndex),
        moqKg: quoteDisplay.bagDetails.moqKg,
        printedGSM: quoteDisplay.bagDetails.gsm,
        sleeveLength: parseFloat(sleeveLengthIndex),
        width: parseFloat(widthIndex),
      });

      const bagTotalSQMValue: number = calculateBagTotalSQM({
        gusset: parseFloat(gussetIndex),
        finishedLength: parseFloat(finishedLengthIndex),
        width: parseFloat(widthIndex),
      });

      const parameters = {
        adLamCharge,
        AMSAPxToAPOrCaMexCostPercentage,
        APPriceToCustomerPercentage,
        bagStyle,
        bagsPerPallet,
        boppGSM: BOPP_FABRIC_COSTS[layerMaterial],
        commissionPercentage,
        containerLength,
        closedEnd,
        extrudateGSM,
        ezOpenTape,
        ezOpenTapeMtsKg,
        fabricColor,
        fabricGSM,
        fabricSupplier,
        finishedLength: parseFloat(finishedLengthIndex),
        fob: finalDestination,
        gusset: parseFloat(gussetIndex),
        handle,
        layerMaterial,
        logisticsPrice: 0,
        matteFinish: matteFinish,
        moq: moqValue,
        moqKg,
        printedGSM: gsm,
        qty: estimatedOrderQty,
        sleeveLength: parseFloat(sleeveLengthIndex),
        stickerOrHotMelt,
        tapeMtsKg,
        totalPallets,
        width: parseFloat(widthIndex),
      };

      const allBagsData = generatePalletTable(parameters);
      const prices = allBagsData.map((palletData) => palletData.pxPerThousand);
      const pricesWithoutCurrency = allBagsData.map(
        (palletData) => palletData.pxPerThousandWithoutCurrency
      );

      palletTableData = {
        pallet_data: allBagsData,
        bag_total_sqm_value: bagTotalSQMValue,
        bags_per_pallet: bagsPerPallet,
        prices: prices,
        prices_without_currency: pricesWithoutCurrency,
        highest_price: pricesWithoutCurrency[0],
        best_price: prices[prices.length - 1],
        bag_gsm: quoteDisplay.bagDetails.gsm,
        moq: moqValue,
        bagName: bagNameIndex,
        finishedLength: finishedLengthIndex,
        gluePlateDepth: gluePlateDepthIndex,
        gusset: gussetIndex,
        sleeveLength: sleeveLengthIndex,
        width: widthIndex,
      };

      return palletTableData;
    };

    const bagsNameTmp = quoteDisplay.bagDetails.bagName || [];
    const allBagsData = bagsNameTmp.map((bagName, index) =>
      generatePalletTableDataForBag(index)
    );

    const prices = ['', '', ''];
    const devDetails = ['', '', ''];

    setPalletDetails(allBagsData);
    setBestPrice(prices[prices.length - 1]);
    setIsCalculated(true);
    setDevDetails(devDetails);
    // send email to ????

    const reqBody = {
      bagsPerPallet: '',
      bestPrice: prices[prices.length - 1],
      allBagsData,
      quoteDisplay,
    };

    console.log('===quoteDisplay START===');
    console.log(reqBody);
    console.log('===quoteDisplay END===');

    // addQuoteToFirestore(reqBody);
  }, [user]);

  const onCountdownCompleted = () => {
    //setCanViewQuote(false);
    //dispatch(clearQuoteData());
    //router.push('/');
  };

  if (!user?.id) {
    return <PhoneLogin />;
  }

  const bagsName = quoteDisplay.bagDetails.bagName || [];
  const bagWidth = quoteDisplay.bagDetails.bagWidth || [];
  const bagGusset = quoteDisplay.bagDetails.bagGusset || [];
  const sleeveLength = quoteDisplay.bagDetails.sleeveLength || [];
  const finishedLength = quoteDisplay.bagDetails.finishedLength || [];
  const gluePlateDepth = quoteDisplay.bagDetails.gluePlateDepth || [];

  const quoteName = quoteDisplay.orderDetails.quoteName || '';
  const orderDate = quoteDisplay.orderDetails.orderDate || '';

  // console.log('quoteDisplay START');
  // console.log(quoteDisplay);
  // console.log('quoteDisplay END');

  return (
    <Box
      className="container-box"
      bgAttachment="fixed"
      bgImage="url('/Anduro_BOPP_weave21500SM.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="full"
      minH="screen"
      py={8}
    >
      <div className="container">
        <div className="quote-detail">
          <div className="heading-box">
            <h5>{quoteName}</h5>
            <h5>{orderDate}</h5>
          </div>
          <div className="box">
            <div className="inner-heading">
              <h3>BAG STYLE</h3>
            </div>
            <div className="table table-sm">
              <table>
                <tbody>
                  <tr className="table-head">
                    <th>Type</th>
                    <th>Order Size</th>
                    <th>Mfg End</th>
                    <th>Annual Usage</th>
                    <th>Customer End</th>
                    <th>FOB</th>
                    <th>Desired Delivery Date</th>
                  </tr>
                  <tr>
                    <td data-attr="Type">{quoteDisplay.bagStyle.type}</td>
                    <td data-attr="Order Size">
                      {quoteDisplay.orderDetails.orderSize}
                    </td>
                    <td data-attr="Mfg End">{quoteDisplay.bagStyle.mfgEnd}</td>
                    <td data-attr="Annual Usage">
                      {quoteDisplay.orderDetails.annualUsage}
                    </td>
                    <td data-attr="Customer End">
                      {quoteDisplay.bagStyle.customerEnd}
                    </td>
                    <td data-attr="FOB">{quoteDisplay.orderDetails.fob}</td>
                    <td data-attr="Desired Delivery Date">
                      {quoteDisplay.orderDetails.desiredDeliveryDate}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="box">
            <div className="inner-heading">
              <h3>BAG SPECS</h3>
            </div>
            <div className="table">
              <table>
                <tbody>
                  <tr>
                    <th>Outer Layer</th>
                    <td colSpan={4}>{quoteDisplay.bagSpecs.outerLayerType}</td>
                  </tr>
                  <tr className="table-head">
                    <th># Colors</th>
                    <th>Fabric GSM</th>
                    <th>Fabric Color</th>
                    <th>Prepress Cost</th>
                    <th>Handle</th>
                  </tr>
                  <tr>
                    <td data-attr="# Colors">
                      {quoteDisplay.bagSpecs.numberOfColors}
                    </td>
                    <td data-attr="Fabric GSM">
                      {quoteDisplay.bagSpecs.fabricGSM}
                    </td>
                    <td data-attr="Fabric Color">
                      {quoteDisplay.bagSpecs.fabricColor}
                    </td>
                    <td data-attr="Prepress Cost">
                      {quoteDisplay.bagSpecs.prepressCost}
                    </td>
                    <td data-attr="Handle">{quoteDisplay.bagSpecs.handle}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="box">
            <div className="inner-heading">
              <h3>BAG PRICING DETAIL</h3>
            </div>
            <div>
              {bagsName.map((bagName, index) => (
                <div className="table table-full" key={index}>
                  <table>
                    <tbody>
                      <tr>
                        <th>Bag Name</th>
                        <td colSpan={4}>{bagsName[index]}</td>
                        <td
                          colSpan={5}
                          className="text-align-right quote-good-for"
                        >
                          Quote is good for 30 days from submission
                        </td>
                      </tr>
                      <tr className="table-head">
                        <th>Width</th>
                        <th>Gusset</th>
                        <th>Sleeve Length</th>
                        <th>Finished Length</th>
                        <th>Bag GSM</th>
                        <th>Bag total SQM</th>
                        <th>Bag Per Pallet</th>
                        <th>MOQ</th>
                        <th>Best Price Per 1,000</th>
                        <th
                          rowSpan={2}
                          data-attr="MOQ Detail"
                          data-attr-content="accordion-content"
                          data-attr-type="accordion"
                          data-attr-open={accordionOpen[index]}
                          data-item={`moq_item_details-${index}`}
                          onClick={() => toggleAccordion(`${index}`)}
                        >
                          MOQ Detail
                          <span className="arrow-icon fa-solid fa-chevron-down"></span>
                          {accordionOpen[index] && (
                            <Accordion className="accordion-wrapper">
                              <AccordionItem
                                className="accordion-item"
                                id={`moq_item_details-${index}`}
                                data-attr-open={accordionOpen[index]}
                              >
                                <Box className="moq_table_container">
                                  <PalletPrices
                                    highestCost={
                                      palletDetails[index]
                                        ? palletDetails[index]['highest_price']
                                        : ''
                                    }
                                    palletCosts={
                                      palletDetails[index]['pallet_data']
                                    }
                                  />
                                </Box>
                              </AccordionItem>
                            </Accordion>
                          )}
                        </th>
                      </tr>
                      <tr>
                        <td className="width col-25" data-attr="Width">
                          {bagWidth[index]}
                        </td>
                        <td className="gusset col-25" data-attr="Gusset">
                          {bagGusset[index]}
                        </td>
                        <td
                          className="sleeve_length col-25"
                          data-attr="Sleeve Length"
                        >
                          {sleeveLength[index]}
                        </td>
                        <td
                          className="finished_length col-25"
                          data-attr="Finished Length"
                        >
                          {finishedLength[index]}
                        </td>
                        <td className="bag_gsm col-20" data-attr="Bag GSM">
                          {palletDetails[index]
                            ? palletDetails[index]['bag_gsm']
                            : ''}
                        </td>
                        <td
                          className="bag_total_sqm col-20"
                          data-attr="Bag total SQM"
                        >
                          {palletDetails[index]
                            ? palletDetails[index]['bag_total_sqm_value']
                            : ''}
                        </td>
                        <td
                          className="bag_per_pallet col-20"
                          data-attr="Bag Per Pallet"
                        >
                          {palletDetails[index]
                            ? palletDetails[index]['bags_per_pallet']
                            : ''}
                        </td>
                        <td className="moq col-20" data-attr="MOQ">
                          {palletDetails[index]
                            ? palletDetails[index]['moq']
                            : ''}
                        </td>
                        <td
                          className="best_price col-20"
                          data-attr="Best Price Per 1,000"
                        >
                          {palletDetails[index]
                            ? palletDetails[index]['best_price']
                            : ''}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default quoteDetail;
