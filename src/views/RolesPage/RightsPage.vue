<style lang="scss" scoped>
    @import '../../style/style.scss';

    .rights {
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
    <div class="rights">
        <Bread administer="权限管理" tabulation="权限列表"></Bread>
        <div class="content">
            <div class="search">
                <el-input placeholder="请输入内容" v-model="searchValue">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="primary">添加权限</el-button>
            </div>
            <div class="el-table-list">
                <el-table :data="tableData" border height="620">
                    <el-table-column label="#" type="index" align="center"></el-table-column>
                    <el-table-column label="权限名称" prop="authName" align="center"></el-table-column>
                    <el-table-column label="路径" prop="path" align="center"></el-table-column>
                    <el-table-column label="权限等级" align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.level == 0">一级</el-tag>
                            <el-tag type="success" v-if="scope.row.level == 1">二级</el-tag>
                            <el-tag type="warning" v-if="scope.row.level == 2">三级</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import { getPermissions } from '../../utils/api'
    export default {
        data() {
            return {
                searchValue: '',
                tableData: [],
            };
        },
        methods: {
            async render() {
                let res = await getPermissions()
                console.log(res);
                this.tableData = res.data
            }
        },
        created() {
            this.render()
        }
    };
</script>