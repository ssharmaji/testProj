import { ContainerLength } from '../../../domain/ContainerLength';

export interface CalculatePortCostsDto {
  bagsPerPallet: number;
  containerLength?: ContainerLength;
  fob: string;
}
