<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.id" placeholder="充值优惠活动"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList();adList = []"></el-button>
                    <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click.native="handleForm(null,null)">新增</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
        <el-table
            v-loading="loading"
            :data="list"
            style="width: 100%;">
            <el-table-column
                label="ID"
                prop="id"
                fixed>
            </el-table-column>
            <el-table-column
                label="店铺头像"
                prop="name"
                fixed>
            </el-table-column>
            <el-table-column
                label="店铺名称"
                prop="introduction"
                with="300"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                label="营业时间"
                prop="name"
                fixed>
            </el-table-column>
            <el-table-column
                label="联系人"
                prop="name"
                fixed>
            </el-table-column>
            <el-table-column
                label="手机号"
                prop="name"
                fixed>
            </el-table-column>
            <el-table-column
                label="商品数量"
                prop="name"
                fixed>
            </el-table-column>
            <el-table-column
                label="添加时间"
                prop="update_time">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.update_time }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click.native="handleForm(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click.native="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            :page-size="query.limit"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>

        <!--表单-->
        <el-dialog
            :title="formMap[formName]"
            :visible.sync="formVisible"
            :before-close="hideForm"
            width="85%"
            top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">
                <el-form-item label="广告位名称" prop="name">
                    <el-input v-model="formData.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="introduction">
                    <el-input v-model="formData.introduction" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
import {
    supplierList,
    supplierAList,
    supplierSave,
    supplierDelete
} from "../../api/supplier/supplier";
const formJson = {
    id: "",
    name: "",
    introduction: "",
};
export default {
    data() {
        return {
            adList: [],
            query: {
                id: "",
                Page: 1,
                Limit: 100,
                page: 1,
                limit: 20
            },
            list: [],
            total: 0,
            loading: true,
            index: null,
            formName: null,
            formMap: {
                add: "新增",
                edit: "编辑"
            },
            formLoading: false,
            formVisible: false,
            formData: formJson,
            formRules: {
                name: [
                    {
                        required: true,
                        message: "请输入广告位名称",
                        trigger: "blur"
                    }
                ]
            },
            deleteLoading: false
        };
    },
    methods: {
        onSubmit() {
            this.$router.push({
                path: "",
                query: this.query
            });
            this.getList();
        },
        handleSizeChange(val) {
            this.query.limit = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.query.page = val;
            this.getList();
        },
        getList() {
            this.loading = true;
            supplierList(this.query)
                .then(response => {
                    this.loading = false;
                    this.list = response.data.list || [];
                    this.total = response.data.total || 0;
                })
                .catch(() => {
                    this.loading = false;
                    this.list = [];
                    this.total = 0;
                });
        },
        getAdList() {
            supplierAList(this.query)
                .then(response => {
                    let adList = response.data || [];
                    for (let item of adList) {
                        let isPush = true;
                        for (let i in this.adList) {
                            if (this.adList[i].key === item.key) {
                                isPush = false;
                            }
                        }
                        if (isPush) {
                            this.adList.push(item);
                        }
                    }
                })
                .catch(() => {
                    this.adList = [];
                });
        },
        leftMore() {
            this.query.Page += 1;
            this.getAdList();
        },
        // 隐藏表单
        hideForm() {
            // 更改值
            this.formVisible = !this.formVisible;
            // 清空表单
            this.$refs["dataForm"].resetFields();
            return true;
        },
        // 显示表单
        formSubmit() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    this.formLoading = true;
                    let data = Object.assign({}, this.formData);
                    supplierSave(data, this.formName).then(res => {
                        this.formLoading = false;
                        if (res.code) {
                            this.$message({
                                message: res.message,
                                type: "error"
                            });
                        } else {
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            // 向头部添加数据
                            // this.list.unshift(res)
                            // 刷新表单
                            this.$refs["dataForm"].resetFields();
                            this.formVisible = false;
                            if (this.formName === "add") {
                                // 向头部添加数据
                                this.list.unshift(res);
                            } else {
                                this.list.splice(this.index, 1, data);
                            }
                        }
                    });
                }
            });
        },
        // 删除
        handleDel(index, row) {
            if (row.id) {
                this.$confirm("确认删除该记录吗?", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        let para = { id: row.id };
                        supplierDelete(para)
                            .then(res => {
                                this.deleteLoading = false;
                                if (res.code) {
                                    this.$message({
                                        message: res.message,
                                        type: "error"
                                    });
                                } else {
                                    this.$message({
                                        message: "删除成功",
                                        type: "success"
                                    });
                                    // 刷新数据
                                    this.list.splice(index, 1);
                                }
                            })
                            .catch(() => {
                                this.deleteLoading = false;
                            });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "取消删除"
                        });
                    });
            }
        },
        resourceSelect(list) {
            if (!list || list.length <= 0) {
                return;
            }
            let file = list[0];
            this.formData.default_pic = file.path;
            this.formData.default_pic_url = file.url;
            this.uploadDialogVisible = false;
        }
    },
    filters: {},
    mounted() {},
    created() {
        // 将参数拷贝进查询对象
        let query = this.$route.query;
        this.query = Object.assign(this.query, query);
        this.query.limit = parseInt(this.query.limit);
        // 加载表格数据
        this.getList();
    }
};
</script>

<style type="text/scss" lang="scss">
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
}
.el-transfer-panel {
    width: 40% !important;
}
@media screen and (max-width: 768px) {
    .el-transfer-panel {
        width: 100% !important;
    }
}
.el-transfer-panel__list.is-filterable {
    height: 150px !important;
}
</style>
