<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包
                /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">风控管理</span>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px"> / 贷前管理 / 准入监控</span>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-bottom: 10px;">
            <el-button @click="showColumnSettings = true" size="small" icon="el-icon-setting">列设置</el-button>
        </div>
        <table-page      @filter-item-change="changeRoleSearchSelect" @conditional-reset="handleConditionalReset" @quote="_quote" :tableData="tableData"
                    :filterOptions="filterOptions" :columns="visibleColumns" :totalSize="totalSize" :current="currentPage"
                    @viewDetails="toDetail" @page-change="handlePageChange" @conditional-query="handleColumnsFilter">
        </table-page>
        <el-dialog title="列显示设置" :visible.sync="showColumnSettings" width="400px" center>
            <div class="column-settings">
                <el-checkbox-group v-model="selectedColumns">
                    <div v-for="column in allColumns" :key="column.prop" class="column-item">
                        <el-checkbox :label="column.prop">{{ column.label }}</el-checkbox>
                    </div>
                </el-checkbox-group>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showColumnSettings = false">取消</el-button>
                <el-button type="primary" @click="saveColumnSettings">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog class="createDialog"  :modal-append-to-body="false" title="处理预警"  :visible.sync="createDialogVisible" width="800px" center>
            <div class="dialog-content">
                <el-form ref="addForm" :rules="addRule" label-width="120px" :model="addForm" class="compact-form">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="贷款申请单号:" prop="applicationCode">
                                <div >{{this.addForm.applicationCode}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="借款人姓名:" prop="name">
                                <div >{{this.addForm.name}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="销售姓名:" prop="ownerName">
                                <div >{{this.addForm.salesName}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="预警来源:" prop="warningSource">
                                <div>{{ this.addForm.warningSource }}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="风险等级:" prop="riskLevel">
                                <div>{{ this.addForm.riskLevel }}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="处理操作:" prop="processingStatus">
                                <el-select v-model="addForm.processingStatus" placeholder="请选择处理操作" class="full-width-select">
                                    <el-option
                                        v-for="item in blacklistRules"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                        {{ item.label }}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="命中规则:" prop="ruleName">
                                <div class="form-item-value rule-name-box" v-html="formattedRuleName"></div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="showBlack">
                        <el-col :span="24">
                            <el-form-item label="转移黑名单:" prop="isBlack">
                                <el-radio-group v-model="radio" class="radio-group">
                                    <el-radio label="N">否</el-radio>
                                    <el-radio label="Y">是</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="备注:" prop="remarks">
                                <el-input v-model="addForm.remarks" placeholder="请输入备注信息" type="textarea" :rows="3" class="full-width-textarea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeCreateDialog" class="dialog-btn">取 消</el-button>
                    <el-button type="primary" @click="submitAdd" class="dialog-btn primary-btn">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import tablePage from '@/components/common/tablePage.vue';
import { pfCreditPass, pfCreditPassList } from '@/api/ksb';
import { tableMixin } from '@/utils/mixin';
import { getStopWarnRuleList, getWarningList } from '@/api/risk';
import { getLenderList, lenderList, lenderNameList } from '@/api';
import { listUserInfoPage } from '@/api/crm';

export default {
    name: 'warning-list',
    mixins: [tableMixin],
    components: { tablePage },
    data() {
        return {
            showBlack: false,
            showColumnSettings: false,
            selectedColumns: [],
            fundingPartyMap:{
                '9':'浦发',
                '55':'浦发',
                '15':'默放',
                '46':'汇丰(香港)',
                '52':'汇丰(中国)',
                '47':'华润银行',
                '36':'Morfin',
                '39':'Morfin',
                '61':'Morfin',
                '69':'Morfin',
                '70':'陆安',
                '72':'新网',
                '71':'广发',
                '57':'默放',
                '78':'跨商宝'
            },
            blacklistRules: [
                { value: 'A', label: '待处理' },
                { value: 'B', label: '准入通过' },
                { value: 'C', label: '准入拒绝' },
                { value: 'D', label: '有风险但准入通过' },
            ],
            totalSize: 0,
            addRule: {
                processingStatus: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                isBlack: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ]
            },
            radio: 'N',
            addForm: {
            },
            centerDialogVisible: false,
            createDialogVisible: false,
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '预警ID',
                    filterable: true
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '客户ID',
                    filterable: true
                },
                {
                    type: 'select',
                    value: null,
                    placeholder: '资方',
                    filterable: true,
                    options: [
                        { value: '9', label: '浦发双锁' },
                        { value: '55', label: '浦发无锁' },
                        { value: '46', label: '汇丰美元' },

                    ]
                },
                {
                    type: 'select',
                    value: null,
                    placeholder: '产品名称',
                    filterable: true,
                    options: [
                    ]
                },
                {
                    type: 'select',
                    value: null,
                    placeholder: '预警来源',
                    filterable: true,
                    options: [
                        { value: '黑名单', label: '黑名单' },
                        { value: '灰名单', label: '灰名单' },
                        { value: '反欺诈', label: '反欺诈' },

                    ]
                },
                {
                    type: 'select',
                    value: null,
                    placeholder: this.$t('loan_search_fxdj'),
                    filterable: true,
                    options: [
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                        { value: '5', label: '5' },
                    ]
                },
                {
                    type: 'select',
                    value: null,
                    placeholder: '处理状态',
                    filterable: true,
                    options: [
                        { value: 'A', label: '待处理' },
                        { value: 'B', label: '准入通过' },
                        { value: 'C', label: '准入拒绝' },
                        { value: 'D', label: '有风险但准入通过' },
                    ]
                },
                {
                    type: 'daterange',
                    value: [],
                    placeholderArr: [this.$t('loan_search_yjkssj'), this.$t('loan_search_yjjssj')],
                    filterable: true,
                    options: []
                },
            ],
            allColumns: [
                {
                    label: '预警ID',
                    prop: 'warningId',
                    width: '100'
                },
                {
                    label: '贷款申请单号',
                    prop: 'applicationCode',
                    width: '100'
                },
                {
                    label: '客户ID',
                    prop: 'userId',
                    width: '150'
                },
                {
                    label: '姓名',
                    prop: 'name',
                    width: '100'
                },
                {
                    label: '借款人企业名',
                    prop: 'companyName',
                    width: '200'
                },
                {
                    label: '借款人手机号',
                    prop: 'phoneNumber',
                    width: '200'
                },
                {
                    label: '资方',
                    prop: 'fundingPartyText',
                    width: '200'
                },
                {
                    label: '产品',
                    prop: 'product',
                    width: '200'
                },
                {
                    label: '申请日期',
                    prop: 'applicationDateForMat',
                    width: '200'
                },
                {
                    label: '预警来源',
                    prop: 'warningSource',
                    width: '200'
                },
                {
                    label: '命中规则',
                    prop: 'ruleName',
                    width: '520'
                },
                {
                    label: '风险等级',
                    prop: 'riskLevel',
                    width: '150'
                },
                {
                    label: '预警时间',
                    prop: 'warningTime',
                    width: '200'
                },
                {
                    label: '处理类型',
                    prop: 'processingType',
                },
                {
                    label: '处理状态',
                    prop: 'processingStatusText',
                    width: '150'
                },
                {
                    label: '备注',
                    prop: 'remarks',
                    width: '200'
                },
                {
                    label: '处理人',
                    prop: 'processor',
                    width: '150'
                }
            ]
        }
    },
    computed: {
        formattedRuleName() {
            // 使用计算属性处理字符串
            if (this.addForm.ruleName) {
                return this.addForm.ruleName.replace(/\|/g, '<br>'); // 将 '|' 替换为 '<br>' 实现换行
            } else {
                return '';
            }
        },
        visibleColumns() {
            if (!this.selectedColumns || this.selectedColumns.length === 0) {
                return [];
            }
            const visible = this.allColumns.filter(col => this.selectedColumns.includes(col.prop));
            // 始终显示操作列
            visible.push({
                label: '操作',
                prop: 'operation',
                width: '150',
                operates: [
                    {
                        event: 'quote',
                        text: '去处理',
                        type: 'primary'
                    }
                ],
                fixed: 'right'
            });
            console.log('当前显示的列:', visible.map(col => col.label));
            return visible;
        }
    },
    created() {
        this.loadColumnSettings();
        lenderList().then((res) => {
            res.data.forEach((item) => {
                item.label = item.lenderName;
                item.value = item.id;
            });
            console.log(res);
            // this.filterOptions[2].options = res.data;
        });
        lenderNameList({
            lenderType: '境内'
        }).then((res) => {
            console.log(res);

            let option = [];
            res.data.forEach((item) => {
                let obj = {};
                obj.label = item;
                obj.value = item;
                item = obj;
                option.push(obj);
            });
            this.filterOptions[2].options = option;

        });
        lenderNameList({
            lenderType: '境外'
        }).then((res) => {
            console.log(res);

            let option1 = [];
            res.data.forEach((item) => {
                let obj = {};
                obj.label = item;
                obj.value = item;
                item = obj;
                option1.push(obj);
            });
            this.filterOptions[2].options = this.filterOptions[2].options.concat(option1);
        });
    },
    mounted() {
        // 确保列设置正确加载
        if (!this.selectedColumns || this.selectedColumns.length === 0) {
            this.loadColumnSettings();
        }
    },
    methods: {
        changeRoleSearchSelect(val) {
            if (typeof val != 'number') {
                getLenderList({ lenderNameShort: this.filterOptions[2].value }).then((res) => {
                    res.data.forEach((item) => {
                        item.label = item.lenderName;
                        item.value = item.id;
                    });
                    this.filterOptions[3].options = res.data;
                });
            }
        },
        _getList() {
            const processingStatusMap = {
                'A': '待处理',
                'B': '准入通过',
                'C': '准入拒绝',
                'D': '有风险但准入通过'
            };
            getWarningList({
                current: this.currentPage,
                size: 10,
                warningId: this.filterOptions[0].value,
                userId: this.filterOptions[1].value,
                fundingParty: this.filterOptions[2].value,
                product: this.filterOptions[3].value,
                warningSource: this.filterOptions[4].value,
                riskLevel: this.filterOptions[5].value,
                processingStatus: this.filterOptions[6].value,
                warningTime: this.filterOptions[7].value[1],
            }).then(res => {
                const temp = res.data.records;
                temp.forEach(item => {
                    item.processingStatusText = processingStatusMap[item.processingStatus] || '';
                    item.fundingPartyText = this.fundingPartyMap[item.fundingParty] || ''
                    item.applicationDateForMat = item.applicationDate ? item.applicationDate.match(/^\d{4}-\d{2}-\d{2}/)[0] : ''
                    item.hiddenBtn = '去处理'
                    if (item.processingStatus === 'B' || item.processingStatus === 'C' || item.processingStatus === 'D') {
                        item.hiddenBtn = '去处理'
                    }
                    else if (item.warningSource.includes('黑名单')) {
                        item.hiddenBtn = '去处理'
                    }

                    else if (item.warningSource.includes('异常识别') || item.warningSource.includes('多头借贷') || item.warningSource.includes('灰名单')) {
                        item.hiddenBtn = ' '
                    }
                    else if (item.warningSource.includes('区域团伙')) {
                        if (item.ruleName.includes('在贷记录')) {
                            item.hiddenBtn = ' '
                        } else {
                            item.hiddenBtn = '去处理'
                        }
                    }
                })
                this.tableData = temp
                this.totalSize = res.data.total;
            })
        },
        submit() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    pfCreditPass(this.addForm).then((res) => {
                        this.$message.success('操作成功');
                        this._getList();
                        this.reset();
                    }).catch((err) => {
                        this.reset();
                    });
                }
            });
        },
        reset() {
            this.$refs.addForm.resetFields(); //重置表单数据
            this.centerDialogVisible = false;
        },
        handleCreate() {
            this.createDialogVisible = true
        },
        async _quote(row) {
            this.addForm = row;
            if (this.addForm.warningSource.includes('灰名单')) {
                this.showBlack = true
            }
            this.createDialogVisible = true;
        },
        toDetail(val) {
        },
        closeCreateDialog() {
            this.createDialogVisible = false;
        },
        submitAdd() {
            this.addForm.isBlack = this.radio
            const processor = localStorage.getItem('userName')
            this.addForm.processor = processor
            getStopWarnRuleList({ ...this.addForm }).then(res => {
                if (res.code == '200') {
                    this.$message.success('操作成功！')
                    this.createDialogVisible = false;
                    this._getList();
                }
            })
        },
        loadColumnSettings() {
            const saved = localStorage.getItem('warningListColumns');
            if (saved) {
                try {
                    this.selectedColumns = JSON.parse(saved);
                } catch (e) {
                    console.error('解析列设置失败:', e);
                    this.selectedColumns = this.allColumns.map(col => col.prop);
                }
            } else {
                // 默认显示所有列
                this.selectedColumns = this.allColumns.map(col => col.prop);
            }
            console.log('加载的列设置:', this.selectedColumns);
        },
        saveColumnSettings() {
            localStorage.setItem('warningListColumns', JSON.stringify(this.selectedColumns));
            this.showColumnSettings = false;
            this.$message.success('列设置已保存');
        }
    }
};
</script>
<style scoped lang="less">
/deep/ .create-btn {
    color: #FFFFFF;
    background: linear-gradient(326.82deg, #ff2472 -5.17%, #ff5f61 85.53%) !important;
}

.dialog-content {
    padding: 0 20px;
}

.compact-form {
    .el-form-item {
        margin-bottom: 16px;
    }
}

.form-item-value {
    padding: 8px 0;
    color: #606266;
    min-height: 20px;
}

.rule-name-box {
    background: #f5f7fa;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
}

.full-width-select {
    width: 100%;
}

.full-width-textarea {
    width: 100%;
}

.radio-group {
    margin-top: 8px;
}

.dialog-footer {
    display: flex;
    justify-content: center;
    padding: 20px 0 0;
    margin-top: 20px;
    border-top: 1px solid #e8e8e8;
}

.dialog-btn {
    padding: 10px 24px;
    border-radius: 4px;
    min-width: 100px;
    margin: 0 10px;
}

.primary-btn {
    background: linear-gradient(326.82deg, #ff2472 -5.17%, #ff5f61 85.53%) !important;
    border: none;
    color: #fff;
}

/deep/ .el-dialog__header {
    border-bottom: 1px solid #e8e8e8;
    padding: 15px 20px;
}

/deep/ .el-dialog__title {
    font-size: 16px;
    font-weight: 500;
    color: #303133;
}

/deep/ .el-dialog__body {
    padding: 20px;
}

/* 自定义悬浮提示的样式 */
.el-tooltip__popper {
    white-space: pre-wrap; /* 保留换行符并允许自动换行 */
    word-wrap: break-word; /* 允许长单词或无法使用断点的URL强制换行 */
    max-width: 300px; /* 设置悬浮提示的最大宽度 */
    padding: 8px; /* 设置悬浮提示的内边距 */
}

.column-settings {
    max-height: 400px;
    overflow-y: auto;
}

.column-item {
    margin-bottom: 10px;
    padding: 5px 0;
}
</style>