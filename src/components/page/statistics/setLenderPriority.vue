<template>
    <div class="service">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <el-card style="min-height: 600px;">
            <div class="block">
                <div class="line"></div>
                资方优先级设置
            </div>
            <div style="margin-left: 30px;">
                <el-radio v-model="radio1" label="1" border>按优先级分配</el-radio>
                <el-radio v-model="radio1" label="2" border>按比例分配</el-radio>
                <el-button type="primary" style="width: 120px;margin-bottom: 20px;" @click="add">增加</el-button>
                <div style="width: 60%;">
                    <div
                        style="display: flex;align-items: center;justify-content: space-between;border-bottom: 1px solid #dcdfe6;">
                        <el-descriptions class="margin-top" title="" :column="4" direction="vertical">
                            <el-descriptions-item label="资方名称">kooriookami</el-descriptions-item>
                            <el-descriptions-item label="优先级(0-10)">18100000000</el-descriptions-item>
                        </el-descriptions>
                        <el-button plain>删除</el-button>
                    </div>
                </div>
            </div>

        </el-card>
        <el-dialog title="请选择" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="资方名称" prop="name">
                        <el-input v-model="ruleForm.name" style="width:300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="分配比例%" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width: 300px;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="优先级(0-10)" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width: 300px;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')" style="width: 120px;">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" style="width: 120px;">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { serveList, getBankForLoan, getLoanFile, repaymentPlan, getLoanDetail } from '../../../api/dhfq';
import { getLoanUserLoanDetail, getApplicationInfo, getUserOfferNum, getUserOfferInfo } from '../../../api/index';
export default {
    data() {
        return {
            dialogVisible: false,
            radio1: '',
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
            },
            ruleForm: {
                name: '',
                region: '',
            },
        }
    },
    created() {

    },
    methods: {
        add() {
            this.dialogVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
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
</style>
