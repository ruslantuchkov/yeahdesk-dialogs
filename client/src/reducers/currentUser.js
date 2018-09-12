import { SET_CURRENT_USER } from '../constants';

export const currentUser = (state = {}, { type, payload }) => {
  if (type === SET_CURRENT_USER) {
    return payload.user;
  }
  return state;
};
