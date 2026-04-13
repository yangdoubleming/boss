<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 / 资金管理 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <!-- 资金情况 -->
        <el-row :gutter="24" class="topSum">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <div class="grid-cont-right">
                            <span class="grid-num">资金总额</span>
                            <span class="grid-num2">{{ momeny.fundAmount }}万</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">在贷资金</span>
                            <span class="grid-num2">{{ momeny.loanBalance }}万</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">可用资金</span>
                            <span class="grid-num2">{{ momeny.availableAmount }}万</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">资金成本</span>
                            <span class="grid-num2">{{ momeny.fundCost }}万</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">预计收益</span>
                            <span class="grid-num2">{{ momeny.estimateProfit }}万</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 搜索栏 -->
        <el-row :gutter="24" class="searchForm">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 30px 20px">
                        <el-row style="display: flex" class="serar">
                            <el-form-item>
                                <el-select v-model="ruleForm.name" placeholder="资金来源" style="width: 100%">
                                    <el-option v-for="(item, index) in soure" :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.batch" placeholder="批次"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="ruleForm.isCashing" placeholder="兑付状态" style="width: 100%">
                                    <el-option label="是" value="true"></el-option>
                                    <el-option label="否" value="false"></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <div>到期时间：</div> -->
                            <el-form-item class="timeC">
                                <el-date-picker v-model="dateTime" type="daterange" range-separator="-"
                                    start-placeholder="到期开始时间" end-placeholder="到期结束时间"
                                    value-format="yyyy-MM-dd HH:mm:ss" @change="changeTime">
                                </el-date-picker>
                            </el-form-item>

                            <div class="button">
                                <el-button type="primary" @click="serach">搜索</el-button>
                                <el-button @click="reset" class="reset">重置</el-button>
                                <el-button type="primary" @click="openDia">新增资金 </el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <!-- 详情列表 -->
        <table-page :tableData="tableData" :columns="columns" :totalSize="totalSize" v-loading="loading"
            @conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" :detailTable="true" @update="_updateF" @goview="goviewF" />

        <!-- 新增和修改弹窗 -->
        <el-dialog width="580px" :close-on-click-modal="false" :title="isEdit ? '修改资金' : '新增资金'"
            :visible.sync="dialogFormVisible" direction="rtl" style="text-align: left" class="mode">
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
                    <el-input v-model="form.interestRate" placeholder="请输入资金成本(例:8%)" class="inp"></el-input>
                    <span style="color: red"> %</span>
                </el-form-item>
                <el-form-item label="起息日期:" prop="beginDate" class="list">
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
                <el-form-item label="匹配类型:" prop="matchType" class="list">
                    <el-select v-model="form.matchType" :placeholder="$t('loan_detail_choose')">
                        <el-option label="系统匹配" value="SYSTEM"></el-option>
                        <el-option label="人工匹配" value="MANUAL"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item v-if="isEdit != false" label="是否兑付:" prop="isCashing" class="list">
                    <el-select v-model="form.isCashing" :placeholder="$t('loan_detail_choose')">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="isEdit != false" label="实际兑付日期:" prop="cashingDate" class="list">
                    <el-date-picker class="inp" v-model="form.cashingDate" type="date"
                        value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" :clearable="false">
                    </el-date-picker>
                </el-form-item>

                <!-- 	<el-form-item class="btn" style="display: flex;justify-content: space-around;width: 100%;">
					<el-button @click="dialogFormVisible=false">取消</el-button>
					<el-button type="primary" @click="_createPopup('form')">确定</el-button>
				</el-form-item> -->
            </el-form>
            <div style="display: flex; justify-content: space-around; width: 100%; margin-left: 60px">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="_createPopup('form')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { account, balance, pfrepayment, diff } from '../../../api/repayment';
