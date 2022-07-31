<style lang="scss" scoped>
    @import '../../style/style.scss';
    .users {
        padding: 15px;

        .content {
            @include content;

            .search {
                display: flex;
                align-items: center;
            }
        }
    }
</style>
<template>
    <div class="users">
        <Bread administer="用户管理" tabulation="用户列表"></Bread>
        <div class="content">
            <div class="search">
                <el-input placeholder="请输入内容" v-model="searchValue" @input="SearchContent">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
                <el-button type="primary" @click="addUser = true">添加用户</el-button>
            </div>
            <div class="el-table-list">
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="index" label="#" align="center"></el-table-column>
                    <el-table-column prop="username" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
                    <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
                    <el-table-column prop="role_name" label="角色" align="center"></el-table-column>
                    <el-table-column prop="mg_state" label="状态" align="center">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row.id, scope.row.mg_state)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="200px" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="editUserInfo(scope.row)" type="primary" icon="el-icon-edit"></el-button>
                            <el-button size="mini" @click="delUserInfo(scope.row.id)" type="danger" icon="el-icon-delete"></el-button>
                            <el-button size="mini" @click="allocateInfo(scope.row)" type="warning" icon="el-icon-setting"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="addUser">
            <el-dialog title="添加用户" :visible.sync="addUser" width="40%">
                <el-form label-position="left" :model="ruleForm" label-width="55px" :rules="rules" ref="ruleForm" :hide-required-asterisk="hiderequired">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                        <el-input v-model="ruleForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="addUserList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="compile">
            <el-dialog title="编辑用户" :visible.sync="editUser" width="40%">
                <el-form label-position="left" :model="ruleForm" label-width="55px" :rules="rules" ref="ruleForm" :hide-required-asterisk="hiderequired">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                        <el-input v-model="ruleForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editUser = false">取 消</el-button>
                    <el-button type="primary" @click="editUserList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="allocate">
            <el-dialog title="分配用户角色" :visible.sync="allocateUser" width="40%">
                <el-form label-position="left" label-width="90px">
                    <el-form-item label="当前用户">
                        {{dealForm.username}}
                    </el-form-item>
                    <el-form-item label="当前角色">
                        {{dealForm.role_name}}
                    </el-form-item>
                    <el-form-item label="分配新角色">
                        <el-select v-model="optionsId" @change="changeOption" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.roleName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="allocateUser = false">取 消</el-button>
                    <el-button type="primary" @click="allocateList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getUserList, addUser, changeUserStatus, editUser, deleteUser, getRoles, setUserRole } from '../../utils/api'
    export default {
        data() {
            return {
                hiderequired: true,
                editUser: false,
                addUser: false,
                allocateUser: false,
                searchValue: '',
                tableData: [],
                options: [],
                optionsId: '',
                usersId: '',
                total: 0,
                page: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10
                },
                dealForm: {
                    username: '',
                    role_name: '',
                },
                ruleForm: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的电话', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            async render() {
                let res = await getUserList(this.page)
                this.tableData = res.data.users
                this.total = res.data.total
            },
            addUserList() {
                this.$refs.ruleForm.validate(async valid => {
                    if (valid) {
                        await addUser(this.ruleForm)
                        for (let i in this.ruleForm) {
                            this.ruleForm[i] = ''
                        }
                        this.addUser = false
                        this.render()
                    }
                })
            },
            cancel() {
                this.addUser = false
                for (let i in this.ruleForm) {
                    this.ruleForm[i] = ''
                }
            },
            async changeState(id, type) {
                let data = {
                    id: id,
                    type: type
                }
                await changeUserStatus(data)
            },
            search() {
                this.page.query = this.searchValue
                this.render()
            },
            SearchContent() {
                if (this.searchValue == '') {
                    this.page.query = ''
                    this.render()
                }
            },
            editUserInfo(item) {
                this.ruleForm = item
                this.editUser = true
            },
            editUserList() {
                this.$refs.ruleForm.validate(async valid => {
                    if (valid) {
                        await editUser(this.ruleForm)
                        for (let i in this.ruleForm) {
                            this.ruleForm[i] = ''
                        }
                        this.editUser = false
                        this.render()
                    }
                })
            },
            delUserInfo(id) {
                this.$confirm('确定删除该用户吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let data = { id: id }
                    await deleteUser(data)
                    this.render()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            async allocateInfo(item) {
                this.dealForm = item
                this.usersId = item.id
                this.allocateUser = true
                let res = await getRoles()
                this.options = res.data
            },
            async allocateList() {
                let data = {
                    id: this.usersId,
                    rid: this.optionsId
                }
                await setUserRole(data)
                this.allocateUser = false
                this.render()
            },
            changeOption(val) {
                console.log(val);
                this.optionsId = val
            },
            handleSizeChange(value) {
                this.page.pagesize = value
                this.render()
            },
            handleCurrentChange(value) {
                this.page.pagenum = value
                this.render()
            },
        },
        created() {
            this.render()
        }
    };
</script>