<style lang="scss" scoped>
    @import '../../style/style.scss';

    .roles {
        height: 100%;
        max-height: calc(100vh - 60px);
        overflow-y: auto;
        background-image: url('http://96.43.108.32:4500/i/2022/07/22/o4a2g0.jpg');
        @include background;

        .header {
            padding: 15px;
            padding-bottom: 0;

            .bread {
                margin: 10px 0;
            }
        }

        .content {
            background-color: rgba(255, 255, 255, 0.435);
            padding: 15px;
            margin: 15px;
            margin-top: 0;
            border-radius: 10px;
            box-shadow: 0 0 3px #000;
            opacity: 0.8;

            .search-button {
                display: flex;
                align-items: center;

                .input-with-select {
                    width: 400px;
                }
            }
            .el-tags{
                display: flex;
                div{
                    flex: 1;
                }
            }
        }
    }
</style>
<template>
    <div class="roles">
        <div class="header">
            <div class="bread">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
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
                                    <el-tag closable v-for="(item, index) in scope.row.children" :key="index">{{scope.row.children[0].authName}}</el-tag>
                                </div>
                                <div class="second">
                                    <el-tag closable type="success" v-for="(item, index) in scope.row.children[0].children" :key="index">{{scope.row.children[0].children[0].authName}}</el-tag>
                                </div>
                                <div class="third">
                                    <el-tag closable type="danger" v-for="(item, index) in  scope.row.children[0].children[0].children" :key="index">{{item.authName}}</el-tag>
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
                            <el-button @click="reviseUser(scope.row.id)" type="primary" size="small" icon="el-icon-setting">角色修改</el-button>
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
                <el-tree :data="treeData" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
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
    import { getUserRole, deleteUserRole, addUserRoleList, editorRoleList, treeRoleList, treeUserList } from '../../utils/api'
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
            async deleteRoles(id) {
                let data = { id: id };
                await deleteUserRole(data)
                this.render()
            },
            async render() {
                let res = await getUserRole()
                console.log(res);
                this.tableData = res.data
            },
            async addUserRolesList() {
                let res = await addUserRoleList(this.ruleForm)
                console.log(res);
                this.addUserRoles = false
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
                this.render()
            },
            async reviseUser(id) {
                let res = await treeRoleList()
                this.treeData = res.data
                this.treeId = id
                this.reviseRole = true
            },
            async addReviseUser() {
                let CheckedTree = this.$refs.tree.getCheckedKeys();
                let HalfCheckedTree = this.$refs.tree.getHalfCheckedKeys()
                this.CheckedTreeID = CheckedTree
                this.CheckedTreeNameID = HalfCheckedTree
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
            handleClose(item, children){
                
            }
        },
        created() {
            this.render()
        }
    };
</script>