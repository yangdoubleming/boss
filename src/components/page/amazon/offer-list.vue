<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <table-page :tableData="tableData" :showFilterRadio="true" :tableOperate="tableOperate"
            :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize"
            @conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
            :applicationStatus="applicationStatus" @changeStatus="changeStatus" @page-change="handlePageChange"
            :filterStatus='filterStatus' />
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { offerList, lenderList, getProducts } from '../../../api/index';
export default {
    name: 'offer-list',
    components: {
        tablePage
    },
    data() {
        return {
            currentPage: 1,//页码
            totalSize: 0,//数据总条数
            tableData: [],
            dialogFormVisible: false,
            tableOperate: [],
            offerAmountSum: '',
            tableData: [],
            applicationStatus: '',
            loanStatus: '',
            filterStatus: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '已创建',
                    value: 'CREATED',
                },
                {
                    label: '已提交',
                    value: 'SUBMITTED',
                },
                {
                    label: '已初核',
                    value: 'RECEIVED_1ST',
                },
                {
                    label: '已复核',
                    value: 'RECEIVED_2ND',
                },
                {
                    label: '已批准',
                    value: 'APPROVED',
                },
                {
                    label: '已拒绝',
                    value: 'REJECTED',
                },
                {
                    label: '已放款',
                    value: 'DISBURSED',
                },
                {
                    label: '已放弃',
                    value: 'ABANDONED',
                },
                {
                    label: '已关闭',
                    value: 'CLOSED',
                }
            ],
            filterOptions: [   // 查询条件
                {
                    type: 'select',
                    value: '',
                    placeholder: '资方名称',
                    filterable: true,
                    options: []
                },

                {
                    type: 'select',
                    value: '',
                    placeholder: '产品名称',
                    filterable: true,
                    options: []
                },

                {
                    type: 'input',
                    value: '',
                    placeholder: '用户手机号',
                    filterable: true,
                    options: []
                },

                {
                    type: 'select',
                    placeholder: '店铺锁定状态',
                    value: '',
                    options: [
                        {
                            label: '无锁',
                            value: 'UNLOCK'
                        },
                        {
                            label: '单锁',
                            value: 'LOCK'
                        },
                        {
                            label: '双锁',
                            value: 'DOUBLE_LOCK'
                        },
                    ]
                },
                {
                    type: 'daterange',
                    value: [],
                    placeholderArr: ['放款开始时间', '放款结束时间'],
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: 'offerId',
                    filterable: true,
                    options: []
                },
            ],
            columns: [    // 列表展示的字段
                {
                    label: 'offerId',
                    prop: 'offerId',
                    width: 270
                },
                {
                    label: '店铺名称',
                    prop: 'shopName',
                    width: 250
                },
                {
                    label: 'offer来源',
                    prop: 'offerSource',
                    width: 140
                },
                {
                    label: 'offer状态',
                    prop: 'offerStatus',
                    width: 140
                },
                {
                    label: '平台所属国家',
                    prop: 'marketplaceCountry',
                    width: 160
                },
                {
                    label: '用户手机号',
                    prop: 'account',
                    width: 150
                },
                {
                    label: this.$t('home_zjffb'),
                    prop: 'lenderName',
                    width: 150
                },
                {
                    label: '产品名称',
                    prop: 'productName',
                    width: 180
                },
                {
                    label: this.$t('loan_detail_sqzt'),
                    prop: 'applicationStatus',
                    width: 140
                },
                {
                    label: '锁定状态',
                    prop: 'lockStatus',
                    width: 140
                },
                {
                    label: '预授信金额',
                    prop: 'applicationAmount',
                    width: 150
                },
                {
                    label: '授信金额',
                    prop: 'creditAmount',
                    width: 140
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 200
                },
                {
                    label: this.$t('loan_detail_sqsj'),
                    prop: 'applicationTime',
                    width: 200
                },
            ],
            baseUrl: process.env.VUE_APP_BASE_URL,
        };
    },
    created() {
        if (this.$route.query.isToday) {
            this.filterOptions[4].value = []
            this.filterOptions[4].value[0] = this.getCurentTime(false)
            this.filterOptions[4].value[1] = this.getCurentTime(false)

        }
        this._getList()
    },
    activated() {
    },
    methods: {
        getCurentTime(isTime = true) {
            var now = new Date();
            var clock = "";
            var year = now.getFullYear();       // 年
            clock += year + "-";
            var month = now.getMonth() + 1;     // 月
            if (month < 10) {
                clock += "0";
            }
            clock += month + "-";
            var day = now.getDate();            // 日
            if (day < 10) {
                clock += "0";
            }
            if (isTime == true) {
                clock += day + " ";
                var hh = now.getHours();            // 时
                if (hh < 10) {
                    clock += "0";
                }

                clock += hh + ":";
                var mm = now.getMinutes();     // 分
                if (mm < 10) {
                    clock += '0';
                }
                clock += mm + ":";
                var ss = now.getSeconds();     // 秒
                if (ss < 10) {
                    clock += '0';
                }
                clock += ss;
            }
            if (isTime == false) {
                clock += day;
            }
            return clock;
        },
        changeStatus(val) {
            this.applicationStatus = val;
            this.currentPage = 1;
            this._getList();
        },
        _getList() {
            getProducts('').then((res) => {
                res.data.forEach(item => {
                    item.value = item.id,
                        item.label = item.productName
                })
                this.filterOptions[1].options = res.data;
            });
            lenderList().then((res) => {
                res.data.forEach((item) => {
                    item.label = item.lenderName;
                    item.value = item.id;
                });
                this.filterOptions[0].options = res.data;
            });
            let starTime = this.filterOptions[4].value.length ? this.filterOptions[4].value[0] + ' 00:00:00' : '';
            let endTime = this.filterOptions[4].value.length ? this.filterOptions[4].value[1] + ' 23:59:59' : '';

            offerList({
                lenderName: this.filterOptions[0].value,
                productName: this.filterOptions[1].value,
                account: this.filterOptions[2].value,   // 用户手机号
                applicationStatus: this.applicationStatus,
                lockStatus: this.filterOptions[3].value,
                loanStatus: this.$route.query.loanStatus,  // 今日放款跳转传递
                loanApplyDateBegin: this.$route.query.loanApplyDateBegin,  // 今日放款跳转传递
                current: this.currentPage,
                size: 10,
                loanStartDateBegin: starTime,
                loanStartDateEnd: endTime,
                offerId: this.filterOptions[5].value
            }).then((res) => {
                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;
            });
        },
        handleConditionalQuery() {

            this._getListFirstPage()
        },
        //重置
        handleConditionalReset() {

            this.filterOptions.forEach(item => {
                item.value = ''
            })
            this._getListFirstPage()
        },
        //查询
        handleColumnsFilter(val) {
            // this.columns.forEach(item => {
            //     if (item.label === Object.keys(val)[0]) {
            //         item.filtersVal = Object.values(val)[0]
            //     }
            // })
            this.currentPage = 1

            this._getList()
        },
        handlePageChange(page) {

            this.currentPage = page
            this._getList()
        },
        //     formatJson(filterVal, jsonData) {
        //       return jsonData.map(v => filterVal.map(j => {
        //         return v[j]
        //       }))
        //     },
        _getListFirstPage() {
            this.currentPage = 1

            this._getList()
        }
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