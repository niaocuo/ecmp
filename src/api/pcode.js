import request from '@/utils/request'
export function getCodeByCodeSortId(codeSortId) {
  return request({
    url: '/code/getCodeByCodeSortId',
    method: 'get',
    params: { codeSortId }
  })
}
