import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/monitor/logininfor/list',
    method: 'post',
    data
  })
}

export function clean(data) {
  return request({
    url: '/monitor/logininfor/clean',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/monitor/logininfor/remove',
    method: 'post',
    data
  })
}
