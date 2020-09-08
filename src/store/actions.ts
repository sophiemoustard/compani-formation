import { SET_ACTIVITY, SET_CARD_INDEX, SetActivityType, SetCardIndexType } from '../types/StoreType';
import { ActivityType } from '../types/ActivityType';

export const setActivity = (activity: ActivityType): SetActivityType => ({ type: SET_ACTIVITY, payload: activity });
export const setCardIndex = (index: number): SetCardIndexType => ({ type: SET_CARD_INDEX, payload: index });
