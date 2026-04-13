<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <div style="display: flex; align-items: flex-end; width: 100%; justify-content: flex-end; margin-bottom: 15px">
            <el-button style="float: right" type="primary" @click="openSelectData">批量操作</el-button>
            <!-- <el-button style="float: right" type="primary">导出</el-button> -->
        </div>
        <table-page ref="bossTabel" :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" @quote="_add" :detailTable="true"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" :isShowSelection="true" @select="_select" @sendOffer="_sendOffer" />
        <el-dialog title="核对勾选数据" :visible.sync="dialogFormVisible2" width="85%">
            <xtable :columns="columns3" :detailTable="true" :tableData="selectData" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">关 闭</el-button>
                <el-button type="primary" @click="_add(selectData)">批量加白</el-button>
                <el-button type="primary" @click="_sendOffer(selectData)">批量发送offer</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { addWhiteList, addWhite, sendOffer } from '../../../api/shop-admin';
import xtable from '../../common/Xtable.vue';
export default {
    name: 'channel-operateData',
    mixins: [tableMixin],
    components: {
        tablePage,
        xtable
    },
    data() {
        return {
            chooseData: {},
            page: 1,
            total: 1,
            dialogFormVisible3: false,
            dialogFormVisible2: false,
            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: 'seller ID',
                    filterable: true,
                    options: []
                },

                {
                    type: 'date',
                    value: '',
                    placeholder: '时间',
                    filterable: true,
                    options: []
                },

                {
                    type: 'select',
                    value: '',
                    placeholder: '加白状态',
                    filterable: true,
                    options: [
                        {
                            label: '未处理',
                            value: 'UNTREATED'
                        },
                        {
                            label: '成功',
                            value: 'SUCCESS'
                        },
                        {
                            label: '失败',
                            value: 'FAIL'
                        }
                    ]
                }
            ],
            selectData: [],
            infoData: [],
            columns: [
                {
                    label: this.$t('loan_search_sqrq'),
                    prop: 'createTime'
                },
                {
                    label: 'Seller ID',
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
                    label: 'VA账号',
                    prop: 'walletAccountNo'
                },

                {
                    label: 'SWIFT code',
                    prop: 'bankBic'
                },
                {
                    label: 'customerId',
                    prop: 'customerId',
                    width: 200
                },
                {
                    label: '加白状态',
                    prop: 'whiteStatus2'
                },
                {
                    label: '发送offer状态',
                    prop: 'offerStatus2'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '180',
                    operates: [
                        {
                            event: 'quote',
                            text: '加白',
                            type: 'primary'
                        },
                        {
                            event: 'sendOffer',
                            text: '发送offer',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            columns3: [
                {
                    label: this.$t('loan_search_sqrq'),
                    prop: 'createTime'
                },
                {
                    label: 'Seller ID',
                    prop: 'sellerId'
                },

                {
                    label: this.$t('loan_search_status'),
                    prop: 'whiteStatus2'
                }
            ]
        };
    },
    created() { },
    methods: {
        _sendOffer(data) {
            this.$confirm('是否发送offer?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (!Array.isArray(data)) {
                    data = [data];
                }
                let arr = [];
                data.forEach((item) => {
                    arr.push({
                        customerId: item.customerId,
                        offerStatus: item.offerStatus,
                        sellerId: item.sellerId,
                        offerStatus: item.offerStatus
                    });
                });
                sendOffer(arr).then((res) => {
                    this.$message.success(res.data[0].status == 'untreated' ? '未处理' : res.data[0].status == 'SUCCESS' ? '成功' : '失败');
                    this.dialogFormVisible2 = false;
                    this._getList();
                    this.$refs.bossTabel.$refs.multipleTable.$refs.multipleTable.clearSelection();
                    this.selectData = [];
                });
            });
        },
        _add(data) {
            this.$confirm('是否加白成功?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (!Array.isArray(data)) {
                    data = [data];
                }
                let arr = [];
                data.forEach((item) => {
                    arr.push({
                        customerId: item.customerId,
                        offerStatus: item.offerStatus,
                        sellerId: item.sellerId,
                        whiteStatus: item.whiteStatus
                    });
                });
                addWhite(arr).then((res) => {
                    this.$message.success(res.data[0].status == 'untreated' ? '未处理' : res.data[0].status == 'SUCCESS' ? '成功' : '失败');
                    this.dialogFormVisible2 = false;
                    this._getList();
                    this.$refs.bossTabel.$refs.multipleTable.$refs.multipleTable.clearSelection();
                    this.selectData = [];
                });
            });
        },

        openSelectData() {
            if (!this.selectData.length) return this.$message.warning('请先选择');
            this.dialogFormVisible2 = true;
        },

        _select(val) {
            this.selectData = val;
        },

        _getList() {
            if (this.$refs.bossTabel) {
                this.$refs.bossTabel.$refs.multipleTable.$refs.multipleTable.clearSelection();
            }
            let date = this.filterOptions[1].value ? this.filterOptions[1].value + ' 00:00:00' : '';
            addWhiteList({
                page: this.currentPage,
                rows: 10,
                sellerId: this.filterOptions[0].value,
                createTime: date,
                whiteStatus: this.filterOptions[2].value
            }).then((res) => {
                res.data.records.forEach((item) => {
                    item.whiteStatus2 = item.whiteStatus == 'UNTREATED' ? '未处理' : item.whiteStatus == 'SUCCESS' ? '成功' : '失败';
                    item.offerStatus2 = item.offerStatus == 'UNTREATED' ? '未处理' : item.offerStatus == 'SUCCESS' ? '成功' : '失败';
                    item.hiddenBtn = item.whiteStatus2 == '成功' ? '加白' : '';
                    item.hiddenBtn = item.offerStatus2 == '成功' ? item.hiddenBtn + '，发送offer' : item.hiddenBtn;
                    // item.disabled = item.whiteStatus2 == '成功' ? '加白' : '';
                    item.disabled = item.offerStatus2 == '成功' && item.whiteStatus2 == '成功' ? true : false;
                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        }
    }
};
</script>

<style lang='less' scoped>
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