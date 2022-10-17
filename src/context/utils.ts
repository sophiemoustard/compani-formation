import { Dispatch } from 'react';

export interface Action {
  type: string;
  payload: any;
}

export type BoundActions<T> = {
  [K in keyof T]: T[K] extends (d: Dispatch<Action>) => infer R ? R : never
}
