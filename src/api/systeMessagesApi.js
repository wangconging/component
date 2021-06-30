import request from '@/utils/request'

// 新增
export function selectSysSms(data) {
  return request({
    url: '/sys/sms/selectSysSms',
    method: 'post',
    data
  })
}
