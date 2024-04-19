export const calculateFixedManufacturingCosts = () => {
  const DIRECT_LABOR = 0.02143;
  const OVERHEADS = 0.02014;
  const DEPRECIATION = 0.00719;

  return DIRECT_LABOR + OVERHEADS + DEPRECIATION;
};
