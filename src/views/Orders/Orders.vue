<style lang="scss" scoped>
    .orders {
        padding: 10px;
        height: calc(100vh - 90px);
        overflow-y: auto;

        .content {
            padding: 15px;
            background-color: rgba(255, 255, 255, 0.414);
            margin-top: 10px;
            opacity: 0.8;
            border-radius: 10px;

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
    <div class="orders">
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <div class="search-button">
                <el-input placeholder="请输入内容" v-model="search" @input="searchUser" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                </el-input>
            </div>
            <div class="el-table-list">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column type="index" label="#" align="center">
                    </el-table-column>
                    <el-table-column prop="order_number" label="订单编号" align="center">
                    </el-table-column>
                    <el-table-column prop="pay_status" label="是否付款" align="center">
                        <template slot-scope="scope">
                            <el-tag type="danger" v-if="scope.row.pay_status == 0">未付款</el-tag>
                            <el-tag type="success" v-if="scope.row.pay_status == 1">已付款</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_send" label="是否发货" align="center">
                    </el-table-column>
                    <el-table-column prop="create_time" label="下单时间" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button @click="orderInfoList(scope.row.order_id)" type="text" size="small">查看物流</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="orderInfo">
            <el-dialog title="提示" :visible.sync="orderInfo" width="40%">
                <el-timeline :reverse="reverse">
                    <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.time">
                        {{activity.context}}
                    </el-timeline-item>
                </el-timeline>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="orderInfo = false">取 消</el-button>
                    <el-button type="primary" @click="orderInfo = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import { getOrderList, getLogistics } from '../../utils/api.js'
    export default {
        data() {
            return {
                search: '',
                tableData: [],
                orderInfo: false,
                page: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10,
                },
                total: 0,
                reverse: true,
                activities: [{
                        "time": "2018-05-10 09:39:00",
                        "ftime": "2018-05-10 09:39:00",
                        "context": "已签收,感谢使用顺丰,期待再次为您服务",
                        "location": ""
                    },
                    {
                        "time": "2018-05-10 08:23:00",
                        "ftime": "2018-05-10 08:23:00",
                        "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
                        "location": ""
                    },
                    {
                        "time": "2018-05-10 07:32:00",
                        "ftime": "2018-05-10 07:32:00",
                        "context": "快件到达 [北京海淀育新小区营业点]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-10 02:03:00",
                        "ftime": "2018-05-10 02:03:00",
                        "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 23:05:00",
                        "ftime": "2018-05-09 23:05:00",
                        "context": "快件到达 [北京顺义集散中心]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 21:21:00",
                        "ftime": "2018-05-09 21:21:00",
                        "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 13:07:00",
                        "ftime": "2018-05-09 13:07:00",
                        "context": "顺丰速运 已收取快件",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 12:25:03",
                        "ftime": "2018-05-09 12:25:03",
                        "context": "卖家发货",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 12:22:24",
                        "ftime": "2018-05-09 12:22:24",
                        "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
                        "location": ""
                    },
                    {
                        "time": "2018-05-08 21:36:04",
                        "ftime": "2018-05-08 21:36:04",
                        "context": "商品已经下单",
                        "location": ""
                    }
                ],
            };
        },
        methods: {
            searchUser() {
                this.page.query = this.search;
                this.render()
            },
            async render() {
                let res = await getOrderList(this.page)
                console.log(res);
                this.tableData = res.data.goods
                this.total = res.data.total
            },
            handleSizeChange(val) {
                this.page.pagesize = val
                this.render()
            },
            handleCurrentChange(val) {
                this.page.pagenum = val
                this.render()
            },
            orderInfoList(id) {
                // let data = {
                //     order_id: id
                // }
                // let res = await getLogistics(data)
                // console.log(res);
                this.orderInfo = true
            }
        },
        created() {
            this.render()
        }
    };
</script>