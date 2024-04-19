import {
  calculateBottomCartonBoxCost,
  calculateClearTapeCost,
  calculatePictureFrameCost,
  calculateSlipSheetCost,
  calculateStaplesCost,
  calculateTopCartonBoxCost,
  calculateWoodPalletCost,
  calculateYellowPlasticStrapCost,
} from './packaging.calculator';

export interface CalculatePackagingCostDto {
  bagsPerPallet: number;
  qty: number;
  totalPallets: number;
}

export const calculatePackagingCost = ({
  bagsPerPallet,
  qty,
  totalPallets,
}: CalculatePackagingCostDto) => {
  // CalculatorCQ6
  const CLEAR_TAPE_COST = calculateClearTapeCost({ qty });
  // console.log(`CLEAR_TAPE_COST: ${CLEAR_TAPE_COST}`);

  // CalculatorCT6
  const YELLOW_PLASTIC_STRAP_COST = calculateYellowPlasticStrapCost({
    qty,
    totalPallets,
  });
  // console.log(`YELLOW_PLASTIC_STRAP_COST: ${YELLOW_PLASTIC_STRAP_COST}`);

  // CalculatorCX6
  const STAPLES_COST = calculateStaplesCost({ qty, totalPallets });
  // console.log(`STAPLES_COST: ${STAPLES_COST}`);

  const TOP_CARTON_BOX_COST = calculateTopCartonBoxCost({ qty, totalPallets });
  // console.log(`TOP_CARTON_BOX_COST: ${TOP_CARTON_BOX_COST}`);

  const BOTTOM_CARTON_BOX_COST = calculateBottomCartonBoxCost({
    qty,
    totalPallets,
  });
  // console.log(`BOTTOM_CARTON_BOX_COST: ${BOTTOM_CARTON_BOX_COST}`);

  const SLIP_SHEET_COST = calculateSlipSheetCost({
    bagsPerPallet,
    qty,
    totalPallets,
  });
  // console.log(`SLIP_SHEET_COST: ${SLIP_SHEET_COST}`);

  const WOOD_PALLET_COST = calculateWoodPalletCost({ qty, totalPallets });
  // console.log(`WOOD_PALLET_COST: ${WOOD_PALLET_COST}`);

  const PICTURE_FRAME_COST = calculatePictureFrameCost({ qty, totalPallets });
  // console.log(`PICTURE_FRAME_COST: ${PICTURE_FRAME_COST}`);

  return (
    CLEAR_TAPE_COST +
    YELLOW_PLASTIC_STRAP_COST +
    STAPLES_COST +
    TOP_CARTON_BOX_COST +
    BOTTOM_CARTON_BOX_COST +
    SLIP_SHEET_COST +
    WOOD_PALLET_COST +
    PICTURE_FRAME_COST
  );
};
