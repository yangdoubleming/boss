<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img
                    src="../../../../public/img/favicon.png"
                    style="width:17px;height:17px;margin-right:5px"
                    alt
                />{{$t('common_dsb')}} /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{$route.meta.title}}</span>
        </div>

        <el-card>
            <table-page
                :showPagination="false"
                :tableData="tableData"
                :showFilterRadio="false"
                :tableOperate="tableOperate"
                :filterOptions="filterOptions"
                :columns="columns"
                :totalSize="totalSize"
                :detailTable="true"
                @conditional-query="handleColumnsFilter"
                :current="currentPage"
                @conditional-reset="handleConditionalReset"
                @page-change="handlePageChange"
            />
            <div style="display:flex;align-items:center;height:500px">
                <div id="charts1" style="width:50%;height:500px"></div>
                <div id="charts2" style="width:50%;height:500px"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
import tablePage from '../../../components/common/tablePage.vue'
// import XForm from '../components/common/XForm.vue'
import { loanDataStatistics } from '../../../api/index';
export default {
    name: 'loanDataStatistics',
    components: {
        tablePage
    },
    data() {
        return {
              currentPage: 1,//页码
            totalSize: 0,//数据总条数
        
            exportData: [],
            isExporting: false,
            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'daterange',
                    value: [],
                    placeholder: '时间',
                    filterable: true,
                    options: []
                }
            ],
            columns: [
                {
                    label: '线索数量',
                    prop: 'leadsCount'
                },
                {
                    label: '注册客户数',
                    prop: 'registerUserCount'
                },
                {
                    label: '进件客户数',
                    prop: 'incomingUserCount'
                },
                {
                    label: '批复客户数',
                    prop: 'creditUserCount'
                },

                {
                    label: '放款客户数',
                    prop: 'loanUserCount'
                },

                {
                    label: '批复率',
                    prop: 'creditRate'
                },
                {
                    label: '支用率(客户数)',
                    prop: 'loanUserRate'
                },

                {
                    label: '批复总额(万元)',
                    prop: 'creditAmount'
                },
                {
                    label: '放款总额(万元)',
                    prop: 'loanAmount'
                },
                {
                    label: '支用率(金额)',
                    prop: 'loanAmountRate'
                }
            ],
            options1: {
                title: {
                    text: '放款客户所使用的支付公司'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    interval: 5
                },
                yAxis: {
                    type: 'category',
                    data: []
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        data: []
                    }
                ]
            },
            options2: {
                title: {
                    text: '放款产品情况'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    interval: 5
                },
                yAxis: {
                    type: 'category',
                    data: []
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        data: []
                    }
                ]
            },
            productsList: []
        };
    },
    mounted() {
        var day2 = new Date();
        day2.setTime(day2.getTime());
        var s2 = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate();
        this.filterOptions[0].value = [s2, s2];
        this._getList();
        //    this.filterOptions[0].value=[s2+' 00:00:00',s2+' 23:59:59']
    },
    methods: {
        
        handleConditionalQuery() {
          
            this._getListFirstPage()
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
        },
        _getList() {
            this.options1.yAxis.data=[]
            this.options1.series[0].data=[]
            this.options2.yAxis.data=[]
            this.options2.series[0].data=[]
            let starTime = this.filterOptions[0].value.length ? this.filterOptions[0].value[0] + ' 00:00:00' : '';
            let endTime = this.filterOptions[0].value.length ? this.filterOptions[0].value[1] + ' 23:59:59' : '';
            loanDataStatistics(starTime, endTime).then((res) => {
                res.data.creditRate=(res.data.creditRate*100).toFixed(1) +'%'
                res.data.loanUserRate=(res.data.loanUserRate*100).toFixed(1)+'%'
                res.data.loanAmountRate=(res.data.loanAmountRate*100).toFixed(1)+'%'
                
                
                this.tableData = [res.data];
                this.totalSize = 0;
                Object.keys(res.data.paymentUserCountMap).forEach((key) => {
                    this.options1.yAxis.data.push(key);
                    this.options1.series[0].data.push(res.data.paymentUserCountMap[key]);
                });
                Object.keys(res.data.loanLenderCountMap).forEach((key) => {
                    this.options2.yAxis.data.push(key);
                    this.options2.series[0].data.push(res.data.loanLenderCountMap[key]);
                });
                let dom1 = document.getElementById('charts1');
                let myChart1 = this.$echarts.init(dom1);
                myChart1.setOption(this.options1);
                 let dom2 = document.getElementById('charts2');
            let myChart2 = this.$echarts.init(dom2);
            myChart2.setOption(this.options2);
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