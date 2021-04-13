import { ActionWithoutPayloadType } from '../../types/store/StoreType';
import {
  SET_ACTIVITY,
  SetActivityType,
  SET_EXIT_CONFIRMATION_MODAL,
  SetExitConfirmationModalType,
  SET_ACTIVITY_HISTORIES,
  SetActivityHistories,
  RESET_ACTIVITY_REDUCER,
} from '../../types/store/ActivityStoreType';
import { ActivityType } from '../../types/ActivityType';
import { ActivityHistoryType } from '../../types/ActivityHistoryType';

const setActivity = (activity: ActivityType): SetActivityType => ({ type: SET_ACTIVITY, payload: activity });
const setExitConfirmationModal = (exitConfirmationModal: boolean): SetExitConfirmationModalType =>
  ({ type: SET_EXIT_CONFIRMATION_MODAL, payload: exitConfirmationModal });
const resetActivityReducer = (): ActionWithoutPayloadType => ({ type: RESET_ACTIVITY_REDUCER });
const setActivityHistories = (activityHistories: Array<ActivityHistoryType>): SetActivityHistories =>
  ({ type: SET_ACTIVITY_HISTORIES, payload: activityHistories });

export default {
  setActivity,
  setExitConfirmationModal,
  resetActivityReducer,
  setActivityHistories,
};
