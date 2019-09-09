import request from '@/utils/request'

export function saveMenu(data) {
  return request({
    url: '/systemManage/saveMenu',
    method: 'post',
    data
  })
}

export function getMenuByParentId(parentId) {
  return request({
    url: '/systemManage/getMenuByParentId',
    method: 'get',
    params: { parentId }
  })
}

export function removeMenu(id) {
  return request({
    url: '/systemManage/removeMenu',
    method: 'get',
    params: { id }
  })
}

