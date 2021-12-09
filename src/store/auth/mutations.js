export const setToken = (state, token) => {
  state.token = token;
  state.isAuthenticated = true;
  window.localStorage.setItem('token', JSON.stringify(token));
};

// eslint-disable-next-line no-unused-vars
export const removeToken = (state, token) => {
  state.token = '';
  state.isAuthenticated = false;
};

//  export function SET_USER(state, payload) {
//   state.user = payload;
//   saveItem('user', payload);
// }

// export const setMe = (state, authDetails) => {
//   state.authDetails = authDetails;
// };

/**
 * set authenticated user
 * @param {Object} state
 * @param {Object} payload
 */
export function SET_AUTH_USER(state, payload) {
  state.authDetails = payload;
}

export function SIGN_IN(state, payload = true) {
  state.isAuthenticated = payload;
  localStorage.setItem('isAuthenticated', payload);
}

export function SET_USER_TOKEN(state, payload) {
  state.userToken = payload;
  saveItem('userToken', payload);
}
