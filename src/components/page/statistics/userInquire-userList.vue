<template>
    <div style="height: 100%;">
        <!-- 用户查询-用户列表 -->
        <div v-if="false" class="userInquire-userList">
            <!-- 页面头部标题 -->
            <div style="display: flex; align-items: center; padding: 18px">
                <div style="color: #9a9a9a; font-size: 14px; display: flex; align-items: center">
                    <img src="../../../../public/img/favicon.png"
                        style="width: 17px; height: 17px; margin-right: 5px; margin-left: 20px" alt />
                    {{ $t('common_dsb') }} /<span style="color: black">查询管理/用户查询</span>
                </div>
            </div>
            <div class="show-all">
                <div class="show-all-item1">
                    <div class="show-all-item1-top">注册用户总数</div>
                    <div class="show-all-item1-bottom">{{ allUserData.registerUserCount }}</div>
                </div>
                <div class="show-all-item1">
                    <div class="show-all-item1-top">授权用户总数</div>
                    <div class="show-all-item1-bottom">{{ allUserData.creditUserCount }}</div>
                </div>
                <div class="show-all-item1">
                    <div class="show-all-item1-top">贷款成交用户总数</div>
                    <div class="show-all-item1-bottom">{{ allUserData.loanDealUserCount }}</div>
                </div>
                <div class="show-all-item1">
                    <div class="show-all-item1-top">在贷用户总数</div>
                    <div class="show-all-item1-bottom">{{ allUserData.loanUserTotalCount }}</div>
                </div>
                <div class="show-all-item1">
                    <div class="show-all-item1-top">保险用户总数</div>
                    <div class="show-all-item1-bottom">{{ allUserData.insuranceRegisterUserCount }}</div>
                </div>
                <div class="show-all-item1">
                    <div class="show-all-item1-top">保险成交用户总数</div>
                    <div class="show-all-item1-bottom">{{ allUserData.insuranceDealUserCount }}</div>
                </div>
                <div class="show-all-item1">
                    <div class="show-all-item1-top">在保用户总数</div>
                    <div class="show-all-item1-bottom">{{ allUserData.insuranceUserCount }}</div>
                </div>
            </div>
            <!-- 输入框组 -->
            <div style="margin-top: 20px">
                <table-page :filterOptions="filterOptions" :tableData="allUserData.records" :columns="columns"
                    :totalSize="totalSize" @goDetail="goDetail" @conditional-reset="handleConditionalReset"
                    @conditional-query="handleColumnsFilter" @page-change="handlePageChange"></table-page>
            </div>
        </div>
        <div style="    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 20px;
    font-weight: 600;">由于数据源变更无法查询, 当前页面正在积极迭代中
        </div>
    </div>
