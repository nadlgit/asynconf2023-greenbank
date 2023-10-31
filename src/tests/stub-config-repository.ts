import { type ConfigRepository } from '../core/config-repository';

export class StubConfigRepository implements ConfigRepository {
  private carTypeScores: Record<string, number> = {};
  private energyScores: Record<string, number> = {};
  private yearScores: Record<number, number> = {};
  private distanceScores: Record<number, number> = {};
  private loanBaseRates: Record<number, number> = {};
  private loanPenaltyRates: Record<number, number> = {};

  setCarTypeScore(carType: string, score: number) {
    this.carTypeScores[carType] = score;
  }
  setEnergyScore(energy: string, score: number) {
    this.energyScores[energy] = score;
  }
  setYearScore(year: number, score: number) {
    this.yearScores[year] = score;
  }
  setDistanceScore(distance: number, score: number) {
    this.distanceScores[distance] = score;
  }
  setLoanBaseRate(score: number, rate: number) {
    this.loanBaseRates[score] = rate;
  }
  setLoanPenaltyRate(passengers: number, rate: number) {
    this.loanPenaltyRates[passengers] = rate;
  }

  getCarTypes() {
    return Object.keys(this.carTypeScores);
  }
  getEnergies() {
    return Object.keys(this.energyScores);
  }
  getCarTypeScore(carType: string) {
    return this.carTypeScores[carType] ?? 0;
  }
  getEnergyScore(energy: string) {
    return this.energyScores[energy] ?? 0;
  }
  getYearScore(year: number) {
    return this.yearScores[year] ?? 0;
  }
  getDistanceScore(distance: number) {
    return this.distanceScores[distance] ?? 0;
  }
  getLoanBase(score: number) {
    return this.loanBaseRates[score] ?? 0;
  }
  getLoanPenalty(passengers: number) {
    return this.loanPenaltyRates[passengers] ?? 0;
  }
}
