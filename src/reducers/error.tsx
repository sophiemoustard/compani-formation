export const RESET_ERROR = 'reset_error';
export const SET_ERROR = 'set_error';
export const initialErrorState = { error: false, errorMessage: '' };

export interface ErrorStateType {
  error : boolean,
  errorMessage: string
}

export type ErrorActionType = SetErrorType | ResetErrorType

export type SetErrorType = { type: typeof SET_ERROR, payload: string };

export type ResetErrorType = { type: typeof RESET_ERROR };

export const errorReducer = (
  state: ErrorStateType,
  action: ErrorActionType
): ErrorStateType => {
  switch (action.type) {
    case SET_ERROR:
      return { error: true, errorMessage: action.payload };
    case RESET_ERROR:
      return initialErrorState;
    default:
      return state;
  }
};
