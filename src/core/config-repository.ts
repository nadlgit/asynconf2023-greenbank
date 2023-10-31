export type ConfigRepository = {
  getCarTypes(): string[];
  getEnergies(): string[];
  getCarTypeScore(carType: string): number;
  getEnergyScore(energy: string): number;
  getYearScore(year: number): number;
  getDistanceScore(distance: number): number;
  getLoanBase(score: number): number;
  getLoanPenalty(passengers: number): number;
};
