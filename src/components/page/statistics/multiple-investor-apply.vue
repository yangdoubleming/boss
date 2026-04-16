<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img
                    src="../../../../public/img/favicon.png"
                    style="width:17px;height:17px;margin-right:5px"
                    alt
                />保险后台 /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{$route.meta.title}}</span>
        </div>
        <table-page
            :tableData="tableData"
            :filterOptions="filterOptions"
            :columns="columns"
            :totalSize="totalSize"
            @conditional-query="handleColumnsFilter"
            :current='currentPage'
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
import {getMultipleInvestorApplyDetail} from '../../../api/index'
export default {
    name: 'loan-user',
    components: {
        tablePage
    },
    data() {
        return {
            currentPage: 1,//页码
            totalSize: 0,//数据总条数
            tableData: [],
            chooseRow:{},

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
                    placeholder: '手机号',
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
            ],
            currentPage: 1,
            totalSize: 10,
            tableData: [

            ],

            value: '',
            columns: [
                {
                    label: 'offerId',
                    prop: 'offerId'
                },
                {
                    label: '站点',
                    prop: 'site'
                },
                {
                    label: '平台',
                    prop: 'platform'
                },
                {
                    label: '申请时间',
                    prop: 'createTime'
                },
                {
                    label: '授权是否有效',
                    prop: 'dataStatus'
                },
                {
                    label: '店铺状态',
                    prop: 'sellerStatus'
                },
                {
                    label: '收款渠道',
                    prop: 'paymentName'
                },
                {
                    label: 'seller ID',
                    prop: 'sellerId'
                },
                {
                    label: 'GMV',
                    prop: 'year1DisbursementsValue'
                },
                {
                    label: '主营类目',
                    prop: 'paymentName'
                },
                {
                    label: '授信金额',
                    prop: 'creditAmount'
                },
                {
                    label: '授信日期',
                    prop: 'authorizeTime'
                },
                {
                    label: '授信是否有效',
                    prop: 'creditApprovalStatus'
                },
                {
                    label: '申请单查看',
                    prop: '',
                    width: '120',
                    operates: [
                        {
                            event: 'getInfo',
                            text: '查看',
                            type: 'primary'
                        },
                    ],
                },
            ],
        };
    },
    created() {
        this._getList()
    },
    activated(){

    },
    methods: {
        _getInfo(row){
            this.$router.push({
                path: '/multiple-list',
                query: {
                    account: this.$route.query.account,
                }
            });
        },
        _getList() {
            getMultipleInvestorApplyDetail({
                account:this.filterOptions[1].value ||this.$route.query.account,
                realName:this.filterOptions[0].value ||this.$route.query.realName,
                offerId:this.filterOptions[2].value,
                sellerId:this.filterOptions[3].value,
                current:this.currentPage,
                size:10,
            }).then((res) => {

                // res.data.records.forEach(item=>{
                //     item.applicationType=item.applicationType=='COMPANY'?'公司':"个人"
                //     item.bcardId=item.bcardId ?item.bcardId.replace(/^(.{6})(?:\d+)(.{4})$/,  "\$1****\$2"):''
                //     item.tel=item.tel ?item.tel.substring(0,3)+"****"+item.tel.substring(7) :''
                // })
                this.tableData = res.data || [];
                this.totalSize = res.data.length || 0;
            });
        },
        //重置
        handleConditionalReset() {

            this.filterOptions.forEach(item => {
                item.value = ''
            })
            this._getListFirstPage()
        },
        //查询
        handleColumnsFilter(val) {
            // this.columns.forEach(item => {
            //     if (item.label === Object.keys(val)[0]) {
            //         item.filtersVal = Object.values(val)[0]
            //     }
            // })
            this.currentPage=1

            this._getList()
        },
        handlePageChange(page) {

            this.currentPage = page
            this._getList()
        },
        //     formatJson(filterVal, jsonData) {
        //       return jsonData.map(v => filterVal.map(j => {
        //         return v[j]
        //       }))
        //     },
        _getListFirstPage() {
            this.currentPage = 1

            this._getList()
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