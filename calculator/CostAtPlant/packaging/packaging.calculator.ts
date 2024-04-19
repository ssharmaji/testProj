import {
  CalculateClearTapeCostDto,
  CalculatePackagingCostDto,
  CalculateSlipSheetCostDto,
} from './dto';
import { PACKAGING_COSTS } from './packaging.constants';

export const calculateClearTapeCost = ({ qty }: CalculateClearTapeCostDto) => {
  return (qty * 0.0004 * PACKAGING_COSTS.CLEAR_TAPE) / qty;
};

export const calculateYellowPlasticStrapCost = ({
  qty,
  totalPallets,
}: CalculatePackagingCostDto) => {
  // CalculatorCS6
  const PLASTIC_STRAP_TOTAL_FEET = 17.5 * 4 * totalPallets;

  // CalculatorCT6
  const COST_PER_BAG =
    (PLASTIC_STRAP_TOTAL_FEET * PACKAGING_COSTS.PLASTIC_STRAP) / qty;

  return COST_PER_BAG;
};

export const calculateStaplesCost = ({
  qty,
  totalPallets,
}: CalculatePackagingCostDto) => {
  // CalculatorCV6
  const TOTAL_STAPLE_UNITS = totalPallets * 4;

  const COST_PER_STAPLE = PACKAGING_COSTS.STAPLES;

  // CalculatorCX6
  const TOTAL_PO_COST = TOTAL_STAPLE_UNITS * COST_PER_STAPLE;

  return TOTAL_PO_COST / qty;
};

export const calculateTopCartonBoxCost = ({
  qty,
  totalPallets,
}: CalculatePackagingCostDto) => {
  return (totalPallets * PACKAGING_COSTS.TOP_CARTON_BOX) / qty;
};

export const calculateBottomCartonBoxCost = ({
  qty,
  totalPallets,
}: CalculatePackagingCostDto) => {
  return (totalPallets * PACKAGING_COSTS.BOTTOM_CARTON_BOX) / qty;
};

export const calculateSlipSheetCost = ({
  bagsPerPallet,
  qty,
  totalPallets,
}: CalculateSlipSheetCostDto) => {
  return (
    ((bagsPerPallet / 500) * totalPallets * PACKAGING_COSTS.SLIP_SHEET) / qty
  );
};

export const calculateWoodPalletCost = ({
  qty,
  totalPallets,
}: CalculatePackagingCostDto) => {
  return (totalPallets * PACKAGING_COSTS.WOOD_PALLET) / qty;
};

export const calculatePictureFrameCost = ({
  qty,
  totalPallets,
}: CalculatePackagingCostDto) => {
  return (totalPallets * PACKAGING_COSTS.PICTURE_FRAME) / qty;
};
