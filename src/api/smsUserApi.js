import request from '@/utils/request'

export function selectSmsList(data) {
  return request({
    url: '/sys/smsInfo/selectSmsList',
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: '/sys/smsInfo/updateStatus',
    method: 'post',
    data
  })
}
