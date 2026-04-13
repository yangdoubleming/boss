<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                     alt />豆沙包
                /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">风控管理</span>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px"> / 贷前管理 / 反欺诈规则</span>
        </div>
        <div class="main-content">
            <el-form :model="ruleForm" ref="ruleForm" label-width="50px" class="demo-ruleForm" style="margin-top: 20px">
                <el-row>
                    <el-col :span="5">
                        <el-form-item >
                            <el-input  v-model="ruleForm.ruleId" placeholder="规则ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item>
                            <el-input  v-model="ruleForm.ruleName" placeholder="规则名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" >
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">查询</el-button>
                            <el-button @click="resetForm">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <NewTable @page-change="handlePageChange" :current="ruleForm.page" :totalSize="totalSize" :columns="columns"
                      :tableData="tableData" style="margin-top: 20px">
                <template v-slot:status>
                    <el-table-column label="禁用/启用" prop="status" align="center">
                        <template slot-scope="scope">
                            <el-switch @change="(e) => {
                handleImageActivate(e, scope.row);
            }
                " :active-value="'Y'" :inactive-value="'N'" v-model="scope.row.status" active-color="#13ce66"
                                       inactive-color="#ff4949" :disabled="loading">
                            </el-switch>
                        </template>
                    </el-table-column>
                </template>
            </NewTable>
        </div>
        <el-dialog class="createDialog"  :modal-append-to-body="false" title="新增黑名单客户"  :visible.sync="createDialogVisible" width="600px" center>
            <div>
                <el-form ref="addForm" :rules="addRule" label-width="150px" :model="addForm">
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="客户ID:" prop="creditAmountActual">
                                <el-input type="number" v-model="addForm.a" placeholder="若存量客户则需要填写" width="100px">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="姓名:" prop="fileUrl">
                                <el-input v-model="addForm.b" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="注册手机号:" prop="opinions">
                                <el-input  v-model="addForm.c" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="申请手机号:" prop="fileUrl">
                                <el-input v-model="addForm.b" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="身份证号:" prop="fileUrl">
                                <el-input v-model="addForm.b" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="企业经营主体:" prop="fileUrl">
                                <el-input v-model="addForm.b" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="统一社会信用代码:" prop="fileUrl">
                                <el-input v-model="addForm.b" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="自定义黑名单规则:" prop="fileUrl">
                                <el-input v-model="addForm.b" placeholder="简要提取拉黑原因规则"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="状态:" prop="fileUrl">
                                <el-switch @change="(e) => {
                handleAddActivate(addForm.isActive);
            }
                " :active-value="0" :inactive-value="1" v-model="addForm.isActive" active-color="#13ce66"
                                           inactive-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeCreateDialog">取 消</el-button>
                    <el-button type="primary" @click="submitAdd">新增</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import tablePage from '@/components/common/tablePage.vue';
import { pfCreditPass, pfCreditPassList } from '@/api/ksb';
import { tableMixin } from '@/utils/mixin';
import NewTable from '@/components/common/NewTable.vue';
import { getImageFileList, updateImageFile } from '@/api/fileUpload';
import { getBlackRuleList, getStopBlackRuleList } from '@/api/risk';

export default {
    name: 'anti-fraud-rules',
    mixins: [tableMixin],
    components: { NewTable, tablePage },
    data() {
        return {
            loading:false,
            columns: [
                {
                    label: '规则ID',
                    prop: 'ruleId',
                    width: '80',
                    align: 'center'
                },
                {
                    label: '规则类型',
                    align: 'center',
                    prop: 'ruleType',
                    width: '350',

                },
                {
                    label: '规则名',
                    align: 'left',
                    prop: 'ruleName',
                    width: '350',
                },
                {
                    label: '风险等级',
                    align: 'center',
                    prop: 'riskLevel',
                    width: '160',

                },
                {
                    label: '添加时间',
                    align: 'center',
                    prop: 'createTime',
                    width: '350',
                },
                {
                    label: '禁用/启用',
                    prop: 'status',
                    notRedner: true
                },
            ],
            ruleForm: {
                ruleId:null,
                ruleName:'',
                current: 1,
                size: 10
            },
            blacklistRules: [
                { value: '是', label: '是' },
                { value: '否', label: '否' }
            ],
            totalSize: 0,
            addRule: {
                status: [
                    { required: true, message: '请选择审批状态', trigger: 'blur' }
                ]
            },
            addForm: {
                isActive: false,
            },
            centerDialogVisible: false,
            createDialogVisible:false,
            tableData: [],
        }
    },
    methods: {
        toAdd(){
            this.createDialogVisible = true
        },
        handlePageChange(page) {
            console.log(page)
            this.ruleForm.current = page;
            // this._getList();
        },
        resetForm() {
            this.ruleForm = {
                is_active: '',
                page: 1,
                size: 10
            }
            this._getList()
        },
        submitForm() {
            this.ruleForm.page = 1
            this.ruleForm.size = 10
            this._getList()
        },
        _getList() {
            getBlackRuleList({
                ruleName: this.ruleForm.ruleName,
                ruleId:this.ruleForm.ruleId,
                current: this.ruleForm.page,
                size: this.ruleForm.size,

            }).then(res => {
                this.tableData= res.data.records
                this.totalSize = res.data.total;
            })

        },
        handleImageActivate(status, row) {
            if (this.loading) {
                return;
            }
            this.loading = true;
            getStopBlackRuleList({...row}).then(res => {
                if(res.code =='200') {
                    this.loading = false;
                }
            })
            //try catch finally
            // false
        },
        handleAddActivate(status){
        },
        closeCreateDialog(){
            this.createDialogVisible = false;
        },
        submitAdd(){
            this.createDialogVisible = false;
        }


    }
};
</script>
<style scoped lang="less">
.main-content{
    background: #fff;
    padding: 20px;
    border-radius: 20px;
}
/deep/ .create-btn{
    color: #FFFFFF;
    background: linear-gradient(326.82deg, #ff2472 -5.17%, #ff5f61 85.53%) !important;
}
.dialog-footer{
    display: flex;
    justify-content: flex-end;
}
</style>