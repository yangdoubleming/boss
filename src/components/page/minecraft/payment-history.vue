<template>
	<div>
		<div style="display: flex; align-items: center; padding: 18px">
			<div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
				<img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
					alt />豆沙包 /
			</div>
			<span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
		</div>

		<table-page @onExport="onExport" :tableData="tableData" :tableOperate="tableOperate"
			:filterOptions="filterOptions" :columns="columns" :totalSize="totalSize"
			@conditional-query="handleColumnsFilter" :current="currentPage" @conditional-reset="handleConditionalReset"
			@page-change="handlePageChange" :exportBtn="true">
			<div style="font-size: 14px; color: #666; margin-bottom: 10px; text-align: right">
				<span style="margin-right: 40px">还本金额：{{ pageData.paymentPrincipal || 0 }}{{ $t('common_yuan2') }}</span>
				<span style="margin-right: 40px">还息金额：{{ pageData.paymentInterest || 0 }}{{ $t('common_yuan2') }}</span>
				<span style="margin-right: 10px">收入：{{ pageData.income || 0 }}{{ $t('common_yuan2') }}</span>
			</div>
		</table-page>
	</div>
</template>

<script>
import {
	tableMixin
} from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
	paymentHistory,
	recordList,
	lenderList
} from '../../../api/index';
import xtable from '../../common/Xtable.vue';
export default {
	name: 'payment-history',
	mixins: [tableMixin],
	components: {
		tablePage,
		xtable
	},
	data() {
		return {
			tableOperate: [],
			tableData: [],
			pageData: {},
			filterOptions: [{
				type: 'select',
				value: '',
				placeholder: this.$t('home_zjffb'),
				filterable: true,
				options: []
			},
			{
				type: 'datetimerange',
				value: ['', ''],
				placeholderArr: ['创建开始时间 ', '创建结束时间'],
				placeholder: '时间',
				filterable: true,
				options: []
			},
			{
				type: 'datetimerange',
				value: ['', ''],
				placeholderArr: ['交易开始时间 ', '交易结束时间'],
				placeholder: '时间',
				filterable: true,
				options: []
			}
			],
			columns: [{
				label: this.$t('loan_sqdh'),
				prop: 'applicationCode',
				width: 230
			},

			{
				label: this.$t('loan_detail_sxdh'),
				prop: 'creditCode',
				width: 200
			},
			{
				label: this.$t('loan_search_jkrxm'),
				prop: 'bname',
				width: '220'
			},

			{
				label: '当前还款期数',
				prop: 'currentTerm',
				width: 140
			},

			{
				label: '交易金额/元',
				prop: 'dealAmount',
				width: 120
			},
			{
				label: '收入/元',
				prop: 'income',
				width: 120
			},
			{
				label: this.$t('loan_detail_ll'),
				prop: 'apr',
				width: 120
			},
			{
				label: '交易日期',
				prop: 'dealDate',
				width: 120
			},

			{
				label: '借据号',
				prop: 'duebillNo',
				width: 165
			},
			{
				label: '贷款单号',
				prop: 'loanCode',
				width: 220
			},
			{
				label: '还息金额',
				prop: 'paymentInterest',
				width: 130
			},

			{
				label: '还逾期利息金额',
				prop: 'paymentOverdueInterest',
				width: 150
			},
			{
				label: '还逾期本金金额',
				prop: 'paymentOverduePrincipal',
				width: 150
			},
			{
				label: '还本金额',
				prop: 'paymentPrincipal',
				width: 140
			},
			{
				label: '流水号',
				prop: 'serialNo',
				width: 180
			},
			{
				label: '剩余待还本金金额',
				prop: 'surplusPrincipal',
				width: 160
			},

			{
				label: this.$t('loan_detail_cjsj'),
				prop: 'createTime',
				width: '200'
			},
			{
				label: '修改时间',
				prop: 'updateTime',
				width: '200'
			}

				// {
				//     label: this.$t('loan_search_cz'),
				//     prop: '',
				//     width: '180',
				//     operates: [
				//         {
				//             event: 'quote',
				//             text:this.$t('loan_detail_fkjl'),
				//             type: 'primary'
				//         }
				//     ],
				//     fixed: 'right'
				// }
			],
			baseUrl: process.env.VUE_APP_BASE_URL
		};
	},
	created() {
		lenderList().then((res) => {
			res.data.forEach((item) => {
				item.label = item.lenderName;
				item.value = item.id;
			});
			this.filterOptions[0].options = res.data;
		});
	},
	methods: {
		onExport() {
			let that = this;

			const axios = require('axios');
			axios({
				methods: 'get',
				responseType: 'blob',
				url: this.filterOptions[1].value.length ?
					`${this.baseUrl}/lending/repayment/record/export?createTimeBegin=${this.filterOptions[1].value[0]}&createTimeEnd=${this.filterOptions[1].value[1]}&lenderId=${this.filterOptions[0].value}&dealTimeBegin=${this.filterOptions[2].value[0]}&dealTimeEnd=${this.filterOptions[2].value[1]}` :
					`${this.baseUrl}/lending/repayment/record/export`,
				headers: {
					token: localStorage.getItem('token')
				}
			}).then(function (res) {
				var blob = new Blob([res.data], {
					type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
				});
				var downloadElement = document.createElement('a');
				var href = window.URL.createObjectURL(blob);
				downloadElement.href = href;
				downloadElement.download = `report.xlsx`;
				document.body.appendChild(downloadElement);
				downloadElement.click();
				document.body.removeChild(downloadElement);
				window.URL.revokeObjectURL(href);
				that.isExporting = false;
			});
		},

		_getList() {
			let starTime = this.filterOptions[1].value.length ? this.filterOptions[1].value[0] : '';
			let endTime = this.filterOptions[1].value.length ? this.filterOptions[1].value[1] : '';

			let dealTimeBegin = this.filterOptions[2].value.length ? this.filterOptions[2].value[0] : '';
			let dealTimeEnd = this.filterOptions[2].value.length ? this.filterOptions[2].value[1] : '';
			paymentHistory({
				current: this.currentPage,
				createTimeBegin: starTime,
				createTimeEnd: endTime,
				dealTimeBegin,
				dealTimeEnd,
				lenderId: this.filterOptions[0].value,
				applicationOrderType: 'JOINT_VENTURE'
			}).then((res) => {
				this.pageData = res.data
				this.tableData = res.data.records;
				this.totalSize = res.data.total;
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
