import { BOPPFabric } from './BOPPFabric';
import { ContainerLength } from './ContainerLength';
import { StickerOrHotMelt } from './StickerOrHotMelt';
import { YesOrNo } from './YesOrNo';

// Represents the quote form values where numbers are strings from inputs.
// Dates are native Dates from the datepickers
export interface IQuoteForm {
  quoteName: string;
  customerName: string;
  contactName: string;
  orderDescription: string;
  orderDate: Date | string;
  desiredDeliveryDate: Date | string;
  bagStyle: string;
  openEnd: string;
  estimatedOrderQty: string;
  closedEnd: string;
  annualUsage: string;
  bagName:any;
  width: any;
  gusset: any;
  sleeveLength: any;
  gluePlateDepth: any;
  finishedLength: any;
  fabricGSM: string;
  extrudateGSM: string;
  fabricColor: string;
  fabricSupplier: string;
  specialLamination: YesOrNo;
  outerLayerType: string;
  gsm: string;
  layerMaterial: BOPPFabric;
  matteUpcharge: string;
  uvTreatment: YesOrNo;
  stickerOrHotMelt: StickerOrHotMelt;
  handle?: YesOrNo;
  highCOF: YesOrNo;
  numberOfColors: string;
  ezOpenTape: string;
  threadColor?: string;
  ezOpenColor?: string;
  tapeColor?: string;
  specialInstructions: string;
  finalDestination: string;
  containerLength: ContainerLength;
  moqKg: string;
  moqKgOtherValue?: string;
  adLamCharge: string;
  tapeMtsKg: string;
  ezOpenTapeMtsKg: string;
  commissionPercentage: string;
  AMSAPxToAPOrCaMexCostPercentage: string;
  APPriceToCustomerPercentage: string;
}
