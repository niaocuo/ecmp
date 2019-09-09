import request from '@/utils/request'

export function getSelectUsers() {
  return request({
    url: '/systemManage/getSelectUsers',
    method: 'get'
  })
}
