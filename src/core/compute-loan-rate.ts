import { type Dependencies } from './dependencies';

type ComputeLoanRateInput = {
  carType: string;
  energy: string;
  year: number;
  distance: number;
  passengers: number;
};

export function computeLoanRate(
  { configRepository }: Dependencies,
  { carType, energy, year, distance, passengers }: ComputeLoanRateInput
): number {
  const carTypeScore = configRepository.getCarTypeScore(carType);
  const energyScore = configRepository.getEnergyScore(energy);
  const yearScore = configRepository.getYearScore(year);
  const distanceScore = configRepository.getDistanceScore(distance);
  const loanBaseRate = configRepository.getLoanBase(
    Math.round(carTypeScore + energyScore + yearScore + distanceScore)
  );
  const loanPenaltyRate = configRepository.getLoanPenalty(passengers);
  return loanBaseRate + loanPenaltyRate;
}
