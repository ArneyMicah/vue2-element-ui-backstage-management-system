<style lang="scss" scoped>
    .goods {
        .bread {
            padding: 10px;
        }

        .search-button {
            display: flex;
            align-items: center;
            padding: 0 10px;

            .input-with-select {
                width: 400px;
            }
        }

        .content {
            padding: 15px;
            background-color: #fff;
            border-radius: 10px;
            margin: 10px;
        }
    }
</style>
<template>
    <div class="goods">
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="search-button">
            <el-input placeholder="请输入内容" v-model="search" @input="searchUser" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
            <el-button type="primary" @click="$router.push('/AddGoodsPage')">添加商品</el-button>
        </div>
        <div class="content">
            <div class="el-table-list">
                <el-table :data="tableData" border style="width: 100%" height="650px">
                    <el-table-column type="index" label="#" width="55">
                    </el-table-column>
                    <el-table-column prop="goods_name" label="商品名称" align="center">
                    </el-table-column>
                    <el-table-column prop="goods_price" label="商品价格" align="center">
                    </el-table-column>
                    <el-table-column prop="goods_number" label="商品数量" align="center">
                    </el-table-column>
                    <el-table-column prop="add_time" label="创建时间" align="center">
                        <template slot-scope="scope">
                            <span>{{new Date(scope.row.add_time * 1000).toLocaleString()}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button @click="deleteClick(scope.row.goods_id)" type="text" size="small">删除</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagin">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import { getGoodsList, deleteGoodsList } from '../../utils/api.js'
    export default {
        data() {
            return {
                search: '',
                tableData: [],
                total: 0,
                page: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10,
                },
            };
        },
        methods: {
            searchUser() {
                this.page.query = this.search;
                this.render()
            },
            handleSizeChange(val) {
                this.page.pagesize = val;
                this.render();
            },
            handleCurrentChange(val) {
                this.page.pagenum = val;
                this.render();
            },
            async render() {
                let res = await getGoodsList(this.page)
                this.tableData = res.data.goods
                this.total = res.data.total
                console.log(res);
            },
            async deleteClick(id) {
                let data = { id: id }
                console.log(data);
                let res = await deleteGoodsList(data)
                console.log(res);
            }
        },
        created() {
            this.render()
        }
    };
</script>