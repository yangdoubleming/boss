<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <!-- <table-page
           :detailTable="true"
            :tableData="tableData"
            :showFilterRadio="false"
            :tableOperate="tableOperate"
            :filterOptions="filterOptions"
            :columns="columns"
            :totalSize="totalSize" @conditional-query="handleColumnsFilter"
            :current='currentPage'
            @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange"
        />-->
        <mail-table :tableData="tableData" :totalSize='totalSize' @handleDateChange="handleDateChange"
            @handleCurrentChange='changeCurrent' :tableStyle="{ width: '600px' }"></mail-table>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { conversion } from '../../../api/index';
import mailTable from '../../common/Ytable.vue';
export default {
    name: 'conversion',
    mixins: [tableMixin],
    components: {
        tablePage,
        mailTable
    },
    data() {
        return {
            uploadUrl: 'http://114.116.249.242:8009/dowsure-file/file-upload/uploadImg/upload',
            tableOperate: [],
            tableData: [],
            filterOptions: [],
            columns: [
                {
                    label: '账户锁定数量',
                    prop: 'accountLockCount',
                    width: '140'
                },

                {
                    label: '账户锁定转换率',
                    prop: 'accountLockRate',
                    width: '120'
                },
                {
                    label: '账户锁定总转换率',
                    prop: 'accountLockRateSum',
                    width: '120'
                },

                {
                    label: '预申请通过数量',
                    prop: 'advanceApplicationCount',
                    width: '120'
                },
                {
                    label: '预申请通过转换率',
                    prop: 'advanceApplicationRate',
                    width: '120'
                },

                {
                    label: '预申请通过总转换率',
                    prop: 'advanceApplicationRateSum',
                    width: '140'
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime'
                },
                {
                    label: '签署授信合同数量',
                    prop: 'creditContractCount',
                    width: '120'
                },

                {
                    label: '签署授信合同转换率',
                    prop: 'creditContractRate',
                    width: '140'
                },
                {
                    label: '签署授信合同总转换率',
                    prop: 'creditContractRateSum',
                    width: '140'
                },
                {
                    label: '授信数量',
                    prop: 'creditCount'
                },
                {
                    label: '授信转换率',
                    prop: 'creditRate'
                },
                {
                    label: '授信总转换率',
                    prop: 'creditRateSum',
                    width: '120'
                },
                {
                    label: '授信结果数量',
                    prop: 'creditResultCount',
                    width: '120'
                },
                {
                    label: '授信结果转换率',
                    prop: 'creditResultRate',
                    width: '120'
                },
                {
                    label: '授信结果总转换率',
                    prop: 'creditResultRateSum',
                    width: '120'
                },
                {
                    label: '发起支用数量',
                    prop: 'expenditureCount',
                    width: '120'
                },
                {
                    label: '发起支用转换率',
                    prop: 'expenditureRate',
                    width: '120'
                },
                {
                    label: '发起支用总转换率',
                    prop: 'expenditureRateSum',
                    width: '120'
                },
                {
                    label: '二类户数量',
                    prop: 'iiAccountCount',
                    width: '120'
                },
                {
                    label: '二类户转换率',
                    prop: 'iiAccountRate',
                    width: '120'
                },
                {
                    label: '二类户总转换率',
                    prop: 'iiAccountRateSum',
                    width: '120'
                },
                {
                    label: '放款数量',
                    prop: 'loanCount'
                },
                {
                    label: '放款转换率',
                    prop: 'loanRate '
                },
                {
                    label: '放款总转换率',
                    prop: 'loanRateSum',
                    width: '120'
                },
                {
                    label: '注册offer数量',
                    prop: 'offerCount',
                    width: '120'
                },
                {
                    label: 'offer点击跳转落地页',
                    prop: 'offerJumpCount',
                    width: '140'
                },
                {
                    label: '注册offer转换率',
                    prop: 'offerRate',
                    width: '120'
                },
                {
                    label: '注册offer总转换率',
                    prop: 'offerRateSum',
                    width: '120'
                },
                {
                    label: '支付担保费数量',
                    prop: 'paymentGuaranteeFeeCount',
                    width: '140'
                },
                {
                    label: '支付担保费转换率',
                    prop: 'paymentGuaranteeFeeRate',
                    width: '140'
                },
                {
                    label: '支付担保费总转换率',
                    prop: 'paymentGuaranteeFeeRateSum',
                    width: '140'
                },
                {
                    label: '手机扫码数量',
                    prop: 'phoneCodeScanCount',
                    width: '120'
                },
                {
                    label: '手机扫码转换率',
                    prop: 'phoneCodeScanRate',
                    width: '120'
                },
                {
                    label: '手机扫码总转换率',
                    prop: 'phoneCodeScanRateSum',
                    width: '140'
                },
                {
                    label: this.$t('loan_detail_xgsj'),
                    prop: 'updateTime'
                },
                {
                    label: '注册用户数量',
                    prop: 'userCount',
                    width: '120'
                }

                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     width: '120',
                //     operates: [
                //         {
                //             event: 'quote',
                //             text:this.$t('common_see'),
                //             type: 'primary'
                //         }
                //     ],
                //     fixed: 'right'
                // }
            ],
            productsList: [],
            date: '',
            date2: ''
        };
    },
    created() {
        this.getNowYearOfMonth()
    },
    methods: {
        changeCurrent(val) {
            this.currentPage = val
            this._getList()
        },
        getNowYearOfMonth() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            this.date2 = year + "-" + month;
            console.log(this.date2)
            this.handleDateChange(this.date2)
        },
        handleDateChange(val) {
            this.date = val
            this._getList1()
        },

        _getList1() {
            conversion(this.currentPage, 'ALL', this.date).then((res) => {

                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        }
    }
};
</script>

<style lang='less'>
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
    width: 360px;
    height: 178px;
    display: block;
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