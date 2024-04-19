// @ts-nocheck
import * as React from 'react';
import firebase from 'firebase/app';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
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
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import { BAGS_PER_PALLET } from '../calculator/calculator.constants';
import { BOPP_FABRIC_COSTS } from '../calculator/CostAtPlant/raw-materials/raw-materials.constants';
import { useAppDispatch } from '../state/useAppDispatch';
import { useToast } from '@chakra-ui/react';
import {
  calculateBagTotalSQM,
  calculateMOQ,
  generatePalletTable,
} from '../utils/quote.utils';
import { clearQuoteData, setQuoteData } from '../state/quote/quote.slice';
import {
  BagSize,
  BagSizesQuoteEle,
  Closure,
  CustomerDetails,
  FabricAndLamination,
  GeneralInformation,
  Logistics,
  OuterLayer,
  Settings,
  SpecialInstructions,
} from '../components/FormSections';
import { IQuoteForm } from '../domain/IQuoteForm';
import { testFormData, TESTING } from '../utils/test.utils';
import { useSelector } from 'react-redux';
import { formStateSelector } from '../state/quote/quote.selectors';
import withAuth from '../auth/withAuth';
import { useUser } from '../auth/useUser';
import PhoneLogin from '../components/PhoneLogin/PhoneLogin';
import { IQuoteState } from '../domain/IQuoteState';
import { IQuoteDisplay } from '../domain/IQuoteDisplay';
import {
  bagsPerPalletSelector,
  quoteDisplaySelector,
  quoteStateSelector,
  totalPalletsSelector,
} from '../state/quote/quote.selectors';
import { createObj } from '../utils/test.utils';
import { generatePalletTableDataForBag } from '../utils/common.utils';
// import firebase from 'firebase/app';

const minimumDaysForDesiredDays = 60;

