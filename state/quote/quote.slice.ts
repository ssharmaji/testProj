import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialQuoteState, testQuoteState } from './quote.state';
import { IQuoteForm } from '../../domain/IQuoteForm';
import { TESTING } from '../../utils/test.utils';

export const quoteSlice = createSlice({
  name: 'quote',
  initialState: TESTING ? testQuoteState : initialQuoteState,
  reducers: {
    setQuoteData: (
      _,
      action: PayloadAction<
        IQuoteForm & { orderDate: string; desiredDeliveryDate: string }
      >
    ) => {
      const {
        estimatedOrderQty,
        annualUsage,
        // width,
        // gusset,
        sleeveLength,
        gluePlateDepth,
        finishedLength,
        fabricGSM,
        extrudateGSM,
        gsm,
        moqKg,
        specialLamination,
        adLamCharge,
        tapeMtsKg,
        ezOpenTapeMtsKg,
        commissionPercentage,
        AMSAPxToAPOrCaMexCostPercentage,
        APPriceToCustomerPercentage,
      } = action.payload;

      // Transform string > numbers and dates > strings
      return Object.assign({}, action.payload, {
        estimatedOrderQty: parseInt(estimatedOrderQty, 10),
        annualUsage: parseInt(annualUsage, 10),
        // width: [],
        // gusset: [],
        // sleeveLength: [],
        sleeveLength,
        gluePlateDepth: [],
        finishedLength,
        fabricGSM: parseInt(fabricGSM, 10),
        extrudateGSM: parseInt(extrudateGSM, 10),
        gsm: parseFloat(gsm),
        moqKg: parseInt(moqKg, 10),
        adLamCharge: specialLamination === 'Yes' ? parseFloat(adLamCharge) : 0,
        tapeMtsKg: parseFloat(tapeMtsKg),
        ezOpenTapeMtsKg: parseFloat(ezOpenTapeMtsKg),
        commissionPercentage: parseFloat(commissionPercentage) / 100,
        AMSAPxToAPOrCaMexCostPercentage:
          parseFloat(AMSAPxToAPOrCaMexCostPercentage) / 100,
        APPriceToCustomerPercentage:
          parseFloat(APPriceToCustomerPercentage) / 100,
      });
    },
    clearQuoteData: () => {
      return initialQuoteState;
    },
  },
});

export const { setQuoteData, clearQuoteData } = quoteSlice.actions;

export default quoteSlice.reducer;
