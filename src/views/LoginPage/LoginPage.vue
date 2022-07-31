<style lang="scss" scoped>
    @import '@/style/style.scss';

    .loginpage {
        position: relative;

        .background {
            background-image: url("http://96.43.108.32:4500/i/2022/07/26/yr4twj.png");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 100vh;
            width: 100vw;
        }

        .content {
            h1 {
                margin: 10px 0;
            }

            position: absolute;
            padding: 10px;
            @include auto;
            height: 250px;
            text-align: center;
            background-color: rgba(255, 255, 255, 0.507);
            width: 500px;
            box-shadow: 0 0 3px #000;
            border-radius: 10px;
            opacity: 0.8;
        }
    }
</style>
<template>
    <div class="loginpage">
        <div class="background"></div>
        <div class="content">
            <h1>后台管理系统</h1>
            <el-form label-position="left" :model="ruleForm" label-width="55px" :rules="rules" ref="ruleForm" :hide-required-asterisk="hiderequired">
                <el-form-item label="用户名" prop="username">
                    <el-input prefix-icon="iconfont icon-ziyuanxhdpi" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input prefix-icon="iconfont icon-mima" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <div class="button">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { getLoginInfo } from '../../utils/api'
    export default {
        data() {
            return {
                hiderequired: true,
                ruleForm: {
                    username: 'admin',
                    password: '123456'
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
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let res = await getLoginInfo(this.ruleForm)
                        if (res.meta.status == 200) {
                            this.$router.push('/WelcomePage')
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>