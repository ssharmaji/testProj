import { SelectValue } from '../domain/SelectValue';
import { BagStyles } from '../domain/BagStyles';

export const openEndSelectValues: Record<
  BagStyles,
  Array<SelectValue<string>>
> = {
  Default: [
    { value: 'Flush Cut', display: 'Flush Cut' },
    { value: 'Pinch Prepared', display: 'Pinch Prepared' },
  ],
  Standard: [{ value: 'Flush Cut', display: 'Flush Cut' }],
  'Step Cut': [
    { value: 'Flush Cut', display: 'Flush Cut' },
    { value: 'Pinch Prepared', display: 'Pinch Prepared' },
  ],
};

export const closedEndSelectValues: Record<
  BagStyles,
  Array<SelectValue<string>>
> = {
  Default: [
    { value: 'Sewn EZ Open', display: 'Sewn EZ Open' },
    { value: 'Pinch Closed', display: 'Pinch Closed' },
  ],
  Standard: [
    { value: 'Sewn', display: 'Sewn' },
    { value: 'Sewn EZ Open', display: 'Sewn EZ Open' },
  ],
  'Step Cut': [
    { value: 'Pinch Closed', display: 'Pinch Closed' },
    { value: 'Sewn Closed', display: 'Sewn Closed' },
    { value: 'Sewn EZ Open', display: 'Sewn EZ Open' },
  ],
};

export const widthSelectValues: Record<BagStyles, number[]> = {
  Default: [],
  Standard: [
    10.0, 10.25, 10.5, 10.75, 11.0, 11.25, 11.5, 11.75, 12.0, 12.25, 12.5,
    12.75, 13.0, 13.25, 13.5, 13.75, 14.0, 14.25, 14.5, 14.75, 15.25, 15.5,
    15.75, 16.0, 16.25, 16.5, 16.75, 17.0, 17.25, 17.5, 17.75, 18.0, 18.25,
    18.5, 18.75, 19.0,
  ],
  'Step Cut': [10.23, 13.5, 14, 14.5, 15, 15.75, 16, 17, 17.5, 18],
};

export const gussetSelectValues: number[] = [
  2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5,
  5.75, 6, 6.25, 6.5, 6.75, 7, 7.25, 7.5,
];

export const sewnSleeveLengthSelectValues: Array<SelectValue<number>> = [
  { display: 11.02, value: 11.0236 },
  { display: 11.22, value: 11.22045 },
  { display: 11.42, value: 11.4173 },
  { display: 12.99, value: 12.9921 },
  { display: 13.19, value: 13.18895 },
  { display: 13.39, value: 13.3858 },
  { display: 13.58, value: 13.58265 },
  { display: 13.78, value: 13.7795 },
  { display: 14.17, value: 14.1732 },
  { display: 14.76, value: 14.76375 },
];

export const sleeveLengthSelectValues: Array<SelectValue<number>> = [
  { display: 15.0, value: 14.9606 },
  { display: 15.2, value: 15.15745 },
  { display: 15.4, value: 15.3543 },
  { display: 15.7, value: 15.748 },
  { display: 16.1, value: 16.06296 },
  { display: 16.3, value: 16.33855 },
  { display: 16.5, value: 16.5354 },
  { display: 16.6, value: 16.61414 },
  { display: 16.7, value: 16.73225 },
  { display: 16.9, value: 16.9291 },
  { display: 17.3, value: 17.3228 },
  { display: 17.7, value: 17.7165 },
  { display: 18.1, value: 18.1102 },
  { display: 18.5, value: 18.5039 },
  { display: 18.9, value: 18.8976 },
  { display: 19.3, value: 19.2913 },
  { display: 19.5, value: 19.48815 },
  { display: 19.7, value: 19.685 },
  { display: 19.9, value: 19.88185 },
  { display: 20.1, value: 20.0787 },
  { display: 20.3, value: 20.27555 },
  { display: 20.5, value: 20.4724 },
  { display: 20.9, value: 20.8661 },
  { display: 21.3, value: 21.2598 },
  { display: 21.5, value: 21.45665 },
  { display: 21.7, value: 21.6535 },
  { display: 21.9, value: 21.85035 },
  { display: 22.0, value: 22.0472 },
  { display: 22.4, value: 22.4409 },
  { display: 22.6, value: 22.63775 },
  { display: 22.8, value: 22.8346 },
  { display: 23.0, value: 23.03145 },
  { display: 23.2, value: 23.2283 },
  { display: 23.4, value: 23.42515 },
  { display: 23.6, value: 23.622 },
  { display: 23.8, value: 23.81885 },
  { display: 24.0, value: 24.0157 },
  { display: 24.4, value: 24.4094 },
  { display: 24.8, value: 24.8031 },
  { display: 25.2, value: 25.1968 },
  { display: 25.6, value: 25.5905 },
  { display: 26.0, value: 25.9842 },
  { display: 26.4, value: 26.3779 },
  { display: 26.5, value: 26.5 },
  { display: 26.8, value: 26.77 },
  { display: 26.9, value: 26.96845 },
  { display: 27.0, value: 26.96845 },
  { display: 27.6, value: 27.559 },
  { display: 28.3, value: 28.3464 },
  { display: 28.5, value: 28.54325 },
  { display: 28.9, value: 28.93695 },
  { display: 29.5, value: 29.5275 },
  { display: 30.1, value: 30.11805 },
  { display: 30.3, value: 30.3149 },
  { display: 31.1, value: 31.1023 },
  { display: 32.0, value: 32.00781 },
  { display: 33.0, value: 33.0 },
  { display: 33.5, value: 33.4645 },
  { display: 34.0, value: 34.0 },
  { display: 35.4, value: 35.433 },
  { display: 35.5, value: 35.4 },
  { display: 36.9, value: 36.88969 },
  { display: 37.8, value: 37.7952 },
  { display: 40.0, value: 39.99992 },
];

