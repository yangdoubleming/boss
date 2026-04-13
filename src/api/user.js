
import request from '../utils/request.js';
var qs = require('qs')
export function userList(userName,roleId,current) {
  return request({
    url: `/sysuser/user/page?userName=${userName}&roleIdList=${roleId}&current=${current}&size=10`,
    method: 'get',
  })
}
export function roleList(current) {
  return request({
    url: `/sysuser/role/page?size=10&current=${current}`,
    method: 'get',
    
  })
}

export function addRole(data) {
  return request({
    url: `/sysuser/role/save`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
export function addPermission(data) {
  return request({
    url: `/sysuser/permission/save`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
export function getMenu() {
  return request({
    url: `/sysuser/permission/get/all`,
    method: 'get',
  })
}
export function permissionList(roleId) {
  return request({
    url: `/sysuser/permission/list?roleId=${roleId}`,
    method: 'get',
    
  })
}
export function permissionAllocat(data) { //给角色分派权限
  return request({
    url: `/sysuser/permission/allocat`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
export function roleAllocat(data) { //给用户分派角色
  return request({
    url: `/sysuser/role/allocat`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
export function permissionSave(data) { //新增权限
  return request({
    url: `/sysuser/permission/save`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
export function permissionDelete(data) { //删除权限
  return request({
    url: `/sysuser/permission/delete`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

export function update(data) { //修改权限
  return request({
    url: `/sysuser/permission/update`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

export function addUser(data) { //新增用户
  return request({
    url: `/sysuser/user/save`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
export function updateUser(data) { //修改密码
  return request({
    url: `/sysuser/user/update/pwd`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

export function roleAll(){
  return request({
    url:'/sysuser/role/all',
    method: 'get',
  })
}