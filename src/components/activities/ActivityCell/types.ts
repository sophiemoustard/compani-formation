import { SET_TO_GREEN, SET_TO_ORANGE } from './index';
import { GREEN, ORANGE, YELLOW } from '../../../styles/colors';

export type ColorStateType = {
  border: typeof GREEN[600] | typeof ORANGE[600] | typeof YELLOW[600],
  background: typeof GREEN[300] | typeof ORANGE[300] | typeof YELLOW[300],
  check?: typeof GREEN[500] | typeof ORANGE[500],
};

export type ColorActionType = typeof SET_TO_GREEN | typeof SET_TO_ORANGE;
