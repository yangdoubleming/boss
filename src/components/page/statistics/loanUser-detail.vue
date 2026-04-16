<template>
    <div class="service">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <el-card>
            <div class="block">
                <div class="line"></div>
                贷款信息
            </div>
            <el-form :model="formData" ref="ruleForm" label-width="180px" class="demo-ruleForm" inline>
                <el-form-item label="累计授信金额：" prop="bcName">
                    <span class="text">¥ {{ (loanAmount.creditAmount || 0).toLocaleString() }}</span>
                </el-form-item>
                <el-form-item label="累计放款金额：">
                    <span class="text">¥ {{ (loanAmount.loanAmount || 0).toLocaleString() }}</span>
                </el-form-item>
                <el-form-item label="当前在贷金额：" prop="bcName">
                    <span class="text">¥ {{ (loanAmount.surplus || 0).toLocaleString() }}</span>
                </el-form-item>

                <div class="block">
                    <div class="line"></div>
                    申请产品信息
                </div>
                <el-table :data="applicationInfoList" header-align="center"
                    style="width: 95%; margin-left:30px; margin-bottom: 50px">
                    <!-- <el-table-column label="第三方支付单号" width="" align="center">
                        <template slot-scope="scope">
                            {{ $route.query.paymentNo }}
                        </template>
