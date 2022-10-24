import { Dispatch } from 'react';

export interface ActionType {
  type: string;
  payload: any;
}

export type BoundActionsType<T> = {
  [K in keyof T]: T[K] extends (d: Dispatch<ActionType>) => infer R ? R : never
}
