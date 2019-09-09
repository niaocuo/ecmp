import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/systemManage/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/systemManage/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/systemManage/logout',
    method: 'post'
  })
}
export function getUsers() {
  return request({
    url: '/systemManage/getUsers',
    method: 'get'
  })
}

export function getRoles(id) {
  if (!id) {
    id = -1
  }
  return request({
    url: `/systemManage/getUserById?id=${id}`,
    method: 'get'
  })
}

export function deleteAndupdateRole(data) {
  return request({
    url: '/systemManage/saveUser',
    method: 'post',
    data
  })
}
