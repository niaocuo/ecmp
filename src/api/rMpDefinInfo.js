import request from '@/utils/request'
export function getRMpDefinInfos(rmeteruseinfo) {
  return request({
    url: '/rMpDefinInfo/getRMpDefinInfos',
    method: 'get',
    params: rmeteruseinfo
  })
}
