import request from '@/utils/request'

export function login(query) {
  return request({
    url: '/user/login',
    method: 'get',
    params: query
  })
}

export function getMenuList(data) {
  return request({
    url: '/system/menu/list',
    method: 'post',
    data
  })
}
