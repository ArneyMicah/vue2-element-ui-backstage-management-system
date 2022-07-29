<style lang="scss" scoped>
    @import '../../style/style.scss';

    .roles {
        @include index;

        .content {
            @include content;
            margin-top: 10px;

            .search-button {
                display: flex;
                align-items: center;

                .input-with-select {
                    width: 400px;
                }
            }

            .el-tags {
                display: flex;

                .first {
                    width: 20%;

                    div {
                        float: left;
                    }
                }

                .second {
                    width: 30%;

                    div {
                        float: left;
                    }
                }

                .third {
                    width: 50%;

                    div {
                        float: left;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="roles">
        <div class="bread">
            <BreadCrumb level1="权限管理" level2="角色列表"></BreadCrumb>
        </div>
        <div class="content">
            <div class="search-button">
                <el-input placeholder="请输入内容" v-model="search" @input="searchUser" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                </el-input>
                <el-button type="primary" @click="addUserRoles = true">添加角色</el-button>
            </div>
            <div class="el-table-list">
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <div class="el-tags" v-if="scope.row.children.length != 0">
                                <div class="first">
                                    <div v-for="(item, index) in scope.row.children" :key="index">
                                        <el-tag @close="firstClose(scope.row.id, item.id)" closable>{{item.authName}}</el-tag>
                                    </div>
                                </div>
                                <div class="second">
                                    <div v-for="(item, index) in scope.row.children" :key="index">
                                        <div v-for="(secondItem, index) in item.children" :key="index">
                                            <el-tag @close="secondClose(scope.row.id, secondItem.id)" closable type="success">{{secondItem.authName}}</el-tag>
                                        </div>
                                    </div>
                                </div>
                                <div class="third">
                                    <div v-for="(item, index) in scope.row.children" :key="index">
                                        <div v-for="(secondItem, index) in item.children" :key="index">
                                            <div v-for="(thirdItem, index) in secondItem.children" :key="index">
                                                <el-tag @close="thirdClose(scope.row.id, thirdItem.id)" closable type="danger">{{thirdItem.authName}}</el-tag>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="#" type="index">
                    </el-table-column>
                    <el-table-column label="角色名称" prop="roleName">
                    </el-table-column>
                    <el-table-column label="角色描述" prop="roleDesc">
                    </el-table-column>
                    <el-table-column fixed="right" width="400px" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button @click="editorUserRole(scope.row)" type="success" size="small" icon="el-icon-edit">编辑</el-button>
                            <el-button @click="deleteRoles(scope.row.id)" type="danger" size="small" icon="el-icon-delete">删除</el-button>
                            <el-button @click="reviseUser(scope.row.id, scope.row)" type="primary" size="small" icon="el-icon-setting">角色修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="adduserRoles">
            <el-dialog title="添加角色" :visible.sync="addUserRoles" width="40%">
                <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" :hide-required-asterisk="hideRequired">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="ruleForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="活动描述" prop="roleDesc">
                        <el-input v-model="ruleForm.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addUserRoles = false">取 消</el-button>
                    <el-button type="primary" @click="addUserRolesList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="editorRole">
            <el-dialog title="修改用户" :visible.sync="editorRole" width="40%">
                <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" :hide-required-asterisk="hideRequired">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="ruleForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="活动描述" prop="roleDesc">
                        <el-input v-model="ruleForm.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editorRole = false">取 消</el-button>
                    <el-button type="primary" @click="editorUserRoleList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="reviseRole">
            <el-dialog title="角色信息" :visible.sync="reviseRole" width="40%">
                <el-tree :data="treeData" :default-checked-keys="defaultChecked" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps">
                </el-tree>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="reviseRole = false">取 消</el-button>
                    <el-button type="primary" @click="addReviseUser">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import { getUserRole, deleteUserRole, addUserRoleList, editorRoleList, treeRoleList, treeUserList, deleteRoleRight } from '../../utils/api'
    export default {
        data() {
            return {
                hideRequired: true,
                tableData: [],
                addUserRoles: false,
                editorRole: false,
                reviseRole: false,
                editorId: '',
                treeId: '',
                search: '',
                defaultChecked: [],
                ruleForm: {
                    roleName: '',
                    roleDesc: ''
                },
                rules: {
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    roleDesc: [
                        { required: true, message: '请输入角色描述', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ]
                },
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'authName'
                },
            };
        },
        methods: {
            deleteRoles(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = { id: id };
                    deleteUserRole(data).then(res => {
                        this.render()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            render() {
                getUserRole().then(res => {
                    console.log(res);
                    this.tableData = res.data
                })
            },
            async addUserRolesList() {
                let res = await addUserRoleList(this.ruleForm)
                console.log(res);
                this.addUserRoles = false
                for (let i in this.ruleForm) {
                    this.ruleForm[i] = ''
                }
                this.render()
            },
            editorUserRole(item) {
                console.log(item);
                this.ruleForm.roleName = item.roleName
                this.ruleForm.roleDesc = item.roleDesc
                this.editorId = item.id
                this.editorRole = true
            },
            async editorUserRoleList() {
                let data = {
                    id: this.editorId,
                    roleName: this.ruleForm.roleName,
                    roleDesc: this.ruleForm.roleDesc
                }
                await editorRoleList(data)
                this.editorRole = false
                for (let i in this.ruleForm) {
                    this.ruleForm[i] = ''
                }
                this.render()
            },
            async reviseUser(id, row) {
                let res = await treeRoleList()
                this.treeData = res.data
                this.treeId = id
                this.reviseRole = true
                this.recurrence(row, this.defaultChecked)
            },
            async addReviseUser() {
                let CheckedTree = this.$refs.tree.getCheckedKeys();
                let HalfCheckedTree = this.$refs.tree.getHalfCheckedKeys()
                let data = {
                    id: this.treeId,
                    rids: [...CheckedTree, ...HalfCheckedTree].join(',')
                }
                await treeUserList(data)
                this.reviseRole = false
                this.render()
            },
            searchUser() {

            },
            recurrence(row, key) {
                if (!row.children) {
                    return key.push(row.id)
                }
                row.children.forEach(item => {
                    this.recurrence(item, key)
                })
            },
            async firstClose(id, rightId) {
                let data = {
                    id: id,
                    rightId: rightId
                }
                await deleteRoleRight(data)
                this.render()
            },
            async secondClose(id, rightId) {
                let data = {
                    id: id,
                    rightId: rightId
                }
                await deleteRoleRight(data)
                this.render()
            },
            async thirdClose(id, rightId) {
                let data = {
                    id: id,
                    rightId: rightId
                }
                await deleteRoleRight(data)
                this.render()
            }
        },
        created() {
            this.render()
        }
    };
</script>