<style lang="scss" scoped>
    @import '../../style/style.scss';

    .params {
        padding: 15px;

        .content {
            @include content;
        }
    }
</style>
<template>
    <div class="params">
        <Bread administer="商品管理" tabulation="参数列表"></Bread>
        <div class="content">
            <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" center show-icon></el-alert>
            <div class="el-header-info">
                <el-form label-position="left" label-width="100px">
                    <el-form-item label="选择商品分类:">
                        <el-cascader style="width: 100%" v-model="goods_cat" :options="options" :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name'}" @change="handleChange"></el-cascader>
                    </el-form-item>
                </el-form>
            </div>
            <div class="el-tags">
                <el-tabs v-model="activeName" :before-leave="beforeLeave">
                    <el-tab-pane label="动态参数" name="first">
                        <div class="el-table-list">
                            <el-button type="primary" :disabled="disabled" size="small" @click="manyParamsTitle = true">添加参数</el-button>
                            <el-table :data="tableData" style="width: 100%" height="480" border>
                                <el-table-column label="#" type="expand" width="55" align="center">
                                    <template slot-scope="scope">
                                        <el-tag :key="index" v-for="(item, index) in scope.row.attr_vals" closable :disable-transitions="false" @close="handleClose(scope.row, index)">
                                            {{item}}
                                        </el-tag>
                                        <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)">
                                        </el-input>
                                        <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column label="#" type="index" width="55" align="center"></el-table-column>
                                <el-table-column label="参数名称" prop="attr_name" align="center"></el-table-column>
                                <el-table-column label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-button type="primary" @click="editParams(scope.row)" size="small">编辑</el-button>
                                        <el-button type="danger" @click="deleteParams(scope.row.attr_id)" size='small'>删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="静态属性" name="second">
                        <div class="el-table-list">
                            <el-button type="primary" :disabled="disabled" size="small" @click="onlyParamsTitle = true">添加属性</el-button>
                            <el-table :data="dataTable" style="width: 100%" height="480" border>
                                <el-table-column label="#" type="expand" width="55" align="center">
                                    <template slot-scope="scope">
                                        <el-tag :key="index" v-for="(item, index) in scope.row.attr_vals" closable :disable-transitions="false" @close="handleClose(scope.row, index)">
                                            {{item}}
                                        </el-tag>
                                        <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)">
                                        </el-input>
                                        <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column label="#" type="index" width="55" align="center"></el-table-column>
                                <el-table-column label="参数名称" prop="attr_name" align="center"></el-table-column>
                                <el-table-column label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-button type="primary" @click="editParams(scope.row)" size="small">编辑</el-button>
                                        <el-button type="danger" @click="deleteParams(scope.row.attr_id)" size='small'>删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="manyparams">
            <el-dialog title="添加动态参数" :visible.sync="manyParamsTitle" width="40%">
                <el-form label-position="left" :model="ruleForm" label-width="70px" :rules="rules" ref="ruleForm" :hide-required-asterisk="hiderequired">
                    <el-form-item label="参数名称" prop="attr_name">
                        <el-input v-model="ruleForm.attr_name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="manyParamsTitle = false">取 消</el-button>
                    <el-button type="primary" @click="AddManyParams">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="onlyparams">
            <el-dialog title="添加静态属性" :visible.sync="onlyParamsTitle" width="40%">
                <el-form label-position="left" :model="ruleForm" label-width="70px" :rules="rules" ref="ruleForm" :hide-required-asterisk="hiderequired">
                    <el-form-item label="属性名称" prop="attr_name">
                        <el-input v-model="ruleForm.attr_name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="onlyParamsTitle = false">取 消</el-button>
                    <el-button type="primary" @click="AddOnlyParams">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="editPaeams">
            <el-dialog title="编辑参数" :visible.sync="ParamsTitle" width="40%">
                <el-form label-position="left" :model="ruleForm" label-width="70px" :rules="rules" ref="ruleForm" :hide-required-asterisk="hiderequired">
                    <el-form-item label="参数名称" prop="attr_name">
                        <el-input v-model="ruleForm.attr_name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="ParamsTitle = false">取 消</el-button>
                    <el-button type="primary" @click="editManyParams">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getProductCategoryList, getProductParamsList, addProductParams, editProductParams, deleteProductParams } from '../../utils/api'
    export default {
        data() {
            return {
                hiderequired: true,
                goods_cat: [],
                options: [],
                optionsId: '',
                attrParId: '',
                activeName: 'first',
                manyParamsTitle: false,
                onlyParamsTitle: false,
                ParamsTitle: false,
                tableData: [],
                dataTable: [],
                ruleForm: {
                    attr_name: '',
                    attr_sel: 'many',
                },
                rules: {
                    attr_name: [
                        { required: true, message: '请输入参数名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                },
                inputValue: '',
                inputVisible: false,
                disabled: true,
            };
        },
        methods: {
            async render() {
                let res = await getProductCategoryList()
                console.log(res);
                this.options = res.data
            },
            async handleChange(val) {
                console.log(val);
                if (val.length == 3) {
                    this.disabled = false
                } else {
                    this.disabled = true
                }
                this.optionsId = val[val.length - 1]
                this.manyParams()
            },
            beforeLeave(val) {
                if (this.optionsId == "") {
                    this.$message({
                        message: '请选择商品分类',
                        type: 'error'
                    });
                    return false
                } else if (val == 'first') {
                    this.ruleForm.attr_sel = 'many'
                    this.manyParams()
                } else if (val == 'second') {
                    this.ruleForm.attr_sel = 'only'
                    this.onlyParams()
                }
            },
            manyParams() {
                let data = {
                    id: this.optionsId,
                    sel: this.ruleForm.attr_sel,
                }
                getProductParamsList(data).then(res => {
                    res.data.forEach(item => {
                        item.inputVisible = false;
                        item.inputValue = '';
                        item.attr_vals = item.attr_vals.length > 0 ? item.attr_vals.split(',') : []
                    })
                    console.log(res);
                    this.tableData = res.data
                })
            },
            onlyParams() {
                let data = {
                    id: this.optionsId,
                    sel: this.ruleForm.attr_sel,
                }
                getProductParamsList(data).then(res => {
                    res.data.forEach(item => {
                        item.inputVisible = false;
                        item.inputValue = '';
                        item.attr_vals = item.attr_vals.length > 0 ? item.attr_vals.split(',') : []
                    })
                    this.dataTable = res.data
                })
            },
            async AddManyParams() {
                this.$refs.ruleForm.validate(async valid => {
                    if (valid) {
                        let data = {
                            id: this.optionsId,
                            attr_sel: 'many',
                            attr_name: this.ruleForm.attr_name,
                        }
                        await addProductParams(data)
                        this.manyParamsTitle = false
                        this.ruleForm.attr_name = ''
                        this.manyParams()
                    }
                })
            },
            async AddOnlyParams() {
                this.$refs.ruleForm.validate(async valid => {
                    if (valid) {
                        let data = {
                            id: this.optionsId,
                            attr_sel: 'only',
                            attr_name: this.ruleForm.attr_name,
                        }
                        await addProductParams(data)
                        this.onlyParamsTitle = false
                        this.ruleForm.attr_name = ''
                        this.onlyParams()
                    }
                })
            },
            async handleClose(item, index) {
                item.attr_vals.splice(index, 1)
                let data = {
                    id: this.optionsId,
                    attrId: item.attr_id,
                    attr_sel: this.ruleForm.attr_sel,
                    attr_vals: item.attr_vals.join(','),
                    attr_name: item.attr_name,
                }
                await editProductParams(data)
            },
            showInput(item) {
                item.inputVisible = true;
                this.$nextTick((_) => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            async handleInputConfirm(item) {
                console.log(item);
                let inputValue = item.inputValue;
                if (inputValue) {
                    item.attr_vals.push(inputValue);
                }
                let data = {
                    id: this.optionsId,
                    attrId: item.attr_id,
                    attr_sel: this.ruleForm.attr_sel,
                    attr_vals: item.attr_vals.join(','),
                    attr_name: item.attr_name,
                }
                await editProductParams(data)
                item.inputVisible = false;
                item.inputValue = '';
            },
            deleteParams(attrId) {
                this.$confirm('确定删除该商品参数吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let data = {
                        id: this.optionsId,
                        attrId: attrId,
                    }
                    await deleteProductParams(data)
                    if (this.ruleForm.attr_sel == 'many') {
                        this.manyParams()
                    } else if (this.ruleForm.attr_sel == 'only') {
                        this.onlyParams()
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            editParams(item) {
                this.ruleForm = item
                this.attrParId = item.attr_id
                this.ParamsTitle = true
            },
            async editManyParams() {
                this.$refs.ruleForm.validate(async valid => {
                    if (valid) {
                        let data = {
                            id: this.optionsId,
                            attrId: this.attrParId,
                            attr_name: this.ruleForm.attr_name,
                            attr_sel: this.ruleForm.attr_sel,
                        }
                        editProductParams(data)
                        this.ParamsTitle = false
                    }
                })
            }
        },
        created() {
            this.render()
        }
    };
</script>