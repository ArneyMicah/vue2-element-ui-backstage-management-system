<style lang="scss" scoped>
    @import '../../style/style.scss';

    .welcome {
        position: relative;

        .background {
            background-image: url('http://96.43.108.32:4500/i/2022/07/20/skvim1.jpg');
            @include background;
            width: 100%;
            height: calc(100vh - 60px);
            position: absolute;
            top: 0;

            p {
                text-align: center;
                font-size: 50px;
                font-family: '华文彩云';
                color: #fff;
                text-shadow: 0 0 10px #000;
            }
        }
    }
</style>
<template>
    <div class="welcome">
        <div class="background">
            <p>欢迎登录</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        methods: {

        },
    };
</script>