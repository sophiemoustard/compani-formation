import {
  SET_ACTIVITY,
  SET_CARD_INDEX,
  SetActivityType,
  SetCardIndexType,
  SetExitConfirmationModalType,
  SET_EXIT_CONFIRMATION_MODAL,
} from '../types/StoreType';
import { ActivityType } from '../types/ActivityType';

exports.setActivity = (activity: ActivityType): SetActivityType => ({ type: SET_ACTIVITY, payload: activity });
exports.setCardIndex = (index: number): SetCardIndexType => ({ type: SET_CARD_INDEX, payload: index });
exports.setExitConfirmationModal = (exitConfirmationModal: boolean): SetExitConfirmationModalType =>
  ({ type: SET_EXIT_CONFIRMATION_MODAL, payload: exitConfirmationModal });
