import request from '@/utils/request'
export function getRoles(data) {
  return request({
    url: '/systemManage/getRoles',
    method: 'get',
    params: data
  })
}

export function saveRole(role) {
  console.log(role)
  return request({
    url: '/systemManage/saveRole',
    method: 'post',
    data: role
  })
}

export function deleteRole(id) {
  return request({
    url: '/systemManage/deleteRole',
    method: 'get',
    params: { id }
  })
}

export function getRoleById(id) {
  return request({
    url: '/systemManage/getRoleById',
    method: 'get',
    params: { id }
  })
}
