<style lang="scss" scoped>
    .homepage {
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
            background-color: #545c64;
            color: #333;
            height: calc(100vh - 60px);
        }

        .el-main {
            background-color: #E9EEF3;
            color: #333;
            padding: 0;
            margin: 0;
            max-height: calc(100vh - 60px);
            background-image: url('../../assets/image/02.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 100vh;
            width: 100vw;
        }

        .el-menu {
            border: none;
        }
    }
</style>
<template>
    <div class="homepage">
        <el-container>
            <el-header>
                <div class="logo">
                    <p><span>Arney</span><span>Micah</span></p>
                </div>
                <h1>商城后台管理系统</h1>
                <el-button type="info" @click="secede">退出</el-button>
            </el-header>
            <el-container>
                <el-aside :width="isCollapse ? '64px' : '200px'">
                    <p align="center" @click="isCollapse = !isCollapse" style="color: #fff;"><i :class="{active: isCollapse}" class="el-icon-s-operation"></i></p>
                    <el-menu router :collapse="isCollapse" :default-active="pathIndex" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse-transition="false">
                        <el-submenu :index="item.path" v-for="item in menuInfoList" :key="item.id">
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
    import { getMenuInfo } from '../../utils/api'
    export default {
        data() {
            return {
                menuInfoList: [],
                isCollapse: false,
                pathIndex: '',
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
            secede() {
                this.$router.push('/LoginPage')
                sessionStorage.clear('token')
            },
            async render() {
                let res = await getMenuInfo()
                this.menuInfoList = res.data
            }
        },
        created() {
            this.render()
        },
        watch: {
            $route: {
                handler(val) {
                    this.pathIndex = val.matched[1].name
                },
                immediate: true,
                deep: true,
            },
        }
    }
</script>