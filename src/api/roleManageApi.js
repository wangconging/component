import request from '@/utils/request'

export function listAllMAndB(data) {
  return request({
    url: '/system/menu/listAllMAndB',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/system/role/add',
    method: 'post',
    data
  })
}

export function roleList(data) {
  return request({
    url: '/system/role/list',
    method: 'post',
    data
  })
}

export function removeRole(data) {
  return request({
    url: '/system/role/remove',
    method: 'post',
    data
  })
}

export function selectRole(data) {
  return request({
    url: '/system/role/select',
    method: 'post',
    data
  })
}

export function editRole(data) {
  return request({
    url: '/system/role/edit',
    method: 'post',
    data
  })
}

export function selectRoleMAndBList(data) {
  return request({
    url: '/system/menu/selectRoleMAndBList',
    method: 'post',
    data
  })
}

export function selectMenuByRoleId(data) {
  return request({
    url: '/system/menu/selectMenuByRoleId',
    method: 'post',
    data
  })
}