import moment from 'moment'; //导入文件
import { getFund, getPage, fundSave, editSave, getSoure } from '../../../api/index.js';
export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
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
            ruleForm: {},
            dateTime: '', //到期时间
            // currentPage: 1, //当前页码
            // 列表数据
            tableData: [],
            soure: [],
            columns: [
                {
                    label: '资金编号',
                    prop: 'code',
                    width: 200
                },
                {
                    label: '资金来源',
                    prop: 'name',
                    width: 120
                },
                {
                    label: '批次',
                    prop: 'batch',
                    width: 120
                },
                {
                    label: '总资金/万元',
                    prop: 'amount',
                    width: 120
                },
                {
                    label: '在贷资金/万元',
                    prop: 'loanBalance',
                    width: 140
                },
                {
                    label: '可用资金/万元',
                    prop: 'availableAmount',
                    width: 140
                },
                {
                    label: '起息日期',
                    prop: 'beginDate',
                    width: 140
                },
                {
                    label: '到期日期',
                    prop: 'expireDate',
                    width: 140
                },

                {
                    label: '资金成本(年化%)',
                    prop: 'interestRate',
                    width: 150
                },

                {
                    label: '单笔最大限额/万元',
                    prop: 'limitAmount',
                    width: 170
                },
                {
                    label: '是否兑付',
                    prop: 'isCashing',
                    width: 120
                },
                {
                    label: '实际兑付时间',
                    prop: 'cashingDate',
                    width: 200
                },
                {
                    label: '匹配类型',
                    prop: 'matchType',
                    width: 120
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'updateTime',
                    width: 200
                },

                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '120',
                    operates: [
                        {
                            event: 'update',
                            text: this.$t('loan_detail_xg'),
                            type: 'primary'
                        },
                        {
                            event: 'goview',
                            text: this.$t('common_see'),
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            // 表单校验规则
            rules: {
                name: [
                    {
                        required: true,
                        message: '请选择资金来源',
                        trigger: 'blur'
                    }
                ],

                batch: [
                    {
                        required: true,
                        message: '请输入批次',
                        trigger: 'blur'
                    }
                ],

                amount: [
                    {
                        required: true,
                        message: '请输入资金总额',
                        trigger: 'blur'
                    }
                ],
                interestRate: [
                    {
                        required: true,
                        message: '请输入资金成本',
                        trigger: 'blur'
                    }
                ],
                beginDate: [
                    {
                        required: true,
                        message: '请选择起息日期',
                        trigger: 'blur'
                    }
                ],
                expireDate: [
                    {
                        required: true,
                        message: '请选择到期日期',
                        trigger: 'blur'
                    }
                ],
                limitAmount: [
                    {
                        required: true,
                        message: '请输入最大单笔限额',
                        trigger: 'blur'
                    }
                ],
                isCashing: [
                    {
                        required: true,
                        message: '请选择是否兑付',
                        trigger: 'blur'
                    }
                ],
                matchType: [
                    {
                        required: true,
                        message: '请选择匹配类型',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    created() {
        getSoure().then((res) => {
            this.soure = res.data;
        });
        this._getList();
    },
    methods: {
        // 选择到期时间
        changeTime(value) { },
        //页面第一次加载的时候调用Create
        _getList() {
            getFund({
                batch: this.ruleForm.batch, //批次
                name: this.ruleForm.name, //资金方
                isCashing: this.ruleForm.isCashing, //是否兑付
                expireDateBegin: this.dateTime[0], //开始时间
                expireDateEnd: this.dateTime[1] //结束时间
            }).then((res) => {
                this.momeny = res.data;
                this.momeny.fundCost = this.momeny.fundCost.toFixed(2);
                this.momeny.estimateProfit = this.momeny.estimateProfit.toFixed(2);
            });
            this.goList();
        },

        //获取列表数据
        goList() {
            getPage({
                current: this.currentPage,
                size: 10,
                batch: this.ruleForm.batch, //批次
                name: this.ruleForm.name, //资金方
                isCashing: this.ruleForm.isCashing, //是否兑付
                beginDate: this.dateTime[0], //开始时间
                expireDate: this.dateTime[1], //结束时间
                expireDateBegin: this.dateTime[0], //开始时间
                expireDateEnd: this.dateTime[1] //结束时间
            }).then((res) => {
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
                this.tableData.forEach((item) => {
                    if (item.isCashing) {
                        item.isCashing = '是';
                    } else {
                        item.isCashing = '否';
                    }
                    if (item.matchType == 'MANUAL') {
                        item.matchType = '人工匹配';
                    } else if (item.matchType == 'SYSTEM') {
                        item.matchType = '系统匹配';
                    }
                });
            });
        },

        handlePageChange(page) {
            console.log(page, 'currentPage');
            this.currentPage = page;
            this.pageData = page;
            this.goList();
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
            this.dialogFormVisible = true;
            this.isEdit = true;
            this.form = {
                ...row
            };
            this.form.beginDate = this.form.beginDate + ' 00:00:00';
            this.form.expireDate = this.form.expireDate + ' 00:00:00';
            if (!this.form.cashingDate) {
                this.form.cashingDate = '';
            } else {
                this.form.cashingDate = this.form.cashingDate + ' 00:00:00';
            }
        },

        // 编辑确认
        _createPopup(form) {
            var fu = /^[+-]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/;
            if (!fu.test(this.form.interestRate)) {
                this.$message.warning('资金成本需要为浮点数');
                return false;
            }

            if (this.form.cashingDate == null) {
                this.form.cashingDate = '';
            }
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.dialogFormVisible = true;
                    // 修改
                    if (this.isEdit) {
                        // if (this.form.isCashing == 'true' && !this.form.cashingDate) {
                        //     this.$message.warning('请选择兑付时间');
                        //     return;
                        // }
                        if (this.form.isCashing == '是') {
                            this.form.isCashing = true;
                        }
                        if (this.form.isCashing == '否') {
                            this.form.isCashing = false;
                        }

                        if (this.form.matchType == '系统匹配') {
                            this.form.matchType = 'SYSTEM';
                        }
                        if (this.form.matchType == '人工匹配') {
                            this.form.matchType = 'MANUAL';
                        }

                        this.loading = true;
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
                            matchType: this.form.matchType
                        })
                            .then((res) => {
                                if (res.success) {
                                    this.dialogFormVisible = false;
                                    this.loading = false;
                                    this.goList();
                                    this._getList();
                                }
                            })
                            .catch((ree) => {
                                this.dialogFormVisible = false;

                                this.loading = false;
                            });
                    } else {
                        this.loading = true;
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
                            matchType: this.form.matchType
                        })
                            .then((res) => {
                                if (res.success) {
                                    this.dialogFormVisible = false;
                                    this.loading = false;
                                    this.goList();
                                    this._getList();
                                }
                            })
                            .catch((err) => {
                                this.loading = false;
                                this.dialogFormVisible = false;

                                // this.$message.error()
                            });
                    }
                } else {
                    return false;
                }
            });
        },

        // 查看详情
        goviewF(row) {
            console.log(row);
            this.$router.push({
                path: '/Details-of-funds',
                query: {
                    //携带参数
                    id: row.id,
                    code: row.code
                }
            });
        },

        //重置
        reset() {
            (this.ruleForm = {
                name: '',
                batch: '',
                isCashing: ''
            }),
                (this.dateTime = ''),
                this.goList();
            this._getList();
        },

        // 点击搜索
        serach() {
            this.goList();
            this._getList();
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
};
</script>

<style lang="less" scoped>
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
