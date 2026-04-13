<template>
    <div style='margin-top:24px;padding-bottom:24px'>
        <div class='shops'>
            <el-card style='padding: 0'>
                <el-radio-group v-model='shopIndex' size='medium'>
                    <div v-for='(item, index) in allShopData' style='display: inline-block' :key='index'>
                        <el-radio-button :label='index' :key='index'>{{ $t('loan_detail_dp') }}{{ index + 1
                            }}</el-radio-button>
                    </div>
                </el-radio-group>
            </el-card>
        </div>
        <el-card shadow='hover' class='card3' v-for='(item, key) in tableData' :key='key'>
            <div class='score-title' style='margin-bottom: 36px; display: flex; align-items: center'>
                {{ item.title }}
            </div>
            <el-table :data='item.data' style='width: 100%' :border='true'
                :row-style="{ height: '50px', 'font-size': '14px' }">
                <el-table-column prop='head'>
                    <template slot-scope='scope'>
                        <div style='font-size: 14px; text-align: center; height: 30px; line-height: 30px'>{{
                    scope.row.head
                }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop='valueKey'>
                    <template slot-scope='scope'>
                        <div style='font-size: 14px; text-align: center; height: 30px; line-height: 30px'>{{
                        enums[scope.row.valueKey] ?
                            enums[scope.row.valueKey][allShopData[shopIndex][scope.row.valueKey]] :
                            allShopData[shopIndex][scope.row.valueKey]
                    }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>

<script>

import { getShopeeList } from '@/api';

export default {

    components: {
    },
    watch: {},
    created() {
        this.getData()
    },
    data() {
        return {
            enums: {
                past6MonthAvgMonthlyGmv: {
                    1: '500',
                    2: '2000',
                    3: '4500',
                    4: '8000',
                    5: '15000',
                    6: '25000',
                    7: '35000',
                    8: '45000',
                    9: '75000',
                    10: '125000',
                    11: '175000',
                    12: '400000',
                    13: '>600000'
                },
                gmvMom: {
                    1: '-90%',
                    2: '-65%',
                    3: '-25%',
                    4: '25%',
                    5: '75%',
                    6: '200%',
                    7: '>300%'
                },
                past3MonthNonOrderDays: {
                    1: 2,
                    2: 17,
                    3: 45,
                    4: '>60'
                },
                yearOnYearGrowthRateOverPast3MonthsTotalOrders: {
                    1: '<-30%',
                    2: '15%',
                    3: '230%',
                    4: '>400%'
                },
                past12MonthMaxMonthlyGmv: {
                    1: '1000',
                    2: '4500',
                    3: '13500',
                    4: '>20000'
                },
                past12MonthMinMonthlyGmv: {
                    1: '100',
                    2: '400',
                    3: '1300',
                    4: '>2000'
                },
                past6MonthAvgMonthlyCancelGmv: {
                    1: '15',
                    2: '50',
                    3: '135',
                    4: '>200'
                },
                past6MonthAvgMonthlyCancelOrders: {
                    1: '0.1',
                    2: '0.45',
                    3: '1.25',
                    4: '>1.8'
                },
                past6MonthAvgMonthlyRefundAmount: {
                    1: '15',
                    2: '50',
                    3: '135',
                    4: '>200'
                },
                past6MonthAvgMonthlyReturnOrders: {
                    1: '0.1',
                    2: '0.45',
                    3: '1.35',
                    4: '>2.0'
                }
            },
            tableData: {
                sales: {
                    title: '销售情况',
                    data: [
                        {
                            head: '近6个月月均销售额',
                            valueKey: 'past6MonthAvgMonthlyGmv'
                        },
                        {
                            head: '近1个月销售额较上月销售额增长率',
                            valueKey: 'gmvMom'
                        },
                        {
                            head: '近3个月销售笔数为0的天数',
                            valueKey: 'past3MonthNonOrderDays'
                        },
                        {
                            head: '近3个月销售订单较去年同期销售订单的增长率',
                            valueKey: 'yearOnYearGrowthRateOverPast3MonthsTotalOrders'
                        },
                        {
                            head: '近12个月最大单月销售额',
                            valueKey: 'past12MonthMaxMonthlyGmv'
                        },
                        {
                            head: '近12个月最小单月销售额',
                            valueKey: 'past12MonthMinMonthlyGmv'
                        },
                    ],
                },
                stable: {
                    title: '稳定情况',
                    data: [
                        {
                            head: '店铺惩罚计分',
                            valueKey: 'penaltyPoint'
                        },
                        {
                            head: '聊天回应',
                            valueKey: 'responseRate'
                        },
                        {
                            head: '店铺评分',
                            valueKey: 'shopRating'
                        },
                        {
                            head: '店铺经营月份数',
                            valueKey: 'shopeeOperatedMonths'
                        },
                    ],
                },
                compliance: {
                    title: '合规情况',
                    data: [
                        {
                            head: '退货/退款率',
                            valueKey: 'returnRefundRate'
                        },
                        {
                            head: '订单未完成率',
                            valueKey: 'nonFulfillmentRate'
                        },
                        {
                            head: '逾期出货率',
                            valueKey: 'lateShipmentRate'
                        },
                        {
                            head: '订单取消率',
                            valueKey: 'cancellationRate'
                        },
                        {
                            head: '近6个月月均取消金额',
                            valueKey: 'past6MonthAvgMonthlyCancelGmv'
                        },
                        {
                            head: '近6个月月均取消笔数',
                            valueKey: 'past6MonthAvgMonthlyCancelOrders'
                        },
                        {
                            head: '近6个月月均退货金额',
                            valueKey: 'past6MonthAvgMonthlyRefundAmount'
                        },
                        {
                            head: '近6个月月均退货笔数',
                            valueKey: 'past6MonthAvgMonthlyReturnOrders'
                        },
                    ],
                },
                other: {
                    title: '其他',
                    data: [
                        {
                            head: '准备时间(天)',
                            valueKey: 'averagePreparationTime'
                        }
                    ],
                }
            },
            pageData: [
                {
                    past6MonthAvgMonthlyGmv: '',
                    gmvMom: '',
                    past3MonthNonOrderDays: '',
                    yearOnYearGrowthRateOverPast3MonthsTotalOrders: '',
                    past12MonthMaxMonthlyGmv: '',
                    past12MonthMinMonthlyGmv: '',
                    penaltyPoint: '',
                    responseRate: '',
                    shopRating: '',
                    shopeeOperatedMonths: '',
                    returnRefundRate: '',
                    nonFulfillmentRate: '',
                    lateShipmentRate: '',
                    cancellationRate: '',
                    past6MonthAvgMonthlyCancelGmv: '',
                    past6MonthAvgMonthlyCancelOrders: '',
                    past6MonthAvgMonthlyRefundAmount: '',
                    past6MonthAvgMonthlyReturnOrders: '',
                    averagePreparationTime: ''
                }
            ],
            allShopData: [
                {
                    past6MonthAvgMonthlyGmv: '',
                    gmvMom: '',
                    past3MonthNonOrderDays: '',
                    yearOnYearGrowthRateOverPast3MonthsTotalOrders: '',
                    past12MonthMaxMonthlyGmv: '',
                    past12MonthMinMonthlyGmv: '',
                    penaltyPoint: '',
                    responseRate: '',
                    shopRating: '',
                    shopeeOperatedMonths: '',
                    returnRefundRate: '',
                    nonFulfillmentRate: '',
                    lateShipmentRate: '',
                    cancellationRate: '',
                    past6MonthAvgMonthlyCancelGmv: '',
                    past6MonthAvgMonthlyCancelOrders: '',
                    past6MonthAvgMonthlyRefundAmount: '',
                    past6MonthAvgMonthlyReturnOrders: '',
                    averagePreparationTime: ''
                }
            ],
            shopIndex: 0
        };
    },
    methods: {
        getData() {
            getShopeeList({ userId: this.$route.query.userId })
                .then((res) => {
                    this.allShopData = this.convertData(res.data);
                    this.checkTabLoading = false;
                })
                .catch((error) => {
                    this.checkTabLoading = false;
                });
        },
        convertData(data) {
            data.forEach(x => {
                x['responseRate'] = (Number(x['responseRate']) * 100).toFixed(2) + '%';
                x['returnRefundRate'] = (Number(x['returnRefundRate']) * 100).toFixed(2) + '%';
                x['nonFulfillmentRate'] = (Number(x['nonFulfillmentRate']) * 100).toFixed(2) + '%';
                x['lateShipmentRate'] = (Number(x['lateShipmentRate']) * 100).toFixed(2) + '%';
                x['cancellationRate'] = (Number(x['cancellationRate']) * 100).toFixed(2) + '%';
            });
            return data;
        },
    }
};
</script>

<style scoped lang='less'>
.card3 {
    border-radius: 10px;
    padding-left: 20px;
    margin-top: 20px;

    .data {
        display: flex;

        .data-item {
            width: 257px;
            height: 115px;
            background: #ffffff;
            box-shadow: 0px 5px 11px 0px rgba(7, 1, 2, 0.14);
            border-radius: 13px;
            padding: 14px 28px;
            box-sizing: border-box;
            margin-right: 13px;

            .item-bottom {
                margin-top: 25px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .item-icon {
                    width: 21px;
                    height: 15px;
                }

                .item-num {
                    font-size: 34px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #333333;
                }
            }

            .item-title {
                font-size: 17px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #333333;
            }
        }
    }
}

.shops {
    margin-top: 10px;

    /deep/.el-card__body {
        padding: 0;
    }

    /deep/.el-radio-button__inner {
        padding: 15px 30px;
    }
}
</style>