const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const [userDetail, setUserDetail] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<any>({});
  const db = firebase.firestore();
  const toast = useToast();
  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 767);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      prototype,
      'value'
    ).set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      valueSetter.call(element, value);
    }
  }
  const calculateFinishedLengthForBag = (
    index,
    watchSleeveLengthTmp,
    gluePlateDepthTmp,
    selectedBagStyleTmp
  ) => {
    const sleeveLengthTmp = watchSleeveLengthTmp;
    const sleeveLengthTmpVal: any = sleeveLengthTmp[index];
    if (selectedBagStyleTmp === 'Step Cut') {
      const value: any = sleeveLengthTmpVal - gluePlateDepthTmp;
      return parseFloat(value).toFixed(2);
    } else {
      return sleeveLengthTmpVal;
    }
  };

  const handleUpdateChange = () => {
    const selectElements: any = document.querySelectorAll(
      'select[data-attr="sleeveLengths"]'
    );

    const sleeveLengthsHelper: any = document.querySelectorAll(
      '[data-attr="sleeveLengthsHelper"]'
    );
    const inputValues = Array.from(selectElements).map(
      (input: HTMLSelectElement) => {
        const parsedValue = parseFloat(input.value);
        return isNaN(parsedValue) ? '' : parsedValue.toFixed(1);
      }
    );
    setSleeveLength(inputValues);
    var watchSleeveLengthTmp = inputValues;
    var gluePlateDepthTmp = gluePlateDepth;
    var selectedBagStyleTmp = selectedBagStyle;

    const calculatedFinishedLengths = Array.from(
      { length: bagCount },
      (_, index) => {
        return calculateFinishedLengthForBag(
          index,
          watchSleeveLengthTmp,
          gluePlateDepthTmp,
          selectedBagStyleTmp
        );
      }
    );
    setFinishedLength(calculatedFinishedLengths);

    for (var i = 0; i < selectElements.length; i++) {
      const parsedValueTmp = parseFloat(selectElements[i].value);
      const parsedTmp = isNaN(parsedValueTmp) ? '' : parsedValueTmp.toFixed(1);
      setNativeValue(sleeveLengthsHelper[i], parsedTmp);
      sleeveLengthsHelper[i].dispatchEvent(
        new Event('input', { bubbles: true })
      );
    }
  };

  const [bagCount, setBagCount] = React.useState(1);

  const addNewBag = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setBagCount((prevCount) => prevCount + 1);
  };

  const dispatch = useAppDispatch();
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.data) {
      let encodeData: any = router.query.data;
      let removeFirstLetter = encodeData.slice(1);
      let getFinalValue = removeFirstLetter.substring(
        0,
        removeFirstLetter.length - 1
      );
      // setValue();
      let getAllValues = '';
      try {
        getAllValues = JSON.parse(atob(getFinalValue));
        setSelectedData(getAllValues);
        setBagCount(getAllValues?.allBagsData?.length);
        setSleeveLength(getAllValues?.quoteDisplay?.quoteData?.sleeveLength);
        setFinishedLength(
          getAllValues?.quoteDisplay?.quoteData?.finishedLength
        );
        let getKeys = Object.keys(getAllValues?.quoteDisplay?.quoteData);
        setEditMode(true);
        getKeys.map((data: any) => {
          if (data == 'desiredDeliveryDate' || data == 'orderDate') {
            setValue(
              data,
              new Date(getAllValues?.quoteDisplay?.quoteData[data])
            );
          } else if (data == 'sleeveLength') {
            setValue(
              'sleeveLength',
              getAllValues?.quoteDisplay?.quoteData['sleeveLength']
            );
          } else {
            setValue(data, getAllValues?.quoteDisplay?.quoteData[data]);
          }
        });
      } catch {
        toast({
          title: 'invalid Data.',
          description: 'Your Quote data is not invalid.',
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
      }
    }
  }, [router]);

  const { user }: { user: any } = useUser();
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [isQuoter, setIsQuoter] = React.useState<boolean>(false);
  const [canViewForm, setCanViewForm] = React.useState<boolean>(false);

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
        if (user && user?.phone.includes(adminPhone)) {
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
          setUserDetail(doc.data());
          setIsQuoter(true);
          return true;
        }
        return false;
      });
  }, [user, quoters, setIsQuoter]);

  React.useEffect(() => {
    setCanViewForm(isAdmin || isQuoter);
    setCanViewForm(true);
  }, [isAdmin, isQuoter]);
  //const entries = [];
  //const [finishedLengths, setFinishedLengths] = React.useState([]);
  const [selectedBagStyle, setSelectedBagStyle] =
    React.useState<string>('Default');
  const [finishedLength, setFinishedLength] = React.useState<any>([]);
  const [gluePlateDepth, setGluePlateDepth] = React.useState<string>('0');
  const [isSewnBag, setIsSewnBag] = React.useState<boolean>(false);
  const [sleeveLength, setSleeveLength] = React.useState<any>([]);
  const [sleeveLengths, setsleeveLengths] = React.useState<any>([]);
  const [desiredDeliveryDateVal, setDesiredDeliveryDateVal] =
    React.useState<any>();
  const [desiredDeliveryDate, setDesiredDeliveryDate] = React.useState<any>();
  const quoteState: IQuoteState = useSelector(quoteStateSelector);
  const quoteDisplay: IQuoteDisplay = useSelector(quoteDisplaySelector);

  const formState: IQuoteForm = useSelector(formStateSelector);

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IQuoteForm>({
    defaultValues: TESTING ? testFormData : formState,
  });

  const watchOrderDate = watch('orderDate');
  const watchBagStyle = watch('bagStyle', 'Default');
  const watchOpenEnd = watch('openEnd');
  const watchClosedEnd = watch('closedEnd');
  //const watchSleeveLength: any = watch('sleeveLength', []);
  const watchOuterLayerType: string = watch('outerLayerType', 'BOPP GLOSSY');
  const watchMoqKg: string = watch('moqKg', '500');

  // This manages the bag style for dynamic select values
  React.useEffect(() => {
    setSelectedBagStyle(watchBagStyle === '' ? 'Default' : watchBagStyle);
  }, [watchBagStyle]);

  React.useEffect(() => {
    const newDate = new Date(watchOrderDate);
    newDate.setDate(newDate.getDate() + minimumDaysForDesiredDays);
    setDesiredDeliveryDateVal(newDate);
    setDesiredDeliveryDate(newDate);
  }, [watchOrderDate]);

  // This manages the glue plate depth
  React.useEffect(() => {
    // Closed end must be pinched closed and bag style must be Step Cut to have any glue plate depth
    if (watchClosedEnd !== 'Pinch Closed' || watchBagStyle !== 'Step Cut') {
      if (gluePlateDepth !== '0') {
        setGluePlateDepth('0');
      }
      return;
    }

    if (watchOpenEnd === 'Pinch Prepared') {
      setGluePlateDepth('1');
      return;
    }

    if (watchOpenEnd === 'Flush Cut') {
      setGluePlateDepth('1.77');
      return;
    }
  }, [watchBagStyle, watchOpenEnd, watchClosedEnd]);

  // This handles the calculation of the Finished Length field

  // React.useEffect(() => {
  //   handleUpdateChange();
  // }, [gluePlateDepth, selectedBagStyle, bagCount]);

  // Determine if it is sewn closed end to show extra sleeve length options
  React.useEffect(() => {
    if (
      watchClosedEnd === 'Sewn' ||
      watchClosedEnd === 'Sewn EZ Open' ||
      watchClosedEnd === 'Sewn Closed'
    ) {
      setIsSewnBag(true);
    } else {
      setIsSewnBag(false);
    }
  }, [watchClosedEnd]);

  const onSubmit = (data: IQuoteForm) => {
    const {
      orderDate,
      desiredDeliveryDate,
      specialLamination,
      handle,
      moqKg,
      moqKgOtherValue,
      adLamCharge,
    } = data;

    const moqKgValue = moqKg === 'Other' ? moqKgOtherValue : moqKg;
    const quoteData = Object.assign({}, data, {
      orderDate: format(orderDate as Date, 'yyyy-MM-dd'),
      desiredDeliveryDate: format(desiredDeliveryDate as Date, 'yyyy-MM-dd'),
      handle: handle === '' ? 'No' : handle,
      finishedLength,
      adLamCharge: specialLamination === 'No' ? 0 : adLamCharge,
      moqKg: moqKgValue,
      customerName: userDetail?.name,
      contactName: userDetail?.phone,
      status: 'Pending',
      sleeveLength: sleeveLength,
      gluePlateDepth: '1.77',
      // sleeveLengthTest:sleeveLength
    });
    const formattedData = {
      bags: quoteData.bagName.map((bagName, index) => ({
        bagName: bagName,
        width: quoteData.width[index],
        gusset: quoteData.gusset[index],
        sleeveLength: quoteData.sleeveLength[index],
        gluePlateDepth: quoteData.gluePlateDepth[0],
        finishedLength: quoteData.finishedLength[index],
      })),
      ...quoteData,
    };

    delete formattedData.bagName;
    delete formattedData.width;
    delete formattedData.gusset;
    delete formattedData.sleeveLength;
    // delete formattedData.gluePlateDepth;
    // delete formattedData.finishedLength;

    dispatch(setQuoteData(quoteData));
    goFunction(quoteData);
    // router.push('/quote');
    // router.push('/quote-detail');
  };

  const goFunction = (dataSet) => {
    const quoteDisplay = createObj(dataSet);
    // const {
    //   bagName,
    //   bagStyle,
    //   containerLength,
    //   closedEnd,
    //   estimatedOrderQty,
    //   extrudateGSM,
    //   ezOpenTape,
    //   fabricColor,
    //   fabricGSM,
    //   fabricSupplier,
    //   finalDestination,
    //   finishedLength,
    //   gsm,
    //   gusset,
    //   handle,
    //   layerMaterial,
    //   outerLayerType,
    //   sleeveLength,
    //   stickerOrHotMelt,
    //   width,
    //   moqKg,
    //   adLamCharge,
    //   tapeMtsKg,
    //   ezOpenTapeMtsKg,
    //   commissionPercentage,
    //   AMSAPxToAPOrCaMexCostPercentage,
    //   APPriceToCustomerPercentage,
    // } = dataSet;
    // console.log(quoteState, 'quoteState');
    // console.log(quoteDisplay, 'quoteDisplay');
    // const generatePalletTableDataForBag = (bagIndex) => {
    //   let palletTableData = {};
    //   var bagNameIndex = bagName && bagName[bagIndex] ? bagName[bagIndex] : 0;
    //   var finishedLengthIndex =
    //     finishedLength && finishedLength[bagIndex]
    //       ? finishedLength[bagIndex]
    //       : 0;

    //   var gussetIndex = gusset && gusset[bagIndex] ? gusset[bagIndex] : 0;
    //   var sleeveLengthIndex =
    //     sleeveLength && sleeveLength[bagIndex] ? sleeveLength[bagIndex] : 0;
    //   var widthIndex = width && width[bagIndex] ? width[bagIndex] : 0;
    //   var gluePlateDepthIndex =
    //     gluePlateDepth && gluePlateDepth[bagIndex]
    //       ? gluePlateDepth[bagIndex]
    //       : 0;
    //   var matteFinish = outerLayerType.includes('Matte');

    //   const BAG_SIZE = (
    //     parseFloat(widthIndex) +
    //     parseFloat(gussetIndex) +
    //     parseFloat(finishedLengthIndex)
    //   ).toFixed(1);
    //   const bagsPerPallet = BAGS_PER_PALLET[BAG_SIZE];
    //   const totalPallets = Math.round(estimatedOrderQty / bagsPerPallet);

    //   const moqValue: number = calculateMOQ({
    //     gusset: parseFloat(gussetIndex),
    //     moqKg: quoteDisplay.bagDetails.moqKg,
    //     printedGSM: quoteDisplay.bagDetails.gsm,
    //     sleeveLength: parseFloat(sleeveLengthIndex),
    //     width: parseFloat(widthIndex),
    //   });

    //   const bagTotalSQMValue: number = calculateBagTotalSQM({
    //     gusset: parseFloat(gussetIndex),
    //     finishedLength: parseFloat(finishedLengthIndex),
    //     width: parseFloat(widthIndex),
    //   });

    //   const parameters = {
    //     adLamCharge,
    //     AMSAPxToAPOrCaMexCostPercentage,
    //     APPriceToCustomerPercentage,
    //     bagStyle,
    //     bagsPerPallet,
    //     boppGSM: BOPP_FABRIC_COSTS[layerMaterial],
    //     commissionPercentage,
    //     containerLength,
    //     closedEnd,
    //     extrudateGSM,
    //     ezOpenTape,
    //     ezOpenTapeMtsKg,
    //     fabricColor,
    //     fabricGSM,
    //     fabricSupplier,
    //     finishedLength: parseFloat(finishedLengthIndex),
    //     fob: finalDestination,
    //     gusset: parseFloat(gussetIndex),
    //     handle,
    //     layerMaterial,
    //     logisticsPrice: 0,
    //     matteFinish: matteFinish,
    //     moq: moqValue,
    //     moqKg,
    //     printedGSM: gsm,
    //     qty: estimatedOrderQty,
    //     sleeveLength: parseFloat(sleeveLengthIndex),
    //     stickerOrHotMelt,
    //     tapeMtsKg,
    //     totalPallets,
    //     width: parseFloat(widthIndex),
    //   };

    //   const allBagsData = generatePalletTable(parameters);
    //   const prices = allBagsData.map((palletData) => palletData.pxPerThousand);
    //   const pricesWithoutCurrency = allBagsData.map(
    //     (palletData) => palletData.pxPerThousandWithoutCurrency
    //   );

    //   palletTableData = {
    //     pallet_data: allBagsData,
    //     bag_total_sqm_value: bagTotalSQMValue,
    //     bags_per_pallet: bagsPerPallet,
    //     prices: prices,
    //     prices_without_currency: pricesWithoutCurrency,
    //     highest_price: pricesWithoutCurrency[0],
    //     best_price: prices[prices.length - 1],
    //     bag_gsm: quoteDisplay.bagDetails.gsm,
    //     moq: moqValue,
    //     bagName: bagNameIndex,
    //     finishedLength: finishedLengthIndex,
    //     gluePlateDepth: gluePlateDepthIndex,
    //     gusset: gussetIndex,
    //     sleeveLength: sleeveLengthIndex,
    //     width: widthIndex,
    //   };

    //   return palletTableData;
    // };

    const bagsNameTmp = quoteDisplay.bagDetails.bagName || [];
    const allBagsData = bagsNameTmp.map((bagName, index) =>
      generatePalletTableDataForBag(index, dataSet, quoteDisplay)
    );
    const prices = ['', '', ''];
    const reqBody = {
      bagsPerPallet: '',
      bestPrice: prices[prices.length - 1],
      allBagsData,
      quoteDisplay,
    };
    if (editMode) {
      updateHandler(reqBody);
    } else {
      addQuoteToFirestore(reqBody);
    }
  };
  const updateHandler = async (data) => {
    // const docRef = db.collection('users');
    const docRef = db.collection('quotes');
    try {
      await docRef.doc(selectedData?.id).update(data);
      toast({
        title: 'Quote updated.',
        description: 'Your Quote is updated successfully!',
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
      setTimeout(() => {
        router.push('/quote-detail');
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // setLoader(false);
    }
  };
  const addQuoteToFirestore = async (quoteData) => {
    try {
      // const docRef = await db.collection('users').add(quoteData);
      const docRef = await db.collection('quotes').add(quoteData);
      await db.collection('notifications').add({
        from: quoteData?.quoteDisplay?.customerDetails,
        to: 'admin',
        quoteData: quoteData.quoteDisplay.quoteData,
        notificationType: 'Admin',
        message: `${quoteData?.quoteDisplay?.customerDetails?.customerName} submited the Quote.`,
      });
      toast({
        title: 'Quote created.',
        description: 'Your Quote is created successfully!',
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
      setTimeout(() => {
        router.push('/quote-detail');
      }, 1000);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const onCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    reset();
    //dispatch(clearQuoteData());
  };

  if (!user?.id) {
    return <PhoneLogin />;
  }

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
      <Box mx="auto" position="relative" zIndex={10}>
        {adminsLoading || (quotersLoading && <Spinner />)}
        {adminsError && adminsError.code !== 'permission-denied' && (
          <strong>Error: {JSON.stringify(adminsError)}</strong>
        )}
        {quotersError && quotersError.code !== 'permission-denied' && (
          <strong>Error: {JSON.stringify(quotersError)}</strong>
        )}
        {canViewForm && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Accordion defaultIndex={[0, 1, 2, 3, 4, 5, 6, 7]} allowMultiple>
                <div className="container">
                  <div className="quote-box">
                    <div className="heading-box">
                      <h2>
                        {isAdmin ? 'ADMIN QUOTE FORM' : 'CUSTOMER QUOTE FORM'}
                      </h2>
                    </div>
                    {/* <div className='box box-full'>
                      <AccordionItem id="customerInformation" bg="#e1e8f3" border="1px" marginBottom="20px" borderColor="rgba(0,0,0,0.18) !important">
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              <Heading
                                as="h2"
                                py={1}
                                size="md"
                                textTransform="uppercase"
                                color="#8d8d8d"
                                fontWeight={400}
                              >
                                Customer Information
                              </Heading>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel bg="blackAlpha.50">
                            <CustomerDetails errors={errors} register={register} />
                          </AccordionPanel>
                        </AccordionItem>
                    </div>  */}
                    <div className="box">
                      <AccordionItem id="generalInformation">
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <Heading
                              as="h2"
                              py={1}
                              size="md"
                              textTransform="uppercase"
                            >
                              General Information
                            </Heading>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel bg="blackAlpha.50">
                          <GeneralInformation
                            control={control}
                            desiredDeliveryDate={desiredDeliveryDate as Date}
                            desiredDeliveryDateVal={
                              desiredDeliveryDateVal as Date
                            }
                            errors={errors}
                            orderDate={watchOrderDate as Date}
                            register={register}
                            selectedBagStyle={selectedBagStyle}
                          />
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem id="fabricAndLamination">
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <Heading
                              as="h2"
                              py={1}
                              size="md"
                              textTransform="uppercase"
                            >
                              Fabric & Lamination
                            </Heading>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel bg="blackAlpha.50">
                          <FabricAndLamination
                            errors={errors}
                            register={register}
                          />
                        </AccordionPanel>
                      </AccordionItem>
                      <AccordionItem id="outerLayer">
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <Heading
                              as="h2"
                              py={1}
                              size="md"
                              textTransform="uppercase"
                            >
                              Outer Layer
                            </Heading>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel bg="blackAlpha.50">
                          <OuterLayer
                            errors={errors}
                            outerLayerType={watchOuterLayerType}
                            register={register}
                            selectedBagStyle={selectedBagStyle}
                          />
                        </AccordionPanel>
                      </AccordionItem>
                      {watchBagStyle === 'Standard' ? (
                        <AccordionItem id="closure">
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              <Heading
                                as="h2"
                                py={1}
                                size="md"
                                textTransform="uppercase"
                              >
                                Closure
                              </Heading>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel bg="blackAlpha.50">
                            <Closure
                              errors={errors}
                              register={register}
                              selectedBagStyle={selectedBagStyle}
                            />
                          </AccordionPanel>
                        </AccordionItem>
                      ) : null}
                      <AccordionItem id="logistics">
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <Heading
                              as="h2"
                              py={1}
                              size="md"
                              textTransform="uppercase"
                            >
                              Logistics
                            </Heading>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel bg="blackAlpha.50">
                          <Logistics errors={errors} register={register} />
                        </AccordionPanel>
                      </AccordionItem>

                      {isAdmin && (
                        <AccordionItem id="settings">
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              <Heading
                                as="h2"
                                py={1}
                                size="md"
                                textTransform="uppercase"
                              >
                                Settings
                              </Heading>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel bg="blackAlpha.50">
                            <Settings
                              register={register}
                              watchMoqKg={watchMoqKg}
                            />
                          </AccordionPanel>
                        </AccordionItem>
                      )}
                    </div>
                    <div className="box">
                      <AccordionItem id="bagSize">
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <Heading
                              as="h2"
                              py={1}
                              size="md"
                              textTransform="uppercase"
                            >
                              Bag Size
                            </Heading>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel bg="blackAlpha.50">
                          {/* 
                           <BagSize
                             errors={errors}
                             finishedLength={finishedLength}
                             gluePlateDepth={gluePlateDepth}
                             isSewnBag={isSewnBag}
                             register={register}
                             selectedBagStyle={selectedBagStyle}
                           />
                          */}

                          {[...Array(bagCount)].map((_, index) => (
                            <BagSize
                              key={`${index}`}
                              errors={errors}
                              finishedLength={finishedLength}
                              sleeveLength={sleeveLength}
                              gluePlateDepth={gluePlateDepth}
                              isSewnBag={isSewnBag}
                              register={register}
                              selectedBagStyle={selectedBagStyle}
                              keyIndex={`${index}`}
                              handleUpdateChange={handleUpdateChange}
                              getValues={getValues}
                              control={control}
                            />
                          ))}

                          {/* 
                          <BagSizesQuoteEle
                            errors={errors}
                            register={register}
                          />
                          */}

                          <Flex
                            id="formButtons"
                            // bg="white"
                            py={4}
                            px={8}
                            d="flex"
                            justify={{ base: 'center', lg: 'center' }}
                            w={{ base: 'full', lg: 'auto' }}
                          >
                            <ButtonGroup
                              colorScheme="blue"
                              w={{ base: '100%', lg: 'auto' }}
                            >
                              <Button
                                w={{ base: '100%', lg: 'auto' }}
                                onClick={addNewBag}
                              >
                                Add New Bag
                              </Button>
                            </ButtonGroup>
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>
                    </div>
                    <div className="box box-full">
                      <div className="inner-box">
                        <AccordionItem id="specialInstructions">
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              <Heading
                                as="h2"
                                py={1}
                                size="md"
                                textTransform="uppercase"
                              >
                                Bag Contents And Special Instructions
                              </Heading>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel bg="blackAlpha.50">
                            <SpecialInstructions register={register} />
                          </AccordionPanel>
                        </AccordionItem>
                        <Flex
                          id="formButtons"
                          // bg="white"
                          py={4}
                          px={8}
                          d="flex"
                          justify={{ base: 'center', lg: 'center' }}
                          w={{ base: 'full', lg: 'auto' }}
                        >
                          <ButtonGroup
                            colorScheme="blue"
                            w={{ base: '100%', lg: 'auto' }}
                          >
                            <Button
                              w={{ base: '100%', lg: 'auto' }}
                              type="submit"
                            >
                              {editMode ? 'Update' : 'Submit'}
                            </Button>
                            <Button
                              w={{ base: '100%', lg: 'auto' }}
                              variant="ghost"
                              onClick={onCancel}
                            >
                              Cancel
                            </Button>
                          </ButtonGroup>
                        </Flex>
                      </div>
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

export default withAuth(Home);
// export default Home;
