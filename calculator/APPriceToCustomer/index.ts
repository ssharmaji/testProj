export interface ApPriceToCustomerDto {
  amsaPx: number;
  APPriceToCustomerPercentage: number;
}

export const calculateAPPriceToCustomer = ({
  amsaPx,
  APPriceToCustomerPercentage,
}: ApPriceToCustomerDto) => {
  return amsaPx / (1 - APPriceToCustomerPercentage);
};
