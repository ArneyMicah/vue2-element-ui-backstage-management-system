<style lang="scss" scoped>
    @import '../../style/style.scss';

    .categories {
        padding: 15px;

        .content {
            @include content;

            .search {
                display: flex;
                align-items: center;
            }
        }
    }
</style>
<template>
    <div class="categories">
        <Bread administer="商品管理" tabulation="商品分类"></Bread>
        <div class="content">
            <div class="search">
                <el-input placeholder="请输入内容" v-model="searchValue">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="primary" @click="addCateInfo = true">添加分类</el-button>
            </div>
            <div class="zk-table">
                <zk-table ref="table" class="tb-cate" index-text="#" show-index stripe border :data="tableData" :columns="columns" :expand-type="false" :selection-type="false">
                    <template slot="valid" slot-scope="scope">
                        <i class="el-icon-success" v-if="!scope.row.cat_deleted" style="color: lightGreen"></i>
                        <i class="el-icon-error" v-else style="color: red"></i>
                    </template>
                    <template slot="level" slot-scope="scope">
                        <el-tag type="primary" effect="plain" size="mini" v-show="scope.row.cat_level == 0">一级</el-tag>
                        <el-tag type="success" effect="plain" size="mini" v-show="scope.row.cat_level == 1">二级</el-tag>
                        <el-tag type="warning" effect="plain" size="mini" v-show="scope.row.cat_level == 2">三级</el-tag>
                    </template>
                    <template slot="operate" slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEditInfo(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row.cat_id)">删除</el-button>
                    </template>
                </zk-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="addCate">
            <el-dialog title="添加分类" :visible.sync="addCateInfo" width="40%">
                <el-form label-position="left" :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" :hide-required-asterisk="hiderequired">
                    <el-form-item label="分类名称" prop="cat_name">
                        <el-input v-model="ruleForm.cat_name"></el-input>
                    </el-form-item>
                    <el-form-item label="父级分类">
                        <el-cascader v-model="classFather" :options="options" :props="{ checkStrictly: true, value: 'cat_id', label: 'cat_name'}" clearable @change="handleChange"></el-cascader>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addCateInfo = false">取 消</el-button>
                    <el-button type="primary" @click="addCateList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="editCate">
            <el-dialog title="编辑分类" :visible.sync="editCateInfo" width="40%">
                <el-form label-position="left" :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" :hide-required-asterisk="hiderequired">
                    <el-form-item label="分类名称" prop="cat_name">
                        <el-input v-model="ruleForm.cat_name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editCateInfo = false">取 消</el-button>
                    <el-button type="primary" @click="editCateList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getProductCategoryList, addProductCategory, editProductCategory, deleteProductCategory } from '../../utils/api'
    export default {
        data() {
            return {
                editCateInfo: false,
                hiderequired: true,
                addCateInfo: false,
                options: [],
                optionsId: '',
                searchValue: '',
                classFather: [],
                columns: [
                    { label: "分类名称", prop: "cat_name" },
                    {
                        label: "是否有效",
                        prop: "cat_deleted",
                        type: "template",
                        template: "valid",
                    },
                    {
                        label: "分类等级",
                        prop: "cat_level",
                        type: "template",
                        template: "level"
                    },
                    {
                        label: '操作',
                        type: 'template',
                        template: 'operate'
                    }
                ],
                tableData: [],
                total: 0,
                page: {
                    type: [1, 2, 3],
                    pagenum: 1,
                    pagesize: 10,
                },
                ruleForm: {
                    cat_name: '',
                    cat_level: 0,
                    cat_pid: 0,
                },
                rules: {
                    cat_name: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                },
            };
        },
        methods: {
            async render() {
                let OneRes = await getProductCategoryList()
                console.log(OneRes);
                this.options = OneRes.data
                let TwoRes = await getProductCategoryList(this.page)
                this.tableData = TwoRes.data.result
                this.total = TwoRes.data.total
            },
            handleSizeChange(value) {
                this.page.pagesize = value
                this.render()
            },
            handleCurrentChange(value) {
                this.page.pagenum = value
                this.render()
            },
            handleChange() {
                console.log(this.classFather.length);
                if (this.classFather.length == 0) {
                    this.ruleForm.cat_pid = 0
                    this.ruleForm.cat_level = 0
                } else if (this.classFather.length == 1) {
                    this.ruleForm.cat_pid = this.classFather[0]
                    this.ruleForm.cat_level = 1
                } else if (this.classFather.length == 2 || this.classFather.length == 3) {
                    this.ruleForm.cat_pid = this.classFather[1]
                    this.ruleForm.cat_level = 2
                }
            },
            addCateList() {
                this.$refs.ruleForm.validate(async valid => {
                    if (valid) {
                        await addProductCategory(this.ruleForm)
                        this.addCateInfo = false
                        this.ruleForm.cat_name = ''
                        this.classFather = ''
                        this.render()
                    }
                })
            },
            handleEditInfo(item) {
                this.ruleForm = item
                this.optionsId = item.cat_id
                this.editCateInfo = true
            },
            async editCateList() {
                let data = {
                    id: this.optionsId,
                    cat_name: this.ruleForm.cat_name,
                }
                let res = await editProductCategory(data)
                console.log(res);
                this.editCateInfo = false
                this.render()
            },
            async handleDelete(id) {
                this.$confirm('确定删除该分类吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let data = { id: id }
                    await deleteProductCategory(data)
                    this.render()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                F
            }
        },
        created() {
            this.render()
        }
    };
</script>