<template>
  <div class="supermarket">
    <div class="credit-details-box">
      <div class="see-all">
        <el-descriptions title="基本信息">
          <el-descriptions-item label="申请单号">{{ detailObj.applicationCode }}</el-descriptions-item>
          <el-descriptions-item label="乙方">{{ detailObj.borrowerName }}</el-descriptions-item>
          <el-descriptions-item label="协议审核状态">{{ detailObj.contractAuditStatus }}</el-descriptions-item>
          <el-descriptions-item label="协议上传日期">{{ detailObj.contractUploadDate }}</el-descriptions-item>
          <el-descriptions-item label="支付审核状态">{{ detailObj.paymentReceiptStatus }}</el-descriptions-item>
          <el-descriptions-item label="协议审核通过日期">{{ detailObj.contractApprovalDate }}</el-descriptions-item>
          <el-descriptions-item label="用户ID">{{ detailObj.userId }}</el-descriptions-item>
          <el-descriptions-item label="付款审核通过日期">{{ detailObj.paymentApprovalDate }}</el-descriptions-item>
          <el-descriptions-item label="申请产品">{{ detailObj.lenderName }}</el-descriptions-item>
          <el-descriptions-item label="审核人">{{ detailObj.reviewer }}</el-descriptions-item>
          <el-descriptions-item label="应收金额">{{ detailObj.receivableAmount }}元</el-descriptions-item>
          <el-descriptions-item label="协议审批备注">{{ detailObj.contractRemarks }}</el-descriptions-item>
          <el-descriptions-item label="付款审批备注">{{ detailObj.paymentRemarks }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="see-all">
        <el-descriptions title="协议审批信息" />
        <div class="bottom-box">协议文件
          <!-- <img @click="openAgreement" :src="upload" alt=""> -->
        </div>
        <div class="contract-box">
          <a target="_blank" v-for="(item, index) in detailObj.contractFiles" :key="item" :href="item">审批凭证{{ index + 1
          }}</a>
        </div>
        <div class="bottom-top-box">审批</div>
        <el-button type="warning" @click="openApprove('SERVICE_FEE_CONTRACT', 'APPROVED')" :disabled="isApproved">
          审批通过</el-button>
        <el-button type="success" @click="openApprove('SERVICE_FEE_CONTRACT', 'REJECTED')" :disabled="isApproved">
          审批拒绝</el-button>
      </div>
      <div class="see-all">
        <el-descriptions title="付款审批信息" />
        <div class="bottom-box">
          付款凭证
          <!-- <img @click="openPay" :src="upload" alt=""> -->
        </div>
        <div class="contract-box">
          <a target="_blank" v-for="(item, index) in detailObj.paymentFiles" :key="item" :href="item">付款凭证{{ index + 1
          }}</a>
        </div>
        <div class="bottom-top-box">审批</div>
        <el-button type="warning" @click="openApprove('SERVICE_FEE_PAYMENT', 'APPROVED')"
          :disabled="!isApproved || isPay">
          审批通过</el-button>
        <el-button type="success" @click="openApprove('SERVICE_FEE_PAYMENT', 'REJECTED')"
          :disabled="!isApproved || isPay">
          审批拒绝</el-button>
      </div>
    </div>
    <el-dialog title="协议凭证上传" :visible.sync="dialogAgreementVisible" width="25%">
      <div class="upload-demo-box">
        <el-upload class="upload-demo" ref="upAgreementLoad" :action="uploadUrl" :on-remove="handleRemoveAgreement"
          :file-list="fileAgreementList" :on-success="handleAgreementSuccess" :auto-upload="false">
          <el-button slot="trigger" type="text">选取文件</el-button>
        </el-upload>
        <el-button style="margin-left: 10px;height: 40px;" type="success"
          @click="submitAgreemtUpload">上传到服务器</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAgreement">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="付款凭证上传" :visible.sync="dialogPayVisible" width="25%">
      <div class="upload-demo-box">
        <el-upload class="upload-demo" ref="upPayLoad" :action="uploadUrl" :on-remove="handleRemovePay"
          :file-list="filePaytList" :auto-upload="false">
          <el-button slot="trigger" type="text">选取文件</el-button>
        </el-upload>
        <el-button style="margin-left: 10px;height: 40px;" type="success" @click="submitPayUpload">上传到服务器</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelPay">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="确认审批结果" :visible.sync="dialogSpVisible" width="25%" :close-on-click-modal="false"
      :before-close="closeDiaSp">
      <span>{{ msg }}</span>
      <el-input style="width: 100%;margin-top: 15px;" v-model="spRemarks" placeholder="请输入备注"></el-input>
      <el-date-picker v-if="approvalType === 'SERVICE_FEE_PAYMENT' && approvalStatus === 'APPROVED'" style="width: 100%;margin-top: 15px;" v-model="spDealDate" type="date"
        value-format="yyyy-MM-dd HH:mm:ss" placeholder="收款日期" />
      <el-input v-if="approvalType === 'SERVICE_FEE_PAYMENT' && approvalStatus === 'APPROVED'" style="width: 100%;margin-top: 15px;" v-model="spActualAmount" placeholder="实收金额" type="number" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDiaSp">取 消</el-button>
        <el-button type="primary" @click="openApproveApi">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  serviceFeeDetails,
  serviceFeeApprove
} from '../../../api/statistics';
import upload from '@/assets/up-load.png'
export default {
  components: {},
  data() {
    return {
      dialogSpVisible: false,
      filePaytList: [],
      fileAgreementList: [],
      fileList: [],
      dialogAgreementVisible: false,
      dialogPayVisible: false,
      upload,
      msg: "是否确认通过该协议审批？",
      detailObj: {},
      isApproved: false,
      isPay: false,
      uploadUrl: process.env.VUE_APP_UPLOAD_URL,
      spRemarks: '',
      spDealDate: '',
      approvalType: '',
      approvalStatus: '',
      spActualAmount: ''
    };
  },
  mounted() {
    this.getDetails()
  },
  methods: {

    //取消付款上传
    cancelPay() {
      this.filePaytList = []
      this.dialogPayVisible = false
    },
    //上传付款凭证
    submitPayUpload() {
      this.$refs.upPayLoad.submit();
    },
    //取消协议上传
    cancelAgreement() {
      this.fileAgreementList = []
      this.dialogAgreementVisible = false
    },
    //协议上传成功
    handleAgreementSuccess(response, file, fileList) {
      console.log("🚀 ~ handleAgreementSuccess ~ response:", response)
      // this.fileAgreementList = fileList
      console.log("🚀 ~ handleAvatarSuccess ~ fileList:", fileList)
    },
    //上传协议文件
    submitAgreemtUpload() {
      this.$refs.upAgreementLoad.submit();
    },
    //打开协议
    openAgreement() {
      this.dialogAgreementVisible = true
    },
    //打开付款凭证
    openPay() {
      this.dialogPayVisible = true
    },
    //上传付款审批信息
    handleSuccessB(response, file, fileList) {

    },
    handleRemoveB(file, fileList) {

    },
    //打开审批
    openApprove(type, status) {
      if (type == 'SERVICE_FEE_CONTRACT' && status == 'APPROVED') {
        this.msg = "是否确认通过该协议审批？"
      } else if (type == 'SERVICE_FEE_CONTRACT' && status == 'REJECTED') {
        this.msg = "是否确认拒绝该协议审批？"
      } else if (type == 'SERVICE_FEE_PAYMENT' && status == 'APPROVED') {
        this.msg = "是否确认通过该付款审批？"
      } else if (type == 'SERVICE_FEE_PAYMENT' && status == 'REJECTED') {
        this.msg = "是否确认拒绝该付款审批？"
      }
      this.approvalType = type
      this.approvalStatus = status
      this.dialogSpVisible = true
    },
    openApproveApi() {
      if (this.approvalType === 'SERVICE_FEE_PAYMENT' && this.approvalStatus === 'APPROVED') {
        if (!this.spDealDate) {
          this.$message({
            message: '请选择收款日期',
            type: 'warning'
          });
          return
        }
        if (!this.spActualAmount) {
          this.$message({
            message: '请输入实收金额',
            type: 'warning'
          });
          return
        }
      }
      serviceFeeApprove({
        id: this.$route.query.id,
        remarks: this.spRemarks,
        approvalType: this.approvalType,
        approvalStatus: this.approvalStatus,
        dealDate: this.spDealDate,
        actualAmount: this.spActualAmount
      }).then(res => {
        this.closeDiaSp()
        this.getDetails()
      })
    },
    closeDiaSp() {
      this.dialogSpVisible = false
      this.spRemarks = ''
      this.spDealDate = ''
      this.spActualAmount = ''
    },
    getDetails() {
      serviceFeeDetails({
        id: this.$route.query.id,
      }).then(res => {

        this.detailObj = res.data
        if (res.data.contractAuditStatus !== 'PENDING' && res.data.paymentReceiptStatus == 'PENDING') {
          this.isApproved = true
        } else if (res.data.contractAuditStatus !== 'PENDING' && res.data.paymentReceiptStatus !== 'PENDING') {
          this.isPay = true
          this.isApproved = true
        }
        if (this.detailObj.contractAuditStatus == 'APPROVED') {
          this.detailObj.contractAuditStatus = '已通过'
        } else if (this.detailObj.contractAuditStatus == 'REJECTED') {
          this.detailObj.contractAuditStatus = '已拒绝'
        } else if (this.detailObj.contractAuditStatus == 'PENDING') {
          this.detailObj.contractAuditStatus = '待审核'
        }
        if (this.detailObj.paymentReceiptStatus == 'APPROVED') {
          this.detailObj.paymentReceiptStatus = '已通过'
        } else if (this.detailObj.paymentReceiptStatus == 'REJECTED') {
          this.detailObj.paymentReceiptStatus = '已拒绝'
        } else if (this.detailObj.paymentReceiptStatus == 'PENDING') {
          this.detailObj.paymentReceiptStatus = '待上传'
        }
      })
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.upload-demo-box {
  display: flex;
  justify-content: space-between;
}

.supermarket {
  color: #333333;
  margin-bottom: 30px;
}

.credit-details-box {
  width: 100%;
  margin: 15px auto;
  overflow: hidden;
  border-radius: 15px;

  .see-all {
    width: 100%;
    height: 200px;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0px 12px 5px -10px rgba(0, 0, 0, 0.1),
      0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    position: relative;
    border-radius: 16px;
    margin-top: 20px;

    .bottom-box {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
      align-items: center;
      cursor: pointer;

      ::v-deep .upload-demo .el-upload {
        height: auto;
        width: auto;
        border: none;
      }


      img {
        width: 57px;
      }
    }

    .contract-box {
      display: flex;
      gap: 20px;

      .contract-item {
        cursor: pointer;
      }
    }

    .bottom-top-box {
      margin-top: 10px;
      margin-bottom: 20px;
    }

    .see {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;

      .only-one {
        width: 240px;
        height: 150px;
        overflow: hidden;

        .up {
          font-size: 15px;
          margin-top: 40px;
          margin-left: 30px;
          font-weight: 550;
        }

        .down {
          font-size: 20px;
          margin-top: 20px;
          margin-left: 30px;
        }

        .success {
          color: #67c23a;
        }
      }
    }

    .right-top {
      width: 100px;
      height: 30px;
      background: #e51e5f;
      color: white;
      position: absolute;
      text-align: center;
      line-height: 30px;
      top: 0px;
      right: 0px;
      border-bottom-left-radius: 25px;
    }
  }

  .credit-detials {
    width: 100%;
    height: 420px;
    background-color: #ffffff;
    box-shadow: 0px 12px 5px -10px rgba(0, 0, 0, 0.1),
      0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    margin-bottom: 20px;

    .margin-top {
      padding: 20px;
    }
  }

  .table {
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0px 12px 5px -10px rgba(0, 0, 0, 0.1),
      0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    margin-bottom: 15px;

    .container {
      padding: 20px;

      .title-box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        margin-bottom: 10px;

        .title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 20px;
          margin-top: 28px;
        }
      }
    }
  }
}
</style>