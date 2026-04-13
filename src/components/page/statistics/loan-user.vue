<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px;justify-content: space-between;">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /<span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
            </div>

            <!-- <el-button type="primary" size="small" @click="goSetLenderPriority">设置资方优先级</el-button> -->
        </div>
        <table-page :tableData="tableData" :filterOptions="filterOptions" :showFilterRadio="false" :limitAllocation="true"
            :tableOperate="tableOperate" :columns="columns" :totalSize="totalSize" @conditional-limit="handleLimit"
            @conditional-query="handleColumnsFilter" :current='currentPage' @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange" :detailTable="true" @getInfo="_getInfo" @goMultiple="_goMultiple"
            @eduManage="_eduManage" @dbEduManage="_dbEduManage" />

        <el-dialog
          title="上传文件"
          :visible.sync="showUploadDialog"
          width="500px"
          @close="resetUpload"
        >
          <div style="margin-bottom: 16px; text-align: center;">请上传xls文件</div>
          <div style="display: flex; justify-content: center;">
            <el-upload
              class="upload-demo"
              drag
              :action="uploadMorePdf" :headers="uploadHeaders"
              :before-upload="beforeUpload"
              :file-list="fileListOffList" :limit="1"
              :on-change="handleFileChange"
              accept=".xls,.xlsx"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text"><span style="color:#ff4d4f">+ 点击上传</span></div>
            </el-upload>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showUploadDialog = false">取消</el-button>
            <el-button type="primary" :disabled="!uploadFile" @click="submitUpload">确认</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getLoanUserListNew } from '../../../api/index'