</template>
<script>
import { getUseList } from '../../../api/loanDataBoard';
//import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
export default {
    name: 'userInquire-userList',
    //mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            allUserData: {}, //全部数据
            columns: [
                {
                    label: this.$t('loan_search_zhucephone'),
                    prop: 'account'
                },
                {
                    label: this.$t('loan_search_jkrxm'),
                    prop: 'borrowerName'
                },
                {
                    label: '公司名称',
                    prop: 'companyName'
                },
                {
                    label: '店铺数量',
                    prop: 'shopCount'
                },
                {
                    label: this.$t('loan_search_dkzt'),
                    prop: 'loanStatus'
                },
                {
                    label: '授信金额',
                    prop: 'creditAmount'
                },
                {
                    label: '贷款金额',
                    prop: 'loanAmount'
                },
                {
                    label: '保险状态',
                    prop: 'insuranceStatus'
                },
                {
                    label: '公司地址',
                    prop: 'companyAddress'
                },
                {
                    label: '客户规模',
                    prop: 'userType'
                },
                {
                    label: '销售经理',
                    prop: 'sales'
                },
                {
                    label: '注册时间',
                    prop: 'registerTime'
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    operates: [
                        {
                            event: 'goDetail',
                            text: this.$t('common_see'),
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            filterOptions: [
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
                    placeholder: '用户名称',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '销售经理',
                    filterable: true,
                    options: []
                },
                {
                    type: 'daterange',
                    value: [],
                    placeholder: '时间',
                    filterable: true,
                    placeholderArr: ['注册开始时间', '注册结束时间'],
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    options: [
                        {
                            label: '申请中',
                            value: 'APPLY'
                        },
                        {
                            label: '已授信',
                            value: 'CREDIT'
                        },
                        {
                            label: this.$t('status_Repayment'),
                            value: 'REPAYMENT'
                        },
                        {
                            label: ' 已结清',
                            value: 'CLEAR'
                        },
                        {
                            label: this.$t('status_past'),
                            value: 'OVERDUE'
                        }
                    ],
                    placeholder: '贷款状态',
                    filterable: true
                },
                {
                    type: 'select',
                    value: '',
                    options: [
                        {
                            label: ' 投保中',
                            value: 'INSURED'
                        },
                        {
                            label: ' 未投保',
                            value: 'UNINSURED'
                        },
                        {
                            label: '  保单失效',
                            value: 'INVALID'
                        }
                    ],
                    placeholder: '保险状态',
                    filterable: true
                }
            ]
        };
    },
    watch: {},
    cteated() { },
    mounted() {
        // this._getList();
    },
    computed: {},
    methods: {
        // 查看详情跳转页面查看数据
        goDetail(id) {
            this.$router.push({ path: '/userInquire-userListDetail', query: { userId: id.userId, phone: id.account } });
        },
        //头部搜索框搜索数据
        _getList() {
            console.log(this.filterOptions[3]);
            let starTime = this.filterOptions[3].value ? (this.filterOptions[3].value.length ? this.filterOptions[3].value[0] : '') : '';
            let endTime = this.filterOptions[3].value ? (this.filterOptions[3].value.length ? this.filterOptions[3].value[1] : '') : '';
            getUseList({
                registerStartDate: starTime,
                registerEndDate: endTime,
                size: 10, //    每页的数据
                current: this.currentPage,
                account: this.filterOptions[0].value,
                borrowerName: this.filterOptions[1].value,
                sales: this.filterOptions[2].value,
                loanStatus: this.filterOptions[4].value,
                insuranceStatus: this.filterOptions[5].value
            }).then((res) => {
                this.allUserData = res.data;
                this.allUserData.records = res.data.records;
                this.allUserData.records.forEach((item, index) => {
                    item.registerTime = item.registerTime.split(' ')[0];
                });
                this.tableData = this.allUserData.records;
                this.totalSize = this.allUserData.total;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.userInquire-userList {
    .top {
        padding-right: 20px;
        display: flex;
        background-color: white;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        // border: 1px solid red;
        height: 40px;
    }

    .show-all {
        background-color: white;
        font-weight: 550;
        color: black;
        // margin-left: 30px;
        align-items: center;
        display: flex;
        // padding-left: 50px;
        width: 100%;
        height: 80px;
        border: 1px solid rgb(199, 199, 199);

        .show-all-item1 {
            margin-left: 30px;
            margin-right: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .show-all-item1-top {
                margin-bottom: 10px;
            }
        }
    }

    .shurukuangzu {
        margin-top: 10px;
        margin-left: 60px;
        // border: 1px solid red;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .el-input {
        width: 180px;
    }

    .input1 {
        margin-right: 20px;
    }

    .picker {
        margin-right: 10px;
        width: 150px;
    }

    .sousuo {
        width: 60px;
        height: 25px;
        background: rgb(231, 29, 93);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        margin-left: 20px;
        cursor: pointer;
    }

    .el-table {
        margin-top: 20px;
        margin-left: 25px;
        margin-right: 25x;
    }

    .biaoge {
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        height: auto;
        background-color: white;
        padding-bottom: 20px;
        margin-top: 10px;
    }

    .table-button {
        border: none;
        background: transparent;
        color: rgb(231, 29, 93);
    }

    .el-pagination {
        margin-top: 50px;
        margin-left: 1150px;
    }
}
</style>
<style lang="scss">
.userInquire-userList {
    .el-input__prefix {
        margin-left: 120px;
    }
}
</style>
