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