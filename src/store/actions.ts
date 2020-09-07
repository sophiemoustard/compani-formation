import { SET_ACTIVITY, ActionType } from '../types/StoreType';
import { ActivityType } from '../types/ActivityType';

export const setActivity = (activity: ActivityType): ActionType => ({ type: SET_ACTIVITY, payload: activity });
