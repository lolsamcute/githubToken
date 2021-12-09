export default function () {
  return {
    authDetails: {},
        // Authentication status
    isAuthenticated: localStorage.getItem('isAuthenticated') || false,
    user: null,
    token: null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  };
}
