<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <!-- ============================自营额度计算======================================================================================================================== -->
        <el-dialog title="ALG核额计算" :visible.sync="showALGVerify">
            <xtable
                v-if="showALGVerify"
                :columns="ALGVerifyColumns"
                :detailTable="true"
                :tableData="ALGVerifyData"
                :show-summary="true"
                :max-height="400"
            />
        </el-dialog>
        <el-dialog title="宇商核额计算" :visible.sync="showYuShangVerify">
            <xtable
                v-if="showYuShangVerify"
                :columns="YuShangVerifyColumns"
                :detailTable="true"
                :tableData="YuShangVerifyData"
                :show-summary="true"
                :max-height="400"
            />
        </el-dialog>
        <el-dialog title="DCL核额计算" :visible.sync="showUCSVerify">
            <xtable
                v-if="showUCSVerify"
                :columns="UCSVerifyColumns"
                :detailTable="true"
                :tableData="UCSVerifyData"
                :show-summary="true"
                :max-height="400"
            />
        </el-dialog>
        <!-- ============================自营额度计算结束======================================================================================================================== -->

        <table-page
            :sendEmail="true"
            :tableData="tableData"
            :tableOperate="tableOperate"
            :filterOptions="filterOptions"
            :columns="columns"
            :totalSize="totalSize"
            @_sendEmail="_sendEmail"
            @_untie="_untie"
            :detailTable="detailTable"
            :loading="!detailTable"
            @conditional-query="handleConditionalQuery"
            :current="currentPage"
            @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange"
            :ALGVerify="true"
            :YuShangVerify="true"
            :UCSVerify="true"
            @onALGVerify="onALGVerify"
            @onYuShangVerify="onYuShangVerify"
            @onUCSVerify="onUCSVerify"
            @showDetail="_showDetail"
            @Unbind="_Unbind"
            :hfDataExport="true"
            :zhadaDataExport="true"
            @onZhaDaDataExport="onZhaDaDataExport"
            @onHfDataExport="onHfDataExport"
            :hkhfDataExport="true"
            :huiFengPiliangdaochu="true"
            @onHKHfDataExport="onHKHfDataExport"
            @onExportByUser="onExportByUser"
            :isShowSelection="true"
            :isShowIndex="true"
            @select="select"
        />
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getMultipleInvestorApplyDetail, send3plData, getShopByOfferId } from '../../../api/index';
import { ALGVerify } from '@/api/boss1';
import { YuShangVerify } from '../../../api/index';
import { UCSVerify } from '../../../api/index';
import { Unbind, unbindBatch } from '../../../api/index';
import xtable from '../../common/Xtable.vue';
import axios from 'axios';
import CryptoJS from 'crypto-js';
export default {
    name: 'search-store',
    mixins: [tableMixin],
    components: {
        tablePage,
        xtable
    },
    data() {
        return {
            shopCount: 0,
            checkShop: 0,
            dialogVisible: false,
            tableOperate: [],
            tableData: [],
            detailTable: true,
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '用户名',
                    filterable: true,
                    options: []
                },

                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_serch_phone'),
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

                {
                    type: 'input',
                    value: '',
                    placeholder: 'sellerId',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '用户ID',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '店铺名称',
                    filterable: true,
                    options: []
                }
            ],
            showEnable: false,
            multipleSelection: [],
            choose: '',
            enbleData: [],
            columns: [
                {
                    label: '加密offerId',
                    prop: 'offerIdMd5',
                    width: 400
                },
                {
                    label: 'offerID',
                    prop: 'offerId',
                    width: 400
                },
                {
                    label: 'userID',
                    prop: 'userId'
                },
                {
                    label: '店铺名称',
                    prop: 'shopName'
                },
                {
                    label: 'sellerID',
                    prop: 'sellerId'
                },
                {
                    label: '手机号',
                    prop: 'phone'
                },
                {
                    label: '绑定时间',
                    prop: 'bindTime'
                },
                {
                    label: 'offer来源',
                    prop: 'offerSource'
                },
                {
                    label: 'offer状态',
                    prop: 'offerStatus'
                },
                {
                    label: '回款账户后三位',
                    prop: 'accountTail',
                    width: 120
                },
                {
                    label: '数据拉取状态',
                    prop: 'dataStatus',
                    width: 120
                },
                {
                    label: 'SP店铺授权状态',
                    prop: 'spAuthStatus',
                    width: 120
                },
                {
                    label: '店铺状态',
                    prop: 'shopStatus'
                },
                {
                    label: '豆沙包sellerID',
                    prop: 'dowsureSellerId',
                    width: 120
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '180',
                    operates: [
                        {
                            event: 'showDetail',
                            text: '详情',
                            type: 'primary'
                        },
                        {
                            event: 'Unbind',
                            text: '解除绑定',
                            type: 'primary'
                        }
                    ],

                    fixed: 'right'
                }
            ],
            loading: !this.detailTable,
            ALGVerifyColumns: [
                {
                    label: 'offerID',
                    prop: 'offerId',
                    width: 400
                },
                {
                    label: this.$t('loan_detail_zd'),
                    prop: 'place'
                },
                {
                    label: '第一次店铺额度(美元)',
                    prop: 'firstShopAmount'
                },
                {
                    label: '最新店铺额度(美元)',
                    prop: 'latestShopAmount'
                }
            ],
            YuShangVerifyColumns: [
                {
                    label: 'offerID',
                    prop: 'offerId',
                    width: 400
                },
                {
                    label: this.$t('loan_detail_zd'),
                    prop: 'place'
                },
                {
                    label: '预授信额度(元)',
                    prop: 'preCreditAmount'
                }
            ],
            UCSVerifyColumns: [
                {
                    label: 'offerID',
                    prop: 'offerId',
                    width: 360
                },
                {
                    label: this.$t('loan_detail_zd'),
                    prop: 'place'
                },
                {
                    label: '近一年销售额(元)',
                    prop: 'y1SalesValue',
                    width: 115
                },
                {
                    label: '近一年回款额(元)',
                    prop: 'y1DisValue',
                    width: 115
                },
                {
                    label: '3倍月均回款(元)',
                    prop: 'month12Avg3xDisValue',
                    width: 110
                },
                {
                    label: 'DCL额度(元)',
                    prop: 'preCreditAmount'
                }
            ],
            selectOptions: [],
            showALGVerify: false,
            showYuShangVerify: false,
            showUCSVerify: false,
            ALGVerifyData: [],
            YuShangVerifyData: [],
            UCSVerifyData: [],
            hfDataExport: [],
            hkhfDataExport: []
        };
    },
    created() {
        // this._showDetail()
    },
    methods: {
        _showDetail(val) {
            this.$router.push({
                path: '/store-detail',
                query: {
                    loanNumber: val.applicationCode,
                    offerId: val.offerId
                }
            });
        },
        _sendEmail(type) {
            if (!this.filterOptions[0].value || !this.filterOptions[1].value) {
                this.$message.warning('请输入用户名和手机号');
                return false;
            }
            send3plData({
                realName: this.filterOptions[0].value,
                account: this.filterOptions[1].value,
                type: type
            }).then((res) => {
                console.log(res);
                this.$message.success('操作成功！');
            });
        },
        _untie() {
            if (this.tableData.length === 0) {
                this.$message.warning('请先查找数据');
                return;
            } else if (this.selectOptions.length === 0) {
                this.$message.warning('请选择店铺');
                return;
            }
            this.$confirm('请确认是否解除绑定?', '申请确认操作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                let offerIds = this.selectOptions.map((x) => x.offerId);
                unbindBatch(offerIds).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: '批量解绑成功',
                            type: 'success'
                        });
                        this._getList;
                    } else {
                        this.$message({
                            message: '发生错误，请联系管理员。',
                            type: 'error'
                        });
                    }
                });
            });
        },
        _getList() {
            if (
                !this.filterOptions[0].value &&
                !this.filterOptions[1].value &&
                !this.filterOptions[2].value &&
                !this.filterOptions[3].value &&
                !this.filterOptions[4].value &&
                !this.filterOptions[5].value
            ) {
                return false;
            }
            this.filterOptions[2].value = encodeURIComponent(this.filterOptions[2].value);
            this.detailTable = false;
            getMultipleInvestorApplyDetail({
                account: this.filterOptions[1].value,
                realName: this.filterOptions[0].value,
                offerId: this.filterOptions[2].value,
                sellerId: this.filterOptions[3].value,
                userId: this.filterOptions[4].value,
                shopName: this.filterOptions[5].value
            }).then((res) => {
                this.detailTable = true;
                res.data.forEach((item) => {
                    if (item.sellerIds) {
                        if (item.sellerIds.length > 1) {
                            item.sellerIds = item.sellerIds.join('，');
                        } else {
                            item.sellerIds = item.sellerIds.join('');
                        }
                    }
                    if (item.spAuthStatus == 'AUTHORIZED') {
                        item.spAuthStatus = '已授权';
                    } else if (item.spAuthStatus == 'UNAUTHORIZED') {
                        item.spAuthStatus = '未授权';
                    }
                    this.detailTable = true;
                });
                this.tableData = res.data.map(row => ({
                    ...row,
                    offerIdMd5: row.offerId ? CryptoJS.MD5(row.offerId).toString() : ''
                }));
                this.shopCount = this.tableData.length;
                this.totalSize = 1;
            });
        },
        onALGVerify() {
            if (this.tableData.length === 0) {
                this.$message.warning('请先查找数据');
                return;
            } else if (this.selectOptions.length === 0) {
                this.$message.warning('请选择店铺');
                return;
            }
            let offerIds = this.selectOptions.map((x) => x.offerId);
            let param = offerIds.join();
            ALGVerify(param).then((res) => {
                this.ALGVerifyData = res.data.map((x) => {
                    x['place'] = x.offerId.split('.')[3];
                    return x;
                });
            });
            this.showALGVerify = true;
        },
        onYuShangVerify() {
            if (this.tableData.length === 0) {
                this.$message.warning('请先查找数据');
                return;
            } else if (this.selectOptions.length === 0) {
                this.$message.warning('请选择店铺');
                return;
            }
            let offerIds = this.selectOptions.map((x) => x.offerId);
            // let param = offerIds.join();
            YuShangVerify(offerIds).then((res) => {
                this.YuShangVerifyData = res.data.map((x) => {
                    x['offerId'] = x.offerId;
                    x['place'] = x.marketplaceCountry;
                    x['preCreditAmount'] = x.preCreditAmount;
                    return x;
                });
            });
            this.showYuShangVerify = true;
        },
        onUCSVerify() {
            if (this.tableData.length === 0) {
                this.$message.warning('请先查找数据');
                return;
            } else if (this.selectOptions.length === 0) {
                this.$message.warning('请选择店铺');
                return;
            }
            let offerIds = this.selectOptions.map((x) => x.offerId);

            UCSVerify(offerIds).then((res) => {
                this.UCSVerifyData = res.data.map((x) => {
                    x['offerId'] = x.offerId;
                    x['place'] = x.marketplaceCountry;
                    x['y1SalesValue'] = x.y1SalesValue;
                    x['y1DisValue'] = x.y1DisValue;
                    x['month12Avg3xDisValue'] = x.month12Avg3xDisValue;
                    x['preCreditAmount'] = x.preCreditAmount;
                    return x;
                });
            });
            console.log('🚀 ~ UCSVerify ~ this.checkShop:', this.checkShop);
            this.showUCSVerify = true;
        },
        onZhaDaDataExport(){
            if (this.tableData.length === 0) {
                this.$message.warning('请先查找数据');
                return;
            } else if (this.selectOptions.length === 0) {
                this.$message.warning('请选择店铺');
                return;
            }
            let that = this;
            let dataObj = {
                offerIds: this.selectOptions.map((x) => x.offerId),
                lenderId: 73,
                userId: this.selectOptions[0].userId
            };
            const axios = require('axios');
            axios({
                method: 'post',
                data: dataObj,
                responseType: 'blob',
                url: `${process.env.VUE_APP_BASE_URL}/lending/scb/csv/zip`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    var blob = new Blob([res.data]);
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `渣打文件材料.zip`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                    that.isExporting = false;
                })
                .catch((error) => {
                    this.$message.info(error.message);
                });
        },
        onHfDataExport() {
            if (this.tableData.length === 0) {
                this.$message.warning('请先查找数据');
                return;
            } else if (this.selectOptions.length === 0) {
                this.$message.warning('请选择店铺');
                return;
            }
            let that = this;
            let dataObj = {
                offerIds: this.selectOptions.map((x) => x.offerId),
                lenderId: 7,
                currency: ''
            };
            const axios = require('axios');
            axios({
                method: 'post',
                data: dataObj,
                responseType: 'blob',
                url: `${process.env.VUE_APP_BASE_URL}/lending/offer/lender/data/export`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `report.xlsx`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                    that.isExporting = false;
                })
                .catch((error) => {
                    this.$message.info(error.message);
                });
        },
        onHKHfDataExport() {
            if (this.tableData.length === 0) {
                this.$message.warning('请先查找数据');
                return;
            } else if (this.selectOptions.length === 0) {
                this.$message.warning('请选择店铺');
                return;
            }
            let that = this;
            let dataObj = {
                offerIds: this.selectOptions.map((x) => x.offerId),
                lenderId: 46,
                currency: ''
            };
            const axios = require('axios');
            axios({
                method: 'post',
                data: dataObj,
                responseType: 'blob',
                url: `${process.env.VUE_APP_BASE_URL}/lending/offer/lender/data/export/hkhf`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `report.xlsx`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                    that.isExporting = false;
                })
                .catch((error) => {
                    this.$message.info(error.message);
                });
        },
        onExportByUser() {
            if (this.tableData.length === 0) {
                this.$message.warning('请先查找数据');
                return;
            }
            const account = this.filterOptions[0].value;
            const realName = this.filterOptions[1].value;
            const offerId = encodeURIComponent(this.filterOptions[2].value);
            const sellerId = this.filterOptions[3].value;
            const userId = this.filterOptions[4].value;
            const axios = require('axios');
            let that = this;
            axios({
                method: 'get',
                responseType: 'blob',
                url: `${process.env.VUE_APP_BASE_URL}/lending/offer/exportByUser?account=${account}&realName=${realName}&offerId=${offerId}&sellerId=${sellerId}&userId=${userId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    console.log(res);
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `report.xlsx`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                    that.isExporting = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        select(val) {
            this.selectOptions = val;
        },
        _Unbind(row) {
            this.$confirm('请确认是否解除绑定?', '申请确认操作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                var offerId = encodeURIComponent(row.offerId);
                Unbind(offerId).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: '解绑成功',
                            type: 'success'
                        });
                        this._getList;
                    } else {
                        this.$message({
                            message: '发生错误，请联系管理员。',
                            type: 'error'
                        });
                    }
                });
            });
        }
    }
};
</script>

<style lang="less" scoped>
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
