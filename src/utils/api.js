import api from './axios'
// 登录页面接口
export function getLoginInfo(data) {
    return api({
        url: '/login',
        method: 'POST',
        data
    })
}
// 左侧菜单接口
export function getMenuInfo(data) {
    return api({
        url: '/menus',
        method: 'GET',
        data
    })
}
// 用户数据列表
export function getUserList(data) {
    return api({
        url: '/users',
        method: 'GET',
        params: data,
    })
}
// 添加用户
export function addUser(data) {
    return api({
        url: '/users',
        method: 'POST',
        data
    })
}
// 修改用户状态
export function changeUserStatus(data) {
    return api({
        url: `users/${data.id}/state/${data.type}`,
        method: 'PUT',
        data
    })
}
// 编辑用户提交
export function editUser(data) {
    return api({
        url: `users/${data.id}`,
        method: 'PUT',
        data
    })
}
// 删除单个用户
export function deleteUser(data) {
    return api({
        url: `users/${data.id}`,
        method: 'DELETE',
        data
    })
}
// 分配用户角色
export function setUserRole(data) {
    return api({
        url: `users/${data.id}/role`,
        method: 'PUT',
        data
    })
}
// 所有角色列表
export function getRoles(data) {
    return api({
        url: '/roles',
        method: 'GET',
        params: data,
    })
}
// 添加角色
export function addRole(data) {
    return api({
        url: '/roles',
        method: 'POST',
        data
    })
}
// 编辑提交角色
export function editRole(data) {
    return api({
        url: `roles/${data.id}`,
        method: 'PUT',
        data
    })
}
// 删除单个角色
export function deleteRole(data) {
    return api({
        url: `roles/${data.id}`,
        method: 'DELETE',
        data
    })
}
// 权限列表
export function getPermissions(data) {
    return api({
        url: '/rights/list',
        method: 'GET',
        params: data,
    })
}
// 树形权限
export function getPermissionTree(data) {
    return api({
        url: '/rights/tree',
        method: 'GET',
        params: data,
    })
}
// 角色授权
export function setRoleAuth(data) {
    return api({
        url: `roles/${data.id}/rights`,
        method: 'POST',
        data
    })
}
// 删除角色指定权限
export function deleteRoleAuth(data) {
    return api({
        url: `roles/${data.id}/rights/${data.rightId}`,
        method: 'DELETE',
        data
    })
}
// 商品列表数据
export function getProductList(data) {
    return api({
        url: '/goods',
        method: 'GET',
        params: data,
    })
}
// 删除商品
export function deleteProduct(data) {
    return api({
        url: `goods/${data.id}`,
        method: 'DELETE',
        data
    })
}
// 商品分类数据列表
export function getProductCategoryList(data) {
    return api({
        url: '/categories',
        method: 'GET',
        params: data,
    })
}
// 添加商品
export function addProduct(data) {
    return api({
        url: '/goods',
        method: 'POST',
        data
    })
}
// 商品参数列表
export function getProductParamsList(data) {
    return api({
        url: `categories/${data.id}/attributes`,
        method: 'GET',
        params: data,
    })
}
// 添加动态参数或者静态属性
export function addProductParams(data) {
    return api({
        url: `categories/${data.id}/attributes`,
        method: 'POST',
        data
    })
}
// 编辑提交参数 
export function editProductParams(data) {
    return api({
        url: `categories/${data.id}/attributes/${data.attrId}`,
        method: 'PUT',
        data
    })
}
// 删除参数
export function deleteProductParams(data) {
    return api({
        url: `categories/${data.id}/attributes/${data.attrId}`,
        method: 'DELETE',
        data
    })
}
// 添加分类
export function addProductCategory(data) {
    return api({
        url: '/categories',
        method: 'POST',
        data
    })
}
// 编辑提交分类
export function editProductCategory(data) {
    return api({
        url: `categories/${data.id}`,
        method: 'PUT',
        data
    })
}
// 删除分类
export function deleteProductCategory(data) {
    return api({
        url: `categories/${data.id}`,
        method: 'DELETE',
        data
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
// 时间统计的折线图
export function getOrderCount(data) {
    return api({
        url: 'reports/type/1',
        method: 'GET',
        params: data,
    })
}