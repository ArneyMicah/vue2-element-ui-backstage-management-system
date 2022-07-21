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
        url: `/users/${data.id}/?role=${data.rid}`,
        method: 'PUT',
        data
    })
}export function getUserRole(data) {
    return api({
        url: `/roles`,
        method: 'GET',
        data
    })
}
