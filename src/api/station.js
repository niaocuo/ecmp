import request from '@/utils/request'
export function getStationTree(subdistrictId) {
  return request({
    url: '/station/getStationTree',
    method: 'get',
    params: { subdistrictId }
  })
}

export function getAreaToEquipmentTree() {
  return request({
    url: '/station/getAreaToEquipmentTree',
    method: 'get'
  })
}
