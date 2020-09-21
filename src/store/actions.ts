import { LOG_OUT, ResetType } from '../types/store/StoreType';

const resetAllReducers = (): ResetType => ({ type: LOG_OUT });

export default { resetAllReducers };
