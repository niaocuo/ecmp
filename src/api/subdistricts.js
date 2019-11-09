import request from '@/utils/request'
export function getRsubdistricts(rsubdistrict) {
  return request({
    url: '/rsubdistrict/getRsubdistricts',
    method: 'get',
    params: rsubdistrict
  })
}
