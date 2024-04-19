export interface MoqUpchargeDto {
  boppUpcharge: number;
  qty: number;
}

export const calculateMoqUpcharge = ({
  boppUpcharge,
  qty,
}: MoqUpchargeDto) => {
  return boppUpcharge / qty;
};
