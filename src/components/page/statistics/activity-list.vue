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
            <el-button style="float:right" type="primary" icon="el-icon-document-add" @click="toDetail">创建活动</el-button>
        </div>
        <table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
            :columns="columns" :totalSize="totalSize" @quote="toDetail" :detailTable="true"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" @openEnable="_openEnable" />
        <el-dialog title="活动投放" :visible.sync="showEnable" width="40%">
            <el-table ref="multipleTable" :data="enbleData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="投放渠道">
                    <template slot-scope="scope">{{ scope.row.platformName }}</template>
                </el-table-column>
                <el-table-column prop="channelCode" label="渠道编码"></el-table-column>
                <el-table-column prop="defaultUrl" :label="$t('loan_detail_dz')" width="300"></el-table-column>

            </el-table>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="showEnable = false" style="width:80px;height:35px">取 消</el-button>
                <el-button type="primary" style="width:80px;height:35px" @click="submit">投 放</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { activityList, getPlatformIsEnableList, enablePlatform } from '../../../api/statistics';
export default {
    name: 'activity-list',
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
                    type: 'select',
                    value: '',
                    placeholder: '适配类型',
                    filterable: true,
                    options: [
                        {
                            value: 0,
                            label: 'PC与H5'
                        },
                        {
                            value: 1,
                            label: 'H5'
                        },
                        {
                            value: 2,
                            label: 'PC'
                        }
                    ]
                },
                {
                    type: 'daterange',
                    value: '',
                    placeholder: '',
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
                    label: '序号',
                    prop: 'eventNumber'
                },
                {
                    label: '活动名称',
                    prop: 'eventName'
                },

                {
                    label: '活动地址',
                    prop: 'eventDefaultUrl',
                    width: 270
                },

                {
                    label: '开始时间',
                    prop: 'eventStartTime',
                    width: 200
                },
                {
                    label: '结束时间',
                    prop: 'eventEndTime',
                    width: 200
                },
                // {
                //     label: '产品类型',
                //     prop: 'ProductType'
                // },
                {
                    label: '活动适配类型',
                    prop: 'eventTerminalType',
                    width: 140
                },

                {
                    label: '创建人',
                    prop: 'eventCreateName'
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                    width: 200
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '180',
                    operates: [
                        {
                            event: 'openEnable',
                            text: '渠道管理',
                            type: 'primary'
                        },
                        //  {
                        //     event: 'edit',
                        //     text: '查看编辑',
                        //     type: 'primary'
                        // }
                    ],
                    fixed: 'right'
                }
            ]
        };
    },
    created() { },
    methods: {
        submit() {
            let arr = []
            this.multipleSelection.forEach(item => {
                arr.push(item.channelCode)
            })
            enablePlatform({
                eventCreateBossName: localStorage.getItem('userName'),
                eventCode: this.choose,
                channelCode: arr
            }).then(res => {
                this.$message.success('操作成功！')
                this.showEnable = false
            })
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {

            this.multipleSelection = val;
        },
        _openEnable(row) {
            this.choose = row.eventCreateCode
            let arr = [];
            this.showEnable = true;
            getPlatformIsEnableList({
                eventCode: row.eventCreateCode
            }).then((res) => {
                this.enbleData = res.data.records;

                this.enbleData.forEach((item) => {
                    //  item.defaultUrl='http://localhost:9529/module?eventCode='+row.eventCreateCode+'&enableCode='+item.channelCode+row.eventNumber
                    if (Number(item.stauts)) {
                        arr.push(item);
                    }
                });

                setTimeout(() => {
                    this.toggleSelection(arr);
                }, 0);

            });

        },
        _edit(row) {
            this.$router.push({
                path: '/activity-detail',
                query: {
                    eventCode: row.eventCreateCode,
                    eventTerminalType: row.eventTerminalType
                }
            });
        },
        _getList() {
            activityList({
                page: this.currentPage,
                rows: 10,
                eventName: this.filterOptions[0].value,
                eventTerminalType: this.filterOptions[1].value,
                eventStartTime: this.filterOptions[2].value ? this.filterOptions[2].value[0] || '' : '',
                eventEndTime: this.filterOptions[2].value ? this.filterOptions[2].value[1] || '' : ''
            }).then((res) => {
                res.data.records.forEach((item) => {
                    item.eventTerminalType = item.eventTerminalType == 0 ? 'PC与H5' : item.eventTerminalType == 1 ? 'H5' : 'PC';

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