import {
  LOAD_DIALOGS,
  LOAD_MORE_DIALOGS,
  SUCCESS,
  START,
  CHANGE_DIALOG_FINDING_PARAMS,
  SUBMIT_CHANNEL_INPUT_TEXT,
  RECEIVE_MESSAGE
} from '../constants';

const initialState = {
  entities: [],
  loading: false,
  loaded: false,
  error: null,
  findingParams: { search: '', sort: 'new', channels: [] }
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

  if (type === SUBMIT_CHANNEL_INPUT_TEXT) {
    const idx = state.entities.findIndex(({ id }) => id === payload.dialog);
    return {
      ...state,

      entities: [
        ...state.entities.slice(0, idx),
        {
          ...state.entities[idx],
          messages: [
            ...state.entities[idx].messages,
            {
              id: payload.messageId,
              owner: payload.owner,
              date: payload.date,
              content: { text: payload.text }
            }
          ]
        },
        ...state.entities.slice(idx + 1)
      ]
    };
  }

  if (type === RECEIVE_MESSAGE) {
    const idx = state.entities.findIndex(({ id }) => id === payload.dialogID);
    const dialog = state.entities[idx];

    if (
      dialog &&
      !dialog.messages.find(({ id }) => id === Number(payload.id))
    ) {
      return {
        ...state,

        entities: [
          ...state.entities.slice(0, idx),
          {
            ...dialog,
            messages: [
              ...dialog.messages,
              {
                id: payload.id,
                content: payload.content,
                owner: payload.owner
              }
            ]
          },
          ...state.entities.slice(idx + 1)
        ]
      };
    }
  }

  return state;
};
