<template>
	<div>
		<div style="display: flex; align-items: center; padding: 18px">
			<div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
				<img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
					alt />豆沙包
				/ 金融云 /
			</div>
			<span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
		</div>

		<!-- 搜索栏 -->
		<el-row :gutter="24" class="searchForm">
			<el-col :span="24">
				<el-card shadow="hover" :body-style="{ padding: '0px' }">
					<el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 30px 20px;">
						<el-row style="display: flex;flex-wrap: wrap;" class="serar">
							<el-form-item prop="name" class="listt" style="120px">
								<el-input v-model="ruleForm.name" placeholder="机构名称" class="inp"></el-input>
							</el-form-item>
							<el-form-item>
								<el-select v-model="ruleForm.chargePerson" placeholder="负责人" style="width: 100%">
									<el-option v-for="(item, index) in idList" :label="item.name" :value="item.userId">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-select v-model="ruleForm.cooperationMode" placeholder="项目归类" class="inp"
									style="width: 100%">
									<el-option label="信贷云" value="CREDIT_CLOUD"></el-option>
									<el-option label="收款云" value="COLLECTION_CLOUD"></el-option>
									<el-option label="保险云" value="INSURANCE_CLOUD"></el-option>
									<el-option label="Dow+云" value="DOW_CLOUD"></el-option>
									<el-option label="豆服会员" value="SELLER_CLOUD"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item>
								<el-select v-model="ruleForm.status" placeholder="合作状态" style="width: 100%">
									<el-option label="合作中" value="COOPERATION"></el-option>
									<el-option label="合作终止" value="COOPERATION_TERMINATION"></el-option>
								</el-select>
							</el-form-item>
							<!-- <div>到期时间：</div> -->
							<el-form-item class="timeC">
								<el-date-picker v-model="dateTime" type="daterange" range-separator="-"
									start-placeholder="生效开始时间" end-placeholder="生效结束时间"
									value-format="yyyy-MM-dd HH:mm:ss" @change="changeTime">
								</el-date-picker>
							</el-form-item>

							<div class="button">
								<el-button type="primary" @click="serach">搜索</el-button>
								<el-button @click="reset" class="reset">重置</el-button>
								<el-button type="primary" style="width: 120px" @click="openDia">新增合作机构
								</el-button>
							</div>
						</el-row>
					</el-form>
				</el-card>
			</el-col>
		</el-row>

		<!-- 详情列表 -->
		<table-page :tableData="tableData" :columns="columns" :totalSize="totalSize" v-loading="loading"
			@conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
			@page-change="handlePageChange" :detailTable="true" @update="_updateF" @goview="goviewF">
			<template v-slot:full_path>
				<el-table-column label="图片" prop="full_path" align="center">
					<template slot-scope="scope">
						<img @click="handlePictureCardPreview(scope.row.full_path)" :src="scope.row.full_path" alt=""
							style="height: 120px" />
					</template>
				</el-table-column>
			</template>
		</table-page>


		<!-- 新增和修改弹窗 -->
		<el-dialog width="700px" :close-on-click-modal="false" :title="isEdit ? '修改合作机构' : '新增合作机构'"
			:visible.sync="dialogFormVisible" direction="rtl" style="text-align: left;" class="mode">
			<el-form ref="form" :model="form" label-width="120px" class="formList" :rules="rules">
				<el-form-item label="上传Logo:" prop="fileList" class="uploa">
					<el-upload ref="ossUpload" :show-file-list="false" :auto-upload="true" class="upload-demo"
						:action="uploadUrl" :on-success="handlePreview">
						<el-image v-if="form.logoUrl" :src="fileUrl + '/' + form.logoUrl" error="添加" class="img">
							<!-- <img  class="el-upload-list__item-thumbnail img"  alt="" /> -->
							<!-- <img v-if="fileList.length!=''" class="el-upload-list__item-thumbnail img" :src="form.logoUrl" alt="" /> -->
						</el-image>
						<div v-else>
							<i class="el-icon-plus"></i>
						</div>

					</el-upload>
				</el-form-item>
				<el-form-item label="机构名称:" prop="name" class="list">
					<el-input v-model="form.name" placeholder="机构名称" class="inp"></el-input>
				</el-form-item>

				<el-form-item label="项目归类:" prop="cooperationMode" class="list">
					<el-select v-model="form.cooperationMode" placeholder="项目归类" class="inp">
						<el-option label="信贷云" value="CREDIT_CLOUD"></el-option>
						<el-option label="收款云" value="COLLECTION_CLOUD"></el-option>
						<el-option label="保险云" value="INSURANCE_CLOUD"></el-option>
						<el-option label="Dow+云" value="DOW_CLOUD"></el-option>
						<el-option label="豆服会员" value="SELLER_CLOUD"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="协议生效日期:" prop="agreementStartDate" class="list date">
					<el-date-picker class="inp" v-model="form.agreementStartDate" type="date" value-format="yyyy-MM-dd"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="协议到期日期:" prop="agreementExpireDate" class="list date">
					<el-date-picker class="inp" v-model="form.agreementExpireDate" type="date" value-format="yyyy-MM-dd"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="固定订阅费:" prop="subscribeFeeMode" class="list">
					<el-select v-model="form.subscribeFeeMode" placeholder="收费方式" class="inp">
						<el-option label="按年" value="YEAR"></el-option>
						<el-option label="按月" value="MONTH"></el-option>
						<el-option label="按次数" value="COUNT"></el-option>
						<el-option label="一次性收费" value="INDEPENDENT_PAYMENT"></el-option>
					</el-select>
					<el-input v-model="form.subscribeFee" placeholder="" class="jiage"
						style="display: inline-block; width: 80px;margin-left: 10px;"></el-input> 万元
				</el-form-item>
				<el-form-item label="takeRate:" prop="takeRateMode" class="list">
					<el-select v-model="form.takeRateMode" placeholder="收费方式" class="inp">
						<el-option label="按在贷余额" value="LOAN_BALANCE"></el-option>
						<el-option label="按放款额" value="LOAN_AMOUNT"></el-option>
						<el-option label="按收款" value="COLLECTION_AMOUNT"></el-option>
						<el-option label="按保费" value="PREMIUM"></el-option>
						<el-option label="按流量" value="FLOW"></el-option>
					</el-select>
					<el-input v-model="form.takeRate" placeholder="" class="jiage"
						style="display: inline-block; width: 80px;margin-left: 10px;"></el-input> %
				</el-form-item>

				<el-form-item label="合作状态:" prop="status" class="list">
					<el-select v-model="form.status" placeholder="合作状态" class="inp">
						<el-option label="合作中" value="COOPERATION"></el-option>
						<el-option label="合作终止" value="COOPERATION_TERMINATION"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="BD负责人:" prop="extUserId" class="list">
					<el-select v-model="form.extUserId" placeholder="负责人" class="inp">
						<el-option v-for="(item, index) in idList" :label="item.name" :value="item.userId"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="机构对接人:" prop="contactPerson" class="list">
					<el-input v-model="form.contactPerson" placeholder="" class="inp"></el-input>
				</el-form-item>
				<el-form-item label="联系方式:" prop="contactInformation" class="list">
					<el-input maxlength="11" v-model="form.contactInformation" placeholder="" class="inp"></el-input>
				</el-form-item>

				<el-form-item label="下次续费日期:" prop="renewalDate" class="list date">
					<el-date-picker class="inp" v-model="form.renewalDate" type="date" value-format="yyyy-MM-dd"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="备注:" prop="remark" class="list">
					<el-input type="textarea" v-model="form.remark" placeholder=""></el-input>
				</el-form-item>
			</el-form>
			<div class="btn" style="display: flex;justify-content: space-around;width: 320px;margin-left: 150px ">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="_createPopup('form')">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import {
	tableMixin
} from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
	account,
	balance,
	pfrepayment,
	diff
} from '../../../api/repayment';
import moment from 'moment'; //导入文件
import tianja from "@/assets/update.jpg";

