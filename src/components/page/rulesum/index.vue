<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <div style="text-align:right">
            <el-button type="primary" @click="dialogFormVisible = true">新增规则集</el-button>
        </div>
        <table-page :tableData="tableData" :showFilterRadio="false" :columns="columns" :scroll="{ x: 1300 }"
            :totalSize="totalSize" @quote="deleteList" @seeRules="showRules" @page-change="handlePageChange" />
        <!-- ====================================================新增规则========================================================= -->
        <el-dialog title="新增规则集" :visible.sync="dialogFormVisible" width="600px" :before-close="cancelAdd">
            <el-form :model="form" style="padding-left:20px" label-width="150px">
                <el-form-item label="规则集名称">
                    <el-input v-model="form.rulesumName" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="规则集类型">
                    <el-select v-model="form.rulesumType" :placeholder="$t('loan_detail_choose')" style="width:300px">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联产品">
                    <el-input v-model="form.linkProduct" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="业务环节">
                    <el-select v-model="form.step" :placeholder="$t('loan_detail_choose')" style="width:300px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addRoleEvent">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';

export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            form: {
                id: '',
                rulesumName: '',
                coderulesumType: '',
                linkProduct: '',
                step: '',
                createTime: ''
            },
            dialogFormVisible: false, //新增角色
            currentPage: 1,
            totalSize: 10,
            tableData: [
                { id: '0', rulesumName: "跨商贷贷前准入", linkProduct: "跨商贷", step: "贷前", rulesumType: '准入', createTime: '2021-05-01' },
            ],
            options: [{
                value: '贷前',
                label: '贷前'
            }, {
                value: '贷中',
                label: '贷中'
            }, {
                value: '贷后',
                label: '贷后'
            }],
            options2: [
                {
                    value: '准入',
                    label: '准入'
                }, {
                    value: '评分',
                    label: '评分'
                }
            ],
            value: '',
            columns: [
                {
                    label: '规则集名称',
                    prop: 'rulesumName'
                },
                {
                    label: '关联产品',
                    prop: 'linkProduct'
                },
                {
                    label: '业务环节',
                    prop: 'step'
                },
                {
                    label: '规则集类型',
                    prop: 'rulesumType'
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '240',
                    operates: [
                        {
                            event: 'seeRules',
                            text: '查看规则',
                            type: 'primary'
                        },
                        {
                            event: 'quote',
                            text: this.$t('loan_detail_delete'),
                            type: 'primary'
                        },
                    ],
                    fixed: 'right'
                }
            ],
        };
    },
    mounted() {
        localStorage.setItem("rulesumList", JSON.stringify(this.tableData))
        this._getList()
    },
    methods: {
        random(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        // 新增角色
        addRoleEvent() {
            this.dialogFormVisible = false;
            this.tableData.unshift({
                id: String(this.random(5, 100)),
                rulesumName: this.form.rulesumName,
                linkProduct: this.form.linkProduct,
                step: this.form.step,
                rulesumType: this.form.rulesumType,
                createTime: this.formatDate(new Date())
            })
            localStorage.setItem("rulesumList", JSON.stringify(this.tableData))
            this._getList();
            this.$message.success('新增成功！');
            this.cancelAdd()
        },
        _getList() {
            this.tableData = JSON.parse(localStorage.getItem("rulesumList")) || this.tableData
        },
        // 新增规则弹框
        deleteList(val) {
            let list = []
            this.tableData.forEach((item, index) => {
                if (val.id != item.id) {
                    list.push(item)
                }
            })
            this.tableData = list
            localStorage.setItem("rulesumList", JSON.stringify(this.tableData))
            this._getList();
        },
        cancelAdd() {
            this.dialogFormVisible = false
            this.form = {
                id: '',
                rulesumName: '',
                coderulesumType: '',
                linkProduct: '',
                step: '',
                createTime: ''
            }
        },
        showRules(val) {
            this.$router.push(`/rules?id=${val.id}`);
        },
        formatDate(date) {
            var date = new Date(date);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            return YY + MM + DD
        }
    }
};
</script>

<style>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    /* align-items: center; */

    height: 100px;
}

.grid-cont-right {
    height: 100%;
    font-size: 14px;
    color: #999;
    display: flex;
    margin-top: 24px;
    margin-left: 24px;

    flex-direction: column;
}

.grid-num {
    font-size: 16px;
}

.grid-num2 {
    font-size: 16px;
    padding-top: 12px;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgba(0, 0, 0, 0.65);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>