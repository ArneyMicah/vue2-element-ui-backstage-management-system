<style lang="scss" scoped>
    .addgoods {
        .content {
            .back{
                font-size: 20px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background-color: rgba(255, 255, 255, 0.449);
                border-radius: 50%;
                color: #fff;
            }
            background-color: rgba(255, 255, 255, 0.387);
            padding: 10px;
            border-radius: 10px;
            margin: 10px;
            height: calc(100vh - 100px);
            overflow: auto;

            .steps {
                padding-top: 15px;
                margin: auto;
            }
        }

        .el-cascader__dropdown {
            height: 200px;
        }

        .el-cascader-panel {
            height: 200px;
        }
    }
</style>
<template>
    <div class="addgoods">
        <div class="content">
            <div class="back" @click="$router.go(-1)"><i class="el-icon-arrow-left" style="font-weight: 600;"></i></div>
            <div class="steps">
                <el-steps :active="active" finish-status="success" align-center>
                    <el-step title="基本信息"></el-step>
                    <el-step title="商品参数"></el-step>
                    <el-step title="商品属性"></el-step>
                    <el-step title="商品图片"></el-step>
                    <el-step title="商品内容"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
            </div>
            <div class="el-tabs">
                <el-tabs tab-position="left" style="height: 100%;" :before-leave="tabsActive">
                    <el-tab-pane label="基本信息">
                        <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="55px" class="demo-ruleForm" :hide-required-asterisk="hideRequired">
                            <el-form-item label="商品名称" prop="goods_name">
                                <el-input v-model="ruleForm.goods_name"></el-input>
                            </el-form-item>
                            <el-form-item label="商品价格" prop="goods_price">
                                <el-input v-model="ruleForm.goods_price"></el-input>
                            </el-form-item>
                            <el-form-item label="商品数量" prop="goods_number">
                                <el-input v-model="ruleForm.goods_number"></el-input>
                            </el-form-item>
                            <el-form-item label="商品重量" prop="goods_weight">
                                <el-input v-model="ruleForm.goods_weight"></el-input>
                            </el-form-item>
                            <el-form-item label="商品分类" prop="goods_cat">
                                <el-cascader style="width: 100%" :options="options" @change="handleChange" :props="{value: 'cat_id', label: 'cat_name' }">
                                    <template slot-scope="{node, data}">
                                        <span>{{ data.cat_name }}</span>
                                        <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                                    </template>
                                </el-cascader>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane align="center" label="商品参数">配置管理</el-tab-pane>
                    <el-tab-pane align="center" label="商品属性">角色管理</el-tab-pane>
                    <el-tab-pane align="center" label="商品图片">
                        <el-upload class="upload-demo" drag action="http://www.ysqorz.top:8888/api/private/v1/upload" multiple :headers="headers" :on-success="success" list-type="picture">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane align="center" label="商品内容">
                        <quill-editor v-model="addForm.goods_introduce"></quill-editor>
                        <el-button type="primary" @click="addGoods">添加商品</el-button>
                    </el-tab-pane>
                    <el-tab-pane align="center" label="完成">定时任务补偿</el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import { addGoodsList, getCategories} from '../../utils/api.js'
    export default {
        data() {
            return {
                headers: {
                    Authorization: window.localStorage.getItem("token"),
                },
                hideRequired: true,
                cascaderValue: '',
                active: 0,
                options: [],
                fileList: [],
                addForm: {
                    goods_introduce: '',
                    pics: [],
                },
                ruleForm: {
                    goods_name: '',
                    goods_price: '',
                    goods_number: '',
                    goods_weight: '',
                    goods_cat: ''
                },
                rules: {
                    goods_name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    goods_price: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' }
                    ],
                    goods_number: [
                        { required: true, message: '请输入商品数量', trigger: 'blur' }
                    ],
                    goods_weight: [
                        { required: true, message: '请输入商品重量', trigger: 'blur' }
                    ],
                    goods_cat: [
                        { required: true, message: '请选择商品分类', trigger: 'change' }
                    ]
                },
            };
        },
        methods: {
            handleChange(value) {
                console.log(value);
                this.ruleForm.goods_cat = value.join(",");
            },
            tabsActive(newValue, oldValue) {
                if(this.ruleForm.goods_name == ""){
                    return false
                }
                console.log(newValue, oldValue);
                this.active = Number(newValue);
            },
            success(val) {
                console.log(val);
                this.addForm.pics.push({ "pic": val.data.tmp_path})
            },
            async addGoods() {
                let res = await addGoodsList({...this.ruleForm, ...this.addForm});
                this.$router.push('/goods');
            },
            async render() {
                let res = await getCategories()
                this.options = res.data
            }
        },
        created() {
            this.render();
        }
    };
</script>