import { ChangeEvent, Dispatch } from 'react';

export function reducer<T>(state: T, newState: Partial<T>): T {
  return { ...state, ...newState };
}

export type OnChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

export function useOnChange(
  dispatch: Dispatch<Partial<{ [id: string]: string }>>,
): OnChange {
  return function ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    dispatch({ [target.id]: target.value });
  };
}
