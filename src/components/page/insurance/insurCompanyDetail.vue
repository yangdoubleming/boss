<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 / 保险管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">保司详情</span>
        </div>

        <div class="product">
            <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
                <div class="t">
                    合作产品管理
                    <el-button type="primary" @click="dialogShow" style="margin-left: 30px">新增产品</el-button>
                </div>
                <el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin: 0 25px">
                    <el-table :data="tableData" style="width: 100%; font-size: 14px" border>
                        <el-table-column prop="id" label="产品编号" align="center"></el-table-column>

                        <el-table-column prop="platform" label="电商平台" align="center"></el-table-column>
                        <el-table-column prop="productName" label="险种类型" align="center"></el-table-column>
                        <el-table-column prop="rate" label="佣金" align="center">

                        </el-table-column>
                        <el-table-column prop="cooperationTime" label="合作时间" align="center"></el-table-column>
                        <el-table-column prop="cooperationTerm" label="合作有效期/年" align="center"></el-table-column>
                        <el-table-column prop="agreementName" label="补充协议" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.row.agreementName === '' || scope.row.agreementName === null">-</div>
                                <div v-else>《{{ scope.row.agreementName }}》</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="action" label="操作" align="center">
                            <template slot-scope="scope">
                                <a @click="dowload(scope.row)"
                                    style="color: #fe1964; cursor: pointer; margin-right: 15px">协议下载</a>
                                <a @click="redact(scope.row)"
                                    style="color: #fe1964; cursor: pointer; margin-right: 15px">编辑</a>
                                <a @click="deleteinfo(scope.row)" style="color: #fe1964; cursor: pointer">删除</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background layout="prev, pager, next" :total="total" :page-size="ruleForm.size"
                        @current-change="currentChange" style="text-align: right; margin: 40px 20px"></el-pagination>
                </el-card>
            </el-row>
        </div>
        <div class="agreement">
            <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
                <div class="t">签订协议管理</div>
                <el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin: 0 25px">
                    <el-table :data="agreementData" style="width: 100%; font-size: 14px" border>
                        <el-table-column prop="agreementType" label="协议类型" align="center"></el-table-column>
                        <el-table-column prop="agreementName" label="协议" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.row.agreementName === '' || scope.row.agreementName === null">-</div>
                                <div v-else>《{{ scope.row.agreementName }}》</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="action" label="操作" align="center">
                            <template slot-scope="scope">
                                <a @click="dowload(scope.row)"
                                    style="color: #fe1964; cursor: pointer; margin-right: 15px">协议下载</a>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-row>
        </div>
        <div class="info" style="padding-bottom: 60px">
            <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0; padding-bottom: 40px">
                <div class="t">合作信息</div>
                <el-row style="padding-left: 25px">
                    <el-col :span="7">
                        <div>保险公司：</div>
                        <div>{{ infoData.companyName }}</div>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <div>合作时间：</div>
                        <div>{{ infoData.cooperationTime }}</div>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <div>合作有效期：</div>
                        <div>{{ infoData.cooperationTerm }}年</div>
                    </el-col>
                </el-row>
            </el-row>
        </div>
        <el-dialog :visible.sync="dialogVisible" width="900px" class="diaPage" :close-on-click-modal="false">
            <div class="title">{{ title }}</div>
            <el-form :model="partnerForm" :rules="rules" ref="partnerForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="险种类型：" prop="productName">
                    <el-select v-model="partnerForm.productName" :placeholder="$t('loan_detail_choose')"
                        style="width:330px" @change="blurImg">
                        <el-option label="责任险" value="责任险"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电商平台：" prop="platform">
                    <el-select v-model="partnerForm.platform" :placeholder="$t('loan_detail_choose')"
                        style="width:330px" @change="blurImg">
                        <el-option label="Amazon" value="Amazon"></el-option>
                        <el-option label="Wayfair" value="Wayfair"></el-option>
                        <el-option label="Overstock" value="Overstock"></el-option>
                        <el-option label="HomeDepot" value="HomeDepot"></el-option>
                        <el-option label="Walmart" value="Walmart"></el-option>
                        <el-option label="Lowes" value="Lowes"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合作时间：" prop="cooperationTime">
                    <el-date-picker type="date" v-model="partnerForm.cooperationTime" style="width:330px"
                        value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="合作期限：" prop="cooperationTerm">
                    <el-input style="width:330px" v-model="partnerForm.cooperationTerm" type="number"
                        oninput="if(value.length>2) value=value.slice(0,2)">
                        <template slot="append">年</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="返佣比例：" prop="rebateCommission">
                    <div style="width: 100%;border:1px dashed #C0C4CC">
                        <div class="i-item" v-for="(item, index) in partnerForm.rules" :key="item.id">
                            <div class="i-title">
                                时间段{{ (index + 1) }}
                                <el-date-picker :clearable="false" style="margin:0 10px" v-model="item.dates"
                                    type="monthrange" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期" value-format="yyyy-MM"
                                    @change="changeRuleTime($event, item)"></el-date-picker>
                                <el-button type="primary" plain @click="addNewTime" v-if="(index == 0)">新增时间段</el-button>
                                <i v-if="partnerForm.rules.length > 1" class="el-icon-close" @click="deleteTime(index)"
                                    style="position: absolute;right:10px;font-size:20px"></i>
                            </div>
                            <div style="padding-left:10px;margin-top:5px">
                                <div>
                                    方式：
                                    <el-radio @input='changeRuleType($event, item)' style="margin-left:5px"
                                        v-model="item.ruleType" label="1">固定比例</el-radio>
                                    <el-radio v-model="item.ruleType" label="2"
                                        @input='changeRuleType($event, item)'>按月保费阶梯比例</el-radio>
                                    <el-radio v-model="item.ruleType" label="3"
                                        @input='changeRuleType($event, item)'>按累计保费阶梯比例</el-radio>
                                </div>
                                <el-input v-if="(item.ruleType == 1)" placeholder="请输入" v-model="item.rate"
                                    style="width:200px;margin-left:50px;margin-bottom:10px">
                                    <template slot="append">%</template>
                                </el-input>
                                <div v-if="(item.ruleType != 1)">
                                    <div v-for="(it, ind) in item.detail" :key="it.id"
                                        style="margin-bottom:10px;display:flex;align-items:center">
                                        <el-input :disabled='true' v-model="it.minAmount" type="number"
                                            style="width:100px;margin-left: 50px;"></el-input>&nbsp;&nbsp;- &nbsp;
                                        <el-input v-model="it.maxAmount" type="number"
                                            style="width:100px;"></el-input>&nbsp;&nbsp;万元
                                        <el-input v-model="it.rate" placeholder="返佣比例" type="number"
                                            style="width:100px;margin-left:30px"></el-input>&nbsp;%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <i class="el-icon-circle-plus-outline" style="font-size:20px;"
                                            v-if="(ind == item.detail.length - 1)" @click="addDelete(1, item, ind)"></i>&nbsp;
                                        <i v-if="((item.detail.length > 1) && ind == item.detail.length - 1)"
                                            @click="addDelete(0, item, ind)" class="el-icon-remove-outline"
                                            style="font-size:20px"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="补充协议：">
                    <el-upload accept=".pdf, .doc, .docx" class="upload-demo" :action="uploadUrl" :limit="1"
                        icon="el-icon-link" :data="loadData" :on-success="handleAvatarSuccess" :file-list="fileList"
                        :on-exceed="handleExceed" :headers="headers" name="upLoadImage" :on-remove="handleRemove">
                        <el-button size="small" type="primary">上 传</el-button>
                        <span style="font-size: 13px; color: #999; margin-left: 6%">可上传word、pdf文件</span>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="(dialogVisible = false), (fileList = [])"
                    style="margin-right: 15px; color: #fe1964; border-color: #fe1964">取 消</el-button>
                <el-button type="primary" @click="uploadData" :disabled="disable">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { productPage, detailCompany, addAndUpdateByProduct, productDetele, productDetail } from '@/api/insur';
