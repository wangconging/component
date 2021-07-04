import request from '@/utils/request'

export function login(query) {
  return request({
    url: '/user/login',
    method: 'get',
    params: query
  })
}
export function getUserInfo(query) {
  return request({
    url: '/getUserInfo',
    method: 'get',
    params: query
  })
}