</el-table-column> -->

                    <el-table-column prop="productName" :label="$t('loan_search_cpmc')" width=""
                        align="center"></el-table-column>
                    <el-table-column prop="lenderName" label="资方名称" width="" align="center"></el-table-column>
                    <el-table-column prop="bname" label="借款人姓名" width="" align="center"></el-table-column>
                    <el-table-column prop="bphoneNumber" label="借款人手机号" width="" align="center"></el-table-column>
                    <el-table-column prop="creditAmount" label="授信金额" width="" align="center"></el-table-column>
                    <el-table-column prop="loanAmount" label="累计放款金额" width="" align="center"></el-table-column>
                    <el-table-column prop="surplus" label="在贷金额" width="" align="center"></el-table-column>
                    <el-table-column prop="applicationCode" label="申请单号" width="" align="center"></el-table-column>
                    <el-table-column v-if="!isSaler" prop="openBank" label="详情" width="" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="goApplicationDetail(scope.row)">申请单详情</el-link>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="block">
                    <div class="line"></div>
                    贷款详情<span class="note"></span>
                </div>

                <div style="padding: 0 30px;">
                    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="applicationCode" default-expand-all border :tree-props="{ children: 'loanVoList', hasChildren: 'hasChildren' }">
                        <el-table-column prop="applicationCode" label="申请单号" width="230" />
                        <el-table-column prop="loanCode" label="贷款编号" width="230" />
                        <el-table-column prop="bname" label="借款人姓名" width="" />
                        <el-table-column prop="bphoneNumber" label="借款人手机号" />
                        <el-table-column prop="loanAmount" label="贷款金额">
                            <template slot-scope="scope">
                                {{ `${scope.row.loanAmount ? scope.row.currency == 'CNY' ? '￥' + scope.row.loanAmount : '$'
                                + scope.row.loanAmount:''}` }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="apr" label="贷款利率">
                            <template slot-scope="scope">
                                {{ `${scope.row.apr ? scope.row.apr + '%' : ''}` }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="loanStatus" label="贷款状态" />
                        <el-table-column prop="loanApplyDate" label="申请时间" />
                        <el-table-column prop="loanStartDate" label="放款时间" />
                    </el-table>
                </div>

                <div class="block">
                    <div class="line"></div>
                    {{ $t('loan_detail_sqxx') }}<span class="note"></span>
                </div>

                <el-form-item label="已锁定店铺数量：" prop="bcName">
                    <span class="text">{{ userOfferNum.lockOfferAccount || '-' }}</span>
                </el-form-item>
                <el-form-item label="已生效店铺数量：" prop="bcName">
                    <span class="text">{{ userOfferNum.notExpired || '-' }}</span>
                </el-form-item>
                <el-form-item label="绑定店铺数量" prop="bcName">
                    <span class="text">{{ userOfferNum.offerAccount || '-' }}</span>
                </el-form-item>

                <div class="block">
                    <div class="line"></div>
                    绑定{{ $t('loan_detail_sqxx') }}
                </div>
                <el-table row-key="applicationCode" :tree-props="{ children: 'children' }" :data="userOfferInfoList"
                    header-align="center" style="width: 95%; margin-left: 30px; margin-bottom: 100px">
                    <!-- <el-table-column label="第三方支付单号" width="" align="center">
                        <template slot-scope="scope">
                            {{ $route.query.paymentNo }}
                        </template>
                    </el-table-column> -->

                    <el-table-column prop="offerId" label="Offer ID" width="" align="center"></el-table-column>
                    <el-table-column prop="applicationTime" :label="$t('loan_detail_sqsj')" width=""
                        align="center"></el-table-column>
                    <el-table-column prop="yearShopSales" label="年销售额" width="" align="center">
                        <template slot-scope="scope">
                            {{ (scope.row.yearShopSales || 0).toLocaleString() }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="productName" label="授信产品名称" width="" align="center"></el-table-column>
                    <el-table-column prop="applicationCode" label="申请单号" width="" align="center"></el-table-column>
                    <el-table-column v-if="!isSaler" prop="openBank" label="详情" width="" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="goApplicationDetail(scope.row)">申请单详情</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { serveList, getBankForLoan, getLoanFile, repaymentPlan, getLoanDetail } from '../../../api/dhfq';
import { getLoanUserLoanDetail, getApplicationInfo, getUserOfferNum, getUserOfferInfo, crmLoanDetails } from '../../../api/index';
export default {
    data() {
        return {
            isSaler: false,
            repaymentPlan: [],
            loanAmount: {},
            billData: [],
            formData: {},
            fileList: [],
            dialogFormVisible: true,

            currentPage: 1,
            totalSize: 10,
            bankInfo: {},
            serveInfo: {},
            serveAmount: 0,
            loadAmount: 0,
            value: '',
            paymentFile: '',
            loanFile: '',
            loanRecod: {},

            applicationInfoList: [],
            imgsBaseUrl: process.env.VUE_APP_IMGS_BASE_URL,
            loanDetailData: {},
            userOfferNum: {},
            userOfferInfoList: [],
            orderStatus: [
                'CREATED',
                'SUBMITTED',
                'RECEIVED_1ST',
                'RECEIVED_2ND',
                'APPROVED',
                'ENABLED',
                'REJECTED',
                'ABANDONED',
                'WITHDRAWED',
                'DISBURSED',
                'OVERDUE',
                'CLOSED'
            ],
            orderStatusStr: [
                '已创建',
                '已提交',
                '已初核',
                '已复核',
                '已批准',
                '已启用',
                '已拒绝',
                '已放弃',
                '已提款',
                '已放款',
                '已逾期',
                '已关闭'
            ],
            tableData: [],
        };
    },
    created() {
        crmLoanDetails({ userId: this.$route.query.userId }).then((res) => {
            this.tableData = res.data;
        });
        //销售不让去详情页面
        if (localStorage.getItem('role') == 37) {
            this.isSaler = true
        }
        getLoanUserLoanDetail({ userId: this.$route.query.userId }).then((res) => {
            this.loanAmount = res.data;
        });
        getApplicationInfo({ userId: this.$route.query.userId }).then((res) => {
            res.data.forEach((item) => {
                // 转状态
                item.applicationStatus = this.orderStatus.indexOf(item.applicationStatus).toString()
                    ? this.orderStatusStr[this.orderStatus.indexOf(item.applicationStatus)]
                    : '';
            });
            this.applicationInfoList = res.data;
        });
        const offerMap = {};
        getUserOfferNum({ userId: this.$route.query.userId }).then((res) => {
            this.userOfferNum = res.data;
            res.data.userDetailOfferDTOList.forEach((item, index) => {
                // 转状态
                item.applicationStatus = this.orderStatus.indexOf(item.applicationStatus).toString()
                    ? this.orderStatusStr[this.orderStatus.indexOf(item.applicationStatus)]
                    : '';
                if (!offerMap[item.offerId]) {
                    // 如果该 offerId 还没记录过，将当前项作为父节点
                    offerMap[item.offerId] = {
                        ...item,
                        children: []
                    };
                } else {
                    // 如果已经有记录，将当前项作为子节点添加到对应父节点的 children 数组中
                    offerMap[item.offerId].children.push(item);
                }
            });
            this.userOfferInfoList = Array.from(Object.values(offerMap));

        });

        // 1;
    },
    methods: {
        goApplicationDetail(row) {
            if (!row.applicationCode) {
                return this.$message.warning('无申请单编号');
            }
            this.$router.push({
                path: '/unified-applicationDetail',
                query: {
                    id: row.applicationId,
                    loanNumber: row.applicationCode,
                    creditAmount: Number(row.creditAmount / 10000).toFixed(2),
                    applicationStatus: row.applicationStatus,
                    account: this.$route.query.account,
                    userId: this.$route.query.userId,
                    lenderId: row.lenderId
                }
            });
        },
        getNextDate(date, day) {
            var dd = new Date(date);
            dd.setDate(dd.getDate() + day);
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;
            var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
            return y + '-' + m + '-' + d;
        },
        _getLoanFile(url) {
            window.open(url);
        },
        _getList() { }
    }
};
</script>

<style lang="less">
.service {
    .text {
        width: 280px;
        display: block;
        padding-left: 15px;
        box-sizing: border-box;
    }

    .block {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Medium;
        width: 100%;
        padding-left: 32px;
        margin: 24px 0;
        font-size: 18px;
        color: #323232;
        letter-spacing: 0;
        text-align: justify;
        line-height: 26px;
        font-weight: 500;

        .note {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #646566;
            letter-spacing: 0;
            text-align: justify;
            line-height: 26px;
            font-weight: 400;
            padding-left: 12px;
        }

        .line {
            width: 4px;
            height: 16px;
            background: #e52d6d;
            margin-right: 8px;
        }
    }
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
