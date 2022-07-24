<style lang="scss" scoped>
    @import '../../style/style.scss';

    .el-header {
        background-color: #373d41;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .logo {

            p {
                font-weight: 600;
                font-size: 20px;
                background-color: #000;
                width: 150px;
                text-align: center;
                padding: 10px;
                box-sizing: border-box;
                border-radius: 4px;

                span:nth-child(2) {
                    display: inline-block;
                    background-color: #fe9a00;
                    color: #000;
                    border-radius: 2px;
                    padding: 4px 3px;
                }
            }
        }
    }

    .el-aside {
        background-color: #000;
        color: #333;
        height: calc(100vh - 60px);
        background-image: url('http://96.43.108.32:4500/i/2022/07/24/k8eimu.jpg');
        @include background;

        .el-menu {
            border: none;
        }
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        padding: 0;
        margin: 0;
        background-image: url('http://96.43.108.32:4500/i/2022/07/20/skvim1.jpg');
        @include background;
    }
</style>
<template>
    <div class="homepage">
        <el-container>
            <el-header>
                <div class="logo">
                    <p><span>Arney</span><span>Micah</span></p>
                </div>
                <h1>企业后台管理系统</h1>
                <el-button type="info" @click="secede">退出</el-button>
            </el-header>
            <el-container>
                <el-aside :width="isCollapse ? '64px' : '240px'">
                    <el-menu router :collapse="isCollapse" :default-active="$route.path" class="el-menu-vertical-demo el-menu" :collapse-transition="false" background-color="transparent" text-color="#fff" active-text-color="#ffd04b">
                        <p align="center" @click="isCollapse = !isCollapse" style="color: #fff;"><i :class="{active: isCollapse}" class="el-icon-s-operation"></i></p>
                        <el-submenu :index="item.path" v-for="item in menusList" :key="item.id">
                            <template slot="title">
                                <i :class="menuIcon[item.id]" style="color: #fff; margin-right: 10px; font-size: 20px;"></i>
                                <span>{{item.authName}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item :index="child.path" v-for="child in item.children" :key="child.id">{{child.authName}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import { getMenus } from '../../utils/api.js'
    export default {
        data() {
            return {
                isCollapse: false,
                menusList: [],
                menuIcon: {
                    125: "iconfont icon-yonghuguanli",
                    103: "iconfont icon-quanxianguanli",
                    101: "iconfont icon-shangpinguanli",
                    102: "iconfont icon-dingdanguanli",
                    145: "iconfont icon-shujutongji1",
                },
            }
        },
        methods: {
            render() {
                getMenus().then(res => {
                    console.log(res)
                    this.menusList = res.data
                })
            },
            secede() {
                this.$router.push('/LoginPage')
                localStorage.removeItem('token')
            }
        },
        created() {
            this.render()
        }
    }
</script>