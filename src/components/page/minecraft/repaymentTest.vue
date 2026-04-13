<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /贷款管理 /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <el-card>
            <div class="block">
                <div class="line"></div>
                <div>还款测算</div>
                <div style="font-weight: normal;font-size: 14px; color: #E10453;margin-left: 20px;">金额单位（元）</div>
            </div>
            <div>
                <el-descriptions title="" direction="vertical" :column="4" border>
                    <el-descriptions-item label="在贷余额">{{ testRepayInfo.loanBalance }}</el-descriptions-item>
                    <el-descriptions-item label="还款方式">{{ repaymentMethodTxt[testRepayInfo.repaymentMethod]
                        }}</el-descriptions-item>
                    <el-descriptions-item label="还款期限（期）">{{ testRepayInfo.allTerm }}</el-descriptions-item>
                    <el-descriptions-item label="当前还款期数">{{ testRepayInfo.currentTerm }}</el-descriptions-item>
                </el-descriptions>
            </div>
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
                    <el-row style="margin-top: 20px;font-weight: bold;">还款日</el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="当期还款日">
                                <el-input v-model="testRepayInfo.repaymentDate" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="模拟还款日" prop="repaymentDate">
                                <el-date-picker v-model="ruleForm.repaymentDate" style="width: 100%;" type="date"
                                    placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="还款模式" prop="repaymentType">
                                <el-select v-model="ruleForm.repaymentType" placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>

                    <el-row style="margin-top: 20px;font-weight: bold;">当期应还金额</el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="当期应还总金额">
                                <el-input v-model="testRepayInfo.currentRepaymentAmount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="当期应还本金">
                                <el-input v-model="testRepayInfo.currentPrincipal" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="当期应还利息">
                                <el-input v-model="testRepayInfo.currentInterest" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="当期应还罚息">
                                <el-input v-model="testRepayInfo.currentPenalty" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>

                    <el-row style="margin-top: 20px;font-weight: bold;">累计应还金额</el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="累计应还总金额">
                                <el-input v-model="testRepayInfo.currentRepaymentAmountSum" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="累计应还本金">
                                <el-input v-model="testRepayInfo.currentPrincipalSum" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="累计应还利息">
                                <el-input v-model="testRepayInfo.currentInterestSum" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="累计应还罚息">
                                <el-input v-model="testRepayInfo.currentPenaltySum" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>

                    <el-row style="margin-top: 20px;font-weight: bold;">还款</el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="减免金额" prop="reductionFee">
                                <el-input v-model="ruleForm.reductionFee"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="还款金额" prop="repaymentAmount">
                                <el-input v-model="ruleForm.repaymentAmount"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="实还本金">
                                <el-input v-model="testRepayInfo.principalAmount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="实还利息">
                                <el-input v-model="testRepayInfo.interestAmount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="实还罚息">
                                <el-input v-model="testRepayInfo.penaltyAmount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>

                    <div
                        style="width: 100%;display: flex;align-items: center;justify-content: center;margin-bottom: 50px;">
                        <el-button @click="submitTest('ruleForm')">还款测算</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')">确认还款</el-button>
                    </div>
                </el-form>
            </div>
        </el-card>
        <el-dialog title="上传还款凭证" :visible.sync="dialogVisible" :close-on-click-modal="false" width="800px"
            :before-close="handleClose">
            <div class="dialog-content" v-loading="picLoading">
                <div class="dialog-box">
                    <div class="gray-line"></div>
                    <div class="yellow-box">
                        <div class="left">
                            <div class="one"><i class="el-icon-warning"></i>本次还款金额为{{ testRepayInfo.repaymentAmount }}元
                            </div>
                            <div class="one"><i class="el-icon-warning"></i>请核对客户还款金额及账户信息是否正确</div>
                        </div>
                        <div class="right">
                        </div>
                    </div>
                    <div class="upload-box-xxxy">
                        <div class="upload-words">请上传客户的还款凭证</div>
                        <el-upload accept="*" :action="uploadMorePdf" :headers="uploadHeaders"
                            :before-upload="beforeAvatarUploadA" :on-success="handleAvatarSuccess4" multiple
                            name="files" :show-file-list="false">
                            <img class="upload-xxxyy"
                                src="https://dowsure.oss-cn-shanghai.aliyuncs.com/miniapp/morfin/images/upload.png" />
                        </el-upload>
                    </div>
                    <div class="pic-box">
                        <div class="pic-item" v-for="(item, index) in fileUrls" :key="index">
                            <a class="left" :href="item.fullPath" target="_blank">
                                <img class="pic"
                                    src="https://dowsure.oss-cn-shanghai.aliyuncs.com/miniapp/morfin/images/little-pic.png" />
                                <div class="words">文件{{ index + 1 }}</div>
                            </a>
                            <img class="delete" @click="deletePic(index)"
                                src="https://dowsure.oss-cn-shanghai.aliyuncs.com/miniapp/morfin/images/little-delete.png" />
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <div class="back-btn" @click="repaySure" v-if="$showBtn('repaymentTest_sure_btn')">确认还款</div>
                </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    tableMixin
} from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { postRepaymentTest, postRepaymentInAccount } from '../../../api/boss1';
export default {
    name: 'loan-detail',
    mixins: [tableMixin],
    components: {
        tablePage,
    },
    data() {
        return {
            picLoading: false,
            dialogVisible: false,
            testRepayInfo: {},
            repaymentMethodTxt: {
                EQUAL_PRINCIPAL: '等额本息',
                ONE_TIME_REPAYMENT: '一次性还本付息',
                INTEREST_BEFORE_CAPITAL: '先息后本',
            },
            uploadHeaders: { token: localStorage.getItem('token') },
            uploadMorePdf: process.env.VUE_APP_MORE,
            fileUrls: [],
            options: [{
                label: '正常还款',
                value: 'REPAYMENT'
            }, {
                label: '提前结清',
                value: 'CLEAR'
            }],
            ruleForm: {
                loanCode: "",
                repaymentAmount: 0,
                reductionFee: 0,
                repaymentType: "REPAYMENT",
                repaymentDate: ""
            },
            rules: {
                repaymentAmount: [
                    { required: true, message: '请输入还款金额', trigger: 'blur' },
                ],
                reductionFee: [
                    { required: true, message: '请输入减免金额', trigger: 'blur' },
                ],
                repaymentDate: [
                    { required: true, message: '请选择模拟还款日', trigger: 'blur' }
                ],
                repaymentType: [
                    { required: true, message: '请选择还款模式', trigger: 'blur' }
                ],
            }
        }
    },
    mounted() {
        this.ruleForm.loanCode = this.$route.query.loanCode
        // 获取时间
        this.getDate()
        // 测算
        this.test()
    },
    methods: {
        // 确认还款
        repaySure() {
            this.picLoading = true
            let submitObj = Object.assign({ fileUrls: this.fileUrls.map(item => item.path) }, this.ruleForm)
            postRepaymentInAccount(submitObj).then((res) => {
                this.picLoading = false
                this.dialogVisible = false
                this.fileUrls = []
                this.$message.success('确认还款成功')
            }).catch(() => {
                this.picLoading = false
            })
        },
        //上传相关
        deletePic(index) {
            this.fileUrls.splice(index, 1)
        },
        handleClose() {
            this.dialogVisible = false
            this.fileUrls = []
        },
        beforeAvatarUploadA() {
            this.picLoading = true
        },
        //上传
        handleAvatarSuccess4(res, file, fileList) {
            this.picLoading = false
            console.log(res)
            let arr = res.data.map((item) => {
                return {
                    path:item.path,
                    fullPath:item.fullPath,
                }
            })
            this.fileUrls = this.fileUrls.concat(arr)
        },
        // 测算
        test(type) {
            postRepaymentTest(this.ruleForm).then((res) => {
                console.log(res)
                this.testRepayInfo = res.data
                if (type === 'actual') {
                    this.dialogVisible = true
                }
            });
        },
        // 获取时间
        getDate() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
            const day = String(now.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day} 00:00:00`;
            this.ruleForm.repaymentDate = formattedDate
        },
        submitTest(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 测算
                    this.test()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 测算
                    this.test('actual')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }

}
</script>
<style lang='less' scoped>
.dialog-content {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .dialog-box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 700px;

        .gray-line {
            width: 100%;
            height: 1px;
            background: #E2E2E2;
        }

        .yellow-box {
            width: 100%;
            height: 35px;
            flex-shrink: 0;
            border-radius: 8px;
            background: #FFFAEE;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 20px;
            margin-top: 20px;

            .left {
                .one {
                    color: #FA8C26;
                    font-size: 14px;
                    font-weight: 500;
                }

                .two {
                    color: #967249;
                    font-size: 14px;
                    font-weight: 400;
                    margin-top: 12px;
                }
            }
        }

        .upload-box-xxxy {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            height: 170px;
            flex-shrink: 0;
            border-radius: 8px;
            opacity: 0.8;
            background: #F3F6FF;
            margin-top: 20px;

            .upload-words {
                color: var(--kuashangbao-Typography, #333);
                font-size: 16px;
                font-weight: 500;
            }

            .upload-xxxyy {
                width: 334px;
                height: 51px;
                margin-top: 16px;
            }

            .upload-btn {
                margin-top: 16px;
                display: flex;
                width: 334px;
                height: 51px;
                padding: 13px 0px;
                justify-content: center;
                align-items: center;
                flex-shrink: 0;
                border-radius: 8px;
                border: 2px dashed var(--kuashangbao-blue, #1463FF);
                opacity: 0.8;
                color: var(--tab, #1F5BFF);
                font-size: 17.5px;
                font-weight: 600;
                cursor: pointer;
            }
        }

        .pic-box {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;
            width: 100%;
            height: 180px;
            overflow: auto;
            margin: 20px 0;

            .pic-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: 40px;
                flex-shrink: 0;
                border-radius: 8px;
                border-radius: 6px;
                border: 1px solid #D1D8E7;
                padding: 0 20px;
                margin-top: 10px;

                .left {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    cursor: pointer;

                    .pic {
                        height: 24px;
                        margin-right: 6px;
                    }

                    .words {
                        color: #203B87;
                        font-size: 13px;
                        font-weight: 400;
                    }
                }

                .delete {
                    height: 16px;
                    cursor: pointer;
                }
            }
        }
    }

    .dialog-footer {
        float: right;
        margin-top: 20px;

        .back-btn {
            width: 124px;
            height: 44px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            border-radius: 6px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            border-radius: 6px;
            background: var(--kuashangbao-blue, linear-gradient(90deg, #1463FF 0%, #7214FF 100%));
            line-height: 44px;
            color: #FFF;
            cursor: pointer;
        }
    }
}
</style>
<style lang='less' scoped>
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


.block {
    position: relative;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Medium;
    width: 100%;
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
        background: #E52D6D;
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
    width: 140px;
    display: block;
    margin-left: 30px;
    text-align: left;
}

.inp {
    width: 220px;
    display: inline-block;
}
</style>

<style>
.el-upload--text {
    height: 80px;
}
</style>
