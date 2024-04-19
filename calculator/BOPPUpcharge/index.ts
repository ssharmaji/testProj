import { BOPPFabric } from '../../domain/BOPPFabric';
import { BOPP_FABRIC_COSTS } from '../CostAtPlant/raw-materials/raw-materials.constants';
import { calculatePrintedBOPPCost } from '../CostAtPlant/raw-materials/raw-materials.calculator';

export interface BoppUpchargeDto {
  boppGSM: number;
  finishedLength: number;
  gusset: number;
  layerMaterial: BOPPFabric;
  matteFinish: boolean;
  moq: number;
  moqKg: number;
  qty: number;
  width: number;
}

export const calculateBoppUpcharge = ({
  boppGSM,
  finishedLength,
  gusset,
  layerMaterial,
  matteFinish,
  moq,
  moqKg,
  qty,
  width,
}: BoppUpchargeDto) => {
  if (qty >= moq) {
    return 0;
  }

  // DataEntryI16
  const KG_MOQ = BOPP_FABRIC_COSTS[layerMaterial] * moqKg;

  // DataEntryK15
  const COST_PER_BAG = KG_MOQ / moq;

  const UPCHARGE_TOTAL = KG_MOQ * 1 - qty * COST_PER_BAG;
  return UPCHARGE_TOTAL;

  /* This was information from Mural, but it was giving inaccurate numbers.
  /* Preserving it here in case we need to reference it, but the above formula
  /* was derived directly from the spreadsheet.
  // Calculate Bopp KGs Needed
  const BAGS_PER_KG =
    1000 / ((width + gusset + 0.75) * 2 * finishedLength * (19 / 1550));
  const BOPP_KG = qty / BAGS_PER_KG;

  // TODO: Use printed GSM instead of BOPP GSM
  const BOPP_RAW_MATERIALS_COST = calculatePrintedBOPPCost({
    length: finishedLength,
    gusset,
    layerMaterial,
    matteFinish,
    printedGSM: boppGSM,
    qty,
    width,
  });

  const TOTAL_BOPP_PER_QTY = qty * (BOPP_RAW_MATERIALS_COST * BOPP_KG);

  const KG_MOQ_MINUS_TOTAL_BOPP = KG_MOQ - TOTAL_BOPP_PER_QTY;

  const UPCHARGE_TOTAL = KG_MOQ_MINUS_TOTAL_BOPP / moq;

  const boppUpcharge =
    KG_MOQ * 1 - (qty * (BOPP_RAW_MATERIALS_COST * BOPP_KG)) / moq;
  return boppUpcharge;
  */
};
