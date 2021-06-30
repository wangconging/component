import request from '@/utils/request'

// 搜索用户
export function selectList(data) {
  return request({
    url: '/appVersion/selectList',
    method: 'post',
    data
  })
}
