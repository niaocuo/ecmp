import request from '@/utils/request'

export function getSelectUsers() {
  return request({
    url: '/systemManage/getSelectUsers',
    method: 'get'
  })
}

export function getRsubdistrictLaber(subdistrictId) {
  return request({
    url: '/common/getRsubdistrictLaber',
    method: 'get',
    params: { subdistrictId }
  })
}

export function getRstationLaber(subdistrictId) {
  return request({
    url: '/common/getRstationLaber',
    method: 'get',
    params: { subdistrictId }
  })
}

export function getRtransformerLaber(stationId) {
  return request({
    url: '/common/getRtransformerLaber',
    method: 'get',
    params: { stationId }
  })
}

export function getRmeteruseinfoLaber(stationId) {
  return request({
    url: '/common/getRmeteruseinfoLaber',
    method: 'get',
    params: { stationId }
  })
}

