import { useCallback, useMemo } from 'react';
import { jsonConfigRepository } from '~/data/json-config-repository';
import { getCarTypes } from '~/core/get-car-types';
import { getEnergies } from '~/core/get-energies';
import { computeLoanRate } from '~/core/compute-loan-rate';

export const useData = () => {
  const carTypes = useMemo(() => getCarTypes({ configRepository: jsonConfigRepository }), []);
  const energies = useMemo(() => getEnergies({ configRepository: jsonConfigRepository }), []);
  const compute = useCallback(
    (input: Parameters<typeof computeLoanRate>[1]) =>
      computeLoanRate({ configRepository: jsonConfigRepository }, input),
    []
  );
  return { carTypes, energies, compute };
};