export default {
    name: 'loan-user',
    components: {
        tablePage
    },
    data() {
        return {
            fileListOffList: [],
            uploadHeaders: { token: localStorage.getItem('token') },
            uploadMorePdf:process.env.VUE_APP_MORE,
            currentPage: 1,//页码
            totalSize: 0,//数据总条数
            tableData: [],
            chooseRow: {},

            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_serch_phone'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '注册用户名',
                    filterable: true,
                    options: []
                },
                {
                    type: 'daterange',
                    value: '',
                    placeholder: '创建时间',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: this.$t('loan_detail_yhid'),
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '客户号',
                    filterable: true,
                    options: []
                },
            ],
            currentPage: 1,
            totalSize: 10,
            tableData: [

            ],

            value: '',
            columns: [
                {
                    label: 'wId',
                    prop: 'wid'
                },
                {
                    label: '客户号',
                    prop: 'customerNo'
                },
                {
                    label: '注册日期',
                    prop: 'registerDate'
                },
                {
                    label: '用户ID',
                    prop: 'userId'
                },
                {
                    label: this.$t('loan_search_zhucephone'),
                    prop: 'account'
                },
                {
                    label: '注册用户名',
                    prop: 'userName'
                },
                {
                    label: '授信金额/万',
                    prop: 'creditAmountShow'
                },
                {
                    label: '资方可用金额/万',
                    prop: 'lenderAvailableQuotaShow'
                },
                {
                    label: '在贷金额/万',
                    prop: 'loanBalanceShow'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '100',
                    operates: [
                        {
                            event: 'goMultiple',
                            text: '多资方申请查询',
                            type: 'primary',
                            popover: true
                        },
                        {
                            event: 'getInfo',
                            text: '用户详情',
                            type: 'primary',
                            popover: true
                        },
                        {
                            event: 'eduManage',
                            text: '额度管理',
                            type: 'primary',
                            popover: true
                        },
                    ],
                    fixed: 'right'
                }
            ],
            showUploadDialog: false,
            uploadFile: null,
        };
    },
    created() {
        if (this.$route.query.isToday) {
            this.filterOptions[2].value = []
            this.filterOptions[2].value[0] = this.getCurentTime(false)
            this.filterOptions[2].value[1] = this.getCurentTime(false)

        }
        this._getList()
    },
    activated() {

    },
    methods: {
        handleLimit(){
          this.showUploadDialog = true;
        },
        beforeUpload(file) {
          const isXls = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          if (!isXls) {
            this.$message.error('只能上传 xls/xlsx 文件');
          }
          return isXls;
        },
        handleFileChange(file) {
          this.uploadFile = file.raw;
        },
        submitUpload() {
             const axios = require('axios');
            // 这里写上传逻辑，比如用 FormData 传给后端
            const formData = new FormData();
            formData.append('file', this.uploadFile);
            const baseUrl = process.env.VUE_APP_BASE_URL;
            axios.post(
              baseUrl + '/lending/customer/importXlsx',
              formData,
              { headers: this.uploadHeaders }
            )
            .then(res => {
              // 假设后端返回格式为 { code: 200, ... }
              if (res.data && res.data.code === 200) {
                this.$message.success('上传成功！');
                this.showUploadDialog = false;
                this.uploadFile = null;
              } else {
                this.$message.error(res.data && res.data.msg ? res.data.msg : '上传失败，请重试！');
              }
            })
            .catch(err => {
              this.$message.error('上传失败，请检查网络或文件格式！');
            });
        },
        resetUpload() {
          this.uploadFile = null;
        },
        // 设置资方优先级
        goSetLenderPriority(row) {
            this.$router.push({
                path: '/setLenderPriority',
                query: {
                    userId: row.userId,
                    account: row.account,
                }
            });
        },
        // 额度管理
        _eduManage(row) {
            this.$router.push({
                path: '/edu-manage',
                query: {
                    customerNo: row.customerNo,
                    wId:row.wid,
                    userId: row.userId,
                }
            });
        },
        //豆呗额度管理
        _dbEduManage(row){
            this.$router.push({
                path: '/edu-db-manage',
                query: {
                    customerNo: row.customerNo,
                    wId:row.wid,
                    userId: row.userId,
                }
            });
        },
        _dbEduManage(row) {
            this.$router.push({
                path: '/edu-db-manage',
                query: {
                    customerNo: row.customerNo,
                    wId: row.wid,
                    userId: row.userId,
                }
            });
        },
        _goMultiple(val) {
            this.$router.push({
                path: '/multiple-list',
                query: {
                    account: val.account,
                    userId: val.userId,
                }
            });
        },
        getCurentTime(isTime = true) {
            var now = new Date();
            var clock = "";
            var year = now.getFullYear();       // 年
            clock += year + "-";
            var month = now.getMonth() + 1;     // 月
            if (month < 10) {
                clock += "0";
            }
            clock += month + "-";
            var day = now.getDate();            // 日
            if (day < 10) {
                clock += "0";
            }
            if (isTime == true) {
                clock += day + " ";
                var hh = now.getHours();            // 时
                if (hh < 10) {
                    clock += "0";
                }

                clock += hh + ":";
                var mm = now.getMinutes();     // 分
                if (mm < 10) {
                    clock += '0';
                }
                clock += mm + ":";
                var ss = now.getSeconds();     // 秒
                if (ss < 10) {
                    clock += '0';
                }
                clock += ss;
            }
            if (isTime == false) {
                clock += day;
            }
            return clock;
        },
        _getInfo(row) {
            this.$router.push({
                path: '/loanUser-detail',
                query: {
                    userId: row.userId,
                    account: row.account,
                }
            })
        },
        _getList() {
            let starTime = this.filterOptions[2].value.length ? this.filterOptions[2].value[0] + ' 00:00:00' : '';
            let endTime = this.filterOptions[2].value.length ? this.filterOptions[2].value[1] + ' 23:59:59' : '';
            getLoanUserListNew({
                userId: this.filterOptions[3].value,
                account: this.filterOptions[0].value,
                realName: this.filterOptions[1].value,
                customerNo: this.filterOptions[4].value,
                userStartDate: starTime,
                userEndDate: endTime,
                createTimeStart: null,
                createTimeEnd: null,
                current: this.currentPage,
                size: 10,
            }).then((res) => {

                res.data.records.forEach(item => {
                    item.applicationType = item.applicationType == 'COMPANY' ? '公司' : "个人"
                    item.bcardId = item.bcardId ? item.bcardId.replace(/^(.{6})(?:\d+)(.{4})$/, "\$1****\$2") : ''
                    item.tel = item.tel ? item.tel.substring(0, 3) + "****" + item.tel.substring(7) : ''
                    item.creditAmountShow = item.creditAmount && item.creditAmount.amount ? item.creditAmount.currency == 'CNY' ? `￥${Number(item.creditAmount.amount) / 10000}` : `$${Number(item.creditAmount.amount) / 10000}` : ''
                    item.lenderAvailableQuotaShow = item.lenderAvailableQuota && item.lenderAvailableQuota.amount ? item.lenderAvailableQuota.currency == 'CNY' ? `￥${Number(item.lenderAvailableQuota.amount) / 10000}` : `$${Number(item.lenderAvailableQuota.amount) / 10000}` : ''
                    item.loanBalanceShow = item.loanBalance && item.loanBalance.amount ? item.loanBalance.currency == 'CNY' ? `￥${Number(item.loanBalance.amount) / 10000}` : `$${Number(item.loanBalance.amount) / 10000}` : ''
                })
                this.tableData = res.data.records || [];
                this.totalSize = res.data.total || 0;
            });
        },
        handleConditionalQuery() {

            this._getListFirstPage()
        },
        //重置
        handleConditionalReset() {

            this.filterOptions.forEach(item => {
                item.value = ''
            })
            this._getListFirstPage()
        },
        //查询
        handleColumnsFilter(val) {
            // this.columns.forEach(item => {
            //     if (item.label === Object.keys(val)[0]) {
            //         item.filtersVal = Object.values(val)[0]
            //     }
            // })
            this.currentPage = 1

            this._getList()
        },
        handlePageChange(page) {

            this.currentPage = page
            this._getList()
        },
        //     formatJson(filterVal, jsonData) {
        //       return jsonData.map(v => filterVal.map(j => {
        //         return v[j]
        //       }))
        //     },
        _getListFirstPage() {
            this.currentPage = 1

            this._getList()
        }


    }
};
</script>

<style>
.text {
    width: 280px;
    display: block;
    padding-left: 15px;
    box-sizing: border-box;
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
::v-deep .el-upload-list__item .el-icon-close {
  display: flex;
  align-items: center;
  height: 100%;
  top: 0;
  line-height: 1;
  font-size: 18px;
}
 .el-icon-close {
    line-height: 1!important;

}

</style>