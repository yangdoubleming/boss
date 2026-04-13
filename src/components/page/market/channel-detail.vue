<template>
    <div class="channel">
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img
                    src="../../../../public/img/favicon.png"
                    style="width:17px;height:17px;margin-right:5px"
                    alt
                />豆沙包 /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{$route.meta.title}}</span>
        </div>

        <el-card class="box-card">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                :inline='true'
                label-width="200px"
                label-position="left"
                class="demo-ruleForm"
            >
                <el-form-item label="企业名称" prop="merchantName">
                    <el-input v-model="ruleForm.merchantName" style="width:350px"></el-input>
                </el-form-item>
                <el-form-item label="渠道行业" prop="platformCode">
                    <el-input v-model="ruleForm.platformCode" style="width:350px"></el-input>
                </el-form-item>
                <el-form-item label="特殊码" prop="specialCode">
                    <el-input v-model="ruleForm.specialCode" style="width:350px"></el-input>
                </el-form-item>

                <el-form-item label="渠道联系人" prop="contactName">
                    <el-input v-model="ruleForm.contactName" style="width:350px"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="contactIphone">
                    <el-input v-model="ruleForm.contactIphone" style="width:350px"></el-input>
                </el-form-item>
                <el-form-item label="联系地址" prop="contactAddress">
                    <el-input v-model="ruleForm.contactAddress" style="width:350px"></el-input>
                </el-form-item>
                <el-form-item label="签约状态" prop="signStatus">
                    <el-radio-group v-model="ruleForm.signStatus">
                        <el-radio label="1">已签约</el-radio>
                        <el-radio label="2">未签约</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="结算方式" prop="settlementMethod">
                    <el-radio-group v-model="ruleForm.settlementMethod">
                        <el-radio label="1">转账</el-radio>
                        <el-radio label="2">购物卡</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="结算周期" prop="settlementPeriod">
                    <el-radio-group v-model="ruleForm.settlementPeriod">
                        <el-radio label="1">月</el-radio>
                        <el-radio label="2">季度</el-radio>
                        <el-radio label="3">半年</el-radio>
                        <el-radio label="4">年</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="佣金率" prop="commissionRate">
                    <el-input v-model="ruleForm.commissionRate" style="width:350px"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="commissionDesc">
                    <el-input
                        type="textarea"
                        :rows="2"
                        v-model="ruleForm.commissionDesc"
                        style="width:350px"
                    ></el-input>
                </el-form-item>

                <el-form-item label="开户人" prop="accountName">
                    <el-input v-model="ruleForm.accountName" style="width:350px"></el-input>
                </el-form-item>
                <el-form-item label="开户行" prop="accountBankName">
                    <el-input v-model="ruleForm.accountBankName" style="width:350px"></el-input>
                </el-form-item>
                <el-form-item label="付款账号" prop="accountNumber">
                    <el-input v-model="ruleForm.accountNumber" style="width:350px"></el-input>
                </el-form-item>

                <el-form-item label="起止时间" prop="dates">
                    <el-date-picker
                        v-model="ruleForm.dates"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="文件上传" prop="fileList">
                    <el-upload
                        style="width:350px"
                        class="upload-demo"
                        :action="uploadUrl+'/boss/download'"
                        :before-remove="beforeRemove"
                        :on-success="handleAvatarSuccess"
                        :on-error="errorMethod"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">上传图片或PDF文件</div>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <div style="margin-top:30px">
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    
    data() {
        return {
            rules: {
                merchantName: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
                platformCode: [{ required: true, message: '请选择渠道行业', trigger: 'change' }],
                contactName: [{ required: true, message: '请填写联系人', trigger: 'blur' }],
                contactIphone: [{ required: true, message: '请填写联系方式', trigger: 'blur' }],
                contactAddress: [{ required: true, message: '请填写联系地址', trigger: 'blur' }],
                signStatus: [{ required: true, message: '请选择签约状态', trigger: 'change' }],
                settlementMethod: [{ required: true, message: '请选择结算方式', trigger: 'change' }],
                settlementPeriod: [{ required: true, message: '请选择结算周期', trigger: 'change' }],
                commissionRate: [{ required: true, message: '请填写佣金率', trigger: 'blur' }],
                accountName: [{ required: true, message: '请填写开户人', trigger: 'blur' }],
                accountBankName: [{ required: true, message: '请填写开户行', trigger: 'blur' }],
                accountNumber: [{ required: true, message: '请填写付款账户', trigger: 'blur' }],
                dates: [{ required: true, message: '请选择合作时间', trigger: 'date', }]
            },
            uploadUrl: process.env.VUE_APP_TOUFANG_URL,
            fileList: [],
            ruleForm: {
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
                filePath: ''
            }
        };
    },
    methods: {
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
        errorMethod() {
            this.$message.warning(`请上传PDF或者图片`);
        },
        handleAvatarSuccess(res) {
            this.filePath = res.data;
        },

        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
};
</script>

<style lang='less' scoped>
.channel {
    /deep/.el-upload--text {
        width: 80px !important;
        height: 40px !important;
        border: none !important;
    }
}
</style>