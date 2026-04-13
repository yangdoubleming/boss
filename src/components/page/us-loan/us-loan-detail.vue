<template>
    <div v-loading="loading">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /贷款管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <el-card>
            <div class="block-box">
                <div class="block">
                    <div class="line"></div>
                    基本信息
                </div>
                <div class="btn-box">
                    <el-button type="primary" @click="_generateContract">生成协议</el-button>
                    <el-button type="primary" @click="_loanSure">确认放款</el-button>
                </div>
            </div>
            <div
                style="text-align: center; width: 100%; margin: 0 atuo; display: flex; justify-content: center; align-items: center">
                <el-form :model="formData" style="" label-width="120px" class="Form" inline>
                    <el-form-item label="申请单号：" prop="applicationCode">
                        <span class="text">{{ formData.applicationCode }}</span>
                    </el-form-item>
                    <el-form-item label="授信单号：">
                        <span class="text">{{ formData.creditCode }}</span>
                    </el-form-item>
                    <el-form-item label="贷款单号：">
                        <span class="text">{{ formData.loanCode }}</span>
                    </el-form-item>
                    <el-form-item label="贷款金额/万：">
                        <span class="text">{{ formData.loanAmount }}</span>
                    </el-form-item>

                    <el-form-item label="利率/%：">
                        <span class="text">{{ formData.apr }}</span>
                    </el-form-item>
                    <el-form-item label="贷款状态：">
                        <span class="text">{{ formData.loanStatus }}</span>
                    </el-form-item>
                    <el-form-item label="贷款期限：">
                        <span class="text">{{ formData.loanPeriod }}</span>
                    </el-form-item>
                    <el-form-item label="合同编号：">
                        <span class="text">{{ formData.contractNumber }}</span>
                    </el-form-item>

                    <el-form-item label="贷款通过时间：">
                        <span class="text">{{ formData.loanApplyDate }}</span>
                    </el-form-item>
                    <el-form-item label="贷款开始时间：">
                        <span class="text">{{ formData.loanStartDate }}</span>
                    </el-form-item>
                    <el-form-item label="贷款结束时间：">
                        <span class="text">{{ formData.loanEndDate }}</span>
                    </el-form-item>
                    <el-form-item label="贷款结清时间：">
                        <span class="text">{{ formData.loanClearDate }}</span>
                    </el-form-item>

                    <el-form-item label="贷款场景：">
                        <span class="text">{{ loanSceneList[formData.loanScene]}}</span>
                    </el-form-item>
                    <el-form-item label="原贷款单编号：">
                        <span class="text">{{ formData.oldLoanCode }}</span>
                    </el-form-item>
                    <el-form-item label="展期后贷款编号：">
                        <span class="text">{{ formData.isExtLoanCode }}</span>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <!-- 确认放款 -->
        <el-dialog title="确认放款" :visible.sync="dialogVisibleLoanSure" width="30%" :before-close="handleCloseLoanSure"
            :close-on-click-modal="false">
            <div v-loading="loadingLoanSure">
                <div>
                    放款时间：<el-date-picker style="width: 260px;" v-model="loanSureForm.loanStartDate" type="date"
                        placeholder="放款时间" value-format="yyyy-MM-dd" />
                </div>
                <div style="margin-top: 15px;">
                    放款状态：<el-select v-model="loanSureForm.loanStatus" placeholder="放款状态" style="width: 260px;">
                        <el-option label="放款成功" value="REPAYMENT" />
                        <el-option label="放款失败" value="DISBURSE_FAILED" />
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseLoanSure">取 消</el-button>
                <el-button type="primary" @click="_loanSureApi">确 定</el-button>
            </span>
        </el-dialog>

        <!-- <div class="block">
			<div class="line"></div>
			<div>历史记录</div>
		</div> -->
        <!-- 收款记录详情列表 -->
        <!-- <table-page :tableData="historyData" :columns="historyColumn" :totalSize="totalSize"
			@conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
			@page-change="handlePageChange" :detailTable="true" :showPagination="false"/> -->
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { loanSignInfoTemplate, dollarLoanSure } from '../../../api/index';
export default {
    name: 'us-loan-detail',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            dialogVisibleLoanSure: false, //确认放款弹窗
            dialogFormVisible: false, //弹窗
            loading: false,
            loadingLoanSure: false,
            formData: {
                applicationCode: ''
            },
            loanSureForm: {
                loanCode: '',
                loanStartDate: '',
                loanStatus: '',
            },
            //基本信息列表
            tableData: [],
            loanSceneList: {
				NOT_MONEY  : '无还本续贷',
			}
        };
    },

    created() {
        this.formData = this.$route.query.data;
        // this._getCreditHistoryList();
    },
    methods: {
        handleCloseLoanSure() {
            this.dialogVisibleLoanSure = false;
            this.loanSureForm = {
                loanCode: '',
                loanStartDate: '',
                loanStatus: '',
            }
        },
        // 确认放款
        _loanSure() {
            this.dialogVisibleLoanSure = true;
        },
        _loanSureApi() {
            if(!this.loanSureForm.loanStartDate) {
                this.$message.error('请选择放款日期');
                return;
            }
            if(!this.loanSureForm.loanStatus) {
                this.$message.error('请选择放款状态');
                return;
            }
            this.loanSureForm.loanCode = this.formData.loanCode;
            let submitObj = {
                ...this.loanSureForm
            }
            submitObj.loanStartDate = `${submitObj.loanStartDate} 00:00:00`;
            this.loadingLoanSure = true;
            dollarLoanSure(submitObj).then((res) => {
                this.loadingLoanSure = false;
                this.$message.success('操作成功');
                this.handleCloseLoanSure()
            }).catch((err) => {
                this.loadingLoanSure = false;
            });
        },
        // 生成协议
        _generateContract() {
            this.loading = true;
            loanSignInfoTemplate({
                loanCode: this.formData.loanCode,
            }).then((res) => {
                this.loading = false;
                this.$message.success('生成成功');
                window.open(res.data);
            }).catch((err) => {
                this.loading = false;
            });
        },
        handlePageChange(page) {
            this.pageData = page;
            this._getList();
        },
        _getList() { }
        // _getCreditHistoryList() {
        // 	creditHistoryList({
        // 		creditId : this.$route.query.data.id
        // 	}).then(res=>{
        // 		res.data.forEach(x => {
        // 			switch (x.creditStatus) {
        //             case 'ACTIVE':
        //                 x.creditStatus = '生效中';
        //                 break;
        //             case 'CLOSED':
        //                 x.creditStatus = '已失效';
        //                 break;
        //             case 'CREATED':
        //                 x.creditStatus = '已创建';
        //                 break;
        //         	}
        //     	});
        // 		this.historyData = res.data;
        // 		console.log(this.historyData)
        // 	})
        // }
    }
};
</script>

