import {
  calculateRawMaterialsCost,
  CalculateRawMaterialsCostDto,
} from './raw-materials';
import { calculatePackagingCost, CalculatePackagingCostDto } from './packaging';
import { calculateOtherCost, CalculateOtherCostDto } from './other';
import { PACKAGING_COSTS } from './packaging/packaging.constants';

export type CalculateVariableManufacturingCostsDto =
  CalculateRawMaterialsCostDto &
    CalculatePackagingCostDto &
    CalculateOtherCostDto;

export const calculateVariableManufacturingCost = ({
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
  const RAW_MATERIALS_COST = calculateRawMaterialsCost({
    adLamCharge,
    bagStyle,
    boppGSM,
    closedEnd,
    extrudateGSM,
    ezOpenTape,
    fabricColor,
    fabricGSM,
    fabricSupplier,
    finishedLength,
    gusset,
    handle,
    layerMaterial,
    matteFinish,
    printedGSM,
    qty,
    sleeveLength,
    stickerOrHotMelt,
    width,
  });
  // console.log(`RAW_MATERIALS_COST: ${RAW_MATERIALS_COST}`);

  const PACKAGING_COST = calculatePackagingCost({
    bagsPerPallet,
    qty,
    totalPallets,
  });
  // console.log(`PACKAGING_COST: ${PACKAGING_COST}`);

  const OTHER_COST = calculateOtherCost({
    bagsPerPallet,
    containerLength,
    fob,
    logisticsPrice,
    qty,
    rawMaterialCost: RAW_MATERIALS_COST,
  });
  // console.log(`OTHER_COST: ${OTHER_COST}`);

  return RAW_MATERIALS_COST + PACKAGING_COST + OTHER_COST;
};
