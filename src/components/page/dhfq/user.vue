<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <table-page :tableData="tableData" :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize"
            @conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" :detailTable="true" />

    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';

export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '手机号码',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '资方名称',
                    filterable: true,
                    options: []
                },],
            currentPage: 1,
            totalSize: 10,
            tableData: [

            ],

            value: '',
            columns: [
                {
                    label: '用户编号',
                    prop: 'rulesumName'
                },
                {
                    label: this.$t('loan_sqdh'),
                    prop: 'linkProduct'
                },
                {
                    label: '产品名称',
                    prop: 'step'
                },
                {
                    label: '资方名称',
                    prop: 'rulesumType'
                },
                {
                    label: '手机号码',
                    prop: 'createTime'
                },
                {
                    label: '用户名称',
                    prop: 'createTime'
                },
                {
                    label: '授信额度',
                    prop: 'createTime'
                },
                {
                    label: '可用额度    ',
                    prop: 'createTime'
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
                            event: 'seeRules',
                            text: '查看规则',
                            type: 'primary'
                        },
                        {
                            event: 'quote',
                            text: this.$t('loan_detail_delete'),
                            type: 'primary'
                        },
                    ],
                    fixed: 'right'
                }
            ],
        };
    },
    mounted() {

    },
    methods: {
        _getList() {

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