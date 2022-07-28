<style lang="scss" scoped>
    @import '../../style/style.scss';

    .reports {
        .canvas {
            text-align: center;
            border-radius: 10px;
            position: relative;

            #canvas {
                background-color: rgba(255, 255, 255, 0.442);
                width: 1250px;
                height: 650px;
                border-radius: 10px;
                position: absolute;
                top: 100px;
                left: 50%;
                margin-left: -625px;
                box-shadow: 0 0 3px #000;
            }
        }
    }
</style>
<template>
    <div class="reports">
        <div class="canvas">
            <div id="canvas"></div>
        </div>
    </div>
</template>
<script>
    import * as echarts from 'echarts'
    import { getReports } from '../../utils/api.js'
    export default {
        data() {
            return {
                preData: {
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
            canvas() {
                let canvas = document.querySelector('#canvas')
                console.log(canvas);
                let myChart = echarts.init(canvas)
                getReports().then(res => {
                    console.log(res);
                    let mergeData = { ...this.preData, ...res.data }
                    let options = mergeData
                    myChart.setOption(options)
                })
            }
        },
        mounted() {
            this.canvas()
        },
    };
</script>