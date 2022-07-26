<style lang="scss" scoped>
    @import '../../style/style.scss';

    .reports {
        width: 100%;
        height: 100%;
        position: relative;

        .canvas {
            width: 1200px;
            height: 700px;
            text-align: center;
            background-color: rgba(255, 255, 255, 0.493);
            border-radius: 10px;
            position: absolute;
            @include auto;
            box-shadow: 0 0 3px #000;

            #canvas {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
<template>
    <div class="reports">
        <div class="canvas">
            <h2>数据统计</h2>
            <div id="canvas"></div>
        </div>
    </div>
</template>
<script>
    import { getReports } from '../../utils/api.js'
    export default {
        data() {
            return {
                opacity: {},
            };
        },
        methods: {
            async render() {
                let res = await getReports()
                this.opacity = res.data
            },
            canvas() {
                let myChart = this.$echarts.init(document.getElementById('canvas'))
                myChart.setOption(this.opacity);
            }
        },
        created() {
            this.render()
        },
        mounted() {
            this.canvas()
        },
        watch: {
            opacity: {
                handler() {
                    this.canvas();
                },
                deep: true,
            }
        },
    };
</script>