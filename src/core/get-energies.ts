import { type Dependencies } from './dependencies';

export function getEnergies({ configRepository }: Dependencies) {
  return configRepository.getEnergies();
}
