<template>
    <div v-loading="loadingAll">
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
                        <el-row :gutter="20" type="flex">
                            <el-form-item>
                                <el-input v-model="ruleForm.userId" placeholder="用户ID"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.name" placeholder="客户名称"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="ruleForm.phone" placeholder="手机号"
                                    :style="{ width: '180px' }"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker style="border-radius:8px" v-model="timeArray" :clearable="false"
                                    type="datetimerange" range-separator="—" value-format='yyyy-MM-dd HH:mm:ss'
                                    start-placeholder="进入公海池时间开始" end-placeholder="进入公海池时间结束" />
                            </el-form-item>
                            <el-form-item v-if="!isSales">
                                <el-select v-model="ruleForm.isClaims" placeholder="是否已领取">
                                    <el-option v-for="item in optionsIsClaims" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                        <el-row :gutter="20" type="flex" style="margin-top: 20px;">
                            <el-form-item v-if="!isSales">
                                <el-input v-model="filterText" placeholder="归属人(内部名)" :style="{ width: '180px' }"
                                    @focus="showDx"></el-input>
                            </el-form-item>
                            <el-form-item v-if="!isSales">
                                <el-select v-model="ruleForm.customerType" placeholder="客户类型">
                                    <el-option v-for="item in optionsCustomerType" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div class="button" style="display: flex; align-items: center; gap: 15px">
                                <el-button type="primary" @click="searchData" style="margin-left: 20px">查询</el-button>
                                <el-button @click="reset"
                                    style="border: 1px solid #fe1964; color: #fe1964">重置</el-button>
                                <div>已选中：{{ multipleSelection.length }}项</div>
                                <el-button type="primary" @click="_settlement" v-if="!isSales">分配至他人</el-button>
                                <el-button type="primary" @click="importCustomers" v-if="!isSales">导入客户</el-button>
                                <el-button type="primary" @click="exporCustomers" v-if="!isSales">导出数据</el-button>
                                <el-button type="primary" @click="getPoolLogList" v-if="!isSales">操作记录</el-button>
                            </div>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>

            <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0">
                <el-table ref="multipleTable" :row-key="getRowKey" :data="tableData"
                    style="width: 100%; font-size: 14px" v-loading="loading" element-loading-text="加载中，请稍后"
                    tooltip-effect="dark" @select="handleSelectionChange" @select-all="handleSelectAll">
                    <el-table-column type="selection" :reserve-selection="true" width="55" v-if="!isSales"> </el-table-column>
                    <el-table-column prop="name" label="客户名称" align="center" width="120">
                        <template slot-scope="scope">
                            <div @click="openDrawer(scope.row)">{{ scope.row.name }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userId" label="用户ID" align="center" width="120"> </el-table-column>
                    <el-table-column prop="createTime" label="注册时间" align="center" width="120">
                        <template slot-scope="scope">
                            <div>{{ scope.row.createTime ? scope.row.createTime.split(' ')[0] : '--' }}</div>
                        </template></el-table-column>
                    <el-table-column prop="phone" label="手机号" align="center" width="120">
                        <template slot-scope="scope">
                            <div>{{ scope.row.phone.slice(0, 3) + '****' + scope.row.phone.slice(7, 12) }}</div>
                        </template></el-table-column>
                    <el-table-column prop="userSourceOne" label="客户来源（大类）" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="userSourceTwo" label="客户来源（二类）" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="enterTime" label="进入公海池时间" align="center" width="160"> </el-table-column>
                    <el-table-column prop="isClaimsTxt" v-if="!isSales" label="是否已认领" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="claimTime" v-if="!isSales" label="认领时间" align="center" width="160">
                    </el-table-column>
                    <el-table-column prop="intentionLevel" label="意向程度" align="center" width="120"> </el-table-column>
                    <el-table-column prop="maturityLevel" label="客户成熟度" align="center" width=""> </el-table-column>
                    <el-table-column prop="statusTxt" v-if="!isSales" label="状态" align="center" width="120">
                        <template slot-scope="scope">
                            {{ scope.row.labelNameString || '--' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="customerType" v-if="!isSales" label="客户类型" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="currentSalesName" v-if="!isSales" label="归属人（内部名）" align="center"
                        width="120">
                    </el-table-column>
                    <el-table-column prop="previousSalesName" v-if="!isSales" label="前归属人（内部名）" align="center"
                        width="120">
                    </el-table-column>

                    <el-table-column prop="action" label="操作" align="center" width="230" fixed="right">
                        <template slot-scope="scope">
                            <el-button @click="claimCustomers(scope.row)" type="text">认领</el-button>
                            <el-button v-if="$showBtn('crmListFollowRecords')" @click="followRecord(scope.row)"
                                type="text">跟进记录</el-button>
                            <el-button @click="getPoolClaimRecordList(scope.row)" type="text" v-if="!isSales">认领记录</el-button>
                            <el-button @click="liberatePoolCustomer(scope.row)" type="text" v-if="!isSales">释放</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background @size-change="handleSizeChange" @current-change="currentChange"
                    :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total"
                    :current-page.sync="currentPage" style="text-align: right; margin: 40px 20px">
                </el-pagination>
            </el-row>
        </el-card>
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
                <section class="record-drawer" v-if="followRecordList.length > 0">
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
        <!-- 分配客户 -->
        <el-dialog title="分配客户" :visible.sync="dialogVisibleAllocateCustomers" width="30%"
            :before-close="handleCloseAllocateCustomers">
            <el-form label-width="80px">
                <el-form-item label="选择小组">
                    <el-select v-model="formAllocateCustomers.region" placeholder="请选择小组">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择组员">
                    <el-select v-model="formAllocateCustomers.region" placeholder="请选择组员">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseAllocateCustomers">取 消</el-button>
                <el-button type="primary" @click="sureAllocateCustomers">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 导入客户 -->
        <el-dialog title="导入客户" :visible.sync="dialogVisibleImportCustomers" :close-on-click-modal="false" width="800px"
            :before-close="handleCloseImportCustomers">
            <div class="dialog-content" v-loading="picLoading">
                <div class="dialog-box">
                    <div class="gray-line"></div>
                    <div class="upload-box-xxxy">
                        <div class="upload-words">请上传txt文件,大小在60M以内</div>
                        <el-upload accept="*" :action="uploadMorePdf" :headers="uploadHeaders" name="file"
                            :auto-upload="false" ref="upload" :before-upload="beforeAvatarUploadA"
                            :on-success="handleAvatarSuccess4" :limit="1" :on-exceed="handleExceed">
                            <img class="upload-xxxyy"
                                src="https://dowsure.oss-cn-shanghai.aliyuncs.com/miniapp/morfin/images/upload-click.png" />
                        </el-upload>
                    </div>
                    <div class="pic-box" v-if="fileItem && fileItem.id">
                        <div class="pic-item">
                            <a class="left" :href="fileItem.fullPath" target="_blank">
                                <img class="pic"
                                    src="https://dowsure.oss-cn-shanghai.aliyuncs.com/miniapp/morfin/images/little-pic.png" />
                                <div class="words">{{ fileItem.id }}</div>
                            </a>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <a style="text-decoration: underline;display: inline-block;margin-right: 15px;"
                        href="https://dowsure.oss-cn-shanghai.aliyuncs.com/loan/file/20250526/9b77574b-f6c1-4a3b-9f05-df3be779cc25.xlsx"
                        download="客户模板.xlsx">点击下载导入客户模板</a>
                    <el-button type="primary" @click="sureImportCustomers" style="width: 130px;">确认导入</el-button>
                </span>
            </div>
        </el-dialog>
        <!-- 操作记录 -->
        <el-dialog title="操作记录" :visible.sync="dialogVisibleOperationRecord" width="30%"
            :before-close="handleCloseOperationRecord">
            <el-table :data="tableDataOperationRecord" style="width: 100%" v-loading="loadingOperationRecord">
                <el-table-column prop="modifier" label="操作人" width="120" />
                <el-table-column prop="operationType" label="操作类型" width="120" />
                <el-table-column prop="operationTime" label="操作时间" />
            </el-table>
        </el-dialog>
        <!-- 认领记录 -->
        <el-dialog title="认领记录" :visible.sync="dialogVisibleClaimRecord" width="30%"
            :before-close="handleCloseClaimRecord">
            <el-table :data="tableDataClaimRecord" style="width: 100%" v-loading="loadingClaimRecord">
                <el-table-column prop="salesName" label="认领人" width="180" />
                <el-table-column prop="claimTime" label="认领时间" />
            </el-table>
        </el-dialog>
        <!-- 分配至他人 -->
        <el-dialog title="转接客户" :visible.sync="dialogVisible" width="30%" class="dialogClass"
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
                <el-form-item required label="选择转接人"><el-input placeholder="请选择转接人" v-model="filterText"
                        suffix-icon="el-icon-plus" disabled> </el-input></el-form-item>
            </el-form>

            <el-tree class="filter-tree" :data="GroupList" :props="defaultProps" :filter-node-method="filterNode"
                ref="tree" @node-click="handleNodeClick" style="max-height: 200px; overflow-y: scroll">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <div style="display: flex; justify-content: center; align-items: center">
                    <el-button @click="handleClose"
                        style="width: 100px; color: #fe1964; margin-right: 15px; border-color: #fe1964">取 消</el-button>
                    <el-button type="primary" @click="_push" style="width: 100px">确 定</el-button>
                </div>
            </span>
        </el-dialog>
        <!-- 归属人（内部名） -->
        <el-dialog title="归属人（内部名)" :visible.sync="dialogVisibleX" width="30%" class="dialogClass"
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
                <el-form-item required label="选择归属人"><el-input placeholder="请选择归属人" v-model="filterText"
                        suffix-icon="el-icon-plus" disabled> </el-input></el-form-item>
            </el-form>

            <el-tree class="filter-tree" :data="GroupList" :props="defaultProps" :filter-node-method="filterNode"
                ref="tree" @node-click="handleNodeClick" style="max-height: 200px; overflow-y: scroll">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <div style="display: flex; justify-content: center; align-items: center">
                    <el-button @click="handleClose"
                        style="width: 100px; color: #fe1964; margin-right: 15px; border-color: #fe1964">取 消</el-button>
                    <el-button type="primary" @click="_pushX" style="width: 100px">确 定</el-button>
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { batchUserLiquidation } from '@/api/insur';
import moment from 'moment';
import { getFollow, saveFollow, accountInfo, listByGroup, getPoolPage, transferOwner, updateAccount, poolAllocateCustomers, poolImportCustomers, poolLogList, poolClaimRecordList, toGetPoolCustomer, poolExportCustomer, liberatePoolCustomer } from '@/api/crm'; //导入文件
export default {
    name: 'customer-list',
    data() {
        return {
            loadingAll: false,
            timeArray: [],
            fileItem: {},
            uploadHeaders: { token: localStorage.getItem('token') },
            uploadMorePdf: process.env.VUE_APP_BASE_URL + '/lending/customer/pool/import',
            dialogVisibleAllocateCustomers: false,
            formAllocateCustomers: {},
            picLoading: false,
            dialogVisibleImportCustomers: false,
            dialogVisibleOperationRecord: false,
            tableDataOperationRecord: [],
            loadingOperationRecord: false,
            dialogVisibleClaimRecord: false,
            tableDataClaimRecord: [],
            loadingClaimRecord: false,
            statusCn: {
                in_pool: '在池中',
                claimed: '已认领',
                released: '已释放'
            },
            customerTypeCn: {
                VALID: '有效客户',
                INVALID: '无效客户',
            },
            optionsIsClaims: [{
                value: true,
                label: '是'
            }, {
                value: 'false',
                label: '否'
            }],
            optionsCustomerType: [{
                value: 'VALID',
                label: '有效客户'
            }, {
                value: 'INVALID',
                label: '无效客户'
            }],
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
                29: '无效客户',
                19: '其他',

            },
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
                value: '29',
                label: '无效客户'
            },
            {
                value: '19',
                label: '其他'
            }
            ],
            followRecordList: [],
            recordRules: {
                content: [{ required: true, message: '请输入跟进记录内容', trigger: 'blur' }],
                customItem140C: [{ required: true, message: '请选择客户成熟度', trigger: 'change' }],
            },
            isAdd: false,
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
            dialogVisibleX: false,
            drawerVisible: false,
            ruleForm: {
                userId: '', // 手机号
                name: '',
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
            },
            isSales: false, // 是否是销售
            filterPhone: ''
        };
    },
    created() {
        this.isSales = localStorage['role'] == '37' ? true : false;
        this.getDataList();
        this.getListByGroup();
    },
    methods: {
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件`
            );
        },
        beforeAvatarUploadA() {
            this.picLoading = true;
        },
        //上传
        handleAvatarSuccess4(res, file, fileList) {
            this.picLoading = false;
            console.log(1231231231, res)
            if (res.code == 200) {
                if (!res.data) {
                    this.$message.success('上传成功');
                    this.dialogVisibleImportCustomers = false;
                } else {
                    this.$message.error(res.data);
                    return;
                }
            } else {
                this.$message.error(res.message);
            }

        },
        // 导出数据
        async exporCustomers() {
            let base = process.env.VUE_APP_BASE_URL
            const token = localStorage.getItem('token');
            const url = `${base}/lending/customer/pool/export`;
            let that = this;
            const axios = require('axios');
            this.ruleForm.currentSalesId = this.filterNodeId;
            if (this.timeArray.length) {
                this.ruleForm.enterTimeBegin = this.timeArray[0];
                this.ruleForm.enterTimeEnd = this.timeArray[1];
            } else {
                this.ruleForm.enterTimeBegin = '';
                this.ruleForm.enterTimeEnd = '';
            }
            that.loadingAll = true
            axios({
                methods: 'get',
                responseType: 'blob',
                url: url,
                params: this.ruleForm,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    that.loadingAll = false
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `公海池.xlsx`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                    that.isExporting = false;
                })
                .catch((error) => {
                    that.loadingAll = false
                    this.$message.info(error.message);
                });
        },
        // 认领客户
        claimCustomers(item) {
            this.$alert(`确定认领【${item.name}】？`, '认领', {
                confirmButtonText: '确定',
                callback: action => {
                    if (action === 'confirm') {
                        toGetPoolCustomer({ id: item.id }).then((res) => {
                            this.$message.success('认领成功');
                            // 刷新列表
                            this.getDataList();
                        })
                    }
                }
            });
        },
        // 释放客户
        liberatePoolCustomer(item) {
            this.$alert(`确定释放【${item.name}】？`, '释放', {
                confirmButtonText: '确定',
                callback: action => {
                    if (action === 'confirm') {
                        liberatePoolCustomer([item.phone]).then((res) => {
                            this.$message.success('释放成功');
                            // 刷新列表
                            this.getDataList();
                        })
                    }
                }
            });
        },
        // 获取认领记录列表
        getPoolClaimRecordList(item) {
            this.dialogVisibleClaimRecord = true
            this.loadingClaimRecord = true
            poolClaimRecordList({ phone: item.phone }).then((res) => {
                this.tableDataClaimRecord = res.data;
                this.loadingClaimRecord = false
            }).catch(() => {
                this.loadingClaimRecord = false
            });
        },
        // 关闭认领记录弹窗
        handleCloseClaimRecord() {
            this.dialogVisibleClaimRecord = false
        },
        // 获取操作记录列表
        getPoolLogList() {
            this.dialogVisibleOperationRecord = true
            this.loadingOperationRecord = true
            poolLogList().then((res) => {
                this.tableDataOperationRecord = res.data;
                if (this.tableDataOperationRecord.length > 0) {
                    this.tableDataOperationRecord.forEach(item => {
                        item.operationType = item.operationType == 'import' ? '导入客户' : '导出数据'
                    })
                }
                this.loadingOperationRecord = false
            }).catch(() => {
                this.loadingOperationRecord = false
            });
        },
        // 关闭操作记录弹窗
        handleCloseOperationRecord() {
            this.dialogVisibleOperationRecord = false
        },
        // 关闭导入客户弹窗
        handleCloseImportCustomers() {
            this.dialogVisibleImportCustomers = false
            this.fileItem = {}
        },
        // 导入客户
        importCustomers() {
            this.dialogVisibleImportCustomers = true
        },
        // 确认导入客户
        sureImportCustomers() {
            this.$refs.upload.submit();
        },
        // 关闭分配客户弹窗
        handleCloseAllocateCustomers() {
            this.handleCloseAllocateCustomers = false
            this.formAllocateCustomers = {}
        },
        // 确定分配客户
        sureAllocateCustomers() {
            poolAllocateCustomers({ ...this.formAllocateCustomers, "loginId": this.loginUser }).then((res) => {
                this.$message.success('分配成功')
                // 关闭分配客户弹窗
                this.handleCloseAllocateCustomers()
                this.getDataList()
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
                this.filterPhone = data.phone;
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
                this.ruleForm.currentSalesId = this.filterNodeId;
                await getPoolPage(this.ruleForm).then((res) => {
                    if (res.code === 200) {
                        res.data.records.forEach((item) => {
                            const exists = this.multipleSelection.some((selectedItem) => selectedItem.id === item.id);
                            if (!exists) {
                                this.multipleSelection.push(item);
                            }
                        });
                    }
                });
                // await this.getDataList();
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
        _pushX() {
            if (!this.filterNodeId) {
                return this.$message.warning('请选择归属人！');
            }
            this.dialogVisibleX = false;
        },
        _push() {
            if (this.ids.length === 0) {
                return this.$message.warning('请先勾选！');
            }
            if (!this.filterPhone) {
                return this.$message.warning('请选择转接人！');
            }
            poolAllocateCustomers({
                ids: this.ids,
                ownerPhone: this.filterPhone
            }).then((res) => {
                if (res.data) {
                    return this.$message.error(res.data);
                } else {
                    this.$message.success('操作成功！');
                    this.dialogVisible = false;
                    this.getDataList();
                    this.ids = [];
                    this.multipleSelection = [];
                    this.handleClose()
                }

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
            this.loading = true;
            this.ruleForm.currentSalesId = this.filterNodeId;
            if (this.timeArray.length) {
                this.ruleForm.enterTimeBegin = this.timeArray[0];
                this.ruleForm.enterTimeEnd = this.timeArray[1];
            } else {
                this.ruleForm.enterTimeBegin = '';
                this.ruleForm.enterTimeEnd = '';
            }
            getPoolPage(this.ruleForm).then((res) => {
                this.loading = false;
                if (res.code === 200) {
                    this.$refs.multipleTable.clearSelection();
                    this.tableData = res.data.records;
                    if (this.tableData.length > 0) {
                        this.tableData.forEach((item) => {
                            item.statusTxt = this.statusCn[item.status];
                            item.customerTypeTxt = this.customerTypeCn[item.customerType];
                            item.isClaimsTxt = item.isClaims ? '是' : '否';
                            item.labelNameString = item.labelNames.join(', ');
                        });
                    }
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
            }).catch(() => {
                this.loading = false;
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList();
        },
        handleSizeChange(val) {
            console.log(val);
            this.ruleForm.size = val;
            this.ruleForm.current = 1;
            this.currentPage = 1;
            this.getDataList();
        },
        reset() {
            this.ruleForm = {}
            this.filterText = '';
            this.filterNodeId = '';
            this.filterPhone = '';
            this.ruleForm.current = 1;
            this.ruleForm.size = 10;
            this.ids = [];
            this.multipleSelection = [];
            // this.total = 0;
            this.currentPage = 1;
            this.$refs['ruleForm'].resetFields();
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
        showDx() {
            this.dialogVisibleX = true;
            this.ids = [];
            this.filterText = '';
            this.filterNodeId = '';
            this.filterPhone = '';
        },
        handleClose() {
            this.dialogVisible = false;
            this.dialogVisibleX = false;
            this.ids = [];
            this.filterText = '';
            this.filterNodeId = '';
            this.filterPhone = '';
        },
        Zero(num) {
            return num.length < 2 ? '0' + num : num;
        }
    }
};
</script>

<style lang='less' scoped>
.dialog-content {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .dialog-box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 700px;

        .gray-line {
            width: 100%;
            height: 1px;
            background: #E2E2E2;
        }

        .yellow-box {
            width: 100%;
            height: 35px;
            flex-shrink: 0;
            border-radius: 8px;
            background: #FFFAEE;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 20px;
            margin-top: 20px;

            .left {
                .one {
                    color: #FA8C26;
                    font-size: 14px;
                    font-weight: 500;
                }

                .two {
                    color: #967249;
                    font-size: 14px;
                    font-weight: 400;
                    margin-top: 12px;
                }
            }
        }

        .upload-box-xxxy {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            height: 170px;
            flex-shrink: 0;
            border-radius: 8px;
            opacity: 0.8;
            background: #F3F6FF;
            margin-top: 20px;

            .upload-words {
                color: var(--kuashangbao-Typography, #333);
                font-size: 16px;
                font-weight: 500;
            }

            .upload-xxxyy {
                width: 334px;
                height: 51px;
                margin-top: 16px;
            }

            .upload-btn {
                margin-top: 16px;
                display: flex;
                width: 334px;
                height: 51px;
                padding: 13px 0px;
                justify-content: center;
                align-items: center;
                flex-shrink: 0;
                border-radius: 8px;
                border: 2px dashed var(--kuashangbao-blue, #1463FF);
                opacity: 0.8;
                color: var(--tab, #1F5BFF);
                font-size: 17.5px;
                font-weight: 600;
                cursor: pointer;
            }
        }

        .pic-box {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: column;
            width: 100%;
            height: 180px;
            overflow: auto;
            margin: 20px 0;

            .pic-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: 40px;
                flex-shrink: 0;
                border-radius: 8px;
                border-radius: 6px;
                border: 1px solid #D1D8E7;
                padding: 0 20px;
                margin-top: 10px;

                .left {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    cursor: pointer;

                    .pic {
                        height: 24px;
                        margin-right: 6px;
                    }

                    .words {
                        color: #203B87;
                        font-size: 13px;
                        font-weight: 400;
                    }
                }

                .delete {
                    height: 16px;
                    cursor: pointer;
                }
            }
        }
    }

    .dialog-footer {
        float: right;
        margin-top: 20px;

        .back-btn {
            width: 124px;
            height: 44px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            border-radius: 6px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            border-radius: 6px;
            background: var(--kuashangbao-blue, linear-gradient(90deg, #1463FF 0%, #7214FF 100%));
            line-height: 44px;
            color: #FFF;
            cursor: pointer;
        }
    }
}
</style>
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
</style>
