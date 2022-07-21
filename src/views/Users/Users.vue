<style lang="scss" scoped>
    .users {
        padding: 10px;
        box-sizing: border-box;

        .content {
            background-color: #fff;
            height: 100%;
            max-height: calc(100vh - 100px);
            max-width: calc(100vw - 200px);
            box-shadow: 0 0 3px #666;
            border-radius: 10px;
            padding-bottom: 0;
            margin-top: 10px;
            padding: 10px;
            box-sizing: border-box;

            .search-button {
                display: flex;
                align-items: center;

                .input-with-select {
                    width: 400px;
                }
            }

            .el-table-list {
                padding: 10px;
                width: 100%;
                box-sizing: border-box;
            }
        }
    }
</style>
<template>
    <div class="users">
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <div class="search-button">
                <el-input placeholder="请输入内容" v-model="search" @input="searchUser" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                </el-input>
                <el-button type="primary" @click="addUserInfo = true">添加用户</el-button>
            </div>
            <div class="el-table-list">
                <el-table :data="tableData" border style="width: 100%" height="600">
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
                            <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row.id, scope.row.mg_state)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="200px">
                        <template slot-scope="scope">
                            <el-button @click="compileUser(scope.row, scope.row.id)" type="primary" size="small" icon="el-icon-edit"></el-button>
                            <el-button @click="deleteClick(scope.row.id)" type="danger" size="small" icon="el-icon-delete"></el-button>
                            <el-button @click="assigningUser(scope.row, scope.row.id, scope.$index)" type="warning" size="small" icon="el-icon-setting"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
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
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addUserList">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
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
            <div class="assigning">
                <el-dialog title="分配角色" :visible.sync="assigningUserInfo" width="40%">
                    <el-form label-position="left" label-width="85px" class="demo-ruleForm">
                        <el-form-item label="当前用户">
                            <span>{{beforeusername}}</span>
                        </el-form-item>
                        <el-form-item label="当前角色">
                            <span>{{beforerole}}</span>
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
        </div>
    </div>
</template>
<script>
    import { getUserList, addUserList, getChangeStatu, deleteUserInfo, compileUser, assigningUserRole, getUserRole } from '../../utils/api.js'
    export default {
        data() {
            return {
                selectRole: '',
                options: [],
                RoleId: '',
                assigning: '',
                index: '',
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
                    pagesize: 10,
                },
                beforeusername: '',
                beforerole: '',
                ruleForm: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的电话', trigger: 'blur' },
                    ],
                },
            }
        },
        methods: {
            render() {
                getUserList(this.page).then(res => {
                    console.log(res);
                    this.tableData = res.data.users
                    this.total = res.data.total
                })
            },
            changeState(id, type) {
                let data = { id: id, type: type }
                getChangeStatu(data).then(res => {
                    console.log(res);
                })
            },
            async addUserList() {
                const res = await addUserList(this.ruleForm)
                console.log(res);
                this.render()
                for (let i in this.ruleForm) {
                    this.ruleForm[i] = ''
                }
                this.addUserInfo = false
            },
            searchUser() {
                let timer = setTimeout(() => {
                    this.page.query = this.search
                    this.render()
                }, 500)
            },
            deleteClick(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = { id: id }
                    console.log(data);
                    deleteUserInfo(data).then(res => {
                        console.log(res);
                        this.render()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            sizeChange(val) {
                console.log(val);
                this.page.pagesize = val
                this.render()
            },
            currentChange(val) {
                console.log(val);
                this.page.pagenum = val
                this.render()
            },
            compileUser(item) {
                console.log(item);
                this.ruleForm.username = item.username
                this.ruleForm.email = item.email
                this.ruleForm.mobile = item.mobile
                this.compileUserInfo = true
                this.compileId = item.id
            },
            compileUserList() {
                let data = { id: this.compileId, username: this.ruleForm.username, email: this.ruleForm.email, mobile: this.ruleForm.mobile }
                compileUser(data).then(res => {
                    this.render()
                    this.compileUserInfo = false
                })
            },
            assigningUser(item, id, index) {
                this.beforeusername = item.username
                this.beforerole = item.role_name
                this.assigning = id
                this.index = index
                this.assigningUserInfo = true
                getUserRole().then(res => {
                    this.options = res.data
                })
            },
            assigningRole() {
                let data = { id: this.assigning, rid: this.RoleId, email: this.tableData[this.index].email, mobile: this.tableData[this.index].mobile }
                assigningUserRole(data)
                this.assigningUserInfo = false
            },
            selectChange(val) {
                this.RoleId = val
            }
        },
        created() {
            this.render()
        }
    }
</script>