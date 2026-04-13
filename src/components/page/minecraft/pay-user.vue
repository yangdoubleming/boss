<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <table-page :tableData="tableData" :showFilterRadio="false" :columns="columns" :totalSize="totalSize"
            @openVideo="_openVideo" @page-change="handlePageChange" :filterOptions="filterOptions" :detailTable="true"
            @conditional-query="handleColumnsFilter" @conditional-reset="handleConditionalReset" />

    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { paymentUserList } from '../../../api/index'


export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,

            currentPage: 1,
            totalSize: 10,
            tableData: [

            ],

            columns: [
                {
                    label: '法人姓名',
                    prop: 'legalName'
                },
                {
                    label: '支付公司名称',
                    prop: 'paymentName'
                },

                {
                    label: this.$t('loan_detail_zd'),
                    prop: 'accountType'
                },
                {
                    label: '收款主体姓名',
                    prop: 'paymentSubjectName'
                },

                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '240',
                    operates: [
                        {
                            event: 'openVideo',
                            text: '查看视频',
                            type: 'primary'
                        },

                    ],
                    fixed: 'right'
                }
            ],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '法人姓名',
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '收款主体姓名',
                    filterable: true
                },
            ]
        };
    },
    mounted() {


    },
    methods: {
        _openVideo(row) {
            window.open(this.imgsBaseUrl + row.paymentVedioPath)
        },
        _getList() {
            paymentUserList(this.currentPage, this.filterOptions[0].value, this.filterOptions[1].value).then(res => {
                this.tableData = res.data.records
                this.totalSize = res.data.total
            })
        },

    }
};
</script>

<style>
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