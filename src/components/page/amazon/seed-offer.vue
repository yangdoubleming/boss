<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <table-page :detailTable="true" :tableData="tableData" :showFilterRadio="false" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" @quote="edit" @conditional-query="handleColumnsFilter"
            :current="currentPage" @conditional-reset="handleConditionalReset" @page-change="handlePageChange"
            @handle="_handle" @export="_export" />
        <el-dialog title="店铺详情" :visible.sync="dialogFormVisible" width="1200px">
            <xtable @edit="tableEvent" :columns="columns2" :detailTable="true" :tableData="pageData" />
        </el-dialog>
        <el-dialog title="Offer确认操作" :visible.sync="dialogFormVisible2" width="500px">
            <el-form ref="form" label-width="80px">
                <el-form-item label="发送状态">
                    <el-select v-model="form.status" :placeholder="$t('loan_detail_choose')" style="width: 220px;">
                        <el-option label="成功" value="1"></el-option>
                        <el-option label="失败" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="原因" v-if="form.status == '0'">
                    <el-input v-model="form.reason" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="_send">确认</el-button>
                    <el-button @click="dialogFormVisible2 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import xtable from '../../common/Xtable.vue';
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
    creditList,
    creditUpdate,
    lenderList,
    getProductInfo,
    getSeedList,
    getOfferInfoDetail,
    handleOffer,
    seedOffer
} from '../../../api/index';
export default {
    name: 'us-credit',
    mixins: [tableMixin],
    components: {
        tablePage,
        xtable
    },
    data() {
        return {
            pageData: [],
            form: {
                status: '1',
                reason: ''
            },
            productInfo: {},
            dates: [],
            dialogFormVisible: false,
            tableData: [],
            filterOptions: [
                {
                    type: 'select',
                    value: '',
                    placeholder: '状态',
                    filterable: true,
                    options: [
                        {
                            label: '处理中',
                            value: 'SEND_TO_PROCESSING'
                        },
                        {
                            label: '申请成功',
                            value: 'SEND_SUCCESS'
                        },
                        {
                            label: '申请失败',
                            value: 'SEND_FAIL'
                        }
                    ]
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_sqdh'),
                    filterable: true
                },
                {
                    type: 'daterange',
                    value: [],
                    placeholder: '时间',
                    filterable: true,
                    placeholderArr: ['申请开始日期', '申请结束日期'],
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_serch_phone'),
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '借款人',
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '主体类型',
                    filterable: true,
                    options: [
                        {
                            label: '个人',
                            value: 'PERSONAL'
                        },
                        {
                            label: '企业',
                            value: 'ENTERPRISE'
                        }
                    ]
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '合作机构',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: 'SellerId',
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '站点',
                    filterable: true,
                    options: [
                        {
                            label: '美国站',
                            value: 'US'
                        },
                        {
                            label: '德国站',
                            value: 'DE'
                        }
                    ]
                }
            ],
            columns2: [
                {
                    label: 'SellerId',
                    prop: 'sellerId'
                },
                {
                    label: this.$t('loan_detail_zd'),
                    prop: 'region'
                },
                {
                    label: this.$t('loan_detail_hklx'),
                    prop: 'routingNumber'
                },
                {
                    label: 'VA账户',
                    prop: 'vaAccount'
                },
                {
                    label: 'SWIFT code',
                    prop: 'swiftCode'
                },
                {
                    label: '授信额度（元）',
                    prop: 'amount',
                    width: 110
                },
                {
                    label: 'offer发送状态',
                    prop: 'offerSendStatus'
                },
                {
                    label: '发送日期',
                    prop: 'handleTime',
                    width: 150
                },
                {
                    label: '备注',
                    prop: 'reason',
                    width: 220
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '110',
                    operates: [
                        {
                            event: 'send',
                            text: '确认发送',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            applicationCode: '',
            columns: [
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'applicationCode',
                    width: '230'
                },

                {
                    label: this.$t('loan_search_sqrq'),
                    prop: 'createTime',
                    width: 210
                },

                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'borrowerName',
                    width: 200
                },
                {
                    label: '手机号',
                    prop: 'borrowerPhoneNumber',
                    width: 150
                },

                {
                    label: '借款类型',
                    prop: 'borrowerType',
                    width: 140
                },
                {
                    label: '合作机构',
                    prop: 'lenderName',

                    width: 140
                },

                {
                    label: '店铺数量',
                    prop: 'shopNumber',
                    width: '160'
                },
                {
                    label: '处理状态',
                    prop: 'applyStatus',
                    width: 140
                },

                {
                    label: '处理日期',
                    prop: 'handleTime',
                    width: 210
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '330',
                    operates: [
                        {
                            event: 'export',
                            text: '导出',
                            type: 'primary'
                        },
                        {
                            event: 'quote',
                            text: '店铺详情',
                            type: 'primary'
                        },
                        {
                            event: 'handle',
                            text: '确认处理',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            dialogFormVisible2: false
        };
    },
    created() {
        lenderList().then(res => {
            res.data.forEach(item => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            this.filterOptions[6].options = res.data;
        });
    },
    methods: {
        _export(row) {
            this.$export(`/offer/offer-info/export?applicationCode=${row.applicationCode}`)

        },
        _send() {
            if (this.form.status == '0' && !this.form.reason) {
                return this.$message({
                    type: 'warning',
                    message: '请填写原因'
                });
            }
            seedOffer(this.form).then(res => {
                this.dialogFormVisible2 = false;
                this.edit({ applicationCode: this.applicationCode });
                if (res.data) {
                    this.$message({
                        type: 'success',
                        message: '发送成功!'
                    });
                } else {
                    this.$message({
                        type: 'warning',
                        message: '发送失败!'
                    });
                }
                this.form = {
                    status: '1',
                    reason: ''
                };
            });
        },
        _handle(row) {
            this.$confirm('请确认Offer发送申请已经处理完毕?', '申请确认操作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                handleOffer(row.applicationCode).then(res => {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this._getList();
                });
            });
        },
        tableEvent(text, row) {
            this.dialogFormVisible2 = true;
            console.log(row);
            this.form.id = row.id;
        },
        _getList() {
            let params = {
                current: this.currentPage,
                size: 10,
                applyStatus: this.filterOptions[0].value,
                applicationCode: this.filterOptions[1].value,
                applicationTimeStart: this.filterOptions[2].value.length ? this.filterOptions[2].value[0] : '',
                applicationTimeEnd: this.filterOptions[2].value.length ? this.filterOptions[2].value[1] : '',
                borrowerPhoneNumber: this.filterOptions[3].value,
                borrowerName: this.filterOptions[4].value,
                borrowerType: this.filterOptions[5].value,
                lenderId: this.filterOptions[6].value,
                sellerId: this.filterOptions[7].value,
                region: this.filterOptions[8].value
            };

            getSeedList(params).then(res => {
                res.data.records.forEach(item => {
                    item.borrowerType = item.borrowerType === 'PERSONAL' ? '个人' : item.borrowerType === 'ENTERPRISE' ? '企业' : '';
                    item.applyStatus =
                        item.applyStatus === 'SEND_TO_PROCESSING'
                            ? '处理中'
                            : item.applyStatus === 'SEND_SUCCESS'
                                ? '申请成功'
                                : '申请失败';
                    if (item.applyStatus == '申请成功') {
                        item.hiddenBtn = '确认处理';
                    }
                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        edit(row) {
            this.applicationCode = row.applicationCode;
            getOfferInfoDetail(row.applicationCode).then(res => {
                res.data.forEach(item => {
                    item.offerSendStatus =
                        item.offerSendStatus === 'SEND_TO_PROCESSING'
                            ? '处理中'
                            : item.offerSendStatus === 'SEND_SUCCESS'
                                ? '发送成功'
                                : '发送失败';
                    if (item.offerSendStatus == '发送成功') {
                        item.hiddenBtn = '确认发送';
                    }
                });
                this.pageData = res.data;
                this.dialogFormVisible = true;
            });
        }
    }
};
</script>

<style lang='less'>
/* 谷歌 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}

/* 火狐 */
input {
    -moz-appearance: textfield;
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