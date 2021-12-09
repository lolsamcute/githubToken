import Notify from 'src/helpers/notify.js';

const errorHandler = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response;
  } if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    Notify.error('Please check your network and try again');
  }
  // Something happened in setting up the request that triggered an Error
  return error.message;
};
// if (!err.response) {
//   // network error
//   Notify.error('Please check your network and try again');
//   this.errorStatus = 'Please check your network and try again';
// }

export default errorHandler;
