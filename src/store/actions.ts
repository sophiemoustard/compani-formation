import {
  SET_ACTIVITY,
  SET_CARD_INDEX,
  SetActivityType,
  SetCardIndexType,
  SetExitConfirmationModalType,
  SET_EXIT_CONFIRMATION_MODAL,
} from '../types/StoreType';
import { ActivityType } from '../types/ActivityType';

const setActivity = (activity: ActivityType): SetActivityType => ({ type: SET_ACTIVITY, payload: activity });
const setCardIndex = (index: number): SetCardIndexType => ({ type: SET_CARD_INDEX, payload: index });
const setExitConfirmationModal = (exitConfirmationModal: boolean): SetExitConfirmationModalType =>
  ({ type: SET_EXIT_CONFIRMATION_MODAL, payload: exitConfirmationModal });

export default {
  setActivity,
  setCardIndex,
  setExitConfirmationModal,
};
