import { createAction } from '@reduxjs/toolkit';

const LOG_OUT = 'log_out';

export const resetAllReducers = createAction(LOG_OUT);
