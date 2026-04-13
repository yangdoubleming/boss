<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px">

            <el-button style="float:right" type="primary" icon="el-icon-document-add"
                       @click="dialogFormVisible = true">新建</el-button>
            <el-button style="float:right" type="primary" icon="el-icon-document-add"
                       @click="goBack">返回</el-button>
        </div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">总边际利润目标</span>
                                    <span class="grid-num2">{{preInfo.profitTarget}}万元</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">当前设置月份</span>
                                    <span class="grid-num2">{{preInfo.year}}年{{parseInt(preInfo.month)}}月</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-card style="margin-bottom: 40px">
            <div style="display: flex;align-items: center;gap: 20px;margin-bottom: 38px">
                <div class="score-title" >各BU边际利润目标</div>
                <el-button style="float:right" type="primary" icon="el-icon-document-add"
                           @click="saveProfitList">保存</el-button>
            </div>
            <el-row :gutter="20">
                <el-col :span="6" v-for="(item, index) in profitList" :key="index" style="margin-bottom: 20px;">
                    <div class="bu-item">
                        <span>{{ item.salesGroupName }}</span>
                        <el-input v-model="item.profitTarget" size="small" style="width: 80px;margin: 0 20px 0 50px"></el-input>
                        <span>万元</span>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card style="margin-bottom: 60px;">
            <div style="display: flex;align-items: center;gap: 20px;margin-bottom: 38px">
                <div class="score-title" >个人边际利润目标</div>
                <el-select v-model="groupId" placeholder="请选择组别" style="width:200px" @change="changeGroupId">
                    <el-option v-for="item in groupList" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
                <el-button style="float:right" type="primary" icon="el-icon-document-add"
                           @click="updateSalesProfit">保存</el-button>
                <el-button style="float:right" type="primary" icon="el-icon-document-add"
                           @click="openAddSalesProfit">新建</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="salesName" label="姓名" align="center" width="150"></el-table-column>
                <el-table-column prop="month" label="月份" align="center"></el-table-column>
                <el-table-column label="总体边际利润目标（元）">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.profitTarget" @input="handleProfitInputChange(scope.row)" />
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                style="margin: 20px 0;float: right"
                background
                layout="prev, pager, next"
                :total="totalSize"
                @current-change="handlePageChange"
            ></el-pagination>
        </el-card>
        <el-dialog title="新建目标" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" ref="form" style="padding-left:20px" label-width="150px" label-position="left">
                <el-form-item label="目标统计月份" style="margin-right:30px" prop="dates">
                    <el-date-picker
                        v-model="form.monthOfYear"
                        type="month"
                        placeholder="选择日期"
                        value-format="yyyy-MM"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="目标组别" style="margin-right:30px" prop="dates">
                    <el-select v-model="newGroupId" placeholder="请选择组别" style="width:200px" @change="changeNewGroupId">
                        <el-option v-for="item in groupList" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="primary" @click="_addProfit" style="width:80px;height:35px">新建</el-button>
                <el-button @click="dialogFormVisible = false" style="width:80px;height:35px">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新建个人边际利润目标" :visible.sync="dialogAddVisible" width="30%">
            <el-form :model="addProfitObj" ref="addForm" style="padding-left:20px" label-width="150px" label-position="left">
                <el-form-item label="销售人员" style="margin-right:30px" prop="salesId">
                    <el-select v-model="addProfitObj.salesId" placeholder="请选择销售人员" style="width:200px" @change="changeNewGroupId">
                        <el-option v-for="item in salesList" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目标组别" style="margin-right:30px" prop="salesGroupId">
                    <el-select v-model="addProfitObj.salesGroupId" placeholder="请选择组别" style="width:200px" @change="changeNewGroupId">
                        <el-option v-for="item in groupList" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="利润目标" style="margin-right:30px" prop="profitTarget">
                    <el-input v-model="addProfitObj.profitTarget" style="width:200px" placeholder="请输入利润目标"></el-input><span style="margin-left: 20px">元</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="primary" @click="_addSalesProfit" style="width:80px;height:35px">新建</el-button>
                <el-button @click="dialogAddVisible = false" style="width:80px;height:35px">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { getPlatformList, addPlatform } from '../../../api/statistics';
