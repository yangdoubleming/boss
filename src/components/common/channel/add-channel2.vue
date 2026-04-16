<template>
    <div class="channel">
        <el-card class="box-card">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" label-position="left"
                class="demo-ruleForm">
                <div style="margin-bottom: 20px; font-weight: 600">基本信息</div>
                <el-form-item label="渠道商名称" prop="merchantName">
                    <div v-if="isApprove">{{ ruleForm.merchantName }}</div>
                    <el-input v-else v-model="ruleForm.merchantName" style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="渠道行业" prop="platformCode" v-if="!isApprove">
                    <div v-if="isApprove">{{ ruleForm.platformCode }}</div>
                    <el-select v-model="ruleForm.platformCode" :placeholder="$t('loan_detail_choose')">
                        <el-option v-for="item in platfrom" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="渠道联系人" prop="contactName">
                    <div v-if="isApprove">{{ ruleForm.contactName }}</div>
                    <el-input v-else v-model="ruleForm.contactName" style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="iphone">
                    <div v-if="isApprove">{{ ruleForm.iphone }}</div>
                    <el-input v-else v-model="ruleForm.iphone" style="width: 350px"
                        :disabled="ruleForm.id ? true : false"></el-input>
                    <el-button v-if="ruleForm.id && !isApprove" style="margin-left: 30px" plain type="primary"
                        @click="getPw">
                        {{
                isRegister ? '重置登录密码' : '获取初始登录密码'
            }}
                    </el-button>
                </el-form-item>
                <el-form-item label="备用电话" prop="psIphone">
                    <div v-if="isApprove">{{ ruleForm.psIphone }}</div>
                    <el-input v-else v-model="ruleForm.psIphone" style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="联系地址" prop="contactAddress">
                    <div v-if="isApprove">{{ ruleForm.contactAddress }}</div>
                    <el-input v-else v-model="ruleForm.contactAddress" style="width: 350px"></el-input>
                </el-form-item>

                <div style="margin-bottom: 20px; font-weight: 600">结算信息</div>

                <el-form-item label="结算周期" prop="settlementPeriod">
                    <div v-if="isApprove">
                        {{
                ruleForm.settlementPeriod == 1
                    ? '月'
                    : ruleForm.settlementPeriod == 2
                        ? '季度'
                        : ruleForm.settlementPeriod == 3
                            ? '半年'
                            : '年'
            }}
                    </div>
                    <el-radio-group v-else v-model="ruleForm.settlementPeriod">
                        <el-radio :label="1">月</el-radio>
                        <el-radio :label="2">季度</el-radio>
                        <el-radio :label="4">年</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="返佣比例：" prop="rebateCommission">
                    <div style="width: 100%; border: 1px dashed #c0c4cc">
                        <div class="i-item" v-for="(item, index) in ruleForm.rules" :key="item.id">
                            <div class="i-title">
                                时间段{{ index + 1 }}
                                <el-date-picker :disabled="isApprove" :clearable="false" style="margin: 0 10px"
                                    v-model="item.dates" type="monthrange" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期" value-format="yyyy-MM"
                                    @change="changeRuleTime($event, item)"></el-date-picker>
                                <el-button type="primary" plain @click="addNewTime"
                                    v-if="index == 0 && !isApprove">新增时间段</el-button>
                                <i v-if="ruleForm.rules.length > 1" class="el-icon-close" @click="deleteTime(index)"
                                    style="position: absolute; right: 10px; font-size: 20px"></i>
                            </div>
                            <div style="padding-left: 10px; margin-top: 5px">
                                <div style="display: flex">
                                    保司：
                                    <div style="display: flex; flex-wrap: wrap">
                                        <el-checkbox :disabled="isApprove" style="margin-right: 25px"
                                            :indeterminate="item.isIndeterminate" v-model="item.checkAll"
                                            @change="handleCheckAllChange($event, item)">全选</el-checkbox>
                                        <el-checkbox-group :disabled="isApprove" v-model="item.insuranceCodes"
                                            @change="handleCheckedCitiesChange($event, item)">
                                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city
                                                }}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </div>
                                <div style="display: flex">
                                    平台：
                                    <div style="display: flex; flex-wrap: wrap; width: 90%">
                                        <el-checkbox :disabled="isApprove" style="margin-right: 25px"
                                            :indeterminate="item.isIndeterminate2" v-model="item.checkAll2"
                                            @change="handleCheckAllChange2($event, item)">全选</el-checkbox>
                                        <el-checkbox-group :disabled="isApprove" style="width: 85%"
                                            v-model="item.platforms" @change="handleCheckedCitiesChange2($event, item)">
                                            <el-checkbox v-for="city in cities2" :label="city" :key="city">{{ city
                                                }}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </div>

                                <div>
                                    方式：
                                    <el-radio @input="changeRuleType($event, item)" :disabled="isApprove"
                                        style="margin-left: 5px" v-model="item.ruleType" :label="1">固定比例</el-radio>
                                    <el-radio @input="changeRuleType($event, item)" v-model="item.ruleType"
                                        :disabled="isApprove" :label="2">按月保费阶梯比例</el-radio>
                                    <el-radio @input="changeRuleType($event, item)" v-model="item.ruleType"
                                        :disabled="isApprove" :label="3">按累计保费阶梯比例</el-radio>
                                </div>
                                <el-input :disabled="isApprove" v-if="item.ruleType == 1" placeholder="请输入"
                                    v-model="item.rate" @change="changeRate($event, item)"
                                    style="width: 200px; margin-left: 50px; margin-bottom: 10px">
                                    <template slot="append">%</template>
                                </el-input>
                                <div v-if="item.ruleType != 1">
                                    <div v-for="(it, ind) in item.detail" :key="it.id"
                                        style="margin-bottom: 10px; display: flex; align-items: center">
                                        <el-input :disabled="true" v-model="it.minAmount" type="number"
                                            style="width: 100px; margin-left: 50px"></el-input>&nbsp;&nbsp;- &nbsp;
                                        <el-input :disabled="isApprove" v-model="it.maxAmount" type="number"
                                            style="width: 100px"></el-input>&nbsp;&nbsp;万元
                                        <el-input @change="changeRate($event, it)" :disabled="isApprove"
                                            v-model="it.rate" placeholder="返佣比例" type="number"
                                            style="width: 100px; margin-left: 30px"></el-input>&nbsp;%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <i class="el-icon-circle-plus-outline" style="font-size: 20px"
                                            v-if="ind == item.detail.length - 1 && !isApprove"
                                            @click="addDelete(1, item, ind)"></i>&nbsp;
                                        <i v-if="item.detail.length > 1 && ind == item.detail.length - 1 && !isApprove"
                                            @click="addDelete(0, item, ind)" class="el-icon-remove-outline"
                                            style="font-size: 20px"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="出单方式" prop="modeOrder">
                    <div v-if="isApprove">{{ ruleForm.modeOrder == 1 ? '见费出单' : '非见费出单' }}</div>
                    <div v-else>
                        <el-radio v-model="ruleForm.modeOrder" :label="1">见费出单</el-radio>
                        <el-radio v-model="ruleForm.modeOrder" :label="2">非见费出单</el-radio>
                    </div>
                </el-form-item>
                <div style="margin-bottom: 20px; font-weight: 600">收款信息</div>
                <el-form-item label="收款姓名" prop="accountName">
                    <div v-if="isApprove">{{ ruleForm.accountName }}</div>
                    <el-input v-else v-model="ruleForm.accountName" style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="开户行" prop="accountBankName">
                    <div v-if="isApprove">{{ ruleForm.accountBankName }}</div>
                    <el-input v-else v-model="ruleForm.accountBankName" style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="收款账号" prop="accountNumber">
                    <div v-if="isApprove">{{ ruleForm.accountNumber }}</div>
                    <el-input v-else v-model="ruleForm.accountNumber" style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="收款方式" prop="paymentType">
                    <div v-if="isApprove">{{ ruleForm.paymentType == 1 ? '身边云' : ruleForm.paymentType == 2 ? '公对公' :
                '现结' }}</div>
                    <div v-else>
                        <el-radio v-model="ruleForm.paymentType" :label="1">身边云</el-radio>
                        <el-radio v-model="ruleForm.paymentType" :label="2">公对公</el-radio>
                        <el-radio v-model="ruleForm.paymentType" :label="3">现结</el-radio>
                    </div>
                </el-form-item>

                <!-- <div style="margin-bottom: 20px; font-weight: 600">收款信息</div> -->

                <!-- <el-form-item label="签约状态" prop="signStatus">
                    <div v-if="isApprove">{{(ruleForm.signStatus==1?'已签约':'未签约')}}</div>
                    <div v-else>
                        <el-radio v-model="ruleForm.signStatus" :label="1">已签约</el-radio>
                        <el-radio v-model="ruleForm.signStatus" :label="2">未签约</el-radio>
                    </div>
                </el-form-item>-->
                <el-form-item label="签约状态" prop="signStatus">
                    <div v-if="isApprove">{{ ruleForm.signStatus == 1 ? '已签约' : '未签约' }}</div>
                    <el-radio-group v-else v-model="ruleForm.signStatus">
                        <el-radio :label="1">已签约</el-radio>
                        <el-radio :label="2">未签约</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="合作时间" prop="dates">
                    <div v-if="isApprove">{{ ruleForm.startTime }} - {{ ruleForm.endTime }}</div>
                    <el-date-picker v-else v-model="ruleForm.dates" type="datetimerange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="合作协议" prop="fileList">
                    <el-upload v-if="!isApprove" ref="fileRefs" style="width: 350px" class="upload-demo"
                        :action="uploadUrl" :before-remove="beforeRemove" :on-success="handleAvatarSuccess"
                        :on-error="errorMethod" multiple :limit="1" :on-exceed="handleExceed"
                        accept=".jpg, .jpeg, .png, .pdf, .word">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <el-button @click="openFile" size="mini" type="primary" v-if="ruleForm.filePath">打开文件</el-button>
                </el-form-item>

                <el-form-item label="备注" prop="note">
                    <div v-if="isApprove">{{ ruleForm.note }}</div>
                    <el-input v-else v-model="ruleForm.note" type="textarea" style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="账号状态" prop="accountStatus">
                    <div v-if="isApprove">{{ ruleForm.accountStatus == 1 ? '正常' : '未签约' }}</div>
                    <div v-else>
                        <el-radio v-model="ruleForm.accountStatus" :label="1">正常</el-radio>
                        <el-radio v-model="ruleForm.accountStatus" :label="2">冻结（冻结后将不能登录渠道系统）</el-radio>
                    </div>
                </el-form-item>
                <div style="margin-bottom: 20px; font-weight: 600">页面配置</div>
                <el-form-item label="客服二维码" required>
                    <div v-if="isApprove && !qrUrl">隐藏</div>
                    <img v-else-if="isApprove && qrUrl" :src="qrUrl" style="width: 200px; height: 200px" alt />
                    <div v-else>
                        <el-radio v-model="ruleForm.customerPath" :label="defaultQr">默认</el-radio>
                        <el-radio v-model="ruleForm.customerPath" :label="2">自定义</el-radio>
                        <el-radio v-model="ruleForm.customerPath" label>隐藏</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label prop="dates" v-if="ruleForm.customerPath == 2 && !isApprove">
                    <div style="display: flex">
                        <el-upload class="avatar-uploader" :show-file-list="false" :action="uploadUrl"
                            style="width: 178px; height: 178px" :on-success="handleAvatarSuccess2">
                            <i v-if="!qrUrl" class="el-icon-plus avatar-uploader-icon"></i>
                            <img v-else style="width: 100%; height: 100%" :src="qrUrl" alt class="avatar" />
                        </el-upload>

                        <div style="margin-left: 20px; margin-top: 60px">
                            <div style="color: #72767b">支持.jpg/.png/.jpeg格式</div>
                            <div style="color: red">将配置到投保链接联系客服处</div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="客服电话" required>
                    <div v-if="isApprove">{{ ruleForm.customerTelephone == defaultPhone ? '默认' :
                ruleForm.customerTelephone ?
                    ruleForm.customerTelephone : '隐藏' }}</div>
                    <div v-else>
                        <el-radio v-model="ruleForm.customerTelephone" :label="defaultPhone">默认</el-radio>
                        <el-radio v-model="ruleForm.customerTelephone" :label="2">自定义</el-radio>
                        <el-input v-model="diyPhone" v-if="ruleForm.customerTelephone == 2"
                            style="width: 120px; margin-right: 50px"></el-input>
                        <el-radio v-model="ruleForm.customerTelephone" label>隐藏</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="保险后台logo" required>
                    <div v-if="isApprove">{{ ruleForm.logoUrl ? '默认' : '隐藏' }}</div>
                    <div v-else>
                        <el-radio v-model="ruleForm.logoUrl"
                            label="https://www.dowsure.com/wp-content/uploads/2022/05/logo.svg">
                            默认
                            <span style="color: #72767b">（指投保页面底部logo）</span>
                        </el-radio>
                        <el-radio v-model="ruleForm.logoUrl" label>隐藏</el-radio>
                    </div>
                </el-form-item>
                <div style="margin-bottom: 20px; font-weight: 600">渠道客户</div>
                <el-form-item label="客户类型" prop="customerType">
                    <div v-if="isApprove && ruleForm.customerType.includes('1')">
                        直客
                    </div>
                    <div v-if="isApprove && ruleForm.customerType.includes('2')">
                        非直客（无微信有电话）
                    </div>
                    <div v-if="isApprove && ruleForm.customerType.includes('3')">
                        非直客（无微信无电话）
                    </div>

                    <div v-if="!isApprove">
                        <el-checkbox-group v-model="ruleForm.customerType">
                            <div>
                                <el-checkbox label="1">直客（微信/联系电话均有）</el-checkbox>
                            </div>
                            <div>
                                <el-checkbox label="2">非直客（无微信有电话）</el-checkbox>
                            </div>
                            <div>
                                <el-checkbox label="3">非直客（无微信无电话）</el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="margin-top: 30px" v-if="isApprove">
                        <el-button type="primary" @click="_approve(1)">同 意</el-button>
                        <el-button type="warning" @click="_approve(0)">驳 回</el-button>
                        <!-- <el-button @click="submitForm('ruleForm',1)">驳 回</el-button> -->
                    </div>
                    <div style="margin-top: 30px" v-else>
                        <el-button @click="$emit('close')">取消</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm', 2)">立即提交</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
        <el-dialog title="请牢记并保存" :visible.sync="showPs" width="30%" :modal="false">
            <span>
                初始登录密码为：
                <span style="font-weight: 600; color: #409EFF">{{ psw }}</span>
            </span>

            <el-button class="onCopy" @click="onCopy" type="primary" plain style="margin-left: 20px">复制账号密码</el-button>
        </el-dialog>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import { saveChannel, isRegister, createUser, rejectedChannel, approvedChannel } from '../../../api/insur';
