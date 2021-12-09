import Notify from '../../notify';

/**
 * This module intercepts every 4xx responses
 * before delegating to the .catch(...)
 *
 * @export
 * @param {AxiosResponse} response
 * @returns
 */
export default function (error) {
  let msg = '';
  if (error.response) {
    const { status, data } = error.response;

    if (status === 400) {
      if (data.phone) {
        msg = data.phone.message;
      }
      if (data.message) {
        msg = data.message;
      } else {
        msg = data;
        window.history.back();
      }
      Notify.error(msg);
    }
    if (status === 500) {
      Notify.error('Request failed.');
      window.history.back();
    }
    if (status === 422) {
      // TODO: handle 422
      // Notify.error();
    }
  }
  return Promise.reject(error);
}
