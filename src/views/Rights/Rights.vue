<style lang="scss" scoped>
    @import '../../style/style.scss';
    .rights {
        @include index;
        .content{
            @include content;
            margin-top: 10px;
        }
    }
</style>
<template>
    <div class="rights">
        <div class="bread">
            <BreadCrumb level1="权限管理" level2="权限列表"></BreadCrumb>
        </div>
        <div class="content">
            <el-table :data="tableData" border style="width: 100%" height="750px">
                <el-table-column label="#" type="index" width="55px"></el-table-column>
                <el-table-column prop="authName" label="权限名称" align="center">
                </el-table-column>
                <el-table-column prop="path" label="路径" align="center">
                </el-table-column>
                <el-table-column prop="level" label="权限等级" align="center">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level == 0">一级</el-tag>
                        <el-tag type="success" v-else-if="scope.row.level == 1">二级</el-tag>
                        <el-tag type="warning" v-else-if="scope.row.level == 2">三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import {RightsList} from '../../utils/api.js'
    export default {
        data() {
            return {
                tableData: [],
            };
        },
        methods: {
            async render(){
                let res = await RightsList()
                console.log(res);
                this.tableData = res.data
            }
        },
        created(){
            this.render()
        }
    };
</script>