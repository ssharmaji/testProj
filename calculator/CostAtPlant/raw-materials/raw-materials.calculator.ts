import {
  Calculate25PPFabricCostDto,
  CalculateBagSeamResinsCostDto,
  CalculateEZOpenTapeCostDto,
  CalculateHandleCostDto,
  CalculateLaminationResinsCostDto,
  CalculatePPFabricCostDto,
  CalculatePrintedBOPPCostDto,
  CalculateThreadCostDto,
} from './dto';
import {
  BONDING_RESINS_COST,
  BOPP_FABRIC_COSTS,
  EZ_OPEN_TAPE_COST,
  HANDLE_COST,
  PE_RESIN_COST,
  PP_25_TAPE_COST,
  PP_FABRIC_COSTS,
  PP_RESIN_COST,
  STICKER_OR_HOT_MELT_COSTS,
  THREAD_COST,
} from './raw-materials.constants';
import { StickerOrHotMelt } from '../../../domain/StickerOrHotMelt';

// CalculatorO6
const INCH_2_MT_2 = 39.37008 * 39.37008;

export const calculatePrintedBOPPCost = ({
  gusset,
  layerMaterial,
  length,
  matteFinish,
  printedGSM,
  qty,
  width,
}: CalculatePrintedBOPPCostDto) => {
  // CalculatorP6
  const INCHES_2_BAG = (width + gusset + 0.75) * 2 * length;

  // CalculatorS6
  const GRAMS_INCH_2 = printedGSM / INCH_2_MT_2;

  // CalculatorU6
  const BOPP_BAGS_KG = 1000 / (INCHES_2_BAG * GRAMS_INCH_2);

  // CalculatorV6
  const BOPP_FILM_KG_NEEDED = qty / BOPP_BAGS_KG;

  // CalculatorW6
  const BOPP_FILM_COST_KG = BOPP_FABRIC_COSTS[layerMaterial];

  // CalculatorY6
  const TOTAL_BOPP_FILM_COST = BOPP_FILM_KG_NEEDED * BOPP_FILM_COST_KG;

  // Matte upcharge added in DataEntryB6
  const MATTE_UPCHARGE = matteFinish ? 1.12 : 1;
  return (TOTAL_BOPP_FILM_COST / qty) * MATTE_UPCHARGE;
};

export const calculatePPFabricCost = ({
  fabricColor,
  fabricGSM,
  fabricSupplier,
  gusset,
  qty,
  length,
  width,
}: CalculatePPFabricCostDto) => {
  // CalculatorAV6
  const FABRIC_COST_PER_KG = PP_FABRIC_COSTS[fabricSupplier];

  // CalculatorAA6
  const FABRIC_SQM_PER_KG = 1000 / fabricGSM;

  // Calculator AD6
  const FABRIC_WIDTH_NEEDED = (width + gusset) * 2 + 3;

  // CalculatorAS6
  const BAGS_PER_KG =
    (INCH_2_MT_2 / (length * FABRIC_WIDTH_NEEDED)) * FABRIC_SQM_PER_KG;

  // CalculatorAU6
  const FABRIC_KG_NEEDED = qty / BAGS_PER_KG;

  // CalculatorAX6
  const FABRIC_TOTAL_PO_COST = FABRIC_KG_NEEDED * FABRIC_COST_PER_KG;

  // Added in DataEntryB894 formula
  const FABRIC_UPCHARGE = fabricColor === 'Clear' ? 1.035 : 1;

  // DataEntryB94
  return (FABRIC_TOTAL_PO_COST / qty) * FABRIC_UPCHARGE;
};

export const calculateBagSeamResinsCost = ({
  length,
}: CalculateBagSeamResinsCostDto) => {
  // GeneralDataB6
  const BOSTIK_COST = 8.15 + 2615 / 4491;

  // Partially calculated in CalculatorBI6
  const BOSTIK_BASE_COST = (BOSTIK_COST / 1000) * 0.06;

  // CalculatorBI6
  const BAG_SEAM_BASE_COST = BOSTIK_BASE_COST * length;

  // I dont see this in the calculator, this came from mural -- removing for now
  /*
  const PINCH_CLOSED_ADDITIONAL_COST =
    closedEnd === 'Pinch Closed' ? BOSTIK_BASE_COST * width : 0;
  */

  return BAG_SEAM_BASE_COST;
};

