<template>
    <div class="wallet-info-company ">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包
                / 配置管理 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <!-- 搜索栏 -->
        <el-row :gutter="24" class="searchForm">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 30px 20px;">
                        <el-row style="display: flex" class="serar">
                            <el-form-item>
                                <el-select v-model="ruleForm.name" placeholder="企业名称" style="width: 100%">
                                    <el-option v-for="(item, index) in soure" :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>

                            <div class="button">
                                <el-button type="primary">搜索</el-button>
                                <el-button @click="reset">重置</el-button>
                                <el-button type="primary">添加
                                </el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <!-- 详情列表 -->
        <table-page :tableData="tableData" :columns="columns" :totalSize="totalSize" v-loading="loading"
            @conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" :detailTable="true" @update="_updateF" @goview="goviewF" />

        <!-- 新增和修改弹窗 -->
        <el-dialog width="580px" :close-on-click-modal="false" :title="isEdit ? '修改资金' : '新增资金'"
            :visible.sync="dialogFormVisible" direction="rtl" style="text-align: left;" class="mode">
            <el-form ref="form" :model="form" label-width="150px" :rules="rules">
                <el-form-item label="资金来源:" prop="name" class="list">
                    <el-select v-model="form.name" :placeholder="$t('loan_detail_choose')" class="inp">
                        <!-- 	<el-option label="南通保理" value="南通保理"></el-option>
						<el-option label="浦发支用" value="浦发支用"></el-option> -->
                        <el-option v-for="(item, index) in soure" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="批次:" prop="batch" class="list">
                    <el-input v-model="form.batch" placeholder="请输入批次,例:20230314" class="inp"></el-input>
                </el-form-item>
                <el-form-item label="资金总额:" prop="amount" class="list">
                    <el-input v-model="form.amount" placeholder="请输入资金总额" class="inp"></el-input> 万元
                </el-form-item>
                <el-form-item label="资金成本:" prop="interestRate" class="list">
                    <el-input v-model="form.interestRate" placeholder="请输入资金成本(例:8%)" class="inp"></el-input> <span
                        style="color: red;"> %</span>
                </el-form-item>
                <el-form-item label="开始日期:" prop="beginDate" class="list">
                    <el-date-picker class="inp" v-model="form.beginDate" type="date" value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="到期日期:" prop="expireDate" class="list">
                    <el-date-picker class="inp" v-model="form.expireDate" type="date" value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="最大单笔限额:" prop="limitAmount" class="list">
                    <el-input v-model="form.limitAmount" placeholder="请输入最大单笔限额" class="inp"></el-input> 万元
                </el-form-item>

                <el-form-item v-if="isEdit != false" label="是否兑付:" prop="isCashing" class="list">
                    <el-select v-model="form.isCashing" :placeholder="$t('loan_detail_choose')">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="isEdit != false" label="实际兑付日期:" prop="cashingDate" class="list">
                    <el-date-picker class="inp" v-model="form.cashingDate" type="date"
                        value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <!-- 	<el-form-item class="btn" style="display: flex;justify-content: space-around;width: 100%;">
					<el-button @click="dialogFormVisible=false">取消</el-button>
					<el-button type="primary" @click="_createPopup('form')">确定</el-button>
				</el-form-item> -->
            </el-form>
            <div class="btn" style="display: flex;justify-content: space-around;width: 100%; margin-left: 60px; ">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="_createPopup('form')">确定</el-button>
            </div>
        </el-dialog>
        <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
            <div style="width: 100%;">
                <div style="padding: 20px;">
                    <el-form ref="form" :model="form" label-position="top" label-width="80px">
                        <el-form-item label="企业名称">
                            <el-select v-model="form.region" style="width:100%" placeholder="">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('loan_search_cpmc')">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="额度区间">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="利率区间">
                            <el-col :span="11">
                                <el-input-number v-model="form.name" :min="1" :max="100" label="描述文字"></el-input-number>
                                %
                            </el-col>
                            <el-col :span="11">
                                <el-input-number v-model="form.name" :min="1" :max="100" label="描述文字"></el-input-number>
                                %
                            </el-col>
                        </el-form-item>
                        <el-form-item label="期限">
                            <el-input v-model="form.region" style="width: 70%;"></el-input> <el-button type="primary"
                                icon="el-icon-plus" circle></el-button>
                        </el-form-item>
                        <el-form-item label="地区">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="币种">
                            <el-select v-model="form.region" style="width:100%" placeholder="">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Offer额度结算规则">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="筛选规则">
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <el-col :span="6">
                                    <div class="grid-content bg-purple">tenure</div>
                                </el-col>
                                <el-col :span="3">
                                    <div class="grid-content bg-purple-light">>=</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple"><el-input v-model="form.name"></el-input></div>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" justify="space-around" style="margin-top: 10px;">
                                <el-col :span="6">
                                    <div class="grid-content bg-purple">status</div>
                                </el-col>
                                <el-col :span="3">
                                    <div class="grid-content bg-purple-light">=</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple"><el-input v-model="form.name"></el-input></div>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" justify="space-around" style="margin-top: 10px;">
                                <el-col :span="6">
                                    <div class="grid-content bg-purple">currency</div>
                                </el-col>
                                <el-col :span="3">
                                    <div class="grid-content bg-purple-light">=</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple"><el-input v-model="form.name"></el-input></div>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" justify="space-around" style="margin-top: 10px;">
                                <el-col :span="6">
                                    <div class="grid-content bg-purple">settlement_1y</div>
                                </el-col>
                                <el-col :span="3">
                                    <div class="grid-content bg-purple-light">>=</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple"><el-input v-model="form.name"></el-input></div>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg" justify="space-around" style="margin-top: 10px;">
                                <el-col :span="6">
                                    <div class="grid-content bg-purple">settlement_2y</div>
                                </el-col>
                                <el-col :span="3">
                                    <div class="grid-content bg-purple-light">>=</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple"><el-input v-model="form.name"></el-input></div>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <div style="width: 100%;">
                                <el-button type="primary" @click="onSubmit"
                                    style="width: 120px;margin: 30px auto;display: block;">保
                                    存</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import {
    tableMixin
} from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
    account,
    balance,
    pfrepayment,
    diff
} from '../../../api/repayment';
import moment from 'moment'; //导入文件
import {
    getFund,
    getPage,
    fundSave,
    editSave,
    getSoure
} from '../../../api/index.js'
export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            drawer: false,
            isEdit: false, //编辑或修改
            dialogFormVisible: false, //编辑弹窗的显示
            form: {}, //单条数据
            loading: false,
            momeny: {
                fundAmount: 0,
                loanBalance: 0,
                availableAmount: 0,
                fundCost: 0,
                estimateProfit: 0
            },
            ruleForm: {

            },
            dateTime: "", //到期时间
            // currentPage: 1, //当前页码
            // 列表数据
            tableData: [],
            soure: [],
            columns: [{
                label: '产品信息',
                prop: 'code',
            },
            {
                label: '额度',
                prop: 'edu',
            },
            {
                label: this.$t('loan_detail_hkfs'),
                prop: 'hk',
            },
            {
                label: '利率区间',
                prop: 'name',
            },
            {
                label: '期限',
                prop: 'qx',
            },
            {
                label: '地区',
                prop: 'batch',
            },
            {
                label: '币种',
                prop: 'bz',
            },
            {
                label: 'Offer额度计算规则',
                prop: 'amount',
            },
            {
                label: '备注',
                prop: 'loanBalance',
                width: 300
            },
            {
                label: '操作时间',
                prop: 'availableAmount',
            },

            {
                label: this.$t('loan_search_cz'),
                prop: '',
                width: '',
                operates: [{
                    event: 'update',
                    text: '设置',
                    type: 'primary'
                }
                ],
                fixed: 'right'
            }
            ],
            // 表单校验规则
            rules: {
                name: [{
                    required: true,
                    message: '请选择资金来源',
                    trigger: 'blur'
                }],

                batch: [{
                    required: true,
                    message: '请输入批次',
                    trigger: 'blur'
                }],

                amount: [{
                    required: true,
                    message: '请输入资金总额',
                    trigger: 'blur'
                }],
                interestRate: [{
                    required: true,
                    message: '请输入资金成本',
                    trigger: 'blur'
                }],
                beginDate: [{
                    required: true,
                    message: '请选择开始日期',
                    trigger: 'blur'
                }],
                expireDate: [{
                    required: true,
                    message: '请选择到期日期',
                    trigger: 'blur'
                }],
                limitAmount: [{
                    required: true,
                    message: '请输入最大单笔限额',
                    trigger: 'blur'
                }],
                isCashing: [{
                    required: true,
                    message: '请选择是否兑付',
                    trigger: 'blur'
                }],
            }

        }
    },
    created() {

        getSoure().then(res => {
            this.soure = res.data
        })
        this._getList()
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        // 选择到期时间
        changeTime(value) { },
        //页面第一次加载的时候调用Create
        _getList() {
            getFund({
                batch: this.ruleForm.batch, //批次
                name: this.ruleForm.name, //资金方
                isCashing: this.ruleForm.isCashing, //是否兑付
                expireDateBegin: this.dateTime[0], //开始时间
                expireDateEnd: this.dateTime[1], //结束时间
            }).then(res => {
                this.momeny = res.data
                this.momeny.fundCost = this.momeny.fundCost.toFixed(2)
                this.momeny.estimateProfit = this.momeny.estimateProfit.toFixed(2)
            })
            this.goList()

        },

        //获取列表数据
        goList() {
            this.tableData = [
                {
                    code: '豆沙包科技深圳有限公司/跨商贷',
                    edu: '最高100万',
                    hk: '随借随还',
                    name: '6%-12%',
                    qx: '3个月/6个月/12个月',
                    batch: '全国',
                    bz: '人民币/美元',
                    amount: '0.1*settlement_1y',
                    loanBalance: 'tenure 2 365 days / status = Normal / settlement_1y >$100000.00',
                    availableAmount: '2023-08-06 12:00:00'
                },
                {
                    code: '豆沙包科技深圳有限公司/跨商贷',
                    edu: '最高100万',
                    hk: '随借随还',
                    name: '6%-12%',
                    qx: '3个月/6个月/12个月',
                    batch: '全国',
                    bz: '人民币/美元',
                    amount: '0.1*settlement_1y',
                    loanBalance: 'tenure 2 365 days / status = Normal / settlement_1y >$100000.00',
                    availableAmount: '2023-08-06 12:00:00'
                },
            ]
        },

        handlePageChange(page) {
            this.pageData = page
            this.goList()
        },

        // 新增时清空表单
        openDia() {
            (this.dialogFormVisible = true), (this.isEdit = false);
            Object.keys(this.form).forEach((key) => {
                this.form[key] = '';
            });
        },

        // 更新数据
        _updateF(row) {
            this.drawer = true
        },

        // 编辑确认
        _createPopup(form) {
            var fu = /^[+-]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/
            if (!fu.test(this.form.interestRate)) {
                this.$message.warning("资金成本需要为浮点数")
                return false
            }

            if (this.form.cashingDate == null) {
                this.form.cashingDate = ""
            }
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.dialogFormVisible = false;
                    // 修改
                    if (this.isEdit) {
                        if (this.form.isCashing == "是") {
                            this.form.isCashing = true
                        }
                        if (this.form.isCashing == "否") {
                            this.form.isCashing = false
                        }

                        this.loading = true
                        editSave({
                            id: this.form.id,
                            current: this.pageData,
                            name: this.form.name, //资金方
                            batch: this.form.batch, //批次
                            amount: this.form.amount, //资金总额
                            beginDate: this.form.beginDate, //开始时间
                            expireDate: this.form.expireDate, //结束时间
                            interestRate: this.form.interestRate, //资金成本
                            limitAmount: this.form.limitAmount, //最大单笔限额
                            isCashing: this.form.isCashing, //是否兑付
                            cashingDate: this.form.cashingDate, //实际兑付日期
                        }).then(res => {
                            if (res.success) {
                                this.loading = false
                                this.goList()
                                this._getList()
                            }
                        }).catch(ree => {
                            this.loading = false
                        })
                    } else {
                        this.loading = true
                        // 新增
                        fundSave({
                            current: this.pageData,
                            name: this.form.name, //资金方
                            batch: this.form.batch, //批次
                            amount: this.form.amount, //资金总额
                            beginDate: this.form.beginDate, //开始时间
                            expireDate: this.form.expireDate, //结束时间
                            interestRate: this.form.interestRate, //资金成本
                            limitAmount: this.form.limitAmount, //最大单笔限额
                        }).then(res => {
                            if (res.success) {
                                this.loading = false
                                this.goList()
                                this._getList()
                            }
                        }).catch(err => {
                            this.loading = false
                            // this.$message.error()
                        })
                    }
                } else {

                    return false;
                }
            });
        },

        // 查看详情
        goviewF(row) {
            this.$router.push({
                path: '/Details-of-funds',
                query: {
                    //携带参数
                    row: row
                }
            });
        },

        //重置
        reset() {
            this.ruleForm = {
                name: "",
                batch: "",
                isCashing: "",
            },
                this.dateTime = "",
                this.goList()
            this._getList()
        },

        // 点击搜索
        serach() {
            this.goList()
            this._getList()
            // // 资金方不为空
            // if(!this.ruleForm.name){
            // this.tableData=this.tableData.filter((item,index)=>{
            // 		return item.name==this.ruleForm.name
            // 	})
            // }
            // // 批次不为空
            // if(!this.ruleForm.batch){
            // this.tableData=this.tableData.filter((item,index)=>{
            // 		return item.batch==this.ruleForm.batch
            // 	})
            // }
            // // 兑付状态是或否
            // if(!this.ruleForm.isCashing){
            // this.tableData=this.tableData.filter((item,index)=>{
            // 		return item.paymentStatus==this.ruleForm.paymentStatus
            // 	})
            // }
            // // 兑付选择时间范围
            // if(!this.ruleForm.beginDate){
            // this.tableData=this.tableData.filter((item,index)=>{      
            // 	// let date1=new Date(Date.parse(item.beginDate))
            // 	// let date2=new Date(Date.parse(this.ruleForm.beginDate))
            // 	return ((new Date(Date.parse(item.beginDate)))>=(new Date(Date.parse(this.ruleForm.beginDate))))
            // 	})
            // }	
        }

    }
}
</script>
<style>
.wallet-info-company .el-form--label-top .el-form-item__label {
    padding-bottom: 0px;
}

