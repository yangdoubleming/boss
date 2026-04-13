<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 / 运营管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{$route.meta.title}}</span>
        </div>

       

        <el-row :gutter="24" class="searchForm">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 30px 20px">
                        <el-row style="display: flex">
                            <el-form-item>
                                <el-input v-model="ruleForm.orderNumber" placeholder="订单编号"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-select v-model="ruleForm.rewardType" placeholder="返佣类型" style="width: 100%">
                                    <el-option label="推荐返佣" value="1"></el-option>
                                    <el-option label="代理返佣" value="2"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item class="timeC">
                                <el-date-picker
                                    v-model="dateTime"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    value-format="yyyy-MM-dd"
                                    :clearable="clearable"
                                >
                                </el-date-picker>
                            </el-form-item>

                            <div class="button">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">搜索</el-button>
                                <el-button @click="reset" style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                                <el-button @click="exportDetail" type="primary" style="width: 110px">导出返佣明细</el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px">合伙人返佣流水</div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%; font-size: 14px">
                    <el-table-column prop="productTypeName" label="活动" align="center"></el-table-column>
                    <el-table-column prop="userName" label="合伙人姓名" align="center"> </el-table-column>
                    <el-table-column prop="parentType" label="合伙人类型" align="center"> </el-table-column>
                    <el-table-column prop="userInvitationCode" label="邀请码" align="center"> </el-table-column>=
                    <el-table-column prop="customerOrderNumber" label="订单编号" align="center"> </el-table-column>
                    <el-table-column prop="rewardTypeName" label="返佣类型" align="center"> </el-table-column>
                    <el-table-column prop="customerOrderAmount" label="保费/元" align="center"> </el-table-column>
                    <el-table-column prop="moneyOrderAmount" label="返佣金额/元" align="center"> </el-table-column>
                    <el-table-column prop="createTime" label="返佣时间" align="center"> </el-table-column>
                </el-table>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="pageSize"
                    @current-change="currentChange"
                    style="text-align: right; margin: 40px 20px"
                    hide-on-single-page
                >
                </el-pagination>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import { getUserAmountLogList, downloadList } from '@/api/insur';
import moment from 'moment'; //导入文件
export default {
    name: 'rebate-water',
    data() {
        return {
             clearable: false,
            ruleForm: {
                orderNumber: '',
                rewardType: '',
                dateStart: '',
                dateEnd: '',
                page: 1,
                rows: 10
            },
            dateTime: [],
            tableData: [],
            total: 0,
            pageSize: 10,
            dateTime: [],
            baseUrl: process.env.VUE_APP_TEXT_URL
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        searchData() {
           this.ruleForm.dateStart = this.dateTime&& this.dateTime.length?this.dateTime[0]:'';
            this.ruleForm.dateEnd =  this.dateTime&& this.dateTime.length?this.dateTime[1]:''
            this.ruleForm.page = 1;
            // console.log(this.ruleForm)
            this.getDataList();
        },
        exportDetail() {
            // window.open(this.uploadUrl + `/template/download`);
            const axios = require('axios');
            axios({
                method: 'post',
                responseType: 'blob',
                url: `${this.baseUrl}/download/getUserAmountLogList`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: this.ruleForm
            })
                .then(function (res) {
                    console.log(res);
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `返佣明细${moment().format('YYYYMMDD')}.xls`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                })
                .catch((error) => {
                    console.log(error.data);
                });
        },
        getDataList() {
            getUserAmountLogList(this.ruleForm).then((res) => {
                // console.log(res.data);
                if (res.code === '200') {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                }
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.page = index;
            this.getDataList(this.ruleForm);
        },
        reset() {
            this.ruleForm.orderNumber = '';
            this.ruleForm.rewardType = '';
            this.ruleForm.dateStart = '';
            this.ruleForm.ateEnd = '';
        }
    }
};
</script>

<style lang='less' scoped>
.topSum {
    margin-bottom: 20px;
    .grid-content {
        display: flex;
        height: 100px;
    }

    .grid-cont-right {
        width: 180px;
        height: 100%;
        font-size: 14px;
        display: flex;
        margin-top: 24px;
        margin-left: 24px;
        flex-direction: column;
    }

    .grid-num {
        font-size: 15px;
    }
    .grid-num2 {
        font-size: 15px;
        padding-top: 12px;
    }
}

.searchForm {
    .el-form-item {
        width: 23%;
        margin-right: 2%;
        margin-bottom: 0;
    }
    .timeC {
        .el-date-editor {
            width: 280px;
        }
    }
    .button {
        // width: 300px;
        .el-button {
            width: 90px;
            // margin-right: 35px;
        }
    }
}

.dataList {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
    /deep/.el-table th > .cell {
        color: #000;
    }

    /deep/.el-table__row {
        td:nth-child(8) {
            .cell {
                color: #fe1964;
            }
        }
        // td:nth-child(3) {
        //     .cell {
        //         color: #fe1964;
        //     }
        // }
    }
}
</style>