<style lang="scss" scoped>
    @import '../../style/style.scss';

    .categories {
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
        }
    }
</style>
<style>
    .el-radio {
        width: 300px;
        position: absolute;
        top: 0;
        height: 30px;
        margin-left: 0;
    }

    .el-radio__inner {
        display: none;
    }
</style>
<template>
    <div class="categories">
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <div class="search-button">
                <el-input placeholder="请输入内容" v-model="search" @input="searchUser" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                </el-input>
                <el-button type="primary" @click="categoriesInfo = true">添加分类</el-button>
            </div>
            <div class="zk-table">
                <zk-table ref="table" class="tb-cate" index-text="#" show-index stripe border :data="dataTable" :columns="columns" :expand-type="false" :selection-type="false">
                    <template slot="valid" slot-scope="scope">
                        <i class="el-icon-success" v-if="!scope.row.cat_deleted" style="color: lightGreen"></i>
                        <i class="el-icon-error" v-else style="color: red"></i>
                    </template>
                    <template slot="level" slot-scope="scope">
                        <el-tag type="primary" effect="plain" size="mini" v-show="scope.row.cat_level == 0">一级</el-tag>
                        <el-tag type="success" effect="plain" size="mini" v-show="scope.row.cat_level == 1">二级</el-tag>
                        <el-tag type="warning" effect="plain" size="mini" v-show="scope.row.cat_level == 2">三级</el-tag>
                    </template>
                    <template slot="operate" slot-scope="scope">
                        <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="deleteCategories(scope.row.cat_id)">删除</el-button>
                    </template>
                </zk-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="el-categories">
            <el-dialog title="添加分类" :visible.sync="categoriesInfo" width="40%">
                <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" :hide-required-asterisk="hideRequired">
                    <el-form-item label="分类名称" prop="cat_name">
                        <el-input v-model="ruleForm.cat_name"></el-input>
                    </el-form-item>
                    <el-form-item label="父级分类" prop="cat_pid">
                        <el-cascader v-model="classId" ref="remain" :options="dataList" :props="{ value: 'cat_id', label: 'cat_name', checkStrictly: true, expandTrigger: 'hover'}" clearable @change="change"></el-cascader>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="categoriesInfo = false">取 消</el-button>
                    <el-button type="primary" @click="addCategories">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="el-edit">
            <el-dialog title="编辑分类" :visible.sync="editCategoriesInfo" width="40%">
                <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" :hide-required-asterisk="hideRequired">
                    <el-form-item label="分类名称" prop="cat_name">
                        <el-input v-model="ruleForm.cat_name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editCategoriesInfo = false">取 消</el-button>
                    <el-button type="primary" @click="EditCategories">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import { getCategories, addCategoriesList, deleteCategoriesList, editorRoleInfo } from '../../utils/api.js'
    export default {
        data() {
            return {
                hideRequired: true,
                categoriesInfo: false,
                editCategoriesInfo: false,
                dataList: [],
                classId: [],
                editId: '',
                page: {
                    type: [2],
                    pagenum: 1,
                    pagesize: 10,
                },
                total: 0,
                columns: [
                    { label: "分类名称", prop: "cat_name" },
                    {
                        label: "是否有效",
                        prop: "cat_deleted",
                        type: "template",
                        template: "valid",
                    },
                    {
                        label: "分类等级",
                        prop: "cat_level",
                        type: "template",
                        template: "level"
                    },
                    {
                        label: '操作',
                        type: 'template',
                        template: 'operate'
                    }
                ],
                tableData: [],
                dataTable: [],
                search: '',
                ruleForm: {
                    cat_name: '',
                    cat_pid: 0,
                    cat_level: 0,
                },
                rules: {
                    attr_name: [
                        { required: true, message: '请输入参数名称', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ]
                },
            };
        },
        methods: {
            async render() {
                let resOne = await getCategories()
                this.tableData = resOne.data
                this.dataList = resOne.data
                let resTwo = await getCategories(this.page)
                this.total = resTwo.data.total
                this.dataTable = resTwo.data.result
            },
            change() {
                if (this.classId.length == 0) {
                    this.ruleForm.cat_pid = 0
                    this.ruleForm.cat_level = 0
                } else if (this.classId.length == 1) {
                    this.ruleForm.cat_pid = this.classId[0]
                    this.ruleForm.cat_level = 1
                } else if (this.classId.length == 2 || this.classId.length == 3) {
                    this.ruleForm.cat_pid = this.classId[1]
                    this.ruleForm.cat_level = 2
                }
                this.$refs.remain.dropDownVisible = false
            },
            searchUser() {

            },
            async addCategories() {
                await addCategoriesList(this.ruleForm)
                this.categoriesInfo = false
                this.render()
            },
            async deleteCategories(id) {
                let data = {
                    id: id
                }
                let res = await deleteCategoriesList(data)
                console.log(res);
                this.render()
            },
            handleSizeChange(val) {
                this.page.pagesize = val
                this.render()
            },
            handleCurrentChange(val) {
                this.page.pagenum = val
                this.render()
            },
            handleEdit(item) {
                console.log(item);
                this.ruleForm.cat_name = item.cat_name
                this.editId = item.cat_id
                this.editCategoriesInfo = true
            },
            async EditCategories() {
                let data = {id: this.editId, cat_name: this.ruleForm.cat_name}
                await editorRoleInfo(data)
                this.ruleForm.cat_name = ''
                this.editCategoriesInfo = false
                this.render()
            }
        },
        created() {
            this.render()
        }
    };
</script>