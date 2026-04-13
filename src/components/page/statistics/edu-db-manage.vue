<template>
    <div class="service" v-loading="loading">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <el-card>
            <div class="block">
                <div class="line"></div>
                额度
                <div style="font-size: 16px; color: #E10453; margin-left: 30px;font-weight: bold;">金额单位（{{ isAmerican
                }}）
                </div>
            </div>
            <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="180px"
                style="margin-left: 50px;">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item prop="dclAmount">
                            <template #label>
                                授信额度 (DCL额度)
                                <span style="margin-left: 8px;">总计店铺个数<b style="color: #E10453;">{{ shopsNum }}</b>个</span><span @click.stop="goShopsDetail" style="margin-left: 8px; color: #E10453;cursor: pointer;">店铺详情</span>
                            </template>
                            <el-input v-model="ruleForm.dclAmount" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {
    updateNewApplicationsInfo,
    getLoanUserLoanDetail,
    getApplicationInfo,
    getUserOfferNum,
    editQuotaAllocation,
    getInfoQuotaAllocation,
    getApplicationRecords,
    getUserApplications, getNewApplicationsInfo
} from '../../../api/index';
export default {
    data() {
        return {
            tableShopData:[],
            loading: false,
            isEdit: false,
            repaymentPlan: [],
            loanAmount: {},
            billData: [],
            ruleForm: {
                dclAmount: '',                 // dcl额度
                ucsAmount: '',                 // ucs额度
                creditLoanAmount: '',                 // 信贷额度
                surplusAmount: '',                 // 冗余额度
                bnplAmount: '',                 // BNPL额度
                frozenAmount: '',                 // 冻结额度
                customerNo: '',                 // 客户号
                customerLenderAmountList: [   // 客户下面已经出过授信
                    {
                        applicationCode: '',  // 申请单号
                        lenderId: '',   // 资方ID
                        riskCreditAmount: '',   // 可支用额度
                        bnplLimit:"",//bnpl
                        redundantLimit:"",
                    }
                ],
                newAmount:[
                    {
                        applicationCode: '',  // 申请单号
                        lenderId: '',   // 资方ID
                        riskCreditAmount: '',   // 可支用额度
                        bnplLimit:"",//bnpl
                        redundantLimit:"",
                        lenderName: "",
                        dclAmount: "",
                    }
                ]
            },
            rules: {
                ucsAmount: [
                    { required: true, message: '请输入DCL额度', trigger: 'blur' },
                ],
                creditLoanAmount: [
                    { required: true, message: '请输入信贷额度', trigger: 'blur' },
                ],
                surplusAmount: [
                    { required: true, message: '请输入冗余额度', trigger: 'blur' },
                ],
                bnplAmount: [
                    { required: true, message: '请输入BNPL额度', trigger: 'blur' },
                ],
                frozenAmount: [
                    { required: true, message: '请输入冻结额度', trigger: 'blur' },
                ],
            },
            fileList: [],
            shopsNum: 0,
            dialogFormVisible: true,
            applicationCode:'',
            currentPage: 1,
            totalSize: 10,
            tableData: [],
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
            isAmerican: '万元'
        };
    },
    created() {
        //在贷信息查询接口
        this.getApplications()
        this.getNewApplicationInfo()
        // 查询客户额度配置信息
        this.getInfoQuotaAllocation()
        // 申请记录
        this.getApplicationRecords()
    },
    methods: {
        goShopsDetail(){
            this.$router.push({
                path: '/shops-detail'
            });
        },
        getNewApplicationInfo(){
            const userId = this.$route.query.userId;
            const wId    = this.$route.query.wId;
            getNewApplicationsInfo(
                {
                    userId: userId,
                    wId:wId,
                }
            ).then(response => {
                sessionStorage.setItem('offerIds',JSON.stringify(response.data[0].offerIds))
                this.shopsNum = response.data[0].shops;
                this.$set(this.ruleForm, 'dclAmount',  (Number(response.data[0].dclAmount) / 10000).toFixed(2));
                // 保证响应式，并补全属性
                const arr = (response.data || []).map(item => ({
                    applicationCode: item.applicationCode || 0,
                    lenderId: item.lenderId || 0,
                    riskCreditAmount: (Number(item.riskCreditAmount) / 10000).toFixed(2)|| 0,
                    bnplLimit: (Number(item.bnplLimit) / 10000).toFixed(2)|| 0,
                    redundantLimit:  (Number(item.redundantLimit) / 10000).toFixed(2)|| 0,
                    lenderName: item.lenderName || '',
                    shops: item.shops || 0,
                    dclAmount:  (Number(item.dclAmount) / 10000).toFixed(2)|| 0
                }))
                this.$set(this.ruleForm, 'newAmount', arr)
            })
        },
        goDetail(row){
         let  nowCurrencyPath = ''

            if(row.currency==='CNY'){
                nowCurrencyPath = '/loanAssitance-detail'
            } else{
                nowCurrencyPath = '/us-detail'
            }
         
         let     queryObj = {
                loanNumber: row.applicationCode,
                creditAmount:  (Number(row.creditAmount) / 10000).toFixed(2),
                userId: row.userId,
                lenderId: row.lenderId,
            }
        this.$router.push({
            path: nowCurrencyPath,
            query: queryObj
        });
        },
        //在贷信息查询接口
        getApplications(){
            const userId = this.$route.query.userId;
            const wId    = this.$route.query.wId;
            getUserApplications({
              // userId: "581556",
              // wId:"W0001",
                userId: userId,
                wId:wId,
          }).then((res) => {
              // sessionStorage.setItem('offerIds', JSON.stringify(res.data));
                this.applicationCode = res.data[0].applicationCode;
            this.tableShopData = res.data.map(item => {
                item.currency ==='CNY' ? item.currencySignal='￥' :  item.currencySignal='$'
                item.creditAmount =   (Number(item.creditAmount) / 10000).toFixed(2)
                item.loanAmount =   (Number(item.loanAmount) / 10000).toFixed(2)
                return item
            }
          )
          })
        },
        // 查询客户额度配置信息
        getInfoQuotaAllocation() {
            this.loading = true
            getInfoQuotaAllocation({ customerNo: this.$route.query.customerNo }).then((res) => {
                if (res.data.customerLenderAmountList && res.data.customerLenderAmountList.length > 0) {
                    res.data.customerLenderAmountList.forEach(item => {
                        item.creditAmount = item.creditAmount && item.creditAmount.amount ? (Number(item.creditAmount.amount) / 10000).toFixed(4) : ''
                        item.lenderAvailableAmount = item.lenderAvailableAmount && item.lenderAvailableAmount.amount ? (Number(item.lenderAvailableAmount.amount) / 10000).toFixed(4) : ''
                    })
                }
                this.ruleForm = {
                    ucsAmount: res.data.multiLenderQuotaVO.ucsAmount && res.data.multiLenderQuotaVO.ucsAmount.amount ? (Number(res.data.multiLenderQuotaVO.ucsAmount.amount) / 10000).toFixed(4) : '',                 // ucs额度
                    creditLoanAmount: res.data.multiLenderQuotaVO.creditLoanAmount && res.data.multiLenderQuotaVO.creditLoanAmount.amount ? (Number(res.data.multiLenderQuotaVO.creditLoanAmount.amount) / 10000).toFixed(4) : '',                 // 信贷额度
                    surplusAmount: res.data.multiLenderQuotaVO.surplusAmount && res.data.multiLenderQuotaVO.surplusAmount.amount ? (Number(res.data.multiLenderQuotaVO.surplusAmount.amount) / 10000).toFixed(4) : '',                 // 冗余额度
                    bnplAmount: res.data.multiLenderQuotaVO.bnplAmount && res.data.multiLenderQuotaVO.bnplAmount.amount ? (Number(res.data.multiLenderQuotaVO.bnplAmount.amount) / 10000).toFixed(4) : '',                 // BNPL额度
                    frozenAmount: res.data.multiLenderQuotaVO.frozenAmount && res.data.multiLenderQuotaVO.frozenAmount.amount ? (Number(res.data.multiLenderQuotaVO.frozenAmount.amount) / 10000).toFixed(4) : '',                 // 冻结额度
                    customerNo: this.$route.query.customerNo,                 // 客户号
                    customerLenderAmountList: res.data.customerLenderAmountList && res.data.customerLenderAmountList.length > 0 ? res.data.customerLenderAmountList : []  // 客户下面已经出过授信
                }
                if (res.data.multiLenderQuotaVO.creditLoanAmount && res.data.multiLenderQuotaVO.creditLoanAmount.currency == 'USD') {
                    this.isAmerican = '万美元'
                }
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },
        // 申请产品信息
        getApplicationRecords() {
            this.loading = true
            getApplicationRecords({ customerNo: this.$route.query.customerNo }).then((res) => {
                res.data.records.forEach(item => {
                    item.creditAmountShow = item.creditAmount && item.creditAmount.amount ? item.creditAmount.currency == 'CNY' ? `￥${(Number(item.creditAmount.amount) / 10000).toFixed(4)}` : `$${(Number(item.creditAmount.amount) / 10000).toFixed(4)}` : ''
                    item.lenderAvailableQuotaShow = item.lenderAvailableQuota && item.lenderAvailableQuota.amount ? item.lenderAvailableQuota.currency == 'CNY' ? `￥${(Number(item.lenderAvailableQuota.amount) / 10000).toFixed(4)}` : `$${(Number(item.lenderAvailableQuota.amount) / 10000).toFixed(4)}` : ''
                    item.loanBalanceShow = item.loanBalance && item.loanBalance.amount ? item.loanBalance.currency == 'CNY' ? `￥${(Number(item.loanBalance.amount) / 10000).toFixed(4)}` : `$${(Number(item.loanBalance.amount) / 10000).toFixed(4)}` : ''
                    item.shopGmvShow = item.shopGmv && item.shopGmv.amount ? item.shopGmv.currency == 'CNY' ? `￥${(Number(item.shopGmv.amount) / 10000).toFixed(4)}` : `$${(Number(item.shopGmv.amount) / 10000).toFixed(4)}` : ''
                })
                this.applicationInfoList = res.data.records
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },
        openSure() {
            this.$alert('请仔细核对修改内容，确认无误后点击【确认修改】进行修改，如无需修改，可点击【取消】', '确认要进行此操作吗？', {
                cancelButtonText: '取消',
                confirmButtonText: '确定修改',
                showCancelButton: true,
                callback: action => {
                    if (action == 'confirm') {
                        // 修改接口调用
                        this.editQuotaAllocation()
                    } else if (action == 'cancel') {
                        // 取消修改
                    }
                }
            });
        },
        submitForm(formName) {
            updateNewApplicationsInfo(this.ruleForm.newAmount).then((res) => {
                if(res.code === 200){
                this.isEdit = false
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                }
            })
            // let statusInput = true
            // if (this.ruleForm.customerLenderAmountList && this.ruleForm.customerLenderAmountList.length > 0) {
            //     this.ruleForm.customerLenderAmountList.forEach(item => {
            //         if ((!item.creditAmount && Number(item.creditAmount !== 0)) || (!item.lenderAvailableAmount && Number(item.lenderAvailableAmount !== 0))) {
            //             statusInput = false
            //         }
            //     })
            // }
            // if (!statusInput) {
            //    return this.$message.warning('授信额度或者可支用额度输入框不能为空')
            // }
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         this.openSure()
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
        },
        // 修改接口调用
        editQuotaAllocation() {
            let newRuleForm = JSON.parse(JSON.stringify(this.ruleForm))
            newRuleForm.customerLenderAmountList.forEach(item => {
                item.creditAmount = item.creditAmount ? Number(item.creditAmount) * 10000 : ''
                item.lenderAvailableAmount = item.lenderAvailableAmount ? Number(item.lenderAvailableAmount) * 10000 : ''
            })
            newRuleForm.ucsAmount = newRuleForm.ucsAmount ? Number(newRuleForm.ucsAmount) * 10000 : ''                 // ucs额度
            newRuleForm.creditLoanAmount = newRuleForm.creditLoanAmount ? Number(newRuleForm.creditLoanAmount) * 10000 : ''                 // ucs额度
            newRuleForm.surplusAmount = newRuleForm.surplusAmount ? Number(newRuleForm.surplusAmount) * 10000 : ''                 // ucs额度
            newRuleForm.bnplAmount = newRuleForm.bnplAmount ? Number(newRuleForm.bnplAmount) * 10000 : ''                 // ucs额度
            newRuleForm.frozenAmount = newRuleForm.frozenAmount ? Number(newRuleForm.frozenAmount) * 10000 : ''                 // ucs额度
            editQuotaAllocation(newRuleForm).then((res) => {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                // 查询客户额度配置信息
                this.getInfoQuotaAllocation()
                // 申请记录
                this.getApplicationRecords()
            });
        },
        goApplicationDetail(row) {
            let nowCurrencyPath = ''
            let queryObj = {}
            if (row.creditAmount && row.creditAmount.currency == 'USD') {
                nowCurrencyPath = '/us-detail'
                queryObj = {
                    id: row.applicationTbId,
                    loanNumber: row.applicationCode,
                    creditAmount: row.creditAmount && row.creditAmount.amount ? (Number(row.creditAmount.amount) / 10000).toFixed(2) : '',
                    applicationStatus: row.applicationStatusDesc,
                    account: row.account,
                    userId: row.userId,
                    lenderId: row.lenderId,
                    productId: row.productId
                }
            } else {
                nowCurrencyPath = '/loanAssitance-detail'
                queryObj = {
                    id: row.applicationTbId,
                    loanNumber: row.applicationCode,
                    creditAmount: row.creditAmount && row.creditAmount.amount ? (Number(row.creditAmount.amount) / 10000).toFixed(2) : '',
                    applicationStatus: row.applicationStatusDesc,
                    account: row.account,
                    userId: row.userId,
                    lenderId: row.lenderId
                }
            }
            this.$router.push({
                path: nowCurrencyPath,
                query: queryObj
            });
        },
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
