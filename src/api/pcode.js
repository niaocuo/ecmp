import request from '@/utils/request'
export function getCodeByCodeSortId(codeSortId) {
  return request({
    url: '/code/getCodeByCodeSortId',
    method: 'get',
    params: { codeSortId }
  })
}

export function getLabesByCodeSortId(codeSortId) {
  return request({
    url: '/code/getLabesByCodeSortId',
    method: 'get',
    params: { codeSortId }
  })
}
