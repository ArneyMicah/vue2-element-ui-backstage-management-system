import api from './axios'
export function getLoginInfo(data) {
    return api({
        url: '/login',
        method: 'POST',
        data
    })
}
export function getMenus() {
    return api({
        url: '/menus',
        method: 'GET',
    })
}
export function getUserList(data) {
    return api({
        url: '/users',
        method: 'GET',
        params: data
    })
}
export function deleteUserInfo(data) {
    return api({
        url: `/users/${data.id}`,
        method: 'DELETE',
        data
    })
}
export function getChangeStatu(data) {
    return api({
        url: `/users/${data.id}/state/${data.type}`,
        method: 'PUT',
        data
    })
}
export function addUserList(data) {
    return api({
        url: '/users',
        method: 'POST',
        data
    })
}
export function compileUser(data) {
    return api({
        url: `/users/${data.id}`,
        method: 'PUT',
        data
    })
}
export function assigningUserRole(data) {
    return api({
        url: `/users/${data.id}/role`,
        method: 'PUT',
        data
    })
}
export function getUserRole(data) {
    return api({
        url: `/roles`,
        method: 'GET',
        data
    })
}
export function deleteUserRole(data) {
    return api({
        url: `/roles/${data.id}`,
        method: 'DELETE',
        data
    })
}
export function addUserRoleList(data) {
    return api({
        url: '/roles',
        method: 'POST',
        data,
    })
}
export function editorRoleList(data) {
    return api({
        url: `/roles/${data.id}`,
        method: 'PUT',
        data,
    })
}
export function treeRoleList(data) {
    return api({
        url: '/rights/tree',
        method: 'GET',
        data,
    })
}
export function treeUserList(data) {
    return api({
        url: `/roles/${data.id}/rights`,
        method: 'POST',
        data,
    })
}
export function RightsList(data) {
    return api({
        url: '/rights/list',
        method: 'GET',
        data,
    })
}
export function getGoodsList(data) {
    return api({
        url: '/goods',
        method: 'GET',
        params: data,
    })
}
export function addGoodsList(data) {
    return api({
        url: '/goods',
        method: 'POST',
        data,
    })
}
export function getaCtegories(data) {
    return api({
        url: '/categories',
        method: 'GET',
        data,
    })
}
export function getReports(data) {
    return api({
        url: '/reports/type/1',
        method: 'GET',
        data,
    })
}
// 订单数据列表
export function getOrderList(data) {
    return api({
        url: '/orders',
        method: 'GET',
        params: data,
    })
}
// 查看物流信息
export function getLogistics(data) {
    return api({
        url: `/kuaidi/${data.id}`,
        method: 'GET',
        params: data,
    })
}
// 删除角色指定权限
export function deleteRoleRight(data) {
    return api({
        url: `/roles/${data.id}/rights/${data.rightId}`,
        method: 'DELETE',
        data,
    })
}