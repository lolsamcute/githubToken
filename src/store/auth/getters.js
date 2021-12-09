export function getMe(state) {
  return state.authDetails;
}

export function getToken(state) {
  return state.token;
}
export function isAuthenticated(state) {
  return state.isAuthenticated;
}
export function user(state) {
  return state.user;
}
