import request from '@/utils/request'
export function getAreaByAreaId(areaId) {
  return request({
    url: '/area/getAreaByAreaId',
    method: 'get',
    params: { areaId }
  })
}

export function getAreaCascadeById(areaId) {
  return request({
    url: '/area/getAreaCascadeById',
    method: 'get',
    params: { areaId }
  })
}