import {
    groupProfitList,
    profitBatchUpdate,
    profitList,
    profitSave, salesAllGroupList,
    salesGroupList, salesList, saveProfit, updateSalesProfit
} from '../../../api/member';
export default {
    name: 'target-pm',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            dialogFormVisible: false,
            dialogAddVisible: false,
            tableOperate: [],
            tableData: [],
            totalSize: 0,
            currentPage: 1,
            showEnable: false,
            multipleSelection: [],
            choose: '',
            enbleData: [],
            newGroupId: '',
            form: {
                current: 0,
                size: 10,
                id: null,
                year: "",
                month: "",
                monthOfYear: "",
                salesGroupId: "",
                profitTarget: 0
            },
            columns: [
                {
                    label: '姓名',
                    prop: 'salesName'
                },
                {
                    label: '月份',
                    prop: 'month'
                },
                {
                    label: '总体边际利润目标（元）',
                    prop: 'profitTarget',
                }
            ],
            addProfitObj:{
                salesId: null,
                salesGroupId: null,
                year: "",
                month: "",
                monthOfYear: "",
                profitTarget: null
            },
            preInfo: {},
            profitList: [],
            groupId: null,
            groupList: [],
            salesList: []
        };
    },
    watch: {
        '$route.query': {
            handler(newQuery) {
                if(this.$route.path.indexOf('/target-edit')!==-1){
                    if(newQuery.year){
                        this.preInfo = newQuery;
                    }
                    this._getList()
                    this.getGroup();
                    this.getPmProfitList();
                }
            },
            immediate: false
        }
    },
    created() {
        this.preInfo = this.$route.query;
        this.getGroup();
        this._getList()
        this.getPmProfitList();
    },
    methods: {
        openAddSalesProfit(){
            this.dialogAddVisible = true
            this.addProfitObj.year = this.preInfo.year
            this.addProfitObj.month = this.preInfo.month
            this.addProfitObj.monthOfYear = this.preInfo.monthOfYear
                salesList({}).then(res=>{
                this.salesList = res.data.records
            })
        },
        _addSalesProfit(){
            saveProfit(this.addProfitObj).then(res=>{
                this.$message.success('新建成功!')
                this.dialogAddVisible = false
                this._getList()
            })
        },
        goBack(){
            this.$router.go(-1);
        },
        _addProfit() {
            this.form.current = this.currentPage
            this.form.year = this.form.monthOfYear.split('-')[0]
            this.form.month = this.form.monthOfYear.split('-')[1]
            this.form.salesGroupId = this.newGroupId
            profitSave(this.form).then(res => {
                this.dialogFormVisible = false
                this.$message.success('操作成功!')
                this.getPmProfitList()
            })
        },
        changeNewGroupId(val){
            this.newGroupId = val
        },
        changeGroupId(val){
            this.groupId = val;
            this._getList()
        },
        // 修改-----各Bu边际利润目标
        saveProfitList(){
            const subProfitList = this.profitList.map(item => ({
                    id: item.id,
                    year: this.preInfo.year,
                    month: this.preInfo.month,
                    monthOfYear: this.preInfo.monthOfYear,
                    salesGroupId: item.salesGroupId,
                    profitTarget: parseInt(item.profitTarget)
            }));
            profitBatchUpdate(subProfitList).then(res=>{
                this.$message.success('保存成功!')
            })
        },
        handleProfitInputChange(row) {
            row.profitTarget = Number(row.profitTarget)
        },
        updateSalesProfit() {
            if(this.tableData.length > 0){
                updateSalesProfit(this.tableData).then(response => {
                    this.$message.success('保存成功!')
                })
            }else{
                this.$message.warning('当前组别无数据')
            }
        },
        //获取组别
        getGroup(){
            salesAllGroupList({
            }).then((res) => {
                this.groupList = res.data
                this.groupLength = res.data.length
            });
        },
        //个人边际目标
        _getList() {
            profitList({
                salesGroupId: this.groupId,
                monthOfYear: this.$route.query.monthOfYear  || this.preInfo.monthOfYear
            }).then((res) => {
                this.tableData = res.data;
                this.totalSize = res.data.length;
            });
        },
        handlePageChange(page) {
            this.currentPage = page;
            this._getList() ;
        },
        //各边际利润目标
        getPmProfitList() {
            groupProfitList({
                monthOfYear: this.preInfo.monthOfYear
            }).then((res) => {
                this.profitList = res.data
            });
        },
    }
};
</script>

<style lang='less' scoped>

.score-title {
    height: 16px;
    font-size: 18px;
    display: block;
    line-height: 16px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #333333;
    padding-left: 9px;
    border-left: 3px solid #fe0255;
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

.mgb20 {
    margin-bottom: 20px;
}
</style>