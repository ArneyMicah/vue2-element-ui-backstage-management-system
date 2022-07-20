<style lang="scss" scoped>
    .welcome {
        position: relative;

        .background {
            background-image: url('http://96.43.108.32:4500/i/2022/07/20/skvim1.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            width: 100%;
            height: calc(100vh - 60px);
            position: absolute;
            top: 0;

            h1 {
                text-align: center;
            }
        }
    }
</style>
<template>
    <div class="welcome">
        <div class="background">
            <h1>欢迎登录</h1>
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