.wallet-info-company .el-form-item {
    margin-bottom: 10px;
}
</style>
<style lang='less' scoped>
/* 		/deep/.el-table th>.cell{
		width: 120px;
	} */


.topSum {
    margin-bottom: 20px;

    .grid-content {
        display: flex;
        height: 100px;
    }

    .grid-cont-right {
        width: 130px;
        height: 100%;
        font-size: 14px;
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
}

.searchForm {
    .el-form-item {
        width: 15%;
        margin-right: 2%;
        margin-bottom: 0;
    }

    .timeC {
        width: 200px;

        .el-date-editor {
            width: 100%;
        }
    }

    .button {
        margin-left: 100px;

        .el-button {
            width: 90px;
        }

    }
}


.btn {
    display: flex;
    justify-content: space-around;
}

.order {
    margin-top: 20px;
    border-radius: 0px !important;
}

.inp {
    width: 220px;
    display: inline-block;
}

.el-date-editor {

    width: 140% !important;
}

/deep/.el-dialog__headerbtn {
    margin-top: -10px;
}

.list {
    /deep/.el-input__inner {
        height: 40px;
        width: 220px !important;
    }

    /deep/.el-form-item__content {
        width: 260px;
    }

}

.serar {
    /deep/.el-form-item__content {
        width: 200px;
    }

    /deep/.el-form-item {
        width: 200px;
    }
}


/deep/.el-dialog__body {
    width: 360px;
    margin: 0 auto;
    margin-left: 36px;
}

/deep/.el-form-item {
    display: block;
}
</style>
