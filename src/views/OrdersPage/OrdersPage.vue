<style lang="scss" scoped>
    @import '../../style/style.scss';

    .orders {
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
    <div class="orders">
        <Bread administer="订单管理" tabulation="订单列表"></Bread>
        <div class="content">
            <div class="search">
                <el-input placeholder="请输入内容" v-model="searchValue">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="primary" @click="addCateInfo = true">添加订单</el-button>
            </div>
            <div class="el-table-list">
                <el-table :data="tableData" style="width: 100%" border height="600">
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column align="center" prop="order_number" label="订单编号"></el-table-column>
                    <el-table-column align="center" prop="order_pay" label="是否付款">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.order_pay == 1">已付款</el-tag>
                            <el-tag type="danger" v-else>未付款</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="is_send" label="是否发货"></el-table-column>
                    <el-table-column align="center" prop="create_time" label="下单时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.create_time | year}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" fixed="right" width="150px" label="操作">
                        <template slot-scope="scope">
                            <el-button type="success" @click="addressInfo = true" size="small">地址</el-button>
                            <el-button type="primary" @click="streamList = true" size="small">物流</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="address">
            <el-dialog title="收货地址" :visible.sync="addressInfo" width="40%">
                <el-form label-position="left" label-width="100px">
                    <el-form-item label="省/市/县/区">
                        <el-cascader v-model="classFather" :options="City" :props="{value: 'value', label: 'label'}" clearable></el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input v-model="addressValue"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addressInfo = false">取 消</el-button>
                    <el-button type="primary" @click="addressInfoOK">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="streamInfo">
            <el-dialog title="提示" :visible.sync="streamList" width="40%">
                <el-timeline :reverse="reverse">
                    <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.time">
                        {{activity.context}}
                    </el-timeline-item>
                </el-timeline>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="streamList = false">取 消</el-button>
                    <el-button type="primary" @click="streamList = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getOrderList } from '../../utils/api'
    import City from '../../../public/city'
    export default {
        data() {
            return {
                reverse: false,
                classFather: [],
                addressInfo: false,
                tableData: [],
                streamList: false,
                addressValue: '',
                searchValue: '',
                total: 0,
                page: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10,
                },
                City,
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
            async render() {
                let res = await getOrderList(this.page)
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
            addressInfoOK() {
                this.classFather = []
                this.addressValue = ''
                this.addressInfo = false
            }
        },
        created() {
            this.render()
        }
    };
</script>