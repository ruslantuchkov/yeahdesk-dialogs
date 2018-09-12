import { SET_ACTIVE_DIALOG, RECEIVE_MESSAGE } from '../constants';

export const unreadDialogs = (state = {}, { type, payload }) => {
  if (type === RECEIVE_MESSAGE) {
    if (payload.activeDialog !== payload.dialogID) {
      return {
        ...state,
        [payload.dialogID]: state[payload.dialogID] + 1 || 1
      };
    }
  }
  if (type === SET_ACTIVE_DIALOG) {
    return {
      ...state,
      [payload.id]: 0
    };
  }
  return state;
};
