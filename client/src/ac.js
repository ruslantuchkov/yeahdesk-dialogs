import {
  SET_CURRENT_USER,
  LOAD_DIALOGS,
  LOAD_MORE_DIALOGS,
  SUCCESS,
  START,
  FAIL,
  SET_USERS_INFO,
  CHANGE_DIALOG_FINDING_PARAMS,
  SET_CHANNELS,
  SET_ACTIVE_DIALOG,
  SUBMIT_CHANNEL_INPUT_TEXT
} from './constants';
import axios from 'axios';

export const getCurrentUser = dispatch => {
  axios.get('/api/users/current').then(res =>
    dispatch({
      type: SET_CURRENT_USER,
      payload: { user: res.data }
    })
  );
};

export const getUsers = userIds => (dispatch, getState) => {
  const userIdsForFetching = userIds.filter(
    userId => !getState().usersInfo.some(({ id }) => id === userId)
  );
  Promise.all(
    userIdsForFetching.map(id =>
      axios.get(`/api/users/${id}`).then(res => res.data)
    )
  ).then(users =>
    dispatch({
      type: SET_USERS_INFO,
      payload: { users }
    })
  );
};

export const getDialogs = (
  from = 0,
  to = 50,
  sort = 'new',
  search = '_',
  channels = '_'
) => dispatch => {
  dispatch({
    type: LOAD_DIALOGS + START
  });

  axios
    .get(`/api/dialogs/${from}/${to}/${sort}/${search}/${channels}`)
    .then(res => {
      if (from === 0) {
        dispatch({
          type: LOAD_DIALOGS + SUCCESS,
          payload: { dialogs: res.data.dialogs, hasMore: res.data.hasMore }
        });
      } else {
        dispatch({
          type: LOAD_MORE_DIALOGS + SUCCESS,
          payload: { dialogs: res.data.dialogs, hasMore: res.data.hasMore }
        });
      }

      dispatch(
        getUsers([
          ...new Set(
            res.data.dialogs.map(
              dialog => dialog.messages[dialog.messages.length - 1].owner
            )
          )
        ])
      );
    })
    .catch(error => {
      dispatch({
        type: LOAD_DIALOGS + FAIL,
        error
      });
    });
};

export const changeFindingParams = params => ({
  type: CHANGE_DIALOG_FINDING_PARAMS,
  payload: { params }
});

export const getChannels = () => dispatch => {
  axios.get(`/api/dialogs/channels`).then(res => {
    dispatch({
      type: SET_CHANNELS,
      payload: { channels: res.data }
    });
  });
};

export const setActiveDialog = id => ({
  type: SET_ACTIVE_DIALOG,
  payload: { id }
});

export const addMessage = text => (dispatch, getState) => {
  const { currentUser, activeDialog } = getState();
  const date = new Date().toISOString();
  const messageId = Date.now();

  dispatch({
    type: SUBMIT_CHANNEL_INPUT_TEXT,
    payload: {
      messageId,
      dialog: activeDialog,
      date,
      text,
      owner: currentUser.id
    }
  });

  axios
    .post(
      `/api/dialogs/submit/${
        currentUser.id
      }/${activeDialog}/${messageId}/${date}/${text}`
    )
    .catch(error => dispatch({ type: 'REJECT_MESSAGE_CREATION' }));
};
