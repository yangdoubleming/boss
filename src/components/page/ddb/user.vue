<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <table-page :tableData="tableData" :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize"
            @conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" :detailTable="true" @getInfo="_getInfo" />
        <el-drawer size="980px" title="详情" :visible.sync="dialogFormVisible" direction="rtl">

            <el-form :model="formData" ref="ruleForm" label-width="180px" class="demo-ruleForm" inline>
                <el-form-item label="用户编号：" prop="bcName">
                    <span class="text">{{ chooseRow.id || '-' }}</span>
                </el-form-item>
                <el-form-item label="第三方用户号：" prop="bcName">
                    <span class="text">{{ chooseRow.extUserId || '-' }}</span>
                </el-form-item>
                <el-form-item label="用户类型：" prop="bcName">
                    <span class="text">{{ chooseRow.applicationType || '-' }}</span>
                </el-form-item>
                <el-form-item label="手机号：" prop="bcName">
                    <span class="text">{{ chooseRow.tel || '-' }}</span>
                </el-form-item>
                <el-form-item label="用户名称：" prop="bcName">
                    <span class="text">{{ chooseRow.bname || '-' }}</span>
                </el-form-item>
                <el-form-item label="借款人身份证：" prop="bcName">
                    <span class="text">{{ chooseRow.bcardId || '-' }}</span>
                </el-form-item>
                <el-form-item label="公司名称：" prop="bcName">
                    <span class="text">{{ chooseRow.bcName || '-' }}</span>
                </el-form-item>
                <el-form-item label="公司证件号：" prop="bcName">
                    <span class="text">{{ chooseRow.bcCreditcode || '-' }}</span>
                </el-form-item>

                <el-form-item label="借款人地址：" prop="bcName">
                    <span class="text">{{ chooseRow.baddress || '-' }}</span>
                </el-form-item>
                <el-form-item label="开户行：" prop="bcName">
                    <span class="text">{{ chooseRow.bankName || '-' }}</span>
                </el-form-item>
                <el-form-item label="银行账户名：" prop="bcName">
                    <span class="text">{{ chooseRow.name || '-' }}</span>
                </el-form-item>
                <el-form-item label="银行账户：" prop="bcName">
                    <span class="text">{{ chooseRow.bankNo || '-' }}</span>
                </el-form-item>
                <el-form-item label="创建时间：" prop="bcName">
                    <span class="text">{{ chooseRow.createTime || '-' }}</span>
                </el-form-item>

            </el-form>

        </el-drawer>

    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getUserList } from '../../../api/ddb'
export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            chooseRow: {},
            dialogFormVisible: false,
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '用户名称',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '用户号',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '第三方用户号',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '证件号',
                    filterable: true,
                    options: []
                },
                {
                    type: 'daterange',
                    valueFormat: 'yyyy-MM-dd HH:mm:ss',
                    value: '',
                    placeholder: '创建时间',
                    filterable: true,
                    options: []
                },
            ],
            currentPage: 1,
            totalSize: 10,
            tableData: [

            ],

            value: '',
            columns: [
                {
                    label: '用户编号',
                    prop: 'id'
                },
                {
                    label: '第三方用户号',
                    prop: 'extUserId',
                    width: 190
                },
                {
                    label: '用户类型',
                    prop: 'applicationType'
                },
                {
                    label: '手机号',
                    prop: 'tel'
                },
                {
                    label: '用户名称',
                    prop: 'bname'
                },
                {
                    label: '借款人身份证',
                    prop: 'bcardId',
                    width: 180
                },
                {
                    label: '公司名称',
                    prop: 'bcName'
                },
                {
                    label: '公司证件号',
                    prop: 'bcCreditcode',
                    width: 210
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 200
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '120',
                    operates: [
                        {
                            event: 'getInfo',
                            text: '详情',
                            type: 'primary'
                        },
                    ],
                    fixed: 'right'
                }
            ],
        };
    },
    mounted() {

    },
    methods: {
        _getInfo(row) {
            this.chooseRow = row
            this.dialogFormVisible = true
        },
        _getList() {
            let starTime = this.filterOptions[4].value.length ? this.filterOptions[4].value[0] : '';
            let endTime = this.filterOptions[4].value.length ? this.filterOptions[4].value[1] : '';
            getUserList({
                bcName: this.filterOptions[0].value,
                userId: this.filterOptions[1].value,
                extUserId: this.filterOptions[2].value,
                certificateNo: this.filterOptions[3].value,
                beginTime: starTime,
                endTime: endTime,
                current: this.currentPage,
                size: 10,
            }).then((res) => {

                res.data.records.forEach(item => {
                    item.applicationType = item.applicationType == 'COMPANY' ? '公司' : "个人"
                    item.bcardId = item.bcardId ? item.bcardId.replace(/^(.{6})(?:\d+)(.{4})$/, "\$1****\$2") : ''
                    item.tel = item.tel ? item.tel.substring(0, 3) + "****" + item.tel.substring(7) : ''
                })
                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;
            });
        },


    }
};
</script>

<style>
.text {
    width: 280px;
    display: block;
    padding-left: 15px;
    box-sizing: border-box;
}

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