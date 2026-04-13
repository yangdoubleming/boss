<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px">

        </div>
        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" @quote="toDetail" :detailTable="true"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" />
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { throwList } from '../../../api/statistics';
export default {
    name: 'throw-list',
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
                    placeholder: '活动名称',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '投放渠道名称',
                    filterable: true,
                    options: []
                },
            ],
            columns: [
                {
                    label: '渠道名称',
                    prop: 'platformName'
                },
                {
                    label: '渠道代码',
                    prop: 'channelCode'
                },

                {
                    label: '活动名称',
                    prop: 'eventName',
                },

                {
                    label: '活动代码',
                    prop: 'eventCode',
                },
                {
                    label: '活动编号',
                    prop: 'eventNumber',
                },

                {
                    label: '默认的访问路径',
                    prop: 'defaultUrl',
                    width: 250
                },
                {
                    label: '产品类型',
                    prop: 'eventProductType'
                },
                {
                    label: '活动适配类型',
                    prop: 'eventTerminalType'
                },

                {
                    label: '创建人',
                    prop: 'createBossName'
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 200
                }

                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     width: '180',
                //     operates: [
                //         {
                //             event: 'quote',
                //             text: this.$t('common_see'),
                //             type: 'primary'
                //         },
                //          {
                //             event: '22',
                //             text: '冻结',
                //             type: 'danger'
                //         }
                //     ],
                //     fixed: 'right'
                // }
            ]
        };
    },
    created() { },
    methods: {
        _getList() {
            throwList({
                page: this.currentPage,
                rows: 10,
                eventName: this.filterOptions[0].value,
                platformName: this.filterOptions[1].value,
            }).then((res) => {
                res.data.records.forEach((item) => {
                    item.eventTerminalType = item.eventTerminalType == 0 ? 'PC与H5' : item.eventTerminalType == 1 ? 'H5' : 'PC';
                    item.eventProductType = item.eventTerminalType == 0 ? '保险与贷款' : item.eventTerminalType == 1 ? '保险' : '贷款';
                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
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