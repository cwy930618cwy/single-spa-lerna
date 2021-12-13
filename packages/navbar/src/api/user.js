import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: '/login/post',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-element-admin/user/info',
    url: '/info/get',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    // url: '/vue-element-admin/user/logout',
    url: '/logout/post',
    method: 'post'
  })
}