export default {
    name: 'insurCompanyDetail',
    data() {
        return {
            ruleForm: {
                current: 1,
                size: 5,
                companyId: this.$route.query.companyId
            },
            baseUrl: process.env.VUE_APP_BASE_URL,
            isactive: 0,
            tableData: [],
            agreementData: [],
            infoData: {
                companyName: '',
                cooperationTime: '',
                cooperationTerm: ''
            },
            total: 0,
            dialogVisible: false,
            title: '新增合作产品',
            partnerForm: {
                platform: '',
                productName: '',
                cooperationTime: '',
                cooperationTerm: '',
                rebateCommission: '',
                productId: '',
                rules: [
                    {
                        id: 99,
                        insuranceCode: '',
                        platform: '',
                        ruleType: '1',
                        startTime: '',
                        endTime: '',
                        rate: '',
                        dates: [],
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
            },
            disable: false,
            rules: {
                productName: [{ required: true, message: '请选择险种类型', trigger: 'change' }],
                platform: [{ required: true, message: '请选择电商平台', trigger: 'change' }],

                cooperationTime: [{ type: 'string', required: true, message: '请选择日期', trigger: 'change' }],
                cooperationTerm: [{ required: true, message: '请输入合作期限', trigger: 'blur' }],
                rebateCommission: [
                    {
                        required: false,
                        pattern: /(^(\d|[1-9]\d)(\.\d{1,2})?$)|(^100$)/,
                        message: '请输入0-100数字,最多可保留两位小数',
                        trigger: 'change'
                    }
                ]
            },
            uploadUrl: '',
            fileList: [],
            headers: {
                token: ''
            },
            // 补充协议参数
            loadData: {
                companyName: '',
                type: 'supplement'
            }
        };
    },
    mounted() {
        this.uploadUrl = this.baseUrl + '/insurance/company/upload';
        // console.log(this.uploadUrl);
    },
    created() {
        // this.ruleForm.companyId = this.$route.query.companyId;
        this.headers.token = localStorage.getItem('token');
        this.getDataList(this.ruleForm);
        this.getInfo();
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
                ]
            }
            item.rate = item.rate || ''
        },
        deleteTime(index) {
            this.$confirm(`确定删除 时间段${index + 1} 吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.partnerForm.rules.splice(index, 1);
            });
        },
        addDelete(type, item, ind) {
            //加
            if (type) {
                if (!item.detail[ind].maxAmount.toString() || !item.detail[ind].minAmount.toString()) {
                    return this.$message.warning('请先填写完整')
                }
                console.log(item);
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
        changeRuleTime(dates, item) {
            var t1 = 0;
            var t2 = 0;
            var t3 = 0;
            var t4 = 0;
            // item.startTime = '';
            // item.endTime = '';
            if (this.partnerForm.rules.length > 1) {
                this.partnerForm.rules.forEach(item1 => {
                    t1 = Number(item1.startTime.replace('-', ''));

                    t2 = Number(item1.endTime.replace('-', ''));
                    if (t1 && t2) {
                        t3 = Number(dates[0].replace('-', ''));
                        t4 = Number(dates[1].replace('-', ''));
                        console.log(t1, t2, t3, t4);
                        console.log(t1 < t3 < t2);
                        console.log(t1 < t4 < t2);
                        if ((t1 < t3 && t3 < t2) || (t1 < t4 && t4 < t2) || t3 == t1 || t3 == t2 || t4 == t1 || t4 == t2) {
                            item.dates = [];
                            this.$message.warning('时间选择有误');
                            throw Error();
                        }
                    }
                });
            }
            item.startTime = dates[0] + '-01';
            item.endTime = this.getLastDay(dates[1].split('-')[0], dates[1].split('-')[1])
        },
        getLastDay(year, month,) {

            var lastDate = new Date(year, month, 0).getDate(); //获取当月最后一日
            return [year, month, lastDate].join('-');
        },
        addNewTime() {
            this.partnerForm.rules.push({
                id: parseInt(99999999 * Math.random()),
                insuranceCode: '',
                platform: '',
                ruleType: '1',
                startTime: '',
                endTime: '',
                rate: '',
                dates: [],
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
        getDataList(paramer) {
            productPage(paramer).then(res => {
                // console.log(res);
                if (res.code === 200) {
                    this.total = res.data.total;
                    if (res.data.records) {
                        this.tableData = res.data.records;
                    }
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        getInfo() {
            detailCompany({
                id: this.$route.query.companyId
            }).then(res => {
                // console.log(res);
                if (res.code === 200) {
                    if (res.data.fileList) {
                        this.agreementData = res.data.fileList;
                    }
                    this.infoData.companyName = res.data.companyName;
                    this.infoData.cooperationTime = res.data.cooperationTime;
                    this.infoData.cooperationTerm = res.data.cooperationTerm;
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        },
        handleAvatarSuccess(res, file) {
            console.log(res);
            if (res.code === 200) {
                this.$message.success('上传成功');
                this.partnerForm.agreementType = res.data.agreementType;
                this.partnerForm.agreementName = res.data.fileName;
                this.partnerForm.longUrl = res.data.longUrl;
                this.partnerForm.shortUrl = res.data.shortUrl;
            } else {
                this.$message.error(res.message);
                this.fileList = [];
            }
        },
        //移除成功
        handleRemove(file, fileList) {
            this.partnerForm.agreementType = '';
            this.partnerForm.agreementName = '';
            this.partnerForm.longUrl = '';
            this.partnerForm.shortUrl = '';
            this.fileList = [];
            // this.partnerForm.fileList = this.partnerForm.fileList.filter((item) => {
            //     return item.agreementType !== file.response.data.agreementType;
            // });
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前仅可选择 1 个文件，请先删除之前选择的文件，上传新的文件。`);
        },

        blurImg(value) {
            this.loadData.companyName = value;
        },
        uploadData() {
            this.partnerForm.companyId = this.$route.query.companyId;
            if (!this.partnerForm.productName) {
                this.$message.warning('险种类型不能为空');
                return false;
            }
            if (!this.partnerForm.platform) {
                this.$message.warning('电商平台不能为空');
                return false;
            }
            if (!this.partnerForm.cooperationTime) {
                this.$message.warning('合作时间不能为空');
                return false;
            }
            if (!this.partnerForm.cooperationTerm) {
                this.$message.warning('合作期限不能为空');
                return false;
            }

            if (this.partnerForm.rebateCommission) {
                if (!/(^(\d|[1-9]\d)(\.\d{1,2})?$)|(^100$)/.test(this.partnerForm.rebateCommission)) {
                    this.$message.warning('返点佣金输入错误,请输入0-100数字,最多可保留两位小数');
                    return false;
                }
            }
            let obj = JSON.parse(JSON.stringify(this.partnerForm));
            obj.rules.forEach((item, index) => {
                //判断rules有没有填写完整
                if (!item.dates.length) {
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
                        if ((Number(i.maxAmount) < Number(i.minAmount))) {
                            this.$message.warning(`时间段${index + 1} 中第${ind + 1}阶梯填写有误`);
                            throw Error();
                        }
                    });
                }
                item.insuranceCode = this.$route.query.companyCode;
                item.platform = this.partnerForm.platform;
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
            this.disable = true;
            addAndUpdateByProduct(obj, this.partnerForm.productId)
                .then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        this.dialogVisible = false;
                        this.getDataList(this.ruleForm);
                        this.partnerForm = {};
                        this.fileList = [];
                        this.disable = false;
                    } else {
                        this.disable = false;
                        this.$message.error(res.message);
                    }
                })
                .catch(err => {
                    // this.$message.error(err.message);
                    this.disable = false;
                });
        },
        // 新增产品
        dialogShow() {
            this.dialogVisible = true;
            this.title = '新增合作产品';
            (this.partnerForm = {
                platform: '',
                productName: '',
                cooperationTime: '',
                cooperationTerm: '',
                rebateCommission: '',
                productId: '',
                rules: [
                    {
                        id: 99,
                        insuranceCode: '',
                        platform: '',
                        ruleType: '1',
                        startTime: '',
                        endTime: '',
                        rate: '',
                        dates: [],
                        detail: [
                            {
                                rate: '',
                                maxAmount: '',
                                minAmount: '0',
                                id: parseInt(99999999 * Math.random())
                            }
                        ]
                    }
                ]
            }),
                (this.fileList = []);
            this.disable = false;
        },
        // 协议下载
        dowload(value) {
            // console.log(value);
            if (value.longUrl) {
                let str = value.longUrl.split('/');
                var targetStr = str[str.length - 1];

                console.log(targetStr);

                const axios = require('axios');
                axios({
                    methods: 'get',
                    responseType: 'blob',
                    url: `${this.baseUrl}/insurance/company/argeementDownload?file=${value.longUrl}`,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                    .then(function (res) {
                        // console.log(res);
                        var blob = new Blob([res.data], {
                            type: 'application/octet-stream'
                        });
                        var downloadElement = document.createElement('a');
                        var href = window.URL.createObjectURL(blob);
                        downloadElement.href = href;
                        downloadElement.download = targetStr;
                        document.body.appendChild(downloadElement);
                        downloadElement.click();
                        document.body.removeChild(downloadElement);
                        window.URL.revokeObjectURL(href);
                    })
                    .catch(error => {
                        console.log(error.data);
                    });
            } else {
                this.$message.warning('暂无协议，不可下载!');
            }
        },
        // 编辑
        redact(value) {
            console.log(value);

            this.fileList = [];
            this.dialogVisible = true;
            this.title = '编辑合作产品';
            this.loadData.companyName = value.productName;
            productDetail({
                productId: value.id
            }).then(res => {
                // console.log(res);
                if (res.code === 200) {
                    res.data.rules.forEach(item => {
                        item.rate = item.rate ? (Number(item.rate) * 100).toFixed(2) : 0;
                        item.ruleType = item.ruleType ? item.ruleType.toString() : 0;
                        if (item.detail) {
                            item.detail.forEach(it => {
                                it.rate = it.rate ? (Number(it.rate) * 100).toFixed(2) : 0;
                                it.maxAmount = it.maxAmount ? Number(it.maxAmount) / 10000 : 0;
                                it.minAmount = it.minAmount ? Number(it.minAmount) / 10000 : 0;
                            });
                        }
                        item.startTime = item.startTime.split(' ')[0];
                        item.endTime = item.endTime.split(' ')[0];
                        item.dates = [item.startTime, item.endTime];
                    });
                    this.partnerForm = res.data;
                    this.partnerForm.productId = value.id;
                    this.partnerForm.companyId = this.$route.query.companyId;
                    if (res.data.longUrl) {
                        let str = res.data.longUrl.split('/');
                        var targetStr = str[str.length - 1];
                        this.fileList.push({
                            name: targetStr,
                            agreementType: 'supplement'
                        });
                    }
                } else {
                    this.$message.error(res.message);
                }
            });
            // this.partnerForm = value;
            // this.partnerForm.productId = value.id;
            // this.partnerForm.companyId = this.$route.query.companyId;

            // if (value.longUrl) {
            //     let str = value.longUrl.split('/');
            //     var targetStr = str[str.length - 1];
            //     this.fileList.push({
            //         name: targetStr,
            //         agreementType: 'supplement'
            //     });
            // }
        },
        deleteinfo(value) {
            console.log(value.id);
            productDetele({
                productId: value.id
            }).then(res => {
                // console.log(res);
                if (res.code == 200) {
                    this.$message.success(res.data);
                    this.getDataList(this.ruleForm);
                } else {
                    this.$message.error(res.message);
                }
            });
        }
    }
};
</script>

