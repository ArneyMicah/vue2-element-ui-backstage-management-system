<style lang="scss" scoped>
    @import '../../style/style.scss';

    .login {
        position: relative;

        .background {
            background-image: url('http://96.43.108.32:4500/i/2022/07/20/skvim1.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 100vh;
        }

        .content {
            width: 550px;
            height: 300px;
            background-color: rgba(255, 255, 255, 0.634);
            min-width: 200px;
            min-height: 195px;
            position: absolute;
            @include auto;
            border-radius: 10px;
            padding: 20px;
            box-sizing: border-box;
        }

        h1 {
            text-align: center;
            margin-bottom: 22px;
        }

        .el-buttons {
            margin-left: 128px;
        }
    }
</style>
<template>
    <div class="login">
        <div class="background"></div>
        <div class="content">
            <h1>后台管理系统</h1>
            <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="55px" class="demo-ruleForm" :hide-required-asterisk="hideRequired">
                <el-form-item label="用户名" prop="username">
                    <el-input prefix-icon="iconfont icon-ziyuanxhdpi" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input prefix-icon="iconfont icon-mima" v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <el-form-item class="el-buttons">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import { getLoginInfo } from '../../utils/api.js'
    export default {
        data() {
            return {
                hideRequired: true,
                ruleForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        getLoginInfo(this.ruleForm).then(res => {
                            if(res.meta.status == 200){
                                this.$router.push('/HomePage')
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
        },
    }
</script>