import { GeoButtonDataType } from '../types/appTypes';

export const shuffleArray = (array: GeoButtonDataType[]) => {
  const shCopy = [...array];
  return shCopy.sort(() => Math.random() - 0.5);
};
