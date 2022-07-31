<style lang="scss" scoped>
    .add_goods {
        padding: 15px;
        height: calc(100vh - 110px);

        .content {
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 3px #000;
            height: 100%;
            overflow-y: auto;
        }
    }
</style>
<template>
    <div class="add_goods">
        <div class="content">
            <div class="header" style="margin-top: 50px">
                <el-steps :active="active" align-center>
                    <el-step title="基本信息"></el-step>
                    <el-step title="商品参数"></el-step>
                    <el-step title="商品属性"></el-step>
                    <el-step title="商品图片"></el-step>
                    <el-step title="商品内容"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
            </div>
            <div class="el-tabs">
                <el-tabs tab-position="left" style="height: 100%" :before-leave="beforeLeave">
                    <el-tab-pane label="基本信息">
                        <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" :hide-required-asterisk="hiderequired">
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
                                <el-cascader style="width: 100%" v-model="ruleForm.goods_cat" :options="options" :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name'}" @change="handleChange"></el-cascader>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数">
                        <el-form label-position="top" label-width="55px">
                            <el-form-item v-for="(item, index) in manyParams" :key="index" :label="item.attr_name">
                                <el-checkbox-group v-model="item.attr_vals">
                                    <el-checkbox border v-for="(ele, index) in item.attr_vals" :key="index" :label="ele"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性">
                        <el-form>
                            <el-form-item v-for="(item, index) in onlyParams" :key="index" :label="item.attr_name">
                                <el-input v-model="item.attr_vals"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" align="center">
                        <el-upload class="upload-demo" drag action="http://www.ysqorz.top:8888/api/private/v1/upload" multiple :headers="headers" :on-success="success" list-type="picture">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" align="center">
                        <quill-editor v-model="addForm.goods_introduce"></quill-editor>
                        <el-button type="primary" @click="addGoodsList">添加商品</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="完成">完成</el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import { getProductCategoryList, addProduct, getProductParamsList } from '../../utils/api'
    export default {
        data() {
            return {
                headers: {
                    Authorization: window.sessionStorage.getItem('token')
                },
                hiderequired: true,
                options: [],
                manyParams: [],
                onlyParams: [],
                optionsLength: '',
                optionsId: '',
                active: 0,
                ruleForm: {
                    goods_name: '',
                    goods_price: '',
                    goods_number: '',
                    goods_weight: '',
                    goods_cat: []
                },
                rules: {
                    goods_name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    goods_price: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                    goods_number: [
                        { required: true, message: '请输入商品数量', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                    goods_weight: [
                        { required: true, message: '请输入商品重量', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                },
                addForm: {
                    goods_introduce: '',
                    pics: [],
                },
            };
        },
        methods: {
            beforeLeave(newValue, oldValue) {
                if (oldValue == 0 && this.optionsLength != 3) {
                    this.$message({
                        message: '请完善商品信息',
                        type: 'error'
                    });
                    return false
                }
                if (newValue == 1) {
                    let data = {
                        id: this.optionsId,
                        sel: 'many',
                    }
                    getProductParamsList(data).then(res => {
                        res.data.forEach(item => {
                            console.log(item);
                            item.attr_vals = item.attr_vals.length > 0 ? item.attr_vals.split(',') : []
                        })
                        this.manyParams = res.data
                    })
                }
                if (newValue == 2) {
                    let data = {
                        id: this.optionsId,
                        sel: 'only',
                    }
                    getProductParamsList(data).then(res => {
                        console.log(res);
                        this.onlyParams = res.data
                    })
                }
                this.active = Number(newValue);
            },
            handleChange(val) {
                console.log(val);
                this.optionsId = val[val.length - 1]
                this.optionsLength = val.length
                this.ruleForm.goods_cat = val.join(',')
            },
            async render() {
                let res = await getProductCategoryList();
                this.options = res.data
            },
            success(val) {
                let image = val.data.tmp_path
                this.addForm.pics.push(image)
            },
            addGoodsList() {
                this.$refs.ruleForm.validate(async valid => {
                    if (valid) {
                        let attrs = [...this.manyParams, ...this.onlyParams]
                        let data = {
                            ...this.ruleForm,
                            ...this.addForm,
                            attrs
                        }
                        await addProduct(data);
                        this.$router.push('/goods')
                    } else {
                        this.$message({
                            message: '请检查商品信息是否完善',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            }
        },
        created() {
            this.render()
        }
    };
</script>