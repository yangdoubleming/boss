<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <div style="padding-top:30px;background:#fff">
            <table-page :detailTable="true" @changeTime='_changeTime' :productsOptions='productsOptions'
                @export='_export' @changeProducts='_changeProducts' :isExporting='isExporting' :isExport2='true'
                :showFilterRadio="false" :tableData="tableData" :tableOperate="tableOperate"
                :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize" @page-change="changeFilter"
                :current="currentPage" :lenderOptions="lenderOptions" @changeLender="_changeLender" />
        </div>

    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getProducts, balancePage, lenderList } from '../../../api/index';
export default {
    name: 'day-report',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            dates: ['', ''],
            lenderOptions: [],
            productsOptions: [],
            isExporting: false,
            tableOperate: [],
            tableData: [],
            filterOptions: [
                // {
                //     type: 'input',
                //     value: '',
                //     placeholder: '用户名',
                //     filterable: true,
                //     options: []
                // },
                // {
                //     type: 'input',
                //     value: '',
                //     placeholder: this.$t('loan_serch_phone'),
                //     filterable: true,
                //     options: []
                // }
            ],
            productsId: '',
            columns: [

                {
                    label: '产品名称',
                    prop: 'lenderProductName',
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime',
                },
                {
                    label: '当日放款',
                    prop: 'loanAmount',
                    width: '120'
                },
                {
                    label: '当日还款',
                    prop: 'repayment',
                    width: '120'
                },
                {
                    label: '当日余额',
                    prop: 'balance',
                    width: '120'
                },
                {
                    label: '技术费率',
                    prop: 'technicalRate',
                },

                {
                    label: '当日技术服务费',
                    prop: 'technicalServiceFee',
                    width: '150'
                },
                {
                    label: this.$t('loan_detail_xgsj'),
                    prop: 'updateTime'
                },




                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     width: '120',
                //     operates: [
                //         {
                //             event: 'quote',
                //             text: '更新',
                //             type: 'primary'
                //         }
                //     ],
                //     fixed: 'right'
                // }
            ]
        };
    },
    created() {
        lenderList().then((res) => {
            this.lenderOptions = res.data;
        });
        // let a =' '
        // console.log(a==='');
        // let address='广东省广州市番禺区钟村街钟二村广和大街1号'
        //  let regex = /.+?(省|市|自治区|自治州|县|区)/g;
        // let arr = address.match(regex).splice(0,3);
        //  console.log(arr);
        // console.log(address.replace(arr.join(''),''));
        this._getProducts()
    },
    methods: {
        _changeLender(val) {
            this.tableData = []
            this._getProducts(val == '全部' ? '' : val)
        },
        _getProducts(val) {
            getProducts(val || '').then(res => {
                this.productsOptions = res.data
            })
        },
        _changeTime(val) {
            this.dates = val
            console.log(val);
            this.changeFilter()
        },
        _changeProducts(val) {
            this.currentPage = 1
            this.productsId = val
            this.changeFilter()
        },
        _export() {
            if (!this.productsId.toString()) {
                this.$message.info('请先选择产品')
                return
            }
            let fileName = ''
            this.productsOptions.forEach(item => {
                if (item.id == this.productsId) {
                    fileName = item.productName
                }
            });
            this.isExporting = true
            let that = this

            const axios = require('axios');
            axios({
                methods: 'get',
                responseType: 'blob',
                url: this.dates.length ? `${this.baseUrl}/lending/daily/balance/export?lenderProductId=${this.productsId}&beginTime=${this.dates[0]}&endTime=${this.dates[1]}` : `${this.baseUrl}/lending/daily/balance/export?lenderProductId=${this.productsId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(function (res) {
                var blob = new Blob([res.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                var downloadElement = document.createElement('a');
                var href = window.URL.createObjectURL(blob);
                downloadElement.href = href;
                downloadElement.download = `${fileName}.xlsx`;
                document.body.appendChild(downloadElement);
                downloadElement.click();
                document.body.removeChild(downloadElement);
                window.URL.revokeObjectURL(href);
                that.isExporting = false;

            })
                .catch(error => {
                    that.isExporting = false;
                })

        },
        changeFilter(val) {

            this.currentPage = val ? val : this.currentPage
            balancePage(this.currentPage, this.dates[0], this.dates[1], this.productsId).then((res) => {

                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },
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