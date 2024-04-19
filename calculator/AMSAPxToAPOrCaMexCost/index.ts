export interface AmsaPxToApOrCaMexCostDto {
  costAtFOBLocation: number;
  AMSAPxToAPOrCaMexCostPercentage: number;
}

export const calculateAMSAPxToAPOrCaMexCost = ({
  costAtFOBLocation,
  AMSAPxToAPOrCaMexCostPercentage,
}: AmsaPxToApOrCaMexCostDto) => {
  return costAtFOBLocation / (1 - AMSAPxToAPOrCaMexCostPercentage);
};
