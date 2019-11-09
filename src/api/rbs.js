import request from '@/utils/request'
export function getRbsByBsId(bsId) {
  return request({
    url: '/rbs/getRbsByBsId',
    method: 'get',
    params: { bsId }
  })
}
