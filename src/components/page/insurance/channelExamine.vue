<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />保险后台
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>


        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" @quote="toDetail" :detailTable="true"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange">
            <template>

            </template>
        </table-page>
        <el-drawer size="45%" :title="isEdit ? '详情' : '新建申请'" :visible.sync="dialogFormVisible" direction="rtl">
            <addChannel2 :isApprove="true" @close="_close" v-loading="loading" :detailData="detailData" @push="pushForm"
                :platfrom="filterOptions[0].options"></addChannel2>
        </el-drawer>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getMerchant, getMerchantDetail, createOrEditDetail, getPlatfrom, createDetail } from '../../../api/statistics';
import { platformList, getStatusList, getChannelList, saveChannel, channelDetail, updateChannel } from '../../../api/insur';

import addChannel2 from '../../common/channel/add-channel2.vue';
export default {
    name: 'channel-admin',
    mixins: [tableMixin],
    components: {
        tablePage,
        addChannel2
    },
    data() {
        return {
            filterStatus: [
                { value: '', label: '全部' },
                {
                    label: '审批通过',
                    value: 4
                },
                {
                    label: '待审批',
                    value: 1
                },

                {
                    label: '驳回',
                    value: 3
                }
            ],
            loading: false,
            dialogFormVisible: false,
            tableOperate: [],
            detailData: {},
            tableData: [],
            platfrom: [],
            isEdit: false,
            filterOptions: [
                {
                    type: 'select',
                    value: '',
                    placeholder: '渠道分类',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '渠道商名称',
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '渠道码',
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '联系人手机号',
                    filterable: true
                }
            ],
            columns: [
                {
                    label: '渠道商码',
                    prop: 'channelCode',
                    width: 120
                },
                {
                    label: '特渠道商名称(个人或者企业)',
                    prop: 'merchantName',
                    width: 220
                },
                {
                    label: '渠道分类',
                    prop: 'platformName',
                    width: 120
                },
                {
                    label: '渠道联系人',
                    prop: 'contactName',
                    width: 150
                },
                {
                    label: '手机号',
                    prop: 'iphone',
                    width: 150
                },
                {
                    label: '结算周期',
                    prop: 'settlementPeriod',
                    width: 120
                },
                {
                    label: '返佣比例',
                    prop: 'rate',
                    width: 120

                },
                {
                    label: '创建人',
                    prop: 'createBossName',
                    width: 140
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 200
                },
                {
                    label: '审批状态',
                    prop: 'status',
                    width: 160,

                },
                {
                    label: this.$t('loan_detail_xgsj'),
                    prop: 'updateTime',
                    width: 200
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '100',
                    operates: [
                        {
                            event: 'quote',
                            text: '审批',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            status: '4',
            statusNum: {}
        };
    },
    activated() { },
    created() {
        getStatusList(2).then(res => {
            this.statusNum = res.data;
        });
        platformList().then(res => {
            this.filterOptions[0].options = [];
            res.data.records.forEach(item => {
                this.filterOptions[0].options.push({
                    value: item.platformCode,
                    label: item.platfromName
                });
            });
            this._getList();
        });
    },
    methods: {
        _close() {
            this.dialogFormVisible = false
            this._getList()
            getStatusList(2).then(res => {
                this.statusNum = res.data;
            });
        },
        changeStatus(val) {
            this.status = val;
            this.currentPage = 1;
            this._getList();
        },
        pushForm(form, type) {
            // type  1保存 2提交

            if (type == 1) {
                updateChannel(form).then(res => {
                    this.$message.success('操作成功！');
                    this._getList();
                    this.dialogFormVisible = false;
                });
            } else {
                saveChannel(form).then(res => {
                    this.$message.success('操作成功！');
                    this._getList();
                    this.dialogFormVisible = false;
                });
            }
        },
        _getList() {
            getChannelList({
                current: this.currentPage,
                size: 10,
                type: 2,
                platformCode: this.filterOptions[0].value,
                merchantName: this.filterOptions[1].value,
                channelCode: this.filterOptions[2].value,
                iphone: this.filterOptions[3].value,
                statusList: '1,2'
            }).then(res => {
                res.data.records.forEach(item => {
                    item.commissionRate2 = item.commissionRate ? item.commissionRate + '%' : '';
                    this.filterOptions[0].options.forEach(it => {
                        if (item.platformCode == it.value) {
                            item.platformName = it.label;
                        }
                    });
                });
                res.data.records.forEach(item => {
                    item.settlementPeriod =
                        item.settlementPeriod == 1
                            ? '月'
                            : item.settlementPeriod == 2
                                ? '季度'
                                : item.settlementPeriod == 3
                                    ? '半年'
                                    : '年';
                    item.status =
                        item.status == 1
                            ? '已提交(待审批)'
                            : item.status == 2
                                ? '已修改(待审批)'
                                : item.status === 3
                                    ? '驳回'
                                    : '审批通过';
                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        toDetail(val) {
            this.isEdit = true;
            this.loading = true;
            this.dialogFormVisible = true;
            channelDetail(val.id).then(res => {
                this.loading = false;
                res.data.dates = [res.data.startTime || '', res.data.endTime || ''];
                this.detailData = res.data;
            });
        }
    }
};
</script>

<style lang='less' scoped>
.channel {
    /deep/.el-radio-button__inner {
        padding: 10px 35px !important;
    }
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