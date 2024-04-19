import {
  CalculateAdditionalLogDto,
  CalculatePortCostsDto,
  CalculateScrapDto,
} from '../dto';

export const calculateScrapCost = ({ rawMaterialCost }: CalculateScrapDto) => {
  return rawMaterialCost * 0.03;
};

export const calculatePowerOnEquipmentCost = () => {
  const KW_HOUR_PER_DAY = 1805;
  const PRICE_PER_KW_HOUR = 4.24 / 22.5;
  const BAGS_PER_SHIFT = 82607;

  const COST_PER_DAY = KW_HOUR_PER_DAY * PRICE_PER_KW_HOUR;

  return COST_PER_DAY / BAGS_PER_SHIFT;
};

export const calculateGulfportAdminCost = ({
  bagsPerPallet,
  containerLength,
  fob,
}: CalculatePortCostsDto) => {
  if (fob !== 'Gulfport') {
    return 0;
  }

  const COST_PER_PALLET = {
    "20'": 110.05,
    "40'": 55.8,
  };

  return COST_PER_PALLET[containerLength] / bagsPerPallet;
};

export const calculateLogisticsToGulfportCost = ({
  bagsPerPallet,
  containerLength,
  fob,
}: CalculatePortCostsDto) => {
  if (fob !== 'Gulfport') {
    return 0;
  }

  const COST_PER_PALLET = {
    "20'": 38.1625,
    "40'": 24.95,
  };

  return COST_PER_PALLET[containerLength] / bagsPerPallet;
};

export const calculateDoorToDoorCost = ({
  bagsPerPallet,
  containerLength,
  fob,
}: CalculatePortCostsDto) => {
  if (fob !== 'Door to Door') {
    return 0;
  }

  const COST_PER_PALLET = {
    "20'": 216.7,
    "40'": 116.45,
  };

  return COST_PER_PALLET[containerLength] / bagsPerPallet;
};

export const calculateLogisticsToPortOfCortezCost = ({
  bagsPerPallet,
  fob,
}: CalculatePortCostsDto) => {
  if (fob !== 'Honduras Port') {
    return 0;
  }

  const COST_PER_PALLET = 24.95;

  return COST_PER_PALLET / bagsPerPallet;
};

export const calculateAdditionalLogCost = ({
  logisticsPrice = 0,
  qty,
}: CalculateAdditionalLogDto) => {
  return logisticsPrice / qty;
};
