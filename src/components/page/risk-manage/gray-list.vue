<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                     alt />豆沙包
                /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">风控管理</span>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px"> / 贷前管理 / 灰名单列表</span>
        </div>
        <div class="main-content">
            <el-form :model="ruleForm" ref="ruleForm" label-width="50px" class="demo-ruleForm" style="margin-top: 20px">
                <el-row>
                    <el-col :span="5">
                        <el-form-item >
                            <el-input  v-model="ruleForm.name" placeholder="姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item>
                            <el-input  v-model="ruleForm.registeredPhone" placeholder="注册手机号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item>
                            <el-input  v-model="ruleForm.applicationPhone" placeholder="申请手机号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item>
                            <el-input  v-model="ruleForm.idCardNumber" placeholder="身份证号码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5" >
                        <el-form-item >
                            <el-input  v-model="ruleForm.businessEntity" placeholder="企业经营主体"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item>
                            <el-input  v-model="ruleForm.unifiedSocialCreditCode" placeholder="统一社会信用代码" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" >
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">查询</el-button>
                            <el-button @click="resetForm">重置</el-button>
                            <el-button  type="primary" @click="toAdd">新增</el-button>
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
        <el-dialog class="createDialog"  :modal-append-to-body="false" title="新增灰名单客户"  :visible.sync="createDialogVisible" width="600px" center>
            <div>
                <el-form ref="addForm" :rules="addRule" label-width="150px" :model="addForm">
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="客户ID:" prop="creditAmountActual">
                                <el-input type="number" v-model="addForm.customerId" placeholder="若存量客户则需要填写" width="100px">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="姓名:" prop="name">
                                <el-input v-model="addForm.name" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="注册手机号:" prop="registeredPhone">
                                <el-input  v-model="addForm.registeredPhone" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="申请手机号:" prop="applicationPhone">
                                <el-input v-model="addForm.applicationPhone" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="身份证号:" prop="idCardNumber">
                                <el-input v-model="addForm.idCardNumber" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="企业经营主体:" prop="businessEntity">
                                <el-input v-model="addForm.businessEntity" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="统一社会信用代码:" prop="unifiedSocialCreditCode">
                                <el-input v-model="addForm.unifiedSocialCreditCode" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="自定义灰名单规则:" prop="rule">
                                <el-input v-model="addForm.rule" placeholder="简要提取拉黑原因规则"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="状态:" prop="fileUrl">
                                <el-switch @change="(e) => {
                handleAddActivate(addForm.status);
            }
                " :active-value="'active'" :inactive-value="'inActive'" v-model="addForm.status" active-color="#13ce66"
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
import { tableMixin } from '@/utils/mixin';
import NewTable from '@/components/common/NewTable.vue';
import { getAddGrayList, getGrayList, getStopGreyList } from '@/api/risk';

export default {
    name: 'gray-list',
    mixins: [tableMixin],
    components: { NewTable, tablePage },
    data() {
        return {
            loading:false,
            columns: [
                {
                    label: 'BID',
                    prop: 'id',
                    width: '80',
                    align: 'center'
                },
                {
                    label: '客户ID',
                    align: 'center',
                    prop: 'customerId',
                    width: '80',

                },
                {
                    label: '姓名',
                    align: 'center',
                    prop: 'name',
                    width: '80',
                },
                {
                    label: '注册手机号',
                    align: 'center',
                    prop: 'registeredPhone',
                    width: '150',

                },
                {
                    label: '申请手机号',
                    align: 'center',
                    prop: 'applicationPhone',
                    width: '150',
                },
                {
                    label: '身份证号',
                    align: 'center',
                    prop: 'idCardNumber',
                    width: '150',

                },
                {
                    label: '企业经营主体',
                    align: 'center',
                    prop: 'businessEntity'
                },
                {
                    label: '统一社会信用代码',
                    align: 'center',
                    prop: 'unifiedSocialCreditCode'
                },
                {
                    label: '灰名单来源',
                    align: 'center',
                    prop: 'source'
                },
                {
                    label: '名单规则',
                    align: 'center',
                    prop: 'rule'
                },
                {
                    label: '添加时间',
                    align: 'center',
                    prop: 'createdAt'
                },
                {
                    label: '状态',
                    prop: 'status',
                    notRedner: true
                },
            ],
            ruleForm: {
                name:'',
                registeredPhone:'',
                applicationPhone:'',
                businessEntity:'',
                unifiedSocialCreditCode:'',
                idCardNumber:'',
                current: 1,
                size: 10
            },
            blacklistRules: [
                { value: '是', label: '是' },
                { value: '否', label: '否' }
            ],
            totalSize: 0,
            addRule: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                registeredPhone: [
                    { required: true, message: '请输入注册手机号', trigger: 'blur' }
                ],
                applicationPhone: [
                    { required: true, message: '请输入申请手机号', trigger: 'blur' }
                ],
                businessEntity: [
                    { required: true, message: '请输入企业经营主体', trigger: 'blur' }
                ],
                idCardNumber: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' }
                ],
                unifiedSocialCreditCode: [
                    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
                ],
                rule: [
                    { required: true, message: '请输入规则', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '请选择状态', trigger: 'blur' }
                ],

            },

            addForm: {
                name: '',
                registeredPhone: '',
                applicationPhone: '',
                businessEntity: '',
                unifiedSocialCreditCode:'',
                idCardNumber: '',
                rule: '',
                status: 'active',
                source: "人工录入"
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
            this.ruleForm.current = page;
            this._getList();
        },
        resetForm() {
            this.ruleForm = {
                current: 1,
                size: 10
            }
            this._getList()
        },
        submitForm() {
            this.ruleForm.current = 1
            this.ruleForm.size = 10
            this._getList()
        },
        _getList() {
            getGrayList({
                ...this.ruleForm
            }).then(res=>{
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            })

        },
        handleImageActivate(status,row) {
            if (this.loading) {
                return;
            }
            this.loading = true;
            getStopGreyList({...row}).then(res=>{
                if(res.code =='200') {
                    this.loading = false;
                }
            })
            //try catch finally
            // false
        },
        handleAddActivate(status){
            console.log(this.addForm.status)
        },
        closeCreateDialog(){
            this.createDialogVisible = false;
            this.addForm= {}
        },
        submitAdd(){
            getAddGrayList({...this.addForm}).then(res=>{
                if(res.code=='200'){
                    this.createDialogVisible = false;
                    this.$message.success('新增成功！')
                    this.addForm = {}
                    this._getList()
                }
            })
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