<style lang="scss" scoped>
    .homepage {
        .header {
            height: 60px;
            background-color: #373d41;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            color: #fff;

            .logo {
                img {
                    width: 50px;
                    height: 50px;
                }
            }
        }

        .content {
            display: flex;

            .main {
                background-color: #e9eef3;
                flex: 1;
                height: calc(100vh - 60px);
                min-height: calc(100vh - 60px);
                box-sizing: border-box;
            }

            .active {
                transform: rotate(90deg);
            }

            .el-menu {
                width: 200px;
                height: calc(100vh - 60px);
                max-width: 200px;
                min-width: 180px;
            }

            .isCollapse {
                width: 65px;;
            }
        }
    }
</style>
<template>
    <div class="homepage">
        <div class="header">
            <div class="logo"><img src="../../assets/img/touxiang1.jpg"></div>
            <h1>企业后台管理系统</h1>
            <el-button type="info" @click="secede">退出</el-button>
        </div>
        <div class="content">
            <el-menu router :collapse="isCollapse" default-active="2" class="el-menu-vertical-demo el-menu" :class="{isCollapse: isCollapse}" :collapse-transition="false" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <p align="center" style="color: #fff;"><i :class="{active: isCollapse}" class="el-icon-s-operation"></i></p>
                <el-submenu :index="item.path" v-for="item in menusList" :key="item.id">
                    <template slot="title">
                        <i :class="menuIcon[item.id]" style="color: #fff; margin-right: 10px; font-size: 20px;"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="child.path" v-for="child in item.children" :key="child.id">{{item.authName}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
            <div class="main">
                <router-view></router-view>
            </div>
        </div>
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