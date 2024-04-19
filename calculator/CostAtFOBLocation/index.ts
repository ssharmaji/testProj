export interface CostAtFobLocationDto {
  costAtPlant: number;
  moqUpcharge: number;
}

export const calculateCostAtFOBLocation = ({
  costAtPlant,
  moqUpcharge,
}: CostAtFobLocationDto) => {
  return costAtPlant + moqUpcharge;
};
