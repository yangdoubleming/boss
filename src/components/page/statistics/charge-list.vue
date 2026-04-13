<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <div style="display: flex; align-items: flex-end; width: 100%; justify-content: flex-end; margin-bottom: 15px"></div>
        <table-page
            :tableData="tableData"
            :tableOperate="tableOperate"
            :columns="columns"
            :totalSize="totalSize"
            :detailTable="true"
            @conditional-query="handleColumnsFilter"
            :current="currentPage"
            @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange"
            :filterOptions="filterOptions"
            @onExport='_export'
            :exportBtn="true"
        />

   
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
    listCharge,
    getChargeList
} from '../../../api/index';
export default {
    name: 'charge-list',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            options:[],
            tableOperate: [],
            columns: [
                {
                    label: '收款编号',
                    prop: 'code',
                    width: 250,
                    default: ''
                },
                {
                    label: '收款对象',
                    prop: 'chargeTarget',
                    width: 250
                },
                {
                    label: '所属项目',
                    prop: 'projectType',
                    width: 150
                },
                {
                    label: '收入类型',
                    prop: 'incomeType',
                    width: 150
                },
                {
                    label: '费用类型',
                    prop: 'expenseType',
                    width: 150
                },

                {
                    label: '收款金额',
                    prop: 'chargeAmount',
					width:140
                },

                {
                    label: '收款币种',
                    prop: 'currency',
                },
                {
                    label: '归属人',
                    prop: 'sales',
					width:150
                },

                {
                    label: '收款日期',
                    prop: 'chargeDate'
                },

            ],
            filterOptions: [   // 查询条件
                {
                    type: 'input',
                    value: '',
                    placeholder: '收款编号',
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '收款对象',
                },
                {
                    type: 'select',
                    placeholder: '所属项目',
                    value:'',
                    options: [
                        {
                            label: '信贷云',
                            value: 'CREDIT_CLOUD'
                        },
                        {
                            label: '收款云',
                            value: 'COLLECTION_CLOUD'
                        },
                        {
                            label: '保险云',
                            value: 'INSURANCE_CLOUD'
                        },
                        {
                            label: 'Dow+云',
                            value: 'DOW_CLOUD'
                        },
                        {
                            label: '豆服会员',
                            value: 'SELLER_CLOUD'
                        },
                    ]
                },
                {
                    type: 'select',
                    placeholder: '收入类型',
                    value:'',
                    options: [
                        {
                            label: '金融云订阅收入',
                            value: 'FINANCIAL_CLOUD_SUBSCRIBE_FEE'
                        },
                        {
                            label: '保险云订阅收入',
                            value: 'INSURANCE_CLOUD_SUBSCRIBE_FEE'
                        },
                        {
                            label: 'Dow+SaaS订阅收入',
                            value: 'DOW_SAAS_SUBSCRIBE_FEE'
                        },
                        {
                            label: '3P DOW+收入',
                            value: 'DOW_3P_FEE'
                        },
                        {
                            label: '豆服会员收入',
                            value: 'SELLER_CLOUD_SERVICE_FEE'
                        },
                    ]
                },
                {
                    type: 'select',
                    placeholder: '费用类型',
                    value:'',
                    options: [
                        {
                            label: 'SaaS订阅费',
                            value: 'SAAS_SUBSCRIBE_FEE'
                        },
                        {
                            label: 'Dow+服务费',
                            value: 'DOW_SERVICE_CHARGE'
                        },
                        {
                            label: '会员权益费',
                            value: 'MEMBERSHIP_BENEFITS_FEE'
                        },
                        {
                            label: '开户服务费',
                            value: 'ACCOUNT_OPENING_SERVICE_FEE'
                        },
                    ]
                },
                
            ],
        };
    },
    created() {
        this._getList()
    },
    methods: {
        _getList(){

            getChargeList({
                current: this.currentPage,
                size: 10,
                code: this.filterOptions[0].value,
                chargeTarget: this.filterOptions[1].value,
                projectType: this.filterOptions[2].value,
                incomeType: this.filterOptions[3].value,
                expenseType: this.filterOptions[4].value,
            }).then(res=>{
                this.tableData = res.data.records.map((x) => {
                    x.code ? x.code : (x.code = '-');
                    switch (x.projectType) {
                        case 'CREDIT_CLOUD':
                            x.projectType = '信贷云';
                            break;
                        case 'COLLECTION_CLOUD':
                            x.projectType = '收款云';
                            break;
                        case 'INSURANCE_CLOUD':
                            x.projectType = '保险云';
                            break;
                        case 'DOW_CLOUD':
                            x.projectType = 'Dow+云';
                            break;
                        case 'SELLER_CLOUD':
                            x.projectType = '豆服会员';
                            break;
                    }
                    switch (x.incomeType) {
                        case 'FINANCIAL_CLOUD_SUBSCRIBE_FEE':
                            x.incomeType = '金融云订阅收入';
                            break;
                        case 'INSURANCE_CLOUD_SUBSCRIBE_FEE':
                            x.incomeType = '保险云订阅收入';
                            break;
                        case 'DOW_SAAS_SUBSCRIBE_FEE':
                            x.incomeType = 'Dow+SaaS订阅收入';
                            break;
                        case 'DOW_3P_FEE':
                            x.incomeType = '3P DOW+收入';
                            break;
                        case 'SELLER_CLOUD_SERVICE_FEE':
                            x.incomeType = '豆服会员收入';
                            break;
                    }
                    switch (x.expenseType) {
                        case 'SAAS_SUBSCRIBE_FEE':
                            x.expenseType = 'SaaS订阅费';
                            break;
                        case 'DOW_SERVICE_CHARGE':
                            x.expenseType = 'Dow+服务费';
                            break;
                        case 'MEMBERSHIP_BENEFITS_FEE':
                            x.expenseType = '会员权益费';
                            break;
                        case 'ACCOUNT_OPENING_SERVICE_FEE':
                            x.expenseType = '开户服务费';
                            break;
                    }
                    x.currency ? x.currency : x.currency = '-';
                });
                this.tableData = res.data.records || [];
                this.totalSize = res.data.total;
            })
        },
        //导出
        _export() {
            this.$exportWarehouse(
                `/fact/charge/export?code=${this.filterOptions[0].value}&chargeTarget=${this.filterOptions[1].value}&projectType=${this.filterOptions[2].value}
                &incomeType=${this.filterOptions[3].value}&expenseType=${this.filterOptions[4].value}`
            );
        }
        
    }
};
</script>
<style>
.el-upload--text {
    height: 34px;
    border: none;
    width: 110px;
}
</style>
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


.list {
		/deep/.el-input__inner {
			width: 300px !important;
		}

		/deep/.el-form-item__content {
			width: 260px;
		}

	}
</style>