<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 / 运营管理 /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <el-row :gutter="24" class="searchForm">
            <el-col :span="24">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <el-row style="display: flex">
                            <div style="padding: 20px 20px" class="searchInput">
                            <div>
                                <el-input v-model="provider" placeholder="资方"></el-input>
                            </div>
                            <div class="button">
                                <el-button type="primary" @click="searchData">搜索</el-button>
                                <el-button @click="reset" style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                                <el-button type="primary" style="width: 120px;margin: 0 20px" @click="openProvider">添加返佣资方</el-button>
                            </div>
                            </div>
                        </el-row>
                    <div style="padding: 20px 20px">
                    <el-table   ref="table" :data="tableData" style="width: 100%; font-size: 14px"  @expand-change="handleExpandChange"   row-key="id">
                        <el-table-column prop="lenderName" label="资方" align="left"></el-table-column>
                        <el-table-column prop="productCount" label="包含产品数" align="left"> </el-table-column>
                        <el-table-column prop="commissionCount" label="返佣产品数" align="left"> </el-table-column>
                        <el-table-column prop="activatedCount" label="待生效修改" align="left"> </el-table-column>
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <div  class="childrenTable">
                                <el-table
                                    :data="tableChildrenData"
                                    style="width: 100%"
                                    :show-header="true"
                                >
                                    <el-table-column prop="productName" label="产品名称" align="left"></el-table-column>
                                    <el-table-column prop="productCreateTime" label="产品创建时间" align="left"></el-table-column>
                                    <el-table-column prop="updateTime" label="表数更新时间" align="left"></el-table-column>
                                    <el-table-column prop="commissionRate" label="当前系数%" align="left"></el-table-column>
                                    <el-table-column prop="activatedCount" label="待生效修改数" align="left"></el-table-column>
                                    <el-table-column prop="action" label="操作"  align="left">
                                        <template slot-scope="scope">
                                            <div >
                                                <a  style="color: #fe1964; cursor: pointer; margin-right: 20px" @click="updateMsg(scope.row,1)">修改</a>
                                                <a  style="color: #fe1964; cursor: pointer; margin-right: 20px" @click="historyRecord(scope.row)">历史纪录</a>
                                            </div>
                                        </template></el-table-column>
                                </el-table>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="佣金系数修改" :visible.sync="dialogFormVisible" width="23%">
            <el-form  label-width="150px" class="editForm">
                <el-form-item label="当前修改产品：">
                    <span style="width: 200px">{{ editForm.productName}}</span>
                </el-form-item>
                <el-form-item label="当前修改返佣系数：">
                    <span style="width: 200px">{{ editForm.commissionRate}}</span>
                </el-form-item>
                <el-form-item label="修改后返佣系数：">
                    <div class="updateRate"><el-input v-model="num"  placeholder="请输入数字" style="width: 80%"></el-input><span style="width: 10%" class="rate-icon">%</span></div>
                </el-form-item>
                <el-form-item label="新系数生效日期：">
                    <el-date-picker
                        v-model="updateTime"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-icon name="warning-outline"></el-icon><span style="margin-left: 5px">生效日期当天及后续产生的借款单按更新后的系数计算</span>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="childrenTitle" :visible.sync="dialogHistory" width="80%">
            <div>
            <el-table :data="childrenHistoryData" style="width: 100%; font-size: 14px">
                <el-table-column prop="createTime" label="创建日期" align="left"></el-table-column>
