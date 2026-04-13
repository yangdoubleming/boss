<template>
	<div>
		<div style="display:flex; align-items: center;padding:18px">
			<div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
				<img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
				/授信管理 /
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
						申请单号
					</template>
					{{ formData.applicationCode }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						授信单号
					</template>
					{{ formData.creditCode }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						授信金额
					</template>
					{{ formData.creditAmount }}万
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						利率
					</template>
					{{ formData.interestRate }}%
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						授信状态
					</template>
					{{ formData.creditStatus }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						合同编号
					</template>
					{{ formData.contractNumber }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						授信通过时间
					</template>
					{{ formData.creditApprovalTime }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						授信开始时间
					</template>
					{{ formData.creditStartDate }}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						授信结束时间
					</template>
					{{ formData.creditExpireDate }}
				</el-descriptions-item>
			</el-descriptions>
		</el-card>

		<div class="block">
			<div class="line"></div>
			<div>历史记录</div>
		</div>
		<!-- 收款记录详情列表 -->
		<table-page :tableData="historyData" :columns="historyColumn" :totalSize="totalSize"
			@conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
			@page-change="handlePageChange" :detailTable="true" :showPagination="false" />
	</div>
</template>

<script>
import {
	tableMixin
} from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { creditHistoryList } from '../../../api/index';
export default {
	name: 'credit-detail',
	mixins: [tableMixin],
	components: {
		tablePage
	},
	data() {
		return {
			dialogFormVisible: false, //弹窗

			formData: {
				applicationCode: '',
			},
			//基本信息列表
			tableData: [],

			historyData: [],
			historyColumn: [
				{
					label: this.$t('loan_sqdh'),
					prop: 'applicationCode'
				},
				{
					label: this.$t('loan_detail_sxdh'),
					prop: 'creditCode'
				},
				{
					label: this.$t('loan_detail_sxzt'),
					prop: 'creditStatus'
				},
				{
					label: '授信金额/元',
					prop: 'creditAmount'
				},
				{
					label: '修改时间',
					prop: 'createTime'
				},
				{
					label: '修改人',
					prop: 'modifier',

				}
			],
		}
	},

	created() {
		this.formData = this.$route.query.data;
		this._getCreditHistoryList();
	},
	methods: {

		handlePageChange(page) {
			this.pageData = page
			this._getList()
		},
		_getList() {

		},
		_getCreditHistoryList() {
			creditHistoryList({
				creditId: this.$route.query.data.id
			}).then(res => {
				res.data.forEach(x => {
					switch (x.creditStatus) {
						case 'ACTIVE':
							x.creditStatus = '生效中';
							break;
						case 'CLOSED':
							x.creditStatus = '已失效';
							break;
						case 'CREATED':
							x.creditStatus = '已创建';
							break;
					}
				});
				this.historyData = res.data;
				console.log(this.historyData)
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
