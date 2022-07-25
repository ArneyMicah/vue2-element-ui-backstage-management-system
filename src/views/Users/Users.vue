<style lang="scss" scoped>
    .users {
        padding: 15px;
        height: calc(100vh - 90px);
        overflow-y: auto;

        .table-content {
            padding: 10px;
            opacity: 0.8;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.483);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-top: 10px;
            border-radius: 10px;
            box-shadow: 0 0 5px #000;
        }

        .search-button {
            display: flex;
            align-items: center;
            padding-top: 10px;

            .input-with-select {
                width: 400px;
            }
        }

        .el-table-list {
            margin: 15px 0;
            box-sizing: border-box;
        }
    }
</style>
<template>
    <div class="users">
        <!-- 面包屑 -->
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 面包屑 -->
        <div class="table-content">
            <!-- 输入搜索框 -->
            <div class="search-button">
                <el-input placeholder="请输入内容" v-model="search" @input="searchUser" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                </el-input>
                <el-button type="primary" @click="addUserInfo = true">添加用户</el-button>
            </div>
            <!-- 输入搜索框 -->
            <!-- 页面表格功能 -->
            <div class="el-table-list">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column type="index" width="50" label="#">
                    </el-table-column>
                    <el-table-column prop="username" label="姓名">
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱">
                    </el-table-column>
                    <el-table-column prop="mobile" label="电话">
                    </el-table-column>
                    <el-table-column prop="role_name" label="角色">
                    </el-table-column>
                    <el-table-column prop="mg_state" label="状态">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row.id,scope.row.mg_state)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="250px" align="center">
                        <template slot-scope="scope">
                            <el-button @click="compileUser(scope.row, scope.row.id)" type="primary" size="small" icon="el-icon-edit"></el-button>
                            <el-button @click="deleteClick(scope.row.id)" type="danger" size="small" icon="el-icon-delete"></el-button>
                            <el-button @click="assigningUser(scope.row)" type="warning" size="small" icon="el-icon-setting"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 页面表格功能 -->
            <!-- 分页功能 -->
            <div class="pagination">
                <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
            <!-- 分页功能 -->
        </div>
        <!-- 添加用户弹出框 -->
        <div class="adduser">
            <el-dialog title="添加用户" :visible.sync="addUserInfo" width="40%">
                <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="55px" class="demo-ruleForm" :hide-required-asterisk="hideRequired">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                        <el-input v-model="ruleForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addUserInfo = false">取 消</el-button>
                    <el-button type="primary" @click="addUserList('ruleForm')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 添加用户弹出框 -->
        <!-- 编辑用户弹出框 -->
        <div class="compile">
            <el-dialog title="编辑用户" :visible.sync="compileUserInfo" width="40%">
                <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="55px" class="demo-ruleForm" :hide-required-asterisk="hideRequired">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                        <el-input v-model="ruleForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="compileUserInfo = false">取 消</el-button>
                    <el-button type="primary" @click="compileUserList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 编辑用户弹出框 -->
        <!-- 分配角色弹出框 -->
        <div class="assigning">
            <el-dialog title="分配角色" :visible.sync="assigningUserInfo" width="40%">
                <el-form label-position="left" label-width="85px" class="demo-ruleForm">
                    <el-form-item label="当前用户">
                        <span>{{ deal.beforeusername }}</span>
                    </el-form-item>
                    <el-form-item label="当前角色">
                        <span>{{ deal.beforerole }}</span>
                    </el-form-item>
                    <el-form-item label="分配新角色">
                        <el-select v-model="selectRole" @change="selectChange" placeholder="请选择">
                            <el-option v-for="(item, i) in options" :key="item.i" :label="item.roleName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="assigningUserInfo = false">取 消</el-button>
                    <el-button type="primary" @click="assigningRole">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 分配角色弹出框 -->
    </div>
