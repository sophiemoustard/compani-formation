import { LOG_OUT, ActionWithoutPayloadType } from '../types/store/StoreType';

const resetAllReducers = (): ActionWithoutPayloadType => ({ type: LOG_OUT });

export default { resetAllReducers };
