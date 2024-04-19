export interface OtherAddedToFinalPriceDto {
  apPriceToCustomer: number;
  commissionPercentage: number;
}

export const calculateOtherAddedToFinalPrice = ({
  apPriceToCustomer,
  commissionPercentage,
}: OtherAddedToFinalPriceDto) => {
  return apPriceToCustomer + apPriceToCustomer * commissionPercentage;
};
