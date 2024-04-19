import { StickerOrHotMelt } from '../../../domain/StickerOrHotMelt';
import { YesOrNo } from '../../../domain/YesOrNo';
import {
  calculate25PPFabricTapeCost,
  calculateBagSeamResinsCost,
  calculateEZOpenTapeCost,
  calculateHandleCost,
  calculateLaminationResinsCost,
  calculatePPFabricCost,
  calculatePrintedBOPPCost,
  calculateStickerOrHotMeltCost,
  calculateThreadCost,
} from './raw-materials.calculator';

export interface CalculateRawMaterialsCostDto {
  adLamCharge: number;
  bagStyle: string;
  boppGSM: number;
  closedEnd: string;
  extrudateGSM: number;
  ezOpenTape: string;
  fabricColor: string;
  fabricGSM: number;
  fabricSupplier: string;
  finishedLength: number;
  gusset: number;
  handle: YesOrNo;
  layerMaterial: string;
  matteFinish: boolean;
  printedGSM: number;
  qty: number;
  sleeveLength: number;
  stickerOrHotMelt: StickerOrHotMelt;
  width: number;
}

export const calculateRawMaterialsCost = ({
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
}: CalculateRawMaterialsCostDto) => {
  const length = bagStyle === 'Step Cut' ? sleeveLength : finishedLength;
  // CalculatorX6
  const PRINTED_BOPP_COST = calculatePrintedBOPPCost({
    length,
    gusset,
    layerMaterial,
    matteFinish,
    printedGSM,
    qty,
    width,
  });
  // console.log(`PRINTED_BOPP_COST: ${PRINTED_BOPP_COST}`);

  // CalculatorAW6
  const PP_FABRIC_COST = calculatePPFabricCost({
    fabricColor,
    fabricGSM,
    fabricSupplier,
    gusset,
    length,
    qty,
    width,
  });
  // console.log(`PP_FABRIC_COST: ${PP_FABRIC_COST}`);

  // CalculatorBJ7
  const BAG_SEAM_RESIN_COST = calculateBagSeamResinsCost({
    closedEnd,
    length,
    qty,
    width,
  });
  // console.log(`BAG_SEAM_RESIN_COST: ${BAG_SEAM_RESIN_COST}`);

  // CalculatorBO6
  const LAMINATION_RESINS_COST = calculateLaminationResinsCost({
    extrudateGSM,
    gusset,
    length,
    qty,
    width,
  });
  // console.log(`LAMINATION_RESINS_COST: ${LAMINATION_RESINS_COST}`);

  // CalculatorBW6
  const EZ_OPEN_TAPE_COST = calculateEZOpenTapeCost({
    ezOpenTape,
    qty,
    width,
  });
  // console.log(`EZ_OPEN_TAPE_COST: ${EZ_OPEN_TAPE_COST}`);

  // CalculatorCF6
  const PP_25_FABRIC_TAPE_COST = calculate25PPFabricTapeCost({
    closedEnd,
    ezOpenTape,
    qty,
    width,
  });
  // console.log(`PP_25_FABRIC_TAPE_COST: ${PP_25_FABRIC_TAPE_COST}`);

  // If handle, GeneralDataB22
  const HANDLE_COST = calculateHandleCost({ handle });
  // console.log(`HANDLE_COST: ${HANDLE_COST}`);

  // Table starting on GeneralDataE22
  const STICKER_OR_HOT_MELT_COST = calculateStickerOrHotMeltCost({
    stickerOrHotMelt,
  });
  // console.log(`STICKER_OR_HOT_MELT_COST: ${STICKER_OR_HOT_MELT_COST}`);

  // CalculatorCN6
  const THREAD_COST = calculateThreadCost({ closedEnd, qty, width });
  // console.log(`THREAD_COST: ${THREAD_COST}`);

  // console.log(`AD_LAM_CHARGE: ${adLamCharge}`);

  return (
    PRINTED_BOPP_COST +
    PP_FABRIC_COST +
    BAG_SEAM_RESIN_COST +
    LAMINATION_RESINS_COST +
    EZ_OPEN_TAPE_COST +
    PP_25_FABRIC_TAPE_COST +
    HANDLE_COST +
    STICKER_OR_HOT_MELT_COST +
    THREAD_COST +
    adLamCharge
  );
};
