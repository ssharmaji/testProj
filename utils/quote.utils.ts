import { calculatePalletCosts, CalculatePalletCostsDto } from '../calculator';
import { BOPPFabric } from '../domain/BOPPFabric';
import { ContainerLength } from '../domain/ContainerLength';
import { StickerOrHotMelt } from '../domain/StickerOrHotMelt';
import { YesOrNo } from '../domain/YesOrNo';

const numberFormatter = new Intl.NumberFormat();
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export interface CalculateMoqDto {
  gusset: number;
  moqKg: number;
  printedGSM: number;
  sleeveLength: number;
  width: number;
}

export const calculateMOQ = ({
  gusset,
  moqKg = 500,
  printedGSM,
  sleeveLength,
  width,
}: CalculateMoqDto): number => {
  const BAGS_PER_KG =
    1000 / ((width + gusset + 0.75) * 2 * sleeveLength * (printedGSM / 1550));
  return BAGS_PER_KG * moqKg;
};

export interface CalculateBagTotalSqmDto {
  finishedLength: number;
  gusset: number;
  width: number;
}

export const calculateBagTotalSQM = ({
  finishedLength,
  gusset,
  width,
}: CalculateBagTotalSqmDto): number => {
  return ((width + gusset) * 2 * finishedLength) / 1550;
};

export interface CalculateBagGsmDto {
  extrudateGSM: number;
  fabricGSM: number;
  printedGSM: number;
}

export const calculateBagGSM = ({
  extrudateGSM,
  fabricGSM,
  printedGSM,
}: CalculateBagGsmDto) => {
  // GeneralDataB54
  const ADHESIVE_POLY_GSM: number = 3.5;
  // GeneralDataB55
  const TIE_LAYER_GSM: number = extrudateGSM + ADHESIVE_POLY_GSM;

  return fabricGSM + TIE_LAYER_GSM + printedGSM;
};

export interface GeneratePalletTableDto {
  adLamCharge: number;
  APPriceToCustomerPercentage: number;
  AMSAPxToAPOrCaMexCostPercentage: number;
  bagStyle: string;
  bagsPerPallet: number;
  boppGSM: number;
  commissionPercentage: number;
  containerLength: ContainerLength;
  closedEnd: string;
  extrudateGSM: number;
  ezOpenTape: string;
  ezOpenTapeMtsKg: number;
  fabricColor: string;
  fabricGSM: number;
  fabricSupplier: string;
  finishedLength: number;
  fob: string;
  gusset: number;
  handle: YesOrNo;
  layerMaterial: BOPPFabric;
  logisticsPrice: number;
  matteFinish: boolean;
  moq: number;
  moqKg: number;
  printedGSM: number;
  qty: number;
  sleeveLength: number;
  stickerOrHotMelt: StickerOrHotMelt;
  tapeMtsKg: number;
  totalPallets: number;
  width: number;
}

export const generatePalletTable = ({
  adLamCharge,
  AMSAPxToAPOrCaMexCostPercentage,
  APPriceToCustomerPercentage,
  bagStyle,
  bagsPerPallet,
  boppGSM,
  commissionPercentage,
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
  moq,
  moqKg,
  printedGSM,
  qty,
  sleeveLength,
  stickerOrHotMelt,
  totalPallets,
  width,
}: GeneratePalletTableDto) => {
  const palletIterations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const palletData = palletIterations.map((numPallets) => {
    const currentQty = bagsPerPallet * numPallets;

    const { pxPerThousand, ...restDetails } = calculatePalletCosts({
      adLamCharge,
      AMSAPxToAPOrCaMexCostPercentage,
      APPriceToCustomerPercentage,
      bagStyle,
      bagsPerPallet,
      boppGSM,
      containerLength,
      closedEnd,
      commissionPercentage,
      currentQty,
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
      moq,
      moqKg,
      printedGSM,
      qty,
      sleeveLength,
      stickerOrHotMelt,
      totalPallets,
      width,
    });

    return {
      numPallets,
      qty: numberFormatter.format(currentQty),
      pxPerThousand: currencyFormatter.format(
        parseFloat(pxPerThousand.toFixed(2))
      ),
      pxPerThousandWithoutCurrency: parseFloat(pxPerThousand.toFixed(2)),
      devDetails: {
        ...restDetails,
      },
    };
  });

  return palletData;
};