<style lang="less" scoped>
.Form {
    display: flex;
    flex-wrap: wrap;
    width: 1240px;
    height: auto;

    .el-form-item--small {
        width: 20%;
    }

    .el-form-item {
        width: 350px;
        height: 45px;
    }
}

.block-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn-box {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.block {
    position: relative;
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

    .upload {
        width: 100px;
        height: 30px;
        border-radius: 20px;
        position: absolute;
        right: 140px;
        color: white;
        background: linear-gradient(326.82deg, #ff2472 -5.17%, #ff5f61 85.53%);
        border: none;
        top: 10px;
    }

    .upload1 {
        width: 130px;
        height: 30px;
        border-radius: 20px;
        position: absolute;
        right: 140px;
        color: white;
        background: linear-gradient(326.82deg, #ff2472 -5.17%, #ff5f61 85.53%);
        border: none;
        top: 10px;
    }
}

.order {
    border-radius: 0px !important;
}

.text {
    width: 180px;
    display: block;
    margin-left: 30px;
    text-align: left;
}

.inp {
    width: 220px;
    display: inline-block;
}

.list {
    /deep/.el-input__inner {
        height: 40px;
        width: 220px;
    }
}

/deep/.el-upload--text {
    border: none;
    width: 300px;
    height: 32px;
}
</style>
