import { YesOrNo } from './YesOrNo';

// Used to display the quote on the /quote page
export interface IQuoteDisplay {
  customerDetails: {
    customerName: string;
    contactName: string;
    orderDescription: string;
  };
  bagStyle: {
    type: string;
    mfgEnd: string;
    customerEnd: string;
  };
  bagDimensions: {
    width: number;
    gusset: number;
    finishedLength: number;
    sleeveLength: any;
  };
  bagSpecs: {
    outerLayerType: string;
    fabricGSM: number;
    fabricColor: string;
    numberOfColors: string;
    prepressCost: string;
    handle: YesOrNo;
    bagTotalSQM: string;
    bagGSM: string;
  };
  orderDetails: {
    fob: string;
    moq: number;
    orderSize: string;
    annualUsage: string;
    quoteName: any;
    orderDate:any;
    desiredDeliveryDate:any;
  };
  bagDetails:{
    bagName: any;
    bagWidth: any;
    bagGusset: any;
    sleeveLength: any;
    finishedLength: any;
    gluePlateDepth: any;
    moqKg:any;
    gsm:any;
  }
}
