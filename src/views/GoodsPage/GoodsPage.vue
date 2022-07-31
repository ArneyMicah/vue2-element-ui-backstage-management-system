<style lang="scss" scoped>
    @import '../../style/style.scss';
    .goods {
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
    <div class="goods">
        <Bread administer="用户管理" tabulation="用户列表"></Bread>
        <div class="content">
            <div class="search">
                <el-input placeholder="请输入内容" v-model="searchValue" @input="SearchContent">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
                <el-button type="primary" @click="addGoods">添加商品</el-button>
            </div>
            <div class="el-table-list">
                <el-table :data="tableData" border height="600">
                    <el-table-column label="#" type="index" align="center"></el-table-column>
                    <el-table-column label="商品" prop="goods_name" align="center"></el-table-column>
                    <el-table-column label="商品价格" prop="goods_price" align="center"></el-table-column>
                    <el-table-column label="商品数量" prop="goods_number" align="center"></el-table-column>
                    <el-table-column label="创建时间" prop="add_time" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.add_time | year}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="200px" align="center">
                        <template slot-scope="scope">
                            <el-button type="danger" @click="deleteGoods(scope.row.goods_id)" size="mini">删除</el-button>
                            <el-button type="primary" @click="editGoodsInfo(scope.row)" size="mini">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="editGood">
            <el-dialog title="修改商品" :visible.sync="editGoods" width="40%">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editGoods = false">取 消</el-button>
                    <el-button type="primary" @click="editGoods = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getProductList, deleteProduct } from '../../utils/api'
    export default {
        data() {
            return {
                tableData: [],
                searchValue: '',
                editGoods: false,
                total: 0,
                page: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10
                },
            };
        },
        methods: {
            async render() {
                let res = await getProductList(this.page)
                console.log(res);
                this.tableData = res.data.goods
                this.total = res.data.total
            },
            handleSizeChange(value) {
                this.page.pagesize = value
                this.render()
            },
            handleCurrentChange(value) {
                this.page.pagenum = value
                this.render()
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
            deleteGoods(id) {
                this.$confirm('确定删除该商品吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let data = { id: id }
                    await deleteProduct(data)
                    this.render()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            editGoodsInfo() {

            },
            addGoods() {
                this.$router.push('/AddGoodsList')
            }
        },
        created() {
            this.render()
        }
    };
</script>