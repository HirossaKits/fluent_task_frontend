import { useCallback } from 'react';

interface T {
  [key: string]: string;
}

interface Ex extends T {
  [key: string | number | symbol]: any;
}

const useCreateOption = () => {
  return useCallback(
    <T>(
      objArray: Ex[],
      value: keyof T,
      label: keyof T | (keyof T)[]
    ): { value: string; label: string }[] => {
      if (Array.isArray(label)) {
        return objArray?.map((obj) => ({
          value: obj[value],
          label: label.map((lab) => obj[lab]).join(' '),
        }));
      } else {
        return objArray?.map((obj) => ({
          value: obj[value],
          label: obj[label],
        }));
      }
    },
    []
  );
};

export default useCreateOption;
