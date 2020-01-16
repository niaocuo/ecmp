import request from '@/utils/request'

export function getRAlarmInfo(rAlarmInfo) {
  return request({
    url: '/rAlarmInfo/getRAlarmInfo',
    method: 'post',
    data: rAlarmInfo
  })
}
