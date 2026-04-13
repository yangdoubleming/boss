<template>
    <div class="new">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <!-- <mail-table  :tableData="tableData" :totalSize='totalSize' @handleCurrentChange='changeCurrent' :tableStyle="{ width:'600px' }"></mail-table> -->

        <div v-for="(item, index) in tableData" :key="index"
            style="display: block; margin: 0 auto; margin-bottom: 30px; width: 1205px">
            <div style="display: block; margin: 0 auto; margin-bottom: 30px; width: 1205px">
                <p style="text-align: center; padding-bottom: 15px">{{ item.createTime }}</p>
                <div class="b">
                    <div class="content1">节点名称</div>
                    <div class="content2">数量</div>
                    <div class="content1">各节点与上一节点转化率</div>
                    <div class="content2">总转化率</div>
                </div>
                <div class="b">
                    <div class="content1">offer点击跳转落地页</div>
                    <div class="content2">{{ item.offerJumpCount }}</div>
                    <div class="content1">-</div>
                    <div class="content2">-</div>
                </div>
                <div class="b">
                    <div class="content1">注册offer数量</div>
                    <div class="content2">{{ item.offerCount }}</div>
                    <div class="content1">{{ (item.offerRate * 100).toFixed(1) }}%</div>
                    <div class="content2">{{ (item.offerRateSum * 100).toFixed(1) }}%</div>
                </div>
                <div class="b">
                    <div class="content1">注册用户数量</div>
                    <div class="content2">{{ item.userCount }}</div>
                    <div class="content1">-</div>
                    <div class="content2">-</div>
                </div>
                <div class="b">
                    <div class="content1">手机扫码</div>
                    <div class="content2">{{ item.phoneCodeScanCount }}</div>
                    <div class="content1">{{ (item.phoneCodeScanRate * 100).toFixed(1) }}%</div>
                    <div class="content2">{{ (item.phoneCodeScanRateSum * 100).toFixed(1) }}%</div>
                </div>

                <div class="b">
                    <div class="content1">进入授信流程</div>
                    <div class="content2">{{ item.creditCount }}</div>
                    <div class="content1">{{ (item.creditRate * 100).toFixed(1) }}%</div>
                    <div class="content2">{{ (item.creditRateSum * 100).toFixed(1) }}%</div>
                </div>
                <div class="b">
                    <div class="content1">预申请通过</div>
                    <div class="content2">{{ item.advanceApplicationCount }}</div>
                    <div class="content1">{{ (item.advanceApplicationRate * 100).toFixed(1) }}%</div>
                    <div class="content2">{{ (item.advanceApplicationRateSum * 100).toFixed(1) }}%</div>
                </div>
                <div class="b">
                    <div class="content1">开通二类户</div>
                    <div class="content2">{{ item.iiAccountCount }}</div>
                    <div class="content1">{{ (item.iiAccountRate * 100).toFixed(1) }}%</div>
                    <div class="content2">{{ (item.iiAccountRateSum * 100).toFixed(1) }}%</div>
                </div>
                <div class="b">
                    <div class="content1">授信结果</div>
                    <div class="content2">{{ item.creditResultCount }}</div>
                    <div class="content1">{{ (item.creditResultRate * 100).toFixed(1) }}%</div>
                    <div class="content2">{{ (item.creditResultRateSum * 100).toFixed(1) }}%</div>
                </div>
                <div class="b">
                    <div class="content1">签署授信合同</div>
                    <div class="content2">{{ item.creditContractCount }}</div>
                    <div class="content1">{{ (item.creditContractRate * 100).toFixed(1) }}%</div>
                    <div class="content2">{{ (item.creditContractRateSum * 100).toFixed(1) }}%</div>
                </div>
                <!-- <div class="b">
                <div class="content1">账户锁定</div>
                <div class="content2">{{ item.accountLockCount }}</div>
                <div class="content1">{{ item.accountLockRate }}</div>
                <div class="content2">{{ item.accountLockRateSum }}</div>
            </div>
            <div class="b">
                <div class="content1">发起支用</div>
                <div class="content2">{{ item.expenditureCount }}</div>
                <div class="content1">{{ item.expenditureRate }}</div>
                <div class="content2">{{ item.expenditureRateSum }}</div>
            </div>
            <div class="b">
                <div class="content1">支付担保费</div>
                <div class="content2">{{ item.paymentGuaranteeFeeCount }}</div>
                <div class="content1">{{ item.paymentGuaranteeFeeRate }}</div>
                <div class="content2">{{ item.paymentGuaranteeFeeRateSum }}</div>
            </div>
            <div class="b">
                <div class="content1">放款</div>
                <div class="content2">{{ item.loanCount }}</div>
                <div class="content1">{{ item.loanRate }}</div>
                <div class="content2">{{ item.loanRateSum }}</div>
            </div> -->
                <!-- <div class="b">
                <div class="content1"></div>
                <div class="content2"></div>
                <div class="content1"></div>
                <div class="content2"></div>
            </div> -->
                <div class="b">
                    <div class="content2 w">先锁定后支用</div>

                    <div class="content2 w">先支用后锁定</div>
                </div>
                <div class="b">
                    <div class="content1">
                        <div class="grid1">节点名称</div>
                        <div class="grid2">数量</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">相邻节点转化率</div>
                        <div class="grid2">总转化率</div>
                    </div>
                    <div class="content1">
                        <div class="grid1">节点名称</div>
                        <div class="grid2">数量</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">相邻节点转化率</div>
                        <div class="grid2">总转化率</div>
                    </div>
                </div>

                <div class="b">
                    <div class="content1">
                        <div class="grid1">锁定的客户</div>
                        <div class="grid2">{{ item.accountLockCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">{{ (item.accountLockRate * 100).toFixed(1) }}%</div>
                        <div class="grid2">{{ (item.accountLockRateSum * 100).toFixed(1) }}%</div>
                    </div>
                    <div class="content1">
                        <div class="grid1">发起支用</div>
                        <div class="grid2">{{ item.newExpenditureUnlockCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">{{ (item.newExpenditureUnlockRate * 100).toFixed(1) }}%</div>
                        <div class="grid2">{{ (item.newExpenditureUnlockRateSum * 100).toFixed(1) }}%</div>
                    </div>
                </div>

                <div class="b">
                    <div class="content1">
                        <div class="grid1">发起支用</div>
                        <div class="grid2">{{ item.expenditureCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">{{ (item.expenditureRate * 100).toFixed(1) }}%</div>
                        <div class="grid2">{{ (item.expenditureRateSum * 100).toFixed(1) }}%</div>
                    </div>
                    <div class="content1">
                        <div class="grid1">支付担保费</div>
                        <div class="grid2">{{ item.newPaymentGuaranteeFeeUnlockCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">{{ (item.newPaymentGuaranteeFeeUnlockRate * 100).toFixed(1) }}%</div>
                        <div class="grid2">{{ (item.newPaymentGuaranteeFeeUnlockRateSum * 100).toFixed(1) }}%</div>
                    </div>
                </div>

                <div class="b">
                    <div class="content1">
                        <div class="grid1">支付担保费</div>
                        <div class="grid2">{{ item.paymentGuaranteeFeeCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">{{ (item.paymentGuaranteeFeeRate * 100).toFixed(1) }}%</div>
                        <div class="grid2">{{ (item.paymentGuaranteeFeeRateSum * 100).toFixed(1) }}%</div>
                    </div>
                    <div class="content1">
                        <div class="grid1">放款客户</div>
                        <div class="grid2">{{ item.newLoanUnlockCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">{{ (item.newLoanUnlockRate * 100).toFixed(1) }}%</div>
                        <div class="grid2">{{ (item.newLoanUnlockRateSum * 100).toFixed(1) }}%</div>
                    </div>
                </div>

                <div class="b">
                    <div class="content1">
                        <div class="grid1">放款客户</div>
                        <div class="grid2">{{ item.loanCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">{{ (item.loanRate * 100).toFixed(1) }}%</div>
                        <div class="grid2">{{ (item.loanRateSum * 100).toFixed(1) }}%</div>
                    </div>
                    <div class="content1">
                        <div class="grid1">锁定的客户-2</div>
                        <div class="grid2">{{ item.newAccountLockCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">{{ (item.newAccountLockRate * 100).toFixed(1) }}%</div>
                        <div class="grid2">{{ (item.newAccountLockRateSum * 100).toFixed(1) }}%</div>
                    </div>
                </div>

                <div class="b">
                    <div class="content1">
                        <div class="grid1"></div>
                        <div class="grid2"></div>
                    </div>
                    <div class="content2">
                        <div class="grid1"></div>
                        <div class="grid2"></div>
                    </div>
                    <div class="content1">
                        <div class="grid1">发起支用</div>
                        <div class="grid2">{{ item.newExpenditureLockCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">{{ (item.newExpenditureLockRate * 100).toFixed(1) }}%</div>
                        <div class="grid2">{{ (item.newExpenditureLockRateSum * 100).toFixed(1) }}%</div>
                    </div>
                </div>

                <div class="b">
                    <div class="content1">
                        <div class="grid1"></div>
                        <div class="grid2"></div>
                    </div>
                    <div class="content2">
                        <div class="grid1"></div>
                        <div class="grid2"></div>
                    </div>
                    <div class="content1">
                        <div class="grid1">支付担保费</div>
                        <div class="grid2">{{ item.newPaymentGuaranteeFeeLockCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">{{ (item.newPaymentGuaranteeFeeLockRate * 100).toFixed(1) }}%</div>
                        <div class="grid2">{{ (item.newPaymentGuaranteeFeeLockRateSum * 100).toFixed(1) }}%</div>
                    </div>
                </div>

                <div class="b">
                    <div class="content1">
                        <div class="grid1"></div>
                        <div class="grid2"></div>
                    </div>
                    <div class="content2">
                        <div class="grid1"></div>
                        <div class="grid2"></div>
                    </div>
                    <div class="content1">
                        <div class="grid1">放款客户</div>
                        <div class="grid2">{{ item.newLoanLockCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1">{{ (item.newLoanLockRate * 100).toFixed(1) }}%</div>
                        <div class="grid2">{{ (item.newLoanLockRateSum * 100).toFixed(1) }}%</div>
                    </div>
                </div>
            </div>
            <div
                style="color: rgb(85, 95, 112); font-size: 18px; font-weight: 800; padding-left: 5px; padding-bottom: 5px">
                统计面板</div>
            <div style="width: 602px">
                <div class="b">
                    <div class="content1">
                        <div class="grid1">统计名称</div>
                        <div class="grid2">数量</div>
                    </div>
                    <div class="content2">
                        <div class="grid1"></div>
                        <div class="grid2">转化率</div>
                    </div>
                </div>
                <div class="b">
                    <div class="content1">
                        <div class="grid1">总客户数</div>
                        <div class="grid2">{{ item.loanUserCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1"></div>
                        <div class="grid2">{{ (item.loanUserRateSum * 100).toFixed(1) }}%</div>
                    </div>
                </div>

                <div class="b">
                    <div class="content1">
                        <div class="grid1">锁定放款客户数</div>
                        <div class="grid2">{{ item.loanUserLockCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1"></div>
                        <div class="grid2">{{ (item.loanUserLockRateSum * 100).toFixed(1) }}%</div>
                    </div>
                </div>
                <div class="b">
                    <div class="content1">
                        <div class="grid1">未锁定放款客户数</div>
                        <div class="grid2">{{ item.loanUserUnlockCount }}</div>
                    </div>
                    <div class="content2">
                        <div class="grid1"></div>
                        <div class="grid2">{{ (item.loanUserUnlockRateSum * 100).toFixed(1) }}%</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="btm">
            <el-pagination background layout="prev, pager, next" :page-size="1" :total="totalSize"
                @current-change="changeCurrent"></el-pagination>
        </div>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { conversion } from '../../../api/index';
import mailTable from '../../common/Ytable.vue';
export default {
    name: 'conversion',
    mixins: [tableMixin],
    components: {
        tablePage,
        mailTable
    },
    data() {
        return {
            uploadUrl: 'http://114.116.249.242:8009/dowsure-file/file-upload/uploadImg/upload',
            tableOperate: [],
            tableData: [],
            filterOptions: [],
            columns: [
                {
                    label: '账户锁定数量',
                    prop: 'accountLockCount',
                    width: '140'
                },

                {
                    label: '账户锁定转换率',
                    prop: 'accountLockRate',
                    width: '120'
                },
                {
                    label: '账户锁定总转换率',
                    prop: 'accountLockRateSum',
                    width: '120'
                },

                {
                    label: '预申请通过数量',
                    prop: 'advanceApplicationCount',
                    width: '120'
                },
                {
                    label: '预申请通过转换率',
                    prop: 'advanceApplicationRate',
                    width: '120'
                },

                {
                    label: '预申请通过总转换率',
                    prop: 'advanceApplicationRateSum',
                    width: '140'
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime'
                },
                {
                    label: '签署授信合同数量',
                    prop: 'creditContractCount',
                    width: '120'
                },

                {
                    label: '签署授信合同转换率',
                    prop: 'creditContractRate',
                    width: '140'
                },
                {
                    label: '签署授信合同总转换率',
                    prop: 'creditContractRateSum',
                    width: '140'
                },
                {
                    label: '授信数量',
                    prop: 'creditCount'
                },
                {
                    label: '授信转换率',
                    prop: 'creditRate'
                },
                {
                    label: '授信总转换率',
                    prop: 'creditRateSum',
                    width: '120'
                },
                {
                    label: '授信结果数量',
                    prop: 'creditResultCount',
                    width: '120'
                },
                {
                    label: '授信结果转换率',
                    prop: 'creditResultRate',
                    width: '120'
                },
                {
                    label: '授信结果总转换率',
                    prop: 'creditResultRateSum',
                    width: '120'
                },
                {
                    label: '发起支用数量',
                    prop: 'expenditureCount',
                    width: '120'
                },
                {
                    label: '发起支用转换率',
                    prop: 'expenditureRate',
                    width: '120'
                },
                {
                    label: '发起支用总转换率',
                    prop: 'expenditureRateSum',
                    width: '120'
                },
                {
                    label: '二类户数量',
                    prop: 'iiAccountCount',
                    width: '120'
                },
                {
                    label: '二类户转换率',
                    prop: 'iiAccountRate',
                    width: '120'
                },
                {
                    label: '二类户总转换率',
                    prop: 'iiAccountRateSum',
                    width: '120'
                },
                {
                    label: '放款数量',
                    prop: 'loanCount'
                },
                {
                    label: '放款转换率',
                    prop: 'loanRate '
                },
                {
                    label: '放款总转换率',
                    prop: 'loanRateSum',
                    width: '120'
                },
                {
                    label: '注册offer数量',
                    prop: 'offerCount',
                    width: '120'
                },
                {
                    label: 'offer点击跳转落地页',
                    prop: 'offerJumpCount',
                    width: '140'
                },
                {
                    label: '注册offer转换率',
                    prop: 'offerRate',
                    width: '120'
                },
                {
                    label: '注册offer总转换率',
                    prop: 'offerRateSum',
                    width: '120'
                },
                {
                    label: '支付担保费数量',
                    prop: 'paymentGuaranteeFeeCount',
                    width: '140'
                },
                {
                    label: '支付担保费转换率',
                    prop: 'paymentGuaranteeFeeRate',
                    width: '140'
                },
                {
                    label: '支付担保费总转换率',
                    prop: 'paymentGuaranteeFeeRateSum',
                    width: '140'
                },
                {
                    label: '手机扫码数量',
                    prop: 'phoneCodeScanCount',
                    width: '120'
                },
                {
                    label: '手机扫码转换率',
                    prop: 'phoneCodeScanRate',
                    width: '120'
                },
                {
                    label: '手机扫码总转换率',
                    prop: 'phoneCodeScanRateSum',
                    width: '140'
                },
                {
                    label: this.$t('loan_detail_xgsj'),
                    prop: 'updateTime'
                },
                {
                    label: '注册用户数量',
                    prop: 'userCount',
                    width: '120'
                }

                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     width: '120',
                //     operates: [
                //         {
                //             event: 'quote',
                //             text:this.$t('common_see'),
                //             type: 'primary'
                //         }
                //     ],
                //     fixed: 'right'
                // }
            ],
            productsList: []
        };
    },
    created() { },
    methods: {
        changeCurrent(val) {
            this.currentPage = val;
            this._getList();
        },
        _getList() {
            conversion(this.currentPage, 'BIND_OFFER', '').then((res) => {
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        }
    }
};
</script>

<style lang='less' scope>
.w {
    width: 50% !important;
}

.new {
    .clear-r {
        border-right: none !important;
    }

    .fc {
        flex-direction: column !important;
    }

    .l-grid2 {
        height: 50px;
        width: 100%;
        border-top: 1px solid #e9e9e9;
        border-right: 1px solid #e9e9e9;
        display: flex;

        justify-content: center;
        align-items: center;
    }

    .l-grid1 {
        height: 50px;
        width: 100%;
        flex: 1;
        display: flex;

        justify-content: center;
        align-items: center;
        border-right: 1px solid #e9e9e9;
    }

    .grid1 {
        height: 100%;
        width: 50%;
        border-right: 1px solid #e9e9e9;
        display: flex;

        justify-content: center;
        align-items: center;
    }

    .grid2 {
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btm {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 50px;
        margin-bottom: 50px;
    }

    .b {
        width: 100%;
        height: 50px;
        display: flex;
        border-left: 1px solid #e9e9e9;
        border-top: 1px solid #e9e9e9;

        .content1 {
            width: 300px;
            height: 100%;
            line-height: 50px;
            text-align: center;
            background-color: #fafafa;
            border-right: 1px solid #e9e9e9;
            border-bottom: 1px solid #e9e9e9;
            color: #333;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .content2 {
            width: 300px;
            height: 100%;
            line-height: 50px;
            text-align: center;
            background-color: #fff;
            border-right: 1px solid #e9e9e9;
            border-bottom: 1px solid #e9e9e9;
            // color: #b0b0b2;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>