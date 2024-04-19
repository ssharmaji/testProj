import { calculateCostAtPlant } from './CostAtPlant';
import { CalculateVariableManufacturingCostsDto } from './CostAtPlant/variable-manufacturing-costs';
import { BoppUpchargeDto, calculateBoppUpcharge } from './BOPPUpcharge';
import { calculateMoqUpcharge } from './MOQUpcharge';
import { calculateCostAtFOBLocation } from './CostAtFOBLocation';
import { calculateAMSAPxToAPOrCaMexCost } from './AMSAPxToAPOrCaMexCost';
import { calculateAPPriceToCustomer } from './APPriceToCustomer';
import { calculateOtherAddedToFinalPrice } from './OtherAddedToFinalPrice';
import { calculateFinalCustomerPxPerThousand } from './FinalCustomerPxPerThousand';

export type CalculatePalletCostsDto = CalculateVariableManufacturingCostsDto &
  BoppUpchargeDto & { currentQty: number } & {
    AMSAPxToAPOrCaMexCostPercentage: number;
  } & { APPriceToCustomerPercentage: number } & {
    commissionPercentage: number;
  };

// Note: quantity value here represents bagsPerPallet * the number of pallets being quoted.
// IE, as we move through the pallet table, the qty is bagsPerPallet * numPallets
export const calculatePalletCosts = ({
  AMSAPxToAPOrCaMexCostPercentage,
  APPriceToCustomerPercentage,
  adLamCharge,
  bagStyle,
  bagsPerPallet,
  boppGSM,
  commissionPercentage,
  containerLength,
  closedEnd,
  currentQty,
  extrudateGSM,
  ezOpenTape,
  fabricColor,
  fabricGSM,
  fabricSupplier,
  finishedLength,
  fob,
  gusset,
  handle = 'No',
  layerMaterial,
  logisticsPrice,
  matteFinish,
  moq,
  moqKg,
  printedGSM,
  qty,
  sleeveLength,
  stickerOrHotMelt,
  totalPallets,
  width,
}: CalculatePalletCostsDto) => {
  // console.log('-----------------------------------');
  const COST_AT_PLANT = calculateCostAtPlant({
    adLamCharge,
    bagStyle,
    bagsPerPallet,
    boppGSM,
    containerLength,
    closedEnd,
    extrudateGSM,
    ezOpenTape,
    fabricColor,
    fabricGSM,
    fabricSupplier,
    finishedLength,
    fob,
    gusset,
    handle,
    layerMaterial,
    logisticsPrice,
    matteFinish,
    printedGSM,
    qty,
    sleeveLength,
    stickerOrHotMelt,
    totalPallets,
    width,
  });
  // console.log(`COST_AT_PLANT: ${COST_AT_PLANT}`);

  const BOPP_UPCHARGE = calculateBoppUpcharge({
    boppGSM: extrudateGSM,
    finishedLength,
    gusset,
    layerMaterial,
    matteFinish,
    moq,
    moqKg,
    qty: currentQty,
    width,
  });
  // console.log(`BOPP_UPCHARGE: ${BOPP_UPCHARGE}`);

  const MOQ_UPCHARGE = calculateMoqUpcharge({
    boppUpcharge: BOPP_UPCHARGE,
    qty: currentQty,
  });
  // console.log(`MOQ_UPCHARGE: ${MOQ_UPCHARGE}`);

  const COST_AT_FOB_LOCATION = calculateCostAtFOBLocation({
    costAtPlant: COST_AT_PLANT,
    moqUpcharge: MOQ_UPCHARGE,
  });
  // console.log(`COST_AT_FOB_LOCATION: ${COST_AT_FOB_LOCATION}`);

  const AMSA_PX_TO_AP_OR_CA_MEX_COST = calculateAMSAPxToAPOrCaMexCost({
    costAtFOBLocation: COST_AT_FOB_LOCATION,
    AMSAPxToAPOrCaMexCostPercentage,
  });
  // console.log(`AMSA_PX: ${AMSA_PX_TO_AP_OR_CA_MEX_COST}`);

  const AP_PRICE_TO_CUSTOMER = calculateAPPriceToCustomer({
    amsaPx: AMSA_PX_TO_AP_OR_CA_MEX_COST,
    APPriceToCustomerPercentage,
  });
  // console.log(`AP_PRICE: ${AP_PRICE_TO_CUSTOMER}`);

  const OTHER_ADDED_TO_FINAL_PRICE = calculateOtherAddedToFinalPrice({
    apPriceToCustomer: AP_PRICE_TO_CUSTOMER,
    commissionPercentage,
  });
  // console.log(`OTHER_PRICE: ${OTHER_ADDED_TO_FINAL_PRICE}`);

  const FINAL_CUSTOMER_PX_PER_THOUSAND = calculateFinalCustomerPxPerThousand({
    finalPricePerBag: OTHER_ADDED_TO_FINAL_PRICE,
  });
  // console.log(`FINAL_PRICE_PER_THOUSAND: ${FINAL_CUSTOMER_PX_PER_THOUSAND}`);

  return {
    costAtPlant: COST_AT_PLANT,
    boppUpcharge: BOPP_UPCHARGE,
    moqUpcharge: MOQ_UPCHARGE,
    costAtFobLocation: COST_AT_FOB_LOCATION,
    amsaPxToApOrCaMexCost: AMSA_PX_TO_AP_OR_CA_MEX_COST,
    apPriceToCustomer: AP_PRICE_TO_CUSTOMER,
    pxPerThousand: FINAL_CUSTOMER_PX_PER_THOUSAND,
  };
};
