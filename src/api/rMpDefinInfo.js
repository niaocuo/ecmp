import request from '@/utils/request'
export function getRMpDefinInfos(rmeteruseinfo) {
  return request({
    url: '/rMpDefinInfo/getRMpDefinInfos',
    method: 'get',
    params: rmeteruseinfo
  })
}

export function getFiveMinuteData(data) {
  return request({
    url: '/rMpDefinInfo/getFiveMinuteData',
    method: 'get',
    params: data
  })
}
