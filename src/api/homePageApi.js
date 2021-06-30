import request from '@/utils/request'

export function getMenuList(data) {
  return request({
    url: '/system/menu/list',
    method: 'post',
    data
  })
}
