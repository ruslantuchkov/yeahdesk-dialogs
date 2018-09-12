import {
  LOAD_DIALOGS,
  LOAD_MORE_DIALOGS,
  SUCCESS,
  START,
  CHANGE_DIALOG_FINDING_PARAMS
} from '../constants';

const initialState = {
  entities: [],
  loading: false,
  loaded: false,
  error: null,
  findingParams: { search: '', sort: 'new' }
};

export const dialogs = (state = initialState, { type, payload }) => {
  if (type === LOAD_DIALOGS + START) {
    return { ...state, loading: true, loaded: false };
  }

  if (type === LOAD_MORE_DIALOGS + SUCCESS) {
    return {
      ...state,
      entities: [...state.entities, ...payload.dialogs],
      loading: false,
      loaded: true,
      hasMore: payload.hasMore
    };
  }

  if (type === LOAD_DIALOGS + SUCCESS) {
    return {
      ...state,
      entities: [...payload.dialogs],
      loading: false,
      loaded: true,
      hasMore: payload.hasMore
    };
  }

  if (type === CHANGE_DIALOG_FINDING_PARAMS) {
    return {
      ...state,
      findingParams: { ...state.findingParams, ...payload.params }
    };
  }

  return state;
};
