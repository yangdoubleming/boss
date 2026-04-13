<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px"></div>
        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" :detailTable="true" @conditional-query="handleColumnsFilter"
            :current="currentPage" @conditional-reset="handleConditionalReset" @page-change="handlePageChange"
            @pass="_pass" @return="_return" />
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { amazonReview, reviewApproval } from '../../../api/boss1';
export default {
    name: 'examine',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_detail_jkrmc'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '申请单号/贷款单号',
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '复核状态',
                    filterable: true,
                    options: [
                        {
                            label: '待复核',
                            value: 'PENDING'
                        },
                        {
                            label: '通过',
                            value: 'PASS'
                        },
                        {
                            label: '退回',
                            value: 'RETURN'
                        }
                    ]
                }
            ],
            columns: [
                {
                    label: 'offerID',
                    prop: 'offerId',
                    width: 370
                },
                {
                    label: '单号',
                    prop: 'resourceCode',
                    width: 300
                },
                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'bName',
                    width: 120
                },
                {
                    label: '金额/万',
                    prop: 'resourceAmount',
                    width: 140
                },
                {
                    label: this.$t('loan_detail_ll'),
                    prop: 'resourceRate',
                    width: 120
                },

                {
                    label: '期限',
                    prop: 'resourceTenure'
                },
                {
                    label: '类型',
                    prop: 'resourceType'
                },
                {
                    label: '发起时间',
                    prop: 'createTime',
                    width: 150
                },


                {
                    label: '复核状态',
                    prop: 'reviewStatus',
                    width: 120
                },
                {
                    label: this.$t('loan_detail_xgsj'),
                    prop: 'updateTime',
                    width: 150
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '180',
                    operates: [
                        {
                            event: 'pass',
                            text: '通过',
                            type: 'primary'
                        },
                        {
                            event: 'return',
                            text: '退回',
                            type: 'danger'
                        }
                    ],
                    fixed: 'right'
                }
            ]
        };
    },
    created() { },
    methods: {
        _pass(row) {
            this.$confirm('是否确定通过?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.approval(row.id, 'PASS')
            });
        },
        _return(row) {
            this.$confirm('是否确定退回?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.approval(row.id, 'RETURN')
            });
        },
        approval(id, re) {
            reviewApproval({
                id: id,
                reviewStatus: re
            }).then((res) => {
                this.$message.success('操作成功！');
                this._getList()
            });
        },
        _getList() {
            amazonReview(this.currentPage, 10, this.filterOptions[0].value, this.filterOptions[1].value, this.filterOptions[2].value).then(
                (res) => {
                    res.data.records.forEach((item) => {
                        item.resourceRate = (item.resourceRate * 100).toFixed(2)
                        item.resourceAmount = (item.resourceAmount / 10000).toFixed(2)
                        item.reviewStatus = item.reviewStatus == 'PENDING' ? '待复核' : (item.reviewStatus == 'PASS' ? '通过' : '退回');
                        item.resourceType = item.resourceType == 'APPLICATION' ? '申请单' : item.resourceType == 'CREDIT' ? '授信单' : '贷款单'
                    });
                    this.tableData = res.data.records;
                    this.totalSize = res.data.total;
                }
            );
        },
        toDetail(val) {
            this.$router.push({
                path: '/activity-detail',
                query: {
                    id: val.id || ''
                }
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