<style lang="scss" scoped>
    .params {
        padding: 10px;

        .content {
            background-color: rgba(255, 255, 255, 0.411);
            padding: 10px;
            border-radius: 10px;
            opacity: 0.8;

            .header {
                display: flex;
                align-items: center;
            }
        }
    }
</style>
<template>
    <div class="params">
        <el-alert title="警告提示的文案" type="warning" center show-icon></el-alert>
        <div class="content">
            <div class="header">
                <p>选择商品分类: <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>
                </p>
                <p>
                    <el-button type="primary">添加分类</el-button>
                </p>
            </div>
            <div class="el-tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="动态参数" name="first">动态参数</el-tab-pane>
                    <el-tab-pane label="静态属性" name="second">静态属性</el-tab-pane>
                </el-tabs>
            </div>
            <div class="el-table-list">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="date" label="参数名称" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="argument">
            <el-dialog title="添加参数" :visible.sync="addArgument" width="40%">
                <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" :hide-required-asterisk="hideRequired">
                    <el-form-item label="参数名称">
                        <el-input v-model="argumentInput"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addArgument = false">取 消</el-button>
                    <el-button type="primary">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                hideRequired: true,
                value: '',
                options: [],
                activeName: 'first',
                tableData: [],
                addArgument: false,
                ruleForm: {
                    argumentInput: '',
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
            handleChange(value) {
                this.value = value;
            },
            handleClick() {

            }
        },
    };
</script>