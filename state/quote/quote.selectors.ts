import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { IQuoteState } from '../../domain/IQuoteState';
import {
  calculateBagGSM,
  calculateBagTotalSQM,
  calculateMOQ,
} from '../../utils/quote.utils';
import { BAGS_PER_PALLET } from '../../calculator/calculator.constants';
import {
  extractDateFromString,
  formValueFromNumber,
} from '../../utils/form.utils';

const numberFormatter = new Intl.NumberFormat();
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const quoteStateSelector = (state: RootState): IQuoteState =>
  state.quote;

export const quoteDisplaySelector = createSelector(
  quoteStateSelector,
  (quote: IQuoteState) => {
    const moqValue: number = calculateMOQ({
      gusset: quote.gusset,
      moqKg: quote.moqKg,
      printedGSM: quote.gsm,
      sleeveLength: quote.sleeveLength,
      width: quote.width,
    });

    const bagTotalSQMValue: number = calculateBagTotalSQM({
      gusset: quote.gusset,
      finishedLength: quote.finishedLength,
      width: quote.width,
    });

    const bagGSM: number = calculateBagGSM({
      extrudateGSM: quote.extrudateGSM,
      fabricGSM: quote.fabricGSM,
      printedGSM: quote.gsm,
    });

    // const bags = {
    //   bags: quote.bagName.map((bagName, index) => ({
    //       bagName: bagName,
    //       width: quote.width[index],
    //       gusset: quote.gusset[index],
    //       sleeveLength: quote.sleeveLength[index],
    //       gluePlateDepth: quote.gluePlateDepth[0],
    //       finishedLength: quote.finishedLength[index],
    //   })),
    //   ...quote,
    // };
    // delete bags.bagName;
    // delete bags.width;
    // delete bags.gusset;
    // delete bags.sleeveLength;
    // delete bags.gluePlateDepth;
    // delete bags.finishedLength;

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
        bagTotalSQM: numberFormatter.format(bagTotalSQMValue),
        bagGSM: numberFormatter.format(bagGSM),
      },
      orderDetails: {
        fob: quote.finalDestination,
        moq: moqValue,
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
        gluePlateDepth: quote.gluePlateDepth,
        gsm: quote.gsm,
        moqKg: quote.moqKg,
        estimatedOrderQty: quote.estimatedOrderQty,
      },
      quoteData: { ...quote },
    };
  }
);

export const bagsPerPalletSelector = createSelector(
  quoteStateSelector,
  (quote: IQuoteState) => {
    const { width, gusset, finishedLength } = quote;
    const BAG_SIZE = 0; //parseFloat((width + gusset + finishedLength).toFixed(1));

    return BAGS_PER_PALLET[BAG_SIZE];
  }
);

export const bagsPerPalletSelectorByBag = createSelector(
  quoteStateSelector,
  (quote: IQuoteState) => {
    const { width, gusset, finishedLength } = quote;
    const BAG_SIZE = 0; //parseFloat((width + gusset + finishedLength).toFixed(1));

    return BAGS_PER_PALLET[BAG_SIZE];
  }
);

export const totalPalletsSelector = createSelector(
  quoteStateSelector,
  bagsPerPalletSelector,
  (quote: IQuoteState, bagsPerPallet: number) => {
    const { estimatedOrderQty } = quote;

    return Math.round(estimatedOrderQty / bagsPerPallet);
  }
);

export const formStateSelector = createSelector(
  quoteStateSelector,
  (quote: IQuoteState) => {
    const orderDate = extractDateFromString(quote.orderDate);
    const desiredDeliveryDate = extractDateFromString(
      quote.desiredDeliveryDate
    );

    return Object.assign({}, quote, {
      customerName: quote.customerName,
      contactName: quote.contactName,
      orderDescription: quote.orderDescription,
      orderDate,
      desiredDeliveryDate,
      estimatedOrderQty: formValueFromNumber(quote.estimatedOrderQty),
      annualUsage: formValueFromNumber(quote.annualUsage),
      bagName: quote.bagName,
      width: formValueFromNumber(quote.width),
      gusset: formValueFromNumber(quote.gusset),
      sleeveLength: formValueFromNumber(quote.sleeveLength),
      gluePlateDepth: formValueFromNumber(quote.gluePlateDepth),
      finishedLength: formValueFromNumber(quote.finishedLength),
      fabricGSM: formValueFromNumber(quote.fabricGSM),
      extrudateGSM: formValueFromNumber(quote.extrudateGSM),
      gsm: formValueFromNumber(quote.gsm),
      moqKg: formValueFromNumber(quote.moqKg),
      adLamCharge: formValueFromNumber(quote.adLamCharge),
      tapeMtsKg: formValueFromNumber(quote.tapeMtsKg),
      ezOpenTapeMtsKg: formValueFromNumber(quote.ezOpenTapeMtsKg),
      commissionPercentage: (quote.commissionPercentage * 100)
        .toFixed(0)
        .toString(),
      AMSAPxToAPOrCaMexCostPercentage: (
        quote.AMSAPxToAPOrCaMexCostPercentage * 100
      )
        .toFixed(0)
        .toString(),
      APPriceToCustomerPercentage: (quote.APPriceToCustomerPercentage * 100)
        .toFixed(0)
        .toString(),
    });
  }
);
