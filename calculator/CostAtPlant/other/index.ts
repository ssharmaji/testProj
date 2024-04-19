import { ContainerLength } from '../../../domain/ContainerLength';
import {
  calculateAdditionalLogCost,
  calculateDoorToDoorCost,
  calculateGulfportAdminCost,
  calculateLogisticsToGulfportCost,
  calculateLogisticsToPortOfCortezCost,
  calculatePowerOnEquipmentCost,
  calculateScrapCost,
} from './other.calculator';

export interface CalculateOtherCostDto {
  bagsPerPallet: number;
  containerLength: ContainerLength;
  fob: string;
  logisticsPrice: number;
  qty: number;
}

export const calculateOtherCost = ({
  bagsPerPallet,
  containerLength,
  fob,
  logisticsPrice,
  qty,
  rawMaterialCost,
}: CalculateOtherCostDto & { rawMaterialCost: number }) => {
  const SCRAP_COST = calculateScrapCost({ rawMaterialCost });
  // console.log(`SCRAP_COST: ${SCRAP_COST}`);

  const POWER_ON_EQUIPMENT_COST = calculatePowerOnEquipmentCost();

  const GULFPORT_ADMIN_COST = calculateGulfportAdminCost({
    bagsPerPallet,
    containerLength,
    fob,
  });

  const LOGISTICS_TO_GULFPORT_COST = calculateLogisticsToGulfportCost({
    bagsPerPallet,
    containerLength,
    fob,
  });

  const DOOR_TO_DOOR_COST = calculateDoorToDoorCost({
    bagsPerPallet,
    containerLength,
    fob,
  });

  const LOGISTICS_TO_PORT_OF_CORTEZ_COST = calculateLogisticsToPortOfCortezCost(
    { bagsPerPallet, fob }
  );

  const ADDITIONAL_LOG_COST = calculateAdditionalLogCost({
    logisticsPrice,
    qty,
  });

  return (
    SCRAP_COST +
    POWER_ON_EQUIPMENT_COST +
    GULFPORT_ADMIN_COST +
    LOGISTICS_TO_GULFPORT_COST +
    DOOR_TO_DOOR_COST +
    LOGISTICS_TO_PORT_OF_CORTEZ_COST +
    ADDITIONAL_LOG_COST
  );
};
