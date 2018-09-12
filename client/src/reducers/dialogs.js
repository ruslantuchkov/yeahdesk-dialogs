import { LOAD_DIALOGS, SUCCESS, START } from '../constants';

const initialState = {
  entities: [],
  loading: false,
  loaded: false,
  error: null
};

export const dialogs = (state = initialState, { type, payload }) => {
  if (type === LOAD_DIALOGS + START) {
    return { ...state, loading: true, loaded: false };
  }

  if (type === LOAD_DIALOGS + SUCCESS) {
    return {
      ...state,
      entities: [...state.entities, ...payload.dialogs],
      loading: false,
      loaded: true,
      hasMore: payload.hasMore
    };
  }
  return state;
};
