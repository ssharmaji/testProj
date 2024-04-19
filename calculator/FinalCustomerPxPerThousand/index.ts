export interface FinalCustomerPxPerThousandDto {
  finalPricePerBag: number;
}

export const calculateFinalCustomerPxPerThousand = ({
  finalPricePerBag,
}: FinalCustomerPxPerThousandDto) => {
  return finalPricePerBag * 1000;
};
