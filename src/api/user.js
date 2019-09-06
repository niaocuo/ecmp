import request from '@/utils/request'

export function login(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/systemManage/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/systemManage/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: process.env.VUE_APP_BASE_API + '/systemManage/logout',
    method: 'post'
  })
}
