import { IQuoteForm } from '../domain/IQuoteForm';

import { calculateBagTotalSQM } from './quote.utils';
const numberFormatter = new Intl.NumberFormat();
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const TESTING = false;
// export const TESTING = process.env.NEXT_PUBLIC_TESTING === 'true';

export const testFormData: IQuoteForm = {
  customerName: 'Test, Inc',
  contactName: 'Test Tester',
  orderDescription: 'A bunch of bags',
  orderDate: new Date(),
  bagStyle: 'Step Cut',
  desiredDeliveryDate: new Date(),
  openEnd: 'Flush Cut',
  estimatedOrderQty: '100000',
  closedEnd: 'Pinch Closed',
  annualUsage: '250000',
  width: '15',
  gusset: '4',
  sleeveLength: '26.96845',
  gluePlateDepth: '1.77',
  finishedLength: '',
  fabricGSM: '70',
  extrudateGSM: '23',
  fabricColor: 'White',
  fabricSupplier: 'ANDURO 1',
  specialLamination: 'Yes',
  outerLayerType: 'BOPP GLOSSY',
  gsm: '19',
  layerMaterial: 'CHIRIPAL TS',
  matteUpcharge: '',
  uvTreatment: 'No',
  stickerOrHotMelt: 'No',
  handle: 'No',
  highCOF: 'Yes',
  numberOfColors: '8',
  ezOpenTape: 'N/A',
  threadColor: '',
  ezOpenColor: '',
  tapeColor: '',
  specialInstructions: '',
  finalDestination: 'Gulfport',
  containerLength: "40'",
  moqKg: '500',
  adLamCharge: '0.0138',
  tapeMtsKg: '147.06',
  ezOpenTapeMtsKg: '1020.41',
  commissionPercentage: '0',
  AMSAPxToAPOrCaMexCostPercentage: '12',
  APPriceToCustomerPercentage: '8',
};
// '1.77';
export const createObj = (quote) => {
  return {
    customerDetails: {
      customerName: quote.customerName,
      contactName: quote.contactName,
      orderDescription: quote.orderDescription,
    },
    bagStyle: {
      type: quote.bagStyle,
      mfgEnd: quote.closedEnd,
      customerEnd: quote.openEnd,
    },
    bagDimensions: {
      width: quote.width,
      gusset: quote.gusset,
      finishedLength: quote.finishedLength,
      sleeveLength: quote.sleeveLength,
    },
    bagSpecs: {
      outerLayerType: quote.outerLayerType,
      fabricGSM: quote.fabricGSM,
      fabricColor: quote.fabricColor,
      numberOfColors: quote.numberOfColors,
      prepressCost: currencyFormatter.format(
        parseInt(quote.numberOfColors) * 325
      ),
      handle: quote.handle,
      bagTotalSQM: numberFormatter.format(
        calculateBagTotalSQM({
          gusset: quote.gusset,
          finishedLength: quote.finishedLength,
          width: quote.width,
        })
      ),
      bagGSM: '',
    },
    orderDetails: {
      fob: quote.finalDestination,
      moq: '',
      orderSize: numberFormatter.format(quote.estimatedOrderQty),
      annualUsage: numberFormatter.format(quote.annualUsage),
      quoteName: quote.quoteName,
      orderDate: quote.orderDate,
      desiredDeliveryDate: quote.desiredDeliveryDate,
    },
    bagDetails: {
      bagName: quote.bagName,
      bagWidth: quote.width,
      bagGusset: quote.gusset,
      sleeveLength: quote.sleeveLength,
      finishedLength: quote.finishedLength,
      gluePlateDepth: quote.gluePlateDepth ? quote.gluePlateDepth : '1.77',
      gsm: quote.gsm,
      moqKg: quote.moqKg,
      estimatedOrderQty: quote.estimatedOrderQty,
    },
    quoteData: { ...quote },
  };
};

/*
export const testFormData: IQuoteForm = {
  orderDate: new Date(2021, 8, 3),
  desiredDeliveryDate: new Date(2021, 8, 30),
  bagStyle: 'Step Cut',
  openEnd: 'Flush Cut',
  estimatedOrderQty: '50000',
  closedEnd: 'Sewn EZ Open',
  annualUsage: '250000',
  width: '17',
  gusset: '3',
  sleeveLength: '16.9',
  gluePlateDepth: '0',
  finishedLength: '',
  fabricGSM: '70',
  extrudateGSM: '23',
  fabricColor: 'White',
  fabricSupplier: 'SAMSA',
  specialLamination: 'No',
  outerLayerType: 'BOPP GLOSSY',
  gsm: '22',
  layerMaterial: 'INPLASA CE',
  matteUpcharge: '',
  uvTreatment: 'No',
  stickerOrHotMelt: 'No',
  handle: 'No',
  highCOF: 'No',
  numberOfColors: '2',
  ezOpenTape: 'n/a',
  threadColor: 'Red',
  ezOpenColor: 'Red',
  tapeColor: 'Red',
  specialInstructions: '',
  finalDestination: 'Gulfport',
  containerLength: "40'",
  moqKg: '500',
  adLamCharge: '0',
  tapeMtsKg: '147.06',
  ezOpenTapeMtsKg: '1020.41',
  commissionPercentage: '0',
  AMSAPxToAPOrCaMexCostPercentage: '14',
  APPriceToCustomerPercentage: '8',
};
*/
