<style lang="scss" scoped>
    @import '../../style/style.scss';

    .roles {
        padding: 15px;

        .content {
            @include content;
            .search {
                display: flex;
                align-items: center;
            }

            .el-table-list {
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
    }
</style>
<template>
    <div class="roles">
        <Bread administer="权限管理" tabulation="角色列表"></Bread>
        <div class="content">
            <div class="search">
                <el-input placeholder="请输入内容" v-model="searchValue">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="primary" @click="addRoles = true">添加角色</el-button>
            </div>
            <div class="el-table-list">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column type="expand" label="#" align="center">
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
                    <el-table-column type="index" label="#" align="center"></el-table-column>
                    <el-table-column label="角色名称" prop="roleName" align="center"></el-table-column>
                    <el-table-column label="角色描述" prop="roleDesc" align="center"></el-table-column>
                    <el-table-column label="操作" fixed="right" width="250px" align="center">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" @click="editRolesInfo(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="deleteRoles(scope.row.id)">删除</el-button>
                            <el-button type="primary" size="mini" @click="allocateRolesInfo(scope.row, scope.row.id)">角色授权</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="addRole">
            <el-dialog title="添加角色" :visible.sync="addRoles" width="40%">
                <el-form label-position="left" :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" :hide-required-asterisk="hiderequired">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="ruleForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="ruleForm.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="addRolesList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="compiler">
            <el-dialog title="修改角色" :visible.sync="editRoles" width="40%">
                <el-form label-position="left" :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" :hide-required-asterisk="hiderequired">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="ruleForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="ruleForm.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editRoles = false">取 消</el-button>
                    <el-button type="primary" @click="editRolesList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="allocate">
            <el-dialog title="权限分配" :visible.sync="allocateRoles" width="40%">
                <el-tree :data="treeData" :default-checked-keys="defaultChecked" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
                </el-tree>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="allocateRoles = false">取 消</el-button>
                    <el-button type="primary" @click="allocateRolesList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getRoles, addRole, editRole, deleteRole, getPermissionTree, setRoleAuth, deleteRoleAuth } from '../../utils/api'
    export default {
        data() {
            return {
                hiderequired: true,
                searchValue: '',
                treeData: [],
                tableData: [],
                roleId: '',
                defaultChecked: [],
                addRoles: false,
                editRoles: false,
                allocateRoles: false,
                ruleForm: {
                    roleName: '',
                    roleDesc: ''
                },
                rules: {
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ],
                    roleDesc: [
                        { required: true, message: '请输入角色描述', trigger: 'blur' }
                    ]
                },
                defaultProps: {
                    children: 'children',
                    label: 'authName'
                }
            };
        },
        methods: {
            async render() {
                let res = await getRoles()
                console.log(res);
                this.tableData = res.data
            },
            addRolesList() {
                this.$refs.ruleForm.validate(async valid => {
                    if (valid) {
                        await addRole(this.ruleForm)
                        this.addRoles = false
                        for (let i in this.ruleForm) {
                            this.ruleForm[i] = ''
                        }
                        this.render()
                    }
                });
            },
            cancel() {
                this.addRoles = false
                for (let i in this.ruleForm) {
                    this.ruleForm[i] = ''
                }
            },
            editRolesInfo(item) {
                this.ruleForm = item
                this.editRoles = true
            },
            editRolesList() {
                this.$refs.ruleForm.validate(async valid => {
                    if (valid) {
                        await editRole(this.ruleForm)
                        this.editRoles = false
                        this.render()
                    }
                });
            },
            deleteRoles(id) {
                this.$confirm('确定删除该角色吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let data = { id: id }
                    await deleteRole(data)
                    this.render()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            async allocateRolesInfo(row, id) {
                let res = await getPermissionTree()
                this.roleId = id
                this.treeData = res.data
                this.allocateRoles = true
                this.recurrence(row, this.defaultChecked)
            },
            async allocateRolesList() {
                let CheckedKeyId = this.$refs.tree.getCheckedKeys()
                let HalfCheckedKeyId = this.$refs.tree.getHalfCheckedKeys()
                console.log(CheckedKeyId, HalfCheckedKeyId)
                let data = {
                    id: this.roleId,
                    rids: [...CheckedKeyId, ...HalfCheckedKeyId].join(',')
                }
                await setRoleAuth(data)
                this.allocateRoles = false
                this.render()
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
                await deleteRoleAuth(data)
                this.render()
            },
            async secondClose(id, rightId) {
                let data = {
                    id: id,
                    rightId: rightId
                }
                await deleteRoleAuth(data)
                this.render()
            },
            async thirdClose(id, rightId) {
                let data = {
                    id: id,
                    rightId: rightId
                }
                await deleteRoleAuth(data)
                this.render()
            },
        },
        created() {
            this.render()
        }
    };
</script>