<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <el-row :gutter="24" class="searchForm">
                <el-col :span="24">
                    <el-form ref="ruleForm" :model="ruleForm" style="padding: 30px 20px 30px 20px">
                        <el-row style="display: flex">
                            <el-form-item>
                                <el-input v-model="ruleForm.userId" placeholder="用户ID"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.accountName" placeholder="客户名称"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.ownerName" placeholder="归属人"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select multiple v-model="ruleForm.labelIds" placeholder="状态">
                                    <el-option :style="{ width: '140px' }" v-for="item in optionsLabelIds"
                                        :key="item.id" :label="item.labelName" :value="item.id" />
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.phone" placeholder="手机号"></el-input>
                            </el-form-item>
                            <div class="button" style="display: flex; align-items: center; gap: 15px">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">查询</el-button>
                                <el-button @click="reset"
                                    style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                                <div>已选中：{{ multipleSelection.length }}项</div>
                                <el-button type="primary" @click="_settlement">分配至他人</el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>

            <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
                <el-table ref="multipleTable" :row-key="getRowKey" :data="tableData"
                    style="width: 100%; font-size: 14px" v-loading="loading" element-loading-text="加载中，请稍后"
                    tooltip-effect="dark" @select="handleSelectionChange" @select-all="handleSelectAll">
                    <el-table-column type="selection" :reserve-selection="true" width="55"> </el-table-column>
                    <el-table-column prop="accountName" label="客户名称" align="center">
                        <template slot-scope="scope">
                            <div @click="openDrawer(scope.row)">{{ scope.row.accountName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userId" label="用户ID" align="center"> </el-table-column>
                    <el-table-column prop="createTime" label="注册时间" align="center">
                        <template slot-scope="scope">
                            <div>{{ scope.row.createTime ? scope.row.createTime.split(' ')[0] : '--' }}</div>
                        </template></el-table-column>
                    <el-table-column prop="phone" label="联系电话" align="center">
                        <template slot-scope="scope">
                            <div>{{ scope.row.phone.slice(0, 3) + '****' + scope.row.phone.slice(7, 12) }}</div>
                        </template></el-table-column>
                    <el-table-column prop="labelNames" label="状态" align="center">
                        <template slot-scope="scope">
                            {{ scope.row.labelNameString || '--' }}
                        </template></el-table-column>
                    <el-table-column prop="yearSaleAmount" label="年销售额（万元）" align="center" width="200">
                        <template slot-scope="scope">
                            {{ formatToWan(scope.row.yearSaleAmount) || '--' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="ownerName" label="归属人" align="center"> </el-table-column>
                    <el-table-column prop="internalName" label="归属人（内部名）" align="center"> </el-table-column>
                    <el-table-column prop="otherOwnerType" label="其他归属人" align="center"> </el-table-column>
                    <el-table-column prop="sourceName" label="客户来源（大类）" align="center"> </el-table-column>
                    <el-table-column prop="action" label="操作" align="center" width="180px" fixed="right">
                        <template slot-scope="scope">
                            <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
                            <el-button @click="followRecord(scope.row)" type="text">跟进记录</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background @size-change="handleSizeChange" @current-change="currentChange"
                    :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total"
                    :current-page.sync="currentPage" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </el-row>
        </el-card>

        <el-dialog title="转接客户" :visible.sync="dialogVisible" width="35%" class="dialogClass"
            :before-close="handleClose">
            <div style="
                    font-weight: 600;
                    font-size: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                "></div>
            <el-form>
                <div style="font-size: 15px">-当前已选中：<span style="font-size: 18px;color: #222222;padding: 0 5px">{{
                        multipleSelection.length }}</span>条数据</div>

                <el-form-item required label="选择转接人"><el-input placeholder="请选择转接人" v-model="filterText"
                        suffix-icon="el-icon-plus" disabled> </el-input></el-form-item>
            </el-form>

            <el-tree class="filter-tree" :data="GroupList" :props="defaultProps" :filter-node-method="filterNode"
                ref="tree" @node-click="handleNodeClick" style="max-height: 380px; overflow-y: scroll">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <div style="display: flex; justify-content: center; align-items: center">
                    <el-button @click="handleClose"
                        style="width: 100px; color: #fe1964; margin-right: 15px; border-color: #fe1964">取 消</el-button>
                    <el-button type="primary" @click="_push" style="width: 100px">确 定</el-button>
                </div>

                <!--                <div style="margin-top: 30px; color: #fe1964; font-size: 15px; text-align: center">-->
                <!--                    *点击确定表示您已线下结算佣金给合伙人，请谨慎操作。-->
                <!--                </div>-->
            </span>
        </el-dialog>
        <el-drawer :visible.sync="drawerVisible" direction="rtl" :before-close="handleDrawerClose" class="drawerFrom">
            <div class="drawer-main">
                <div class="drawer-card">
                    <div>客户名称</div>
                    <div style="padding: 0 10px; color: #000000; display: flex; justify-content: space-between; align-items: center"
                        v-if="accountNameIsEditing === false">
                        <div style="padding: 16px 15px; font-size: 14px">{{ currentAccountInfo.borrowerName }}</div>
                        <div>
                            <img src="../../../assets/icon/edit.svg" @click="accountNameIsEditing = true" />
                        </div>
                    </div>
                    <div style="padding: 10px; color: #000000; display: flex; justify-content: space-between" v-else>
                        <el-input v-model="currentAccountInfo.borrowerName" style="width: 400px"></el-input>
                        <div @click="changeAccountName">
                            <img src="../../../assets/icon/save.svg" />
                        </div>
                    </div>
                    <div>客户手机号</div>
                    <div style="padding: 10px 26px; color: #000000; display: flex; justify-content: space-between">{{
                        customerPhone || '--' }}</div>
                </div>
                <div class="drawer-card">
                    <div>系统信息</div>
                    <div style="display: flex; gap: 20px; padding: 10px">
                        <div class="drawer-card-left">
                            <div>状态</div>
                            <div>年销售额（万元）</div>
                            <div>客户来源（小类）</div>
                        </div>
                        <div class="drawer-card-right">
                            <div>{{ currentAccountInfo.labelNameString || '--' }}</div>
                            <div>{{ formatToWan(currentAccountInfo.y1SalesValue) || '--' }}</div>
                            <div>{{ currentAccountInfo.sourceName }}</div>
                        </div>
                    </div>
                </div>
                <div class="drawer-card">
                    <div>动态记录</div>
                    <div style="padding: 20px" v-if="currentAccountInfo.customerHistoryList.length > 0">
                        <el-timeline style="max-height: 300px; overflow-y: scroll">
                            <el-timeline-item v-for="(activity, index) in currentAccountInfo.customerHistoryList"
                                :key="index" icon="el-icon-document-copy" :size="activity.size" placement="top"
                                :hide-timestamp="true">
                                {{ activity }}
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                    <el-empty description="无记录" :image-size="60" v-else></el-empty>
                </div>
            </div>
        </el-drawer>
        <!-- 跟进记录抽屉 -->
        <el-drawer size="50%" title="跟进记录" v-loading="recordLoaidng" :visible.sync="recordVisible" direction="rtl"
            :before-close="recordDrawerClose" class="records-drawer">
            <div class="add-record-box" v-if="isAdd">
                <el-card>
                    <el-form :model="addRecordForm" :rules="recordRules" ref="addRecordRef">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-form-item label="跟进记录内容" prop="content">
                                    <el-input :rows="3" type="textarea" v-model="addRecordForm.content"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="联系人姓名">
                                    <el-input v-model="addRecordForm.contactName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="意向程度">
                                    <el-select style="width: 100%;" v-model="addRecordForm.intentionalDegree"
                                        placeholder="请选择客户意向程度">
                                        <el-option label="无意向" value="0"></el-option>
                                        <el-option label="稍有意向" value="1"></el-option>
                                        <el-option label="意向一般" value="2"></el-option>
                                        <el-option label="意向较高" value="3"></el-option>
                                        <el-option label="意向极高" value="4"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="跟进类型">
                                    <el-select style="width: 100%;" v-model="addRecordForm.customItem128C" filterable
                                        placeholder="请输入关键词">
                                        <el-option v-for="item in recordLists" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="客户成熟度" prop="customItem140C">
                                    <el-select style="width: 100%;" v-model="addRecordForm.customItem140C"
                                        placeholder="请选择客户成熟度">
                                        <el-option label="A-符合进件条件,近1个月有资金需求" value="1"></el-option>
                                        <el-option label="B-符合进件条件,3个月内(短期)有资金需求" value="2"></el-option>
                                        <el-option label="C-符合进件条件,没有明确的资金需求" value="3"></el-option>
                                        <el-option label="D-不符合进件条件,3个月内能达到进件要求" value="4"></el-option>
                                        <el-option label="E-不符合进件条件,无资金需求(需备注客户经营平台)" value="5"></el-option>
                                        <el-option label="F-还需进一步开发,未能拿到客户的信息及贷款意愿" value="6"></el-option>
                                        <el-option label="G-无法联系(手机号无效、微信无法添加、3次以上联系无效)" value="7"></el-option>
                                        <el-option label="0-销售还未联系" value="8"></el-option>
                                        <el-option label="1-已放款" value="9"></el-option>
                                        <el-option label="2-授信成功" value="10"></el-option>
                                        <el-option label="3-已进件" value="11"></el-option>
                                        <el-option label="4-已注册（带offer）" value="12"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-form-item style="display: flex; flex-direction:row-reverse ;margin-top: 20px;">
                                <el-button type="primary" @click="submitRecord('addRecordRef')">立即创建</el-button>
                                <el-button @click="openRecord">关闭</el-button>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </el-card>
            </div>
            <div>
                <div class="record-btn">
                    <el-button type="primary" @click="openRecord">新建记录</el-button>
                </div>
                <section class="record-drawer" v-if="followRecordList.length">
                    <el-card shadow="always" class="record-box" v-for="item in followRecordList" :key="item.id">
                        <el-descriptions :colon="false" title="" :column="2" :labelStyle="content_style"
                            :contentStyle="content_style">
                            <el-descriptions-item :label="item.activityRecordFrom || '--'"
                                :span="2">电话联系了客户</el-descriptions-item>
                            <el-descriptions-item label="跟进记录内容:" :span="2">{{ item.content }}</el-descriptions-item>
                            <el-descriptions-item label="客户来源（大类）:">{{ item.customitem130C }}</el-descriptions-item>
                            <el-descriptions-item label="客户来源（二类）:">{{ item.customitem131C }}</el-descriptions-item>
                            <el-descriptions-item label="最新跟进记录时间:">{{ item.customitem135C }}</el-descriptions-item>
                            <el-descriptions-item label="客户所有人:"> {{ item.customitem136C }}</el-descriptions-item>
                            <el-descriptions-item label="电话:">{{ item.customitem137C }}</el-descriptions-item>
                            <el-descriptions-item label="是否为放款客户:">{{ Number(item.customitem139C) ? '是' : '否'
                            }}</el-descriptions-item>
                            <el-descriptions-item label="客户成熟度:">{{ item.customitem140C }}</el-descriptions-item>
                            <el-descriptions-item label="跟进类型:">{{ item.customitem128C }}</el-descriptions-item>
                            <el-descriptions-item label="意向程度:">{{ item.intentionalDegree }}</el-descriptions-item>

                            <el-descriptions-item label="更新时间: ">{{ item.updatedAt }}</el-descriptions-item>
                            <el-descriptions-item label="推荐码: ">{{ item.customitem141C ? item.customitem141C : '--'
                            }}</el-descriptions-item>
                        </el-descriptions>
                    </el-card>
                </section>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { batchUserLiquidation } from '@/api/insur';
import moment from 'moment';
import { getFollow, saveFollow, accountInfo, listByGroup, listUserInfoPage, transferOwner2, updateAccount, getLabelList } from '@/api/crm'; //导入文件
export default {
    name: 'customer-list',
    data() {
        return {
            optionsLabelIds: [],
            customerPhone: "",
            intentionalShow: {
                0: '无意向',
                1: "稍有意向",
                2: '意向一般',
                3: '意向较高',
                4: '高意极高'

            },
            nowPhone: '',
            originOne: {
                0: '--',
                1: '平台推荐线索',
                2: '销售线索',
                3: '市场线索',
                4: '外呼系统',
                11: '其他'
            },
            originTwo: {
                0: '--',
                1: '亚马逊邮件',
                5: '行业销售转介绍',
                7: '历史客户',
                11: '行业媒体投放',
                14: '市场自拓-社群引流',
                19: '渠道推荐-年度合作',
                20: '市场自拓-异业合作',
                21: '名单置换',
                45: '深跨协',
                47: '其他',
                48: '运营开发',
                50: '合伙人活动',
                54: '官网自然流量',
                55: '合伙人推荐',
                56: '市场自拓-线上推广',
                57: '线下活动',
                58: '渠道推荐',
                59: '销售自拓',
                60: '老带新推荐',
                61: 'WF推客',
                62: 'ipaylinks推客',
                63: '连连推客',
                64: '随行付推客',
                65: '锁账户',
                2: '离职继承',
                3: 'leader推荐',
                4: 'Shopee邮件',
                6: '星火渠道',
                8: 'skyee推客',
                9: 'Meta',
                10: '探迹拓客',
                12: '小程序获客',
                13: '汇丰推客',
                15: '寻汇推客',
                16: '服务商引流'

            },
            maturity: {
                0: '--',
                1: 'A-符合进件条件,近1个月有资金需求',
                2: 'B-符合进件条件,3个月内(短期)有资金需求',
                3: 'C-符合进件条件,没有明确的资金需求',
                4: 'D-不符合进件条件,3个月内能达到进件要求',
                5: 'E-不符合进件条件,无资金需求(需备注客户经营平台)',
                6: 'F-还需进一步开发,未能拿到客户的信息及贷款意愿',
                7: 'G-无法联系(手机号无效、微信无法添加、3次以上联系无效)',
                8: '0-销售还未联系',
                9: '1-已放款',
                10: '2-授信成功',
                11: '3-已进件',
                12: '4-已注册（带offer）',
            },
            followType: {
                0: '--',
                1: '了解客户经营情况',
                2: '申请中',
                3: '授信被拒-换人申请',
                28: '授信被拒-换产品申请',
                24: '授信被拒-已终止',
                4: '已批复待支用',
                5: '已放款',
                6: '无法联系',
                7: '无资金需求',
                8: '资金需求不紧急',
                9: '额度低',
                10: '无产品匹配',
                11: '征信不符合',
                12: '不愿切收款',
                13: '有在贷',
                14: '纠结费用',
                15: '不愿泄露资料',
                20: '需手动发offer',
                26: '非亚马逊卖家',
                27: '不满足条件',
                16: '考虑中',
                17: '跟进中',
                21: '锁账户',
                22: '内部测试',
                23: '日常维护',
                25: '咨询保险',
                18: '已终止',
                19: '其他',

            },
            followRecordList: [],
            recordRules: {
                content: [{ required: true, message: '请输入跟进记录内容', trigger: 'blur' }],
                customItem140C: [{ required: true, message: '请选择客户成熟度', trigger: 'change' }],
            },
            isAdd: false,
            recordLists: [{
                value: '1',
                label: '了解客户经营情况'
            }, {
                value: '2',
                label: '申请中'
            }, {
                value: '3',
                label: '授信被拒-换人申请'
            }, {
                value: '28',
                label: '授信被拒-换产品申请'
            }, {
                value: '24',
                label: '授信被拒-已终止'
            },
            {
                value: '4',
                label: '已批复待支用'
            },
            {
                value: '5',
                label: '已放款'
            },
            {
                value: '6',
                label: '无法联系'
            },
            {
                value: '7',
                label: '无资金需求'
            },
            {
                value: '8',
                label: '资金需求不紧急'
            },
            {
                value: '9',
                label: '额度低'
            },
            {
                value: '10',
                label: '无产品匹配'
            },
            {
                value: '11',
                label: '征信不符合'
            },
            {
                value: '12',
                label: '不愿切收款'
            }, {
                value: '13',
                label: '有在贷'
            }, {
                value: '14',
                label: '纠结费用'
            }, {
                value: '15',
                label: '不愿泄露资料'
            },
            {
                value: '20',
                label: '需手动发offer'
            }, {
                value: '26',
                label: '非亚马逊卖家'
            },
            {
                value: '27',
                label: '不满足条件'
            },
            {
                value: '16',
                label: '考虑中'
            },
            {
                value: '17',
                label: '跟进中'
            },
            {
                value: '21',
                label: '锁账户'
            },
            {
                value: '22',
                label: '内部测试'
            },
            {
                value: '23',
                label: '日常维护'
            }, {
                value: '25',
                label: '咨询保险'
            },
            {
                value: '18',
                label: '已终止'
            },
            {
                value: '19',
                label: '其他'
            }
            ],
            recordValue: '',
            addRecordForm: {
                phone: '',
                content: '',
                contactName: '',
                intentionalDegree: '',
                customItem140C: '',
                customItem128C: ''
            },//新增跟进记录表单
            content_style: {
                'font-size': '15px',
            }, // 自定义样式
            recordLoaidng: false,// 跟进记录抽屉
            recordVisible: false,
            filterText: '',
            filterNodeId: '',
            GroupList: [],
            defaultProps: {
                children: 'salesVoList',
                label: 'name'
            },
            currentPage: 1,
            currentAccountInfo: {
                borrowerName: '',
                borrowerPhone: null,
                companyName: null,
                customerHistoryList: [],
                labelNames: [],
                labelNameString: '',
                sourceName: '',
                userCreateTime: null,
                userId: null,
                y1SalesValue: 0
            },
            currentAccountId: '',
            accountNameIsEditing: false,
            loading: false,
            dialogVisible: false,
            drawerVisible: false,
            ruleForm: {
                userId: '', // 手机号
                accountName: '',
                ownerName: '',
                phone: '',
                labelName: '',
                current: 1,
                size: 10
            },
            dateTime: [],
            tableData: [],
            total: 0,
            pageSize: 10,
            multipleSelection: [],
            disabled: false,
            ids: [],
            totalAmount: 0,
            pickerOptions: {
                disabledDate(time) {
                    let t = new Date().getDate();
                    if (t >= 25) {
                        // 返回上个月的日期
                        return time.getTime() > Date.now() - 8.64e7 * t;
                    } else {
                        const day = 60 * 24 * 3600 * 1000;
                        // 返回小于两个月前的日期
                        return time.getTime() > Date.now() - day;
                    }
                }
            }
        };
    },
    created() {
        this.getDataList();
        this.getListByGroup();
        // 获取标签信息
        this.getLabelList()
    },
    // computed: {
    //     totalAmount() {
    //         if (!this.multipleSelection.length) return 0;
    //         let n = 0;
    //         this.multipleSelection.forEach((item) => {
    //             n = n + Number(item.amount);
    //         });
    //         return n;
    //     }
    // },
    methods: {
        // 获取标签信息
        getLabelList() {
            getLabelList().then(res => {
                this.optionsLabelIds = res.data
            })
        },
        // 新建跟进记录
        submitRecord(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.addRecordForm.phone = this.nowPhone
                    saveFollow({ ...this.addRecordForm, "loginId": this.loginUser }).then((res) => {
                        this.$message.success('新增跟进记录成功')
                        this.addRecordForm = {
                            phone: '',
                            content: '',
                            contactName: '',
                            intentionalDegree: '',
                            customItem140C: '',
                            customItem128C: ''
                        }
                        this.followRecord({ phone: this.nowPhone })


                    })
                } else {
                    return false;
                }
            })
        },
        //显示新建表单
        openRecord() {
            this.isAdd = !this.isAdd
            this.addRecordForm = {
                phone: '',
                content: '',
                contactName: '',
                intentionalDegree: '',
                customItem140C: '',
                customItem128C: ''
            }
        },
        //跟进记录弹窗关闭
        recordDrawerClose() {
            this.recordVisible = false
        },
        //时间转换
        getData(n) {
            let now = new Date(n),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
        },
        //跟进记录
        followRecord(row) {
            this.TabalLoaidng = true
            this.nowPhone = row.phone
            getFollow({ phone: this.nowPhone }).then((res) => {
                res.data.forEach(item => {
                    item.customitem130C ? item.customitem130C = this.originOne[item.customitem130C] : item.customitem130C = '--'
                    item.customitem131C ? item.customitem131C = this.originTwo[item.customitem131C] : item.customitem131C = '--'
                    item.customitem140C ? item.customitem140C = this.maturity[item.customitem140C] : item.customitem140C = '--'
                    item.customitem128C ? item.customitem128C = this.followType[item.customitem128C] : item.customitem128C = '--'
                    item.intentionalDegree && item.intentionalDegree != 0 ? item.intentionalDegree = this.intentionalShow[item.intentionalDegree] : item.intentionalDegree = '--'
                    item.customitem135C ? item.customitem135C = this.getData(item.customitem135C) : item.customitem135C = '--'
                })
                this.followRecordList = res.data
                this.recordVisible = true
                this.TabalLoaidng = false
            }).catch(() => {
                this.TabalLoaidng = false
            })

        },
        formatToWan(num) {
            const wanNum = num / 10000;
            return wanNum.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },
        getListByGroup() {
            listByGroup().then((res) => {
                res.data.map((item) => {
                    if (item.salesVoList) {
                        item.salesVoList.map((item) => {
                            item.name = item.internalName;
                        });
                    }
                });
                this.GroupList = res.data;
            });
        },
        changeAccountName() {
            this.accountNameIsEditing = false;
            updateAccount({
                id: this.currentAccountId,
                accountName: this.currentAccountInfo.borrowerName,
                phone: this.currentAccountInfo.borrowerPhone
            }).then((res) => {
                this.getDataList();
            });
        },
        handleNodeClick(data) {
            if (!data.children) {
                this.filterText = data.name;
                this.filterNodeId = data.id;
            }
            console.log(data);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        handleDrawerClose() {
            this.drawerVisible = false;
            this.accountNameIsEditing = false;
        },
        openDrawer(row) {
            if (localStorage.getItem('role') != 38) {
                this.drawerVisible = true;
                this.currentAccountId = row.id;
                this.customerPhone = row.phone
                accountInfo({ account: row.phone }).then((res) => {
                    this.currentAccountInfo = res.data;
                    if (this.currentAccountInfo.labelNames) {
                        this.currentAccountInfo.labelNameString = this.currentAccountInfo.labelNames.join(', ');
                    }

                });
            }
        },
        showDetail(row) {
            this.$router.push({
                path: '/loanUser-detail',
                query: {
                    userId: row.userId,
                    account: row.phone
                }
            });
        },
        async handleSelectAll(selection) {
            if ((selection.length && !this.checked) || (!selection.length && this.checked)) {
                // 全选
                this.loading = true;
                await listUserInfoPage(this.ruleForm).then((res) => {
                    if (res.code === 200) {
                        res.data.records.forEach((item) => {
                            const exists = this.multipleSelection.some((selectedItem) => selectedItem.id === item.id);
                            if (!exists) {
                                this.multipleSelection.push(item);
                            }
                        });
                    }
                });
                await this.getDataList();
                await this.setLoading();
            } else {
                // 全不选
                this.multipleSelection = [];
            }
        },
        setLoading() {
            this.loading = false;
            console.log(this.multipleSelection.length);
        },
        getRowKey(row) {
            return row.id;
        },
        _push() {
            const that = this;
            this.$confirm('确定要执行这个操作吗？', '确认操作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 在这里执行确认后的逻辑
                if (this.ids.length === 0) {
                    return;
                }
                transferOwner2({
                    neocrmAccountIds: this.ids,
                    salesId: this.filterNodeId
                }).then((res) => {
                    that.dialogVisible = false;
                    that.loading = true;
                    that.getDataList();
                    setTimeout(() => {
                        that.loading = false;
                        that.$message.success('操作成功！');
                    }, 2000)
                    that.ids = [];
                    that.multipleSelection = [];
                });
            }).catch(() => {
                this.$message.info('操作已取消');
            });


        },
        _settlement() {
            if (!this.multipleSelection.length) return this.$message.info('请先勾选！');
            this.dialogVisible = true;
            this.getAmount();
        },
        searchData() {
            this.ruleForm.current = 1;
            this.ids = [];
            this.multipleSelection = [];
            // this.total = 0;
            this.currentPage = 1;
            this.getDataList();
        },
        getDataList() {
            let ruleForm = { ...this.ruleForm }
            if (this.ruleForm.labelIds && this.ruleForm.labelIds.length > 0) {
                ruleForm.labelIds = this.ruleForm.labelIds.join(',')
            }
            listUserInfoPage(ruleForm).then((res) => {
                // console.log(res.data);
                if (res.code === 200) {
                    this.$refs.multipleTable.clearSelection();

                    res.data.records.map((item) => {
                        if (item.labelNames) {
                            item.labelNameString = item.labelNames.join(', '); // 转换数组为逗号分隔的字符串
                        }

                    });
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                }
                //回显
                this.multipleSelection.forEach((val) => {
                    this.tableData.forEach((row) => {
                        if (row.id == val.id) {
                            this.$refs.multipleTable.toggleRowSelection(row, true);
                        }
                    });
                });
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList(this.ruleForm);
        },
        handleSizeChange(val) {
            console.log(val);
            this.ruleForm.size = val;
            this.ruleForm.current = 1;
            this.currentPage = 1;
            this.getDataList();
        },
        reset() {
            this.ruleForm.userId = '';
            this.ruleForm.accountName = '';
            this.ruleForm.ownerName = '';
            this.ruleForm.phone = '';
            this.ruleForm.labelName = '';
            this.ruleForm.current = 1;
            this.ids = [];
            this.multipleSelection = [];
            // this.total = 0;
            this.currentPage = 1;
            this.getDataList();
        },
        handleSelectionChange(list, row) {
            if (list.includes(row)) {
                //勾选时做的事
                this.multipleSelection.push(row);
            } else {
                //取消勾选时做的事
                this.multipleSelection = this.multipleSelection.filter((val) => val.id !== row.id);
            }
            console.log(this.multipleSelection.length);
        },
        getAmount() {
            //重要代码
            this.multipleSelection.forEach((item) => {
                this.ids.push(item.id);
            });
        },
        handleClose() {
            this.dialogVisible = false;
            this.ids = [];
        },
        Zero(num) {
            return num.length < 2 ? '0' + num : num;
        }
    }
};
</script>

<style scoped>
.el-tree.filter-tree::-webkit-scrollbar {
    height: 5px;
    width: 5px;
}

.el-tree.filter-tree::-webkit-scrollbar-track {
    background-color: #ffffff;
    border-radius: 2px;
}

.el-tree.filter-tree::-webkit-scrollbar-thumb {
    background-color: #7a7a7a;
    border-radius: 5px;
}

.el-timeline::-webkit-scrollbar {
    height: 5px;
    width: 5px;
}

.el-timeline::-webkit-scrollbar-track {
    background: #dddddd;
    border-radius: 2px;
}

.el-timeline::-webkit-scrollbar-thumb {
    background-color: #7a7a7a;
    border-radius: 5px;
}
</style>
<style lang="less" scoped>
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

.drawerFrom {
    color: #747b8b;

    .drawer-main {
        padding: 20px;
        border-top: 1px solid #a4a4a4;

        .drawer-card {
            padding: 20px 0;
            border-bottom: 1px solid #a4a4a4;

            .drawer-card-left {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .drawer-card-right {
                display: flex;
                flex-direction: column;
                gap: 10px;
                color: #000000;
            }
        }
    }
}

::v-deep .el-drawer__header {
    margin-bottom: 0;
}

.searchForm {
    .el-form-item {
        margin-right: 2%;
        margin-bottom: 0;
    }

    .timeC {
        .el-date-editor {
            width: 280px;
        }
    }

    .button {

        // width: 300px;
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

    /deep/.el-table th>.cell {
        color: #000;
    }

    /deep/.el-table__row {
        td:nth-child(2) {
            .cell {
                color: #fe1964;
            }
        }

        // td:nth-child(3) {
        //     .cell {
        //         color: #fe1964;
        //     }
        // }
    }
}

::v-deep .records-drawer {
    .el-drawer__header {
        padding-left: 5%;
        font-size: 20px;
        font-weight: 600;
        color: #222;
    }

    .el-drawer__body {
        overflow: hidden;
    }

}

.add-record-box {
    margin: 20px 5% 10px 5%;
}

.record-btn {
    padding: 10px 0 10px 5%;
    border-bottom: 1px solid #f0e2e2;
}

.record-box {
    margin: 20px 0;
}

.record-drawer {
    padding: 0 5% 20px;
    max-height: 80vh;
    overflow-y: scroll;


}

.dialogClass {
    /deep/ .el-input.is-disabled .el-input__inner {
        color: #333333;
        font-size: 15px;
        background-color: #FFFFFF;
    }

    /deep/ .el-input__inner {
        color: #333333;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
    }

    /deep/.el-tree-node__content {
        height: 30px;
    }

    /deep/.el-tree-node__content:hover {}

    /deep/.el-tree-node.is-current {}

    /deep/.el-tree-node__label {
        font-size: 15px;
    }

    /deep/ .is-current .el-tree-node__content {
        background-color: #ffe8f0;
    }
}
</style>