export const fabricGSMSelectValues: number[] = [60, 65, 70, 75, 80];

export const extrudateGSMSelectValues: number[] = [18, 19, 20, 21, 22, 23];

export const fabricColorSelectValues: Array<SelectValue<string>> = [
  { value: 'White', display: 'White' },
  { value: 'Black', display: 'Black' },
  { value: 'Clear', display: 'Clear' },
  { value: 'Custom', display: 'Custom' },
];

export const fabricSupplierSelectValues: Array<SelectValue<string>> = [
  { value: 'ANDURO 1', display: 'ANDURO 1' },
  { value: 'ANDURO 2', display: 'ANDURO 2' },
  { value: 'SAMSA', display: 'SAMSA' },
  { value: 'SASICASA', display: 'SASICASA' },
  { value: 'DOMESTIC', display: 'DOMESTIC' },
  { value: 'EMPAQUES - GENERAL', display: 'EMPAQUES - GENERAL' },
  { value: 'INDIA', display: 'INDIA' },
];

export const outerLayerTypeSelectValues: Array<SelectValue<string>> = [
  { value: 'BOPP GLOSSY', display: 'BOPP GLOSSY' },
  { value: 'BOPP MATTE', display: 'BOPP MATTE' },
  { value: 'DOUBLE BOPP GLOSSY', display: 'DOUBLE BOPP GLOSSY' },
  { value: 'DOUBLE BOPP MATTE', display: 'DOUBLE BOPP MATTE' },
];

export const printedGSMSelectValues: number[] = [19];
export const gsmSelectValues: number[] = [45, 56, 58, 62, 74, 81];

export const layerMaterialSelectValues: Array<SelectValue<string>> = [
  { value: 'INPLASA CE', display: 'INPLASA CE' },
  { value: 'INPLASA CE MATTE', display: 'INPLASA CE MATTE' },
  { value: 'VITOPEL TS', display: 'VITOPEL TS' },
  { value: 'INPLASA DOUBLE', display: 'INPLASA DOUBLE' },
  { value: 'PLASTINOVA', display: 'PLASTINOVA' },
  { value: 'CHIRIPAL TS', display: 'CHIRIPAL TS' },
  { value: 'CHIRIPAL MATTE', display: 'CHIRIPAL MATTE' },
];

export const matteUpchargeSelectValues: number[] = [0, 6, 7, 8, 10, 12];

export const stickerOrHotMeltSelectValues: Array<SelectValue<string>> = [
  { value: 'No', display: 'No' },
  { value: 'Small (2.5" x 1.5")', display: 'Small (2.5" x 1.5")' },
  { value: 'Med (4" x 4")', display: 'Med (4" x 4")' },
  { value: 'Large (8" x 8")', display: 'Large (8" x 8")' },
  { value: 'Hot Melt', display: 'Hot Melt' },
];

export const numberOfColorsSelectValues: Array<SelectValue<number | string>> = [
  { value: 1, display: '01' },
  { value: 2, display: '02' },
  { value: 3, display: '03' },
  { value: 4, display: '04' },
  { value: 5, display: '05' },
  { value: 6, display: '06' },
  { value: 7, display: '07' },
  { value: 8, display: '08' },
  { value: 9, display: '09' },
  { value: 10, display: '10' },
];

export const ezOpenTapeSelectValues: Array<SelectValue<string>> = [
  { value: 'n/a', display: 'N/A' },
  { value: '1Ply', display: '1 PLY' },
  { value: '2Ply', display: '2 PLY' },
];

export const finalDestinationSelectValues: Array<SelectValue<string>> = [
  { value: 'Gulfport', display: 'Gulfport' },
  { value: 'Honduras Port', display: 'Honduras Port' },
  { value: 'Door to Door', display: 'Door to Door' },
];

export const moqKgSelectValues: Array<number | 'Other'> = [
  500,
  350,
  200,
  100,
  'Other',
];

export const formValueFromNumber = (input: number | null): string | null => {
  if (input === null) return null;

  return input.toString();
};

export const extractDateFromString = (dateStr: string): Date | string => {
  if (dateStr === '') return dateStr;

  const dateParts = dateStr.split('-').map((s) => parseInt(s));
  return new Date(dateParts[0], dateParts[1], dateParts[2]);
};