import {
	getFund,
	getPage,
	fundSave,
	editSave,
	getSoure,
	jrManagement,
	updataManagement,
	increaseManagement,
	IdList
} from '../../../api/index.js'
import {
	fileSave,
	fileList,
} from '../../../api/statistics';
export default {
	mixins: [tableMixin],
	components: {
		tablePage
	},
	data() {
		return {
			isEdit: false, //编辑或修改
			dialogFormVisible: false, //编辑弹窗的显示
			form: {
				logoUrl: ""
			}, //单条数据
			loading: false,
			disabled: false,
			totalSize: 0,
			fit: 'cover',

			uploadUrl: process.env.VUE_APP_UPLOADFILE_URL,
			fileUrl: process.env.VUE_APP_IMGS_BASE_URL,
			fileList: [],
			fileListTwo: [],
			UrlGo: "",
			idList: [],
			ruleForm: {}, //查询
			dateTime: "", //到期时间
			// currentPage: 1, //当前页码
			// 列表数据

			tableData: [],
			soure: [],
			columns: [{
				label: 'Logo',
				prop: 'logoUrlTwo',
				cellEdit: 'img',
				width: 100
			},
			{
				label: '机构名称',
				prop: 'name',

			},
			{
				label: '项目归类',
				prop: 'cooperationModeTwo',

			},
			{
				label: '协议生效日期',
				prop: 'agreementStartDate',

			},
			{
				label: '协议到期日期',
				prop: 'agreementExpireDate',

			},
			{
				label: '下次续费日期',
				prop: 'renewalDate',

			},
			{
				label: '固定订阅费',
				prop: `price`,

			},
			{
				label: 'TakeRate',
				prop: 'takeRateTwo',
				width: 120
			},
			{
				label: '合作状态',
				prop: 'statusTwo',

			},

			{
				label: '负责人',
				prop: 'chargePersonTwo',

			},

			{
				label: this.$t('loan_detail_cjsj'),
				prop: 'createTime',
				width: 180
			},

			{
				label: this.$t('loan_search_cz'),
				prop: '',
				// width: 160,
				operates: [{
					event: 'update',
					text: this.$t('loan_detail_xg'),
					type: 'primary'
				},
				{
					event: 'goview',
					text: this.$t('common_see'),
					type: 'primary'
				},
				],
				fixed: 'right'
			}
			],
			// 表单校验规则
			rules: {
				name: [{
					required: true,
					message: '请选择机构名称',
					trigger: 'blur'
				}],

				cooperationMode: [{
					required: true,
					message: '请选择项目归类',
					trigger: 'blur'
				}],

				agreementStartDate: [{
					required: true,
					message: '请选择协议生效时间',
					trigger: 'blur'
				}],
				agreementExpireDate: [{
					required: true,
					message: '请选择协议到期时间',
					trigger: 'blur'
				}],
				status: [{
					required: true,
					message: '请选择合作状态',
					trigger: 'blur'
				}],
				extUserId: [{
					required: true,
					message: '请选择BD负责人',
					trigger: 'blur'
				}],
				contactPerson: [{
					required: true,
					message: '请输入机构对接人',
					trigger: 'blur'
				}],
				renewalDate: [{
					required: true,
					message: '请选择下次续费日期',
					trigger: 'blur'
				}],
			}

		}
	},
	created() {

	},
	mounted() {


	},
	methods: {
		handlePictureCardPreview(file) {
			typeof file === 'string' ? (this.dialogImageUrl = file) : (this.dialogImageUrl = file.url);
			this.dialogVisible = true;
		},
		//todo: 添加图片预览时，点击可以下载。
		handleDownload(file) {
			console.log(file);
		},
		//上传Logo
		handlePreview(res, fileList) {
			this.fileList.push(res.data);
			this.form.logoUrl = res.data.filePath
			console.log(res.data.fullFilePath);


		},
		// 获取图片列表
		_fileList() {
			fileList({
				fileType: 'INSTITUTIONS_LOGO',
				resourceId: this.$route.query.row.id
			}).then((res) => {
				if (res.data && res.data.length > 0) { }
			}).catch((err) => {
				this.$message.error()
			});
		},

		handleRemove(file) {
			this.$refs.ossUpload.clearFiles();
		},


		// 选择到期时间
		changeTime(value) { },
		//页面第一次加载的时候调用Create
		_getList() {
			IdList({
				type: "FEI_SHU"
			}).then((ree) => {
				this.idList = ree.data
				jrManagement({
					current: this.pageData,
					name: this.ruleForm.name, //机构名称
					chargePerson: this.ruleForm.chargePerson, //负责人
					cooperationMode: this.ruleForm.cooperationMode, //项目归类
					status: this.ruleForm.status, //合作状态
					agreementStartDateBegin: this.dateTime[0],
					agreementStartDateEnd: this.dateTime[1]

				}).then(res => {
					this.tableData = res.data.records;
					this.totalSize = res.data.total;
					this.tableData.forEach((item, index) => {
						item.agreementStartDate = item.agreementStartDate.substring(0, 10)
						item.agreementExpireDate = item.agreementExpireDate.substring(0, 10)
						item.renewalDate = item.renewalDate.substring(0, 10)
						if (item.cooperationMode == "COLLECTION_CLOUD") {
							this.tableData[index] = {
								...item,
								cooperationModeTwo: "收款云"
							}
						} else if (item.cooperationMode == "CREDIT_CLOUD") {
							this.tableData[index] = {
								...item,
								cooperationModeTwo: "信贷云"
							}
						} else if (item.cooperationMode == "INSURANCE_CLOUD") {
							this.tableData[index] = {
								...item,
								cooperationModeTwo: "保险云"
							}
						} else if (item.cooperationMode == "DOW_CLOUD") {
							this.tableData[index] = {
								...item,
								cooperationModeTwo: "Dow+云"
							}
						} else if (item.cooperationMode == "SELLER_CLOUD") {
							this.tableData[index] = {
								...item,
								cooperationModeTwo: "豆服会员"
							}
						}
					});

					this.tableData.forEach((item, index) => {
						if (item.subscribeFeeMode == "YEAR") {
							this.tableData[index] = {
								...item,
								price: item.subscribeFee + "万/年"
							}
						} else if (item.subscribeFeeMode == "MONTH") {
							this.tableData[index] = {
								...item,
								price: item.subscribeFee + "万/月"
							}
						} else if (item.subscribeFeeMode == "COUNT") {
							this.tableData[index] = {
								...item,
								price: item.subscribeFee + "万/次"
							}
						} else if (item.subscribeFeeMode == "INDEPENDENT_PAYMENT") {
							this.tableData[index] = {
								...item,
								price: item.subscribeFee + "万/一次性收费"
							}
						}
						if (item.subscribeFee == "" || item.subscribeFee == null) {
							this.tableData[index] = {
								...item,
								price: ""
							}
						}
					})

					this.tableData.forEach((item, index) => {
						if (item.takeRate && item.takeRateMode == "LOAN_BALANCE") {
							this.tableData[index] = {
								...item,
								takeRateTwo: "在贷余额*" + item.takeRate + "%"
							}
						} else if (item.takeRate && item.takeRateMode == "LOAN_AMOUNT") {
							this.tableData[index] = {
								...item,
								takeRateTwo: "放款额*" + item.takeRate + "%"
							}
						} else if (item.takeRate && item.takeRateMode == "COLLECTION_AMOUNT") {
							this.tableData[index] = {
								...item,
								takeRateTwo: "收款额*" + item.takeRate + "%"
							}
						} else if (item.takeRate && item.takeRateMode == "PREMIUM") {
							this.tableData[index] = {
								...item,
								takeRateTwo: "保费*" + item.takeRate + "%"
							}
						} else if (item.takeRate && item.takeRateMode == "FLOW") {
							this.tableData[index] = {
								...item,
								takeRateTwo: "流量*" + item.takeRate + "%"
							}
						}

					})

					this.tableData.forEach((item, index) => {

						if (item.status == "COOPERATION") {
							this.tableData[index] = {
								...item,
								statusTwo: "合作中"
							}
						} else if (item.status == "COOPERATION_TERMINATION") {
							this.tableData[index] = {
								...item,
								statusTwo: "合作终止"
							}
						}
					})

					this.tableData.forEach((item, index) => {
						if (item.logoUrl && item.logoUrl.length > 0) {
							this.tableData[index] = {
								...item,
								logoUrlTwo: this.fileUrl +
									item.logoUrl
							}
						}
					})

					this.idList.forEach((item, index) => {
						this.tableData.forEach((it, i) => {
							if (it.extUserId == item.userId) {
								this.tableData[i] = {
									...it,
									chargePersonTwo: item.name
								}

							}
						})
					})
				}).catch((err) => {
					this.$message.error()
				})

			}).catch((err) => {
				this.$message.error()
			})

		},
		handlePageChange(page) {
			this.pageData = page
			this._getList()
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

		},

		// 编辑确认
		_createPopup(form) {
			let that = this
			this.$refs[form].validate((valid) => {
				if (valid) {
					this.dialogFormVisible = false;
					// 修改
					if (this.isEdit) {
						this.loading = true
						updataManagement({
							id: this.form.id,
							current: this.pageData,
							name: this.form.name, //机构名称
							extUserId: this.form.extUserId, //负责人
							cooperationMode: this.form.cooperationMode, //项目归类
							agreementStartDate: this.form.agreementStartDate + " 00:00:00", //协议生效时间
							agreementExpireDate: this.form.agreementExpireDate + " 00:00:00", //协议到期时间
							renewalDate: this.form.renewalDate + " 00:00:00", //下次续费日期
							subscribeFeeMode: this.form.subscribeFeeMode, //固定订阅费
							subscribeFee: this.form.subscribeFee, //固定订阅费具体数额
							takeRateMode: this.form.takeRateMode, //take
							takeRate: this.form.takeRate,
							status: this.form.status,
							contactPerson: this.form.contactPerson, //联系人
							contactInformation: this.form.contactInformation, //联系方式
							remark: this.form.remark, //备注
							resourceId: this.form.resourceId, //绑定id  资方id/保司code
							extUserType: "FEI_SHU",
						}).then(res => {
							this._getList()
							if (res.success) {
								let submitObj = {
									fileType: 'INSTITUTIONS_LOGO',
									fileUrl: this.fileList[0].filePath,
									resourceId: this.form.id,
									fileName: this.fileList[0].fileName
								}
								fileSave(submitObj).then((res) => {
									this.fileList = []
									this._getList()
								})
							} else {
								this._getList()
							}

							this.loading = false
						}).catch(ree => {
							this.loading = false
						})
					} else {
						this.loading = true
						// 新增
						increaseManagement({
							current: this.pageData,
							resourceId: this.form.resourceId, //绑定id  资方id/保司code
							name: this.form.name, //机构名称
							extUserId: this.form.extUserId, //负责人
							cooperationMode: this.form.cooperationMode, //项目归类
							agreementStartDate: this.form.agreementStartDate + " 00:00:00", //协议生效时间
							agreementExpireDate: this.form.agreementExpireDate + " 00:00:00", //协议到期时间
							renewalDate: this.form.renewalDate + " 00:00:00", //下次续费日期
							subscribeFeeMode: this.form.subscribeFeeMode, //固定订阅费
							subscribeFee: this.form.subscribeFee, //固定订阅费具体数额
							takeRateMode: this.form.takeRateMode, //take
							takeRate: this.form.takeRate,
							status: this.form.status,
							contactPerson: this.form.contactPerson, //联系人
							contactInformation: this.form.contactInformation, //联系方式
							remark: this.form.remark, //备注
							extUserType: "FEI_SHU"
						}).then(res => {

							let submitObj = {
								fileType: 'INSTITUTIONS_LOGO',
								fileUrl: this.fileList[0].filePath,
								resourceId: res.data,
								fileName: this.fileList[0].fileName
							}
							fileSave(submitObj).then((res) => {
								this.fileList = []
							})
							this._getList()
							this.loading = false
						}).catch(err => {
							this.loading = false
						})
					}
				} else {

					return false;
				}
			});
			this._getList();
		},

		// 查看详情
		goviewF(row) {
			this.$router.push({
				path: '/organzationDetail',
				query: {
					//携带参数
					row: row.id
				}
			});

		},

		//重置
		reset() {
			this.ruleForm = {
				name: "",
				chargePerson: "",
				cooperationMode: "",
				status: "",
			},
				this.dateTime = "",

				this._getList()
		},

		// 点击搜索
		serach() {

			this._getList()
		}

	}
}
</script>

