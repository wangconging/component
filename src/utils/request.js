import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// import { cmpPos } from 'codemirror'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
// request interceptor
service.interceptors.request.use(
  config => {
    if (config.data instanceof FormData) {
      if (config.method === 'post') {
        const formObj = {}
        config.data.forEach((value, key) => {
          formObj[key] = value
        })
        const formData = new FormData()
        Object.keys(formObj).forEach((key) => {
          if (formObj[key] !== 'null') {
            formData.append(key, formObj[key])
          }
        })
        config.data = formData
      }
    }
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error1',
        type: 'error',
        duration: 10 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
