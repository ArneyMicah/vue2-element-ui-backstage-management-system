<style lang="scss" scoped>
    @import '../../style/style.scss';

    .addgoods {
        .content {
            .back {
                font-size: 20px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background-color: rgba(255, 255, 255, 0.449);
                border-radius: 50%;
                color: #fff;
                cursor: pointer;
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

        ::v-deep .ql-editor {
            height: 250px;
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
                    <el-tab-pane align="left" label="商品参数">
                        <el-form label-position="top" label-width="55px">
                            <el-form-item v-for="(item, index) in manyParams" :key="index" :label="item.attr_name">
                                <el-checkbox-group v-model="item.attr_vals">
                                    <el-checkbox border v-for="(ele, index) in item.attr_vals" :key="index" :label="ele"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane align="left" label="商品属性">
                        <el-form label-position="top" label-width="55px" class="demo-ruleForm">
                            <el-form-item v-for="(item, index) in onlyParams" :key="index" :label="item.attr_name">
                                <el-input v-model="item.attr_vals"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
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
                    <el-tab-pane align="center" label="完成">完成</el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import { addGoodsList, getCategories, getCategoriesList } from '../../utils/api.js'
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
                manyParams: [],
                onlyParams: [],
                optionsId: '',
                optionsLength: "",
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
                console.log(value[2]);
                this.optionsId = value[2]
                this.optionsLength = value.length;
                this.ruleForm.goods_cat = value.join(",");
            },
            tabsActive(newValue, oldValue) {
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
                    console.log(data);
                    getCategoriesList(data).then(res => {
                        res.data.forEach(item => {
                            item.attr_vals = item.attr_vals.length > 0 ? item.attr_vals.split(',') : []
                        })
                        this.manyParams = res.data
                        console.log(this.manyParams);
                    })
                }
                if (newValue == 2) {
                    let data = {
                        id: this.optionsId,
                        sel: 'only',
                    }
                    getCategoriesList(data).then(res => {
                        this.onlyParams = res.data
                        console.log(this.onlyParams);
                    })
                }
                this.active = Number(newValue);
            },
            success(val) {
                console.log(val);
                this.addForm.pics.push({ "pic": val.data.tmp_path })
            },
            async addGoods() {
                let manyattrs = this.manyParams.map(item => {
                    return {
                        attr_id: item.attr_id,
                        attr_vals: item.attr_vals.join(',')
                    }
                })
                console.log(manyattrs);
                let onlyattrs = this.onlyParams.map(item => {
                    return {
                        attr_id: item.attr_id,
                        attr_vals: item.attr_vals
                    }
                })
                let attrs = [...manyattrs, ...onlyattrs]
                console.log(attrs);
                // let data = {
                //     goods_name: this.ruleForm.goods_name,
                //     goods_price: this.ruleForm.goods_price,
                //     goods_number: this.ruleForm.goods_number,
                //     goods_weight: this.ruleForm.goods_weight,
                //     goods_cat: this.ruleForm.goods_cat,
                //     goods_introduce: this.addForm.goods_introduce,
                //     pics: this.addForm.pics,
                //     attrs: attrs,
                // }
                let data = {
                    ...this.ruleForm,
                    ...this.addForm,
                    attrs: attrs,
                }
                console.log(data);
                await addGoodsList(data);
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