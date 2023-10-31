import { type Dependencies } from './dependencies';

export function getCarTypes({ configRepository }: Dependencies) {
  return configRepository.getCarTypes();
}
