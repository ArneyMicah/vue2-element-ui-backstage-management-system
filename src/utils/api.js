import api from './axios'
// 1.登录
// 登录页面接口
export function getLoginInfo(data) {
    return api({
        url: '/login',
        method: 'POST',
        data
    })
}
// 2.用户管理
// 获取用户信息
export function getUserList(data) {
    return api({
        url: '/users',
        method: 'GET',
        params: data
    })
}
// 添加用户列表
export function addUserList(data) {
    return api({
        url: '/users',
        method: 'POST',
        data
    })
}
// 改变用户状态
export function getChangeStatu(data) {
    return api({
        url: `/users/${data.id}/state/${data.type}`,
        method: 'PUT',
        data
    })
}
// 根据 ID 查询用户信息
// 编辑用户提交
export function compileUser(data) {
    return api({
        url: `/users/${data.id}`,
        method: 'PUT',
        data
    })
}
// 删除单个用户
export function deleteUserInfo(data) {
    return api({
        url: `/users/${data.id}`,
        method: 'DELETE',
        data
    })
}
// 分配用户角色
export function assigningUserRole(data) {
    return api({
        url: `/users/${data.id}/role`,
        method: 'PUT',
        data
    })
}
// 三.权限管理
// 所有权限列表
export function RightsList(data) {
    return api({
        url: '/rights/list',
        method: 'GET',
        data,
    })
}
// 左侧菜单权限
export function getMenus() {
    return api({
        url: '/menus',
        method: 'GET',
    })
}
// 四.角色管理
// 角色列表
export function getUserRole(data) {
    return api({
        url: `/roles`,
        method: 'GET',
        data
    })
}
// 添加角色
export function addUserRoleList(data) {
    return api({
        url: '/roles',
        method: 'POST',
        data,
    })
}
// 根据 ID 查询角色
// 编辑提交角色
// 删除角色
export function deleteUserRole(data) {
    return api({
        url: `/roles/${data.id}`,
        method: 'DELETE',
        data
    })
}
// 角色授权
export function treeUserList(data) {
    return api({
        url: `/roles/${data.id}/rights`,
        method: 'POST',
        data,
    })
}
// 删除角色指定权限
export function editorRoleList(data) {
    return api({
        url: `/roles/${data.id}`,
        method: 'PUT',
        data,
    })
}
export function deleteRoleRight(data) {
    return api({
        url: `/roles/${data.id}/rights/${data.rightId}`,
        method: 'DELETE',
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
// 五.商品分类管理
// 商品分类数据列表
export function getCategories(data) {
    return api({
        url: '/categories',
        method: 'GET',
        params: data,
    })
}
// 添加分类
// 根据 id 查询分类
// 编辑提交分类
// 删除分类
// 六.分类参数管理
// 参数列表
// 添加动态参数或者静态属性
// 删除参数
// 根据 ID 查询参数
// 编辑提交参数
// 七.商品管理
// 商品列表数据
export function getGoodsList(data) {
    return api({
        url: '/goods',
        method: 'GET',
        params: data,
    })
}
// 添加商品
export function addGoodsList(data) {
    return api({
        url: '/goods',
        method: 'POST',
        data,
    })
}
// 根据 ID 查询商品
// 编辑提交商品
// 删除商品
export function deleteGoodsList(data) {
    return api({
        url: `/goods/${data.id}`,
        method: 'DELETE',
        data,
    })
}
// 八.图片上传
export function uploadImg(data) {
    return api({
        url: '/upload',
        method: 'POST',
        data,
    })
}
// 九.订单管理
// 订单数据列表
export function getOrderList(data) {
    return api({
        url: '/orders',
        method: 'GET',
        params: data,
    })
}
// 修改订单状态
// 查看订单详情
// 修改地址
// 查看物流信息
export function getLogistics(data) {
    return api({
        url: `/kuaidi/${data.id}`,
        method: 'GET',
        params: data,
    })
}
// 十.统计分析
// 基于时间统计的折线图
export function getReports(data) {
    return api({
        url: '/reports/type/1',
        method: 'GET',
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
// 订单数据列表
// 删除角色指定权限