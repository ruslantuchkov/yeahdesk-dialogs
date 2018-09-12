import { SET_CHANNELS } from '../constants';

export const channels = (state = [], { type, payload }) => {
  if (type === SET_CHANNELS) {
    return payload.channels;
  }
  return state;
};
