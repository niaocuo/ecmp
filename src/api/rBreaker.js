import request from '@/utils/request'
export function getRBreakerByBreakerId(breakerId) {
  return request({
    url: '/rBreaker/getRBreakerByBreakerId',
    method: 'get',
    params: { breakerId }
  })
}
