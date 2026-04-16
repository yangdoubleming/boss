<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 保险管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">订单管理</span>
        </div>
        <el-row :gutter="24" class="topSum">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <!-- <div class="grid-cont-right">
                            <span class="grid-num">用户数</span>
                            <span class="grid-num2">{{ sumData.userCount }}</span>
                        </div> -->
                        <div class="grid-cont-right">
                            <span class="grid-num">责任险订单数</span>
                            <span class="grid-num2">{{ sumData.policyCount }}</span>
                        </div>
                        <div class="grid-cont-right">
                            <span class="grid-num">责任险总保费（元）</span>
                            <span class="grid-num2">{{ sumData.policyAmount }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24" class="searchForm">
            <el-form ref="ruleForm" :model="ruleForm" label-width="85px"
                style="padding: 20px; background-color: #fff; margin: 0 12px 0 12px">
                <el-row style="display: flex">
                    <el-form-item label="订单编号：">
                        <el-input v-model="ruleForm.orderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="保单号：">
                        <el-input v-model="ruleForm.policyNum"></el-input>
                    </el-form-item>
                    <el-form-item label="保险公司：">
                        <el-select v-model="ruleForm.productCode" :placeholder="$t('loan_detail_choose')">
                            <el-option label="大地" value="DD"></el-option>
                            <el-option label="平安" value="PN"></el-option>
                            <el-option label="史带" value="ST"></el-option>
                            <el-option label="人保" value="RB"></el-option>
                            <el-option label="众安" value="ZA"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="电商平台：">
                        <el-select v-model="ruleForm.platform">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="Amazon" value="Amazon"></el-option>
                            <el-option label="Wayfair" value="Wayfair"></el-option>
                            <el-option label="HomeDepot" value="HomeDepot"></el-option>
                            <el-option label="Walmart" value="Walmart"></el-option>
                            <el-option label="Overstock" value="Overstock"></el-option>
                            <el-option label="Lowes" value="Lowes"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row style="display: flex">
                    <el-form-item label="保险起期：" class="timeC">
                        <el-date-picker v-model="dateTime" type="daterange" range-separator="-" start-placeholder="开始时间"
                            end-placeholder="结束时间" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="支付时间：" class="timeC">
                        <el-date-picker v-model="payTime" type="daterange" range-separator="-" start-placeholder="开始时间"
                            end-placeholder="结束时间" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="下单时间：" class="timeC">
                        <el-date-picker v-model="giveTime" type="daterange" range-separator="-" start-placeholder="开始时间"
                            end-placeholder="结束时间" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="渠道来源：">
                        <el-input v-model="ruleForm.channelName"></el-input>
                    </el-form-item>
                </el-row>
                <el-row style="display: flex">
                    <el-form-item label="登录账号：">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="被保企业名称：" label-width="115px">
                        <el-input v-model="ruleForm.insName"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="支付方式：">
                        <el-select v-model="ruleForm.payType" :placeholder="$t('loan_detail_choose')">
                            <el-option label="微信" value="wxpay"></el-option>
                            <el-option label="支付宝" value="alipay"></el-option>
                            <el-option label="线下邮件" value="underwriting"></el-option>
                            <el-option label="银行卡" value="bankCard"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <!-- <el-form-item label="保险产品：" class="product">
                        <a class="addclass">责任险</a>
                        <a>卖家险</a>
                        <a>其他</a>
                    </el-form-item> -->
                    <el-form-item label="保单状态：">
                        <el-select v-model="ruleForm.policyStatus" :placeholder="$t('loan_detail_choose')">
                            <el-option v-for="item in state" :key="item.id" :value="item.label" :label="item.dictValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单来源：">
                        <el-select v-model="ruleForm.dataMark" :placeholder="$t('loan_detail_choose')">
                            <el-option label="线上" value="线上"></el-option>
                            <el-option label="线下" value="线下"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row style="display: flex">

                    <el-form-item label="是否续保：">
                        <el-select v-model="ruleForm.isInsurance" :placeholder="$t('loan_detail_choose')">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出单模式：">
                        <el-select v-model="ruleForm.orderType" :placeholder="$t('loan_detail_choose')">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="见费" value="见费"></el-option>
                            <el-option label="非见费" value="非见费"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="actionButton">
                        <el-button type="primary" @click="searchCase" style="margin-left: 12px">搜索</el-button>
                        <el-button @click="reset">重置</el-button>
                        <el-button type="primary" @click="addIns">新增投保</el-button>
                        <el-button type="primary" @click="dialogVisible = true">批量投保</el-button>
                        <el-button type="primary" @click="dialogVisiblePolicy = true">批量上传保单号</el-button>
                        <el-button type="primary" @click="batchDownload" :disabled="disabledDown">批量下载凭证</el-button>
                        <el-button type="primary" @click="exportExcel"
                            v-if="$showBtn('EXCEL_INSURANCE_ORDER')">导出excel</el-button>
                    </div>
                </el-row>
            </el-form>
        </el-row>
        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
            <div class="title">
                <div style="margin-bottom: 20px; font-weight: 700; color: #666; font-size: 15px">订单列表</div>
                <div style="font-size: 14px; color: #666">
                    订单量：<span style="margin-right: 20px">{{ total }}</span> 总保费：<span>{{ policyAmout }}</span>元
                </div>
            </div>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <el-table ref="multipleTable" :row-key="getRowKey" :data="tableData" v-loading="loading"
                    element-loading-text="加载中，请稍后" style="width: 100%; font-size: 14px" @select="handleSelectionChange"
                    @select-all="handleSelectAll">
                    <el-table-column type="selection" :reserve-selection="true" width="55"> </el-table-column>
                    <el-table-column prop="dataMark" label="订单来源" align="center" width="100px"> </el-table-column>
                    <el-table-column prop="orderNo" label="订单编号" align="center" width="160px"> </el-table-column>
                    <el-table-column prop="platform" label="电商平台" align="center" width="150px"> </el-table-column>
                    <el-table-column prop="comanyName" label="保险公司" align="center" width="80px"> </el-table-column>
                    <el-table-column prop="policyNum" label="保单号" align="center" width="135px"> </el-table-column>
                    <!-- <el-table-column prop="phone" label="登录账号" align="center" width="120px"> </el-table-column> -->
                    <el-table-column prop="insName" label="被保企业名称(中文)" align="center" width="230px"> </el-table-column>
                    <el-table-column prop="policyStatr" label="保险起期" align="center" width="100px"> </el-table-column>
                    <el-table-column prop="policyEndTime" label="终保日期" align="center" width="100px"> </el-table-column>
                    <el-table-column prop="placeTime" label="下单时间" align="center" width="160px"> </el-table-column>
                    <el-table-column prop="payTime" label="支付时间" align="center" width="160px"> </el-table-column>
                    <el-table-column prop="policyStatus" label="保单状态" align="center"> </el-table-column>
                    <el-table-column prop="amount" label="保费(元)" align="center"> </el-table-column>
                    <el-table-column prop="orderType" label="出单模式" align="center"> </el-table-column>
                    <el-table-column prop="channelName" label="渠道名" align="center"> </el-table-column>
                    <el-table-column prop="channelCode" label="渠道码" align="center"> </el-table-column>

                    <el-table-column prop="isInsurance" label="是否续保" align="center">
                        <template slot-scope="scope">{{ scope.row.isInsurance == 1 ? '是' : '否' }}</template>
                    </el-table-column>
                    <el-table-column prop="action" label="操作" align="center" fixed="right" width="180px">
                        <template slot-scope="scope">
                            <el-button @click="handleView(scope.row)" type="text">详情</el-button>
                            <el-button type="text" @click="renew(scope.row)"
                                v-if="scope.row.comanyName == '大地' && scope.row.policyStatus != '已付款'">重新投保</el-button>
                            <el-button @click="redact(scope.row)" type="text"
                                v-if="$showBtn('insurance-edit')">编辑</el-button>
                            <!-- <el-button type="text" @click="renew(scope.row)" v-if="Number(scope.row.days)<=60 && scope.row.comanyName=='大地' && scope.row.dataMark=='线上'">续保</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="sizes, prev, pager, next" :total="total" :page-size="pageSize"
                    :page-sizes="[10, 20, 50]" @current-change="currentChange" @size-change="handleSizeChange"
                    style="text-align: right; margin: 40px 20px" :current-page.sync="currentPage" v-if="total > 0">
                </el-pagination>
            </el-card>
        </el-row>
        <el-dialog title="批量投保" :visible.sync="dialogVisible" width="25%" center class="dialog">
            <div>
                注意：请根据提供模板填写后上传
                <span @click="downloadTemplate" class="down">（批量投保模板下载）</span>
            </div>
            <el-form :model="ruleForm" :rules="rules" label-width="93px" style="margin-top: 20px">
                <el-form-item label="附件上传：" prop="upload">
                    <el-upload class="upload-demo" :action="uploadUrl + '/insure'" :limit="1" name="file"
                        :on-success="handleAvatarSuccess" icon="el-icon-link" :before-upload="beforeAvatarUpload"
                        :auto-upload="false" ref="upload" :on-error="handleAvatarError" :file-list="fileList"
                        :headers="headers" :on-exceed="handleExceed">
                        <el-button size="small" type="primary">浏览</el-button>
                    </el-upload>
                    <div style="font-size: 13px; color: #999">仅支持xlsx格式</div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle" style="margin-right: 15px; color: #409EFF; border-color: #409EFF">取 消
                </el-button>
                <el-button type="primary" @click="sureUpload" v-loading="showUpLoading">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="批量上传人保保单号" :visible.sync="dialogVisiblePolicy" width="25%" center class="dialog">
            <!--            <div>-->
            <!--                注意：请根据提供模板填写后上传-->
            <!--                <span @click="downloadTemplate" class="down">（批量投保模板下载）</span>-->
            <!--            </div>-->
            <el-form :model="ruleForm" :rules="rules" label-width="93px" style="margin-top: 20px">
                <el-form-item label="附件上传：" prop="upload">
                    <el-upload class="upload-demo" :action="uploadUrl + '/insure/rb'" :limit="1" name="file"
                        :on-success="handleAvatarSuccessPolicy" icon="el-icon-link" :before-upload="beforeAvatarUpload"
                        :auto-upload="false" ref="upload" :on-error="handleAvatarError" :file-list="fileListPolicy"
                        :headers="headers" :on-exceed="handleExceed">
                        <el-button size="small" type="primary">浏览</el-button>
                    </el-upload>
                    <div style="font-size: 13px; color: #999">仅支持xlsx格式</div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="canclePolicy" style="margin-right: 15px; color: #409EFF; border-color: #409EFF">取 消
                </el-button>
                <el-button type="primary" @click="sureUploadPolicy" :disabled="disabledPolicy">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="errorInsure" width="30%" class="errorTip">
            <div class="title">
                <i class="el-icon-circle-close"> </i>
                投保失败，以下数据格式有误，请检查修改并重新上传
            </div>
            <div v-for="(item, index) in errorMsg" :key="index" style="margin-bottom: 10px">{{ item }}</div>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisibleEdit" width="30%" class="diaPage" :close-on-click-modal="false">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="订单金额：" prop="amount">
                    <el-input v-model="editForm.amount" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="渠道码：" prop="channelCode">
                    <el-input v-model="editForm.channelCode" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="保险起期：" prop="policyStatr">
                    <el-date-picker type="date" v-model="editForm.policyStatr" style="width: 100%"
                        value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="支付时间：" prop="payTime">
                    <el-date-picker type="datetime" v-model="editForm.payTime" style="width: 100%"
                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="是否退保：" prop="policyStatus">
                    <el-select v-model="editForm.policyStatus" :placeholder="$t('loan_detail_choose')">
                        <el-option v-for="item in state" :key="item.id" :value="item.label" :label="item.dictValue">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="(dialogVisibleEdit = false)"
                    style="margin-right: 15px; color: #409EFF; border-color: #409EFF">取 消</el-button>
                <el-button type="primary" @click="saveEdit">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { addInsuranceAudit, count, orderList } from '@/api/insur';
import tablePage from '../../common/tablePage.vue';
import { Message } from 'element-ui';
import moment from 'moment'; //导入文件
// const uploadUrl = 'http://114.116.249.242:9050';
const state = [
    { id: 2, dictValue: '待审核', label: 'underwriting' },
    { id: 3, dictValue: '待付款', label: 'unpaid' },
    { id: 4, dictValue: '已付款', label: 'paid' },
    { id: 5, dictValue: '已生效', label: 'effective' },
    { id: 6, dictValue: '已过期', label: 'expired' },
    { id: 7, dictValue: '拒保', label: 'reject' },
    { id: 8, dictValue: '退保', label: 'surrender' },
    { id: 9, dictValue: '订单取消', label: 'cancel' }
];

export default {
    name: 'insurance',
    components: {
        tablePage
    },
    data() {
        return {
            ruleForm: {
                isInsurance: "",
                orderNo: '', // 订单编号
                productCode: '', // 保险公司
                policyNum: '', // 保单号
                policyStatus: '', // 保单状态
                policyStatr: '', // 保险起期开始时间
                policyEnd: '', // 保险起期结束时间
                payTime: '', // 支付开始时间
                payEnd: '', // 支付结束时间
                placeTime: '', // 下单开始时间
                placeEnd: '', // 下单结束时间
                channelName: '', // 渠道名
                phone: '', // 登录账号
                insName: '', // 被保险企业名称（中文）
                payType: '', // 支付方式
                platform: '', // 电商平台
                dataMark: '', //订单来源
                current: 1,
                size: 10
            },
            editForm: {
                orderNo: '',
                type: 'N',
                policyStatr: '',
                policyStatus: '',//保单状态
                channelCode: '',
                payTime: '',
                amount: '',
                createName: localStorage.getItem('userName')
            },
            sumData: {},
            dateTime: [],
            payTime: [],
            giveTime: [],
            state,
            tableData: [],
            total: 0,
            pageSize: 10,
            policyAmout: '', // 总保费
            dialogVisible: false,
            dialogVisibleEdit: false,
            dialogVisiblePolicy: false,
            rules: {
                upload: [{ type: 'date', required: true, message: '请选择文件', trigger: 'change' }]
            },
            loadData: {
                file: ''
            },
            uploadUrl: '',
            errorInsure: false,
            errorMsg: [],
            fileList: [],
            fileListPolicy: [],
            headers: {
                token: ''
            },
            baseUrl: process.env.VUE_APP_BASE_URL,
            showUpLoading: false,
            disabledPolicy: false,
            multipleSelection: [],
            loading: false,
            ids: [],
            currentPage: 1,
            disabledDown: false
        };
    },
    created() {
        this.getSum();
        this.uploadUrl = this.baseUrl + '/insurance/excel';
        this.headers.token = localStorage.getItem('token');
        // 设置下单时间默认值为当天起至当天
        const today = new Date().toISOString().split('T')[0];
        this.giveTime = [today, today];
        this.ruleForm.placeTime = today;
        this.ruleForm.placeEnd = today;
        this.getDataList(this.ruleForm);
    },
    methods: {
        // 续保
        renew(item) {
            window.open(`${process.env.VUE_APP_INSURE}/dadiPolicy/home?channelName=${item.channelCode}&orderNo=${item.orderNo}&productCode=DD&renew=1`)
        },
        //批量下载凭证
        batchDownload() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请先选择要下载的订单',
                    type: 'warning'
                });
            } else {
                this.disabledDown = true;
                this.multipleSelection.forEach((item) => {
                    this.ids.push(item.orderNo);
                });
                const axios = require('axios');
                axios({
                    data: this.ids,
                    method: 'post',
                    responseType: 'blob',
                    url: `${this.baseUrl}/insurance/policy/batchDownload`,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                    .then(function (res) {
                        if (res.headers['status'] == '500') {
                            Message({
                                message: '没有可下载的保险凭证，请重新选择',
                                type: 'error'
                            });
                        } else {
                            Message({
                                message: '压缩包中共有' + res.headers['count'] + '份保险凭证',
                                type: 'success'
                            });
                            var Blod = new Blob([res.data], {
                                type: 'application/zip'
                            });
                            console.log(Blod);
                            let url = window.URL.createObjectURL(Blod);
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;
                            link.setAttribute('download', `责任险订单保险凭证${moment().format('YYYYMMDD')}.zip`);
                            document.body.appendChild(link);
                            link.click();
                        }
                        this.disabledDown = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.disabledDown = false;
                    });
                console.log(this.ids);
                this.multipleSelection = [];
                this.ids = [];
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(list, row) {
            if (list.includes(row)) {
                //勾选时做的事
                this.multipleSelection.push(row);
            } else {
                //取消勾选时做的事
                console.log(val.orderNo);
                this.multipleSelection = this.multipleSelection.filter((val) => val.orderNo !== row.orderNo);
            }
            console.log(this.multipleSelection.length);
        },
        async handleSelectAll(selection) {
            if ((selection.length && !this.checked) || (!selection.length && this.checked)) {
                // 全选
                this.loading = true;
                this.multipleSelection = [];
                await orderList({
                    isInsurance: this.ruleForm.isInsurance,
                    orderNo: this.ruleForm.orderNo,
                    productCode: this.ruleForm.productCode,
                    policyNum: this.ruleForm.policyNum,
                    policyStatus: this.ruleForm.policyStatus,
                    policyStatr: this.ruleForm.policyStatr,
                    policyEnd: this.ruleForm.policyEnd,
                    payTime: this.ruleForm.payTime,
                    payEnd: this.ruleForm.payEnd,
                    placeTime: this.ruleForm.placeTime,
                    placeEnd: this.ruleForm.placeEnd,
                    channelName: this.ruleForm.channelName,
                    phone: this.ruleForm.phone,
                    insName: this.ruleForm.insName,
                    payType: this.ruleForm.payType,
                    platform: this.ruleForm.platform,
                    dataMark: this.ruleForm.dataMark,
                    current: 1,
                    size: this.total
                }).then((res) => {
                    if (res.code == 200) {
                        res.data.records.forEach((item) => {
                            this.multipleSelection.push(item);
                        });
                    }
                });
                await this.getDataList(this.ruleForm);
                await this.setLoading();
            } else {
                // 全不选
                this.multipleSelection = [];
            }
        },
        getNowFormatDate() {
            var date = new Date();
            var seperator1 = '';
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        getRowKey(row) {
            return row.orderNo;
        },
        setLoading() {
            this.loading = false;
            console.log(this.multipleSelection.length);
        },
        // 获取总和
        getSum() {
            count().then((res) => {
                if (res.code === 200) {
                    this.sumData = res.data;
                }
            });
        },
        searchCase() {
            this.multipleSelection = [];
            this.ids = [];
            this.ruleForm.policyStatr = this.dateTime[0];
            this.ruleForm.policyEnd = this.dateTime[1];

            this.ruleForm.payTime = this.payTime[0];
            this.ruleForm.payEnd = this.payTime[1];

            this.ruleForm.placeTime = this.giveTime[0];
            this.ruleForm.placeEnd = this.giveTime[1];
            this.ruleForm.current = 1;
            this.currentPage = 1;
            this.total = 0;
            this.getDataList(this.ruleForm);
        },
        // 重置
        reset() {
            this.ruleForm.isInsurance = ''
            this.ruleForm.orderNo = '';
            this.ruleForm.productCode = '';
            this.ruleForm.policyNum = '';
            this.ruleForm.policyStatus = '';
            this.ruleForm.channelName = '';
            this.ruleForm.phone = '';
            this.ruleForm.insName = '';
            this.ruleForm.payType = '';
            this.ruleForm.platform = '';

            this.dateTime = [];
            this.payTime = [];
            this.giveTime = [];

            this.ruleForm.policyStatr = '';
            this.ruleForm.policyEnd = '';
            this.ruleForm.payTime = '';
            this.ruleForm.payEnd = '';
            this.ruleForm.placeTime = '';
            this.ruleForm.placeEnd = '';

            this.ruleForm.dataMark = '';
            this.ruleForm.orderType = '';
            // this.ruleForm.size = 10;

            this.getDataList(this.ruleForm);
        },
        getDataList(paramer) {
            this.loading = true;
            orderList(paramer).then((res) => {
                // console.log(res.data);
                if (res.code === 200) {
                    this.loading = false;
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                    this.policyAmout = res.data.amount;
                    this.$refs.multipleTable.clearSelection();
                    res.data.records.forEach((i) => {
                        //判断支付类型
                        if (i.payType == 'alipay') {
                            i.payType = '支付宝';
                        } else if (i.payType == 'wxpay') {
                            i.payType = '微信';
                        } else if (i.payType == 'underwriting') {
                            i.payType = '线下邮件';
                        } else if (i.payType == 'bankCard') {
                            i.payType = '银行卡';
                        }
                        if (i.comanyName === null) {
                            i.comanyName = '平安';
                        }
                        if (i.dataMark == 'XX') {
                            i.dataMark = '线下';
                        }
                    });
                } else {
                    this.loading = false;
                    this.$message.error(res.msg);
                }
                //回显
                this.multipleSelection.forEach((val) => {
                    this.tableData.forEach((row) => {
                        if (row.orderNo == val.orderNo) {
                            this.$refs.multipleTable.toggleRowSelection(row, true);
                        }
                    });
                });
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        },
        //修改页数
        handleSizeChange(size) {
            this.ruleForm.size = size;
            this.ruleForm.current = 1;
            this.currentPage = 1;
            this.getDataList(this.ruleForm);
        },
        handleView(scope) {
            // console.log(scope);
            if (scope.comanyName === '史带') {
                this.$router.push({
                    path: '/insurance-detail-starr',
                    query: {
                        orderNo: scope.orderNo,
                        comanyName: scope.comanyName,
                        policyStatus: scope.policyStatus
                    }
                });
            } else if (scope.comanyName === '人保') {
                this.$router.push({
                    path: '/insurance-detail-pn',
                    query: {
                        orderNo: scope.orderNo,
                        comanyName: scope.comanyName,
                        policyStatus: scope.policyStatus
                    }
                });
            } else {
                this.$router.push({
                    path: '/insurance-detail-pn',
                    query: {
                        orderNo: scope.orderNo,
                        comanyName: scope.comanyName,
                        policyStatus: scope.policyStatus
                    }
                });
            }
        },
        redact(value) {
            console.log(value);
            this.dialogVisibleEdit = true
            this.editForm = {
                orderNo: value.orderNo,
                type: 'N',
                policyStatr: value.policyStatr,
                policyStatus: value.policyStatus,//保单状态
                channelCode: value.channelCode,
                payTime: value.payTime,
                amount: value.amount,
                createName: localStorage.getItem('userName')
            }
        },
        formatPolicyStart(policyStart) {
            const date = new Date(policyStart);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} 00:00:00`;
        },
        saveEdit() {
            if (!this.editForm.amount) {
                this.$message.warning('订单金额不能为空');
                return false;
            }
            if (!this.editForm.channelCode) {
                this.$message.warning('渠道码不能为空');
                return false;
            }
            if (!this.editForm.policyStatr) {
                this.$message.warning('保险起期不能为空');
                return false;
            }
            console.log(this.editForm);
            if (/[\u4e00-\u9fa5]/.test(this.editForm.policyStatus)) { // 判断是否包含中文字符
                const foundState = state.find(item => item.dictValue === this.editForm.policyStatus);
                this.editForm.policyStatus = foundState.label;
            }
            this.editForm.policyStatr = this.formatPolicyStart(this.editForm.policyStatr)
            addInsuranceAudit(this.editForm)
                .then((res) => {
                    if (res.code === 200) {
                        this.dialogVisibleEdit = false;
                        this.getDataList(this.ruleForm);
                        this.editForm.amount = '';
                        this.editForm.channelCode = '';
                        this.editForm.policyStatr = '';
                        this.editForm.payTime = '';
                        this.editForm.isInsurance = '';
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch((err) => {
                    this.$message.error(err.message);
                });
        },
        // 新增投保
        addIns() {
            window.open(`${process.env.VUE_APP_JUMP_URL}/home?channelName=200000`);
        },
        // 批量投保模板下载
        downloadTemplate() {
            // window.open(this.uploadUrl + `/template/download`);
            const axios = require('axios');
            axios({
                methods: 'get',
                responseType: 'blob',
                url: `${this.baseUrl}/insurance/excel/template/download`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    console.log(res);
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `责任险批量投保模板.xlsx`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                })
                .catch((error) => {
                    console.log(error.data);
                });
        },

        // 批量投保上传
        handleAvatarSuccess(res, file) {
            console.log(res.data);
            this.showUpLoading = false;
            this.dialogVisible = false;
            this.fileList = [];
            if (res.code === 200) {
                // this.$message.success(res.message);
                this.$message({
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: res.message,
                    type: 'success',
                    customClass: 'specific'
                });
            } else {
                if (res.data) {
                    this.errorInsure = true;
                    this.errorMsg = res.data;
                    res.data.forEach((item) => {
                        console.log(item);
                    });
                } else {
                    this.$message.error(res.message);
                }
            }
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        // 导出excel
        exportExcel() {
            this.ruleForm.policyStatr = this.dateTime[0];
            this.ruleForm.policyEnd = this.dateTime[1];

            this.ruleForm.payTime = this.payTime[0];
            this.ruleForm.payEnd = this.payTime[1];

            this.ruleForm.placeTime = this.giveTime[0];
            this.ruleForm.placeEnd = this.giveTime[1];
            const axios = require('axios');
            let that = this;
            axios({
                method: 'post',
                responseType: 'blob',
                url: `${this.baseUrl}/insurance/excel/exportOrderExcel`,
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

                    if (that.ruleForm.placeTime && that.ruleForm.placeEnd) {
                        downloadElement.download = `${that.ruleForm.placeTime}-${that.ruleForm.placeEnd}责任险订单.xlsx`;
                    } else {
                        downloadElement.download = `责任险订单.xlsx`;
                    }
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        beforeAvatarUpload(file) {
            // this.loadData.file = file;
            // let extension = file.name.split('.')[1];
            // let extensionList = ['xlsx'];
            // if (extensionList.indexOf(extension) < 0) {
            //     return this.$message.error('只能上传xlsx文件');
            // }
        },
        sureUpload() {
            this.showUpLoading = true;
            console.log(this.loadData);
            this.$refs.upload.submit();
        },
        cancle() {
            this.dialogVisible = false;
            this.fileList = [];
        },
        // 批量保单号上传
        handleAvatarSuccessPolicy(res, file) {
            console.log(res.data);
            this.disabledPolicy = false;
            this.dialogVisiblePolicy = false;
            this.fileListPolicy = [];
            if (res.code === 200) {
                // this.$message.success(res.message);
                this.$message({
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: res.message,
                    type: 'success',
                    customClass: 'specific'
                });
            } else {
                if (res.data) {
                    this.errorInsure = true;
                    this.errorMsg = res.data;
                    res.data.forEach((item) => {
                        console.log(item);
                    });
                } else {
                    this.$message.error(res.message);
                }
            }
        },
        sureUploadPolicy() {
            this.disabledPolicy = true;
            console.log(this.loadData);
            this.$refs.upload.submit();
        },
        canclePolicy() {
            this.dialogVisiblePolicy = false;
            this.fileListPolicy = [];
        },
        handleAvatarError(error) {
            this.$message.error(error.message);
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
    }

    .timeC {
        .el-date-editor {
            width: 100%;
        }
    }

    .el-select {
        width: 100%;
    }

    .product {
        a {
            padding: 6px 10px;
            border: 1px solid #ccc;
            font-size: 12px;
        }

        a:nth-child(2) {
            border-left: none;
        }

        a:nth-child(3) {
            padding: 6px 22px;
            border-left: none;
        }

        .addclass {
            background-color: #fff;
            color: #e71d5d;
            border: 1px solid #e71d5d;
        }
    }

    /deep/.el-range__close-icon {
        display: none;
    }

    .actionButton {
        .el-button {
            width: 105px;
        }

        .el-button:nth-child(2) {
            border: 1px solid #e71d5d;
            color: #e71d5d;
        }
    }

    .el-row {
        margin-bottom: 10px;
    }

    /deep/.el-form-item__label {
        padding: 0 5px 0 0;
    }
}

.dataList {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;

    .title {
        display: flex;
        justify-content: space-between;
    }

    /deep/.el-table th>.cell {
        color: #000;
    }

    /deep/.el-table__row {
        td:nth-child(1) {
            .cell {
                color: #409EFF;
            }
        }
    }
}

.dialog {
    /deep/.el-dialog__header {
        padding: 30px 20px 10px;
        font-weight: 700;
    }

    /deep/.el-dialog__body {
        padding: 20px 35px 10px;
    }

    .down {
        color: #409eff;
        cursor: pointer;
    }

    .upload-demo {
        display: flex;

        /deep/.el-upload-list__item:first-child {
            margin-top: 5px;
        }

        /deep/.el-upload-list__item-name {
            color: #409EFF;
        }

        /deep/.el-icon-document {
            color: #409EFF;
        }
    }

    /deep/.el-upload--text {
        border: none;
        width: 90px;
        height: 35px;

        .el-button {
            padding: 5px 20px;
            color: #409EFF;
            background-color: #fff;
        }
    }

    /deep/.el-upload-list {
        overflow: hidden;
        margin-left: 10px;
    }

    .dialog-footer {
        padding: 0px 20px 35px;

        button {
            padding: 5px 30px;
        }
    }
}

.errorTip {
    .el-dialog__body {
        padding: 20px;

        .title {
            color: #000;
            font-weight: 700;
            font-size: 15px;
            margin-bottom: 15px;

            /deep/.el-icon-circle-close {
                color: #b92626;
                font-size: 22px;
                font-weight: 700;
            }
        }
    }
}
</style>