import createPassword from './create';
const cityOptions = ['大地', '平安', '人保'];
const cityOptions2 = ['Amazon', 'Wayfair', 'HomeDepot', 'Walmart', 'Overstock', 'Lower', '其他'];
export default {
    props: {
        detailData: {
            type: Object,
            default: {}
        },
        platfrom: {
            type: Array,
            default: []
        },
        isApprove: {
            type: Boolean,
            default: false
        }
    },

    watch: {
        qrUrl(newv, oldv) {
            console.log(newv);
            console.log(oldv);
        },
        detailData: {
            handler(newV, oldV) {
                if (newV.id) {
                    let obj = JSON.parse(JSON.stringify(newV));
                    if (obj.filePath) {
                        this.fileList = [{ name: newV.merchantName + '合作协议', url: obj.filePath }];
                    } else {
                        this.fileList = [];
                    }
                    obj.customerType = obj.customerType.split(',');
                    obj.logoUrl = obj.logoUrl || '';
                    obj.customerPath = obj.customerPath || '';
                    obj.customerTelephone = obj.customerTelephone || '';
                    console.log('asd');
                    console.log(newV);
                    obj.rules.forEach(item => {

                        this.handleCheckedCitiesChange(item.insuranceCodes, item);
                        this.handleCheckedCitiesChange2(item.platforms, item);
                        item.startTime = item.startTime.split(' ')[0];
                        item.endTime = item.endTime.split(' ')[0];
                        item.dates = [item.startTime, item.endTime];
                        item.rate = item.rate ? (Number(item.rate) * 100).toFixed(2) : 0;
                        if (item.detail) {
                            item.detail.forEach(it => {
                                it.rate = it.rate ? (Number(it.rate) * 100).toFixed(2) : 0;
                                it.maxAmount = it.maxAmount ? Number(it.maxAmount) / 10000 : 0;
                                it.minAmount = it.minAmount ? Number(it.minAmount) / 10000 : 0;
                            });
                        }
                        if (!item.detail) {
                            item.detail = [
                                {
                                    rate: '',
                                    maxAmount: '',
                                    minAmount: '0',
                                    id: 132
                                }
                            ];
                        }
                    });
                    if (obj.customerPath && obj.customerPath != this.defaultQr) {
                        this.qrUrl = obj.customerPath;

                        obj.customerPath = 2;
                    }
                    if (obj.customerTelephone && obj.customerTelephone != this.defaultPhone) {
                        this.diyPhone = obj.customerTelephone;
                        obj.customerTelephone = 2;
                    } else if (obj.customerTelephone == this.defaultPhone) {
                        obj.customerTelephone = this.defaultPhone
                    }
                    this.ruleForm = obj;
                    isRegister(newV.iphone).then(res => {
                        this.isRegister = res.data;
                    });
                } else {
                    this.ruleForm = newV;
                }
            }
        }
    },
    data() {
        return {
            showPs: false,
            isRegister: false,
            defaultPhone: '0755-22665684',
            defaultQr: 'https://website.dowsure.com/res/lx/images/6660.png',
            diyPhone: '',
            cities: cityOptions,
            isIndeterminate: false,
            checkAll: false,
            checkedCities: [],
            cities2: cityOptions2,
            isIndeterminate2: false,
            checkAll2: false,
            checkedCities2: [],
            rules: {
                merchantName: [{ required: true, message: '请填写渠道商名称', trigger: 'blur' }],
                // customerPath: [{ required: true, message: '请选择', trigger: 'change' }],
                platformCode: [{ required: true, message: '请选择渠道行业', trigger: 'change' }],
                contactName: [{ required: true, message: '请填写联系人', trigger: 'blur' }],
                iphone: [{ required: true, message: '请填写联系电话', trigger: 'blur' }],
                contactAddress: [{ required: true, message: '请填写联系地址', trigger: 'blur' }],
                settlementPeriod: [{ required: true, message: '请选择结算周期', trigger: 'change' }],
                modeOrder: [{ required: true, message: '请选择出单方式', trigger: 'change' }],
                accountName: [{ required: true, message: '请填写收款姓名', trigger: 'blur' }],
                accountBankName: [{ required: true, message: '请填写开户行', trigger: 'blur' }],
                accountNumber: [{ required: true, message: '请填写收款账号', trigger: 'blur' }],
                paymentType: [{ required: true, message: '请选择收款方式', trigger: 'change' }],
                signStatus: [{ required: true, message: '请选择签约状态', trigger: 'change' }],
                dates: [{ required: true, message: '请选择合作时间', trigger: 'date' }],
                accountStatus: [{ required: true, message: '请选择账户状态', trigger: 'change' }],
                customerType: [{ required: true, message: '请选择客户类型', trigger: 'change' }]
            },
            uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
            fileList: [],
            qrUrl: '',
            psw: '',
            ruleForm: {
                modeOrder: '',
                paymentType: '',
                note: '',
                accountStatus: '',
                customerPath: 'https://website.dowsure.com/res/lx/images/6660.png',
                customerTelephone: '0755-22665684',
                logoUrl: 'https://www.dowsure.com/wp-content/uploads/2022/05/logo.svg',
                customerType: ['1'],
                psIphone: '',
                iphone: '',
                platfromName: '',
                channelCode: '',
                platformCode: '',
                specialCode: '',
                merchantName: '',
                contactName: '',
                contactIphone: '',
                contactAddress: '',
                signStatus: '',
                settlementMethod: '',
                settlementPeriod: '',
                commissionRate: '',
                commissionDesc: '',
                accountName: '',
                accountBankName: '',
                accountNumber: '',
                startTime: '',
                endTime: '',
                filePath: '',
                dates: [],
                rules: [
                    {
                        id: 99,
                        ruleType: 1,
                        startTime: '',
                        endTime: '',
                        rate: '',
                        dates: [],
                        checkAll: false,
                        isIndeterminate: false,
                        insuranceCodes: [],
                        platforms: [],
                        checkAll2: false,
                        isIndeterminate2: false,
                        detail: [
                            {
                                rate: '',
                                maxAmount: '',
                                minAmount: '0',
                                id: 132
                            }
                        ]
                    }
                ]
            }
        };
    },
    methods: {
        changeRuleType(val, item) {
            console.log(val);
            if (!item.detail) {
                item.detail = [
                    {
                        rate: '',
                        maxAmount: '',
                        minAmount: '0',
                        id: 132
                    }
                ];
            }
            item.rate = item.rate || '';
        },
        changeRate(val, item) {
            if (val > 100) {
                item.rate = '';
                return this.$message.warning('返佣比例不合法,请重新输入');
            }
        },
        deleteTime(index) {
            this.$confirm(`确定删除 时间段${index + 1} 吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.ruleForm.rules.splice(index, 1);
            });
        },

        onCopy() {
            let a = `请保存您的登录账号及密码
账号：${this.ruleForm.iphone}
密码：${this.psw}`;

            this.$nextTick(() => {
                let clipboard = new Clipboard('.onCopy', {
                    text: function () {
                        return a;
                    }
                });
                clipboard.on('success', e => {
                    this.$message({ message: '复制成功', showClose: true, type: 'success' });
                    // 释放内存
                    clipboard.destroy();
                });
                clipboard.on('error', e => {
                    this.$message({ message: '复制失败,', showClose: true, type: 'error' });
                    clipboard.destroy();
                });
            });
        },
        getPw() {
            this.psw = createPassword(10, 10) + '*';

            createUser({
                iphone: this.ruleForm.iphone,
                pwd: this.psw,
                status: 1,
                name: this.ruleForm.merchantName,
                code: this.ruleForm.channelCode
            }).then(res => {
                this.showPs = true;
            });
        },
        handleCheckAllChange(val, item) {
            item.insuranceCodes = val ? cityOptions : [];
            item.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value, item) {
            console.log(value);
            let checkedCount = value.length;
            item.checkAll = checkedCount === this.cities.length;
            item.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        handleCheckAllChange2(val, item) {
            item.platforms = val ? cityOptions2 : [];
            item.isIndeterminate2 = false;
        },
        handleCheckedCitiesChange2(value, item) {
            let checkedCount = value.length;
            item.checkAll2 = checkedCount === this.cities2.length;
            item.isIndeterminate2 = checkedCount > 0 && checkedCount < this.cities2.length;
        },
        addDelete(type, item, ind) {
            //加
            if (type) {
                if (!item.detail[ind].maxAmount.toString() || !item.detail[ind].minAmount.toString()) {
                    return this.$message.warning('请先填写完整');
                }
                item.detail.push({
                    rate: '',
                    maxAmount: '',
                    minAmount: item.detail[item.detail.length - 1].maxAmount,
                    id: parseInt(99999999 * Math.random())
                });
            } else {
                item.detail.splice(ind, 1);
            }
        },
        addNewTime() {
            this.ruleForm.rules.push({
                id: parseInt(99999999 * Math.random()),
                ruleType: 1,
                startTime: '',
                endTime: '',
                rate: '',
                dates: [],
                insuranceCodes: [],
                checkAll: false,
                isIndeterminate: false,
                insuranceCodes: [],
                platforms: [],
                checkAll2: false,
                isIndeterminate2: false,
                detail: [
                    {
                        rate: '',
                        maxAmount: '',
                        minAmount: '0',
                        id: parseInt(99999999 * Math.random())
                    }
                ]
            });
        },
        _approve(type) {
            if (type) {
                approvedChannel({
                    iphone: this.ruleForm.iphone
                }).then(res => {
                    this.$message.success('操作成功');
                    this.$emit('close');
                });
            } else {
                this.$prompt('请输入驳回原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    if (!value) {
                        return this.$message.warning('请输入原因');
                    }
                    rejectedChannel({
                        iphone: this.ruleForm.iphone,
                        reason: value
                    }).then(res => {
                        this.$message.success('操作成功');
                        this.$emit('close');
                    });
                });
            }
        },
        openFile() {
            window.open(this.ruleForm.filePath);
        },
        changeRuleTime(dates, item) {
            item.startTime = dates[0] + '-01';
            item.endTime = this.getLastDay(dates[1].split('-')[0], dates[1].split('-')[1]);
            console.log(item);
        },
        getLastDay(year, month) {
            var lastDate = new Date(year, month, 0).getDate(); //获取当月最后一日
            return [year, month, lastDate].join('-');
        },
        isConflict() {
            console.log('进来了');
            //规则是否冲突

            if (this.ruleForm.rules.length > 1) {
                //第一次循环
                this.ruleForm.rules.forEach((item1, index1) => {
                    //是否通过
                    let timePass = true;
                    let insurancePass = true;
                    let platformPass = true;
                    //第二次
                    var t1 = 0;
                    var t2 = 0;
                    var t3 = 0;
                    var t4 = 0;
                    this.ruleForm.rules.forEach((item2, index2) => {
                        t1 = Number(item1.startTime.replace('-', '').replace('-', ''));
                        t2 = Number(item1.endTime.replace('-', '').replace('-', ''));
                        t3 = Number(item2.startTime.replace('-', '').replace('-', ''));
                        t4 = Number(item2.endTime.replace('-', '').replace('-', ''));
                        console.log(t1, t2, t3, t4);
                        if (item1.id != item2.id) {
                            if ((t1 < t3 && t3 < t2) || (t1 < t4 && t4 < t2) || t3 == t1 || t3 == t2 || t4 == t1 || t4 == t2) {
                                timePass = false;
                            }

                            insurancePass = item1.insuranceCodes.filter(i => {
                                return item2.insuranceCodes.includes(i);
                            }).length
                                ? false
                                : true;
                            platformPass = item1.platforms.filter(i => {
                                return item2.platforms.includes(i);
                            }).length
                                ? false
                                : true;
                            if (!timePass && !insurancePass && !platformPass) {
                                this.$message.error(`时间段${index1 + 1} 与 时间段${index2 + 1} 的返佣规则冲突`);
                                throw Error();
                            }
                        }
                    });
                });
                console.log('出来咯');
            }
        },
        submitForm(formName, type) {
            this.$confirm('确定提交申请?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (!/^1[3456789]\d{9}$/.test(this.ruleForm.iphone)) {
                            this.$message.warning('手机号格式不正确');
                            return false;
                        }
                        let obj = JSON.parse(JSON.stringify(this.ruleForm));
                        obj.rules.forEach((item, index) => {
                            //判断rules有没有填写完整
                            if (!item.dates.length || !item.insuranceCodes.length || !item.platforms.length) {
                                this.$message.warning(`请将 时间段${index + 1} 中内容填写完整`);
                                throw Error();
                            }
                            if (item.ruleType == 1 && !item.rate.toString()) {
                                this.$message.warning(`请将 时间段${index + 1} 中内容填写完整`);
                                throw Error();
                            }
                            if (item.ruleType != 1) {
                                item.detail.forEach((i, ind) => {
                                    if (!i.maxAmount.toString() || !i.minAmount.toString() || !i.rate) {
                                        this.$message.warning(`请将 时间段${index + 1} 中内容填写完整`);
                                        throw Error();
                                    }

                                    if (Number(i.maxAmount) < Number(i.minAmount)) {
                                        console.log(i.maxAmount);
                                        console.log(i.minAmount);
                                        this.$message.warning(`时间段${index + 1} 中第${ind + 1}阶梯填写有误`);
                                        throw Error();
                                    } else {
                                        console.log(i.maxAmount);
                                        console.log(i.minAmount);
                                    }
                                });
                            }
                            //是否有冲突的规则
                            this.isConflict();

                            item.rate = item.rate ? Number(item.rate) / 100 : 0;
                            if (item.detail) {
                                item.detail.forEach(it => {
                                    it.rate = it.rate ? Number(it.rate) / 100 : 0;
                                    it.maxAmount = it.maxAmount ? Number(it.maxAmount) * 10000 : 0;
                                    it.minAmount = it.minAmount ? Number(it.minAmount) * 10000 : 0;
                                });
                            }
                            if (item.ruleType == 1) {
                                item.detail = [
                                    {
                                        rate: '',
                                        maxAmount: '',
                                        minAmount: '',
                                        id: parseInt(99999999 * Math.random())
                                    }
                                ];
                            } else {
                                item.rate = 0;
                            }
                            item.ruleType = item.ruleType ? Number(item.ruleType) : 0;
                            item.startTime = item.startTime += ' 00:00:00';
                            item.endTime = item.endTime += ' 00:00:00';
                        });
                        obj.startTime = this.ruleForm.dates[0];
                        obj.endTime = this.ruleForm.dates[1];
                        if (obj.customerPath == 2 && !this.qrUrl) {
                            return this.$message.warning('请上传自定义客服二维码');
                        }
                        if (obj.customerTelephone == 2 && !this.diyPhone) {
                            return this.$message.warning('请输入自定义客服电话');
                        }
                        obj.customerPath = obj.customerPath == 2 ? this.qrUrl : obj.customerPath;
                        obj.customerTelephone = obj.customerTelephone == 2 ? this.diyPhone : obj.customerTelephone;
                        obj.createBossName = localStorage.getItem('userName');
                        console.log(obj.customerType);
                        obj.customerType = obj.customerType.join(',');
                        // if (!this.ruleForm.filePath) return this.$message.warning('请上传文件');
                        this.$emit('push', obj, this.ruleForm.id ? 1 : 2);
                    } else {
                        return false;
                    }
                });
            });
        },
        errorMethod() {
            this.$message.warning(`请上传PDF或者图片`);
        },
        handleAvatarSuccess(res) {
            this.ruleForm.filePath = res.data.fullFilePath;
        },
        handleAvatarSuccess2(res) {
            this.qrUrl = res.data.fullFilePath;
        },

        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件`);
        },
        beforeRemove(file, fileList) {
            this.ruleForm.filePath = '';
            return true;
        }
    }
};
</script>

<style lang='less' scoped>
.channel {
    .avatar-uploader {
        /deep/ .el-upload--text {
            width: 180px !important;
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .i-item {
        margin-bottom: 20px;

        .i-title {
            background-color: rgb(246, 247, 248);
            padding: 3px 0;
            padding-left: 10px;
            margin-top: 5px;
            display: flex;
            align-items: center;
        }
    }

    /deep/ .upload-demo {
        .el-upload--text {
            width: 104px !important;
            height: 40px !important;
            border: none !important;
        }
    }
}
</style>