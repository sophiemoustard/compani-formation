import { SET_ACTIVITY, ActionType } from '../types/StoreType';

export function setActivity(activity): ActionType {
  return { type: SET_ACTIVITY, payload: activity };
}