<style lang='less' scoped>
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
		position: absolute;
		right: 60px;

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

	width: 220% !important;
}

/deep/.el-dialog__headerbtn {
	margin-top: -10px;
}

.formList {
	width: 480px !important;
	margin: -10px auto 0;

}

.mode {
	text-align: center;

	/deep/.el-form-item {
		margin-bottom: 14px;
	}
}

.listt {
	/deep/.el-input__inner {
		width: 160px;

	}
}

.list {

	/deep/.jiage {
		width: 20px;
	}
}

.date {
	/deep/.el-input__inner {

		width: 220px;
	}
}

.serar {

	/deep/.el-form-item__content {
		width: 140px;
	}

	.el-row {
		padding: 0;
	}

	/deep/.el-form-item {
		width: 160px;
	}
}


/deep/.el-dialog__body {}

/deep/.el-form-item {
	display: block;
}

.uploa {
	/deep/ .el-upload--picture-card {
		width: 60px;
		height: 60px;
		line-height: 64px;
	}

	/deep/.el-upload-list__item {
		width: 60px;
		height: 60px;
		margin-bottom: -5px;
	}

	.img {
		width: 60px;
		height: 60px;

	}

	/deep/.upload-demo,
	.el-upload,
	/deep/.el-upload--text {
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
