<style lang="scss" scoped>
    @import '../../style/style.scss';

    .params {
        @include index;

        .content {
            @include content;

            .header {
                display: flex;
                align-items: center;
            }
        }
    }
</style>
<template>
    <div class="params">
        <div class="content">
            <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" center show-icon></el-alert>
            <div class="header">
                <p>选择商品分类: <el-cascader v-model="selectRole" :options="options" @change="handleChange" :props="{value: 'cat_id', label: 'cat_name'}">
                    </el-cascader>
                </p>
            </div>
            <div class="el-tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="动态参数" name="first">
                        <el-button type="primary" size="small" @click="addArgument = true">添加参数</el-button>
                        <div class="el-table-list">
                            <el-table :data="tableData" border stripe>
                                <el-table-column type="index" label="#" align="center">
                                </el-table-column>
                                <el-table-column prop="attr_name" label="参数名称" align="center">
                                </el-table-column>
                                <el-table-column label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
                                        <el-button @click="deleteArgument(scope.row.cat_id, scope.row.attr_id)" type="danger" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="静态属性" name="second">
                        <el-button type="primary" size="small" @click="addAttribute = true">添加属性</el-button>
                        <div class="el-table-list">
                            <el-table :data="dataTable" border stripe>
                                <el-table-column type="index" label="#" align="center">
                                </el-table-column>
                                <el-table-column prop="attr_name" label="属性名称" align="center">
                                </el-table-column>
                                <el-table-column label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
                                        <el-button @click="deleteArgument(scope.row.cat_id, scope.row.attr_id)" type="danger" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="parameter">
            <el-dialog title="添加参数" :visible.sync="addArgument" width="40%">
                <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" :hide-required-asterisk="hideRequired">
                    <el-form-item label="参数名称">
                        <el-input v-model="ruleForm.attr_name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addArgument = false">取 消</el-button>
                    <el-button type="primary" @click="addParameter">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="attribute">
            <el-dialog title="添加属性" :visible.sync="addAttribute" width="40%">
                <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" :hide-required-asterisk="hideRequired">
                    <el-form-item label="参数名称">
                        <el-input v-model="ruleForm.attr_name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addAttribute = false">取 消</el-button>
                    <el-button type="primary" @click="addAttributeList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import { getCategories, getCategoriesList, deleteCategories, addCategories } from '../../utils/api.js'
    export default {
        data() {
            return {
                hideRequired: true,
                selectRole: '',
                options: [],
                optionsId: '',
                activeName: 'first',
                tableData: [],
                dataTable: [],
                addArgument: false,
                addAttribute: false,
                sel: 'many',
                ruleForm: {
                    attr_name: '',
                    attr_sel: 'many',
                },
                rules: {
                    argumentInput: [
                        { required: true, message: '请输入参数名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                    ],
                },
            };
        },
        methods: {
            async handleChange(value) {
                if (value.length != 3) {
                    this.sel = 'many'
                    return false
                }
                this.optionsId = value[2];
                this.Parameter()
            },
            async handleClick(value) {
                if (this.optionsId == '') {
                    this.$message.error('请选择分类');
                    return false
                } else if (value.name == 'first') {
                    this.sel = 'many'
                    this.Parameter()
                } else if (value.name == 'second') {
                    this.sel = 'only'
                    this.AttributeList()
                }
            },
            async render() {
                let res = await getCategories()
                console.log(res);
                this.options = res.data
            },
            async deleteArgument(id, attr_id) {
                let data = {
                    id: id,
                    attrid: attr_id,
                }
                let res = await deleteCategories(data)
                if (this.sel == 'many') {
                    this.Parameter()
                } else if (this.sel == 'only') {
                    this.AttributeList()
                }
            },
            async addParameter() {
                let data = {
                    id: this.optionsId,
                    attr_name: this.ruleForm.attr_name,
                    attr_sel: 'many',
                }
                await addCategories(data)
                this.addArgument = false
                this.Parameter()
            },
            async addAttributeList() {
                let data = {
                    id: this.optionsId,
                    attr_name: this.ruleForm.attr_name,
                    attr_sel: 'only',
                }
                await addCategories(data)
                this.addAttribute = false
                this.AttributeList()
            },
            Parameter() {
                let dataMany = {
                    id: this.optionsId,
                    sel: this.sel,
                }
                getCategoriesList(dataMany).then(res => {
                    console.log(res);
                    this.tableData = res.data
                })
            },
            AttributeList() {
                let dataOnly = {
                    id: this.optionsId,
                    sel: this.sel,
                }
                getCategoriesList(dataOnly).then(res => {
                    console.log(res);
                    this.dataTable = res.data
                })
            }
        },
        created() {
            this.render()
            console.log(this.sel);
        }
    };
</script>