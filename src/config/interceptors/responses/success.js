import Notify from '../../notify';

/**
 * this module intercepts all 2xx responses
 * before delegating to .then(...)
 *
 * @export
 * @param {AxiosResponse} response
 * @returns
 */
export default function (success) {
  let msg = '';
  if (success.response) {
    const { data } = success.response;
    if (data.message) {
      msg = data.message;
    }
    Notify.success(msg);
  }
  return Promise.resolve(success);
}
