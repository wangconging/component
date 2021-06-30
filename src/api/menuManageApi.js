import request from '@/utils/request'

export function listAll(data) {
  return request({
    url: '/system/menu/listAll',
    method: 'post',
    data
  })
}

export function addMenu(data) {
  return request({
    url: '/system/menu/add',
    method: 'post',
    data
  })
}

export function editMenu(data) {
  return request({
    url: '/system/menu/edit',
    method: 'post',
    data
  })
}

export function remove(query) {
  return request({
    url: '/system/menu/remove/' + query,
    method: 'get'
  })
}

export function selectAllAppMenu(data) {
  return request({
    url: '/system/menu/selectRoleMAndBList',
    method: 'post',
    data
  })
}

export function checkMenuUrl(data) {
  return request({
    url: '/system/menu/checkMenuUrl',
    method: 'post',
    data
  })
}

