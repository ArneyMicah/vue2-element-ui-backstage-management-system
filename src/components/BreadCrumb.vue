<style lang="scss" scoped>

</style>
<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">{{administer}}</a></el-breadcrumb-item>
            <el-breadcrumb-item>{{tabulation}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        props: ['administer', 'tabulation'],
        data() {
            return {

            };
        },
        methods: {

        },
    };
</script>