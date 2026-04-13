<template>
    <div>
    <div style="display: flex; align-items: center; padding: 18px">
        <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
            <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                 alt />豆沙包
            /
        </div>

        <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px"> / 贷中监控</span>
    </div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_search_yjstj') }}</span>
                                    <span class="grid-num2">{{ allNum }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_search_dcl') }}</span>
                                    <span class="grid-num2">{{ pendingNum }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_search_xshsz') }}</span>
                                    <span class="grid-num2">{{ salesNum }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_search_yyjdh') }}</span>
                                    <span class="grid-num2">{{ transferredNum }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">{{ $t('loan_search_ypcfx') }}</span>
                                    <span class="grid-num2">{{ excludedNum }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <table-page
            @clickCell="clickCell"
            @onExport="onExport"
            @filter-item-change="changeRoleSearchSelect"
            :tableData="tableData"
            :deal-all-btn="true"
            :showFilterRadio="true"
            :tableOperate="tableOperate"
            :filterOptions="filterOptions"
            :columns="columns"
            :totalSize="totalSize"
            @deal="toDeal"
            @detail="toDetail"
            @conditional-deal-all="dealWithAll"
            @conditional-query="handleColumnsFilter"
            @conditional-reset="handleConditionalReset"
            :current="currentPage"
            :applicationStatus="applicationStatus"
            @changeStatus="changeStatus"
            @page-change="handlePageChange"
            :filterStatus="filterStatus"
            :exportBtn="true"
            :isShowSelection="true"
            @select="select"
        />
<!--    ==============操作弹窗====================    -->
        <el-dialog center title="预警处理" width="700px" :visible.sync="dealDialog" :before-close="customCancel">
            <div style="padding-left: 20px">
                <el-form ref="form" :model="customForm" :rules="rules" label-width="120px" label-position="left">
                    <el-form-item label="贷款申请单号">
                     <div>{{ customForm.applicationCode }}</div>
                    </el-form-item>
                    <el-form-item label="借款人姓名">
                        <div>{{ customForm.borrowerName }}</div>
                    </el-form-item>
                    <el-form-item label="销售姓名">
                        <div>{{ customForm.ownerName }}</div>
                    </el-form-item>
                    <el-form-item label="在贷余额">
                        <div>{{ customForm.loanBalance }}</div>
                    </el-form-item>
                    <el-form-item label="风险等级">
                        <div>{{ customForm.riskGrade }}</div>
                    </el-form-item>
                    <el-form-item label="预警处理" prop="processingStatus">
                        <el-select v-model="customForm.processingStatus" placeholder="请选择">
                            <el-option label="待处理" value="Pending"></el-option>
                            <el-option label="销售跟进核实" value="Sales_Verification"></el-option>
                            <el-option label="已移交贷后" value="Transferred_To_Post_Loan"></el-option>
                            <el-option label="已排除风险" value="Risk_Excluded"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注说明">
                        <el-input type="textarea" v-model="customForm.remarks" maxlength="300" show-word-limit rows="3"></el-input>
                    </el-form-item>
                </el-form>
                <div  class="deal-record" @click="getRecodeHistory">查看处理记录</div>
            </div>
            <div slot="footer" class="dialog-footer" >
                <el-button  v-if="showOperateBtn" type="primary" @click="submitForm('form',1)">确认</el-button>
                <el-button  v-if="showOperateBtn" @click="customCancel">取消</el-button>
                <div class="childTable" v-if="showChildTable">
                    <el-table
                    :data="tableChildData"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="handleTime"
                        label="处理时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="handler"
                        label="处理人"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="statusCn"
                        label="状态">
                    </el-table-column>
                        <el-table-column
                            prop="warningHandle"
                            label="预警处理">
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="备注说明">
                        </el-table-column>
                </el-table>
                </div>
            </div>
        </el-dialog>
        <el-dialog center title="批量预警处理" width="700px" :visible.sync="dealAllDialog">
            <div style="padding-left: 20px">
                <el-form ref="form1"  :rules="rules1" :model="dealAllForm" label-width="120px" label-position="left">
                    <el-form-item label="贷款申请单号">
                        <div>{{ dealAllForm.totalNum }}</div>
                    </el-form-item>
                    <el-form-item label="在贷余额共计">
                        <div>{{ dealAllForm.loanBalance }}元</div>
                    </el-form-item>
                    <el-form-item label="预警处理" prop="processingStatus">
                        <el-select v-model="dealAllForm.processingStatus" placeholder="请选择">
                            <el-option label="待处理" value="Pending"></el-option>
                            <el-option label="销售跟进核实" value="Sales_Verification"></el-option>
                            <el-option label="已移交贷后" value="Transferred_To_Post_Loan"></el-option>
                            <el-option label="已排除风险" value="Risk_Excluded"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注说明">
                        <el-input type="textarea" v-model="dealAllForm.remarks" maxlength="300" show-word-limit rows="3"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" >
                <el-button  type="primary" @click="secondDialogVisible=true">确认</el-button>
                <el-button   @click="dealAllDialog=false">取消</el-button>
            </div>
            </el-dialog>
        <!-- 二次确认窗口 -->
        <el-dialog
            :visible.sync="secondDialogVisible"
            title="提示"
            width="300px"
        >
            <p>确定进行批量操作？</p>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form1', 0)">确定</el-button>
        <el-button @click="secondDialogVisible = false">取消</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
import tablePage from '@/components/common/tablePage.vue';
import {
    getLoanMonitoringList,
    getLoanWarningHandle, getLoanWarningLenderGroup, getLoanWarningProductGroup,
    getLoanWarningTotal,
    getRiskMoreWarningUpdate,
    getRiskWarningUpdate
} from '@/api/ksb';
import { tableMixin } from '../../../utils/mixin';
import axios from 'axios';
import { transferOwner } from '../../../api/crm';
export default {
    name: 'mid-loan-monitoring',
    components: { tablePage },
    mixins: [tableMixin],

    data(){
        return{
            secondDialogVisible:false,
            allNum:0,
            salesNum:0,
            pendingNum:0,
            transferredNum:0,
            excludedNum:0,
            dealDialog:false,
            dealAllDialog:false,
            showChildTable:false,
            showOperateBtn:false,
            tableChildData: [
            ],
            customForm:{
                a:'',
                b:"",
                c:'',
                riskDeal:null,
            },
            dealAllForm:{
                remarks:null,
                processingStatus:null,
            },
            rules: {
                processingStatus: [
                    { required: true, message: '请选择预警处理', trigger: 'blur' },
                ],},
            rules1: {
                processingStatus: [
                    { required: true, message: '请选择预警处理', trigger: 'blur' },
                ],},
            selectOptions:null,
            tableData: [
            ],
            tableOperate: [],
            totalSize: 0, //数据总条数
            currentPage: 1, //页码
            applicationStatus: null,
            filterOptions: [
                {
                    type: 'input',
                    value: null,
                    placeholder: this.$t('loan_detail_dksqdh'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: null,
                    placeholder: this.$t('loan_detail_yhid'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: null,
                    placeholder: this.$t('loan_serch_phone'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: null,
                    placeholder: this.$t('loan_search_zf'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: null,
                    placeholder: this.$t('loan_search_zfcp'),
                    filterable: true,
                    options: []
                },

                {
                    type: 'daterange',
                    value: [],
                    placeholderArr: [this.$t('loan_search_yjkssj'), this.$t('loan_search_yjjssj')],
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: null,
                    placeholder: this.$t('loan_search_fxdj'),
                    filterable: true,
                    options: [
                        {value:'低',label:'低'},
                        {value:'中',label:'中'},
                        {value:'高',label:'高'},
                    ]
                },
                {
                    type: 'input',
                    value: null,
                    placeholder: this.$t('loan_search_xsxmhsjh'),
                    filterable: true,
                    options: []
                },
            ],
            filterStatus: [
                {
                    label: this.$t('status_all'),
                    value: null
                },
                {
                    label: this.$t('loan_search_dcl'),
                    value: 'Pending '
                },
                {
                    label: this.$t('loan_search_xshsz'),
                    value: 'Sales_Verification '
                },
                {
                    label: this.$t('loan_search_yyjdh'),
                    value: 'Transferred_To_Post_Loan '
                },
                {
                    label: this.$t('loan_search_ypcfx'),
                    value: 'Risk_Excluded '
                },
            ],
            columns: [
                {
                    label: '预警id',
                    prop: 'id',
                    color: '#fe1964',
                    width: 120
                },
                {
                    label: '贷款申请单号',
                    prop: 'applicationCode',
                    color: '#fe1964',
                    width: 230
                },
                {
                    label: '资方',
                    prop: 'lenderName',
                    color: '#fe1964',
                    width: 150
                },
                {
                    label: '产品',
                    prop: 'productName',
                    color: '#fe1964',
                    width: 150
                },
                {
                    label: '用户ID',
                    prop: 'userId',
                    color: '#fe1964',
                    width: 100
                },
                {
                    label: '借款人',
                    prop: 'borrowerName',
                    color: '#fe1964',
                    width: 130
                },
                {
                    label: '借款人手机号',
                    prop: 'borrowerPhone',
                    color: '#fe1964',
                    width: 200
                },
                {
                    label: '申请日期',
                    prop: 'applicationTime',
                    color: '#fe1964',
                    width: '120'
                },
                {
                    label: '授权金额',
                    prop: 'creditAmount',
                    color: '#fe1964',
                    width: 100
                },
                {
                    label: '贷款金额',
                    prop: 'loanAmount',
                    color: '#fe1964',
                    width: 100
                },
                {
                    label: '在贷金额',
                    prop: 'loanBalance',
                    color: '#fe1964',
                    width: 100
                },
                {
                    label: '本期应还金额',
                    prop: 'duePaymentAmount',
                    color: '#fe1964',
                    width: 120
                },
                {
                    label: '风险等级',
                    prop: 'riskGrade',
                    color: '#fe1964',
                    width: 120
                },
                {
                    label: '预警时间',
                    prop: 'warningTime',
                    color: '#fe1964',
                    width: 160
                },
                {
                    label: '预警规则编号',
                    prop: 'riskRuleIds',
                    color: '#fe1964',
                    width: 120
                },

                {
                    label: '预警规则',
                    prop: 'riskRuleName',
                    color: '#fe1964',
                    width: 230
                },
                {
                    label: '销售',
                    prop: 'ownerName',
                    color: '#fe1964',
                    width: 190
                },
                {
                    label: '处理状态',
                    prop: 'processingStatusCn',
                    color: '#fe1964',
                    width: 120
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '120',
                    operates: [
                        {
                            event: 'deal',
                            text: "处理",
                            type: 'primary',
                            code: 'LOOK_DETAIL_ASS'
                        },
                        {
                            event: 'detail',
                            text: "详情",
                            type: 'primary',
                            code: 'LOOK_DETAIL_ASS'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            // 状态映射
             statusMap :{
                 Pending:'待处理',
                 Sales_Verification:'销售核实中',
                 Transferred_To_Post_Loan:'已移交贷后',
                 Risk_Excluded:'已排除风险',
             },
            lenderList:[],
            lenderIdArray:null,
        }
    },
    mounted() {
        this.getShowData()
        this.getLenderList()
        this.getProductList()
    },
    methods:{
        transferOwner,
        // 列表
        _getList() {
            let lenderIdArray = [];
            // 检查 this.filterOptions[3].value 是否存在
            if (this.filterOptions[3] && this.filterOptions[3].value) {
                lenderIdArray.push(this.filterOptions[3].value);
            }
            // 检查 this.filterOptions[4].value 是否存在
            if (this.filterOptions[4] && this.filterOptions[4].value) {
                lenderIdArray.push(this.filterOptions[4].value);
            }
            // 如果数组为空，设置为 null
             this.lenderIdArray = lenderIdArray.length > 0 ? lenderIdArray : null;
            let data = {
                current: this.currentPage,
                size: 10,
                applicationCode: this.filterOptions[0].value,
                userId: this.filterOptions[1].value,
                borrowerPhone: this.filterOptions[2].value,
                lenderIds: this.lenderIdArray,
                riskGrade: this.filterOptions[6].value,
                ownerName: this.filterOptions[7].value,
                processingStatus: this.applicationStatus,
                // startTime:this.filterOptions[5].value[0],
                // endTime:this.filterOptions[5].value[1],
            };
            getLoanMonitoringList(data).then(res => {
                this.tableData = res.data.records.map(item=>({
                    ...item,
                    processingStatusCn:this.statusMap[item.processingStatus]|| '-',
                }));
                this.totalSize=res.data.total
            })
        },
        // 展示数据获取
       async getShowData(){
           await getLoanWarningTotal().then(res => {
               this.allNum=res.data.total
               this.pendingNum= res.data.totalPending
               this.salesNum=res.data.totalSalesVerification
               this.transferredNum= res.data.totalTransferredToPostLoan
               this.excludedNum = res.data.totalRiskExcluded
            })
        },
        // handlePageChange(page) {
        //     this.currentPage = page;
        //     this._getList();
        // },
        // 查看处理记录
      async  getRecodeHistory(){
            this.showChildTable = true
          let base = process.env.VUE_APP_BASE_URL
            const  token = localStorage.getItem('token');
          const url = `${base}/lending/warningHandle/list`;
            const response = await axios.get(url, {
                params: {
                    applicationCode: this.customForm.applicationCode,
                    pageNum: '1',
                    pageSize: '1000'
                },
                headers: {
                    'token': ` ${token}`
                }
            });
            this.tableChildData = response.data.records.map(item=>({
                ...item,
                statusCn:this.statusMap[item.status]|| '-',
            }));;
            return response.data;
       },
        // 获取资方
        getLenderList(){
            getLoanWarningLenderGroup().then(res => {
                this.filterOptions[3].options=res.data.map(item=>({
                    ...item,
                    value:item.id,
                    label:item.lenderName,
                }))
            })
        },
        // 获取产品
        getProductList(){
            getLoanWarningProductGroup().then(res => {
                this.filterOptions[4].options=res.data.map(item=>({
                    ...item,
                    value:item.id,
                    label:item.productName,
                }))
            })
        },
        //处理记录
        submitForm(formName,type) {
            const loginId = localStorage.getItem('userName');
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(type===1){
                        // 单个处理
                        getRiskWarningUpdate({
                            id:this.customForm.id,
                            processingStatus:this.customForm.processingStatus,
                            remarks:this.customForm.remarks,
                            loginId:loginId
                        }).then(res => {
                         if(res.code==200){
                             this.$message.success('更改成功！')
                             this.dealDialog = false
                             this._getList()
                             this.getShowData()
                         }
                        })
                    } else {
                        // 批量处理
                        const idArray = this.selectOptions.map(item=>item.id)
                        getRiskMoreWarningUpdate({
                            ids:idArray,
                            processingStatus:this.dealAllForm.processingStatus,
                            remarks:this.dealAllForm.remarks,
                            loginId:loginId
                        }).then(res => {
                            if(res.code==200){
                                this.$message.success('更改成功！')
                                this.dealAllDialog = false
                                this.secondDialogVisible= false
                                this._getList()
                                this.getShowData()
                            }
                        })

                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 取消
        customCancel() {
            (this.dealDialog = false), (this.customForm = {});
        },
        // 行选中
        select(val) {
            this.selectOptions = val;
            console.log(val)
        },
        //批量处理
        dealWithAll(){
            if(this.selectOptions.length<1){
                return
            }
        console.log('dealWithAll',this.selectOptions);
            const applicationCodes = this.selectOptions.map(option => option.applicationCode).join(',');
            // 使用 reduce 方法累加
            const totalAmount = this.selectOptions.reduce((sum, option) => {
                return sum + option.loanBalance;
            }, 0);
             this.dealAllDialog=true
            this.dealAllForm.totalNum='共计'+this.selectOptions.length+ '个,'+applicationCodes
            this.dealAllForm.loanBalance=totalAmount
        },
        clickCell(row) {
        },
        //重置
        handleConditionalReset() {
            this.filterOptions.forEach((item) => {
                if (item.value !== null && item.value !== undefined && item.value !== '') {
                    if (Array.isArray(item.value)) {
                        item.value = [];
                    } else {
                        item.value = null;
                    }
                }
            });
        },
        //处理
        toDeal(val) {
            this.showChildTable = false;
            this.dealDialog=true
            this.showOperateBtn =true
            this.customForm = val

        },
        //详情
        toDetail(val) {
            this.showChildTable = false;
            this.dealDialog=true
            this.showOperateBtn =false
            this.customForm = val
        },
        // 导出
        async onExport() {
            let base = process.env.VUE_APP_BASE_URL
            const  token = localStorage.getItem('token');
            const url = `${base}/lending//risk/customer/export`;
            let that = this;
            const axios = require('axios');
            axios({
                methods: 'get',
                responseType: 'blob',
                url: url,
                params:{
                    applicationCode:this.filterOptions[0].value,
                    userId:this.filterOptions[1].value,
                    borrowerPhone:this.filterOptions[2].value,
                    lenderId:this.filterOptions[3].value,
                    riskGrade:this.filterOptions[6].value,
                    ownerName:this.filterOptions[7].value,
                    processingStatus:this.applicationStatus,
                },
                 headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `report.xlsx`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                    that.isExporting = false;
                })
                .catch((error) => {
                    this.$message.info(error.message);
                });
        },
        changeRoleSearchSelect(val) {
        },

        changeStatus(val) {
            this.applicationStatus = val;
            this.currentPage = 1;
            this._getList()
        },
        handlePageChange(page) {
            this.currentPage = page;
            this._getList()
        },
    }
};
</script>



<style scoped lang="less">
.childTable{
    padding-top: 20px;
    max-height: 250px;
    overflow-y: scroll;
}
.deal-record{
    color: #0b57d0;
    cursor: pointer;
    font-weight: 500;
}
.el-row {
    margin-bottom: 20px;
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

.grid-content {
    display: flex;
    /* align-items: center; */

    height: 100px;
}
.grid-num {
    font-size: 16px;
}

.grid-num2 {
    font-size: 16px;
    padding-top: 12px;
}
</style>