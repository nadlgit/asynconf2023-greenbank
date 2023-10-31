import { computeLoanRate } from '~/core/compute-loan-rate';
import { jsonConfigRepository } from '~/data/json-config-repository';
import { StubConfigRepository } from './stub-config-repository';

describe('computeLoanRate', () => {
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
      expected: 2.63,
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
      expected: 1.57,
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
      expected: 2.35,
    },
  ])('handles example $exampleNumber', ({ input, expected }) => {
    const loanRate = computeLoanRate({ configRepository: jsonConfigRepository }, input);
    expect(loanRate).toEqual(expected);
  });

  it.each([
    { score: 10.49, expectedScore: 10, expectedRate: 1.5 },
    { score: 10.5, expectedScore: 11, expectedRate: 1 },
    { score: 10.51, expectedScore: 11, expectedRate: 1 },
  ])('handles score rounding: $score', ({ score, expectedScore, expectedRate }) => {
    const input = {
      carType: 'Type',
      energy: 'Energy',
      year: 2020,
      distance: 5000,
      passengers: 1,
    };
    const configRepository = new StubConfigRepository();
    configRepository.setCarTypeScore(input.carType, score);
    configRepository.setLoanBaseRate(expectedScore, expectedRate);
    const loanRate = computeLoanRate({ configRepository }, input);
    expect(loanRate).toEqual(expectedRate);
  });
});
