export const RESET_ERROR = 'reset_error';
export const SET_ERROR = 'set_error';
export const initialErrorState = { value: false, message: '' };

export interface ErrorStateType {
  value : boolean,
  message: string
}

export type SetErrorType = { type: typeof SET_ERROR, payload: string };

export type ResetErrorType = { type: typeof RESET_ERROR };

export type ErrorActionType = SetErrorType | ResetErrorType

export const errorReducer = (state: ErrorStateType, action: ErrorActionType): ErrorStateType => {
  switch (action.type) {
    case SET_ERROR:
      return { value: true, message: action.payload };
    case RESET_ERROR:
      return initialErrorState;
    default:
      return state;
  }
};
