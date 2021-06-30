import request from '@/utils/request'

export function listRoleNames(data) {
  return request({
    url: '/system/role/listRoleNames',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/system/user/add',
    method: 'post',
    data
  })
}

export function list(data) {
  return request({
    url: '/system/user/list',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/system/user/edit',
    method: 'post',
    data
  })
}

export function resetPwd(data) {
  return request({
    url: '/system/user/resetPwd',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/system/user/remove',
    method: 'post',
    data
  })
}

export function listAll(data) {
  return request({
    url: '/system/dept/listAll',
    method: 'post',
    data
  })
}

// 搜索部门
export function selectDeptList(data) {
  return request({
    url: '/system/dept/selectList',
    method: 'post',
    data
  })
}

// 搜索用户
export function selectUserList(data) {
  return request({
    url: '/system/user/selectList',
    method: 'post',
    data
  })
}
