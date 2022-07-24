<style lang="scss" scoped>
    .categories {
        padding: 10px;
        max-height: calc(100vh - 90px);
        overflow-y: auto;
        .content {
            background-color: #fff;
            padding: 10px;
        }
    }
</style>
<template>
    <div class="categories">
        <div class="content">
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
    </div>
</template>
<script>
    import { getCategories } from '../../utils/api.js'
    export default {
        data() {
            return {
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
            };
        },
        methods: {
            async render() {
                let res = await getCategories()
                console.log(res);
                this.tableData = res.data
            }
        },
        created() {
            this.render()
        }
    };
</script>