</template>
<script>
    import {
        getUserList,
        addUserList,
        getChangeStatu,
        deleteUserInfo,
        compileUser,
        assigningUserRole,
        getUserRole
    } from '../../utils/api.js'
    export default {
        data() {
            // 用户名正则验证
            let validateUsername = (rule, value, callback) => {
                let userReg = /^[a-zA-Z0-9_]{4,16}$/
                if (!userReg.test(value)) {
                    callback(new Error('请输入用户名'))
                } else {
                    callback(new Error('用户名验证错误'))
                }
            }
            // 密码正则验证
            let validatePassword = (rule, value, callback) => {
                let passReg = /^[a-zA-Z0-9_]{6,16}$/
                if (!passReg.test(value)) {
                    callback(new Error('请输入密码'))
                } else {
                    callback()
                }
            }
            // 邮箱正则验证
            let validateEemail = (rule, value, callback) => {
                let emailReg =
                    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
                if (!emailReg.test(value)) {
                    callback(new Error('请输入邮箱'))
                } else {
                    callback()
                }
            }
            // 电话正则验证
            let validateMobile = (rule, value, callback) => {
                let mobileReg = /^1[3456789]\d{9}$/
                if (!mobileReg.test(value)) {
                    callback(new Error('请输入电话'))
                } else {
                    callback()
                }
            }
            return {
                selectRole: '',
                options: [],
                RoleId: '',
                hideRequired: true,
                addUserInfo: false,
                compileUserInfo: false,
                assigningUserInfo: false,
                compileId: '',
                search: '',
                tableData: [],
                total: 0,
                page: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10
                },
                // 分配角色变量
                deal: {
                    beforeusername: '',
                    beforerole: '',
                    id: '',
                    email: '',
                    mobile: ''
                },
                // 表单内容
                ruleForm: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''
                },
                // 正则验证弹出框
                rules: {
                    username: [{ validator: validateUsername, trigger: 'blur' }],
                    password: [{ validator: validatePassword, trigger: 'blur' }],
                    email: [{ validator: validateEemail, trigger: 'blur' }],
                    mobile: [{ validator: validateMobile, trigger: 'blur' }]
                }
            }
        },
        methods: {
            // 调取渲染用户列表
            async render() {
                let res = await getUserList(this.page)
                console.log(res)
                this.tableData = res.data.users
                this.total = res.data.total
            },
            // 改变status的状态
            async changeState(id, type) {
                let data = { id: id, type: type }
                await getChangeStatu(data)
            },
            // 添加用户信息列表
            addUserList(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            username: this.ruleForm.username,
                            password: this.ruleForm.password,
                            email: this.ruleForm.email,
                            mobile: this.ruleForm.mobile
                        }
                        addUserList(data).then((res) => {
                            console.log(res)
                            this.addUserInfo = false
                            this.render()
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
                // if (this.ruleForm.username == '') {
                //     this.$message.error('请输入用户名');
                //     return;
                // }
                // await addUserList(this.ruleForm)
                // this.render()
                // for (let i in this.ruleForm) {
                //     this.ruleForm[i] = ''
                // }
                // this.addUserInfo = false
            },
            // 搜索框搜索用户功能
            searchUser() {
                setTimeout(() => {
                    this.page.query = this.search
                    this.render()
                }, 500)
            },
            // 删除单个用户功能
            deleteClick(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        let data = { id: id }
                        console.log(data)
                        deleteUserInfo(data).then((res) => {
                            console.log(res)
                            this.render()
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            },
            // 分页功能
            sizeChange(val) {
                console.log(val)
                this.page.pagesize = val
                this.render()
            },
            // 分页功能
            currentChange(val) {
                console.log(val)
                this.page.pagenum = val
                this.render()
            },
            // 点击编辑显示弹出框数据回填
            compileUser(item) {
                this.compileId = item.id
                this.ruleForm = item
                this.compileUserInfo = true
            },
            // 点击确定实现数据编辑
            compileUserList() {
                let data = {
                    id: this.compileId,
                    username: this.ruleForm.username,
                    email: this.ruleForm.email,
                    mobile: this.ruleForm.mobile
                }
                compileUser(data).then((res) => {
                    this.render()
                    this.compileUserInfo = false
                })
            },
            // 点击设置显示弹出并显示分配角色
            assigningUser(item) {
                const { username, role_name, id, email, mobile } = item
                this.deal = {
                    beforeusername: username,
                    beforerole: role_name,
                    id: id,
                    email: email,
                    mobile: mobile
                }
                this.assigningUserInfo = true
                getUserRole().then((res) => {
                    this.options = res.data
                })
            },
            // 点击确定实现角色修改
            assigningRole() {
                let data = {
                    id: this.deal.id,
                    rid: this.RoleId,
                    email: this.deal.email,
                    mobile: this.deal.mobile
                }
                console.log(data)
                assigningUserRole(data).then((res) => {
                    console.log(res)
                    this.render()
                    this.assigningUserInfo = false
                })
            },
            // 切换角色查找对应id
            selectChange(val) {
                this.RoleId = val
            }
        },
        created() {
            this.render()
        }
    }
</script>