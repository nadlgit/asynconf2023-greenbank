import { type ConfigRepository } from '~/core/config-repository';
import configData from './config-repository-data.json';

export const jsonConfigRepository: ConfigRepository = {
  getCarTypes() {
    return Object.keys(carTypeScores);
  },
  getEnergies() {
    return Object.keys(energyScores);
  },
  getCarTypeScore(carType: string) {
    return carTypeScores[carType] ?? 0;
  },
  getEnergyScore(energy: string) {
    return energyScores[energy] ?? 0;
  },
  getYearScore(year: number) {
    return yearScores.getValue(year) ?? 0;
  },
  getDistanceScore(distance: number) {
    return distancesScores.getValue(distance) ?? 0;
  },
  getLoanBase(score: number) {
    return loanBase.getValue(score) ?? 0;
  },
  getLoanPenalty(passengers: number) {
    return loanPenalty.getValue(passengers) ?? 0;
  },
};

// PRIVATE

class NumberRangeMap {
  constructor(
    private items: { rangeMin: number | null; rangeMax: number | null; value: number }[]
  ) {}

  getValue(key: number) {
    return this.items.find(
      ({ rangeMin, rangeMax }) =>
        (rangeMin === null || key >= rangeMin) && (rangeMax === null || key <= rangeMax)
    )?.value;
  }
}

const carTypeScores: Record<string, number> = Object.fromEntries(
  configData.scoreData.carType.map(({ name, score }) => [name, score])
);
const energyScores: Record<string, number> = Object.fromEntries(
  configData.scoreData.automotiveEnergy.map(({ name, score }) => [name, score])
);
const yearScores: NumberRangeMap = new NumberRangeMap(
  configData.scoreData.yearOfConstruction.map(({ min, max, score }) => ({
    rangeMin: min,
    rangeMax: max,
    value: score,
  }))
);
const distancesScores: NumberRangeMap = new NumberRangeMap(
  configData.scoreData.yearlyKilometers.map(({ min, max, score }) => ({
    rangeMin: min,
    rangeMax: max,
    value: score,
  }))
);
const loanBase: NumberRangeMap = new NumberRangeMap(
  configData.loanBase.map(({ scoreMin, scoreMax, rate }) => ({
    rangeMin: scoreMin,
    rangeMax: scoreMax,
    value: rate,
  }))
);
const loanPenalty: NumberRangeMap = new NumberRangeMap(
  configData.loanPenalty.map(({ passengerMin, passengerMax, rate }) => ({
    rangeMin: passengerMin,
    rangeMax: passengerMax,
    value: rate,
  }))
);
