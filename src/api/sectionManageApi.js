import request from '@/utils/request'

export function listAll(data) {
  return request({
    url: '/system/dept/listAll',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/system/dept/add',
    method: 'post',
    data
  })
}

export function remove(query) {
  return request({
    url: '/system/dept/remove/' + query,
    method: 'get'
  })
}

export function selectList(data) {
  return request({
    url: '/system/dept/selectList',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/system/dept/edit',
    method: 'post',
    data
  })
}