<style lang='less' scoped>
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

.t {
    font-size: 14px;
    font-weight: 600;
    color: #777;
    margin-bottom: 20px;
}

.dataList {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;

    /deep/.el-table th>.cell {
        color: #000;
    }
}

.diaPage {
    /deep/.el-dialog__header {
        padding: 0;
    }

    /deep/.el-dialog__body {
        padding: 30px 12%;
    }

    .title {
        text-align: center;
        font-size: 16px;
        color: #000;
        margin-bottom: 50px;
    }

    .upload-demo {

        // display: flex;
        /deep/.el-upload-list__item:first-child {
            margin-top: -5px;
        }

        /deep/.el-upload-list__item-name {
            color: #fe1964;
        }

        /deep/.el-icon-document {
            color: #fe1964;
        }
    }

    /deep/.el-upload--text {
        width: 100%;
        border: none;
        text-align: left;
        height: 35px;

        .el-button {
            padding: 5px 22px;
            color: #fe1964;
            background-color: #fff;
        }
    }

    /deep/.el-upload-list {
        overflow: hidden;
        margin-left: 10px;
    }

    /deep/.el-dialog__footer {
        text-align: center;
        padding-bottom: 40px;

        .el-button {
            padding: 7px 20px;
        }
    }
}

.info {
    .el-row {
        line-height: 20px;
        font-size: 15px;
    }

    .el-col {
        display: flex;
    }
}
</style>