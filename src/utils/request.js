import fetch from 'dva/fetch'
import { message } from 'antd'

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  let httpStatus = 0
  function checkStatus(response) {
    httpStatus = response.status
    if (response.status >= 200 && response.status < 501) {
      if (response.status === 401 && window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
      return response
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
  function parseJSON(response) {
    return response.json()
  }
  function finalHandler(data = {}) {
    if (httpStatus !== 200) {
      const msg = data.detail
      window.app._store.dispatch({
        type: 'responseCode/setCodeValue',
        code: data.code || 0,
      })
      if (data.code) {
        message.destroy()
        message.error(msg)
      }
    }
    data.httpStatus = httpStatus
    return { data }
  }
  function handleError(err) {
    if (err && err.toString() === 'TypeError: Failed to fetch' && window.JSGetVersion) {
      window.location.reload()
    }
    const errorRes = {
      httpStatus: 9999,
      data: {},
      code: 9999,
      detail: '网络通讯异常， 请稍后重试',
      error: 'unknown_error',
      exception: err,
    }
    message.destroy()
    message.error('网络通讯异常， 请稍后重试')
    return errorRes
  }
  const opts = { credentials: 'include', ...options }
  const { method = 'get' } = options
  if (method.toUpperCase() !== 'GET') {
    window.app._store.dispatch({
      type: 'responseCode/setCodeValue',
      code: 0,
    })
  }
  return fetch(url, opts)
    .then(checkStatus)
    .then(parseJSON)
    .then(finalHandler)
    .catch(handleError)
}
