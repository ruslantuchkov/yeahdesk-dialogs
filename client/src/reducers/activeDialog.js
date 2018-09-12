import { SET_ACTIVE_DIALOG } from '../constants';

export const activeDialog = function(state = null, { type, payload }) {
  if (type === SET_ACTIVE_DIALOG) {
    return payload.id;
  }
  return state;
};
