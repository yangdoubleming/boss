<template>
	<div>
		<div style="display:flex; align-items: center;padding:18px">
			<div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
				<img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />保险后台
				/
			</div>

			<span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
		</div>
		<div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px">
			<el-button style="float:right" type="primary" icon="el-icon-document-add" @click="openDia">新增</el-button>
		</div>
		<table-page :tableData="tableData" :tableOperate="tableOperate" :filterOptions="filterOptions"
			:columns="columns" :totalSize="totalSize" @quote="toDetail" :detailTable="true"
			@conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
			@page-change="handlePageChange" @delete="_delete" @update="_updateF" />
		<el-dialog width="35%" :title="isEdit ? '编辑' : '新增'" :visible.sync="dialogFormVisible" direction="rtl" :close-on-click-modal="false">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="标题">
					<el-input v-model="form.popupTitle"></el-input>
				</el-form-item>
				<el-form-item label="内容">
					<el-input v-model="form.popupBody" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="时间">
					<el-date-picker @change="changeDate" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.dates"
						type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="code">
					<el-select v-model="form.popupCode" :placeholder="$t('loan_detail_choose')">
						<el-option label="商户中心首页" value="bussinessCenter"></el-option>
						<el-option label="浦发支用" value="pufaLines"></el-option>
						<el-option label="浦发首页" value="pufaHome"></el-option>
						<el-option label="陆安支用" value="luanWithdraw"></el-option>
						<el-option label="汇丰美元首页" value="hsbcusHome"></el-option>
						<el-option label="豆方-建行" value="dfJhHome"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="_createPopup">{{ isEdit ? '提交编辑' : '立即创建' }}</el-button>

					<el-button @click="dialogFormVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import {
	tableMixin
} from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
	popupList,
	deleteBanner,
	addOrUpdatePopup,
	deletePopup
} from '../../../api/statistics';
import addChannel from '../../common/channel/add-channel.vue';
export default {
	name: 'popup-admin',
	mixins: [tableMixin],
	components: {
		tablePage,
		addChannel
	},
	data() {
		return {
			form: {
				popupTitle: '',
				popupBody: '',
				popupStartTime: '',
				popupEndTime: '',
				popupCode: '',
				createBossName: '',
				dates: []
			},
			isEdit: false,
			dialogFormVisible: false,
			tableOperate: [],
			detailData: {},
			tableData: [],
			filterOptions: [{
				type: 'input',
				value: '',
				placeholder: '标题',
				filterable: true,
				options: []
			},
			{
				type: 'input',
				value: '',
				placeholder: '内容',
				filterable: true,
				options: []
			},
			{
				type: 'datetimerange',
				value: '',
				filterable: true,
				options: []
			},
			{
				type: 'input',
				value: '',
				placeholder: 'code',
				filterable: true,
				options: []
			}
			],
			columns: [{
				label: '标题',
				prop: 'popupTitle'
			},
			{
				label: '内容',
				prop: 'popupBody',
				width: 580
			},

			{
				label: '开始时间',
				prop: 'popupStartTime'
			},

			{
				label: '结束时间',
				prop: 'popupEndTime'
			},
			{
				label: 'code',
				prop: 'popupCode'
			},

			{
				label: '创建人',
				prop: 'createBossName'
			},
			{
				label: '创建时间    ',
				prop: 'createTime'
			},

			{
				label: this.$t('loan_search_cz'),
				prop: '',
				width: '150',
				operates: [{
					event: 'update',
					text: this.$t('loan_detail_xg'),
					type: 'primary'
				},
				{
					event: 'delete',
					text: this.$t('loan_detail_delete'),
					type: 'primary'
				}
				],
				fixed: 'right'
			}
			]
		};
	},
	activated() { },
	created() { },
	methods: {
		changeDate(value) {
			console.log(value);
		},
		openDia() {
			(this.dialogFormVisible = true), (this.isEdit = false);
			Object.keys(this.form).forEach((key) => {
				this.form[key] = '';
			});
			this.form.dates = [];
		},
		_updateF(row) {
			this.dialogFormVisible = true;
			this.isEdit = true;
			this.form = {
				...row
			};
			// this.form.dates = [this.form.popupStartTime, this.form.popupEndTime];
			this.$set(this.form, 'dates', [this.form.popupStartTime, this.form.popupEndTime])
		},
		_delete(row) {
			this.$confirm('此操作将永久删除该弹框, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				deletePopup(row.id).then((res) => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this._getList();
				});
			});
		},
		_createPopup() {
			this.form.popupStartTime = this.form.dates[0];
			this.form.popupEndTime = this.form.dates[1];
			this.form.createBossName = localStorage.getItem('userName');
			addOrUpdatePopup(this.form).then((res) => {
				this._getList();
				this.dialogFormVisible = false;
				this.$message.success('操作成功！');
				Object.keys(this.form).forEach((key) => {
					this.form[key] = '';
				});
				this.form.dates = [];
			});
		},

		_approve(id, type) {
			if (type) {
				approve(id, localStorage.getItem('userName')).then((res) => {
					this.$message.success('操作成功！');
					this._getList();
					this.dialogFormVisible = false;
				});
			} else {
				returnApprove(id, localStorage.getItem('userName')).then((res) => {
					this.$message.success('操作成功！');
					this._getList();
					this.dialogFormVisible = false;
				});
			}
		},
		pushForm(form, type) {
			// type  1保存 2提交

			if (type == 1) {
				createDetail(form).then((res) => {
					this.$message.success('操作成功！');
					this._getList();
					this.dialogFormVisible = false;
				});
			} else {
				createOrEditDetail(form, form.channelCode ? 'PATCH' : 'PUT').then((res) => {
					this.$message.success('操作成功！');
					this._getList();
					this.dialogFormVisible = false;
				});
			}
		},
		_getList() {
			popupList({
				bannerList: this.filterOptions[0].value,
				popupBody: this.filterOptions[1].value,
				popupStartTime: this.filterOptions[2].value ? this.filterOptions[2].value[0] : '',
				popupEndTime: this.filterOptions[2].value ? this.filterOptions[2].value[1] : '',
				popupCode: this.filterOptions[3].value,
				page: this.currentPage,
				rows: 10
			}).then((res) => {
				res.data.records.forEach((item) => {
					item.bannelType = item.bannelType == 1 ? 'h5' : 'pc';
				});
				this.tableData = res.data.records;
				this.totalSize = res.data.total;
			});
		},
		toDetail(val) {
			this.loading = true;
			this.dialogFormVisible = true;
			getMerchantDetail(val.id).then((res) => {
				this.loading = false;
				res.data.dates = [res.data.startTime || '', res.data.endTime || ''];
				this.$nextTick(() => {
					this.detailData = res.data;
				})
			});
		}
	}
};
</script>

