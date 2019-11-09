import request from '@/utils/request'
export function getTransformerByTrId(trId) {
  return request({
    url: '/transformer/getTransformerByTrId',
    method: 'get',
    params: { trId }
  })
}
