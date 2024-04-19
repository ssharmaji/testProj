import { PPFabric } from '../../../domain/PPFabric';
import { BOPPFabric } from '../../../domain/BOPPFabric';
import { StickerOrHotMelt } from '../../../domain/StickerOrHotMelt';

export const PP_FABRIC_COSTS: Record<PPFabric, number> = {
  SAMSA: 2.9726,
  SASICASA: 2.9768,
  SIMPLEX: 2.704,
  'EMPAQUES - GENERAL': 2.9726,
  INDIA: 1.905,
  'ANDURO 1': 2.635,
  'ANDURO 2': 1.905,
};

export const BOPP_FABRIC_COSTS: Record<BOPPFabric, number> = {
  'INPLASA CE': 7.2395,
  'INPLASA CE MATTE': 7.8695,
  PAPER: 0,
  'VITOPEL TS': 6.9295,
  'INPLASA DOUBLE': 6.15,
  'CHIRIPAL TS': 6.8295,
  'CHIRIPAL MATTE': 7.3095,
  PLASTINOVA: 8.4,
};

export const STICKER_OR_HOT_MELT_COSTS: Record<StickerOrHotMelt, number> = {
  No: 0,
  'Small (2.5" x 1.5")': 0.0169,
  'Med (4" x 4")': 0.0232,
  'Large (8" x 8")': 0.0463,
  'Hot Melt': 0.018,
};

export const PP_RESIN_COST = 2.42;
export const PE_RESIN_COST = 2.42;
export const BONDING_RESINS_COST = 5.5;
export const EZ_OPEN_TAPE_COST = 2.46;
export const PP_25_TAPE_COST = 2.46;
export const HANDLE_COST = 0.0325;
export const THREAD_COST = 10.16;
