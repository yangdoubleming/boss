<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <table-page
            :tableData="tableData"
            :filterOptions="filterOptions"
            :columns="columns"
            :totalSize="totalSize"
            @conditional-query="handleColumnsFilter"
            :current="currentPage"
            @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange"
            :detailTable="true"
            @getInfo="_getInfo"
        />
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { salesList } from '@/api/member';
export default {
    name: 'loan-user',
    components: {
        tablePage
    },
    data() {
        return {
            currentPage: 1, //页码
            totalSize: 0, //数据总条数
            tableData: [],

            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '离职人员名称',
                    filterable: true,
                    options: []
                }
            ],

            value: '',
            columns: [
                {
                    label: '离职人员名称',
                    prop: 'name'
                },
                {
                    label: '离职人员内部名',
                    prop: 'internalName'
                },
                {
                    label: '待分配客户数',
                    prop: 'customerCount'
                },
                {
                    label: '离职时间',
                    prop: 'updateTime'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '220',
                    operates: [
                        {
                            event: 'getInfo',
                            text: '查看详情',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ]
        };
    },
    created() {
        this._getList();
    },
    activated() {},
    methods: {
        _getInfo(row) {
            this.$router.push({
                path: '/former-employees-customer',
                query: {
                    row: JSON.stringify(row)
                }
            });
        },
        _getList() {
            salesList({
                name: this.filterOptions[0].value,
                positionStatus: 'RESIGN',
                current: this.currentPage,
                size: 10
            }).then((res) => {
                res.data.records.map((item) => {
                    item.updateTime = item.updateTime.split(' ')[0];
                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
        //重置
        handleConditionalReset() {
            this.filterOptions.forEach((item) => {
                item.value = '';
            });
            this._getListFirstPage();
        },
        //查询
        handleColumnsFilter(val) {
            // this.columns.forEach(item => {
            //     if (item.label === Object.keys(val)[0]) {
            //         item.filtersVal = Object.values(val)[0]
            //     }
            // })
            this.currentPage = 1;

            this._getList();
        },
        handlePageChange(page) {
            this.currentPage = page;
            this._getList();
        },
        _getListFirstPage() {
            this.currentPage = 1;

            this._getList();
        }
    }
};
</script>

<style>
.text {
    width: 280px;
    display: block;
    padding-left: 15px;
    box-sizing: border-box;
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
