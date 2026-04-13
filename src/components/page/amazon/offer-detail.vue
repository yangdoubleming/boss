<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <table-page :tableData="tableData" :tableOperate="tableOperate" :columns="columns" :totalSize="totalSize"
            @conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" :detailTable="true" />
        <!-- @changeStatus="changeStatus" -->
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { offerDetail } from '../../../api/index';
export default {
    name: 'offer-detail',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            dialogFormVisible: false,
            tableOperate: [],
            tableData: [],

            offerId: '',

            columns: [    // 列表展示的字段
                {
                    label: 'offerId',
                    prop: 'offerId',
                    color: '#fe1964',
                    width: 230
                },

                {
                    label: '申请单编号',
                    prop: 'applicationCode',
                },
                {
                    label: this.$t('loan_detail_sqzt'),
                    prop: 'applicationStatus',
                    width: '120'
                },
                {
                    label: this.$t('loan_detail_sqsj'),
                    prop: 'applicationTime',
                },
                {
                    label: '预授信金额',
                    prop: 'applicationAmount',
                    width: '120'
                },

                {
                    label: '授信金额',
                    prop: 'creditAmount'
                },
                {
                    label: '锁定状态',
                    prop: 'lockStatus'
                },

                {
                    label: '资方名称',
                    prop: 'lenderName'
                },

                {
                    label: '产品名称',
                    prop: 'productName'
                }
            ],
            baseUrl: process.env.VUE_APP_BASE_URL,
            totalSize: 0,
        };
    },
    created() {
    },
    activated() {
        this._getList()
    },
    methods: {
        changeStatus() {
            this.offerId = this.$route.query.offerId;
            this.currentPage = 1;
            this._getList();
        },
        _getList() {
            console.log("currentPage ====== " + this.currentPage)
            offerDetail(
                this.$route.query.offerId,
                this.currentPage,
            ).then((res) => {
                this.tableData = res.data.records || [];
                console.log("this.tableData = " + this.tableData.createTime);
                console.log(res.data.total);
                this.totalSize = res.data.total || 0;
            });
        },
    }
};
</script>

<style lang='less' scoped>
/* 谷歌 */
/deep/input::-webkit-outer-spin-button,
/deep/input::-webkit-inner-spin-button {
    -webkit-appearance: normal !important;
    appearance: normal !important;
}

/* 火狐 */
/deep/input {
    -moz-appearance: normal !important;
}

/deep/.el-upload--text {
    width: 360px !important;
    height: 178px !important;
    display: block !important;
    border: 1px dashed #CED1D5;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 360px !important;
    height: 178px !important;
    display: block !important;
}

.clearfix {
    font-size: 18px;
    // padding-left: 18px;
    padding-bottom: 20px;
}

/deep/.el-form-item .form-margin .el-form-item--small .form-margin {
    margin-right: 30px !important;
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
