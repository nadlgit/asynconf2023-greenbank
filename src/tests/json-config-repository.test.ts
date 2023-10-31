import { jsonConfigRepository } from '~/data/json-config-repository';

describe('jsonConfigRepository', () => {
  it.each([
    {
      exampleNumber: 1,
      input: {
        carType: 'Citadine',
        energy: 'Electrique',
        year: 2009,
        distance: 25000,
        passengers: 1,
      },
      expected: {
        carTypeScore: 8,
        energyScore: 9,
        yearScore: 5,
        distanceScore: 1,
        loanBaseRate: 2.52,
        loanPenaltyRate: 0.11,
      },
    },
    {
      exampleNumber: 2,
      input: {
        carType: 'Citadine',
        energy: 'Hybride',
        year: 2015,
        distance: 6000,
        passengers: 4,
      },
      expected: {
        carTypeScore: 8,
        energyScore: 7,
        yearScore: 7,
        distanceScore: 9,
        loanBaseRate: 2.1,
        loanPenaltyRate: -0.53,
      },
    },
    {
      exampleNumber: 3,
      input: {
        carType: 'Cabriolet',
        energy: 'Diesel',
        year: 1998,
        distance: 14000,
        passengers: 2,
      },
      expected: {
        carTypeScore: 6,
        energyScore: 4,
        yearScore: 4,
        distanceScore: 7,
        loanBaseRate: 2.52,
        loanPenaltyRate: -0.17,
      },
    },
  ])('handles example $exampleNumber', ({ input, expected }) => {
    const carTypeScore = jsonConfigRepository.getCarTypeScore(input.carType);
    const energyScore = jsonConfigRepository.getEnergyScore(input.energy);
    const yearScore = jsonConfigRepository.getYearScore(input.year);
    const distanceScore = jsonConfigRepository.getDistanceScore(input.distance);
    const loanBaseRate = jsonConfigRepository.getLoanBase(
      carTypeScore + energyScore + yearScore + distanceScore
    );
    const loanPenaltyRate = jsonConfigRepository.getLoanPenalty(input.passengers);
    expect({
      carTypeScore,
      energyScore,
      yearScore,
      distanceScore,
      loanBaseRate,
      loanPenaltyRate,
    }).toEqual(expected);
  });

  it.each([
    { year: 1960, expected: 1 },
    { year: 1970, expected: 2 },
    { year: 1980, expected: 3 },
    { year: 1990, expected: 4 },
    { year: 2000, expected: 5 },
    { year: 2010, expected: 7 },
  ])('handles year boundaries: $year', ({ year, expected }) => {
    const score = jsonConfigRepository.getYearScore(year);
    expect(score).toEqual(expected);
  });

  it.each([
    { distance: 5000, expected: 9 },
    { distance: 10000, expected: 7 },
    { distance: 15000, expected: 5 },
    { distance: 20000, expected: 3 },
    { distance: 25000, expected: 1 },
    { distance: 30000, expected: 0 },
  ])('handles distance boundaries: $distance', ({ distance, expected }) => {
    const score = jsonConfigRepository.getDistanceScore(distance);
    expect(score).toEqual(expected);
  });
});
