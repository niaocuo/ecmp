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

export function getUsers(user) {
  return request({
    url: '/systemManage/getUsers',
    method: 'get',
    params: user
  })
}
export function removeUser(id) {
  return request({
    url: '/systemManage/removeUser',
    method: 'get',
    params: { id }
  })
}

export function getUserById(id) {
  if (!id) {
    id = -1
  }
  return request({
    url: `/systemManage/getUserById?id=${id}`,
    method: 'get'
  })
}

export function getRoleIds() {
  return request({
    url: `/systemManage/getRoleIds`,
    method: 'get'
  })
}

export function saveUser(user) {
  return request({
    url: `/systemManage/saveUser`,
    method: 'post',
    data: user
  })
}