<!--                <el-table-column prop="status" label="修改状态" align="left"> </el-table-column>-->
                <el-table-column label="修改状态" align="left">
                    <!-- 使用作用域插槽 -->
                    <template v-slot="scope">
                        <span :class="getStatusClass(scope.row.status)" class="statusTag">
        {{ scope.row.status }}
      </span>
                    </template>
                </el-table-column>
                <el-table-column prop="commissionRate" label="修改后系数%" align="left"> </el-table-column>
                <el-table-column prop="activationTime" label="生效日期" align="left"> </el-table-column>
                <el-table-column prop="modifier" label="修改人" align="left"> </el-table-column>
                <el-table-column prop="cancelTime" label="撤销日期" align="left"> </el-table-column>
                <el-table-column prop="cancel" label="撤销人" align="left"> </el-table-column>
                <el-table-column prop="action" label="操作"  align="left">
                    <template slot-scope="scope">
                        <div  v-if="scope.row.status==='待生效'">
                            <a  style="color: #fe1964; cursor: pointer; margin-right: 20px" @click="historyRecordMsg(scope.row,2)">修改</a>
                        </div>
                    </template></el-table-column>
            </el-table>
                <div style="margin-top: 20px"> <el-icon name="warning-outline"></el-icon><span style="margin-left: 5px">生效日期当天及后续产生的借款单按更新后的系数计算</span></div>
            </div>
        </el-dialog>
        <el-dialog title="添加资方" :visible.sync="providerFormVisible" width="23%">
            <el-form  label-width="100px" class="editForm">
                <el-form-item label="返佣资方">
                    <el-select v-model="providerValue" placeholder="请选择返佣资方">
                            <el-option
                                v-for="item in providerOption"
                                :key="item.id"
                                :label="item.lenderName"
                                :value="item.id"
                            ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="providerFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addProvider" >确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import {
    addCommissionProvider,
    getCommissionProvider,
    getCommissionProviderList, getProductByProvider, getProductHistoryByProvider
    , updateCommissionRate, updateHistoryCommissionRate
} from '@/api/insur';
import moment from 'moment'; //导入文件
export default {
    name:'rebate-coefficient',
    data() {
        return {
            historyRateId:null,
            modalType:null,
            provider:'',
            childrenHistoryData:[],
            editForm:{},
            expandedRow:null,
            providerValue:null,
            providerFormVisible:false,
            childrenTitle:'',
            updateTime:'',
            num:null,
            dialogHistory:false,
            dialogFormVisible: false,
            providerOption:[],
            ruleForm: {
                userId: '',
                orderNumber: '',
                rewardType: '',
                nameOrCode: '',
                dateStart: '',
                dateEnd: '',
                page: 1,
                rows: 10
            },
            childId:null,
            dateTime: [],
            tableData: [
                ],
            tableChildrenData:[],
            total: 0,
            pageSize: 10,
            baseUrl: process.env.VUE_APP_TEXT_URL,
            currentPage: 1
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        searchData() {
            this.$refs.table.store.states.expandRows.forEach((row) => {
                this.$refs.table.toggleRowExpansion(row, false);
            });
            this.getDataList();
            setTimeout(()=>{
                this.tableData = this.tableData.filter(item => item.lenderName.includes(this.provider))
            },200)
        },
        getDataList() {
            getCommissionProviderList().then(res => {
                this.tableData = res.data;
            })

        },
        // 打开资方弹窗 获取数据
        openProvider() {
            this.providerFormVisible = true;
            getCommissionProvider().then((res) => {
                if (res.code == '200') {
                    this.providerOption = res.data;
                }
            });
        },
        // 添加返佣资方
        addProvider() {
            this.providerFormVisible =false
            addCommissionProvider({lenderId:this.providerValue}).then((res) => {
                if (res.code == '200') {
                    this.providerOption = res.data;
                    this.$message.success('添加成功');
                    this.getDataList()
                }
            })
        },
        //返佣系数
        updateMsg(row,type) {
                this.modalType=type
                this.updateTime=''
                this.editForm = row
                this.dialogFormVisible = true;
        },
        //历史修改
        historyRecordMsg(row,type) {
            this.editForm.commissionRate = row.commissionRate;
            this.modalType=type
            this.historyRateId = row.id
            this.dialogFormVisible = true;
        },
        // 点击展开资方
        handleExpandChange(row,expandedRows) {
            this.childId = row.lenderId;
            // this.tableChildrenData=[]
            // 如果当前行已经展开，则直接返回
            if (this.expandedRow === row) return;
            // 如果要展开新的行，先关闭当前展开的行
            if (this.expandedRow) {
                this.$refs.table.toggleRowExpansion(this.expandedRow, false);
            }
            // 更新当前展开的行
            this.expandedRow = expandedRows.length > 0 ? row : null;
            getProductByProvider({lenderId:Number(row.lenderId)}).then((res) => {
                this.tableChildrenData = res.data;
            })
        },
        getChildrenTableData(id){
            getProductByProvider({lenderId:Number(this.childId)}).then((res) => {
                this.tableChildrenData = res.data;
            })
        },
        //修改提交
        submit(){
            if (this.modalType===1){
                updateCommissionRate({
                    id:this.editForm.id,
                    lenderId: this.editForm.lenderId,
                    lenderProductId: this.editForm.lenderProductId,
                    commissionRate:Number(this.num),
                    activationTime: this.updateTime}).then(res => {
                    if (res.code == '200') {
                        this.providerOption = res.data;
                        this.$message.success('修改成功');
                        this.getDataList();
                        this.getChildrenTableData(this.childId);
                    }
                })
            } else {
                updateHistoryCommissionRate({
                    id:this.historyRateId,
                    commissionRate:Number(this.num),
                    activationTime: this.updateTime
                }).then(res => {
                    if (res.code == '200') {
                        this.$message.success('修改成功');
                        this.getHistoryRecordRefresh()
                    }
                })
            }

            this.dialogFormVisible = false;

        },
        // 历史配置表信息
        historyRecord(row){
            this.editForm = row
            this.childrenTitle=row.productName;
            this.dialogHistory= true
            getProductHistoryByProvider({lenderProductConfigId:row.id}).then(res => {
                if (res.code == '200') {
                    this.childrenHistoryData = res.data;
                }
            })
        },
        // 获取历史配置信息
        getHistoryRecordRefresh(){
            getProductHistoryByProvider({lenderProductConfigId:this.editForm.id}).then(res => {
                if (res.code == '200') {
                    this.childrenHistoryData = res.data;
                }
            })
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.page = index;
            this.getDataList(this.ruleForm);
        },
        handleSizeChange(val) {
            this.ruleForm.rows = val;
            this.ruleForm.page = 1;
            this.currentPage = 1;
            this.getDataList();
        },
        reset() {
           this.provider=''
        },
        getStatusClass(status){
            if(status == '待生效'){
                return 'activeStatus';
            } else {
                return  'normalStatus'
            }
        }
    }
};
</script>

<style lang='less' scoped>
.topSum {
    margin-bottom: 20px;
    .grid-content {
        display: flex;
        height: 100px;
    }

    .grid-cont-right {
        width: 180px;
        height: 100%;
        font-size: 14px;
        display: flex;
        margin-top: 24px;
        margin-left: 24px;
        flex-direction: column;
    }

    .grid-num {
        font-size: 15px;
    }
    .grid-num2 {
        font-size: 15px;
        padding-top: 12px;
    }
}

.searchForm {
    .el-form-item {
        width: 23%;
        margin-right: 2%;
        margin-bottom: 0;
    }
    .timeC {
        .el-date-editor {
            width: 100%;
        }
    }
    .button {
        .el-button {
            width: 90px;
            // margin-right: 35px;
        }
    }
}

.dataList {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
    /deep/.el-table th > .cell {
        color: #000;
    }

    /deep/.el-table__row {
        td:nth-child(8) {
            .cell {
                color: #fe1964;
            }
        }
    }
}
.searchInput{
    display: flex;
    width: 100%;
    justify-content: space-between;
}
 /deep/.childrenTable .el-table th {
    background-color: #ffffff!important;
}
/deep/.editForm {
    .el-form-item__label {
        text-align: left!important;
        color: #000;
    }
}
.updateRate{
    display: flex;
    /deep/.el-input__inner{
        border-top-right-radius: 0!important;
        border-bottom-right-radius: 0!important;
    }
}
.rate-icon{
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #eeeeee;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
/deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 90%;
}
.activeStatus{
    background-color: #e3f9e9;
    color: #67c23a
}
.normalStatus{
    background-color: #f3f3f3;
}
.statusTag{
    display: block;
    text-align: center;
    width: 60px!important;
    height: auto!important;
}
</style>