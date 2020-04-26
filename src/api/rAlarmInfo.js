import request from '@/utils/request'

export function getRAlarmInfo(rAlarmInfo) {
  return request({
    url: '/rAlarmInfo/getRAlarmInfo',
    method: 'post',
    data: rAlarmInfo
  })
}
export function getAllRAlarmInfo() {
  return request({
    url: '/rAlarmInfo/getAllRAlarmInfo',
    method: 'get'
  })
}