export const calculateLaminationResinsCost = ({
  extrudateGSM,
  gusset,
  length,
  qty,
  width,
}: CalculateLaminationResinsCostDto) => {
  // Calculator AD6
  const FABRIC_WIDTH_NEEDED = (width + gusset) * 2 + 3;

  // CalculatorAZ6
  const RESIN_GRAMS_PER_BAG =
    length * (FABRIC_WIDTH_NEEDED - 2) * (extrudateGSM / INCH_2_MT_2);

  // CalculatorBB6
  const BAGS_PER_KG = 1000 / RESIN_GRAMS_PER_BAG;

  // CalculatorBK6
  const KG_NEEDED_FOR_RESIN_A = (qty / BAGS_PER_KG) * 0.75;
  // Calculated as part of CalculatorBO6
  const PP_RESIN_TOTAL = PP_RESIN_COST * KG_NEEDED_FOR_RESIN_A;

  // CalculatorBL6
  const KG_NEEDED_FOR_RESIN_B = (qty / BAGS_PER_KG) * 0.15;
  // Calculated as part of CalculatorBO6
  const PE_RESIN_TOTAL = PE_RESIN_COST * KG_NEEDED_FOR_RESIN_B;

  // CalculatorBM6
  const KG_NEEDED_FOR_RESIN_C = (qty / BAGS_PER_KG) * 0.1;
  // Calculated as part of CalculatorBO6
  const BONDING_RESINS_TOTAL = BONDING_RESINS_COST * KG_NEEDED_FOR_RESIN_C;

  const TOTAL_RESIN_KG_NEEDED =
    PP_RESIN_TOTAL + PE_RESIN_TOTAL + BONDING_RESINS_TOTAL;

  return TOTAL_RESIN_KG_NEEDED / qty;
};

export const calculateEZOpenTapeCost = ({
  ezOpenTape,
  qty,
  width,
}: CalculateEZOpenTapeCostDto) => {
  if (!ezOpenTape || ezOpenTape === 'N/A' || ezOpenTape === '') {
    return 0;
  }

  // CalculatorBQ6
  const GRAMS_PER_MT = 0.98;

  // CalculatorBR6
  const MTS_PER_KG = 1000 / GRAMS_PER_MT;

  // CalculatorBS
  const BAGS_PER_MT = 39.37008 / (width + 4);

  // CalculatorBT6
  const BAGS_PER_KG = MTS_PER_KG * BAGS_PER_MT;

  // CalculatorBV
  const KGS_NEEDED = qty / BAGS_PER_KG;

  // CalculatorBW6
  const EZ_OPEN_TAPE_COST_PER_BAG = (KGS_NEEDED * PP_25_TAPE_COST) / qty;

  return EZ_OPEN_TAPE_COST_PER_BAG;
};

export const calculate25PPFabricTapeCost = ({
  closedEnd,
  ezOpenTape,
  qty,
  width,
}: Calculate25PPFabricCostDto) => {
  // Conditions on DataEntryB98
  if (closedEnd === 'Pinch Closed' || ezOpenTape === 'N/A') {
    return 0;
  }

  // CalculatorBZ6
  const PP_FABRIC_TAPE_GRAMS_L_MT = 6.8;

  // CalculatorCA6
  const MTS_PER_KG = 1000 / PP_FABRIC_TAPE_GRAMS_L_MT;

  // CalculatorCB6
  const BAGS_PER_L_MT = 39.37008 / (width + 4);

  // CalculatorCC6
  const BAGS_PER_KG = MTS_PER_KG * BAGS_PER_L_MT;

  // CalculatorCE6
  const KGS_NEEDED = qty / BAGS_PER_KG;

  // CalculatorCF6
  const PP_25_FABRIC_TAPE_COST_PER_BAG = (KGS_NEEDED * 2.46) / qty;

  return PP_25_FABRIC_TAPE_COST_PER_BAG;
};

export const calculateHandleCost = ({ handle }: CalculateHandleCostDto) => {
  if (handle === 'No') {
    return 0;
  }

  return HANDLE_COST;
};

export const calculateStickerOrHotMeltCost = ({
  stickerOrHotMelt,
}: {
  stickerOrHotMelt: StickerOrHotMelt;
}) => {
  return STICKER_OR_HOT_MELT_COSTS[stickerOrHotMelt];
};

export const calculateThreadCost = ({
  closedEnd,
  qty,
  width,
}: CalculateThreadCostDto) => {
  // Conditional on DataEntryB101
  if (closedEnd === 'Pinch Closed') {
    return 0;
  }

  // CalculatorCI6
  const GRAMS_PER_BAG = (width + 4) * 0.027;

  // CalculatorCK6
  const BAGS_PER_KG = 1000 / GRAMS_PER_BAG;

  // CalculatorCM6
  const KGS_NEEDED = qty / BAGS_PER_KG;

  // CalculatorCN6
  const THREAD_COST_PER_BAG = (KGS_NEEDED * THREAD_COST) / qty;

  return THREAD_COST_PER_BAG;
};
