import request from '@/utils/request'
export function getRsubdistricts(rsubdistrict) {
  return request({
    url: '/rsubdistrict/getRsubdistricts',
    method: 'get',
    params: rsubdistrict
  })
}
export function saveRsubdistrict(rsubdistrict) {
  return request({
    url: '/rsubdistrict/saveRsubdistrict',
    method: 'post',
    data: rsubdistrict
  })
}

export function getRsubdistrictById(subdistrictId) {
  return request({
    url: '/rsubdistrict/getRsubdistrictById',
    method: 'get',
    params: { subdistrictId }
  })
}
