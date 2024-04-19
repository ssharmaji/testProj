export type PackingMaterials =
  | 'PLASTIC_STRAP'
  | 'TOP_CARTON_BOX'
  | 'BOTTOM_CARTON_BOX'
  | 'SLIP_SHEET'
  | 'WOOD_PALLET'
  | 'PICTURE_FRAME'
  | 'STAPLES'
  | 'CLEAR_TAPE';

export const PACKAGING_COSTS: Record<PackingMaterials, number> = {
  // StrapDataB10
  PLASTIC_STRAP: 123.28 / 6500,
  TOP_CARTON_BOX: 11.2,
  BOTTOM_CARTON_BOX: 10.16,
  SLIP_SHEET: 1.18,
  WOOD_PALLET: 10.85,
  PICTURE_FRAME: 6,
  STAPLES: 0.02118,
  CLEAR_TAPE: 1.05,
};
