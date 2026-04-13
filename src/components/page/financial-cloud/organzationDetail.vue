<template>
	<div>
		<div style="display:flex; align-items: center;padding:18px">
			<div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
				<img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
				/金融云 /
			</div>

			<span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
		</div>

		<el-card>
			<div class="block">
				<div class="line"></div>
				基本信息
			</div>
			<el-descriptions class="margin-top" :column="3" :size="size" border>
				<el-descriptions-item>
					<template slot="label">
						机构名称
					</template>
					{{ formData.name }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						项目归类
					</template>
					{{ formData.cooperationMode }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						协议生效日期
					</template>
					{{ formData.agreementStartDate }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						协议到期日期
					</template>
					{{ formData.agreementExpireDate }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						固定订阅费
					</template>
					{{ formData.price }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						takeRate
					</template>
					{{ formData.takeRateTwo }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						合作状态
					</template>
					{{ formData.status }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						下次续费日期
					</template>
					{{ formData.renewalDate }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						累计GMV
					</template>
					{{ formData.loanAmount }}万
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						当前余额
					</template>
					{{ formData.loanBalance }} 万
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						BD负责人
					</template>
					{{ formData.chargePerson }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						创建时间
					</template>
					{{ formData.createTime }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						机构对接人
					</template>
					{{ formData.contactPerson }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						联系方式
					</template>
					{{ formData.contactInformation }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						备注
					</template>
					<el-popover placement="top-start" title="" width="200" trigger="hover" :content="formData.remark">
						<div class="hiddenText" slot="reference">{{ formData.remark }}</div>
					</el-popover>
				</el-descriptions-item>
			</el-descriptions>
		</el-card>

		<div class="block">
			<div class="line"></div>
			<div>协议列表</div>
			<button class="upload" @click="dialogFormVisible = true">上传协议</button>
		</div>
		<!-- 新增和修改弹窗 -->
		<el-dialog width="700px" :close-on-click-modal="false" title="上传协议" :visible.sync="dialogFormVisible"
			direction="rtl" style="text-align: left;" class="mode">
			<el-form :model="choose" label-width="120px" class="formList" :rules="rules">

				<el-form-item label="选择协议：" style="margin-left: 17%;">
					<!-- <el-upload accept=".pdf" class="upload-demo" :action="uploadUrl" :limit="1" icon="el-icon-link"
						:data="loadData" :on-success="handleAvatarSuccess" :file-list="fileList"
						:on-exceed="handleExceed" :headers="headers" name="upLoadImage" :on-remove="handleRemove"> -->
					<el-upload class="upload-demo" :show-file-list="false" :action="uploadUrl"
						:on-success="handlePreview">
						<el-button class="btn" size="small"
							style=" width:160px;background-color:#efefef;border: none;border-radius: 0px; ">点击上传
						</el-button>
						<span
							style="font-size: 13px;display: inline-block; width: 100px; color: #999; margin-left: 6%;color: red;">（格式仅限pdf）</span>
					</el-upload>
					<a v-for="(item, index) in fileList" :key="index" :href="item.fullFilePath" target="_blank"
						style="display: block">{{
				item.fileName
			}}</a>
				</el-form-item>
			</el-form>
			<div class="btn" style="display: flex;margin-top: 50px; justify-content: space-around;width: 100%;">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="_createPopup()">确定</el-button>
			</div>
		</el-dialog>

		<table-page :tableData="tableData" :columns="columns" :totalSize="totalSize"
			@conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
			@page-change="handlePageChange" :detailTable="true" @goview="goviewF" :showPagination="false" />

		<div class="block">
			<div class="line"></div>
			<div>收款记录</div>
			<button class="upload1" @click="dialogFormVisible2 = true">新增收款记录</button>
		</div>

		<!-- 新增收款记录-->
		<el-dialog width="550px" :close-on-click-modal="false" title="新增收款记录" :visible.sync="dialogFormVisible2"
			direction="rtl" style="text-align: left;" class="mode">
			<el-form ref="payment" :model="payment" label-width="170px" class="formList" :rules="rules">
				<el-form-item label="收款日期:" prop="date" class="list date">
					<el-date-picker class="inp" v-model="payment.date" type="date" value-format="yyyy-MM-dd"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="收入类型:" prop="incomeType" class="list">
					<el-select v-model="payment.incomeType" placeholder="费用类型" class="inp">
						<el-option label="金融云订阅收入" value="FINANCIAL_CLOUD_SUBSCRIBE_FEE"></el-option>
						<el-option label="保险云订阅收入" value="INSURANCE_CLOUD_SUBSCRIBE_FEE"></el-option>
						<el-option label="Dow+SaaS订阅收入" value="DOW_SAAS_SUBSCRIBE_FEE"></el-option>
						<el-option label="3P DOW+收入" value="DOW_3P_FEE"></el-option>
						<el-option label="豆服会员收入" value="SELLER_CLOUD_SERVICE_FEE"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="收款金额:" prop="amount" class="list">
					<el-input v-model="payment.amount" placeholder="" class="inp"></el-input>元
				</el-form-item>
				<el-form-item label="GVM:" v-if="payment.expenseType == 'DOW_SERVICE_CHARGE'" prop="gmvAmount"
					class="list">
					<el-input v-model="payment.gmvAmount" placeholder="" class="inp"></el-input>元
				</el-form-item>
				<el-form-item label="备注:" prop="remark" class="list">
					<el-input type="textarea" v-model="payment.remark" placeholder="" class="inp"></el-input>
				</el-form-item>
			</el-form>

			<div class="btn" style="display: flex;justify-content: center;width: 100%;margin-top: 40px;">
				<el-button @click="dialogFormVisible2 = false">取消</el-button>
				<el-button style="margin-left: 50px;" type="primary" @click="paymentCommit('payment')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 收款记录详情列表 -->
		<table-page :tableData="paymentList" :columns="paymentRecord" :totalSize="totalSize"
			@conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
			@page-change="handlePageChange" :detailTable="true" :showPagination="false" />

	</div>
</template>

<script>
import {
	tableMixin
} from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import moment from 'moment'; //导入文件
import {

	fileSave,
	fileList,

} from '../../../api/statistics';
import {
	detailSave,
	detailManagement,
	increaseMoney,
	paymentList,
	IdList
} from '../../../api/index.js'
export default {
	mixins: [tableMixin],
	components: {
		tablePage
	},
	data() {
		return {
			dialogFormVisible: false, //弹窗
			dialogFormVisible2: false,
			uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
			fileList: [],
			url: process.env.VUE_APP_IMGS_BASE_URL,
			// uploadUrl: '', //协议链接
			// 补充协议参数
			loadData: {
				companyName: '',
				type: 'supplement'
			},
			agreement: {
				instruction: "",
				instructionFile: ""
			}, //协议

			payment: {}, //新增收款记录
			paymentList: [],
			idList: [],
			headers: {
				token: ""
			},
			choose: {},

			formData: {}, //基本信息列表
			dateTime: [], //到期时间

			// totalSize: 10,
			tableData: [],
			Code: "",


			columns: [{
				label: '序号',
				prop: 'id',
			},
			{
				label: '协议名称',
				prop: 'fileName',
			},
			{
				label: '上传时间',
				prop: 'createTime',

			},
			{
				label: this.$t('loan_search_cz'),
				prop: '',
				width: '120',
				operates: [{
					event: 'goview',
					text: this.$t('common_see'),
					type: 'primary'
				},],
				fixed: 'right'
			}
			],
			paymentRecord: [
				{
					label: '收款编号',
					prop: 'code'
				},
				{
					label: '收入类型',
					prop: 'incomeType'
				},
				{
					label: '费用类型',
					prop: 'expenseType'
				},
				{
					label: '收费日期',
					prop: 'date'
				},
				{
					label: '收费金额/元',
					prop: 'amount'
				},
				{
					label: '备注',
					prop: 'remark',
				},
				{
					label: this.$t('loan_detail_cjsj'),
					prop: 'createTime',

				}
			],

			// 表单校验规则
			rules: {
				amount: [{
					required: true,
					// pattern: '/^\d\*$/',
					message: '请输入正确的收费金额',
					trigger: 'blur'
				},],
				date: [{
					required: true,
					message: '请选择收费日期',
					trigger: 'blur'
				}],
				incomeType: [{
					required: true,
					message: '请选择收入类型',
					trigger: 'blur'
				}],
				gmvAmount: [{
					required: true,
					message: '请输入GVM费用',
					trigger: 'blur'
				}],

			}

		}
	},

	mounted() {
		this.PaymentView()

	},
	created() {
		this.headers.token = localStorage.getItem('token');
		localStorage.setItem("id", JSON.stringify(this.$route.query.row));
		this._fileList();
	},
	methods: {

		// 上传图片
		handlePreview(res, file) {
			console.log(res);
			if (res.code == "200") {
				let type = res.data.filePath.substr(-3)
				console.log(type);
				if (type != "pdf" && type != "PDF") {
					this.$message.warning("请上传pdf文件")
					return false
				} else {
					this.fileList = []
					this.fileList.push(res.data);
				}
			} else {
				this.$message.warning("请检查文件格式是否正确")
			}
			// this.fileList.push(res.data);
		},
		// 上传图片接口
		_fileSave(obj) {
			let submitObj = {
				fileType: 'INSTITUTIONS',
				fileUrl: obj[0].filePath,
				resourceId: this.$route.query.row,
				fileName: obj[0].fileName
			};
			fileSave(submitObj).then((res) => {
				this._fileList();
				this.fileList = []

			});
		},
		// 获取图片列表
		_fileList() {
			fileList({
				fileType: 'INSTITUTIONS',
				resourceId: this.$route.query.row
			}).then((res) => {
				if (res.data && res.data.length > 0) {
					this.tableData = res.data;
				}
			});
		},

		_createPopup() {
			this._fileSave(this.fileList);
			this.dialogFormVisible = false
		},
		handlePageChange(page) {
			this.pageData = page
			this._getList()
		},
		_getList() {
			detailManagement({
				id: this.$route.query.row,
				// fundCode:"FN20230327200763"
			}).then(res => {
				this.formData = res.data
				this.formData.agreementStartDate = this.formData.agreementStartDate.substring(0, 10)
				this.formData.agreementExpireDate = this.formData.agreementExpireDate.substring(0, 10)
				this.formData.renewalDate = this.formData.renewalDate.substring(0, 10)

				if (this.formData.cooperationMode == "COLLECTION_CLOUD") {

					this.formData.cooperationMode = "收款云"
				} else if (this.formData.cooperationMode == "CREDIT_CLOUD") {
					this.formData.cooperationMode = "信贷云"

				} else if (this.formData.cooperationMode == "INSURANCE_CLOUD") {
					this.formData.cooperationMode = "保险云"
				} else if (this.formData.cooperationMode == "DOW_CLOUD") {
					this.formData.cooperationMode = "Dow+云"

				}

				if (this.formData.status == "COOPERATION") {

					this.formData.status = "合作中"
				} else if (this.formData.status == "COOPERATION_TERMINATION") {

					this.formData.status = "合作终止"
				}

				if (this.formData.takeRate && this.formData.takeRateMode == "LOAN_BALANCE") {

					this.formData.takeRateTwo = "在贷余额*" + this.formData.takeRate + "%"
				} else if (this.formData.takeRate && this.formData.takeRateMode == "LOAN_AMOUNT") {

					this.formData.takeRateTwo = "放款额*" + this.formData.takeRate + "%"
				} else if (this.formData.takeRate && this.formData.takeRateMode == "COLLECTION_AMOUNT") {
					this.formData.takeRateTwo = "收款额*" + this.formData.takeRate + "%"
				} else if (this.formData.takeRate && this.formData.takeRateMode == "PREMIUM") {
					this.formData.takeRateTwo = "保费*" + this.formData.takeRate + "%"
				} else if (this.formData.takeRate && this.formData.takeRateMode == "FLOW") {
					this.formData.takeRateTwo = "流量*" + this.formData.takeRate + "%"
				}

				if (this.formData.subscribeFeeMode == "YEAR") {

					this.formData.price = this.formData.subscribeFee + "万/年"

				} else if (this.formData.subscribeFeeMode == "MONTH") {

					this.formData.price = this.formData.subscribeFee + "万/月"
				} else if (this.formData.subscribeFeeMode == "COUNT") {
					this.formData.price = this.formData.subscribeFee + "万/次"
				} else if (this.formData.subscribeFeeMode == "INDEPENDENT_PAYMENT") {

					this.formData.price = this.formData.subscribeFee + "万/一次性收费"
				} else if (this.formData.subscribeFeeMode == "") {
					this.formData.price = ""
				}


				if (this.formData.subscribeFee == "" || this.formData.subscribeFee == null) {
					this.formData.price = ""
				}
			})

			IdList({
				type: "FEI_SHU"
			}).then((res) => {
				this.idList = res.data
				this.idList.forEach((item, index) => {
					if (this.formData.extUserId == item.userId) {
						this.formData.chargePersonTwo = item.name
					}
				})
				console.log(this.formData);
			}).catch((err) => {
				this.$message.error()
			})


		},

		goviewF(e) {
			window.open(this.url + e.fileUrl)
		},

		//新增收款记录
		paymentCommit(payment) {
			this.$refs[payment].validate((valid) => {
				if (valid) {

					increaseMoney({
						amount: this.payment.amount,
						date: this.payment.date + " 00:00:00",
						gmvAmount: this.payment.gmvAmount,
						institutionsId: this.$route.query.row,
						remark: this.payment.remark,
						incomeType: this.payment.incomeType
					}).then((res) => {
						this.dialogFormVisible2 = false
						this.PaymentView()

						this.payment = {
							amount: '',
							date: "",
							gmvAmount: "",
							remark: "",
							incomeType: ""
						}
					}).catch((err) => {
						this.$message.error()
					})
				} else {

				}
			})
		},


		//获取协议
		getPay() {
			fileSave({
				fileType: 'INSTITUTIONS',

				resourceId: this.$route.query.row,

			}).then((res) => {
				console.log(res);
				this.tableData = res.data;
			})
		},

		//获取收款记录
		PaymentView() {
			paymentList({
				institutionsId: this.$route.query.row
			}).then((res) => {
				this.paymentList = res.data;
				this.paymentList.forEach((item, index) => {
					item.date = item.date.substring(0, 10);
					switch (item.incomeType) {
						case 'FINANCIAL_CLOUD_SUBSCRIBE_FEE':
							item.incomeType = '金融云订阅收入';
							break;
						case 'INSURANCE_CLOUD_SUBSCRIBE_FEE':
							item.incomeType = '保险云订阅收入';
							break;
						case 'DOW_SAAS_SUBSCRIBE_FEE':
							item.incomeType = 'Dow+SaaS订阅收入';
							break;
						case 'DOW_3P_FEE':
							item.incomeType = '3P DOW+收入';
							break;
						case 'SELLER_CLOUD_SERVICE_FEE':
							item.incomeType = '豆服会员收入';
							break;
					};
					switch (item.expenseType) {
						case 'SAAS_SUBSCRIBE_FEE':
							item.expenseType = '订阅费';
							break;
						case 'DOW_SERVICE_CHARGE':
							item.expenseType = '技术服务费';
							break;
						case 'MEMBERSHIP_BENEFITS_FEE':
							item.expenseType = '会员权益费';
							break;
						case 'ACCOUNT_OPENING_SERVICE_FEE':
							item.expenseType = '开户服务费';
							break;
					}
				})
			})
		}

	}

}
</script>

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
		width: 300px;
		height: auto;
	}
}

.hiddenText {
	width: 120px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	cursor: pointer;
}

.block {
	position: relative;
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

.list {
	/deep/.el-input__inner {
		height: 40px;
		width: 220px;
	}
}

/deep/.el-upload--text {
	border: none;
	width: 300px;
	height: 32px;
}
</style>