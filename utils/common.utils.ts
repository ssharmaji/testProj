import { BAGS_PER_PALLET } from '../calculator/calculator.constants';
import {
  calculateBagTotalSQM,
  calculateMOQ,
  generatePalletTable,
} from './quote.utils';
import { BOPP_FABRIC_COSTS } from '../calculator/CostAtPlant/raw-materials/raw-materials.constants';

export const generatePalletTableDataForBag = (
  bagIndex,
  dataSet,
  quoteDisplay
) => {
  let palletTableData = {};
  var bagNameIndex =
    dataSet?.bagName && dataSet?.bagName[bagIndex]
      ? dataSet?.bagName[bagIndex]
      : 0;
  var finishedLengthIndex =
    dataSet?.finishedLength && dataSet?.finishedLength[bagIndex]
      ? dataSet?.finishedLength[bagIndex]
      : 0;

  var gussetIndex =
    dataSet?.gusset && dataSet?.gusset[bagIndex]
      ? dataSet?.gusset[bagIndex]
      : 0;
  var sleeveLengthIndex =
    dataSet?.sleeveLength && dataSet?.sleeveLength[bagIndex]
      ? dataSet?.sleeveLength[bagIndex]
      : 0;
  var widthIndex =
    dataSet?.width && dataSet?.width[bagIndex] ? dataSet?.width[bagIndex] : 0;
  var gluePlateDepthIndex =
    dataSet?.gluePlateDepth && dataSet?.gluePlateDepth[bagIndex]
      ? dataSet?.gluePlateDepth[bagIndex]
      : 0;
  var matteFinish = dataSet?.outerLayerType.includes('Matte');

  const BAG_SIZE = (
    parseFloat(widthIndex) +
    parseFloat(gussetIndex) +
    parseFloat(finishedLengthIndex)
  ).toFixed(1);
  const bagsPerPallet = BAGS_PER_PALLET[BAG_SIZE];
  const totalPallets = Math.round(dataSet?.estimatedOrderQty / bagsPerPallet);

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
    // adLamCharge,
    // AMSAPxToAPOrCaMexCostPercentage,
    // APPriceToCustomerPercentage,
    // bagStyle,
    // commissionPercentage,
    // containerLength,
    // closedEnd,
    // extrudateGSM,
    // ezOpenTape,
    // ezOpenTapeMtsKg,
    // fabricColor,
    // fabricGSM,
    // fabricSupplier,
    // handle,
    // layerMaterial,
    // moqKg,
    // stickerOrHotMelt,
    // tapeMtsKg,
    ...dataSet,
    bagsPerPallet,
    boppGSM: BOPP_FABRIC_COSTS[dataSet?.layerMaterial],

    finishedLength: parseFloat(finishedLengthIndex),
    fob: dataSet?.finalDestination,
    gusset: parseFloat(gussetIndex),

    logisticsPrice: 0,
    matteFinish: matteFinish,
    moq: moqValue,

    printedGSM: dataSet?.gsm,
    qty: dataSet?.estimatedOrderQty,
    sleeveLength: parseFloat(sleeveLengthIndex),

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

export const onMessageListener = (messaging) =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

export const getToken = async (setTokenFound, messaging) => {
  let currentToken = '';

  try {
    currentToken = await messaging.getToken({
      vapidKey:
        'BFjg2IHg0V525z-HsTa7ilaOdt-EJ8A9MTxRRsHmxoZAbyE9RUNc3TWhHKv3x1MijmwLtazMfhxxLCmAhZozAK4',
    });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error);
  }

  return currentToken;
};