<style lang='less' scoped>
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
	width: 360px;
	height: 178px;
	display: block;
}

.clearfix {
	font-size: 18px;
	// padding-left: 18px;
	padding-bottom: 20px;
}

/deep/.el-form-item .form-margin .el-form-item--small .form-margin {
	margin-right: 30px !important;
}

.el-row {
	margin-bottom: 20px;
}

.grid-content {
	display: flex;
	/* align-items: center; */

	height: 100px;
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

.grid-num {
	font-size: 16px;
}

.grid-num2 {
	font-size: 16px;
	padding-top: 12px;
}

.grid-con-icon {
	font-size: 50px;
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}

.grid-con-1 .grid-con-icon {
	background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
	color: rgba(0, 0, 0, 0.65);
}

.grid-con-2 .grid-con-icon {
	background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
	color: rgba(0, 0, 0, 0.65);
}

.grid-con-3 .grid-con-icon {
	background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
	color: rgb(242, 94, 67);
}

.user-info {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}

.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: #999;
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: #222;
}

.user-info-list {
	font-size: 14px;
	color: #999;
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}

.mgb20 {
	margin-bottom: 20px;
}

.todo-item {
	font-size: 14px;
}

.todo-item-del {
	text-decoration: line-through;
	color: #999;
}
</style>
