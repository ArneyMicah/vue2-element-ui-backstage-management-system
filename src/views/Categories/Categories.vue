<style lang="scss" scoped>
    .categories {
        padding: 10px;
        max-height: calc(100vh - 90px);
        overflow-y: auto;

        .content {
            background-color: rgba(255, 255, 255, 0.432);
            padding: 10px;
            margin-top: 10px;
            border-radius: 10px;
            opacity: 0.8;

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
                <zk-table ref="table" class="tb-cate" index-text="#" show-index stripe border :data="tableData" :columns="columns" :expand-type="false" :selection-type="false">
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
                        <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </zk-table>
            </div>
        </div>
        <div class="el-categories">
            <el-dialog title="添加分类" :visible.sync="categoriesInfo" width="40%">
                <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" :hide-required-asterisk="hideRequired">
                    <el-form-item label="分类名称" prop="cat_name">
                        <el-input v-model="ruleForm.cat_name"></el-input>
                    </el-form-item>
                    <el-form-item label="父级分类" prop="cat_pid">
                        <el-cascader v-model="ruleForm.cat_pid" :options="dataList" :props="{ value: 'cat_id', label: 'cat_name', checkStrictly: true }" clearable @change="change"></el-cascader>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="categoriesInfo = false">取 消</el-button>
                    <el-button type="primary" @click="addCategories">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import { getCategories, addCategoriesList } from '../../utils/api.js'
    export default {
        data() {
            return {
                hideRequired: true,
                categoriesInfo: false,
                dataList: [],
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
                search: '',
                ruleForm: {
                    cat_name: '',
                    cat_pid: '',
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
                let res = await getCategories()
                console.log(res);
                this.tableData = res.data
                this.dataList = res.data
            },
            change(){

            },
            searchUser(){
                
            },
            async addCategories(){
                let res = await addCategoriesList(this.ruleForm)
                console.log(res);
            }
        },
        created() {
            this.render()
        }
    };
</script>