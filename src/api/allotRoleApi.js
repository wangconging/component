import request from '@/utils/request'

export function allocatedList(data) {
  return request({
    url: '/system/role/authUser/allocatedList',
    method: 'post',
    data
  })
}

export function unallocatedList(data) {
  return request({
    url: '/system/role/authUser/unallocatedList',
    method: 'post',
    data
  })
}

export function selectAll(data) {
  return request({
    url: '/system/role/authUser/selectAll',
    method: 'post',
    data
  })
}

export function cancelAll(data) {
  return request({
    url: '/system/role/authUser/cancelAll',
    method: 'post',
    data
  })
}
