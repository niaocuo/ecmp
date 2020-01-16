import request from '@/utils/request'
export function getCapacityDay(capacity) {
  return request({
    url: '/capacityDay/getCapacityDay',
    method: 'get',
    params: capacity
  })
}
