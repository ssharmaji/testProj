import { calculateFixedManufacturingCosts } from './fixed-manufacturing-costs';
import {
  calculateVariableManufacturingCost,
  CalculateVariableManufacturingCostsDto,
} from './variable-manufacturing-costs';

export const calculateCostAtPlant = ({
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
}: CalculateVariableManufacturingCostsDto) => {
  const VARIABLE_MANUFACTURING_COST = calculateVariableManufacturingCost({
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
  // console.log(`VARIABLE MFG: ${VARIABLE_MANUFACTURING_COST}`);

  const FIXED_MANUFACTURING_COST = calculateFixedManufacturingCosts();
  // console.log(`FIXED MFG: ${FIXED_MANUFACTURING_COST}`);

  const SGA_HON_COST = 0.01643;

  return VARIABLE_MANUFACTURING_COST + FIXED_MANUFACTURING_COST + SGA_HON_COST;
};
