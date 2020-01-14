import request from '@/utils/request'
export function getAreaByAreaId(areaId) {
  return request({
    url: '/area/getAreaByAreaId',
    method: 'get',
    params: { areaId }
  })

}
