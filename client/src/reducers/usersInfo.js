export const usersInfo = (state = [], { type, payload }) => {
  if (type === 'SET_USERS_INFO') {
    return [...state, ...payload.users];
  }
  return state;
};
