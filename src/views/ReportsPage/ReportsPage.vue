<style lang="scss" scoped>
    @import '../../style/style.scss';

    .reports {
        padding: 15px;

        .content {
            @include content;
        }
    }
</style>
<template>
    <div class="reports">
        <div class="content">
            <div class="canvas" ref="chart" style="width:1200px; height:600px"></div>
        </div>
    </div>
</template>

<script>
    import { getOrderCount } from '../../utils/api'
    import * as echarts from 'echarts';
    export default {
        data() {
            return {
                opacity: {},
                data: {
                    title: {
                        text: '用户来源'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#E9EEF3'
                            }
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        boundaryGap: false
                    }],
                    yAxis: [{
                        type: 'value'
                    }]
                }
            };
        },
        methods: {
            async canvas() {
                let chart = this.$refs.chart
                console.log(chart);
                let myChart = echarts.init(chart);
                let res = await getOrderCount()
                let minimum = { ...this.data, ...res.data }
                let opacity = minimum
                myChart.setOption(opacity)
            }
        },
        mounted() {
            this.canvas()
        }
    };
</script>