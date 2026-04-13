<template>
    <div>
        <!-- 面包屑导航 -->
        <div style="display:flex; align-items: center; justify-content: space-between; padding:18px">
            <div style="display:flex; align-items: center;">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt="" />豆沙包
                /
            </div>
            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">营销活动配置</span>
            </div>
            <!-- 右上角创建活动按钮 -->
            <el-button 
                type="primary" 
                size="medium"
                style="background-color: #F40064; border-color: #F40064; border-radius: 6px;"
                @click="handleCreate"
            >
                创建活动
            </el-button>
        </div>

        <!-- 自定义搜索区域 -->
        <div class="search-container">
            <el-form :inline="true" class="search-form">
                <!-- 第一行 -->
                <div class="search-row">
                    <el-form-item label="活动名称">
                        <el-input 
                            v-model="searchForm.activityName" 
                            placeholder="请输入活动名称"
                            style="width: 180px;"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item label="活动编号">
                        <el-input 
                            v-model="searchForm.activityCode" 
                            placeholder="请输入活动编号"
                            style="width: 180px;"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item label="产品类型">
                        <el-select 
                            v-model="searchForm.productType" 
                            placeholder="请选择产品类型"
                            style="width: 180px;"
                            clearable
                        >
                            <el-option label="信贷" value="LENDING" />
                            <!-- <el-option label="保险" value="insurance" /> 暂时不需要 -->
                            <!-- <el-option label="理财" value="wealth" /> 暂时不需要 -->
                            <!-- <el-option label="综合服务" value="comprehensive" /> 暂时不需要 -->
                            <!-- <el-option label="支付" value="payment" /> 暂时不需要 -->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="融资产品">
                        <el-select 
                            v-model="searchForm.financingProduct" 
                            placeholder="请选择融资产品"
                            style="width: 180px;"
                            filterable
                            clearable
                        >
                            <el-option label="MCA" value="MCA" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <el-date-picker
                                v-model="searchForm.startTime"
                                type="datetime"
                                placeholder="开始时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                style="width: 150px;"
                            />
                            <span style="color: #999;">—</span>
                            <el-date-picker
                                v-model="searchForm.endTime"
                                type="datetime"
                                placeholder="结束时间"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                style="width: 150px;"
                            />
                        </div>
                    </el-form-item>
                </div>
                
                <!-- 第二行 -->
                <div class="search-row">
                    <el-form-item label="优惠对象">
                        <el-select 
                            v-model="searchForm.discountObject" 
                            placeholder="请选择优惠对象"
                            style="width: 160px;"
                            clearable
                        >
                            <el-option label="手续费" value="fee" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="优惠形式">
                        <el-select 
                            v-model="searchForm.discountForm" 
                            placeholder="请选择优惠形式"
                            style="width: 160px;"
                            clearable
                        >
                            <el-option label="折扣" value="discount" />
                            <!-- <el-option label="直减" value="direct_reduction" /> 暂时不需要 -->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动状态">
                        <el-select 
                            v-model="searchForm.activityStatus" 
                            placeholder="请选择活动状态"
                            style="width: 160px;"
                            clearable
                        >
                            <el-option label="草稿" value="draft" />
                            <el-option label="已上线" value="online" />
                            <el-option label="已下线" value="offline" />
                            <el-option label="已结束" value="ended" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input 
                            v-model="searchForm.creator" 
                            placeholder="请输入创建人"
                            style="width: 160px;"
                            clearable
                        />
                    </el-form-item>
                    <!-- 搜索按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                        <el-button @click="handleReset">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <!-- 使用自定义表格组件 -->
        <div class="table-container">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="index" label="序号" width="80" align="center" />
                <el-table-column prop="activityName" label="活动名称" width="200" show-overflow-tooltip />
                <el-table-column prop="activityCode" label="活动编号" width="120" />
                <el-table-column prop="productType" label="产品类型" width="100" />
                <el-table-column prop="productName" label="产品名称" width="100" />
                <el-table-column prop="startTime" label="开始时间" width="150" />
                <el-table-column prop="endTime" label="结束时间" width="150" />
                <el-table-column prop="discountObject" label="优惠对象" width="100" />
                <el-table-column prop="discountForm" label="优惠形式" width="100" />
                <el-table-column prop="creator" label="创建人" width="100" />
                <el-table-column prop="createTime" label="创建时间" width="150" />
                <el-table-column prop="activityStatus" label="活动状态" width="100" />
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <!-- 两行六个按钮布局 -->
                        <div class="operation-buttons-two-rows">
                            <div class="operation-row">
                                <span class="operation-btn" @click="handleViewDetail(scope.row)">查看</span>
                                <span class="operation-divider">|</span>
                                <span class="operation-btn" @click="handleEditActivity(scope.row)">编辑</span>
                                <span class="operation-divider">|</span>
                                <span class="operation-btn" @click="handleOnlineActivity(scope.row)">上线</span>
                                <span class="operation-divider">|</span>
                                <span class="operation-btn" @click="handleOfflineActivity(scope.row)">下线</span>
                            </div>
                            <div class="operation-row">
                                <span class="operation-btn" @click="handleCreatePool(scope.row)">创建领取池</span>
                                <span class="operation-divider">|</span>
                                <!-- <span class="operation-btn" @click="handleBatchIssue(scope.row)">运营批量发放</span>
                                <span class="operation-divider">|</span> -->
                                <span class="operation-btn" @click="handleDistributionRecord(scope.row)">发放记录</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- 分页 -->
            <div style="padding: 24px; background-color: #fff; display: flex; justify-content: flex-end;">
                <el-pagination 
                    background 
                    layout="prev, pager, next" 
                    :current-page="currentPage" 
                    :total="totalSize"
                    :page-size="pageSize"
                    @current-change="handlePageChange" 
                />
            </div>
        </div>

        <!-- 营销活动表单弹窗 -->
        <el-dialog 
            :title="dialogTitle" 
            :visible.sync="dialogVisible" 
            width="80%" 
            :before-close="handleDialogClose"
            :close-on-click-modal="false"
        >
            <div class="marketing-activity-form">
                <!-- 表单区域 -->
                <div style="background-color: #fff; border-radius: 20px; padding: 24px;">
                    <!-- 状态提示信息 -->
                    <div v-if="!canEditActivity && !isViewMode" class="edit-disabled-alert">
                        <el-alert
                            :title="getEditDisabledMessage"
                            type="warning"
                            :closable="false"
                            show-icon
                            style="margin-bottom: 20px;">
                        </el-alert>
                    </div>
                    
                    <el-form 
                        :model="formData" 
                        :rules="formRules" 
                        ref="activityForm" 
                        label-width="120px"
                        :disabled="isViewMode || !canEditActivity"
                    >
                        <!-- 基本规则 -->
                        <div class="form-section">
                            <h3 class="section-title">基本规则</h3>
                            
                            <el-form-item label="营销活动名称" prop="activityName">
                                <el-input 
                                    v-model="formData.activityName" 
                                    placeholder="请输入营销活动名称"
                                    style="width: 400px;"
                                />
                            </el-form-item>
                            
                            <!-- <el-form-item label="营销活动编号" prop="activityCode">
                                <el-input 
                                    v-model="formData.activityCode" 
                                    placeholder="系统自动生成"
                                    :disabled="true"
                                    style="width: 400px;"
                                />
                                <div class="form-tip">生成规则：YXYH+年月日时分秒</div>
                            </el-form-item> -->
                            
                            <el-form-item label="产品类型" prop="productType">
                                <el-select 
                                    v-model="formData.productType" 
                                    placeholder="请选择产品类型"
                                    style="width: 400px;"
                                >
                                    <el-option label="信贷" value="LENDING" />
                                </el-select>
                            </el-form-item>
                            
                            <el-form-item label="产品名称" prop="productName">
                                <el-select 
                                    v-model="formData.productName" 
                                    placeholder="请选择产品名称"
                                    multiple
                                    filterable
                                    allow-create
                                    style="width: 400px;"
                                >
                                    <el-option label="MCA" value="MCA" />
                                </el-select>
                                <div class="form-tip">可多选，也可手动输入进行模糊搜索</div>
                            </el-form-item>
                            
                            <el-form-item label="活动开始时间" prop="startTime">
                                <el-date-picker
                                    v-model="formData.startTime"
                                    type="datetime"
                                    placeholder="选择开始时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    style="width: 400px;"
                                />
                            </el-form-item>
                            
                            <el-form-item label="活动结束时间" prop="endTime">
                                <el-date-picker
                                    v-model="formData.endTime"
                                    type="datetime"
                                    placeholder="选择结束时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    style="width: 400px;"
                                />
                            </el-form-item>
                            
                            <!-- 优惠总次数字段已移除，接口不再支持此字段 -->
                            
                            <el-form-item label="优惠对象" prop="discountObject">
                                <el-select 
                                    v-model="formData.discountObject" 
                                    placeholder="请选择优惠对象"
                                    style="width: 400px;"
                                >
                                    <el-option label="手续费" value="fee" />
                                </el-select>
                            </el-form-item>
                            
                            <el-form-item label="优惠形式" prop="discountForm">
                                <el-select 
                                    v-model="formData.discountForm" 
                                    placeholder="请选择优惠形式"
                                    style="width: 400px;"
                                    @change="handleDiscountFormChange"
                                >
                                    <el-option label="折扣" value="discount" />
                                </el-select>
                            </el-form-item>
                            
                            <!-- 折扣设置 -->
                            <el-form-item 
                                v-if="formData.discountForm === 'discount'" 
                                label="折扣优惠" 
                                prop="discountValue"
                            >
                                <div style="display: flex; align-items: center;">
                                    <span style="margin-right: 10px;">折扣优惠</span>
                                    <el-input 
                                        v-model="formData.discountValue" 
                                        placeholder="请输入折扣比例"
                                        type="number"
                                        style="width: 100px;"
                                        :max="100"
                                        :min="0"
                                    />
                                    <span style="margin-left: 10px;">%</span>
                                </div>
                                <div class="form-tip">如优惠10%，即为打9折</div>
                            </el-form-item>
                            
                            <el-form-item label="优惠兑付方式" prop="paymentMethod">
                                <el-select 
                                    v-model="formData.paymentMethod" 
                                    placeholder="请选择优惠兑付方式"
                                    style="width: 400px;"
                                >
                                    <el-option label="立减" value="instant_reduction" />
                                </el-select>
                                <div class="form-tip">如勾选"立减"，则活动上线后在客户端生成"立减券"</div>
                            </el-form-item>
                        </div>

                        <!-- 优惠领取规则 -->
                        <div class="form-section">
                            <h3 class="section-title">优惠领取规则</h3>
                            
                            <!-- 优惠领取时间字段已移除 -->
                            
                            <el-form-item label="领取范围">
                                <el-select 
                                    v-model="formData.receiveScope" 
                                    placeholder="请选择领取范围"
                                    multiple
                                    style="width: 400px;"
                                    clearable
                                >
                                    <el-option label="新客" value="new_customer">
                                        <span>新客</span>
                                        <div class="option-desc">新注册成功的手机号，且没有任何放款记录的客户</div>
                                    </el-option>
                                    <el-option label="续贷" value="renewal">
                                        <span>续贷</span>
                                        <div class="option-desc">存量已经有任一贷款产品放款记录的客户</div>
                                    </el-option>
                                    <el-option label="裂变" value="fission">
                                        <span>裂变</span>
                                        <div class="option-desc">通过裂变活动获得优惠资格的客户</div>
                                    </el-option>
                                </el-select>
                                <div class="form-tip">非必填项，如勾选则进行控制，如不勾选则不控制该项</div>
                            </el-form-item>
                            
                            <el-form-item label="单客领取次数">
                                <el-input 
                                    v-model="formData.singleCustomerLimit" 
                                    placeholder="默认1次"
                                    type="number"
                                    style="width: 400px;"
                                    :min="1"
                                />
                                <div class="form-tip">控制单客一共可以领取的次数，默认1次</div>
                            </el-form-item>
                        </div>

                        <!-- 投放位置规则 -->
                        <div class="form-section">
                            <h3 class="section-title">投放位置规则</h3>
                            
                            <el-form-item label="投放位置" prop="deploymentPosition">
                                <el-select 
                                    v-model="formData.deploymentPosition" 
                                    placeholder="请选择投放位置"
                                    multiple
                                    style="width: 400px;"
                                >
                                    <el-option label="MCA小程序优惠领取位置" value="mca_miniprogram" />
                                    <el-option label="MCA电脑端优惠领取位置" value="mca_web" />
                                </el-select>
                                <div class="form-tip">必填项，支持多选。该字段明确优惠露出的位置</div>
                            </el-form-item>
                            
                            <el-form-item label="优惠名称" prop="couponName">
                                <el-input 
                                    v-model="formData.couponName" 
                                    placeholder="请输入优惠名称，如：提前收款产品免息券"
                                    style="width: 400px;"
                                />
                                <div class="form-tip">必填项，即券的名称，如"提前收款产品免息券"</div>
                            </el-form-item>
                            
                            <el-form-item label="对客文案展示">
                                <el-input 
                                    v-model="formData.customerDisplayText" 
                                    type="textarea"
                                    :rows="3"
                                    placeholder="请输入面向客户展示的优惠文案"
                                    style="width: 400px;"
                                />
                                <div class="form-tip">用于在投放位置向客户展示的优惠说明文案</div>
                            </el-form-item>
                        </div>

                        <!-- 优惠使用规则 -->
                        <div class="form-section">
                            <h3 class="section-title">优惠使用规则</h3>
                            
                            <el-form-item label="优惠使用开始时间">
                                <el-date-picker
                                    v-model="formData.useStartTime"
                                    type="datetime"
                                    placeholder="选择使用开始时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    style="width: 400px;"
                                />
                                <div class="form-tip">控制优惠使用的开始时间，非必填</div>
                            </el-form-item>
                            
                            <el-form-item label="优惠使用结束时间">
                                <el-date-picker
                                    v-model="formData.useEndTime"
                                    type="datetime"
                                    placeholder="选择使用结束时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    style="width: 400px;"
                                />
                                <div class="form-tip">控制优惠使用的结束时间，非必填</div>
                            </el-form-item>
                        </div>

                        <!-- 投放人群规则 -->
                        <div class="form-section">
                            <h3 class="section-title">投放人群规则</h3>
                            <div class="placeholder-content">
                                <p>此部分功能待开发...</p>
                            </div>
                        </div>

                        <!-- 操作按钮 -->
                        <div class="form-actions" v-if="!isViewMode && canEditActivity">
                            <el-button @click="handleCancel">取消</el-button>
                            <el-button type="primary" @click="handleSave">保存</el-button>
                        </div>
                        
                        <div class="form-actions" v-else>
                            <el-button @click="handleDialogClose">返回</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-dialog>

        <!-- 创建领取池弹窗 -->
        <el-dialog 
            title="创建领取池" 
            :visible.sync="poolDialogVisible" 
            width="500px"
            :close-on-click-modal="false"
        >
            <el-form 
                :model="poolFormData" 
                :rules="poolFormRules" 
                ref="poolForm" 
                label-width="120px"
            >
                <el-form-item label="活动名称">
                    <el-input 
                        v-model="poolFormData.activityName" 
                        disabled
                        style="width: 300px;"
                    />
                </el-form-item>
                
                <el-form-item label="总数量" prop="totalQuantity">
                    <el-input 
                        v-model="poolFormData.totalQuantity" 
                        placeholder="请输入总数量"
                        type="number"
                        :min="1"
                        style="width: 300px;"
                    />
                    <div class="form-tip">请输入要创建的优惠券总数量</div>
                </el-form-item>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="handlePoolDialogClose">取消</el-button>
                <el-button type="primary" @click="handlePoolConfirm">确定</el-button>
    </div>
        </el-dialog>

        <!-- 发放记录弹窗 -->
        <el-dialog 
            title="发放记录" 
            :visible.sync="distributionDialogVisible" 
            width="80%"
            :close-on-click-modal="false"
        >
            <div style="margin-bottom: 16px;">
                <span style="font-weight: 500; color: #333;">活动名称：{{ distributionActivityName }}</span>
            </div>
            
            <el-table :data="distributionList" style="width: 100%" v-loading="distributionLoading">
                <el-table-column prop="batchNo" label="批次号" width="200" />
                <el-table-column prop="issueType" label="发放类型" width="100">
                    <template slot-scope="scope">
                        {{ mapIssueType(scope.row.issueType) }}
                    </template>
                </el-table-column>
                <el-table-column prop="targetCustomerType" label="目标客户" width="100">
                    <template slot-scope="scope">
                        {{ mapTargetCustomerType(scope.row.targetCustomerType) }}
                    </template>
                </el-table-column>
                <el-table-column prop="plannedQuantity" label="计划数量" width="100" />
                <el-table-column prop="actualQuantity" label="实际数量" width="100" />
                <el-table-column prop="claimedQuantity" label="已领取数量" width="120" />
                <el-table-column prop="status" label="状态" width="100">
                    <template slot-scope="scope">
                        <span :class="getStatusClass(scope.row.status)">
                            {{ mapDistributionStatus(scope.row.status) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="releaseTime" label="发放时间" width="150" />
                <el-table-column prop="createTime" label="创建时间" width="150" />
                <el-table-column prop="remark" label="备注" min-width="120" show-overflow-tooltip />
            </el-table>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleDistributionDialogClose">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import TablePage from '../../common/tablePage.vue';
import { getMarketingActivityList, getLenderList, operateMarketingActivity, getMarketingActivityDetail, createPool, getDistributionList, batchIssue } from '@/api/marketing.js';

export default {
    name: 'marketing-activity-list',
    components: {
        TablePage
    },
    data() {
        return {
            // 分页相关
            currentPage: 1,
            pageSize: 10,
            totalSize: 0,
            
            // 弹窗相关
            dialogVisible: false,
            currentActivityId: null,
            currentMode: 'create', // create, edit, view
            
            // 领取池弹窗相关
            poolDialogVisible: false,
            currentPoolActivityId: null,
            poolFormData: {
                activityName: '',
                totalQuantity: ''
            },
            poolFormRules: {
                totalQuantity: [
                    { required: true, message: '请输入总数量', trigger: 'blur' },
                    { 
                        validator: (rule, value, callback) => {
                            const numValue = parseInt(value);
                            if (!value || value === '') {
                                callback(new Error('请输入总数量'));
                            } else if (!/^\d+$/.test(value)) {
                                callback(new Error('总数量只能输入正整数'));
                            } else if (numValue < 1) {
                                callback(new Error('总数量必须大于0'));
                            } else {
                                callback();
                            }
                        }, 
                        trigger: 'blur' 
                    }
                ]
            },
            
            // 发放记录弹窗相关
            distributionDialogVisible: false,
            currentDistributionActivityId: null,
            distributionActivityName: '',
            distributionList: [],
            distributionLoading: false,
            
            // 搜索表单数据
            searchForm: {
                activityName: '',
                activityCode: '',
                productType: '',
                financingProduct: '',
                startTime: '',  // 改为独立的时间字段
                endTime: '',    // 改为独立的时间字段
                discountObject: '',
                discountForm: '',
                activityStatus: '',
                creator: ''
            },
            
            // 表格数据 - 从API获取
            tableData: [],
            
            // 放贷机构列表
            lenderList: [],
            
            // 搜索筛选配置 - 优化排版，按重要性和使用频率排序
            filterOptions: [
                // 第一行：最常用的搜索条件
                {
                    label: '活动名称',
                    type: 'input',
                    placeholder: '请输入活动名称',
                    value: ''
                },
                {
                    label: '活动编号',
                    type: 'input',
                    placeholder: '请输入活动编号',
                    value: ''
                },
                {
                    label: '产品类型',
                    type: 'select',
                    placeholder: '请选择产品类型',
                    value: '',
                    options: [
                        { label: '信贷', value: 'LENDING' }
                    ]
                },
                {
                    label: '融资产品',
                    type: 'select',
                    placeholder: '请选择融资产品',
                    filterable: true,
                    value: '',
                    options: [
                        { label: 'MCA', value: 'MCA' }
                    ]
                },
                // 第二行：时间和状态筛选
                {
                    label: '时间',
                    type: 'datetimerange',
                    placeholder: '选择时间范围',
                    value: '',
                    valueFormat: 'yyyy-MM-dd HH:mm:ss'
                },
                {
                    label: '优惠对象',
                    type: 'select',
                    placeholder: '请选择优惠对象',
                    value: '',
                    options: [
                        { label: '手续费', value: 'fee' }
                    ]
                },
                {
                    label: '优惠形式',
                    type: 'select',
                    placeholder: '请选择优惠形式',
                    value: '',
                    options: [
                        { label: '折扣', value: 'discount' },
                        // { label: '直减', value: 'direct_reduction' } // 暂时不需要
                    ]
                },
                {
                    label: '活动状态',
                    type: 'select',
                    placeholder: '请选择活动状态',
                    value: '',
                    options: [
                        { label: '草稿', value: 'draft' },
                        { label: '已上线', value: 'online' },
                        { label: '已下线', value: 'offline' },
                        { label: '已结束', value: 'ended' }
                    ]
                },
                // 第三行：其他辅助筛选条件
                {
                    label: '创建人',
                    type: 'input',
                    placeholder: '请输入创建人',
                    value: ''
                }
            ],
            
            
            // 表单数据
            formData: {
                // 基本规则
                activityName: '',
                activityCode: '',
                productType: '',
                productName: [],
                startTime: '',
                endTime: '',
                discountObject: '',
                discountForm: '',
                discountValue: '',
                paymentMethod: '', // 新增：优惠兑付方式
                
                // 优惠领取规则
                receiveScope: [],
                singleCustomerLimit: '1', // 新增：单客领取次数，默认1次
                
                // 投放位置规则
                deploymentPosition: [],
                couponName: '', // 优惠名称（对应接口的discountName字段）
                customerDisplayText: '',
                
                // 优惠使用规则
                useStartTime: '',
                useEndTime: ''
            },
            
            // 表单验证规则
            formRules: {
                activityName: [
                    { required: true, message: '请输入营销活动名称', trigger: 'blur' }
                ],
                // activityCode: [
                //     { required: true, message: '营销活动编号不能为空', trigger: 'blur' }
                // ],
                productType: [
                    { required: true, message: '请选择产品类型', trigger: 'change' }
                ],
                productName: [
                    { required: true, message: '请选择产品名称', trigger: 'change' }
                ],
                startTime: [
                    { required: true, message: '请选择活动开始时间', trigger: 'change' }
                ],
                endTime: [
                    { required: true, message: '请选择活动结束时间', trigger: 'change' }
                ],
                discountObject: [
                    { required: true, message: '请选择优惠对象', trigger: 'change' }
                ],
                discountForm: [
                    { required: true, message: '请选择优惠形式', trigger: 'change' }
                ],
                discountValue: [
                    { required: true, message: '请输入折扣比例', trigger: 'blur' },
                    { 
                        validator: (rule, value, callback) => {
                            const numValue = parseFloat(value);
                            if (!(/^\d+$/.test(value) && value !== '')) {
                                callback(new Error('折扣比例只能输入数字'));
                            } else if (numValue < 0 || numValue > 100) {
                                callback(new Error('折扣比例必须在0-100之间'));
                            } else {
                                callback();
                            }
                        }, 
                        trigger: 'blur' 
                    }
                ],
                paymentMethod: [
                    { required: true, message: '请选择优惠兑付方式', trigger: 'change' }
                ],
                
                // 优惠领取规则验证（时间字段已移除）
                
                // 投放位置规则验证
                deploymentPosition: [
                    { required: true, message: '请选择投放位置', trigger: 'change' }
                ],
                couponName: [
                    { required: true, message: '请输入优惠名称', trigger: 'blur' }
                ]
            }
        };
    },
    
    computed: {
        dialogTitle() {
            const titleMap = {
                create: '创建营销活动',
                edit: '编辑营销活动', 
                view: '查看营销活动'
            };
            return titleMap[this.currentMode] || '营销活动';
        },
        
        isViewMode() {
            return this.currentMode === 'view';
        },
        isEditMode() {
            return this.currentMode === 'edit';
        },
        
        // 判断活动是否可以编辑
        canEditActivity() {
            if (this.isViewMode) return false;
            
            // 获取当前编辑的活动状态
            const currentActivity = this.tableData.find(item => item.id === this.currentActivityId);
            if (!currentActivity) return true; // 新建活动可以编辑
            
            const status = currentActivity.activityStatus;
            // 已上线、已结束、已下线状态不可编辑
            return !['已上线', '已结束', '已下线'].includes(status);
        },
        
        // 获取不可编辑的提示信息
        getEditDisabledMessage() {
            const currentActivity = this.tableData.find(item => item.id === this.currentActivityId);
            if (!currentActivity) return '';
            
            const status = currentActivity.activityStatus;
            if (status === '已上线') {
                return '活动已上线，不可编辑';
            } else if (status === '已结束') {
                return '活动已结束，不可编辑';
            } else if (status === '已下线') {
                return '活动已下线，不可编辑';
            }
            return '';
        }
    },
    
    mounted() {
        this.loadData();
        this.loadLenderList();
    },
    
    methods: {
        // 加载数据
        async loadData() {
            try {
                // 构建查询参数
                const params = this.buildQueryParams();
                
                console.log('请求参数:', params);
                
                // 直接使用参数，让axios正确处理数组
                const response = await getMarketingActivityList(params);
                
                console.log('接口返回数据:', response);
                
                // 处理后端返回的数据
                this.handleApiResponse(response);
                
            } catch (error) {
                console.error('获取营销活动列表失败:', error);
                this.$message.error('获取数据失败，请稍后重试');
                
                // 出错时清空表格
                this.tableData = [];
                this.totalSize = 0;
            }
        },
        
        // 加载放贷机构列表
        async loadLenderList() {
            try {
                const response = await getLenderList();
                console.log('lender接口返回数据:', response);
                
                // 处理后端返回的lender数据
                if (response && response.data) {
                    // 根据实际返回的数据结构来处理
                    if (Array.isArray(response.data)) {
                        this.lenderList = response.data;
                    } else if (response.data.list || response.data.records) {
                        this.lenderList = response.data.list || response.data.records || [];
                    } else {
                        this.lenderList = [];
                    }
                    console.log('处理后的lender列表:', this.lenderList);
                } else {
                    this.lenderList = [];
                }
                
            } catch (error) {
                console.error('获取放贷机构列表失败:', error);
                this.lenderList = [];
            }
        },
        
        // 处理API返回的数据
        handleApiResponse(response) {
            try {
                // 验证数据结构：data.records
                if (!response || !response.data || !response.data.records) {
                    console.warn('无效的数据格式:', response);
                    this.tableData = [];
                    this.totalSize = 0;
                    return;
                }
                
                const records = response.data.records;
                const total = response.data.total || records.length;
                
                // 映射真实数据字段到表格显示字段
                this.tableData = records.map((item, index) => {
                    return {
                        // 保留原始字段和数据
                ...item,
                        // 表格显示映射
                        index: (this.currentPage - 1) * this.pageSize + index + 1,
                        // 字段映射（根据真实数据结构）
                        activityName: item.name,
                        activityCode: item.code,
                        startTime: item.activityStartTime, // 修正：使用activityStartTime
                        endTime: item.activityEndTime,     // 修正：使用activityEndTime
                        createTime: item.createTime,
                        activityStatus: this.mapStatusToDisplay(item.status),
                        creator: item.creator || item.createUser || '',
                        discountObject: this.mapDiscountTargetToDisplay(item.discountTarget), // 修正：映射优惠对象显示
                        discountForm: this.mapDiscountTypeToDisplay(item.discountType),       // 修正：映射优惠形式显示
                        productType: this.mapProductType(item.productType),
                        productName: this.mapLenderNames(item.lenderNames)
                    };
                });
                
                this.totalSize = total;
                
                console.log('处理后的表格数据:', this.tableData);
                console.log('总数量:', this.totalSize);
                
            } catch (error) {
                console.error('处理API数据时出错:', error);
                this.tableData = [];
                this.totalSize = 0;
            }
        },
        
        // 状态码映射到显示状态
        mapStatusToDisplay(status) {
            const statusMap = {
                'CREATE': '创建',
                'DRAFT': '草稿',
                'ONLINE': '已上线',
                'OFFLINE': '已下线', 
                'FINISHED': '已结束'
            };
            return statusMap[status] || status || '未知';
        },
        
        // 优惠类型映射到显示 - 旧方法（保留兼容性）
        mapDiscountType(discountType) {
            const typeMap = {
                'DISCOUNT': '折扣',
                'FEE_RATE_REDUCTION': '费率减免',
                'FIXED_AMOUNT_REDUCTION': '固定金额减免'
            };
            return typeMap[discountType] || discountType || '';
        },
        
        // 优惠类型映射到显示 - 新方法（处理discountType对象）
        mapDiscountTypeToDisplay(discountType) {
            // 如果discountType是对象，取type字段
            const type = typeof discountType === 'object' ? discountType.type : discountType;
            const typeMap = {
                'DISCOUNT': '折扣',
                'FEE_RATE_REDUCTION': '费率减免',
                'FIXED_AMOUNT_REDUCTION': '固定金额减免'
            };
            return typeMap[type] || type || '';
        },
        
        // 优惠对象映射到显示
        mapDiscountTargetToDisplay(discountTarget) {
            const targetMap = {
                'HANDLING_FEE': '手续费',
                'DOW_FEE': '豆费',
                'INTEREST': '利息'
            };
            return targetMap[discountTarget] || discountTarget || '';
        },
        
        // 产品类型映射
        mapProductType(productType) {
            const typeMap = {
                'LENDING': '信贷',
                'INSURANCE': '保险'
            };
            return typeMap[productType] || productType || '';
        },
        
        // 兑换方式映射
        mapRedemptionMethod(paymentMethod) {
            const methodMap = {
                'instant_reduction': 'IMMEDIATE_DISCOUNT',
                'cashback': 'CASHBACK'
            };
            return methodMap[paymentMethod] || paymentMethod || '';
        },
        
        // 优惠对象映射
        mapDiscountTarget(discountTarget) {
            const targetMap = {
                'fee': 'HANDLING_FEE',  // 修正：fee -> HANDLING_FEE
                'dow_fee': 'DOW_FEE',
                'interest': 'INTEREST'
            };
            return targetMap[discountTarget] || discountTarget || '';
        },
        
        // 领取范围映射
        mapClaimScope(claimScope) {
            const scopeMap = {
                'new_customer': 'NEW_CUSTOMER',
                'renewal': 'RENEWAL',
                'fission': 'FISSION'
            };
            return claimScope && Array.isArray(claimScope) ? claimScope.map(scope => scopeMap[scope] || scope) : [];
        },
        
        // 反向映射方法 - 将API数据转换为表单字段
        reverseMapDiscountTarget(discountTarget) {
            const targetMap = {
                'HANDLING_FEE': 'fee',
                'DOW_FEE': 'dow_fee',
                'INTEREST': 'interest'
            };
            return targetMap[discountTarget] || discountTarget || '';
        },
        
        reverseMapDiscountForm(discountType) {
            // 处理discountType对象结构
            let type = '';
            if (typeof discountType === 'object' && discountType.type) {
                type = discountType.type;
            } else if (typeof discountType === 'string') {
                type = discountType;
            }
            
            if (!type) return '';
            
            const typeMap = {
                'DISCOUNT': 'discount',
                'FEE_RATE_REDUCTION': 'fee_rate_reduction',
                'FIXED_AMOUNT_REDUCTION': 'fixed_amount_reduction'
            };
            return typeMap[type] || type || '';
        },
        
        extractDiscountValue(discountType) {
            if (discountType && discountType.discount && discountType.discount.percent) {
                return discountType.discount.percent.toString();
            }
            return '';
        },
        
        reverseMapRedemptionMethod(redemptionMethod) {
            const methodMap = {
                'IMMEDIATE_DISCOUNT': 'instant_reduction',
                'CASHBACK': 'cashback'
            };
            return methodMap[redemptionMethod] || redemptionMethod || '';
        },
        
        reverseMapClaimScope(claimScope) {
            const scopeMap = {
                'NEW_CUSTOMER': 'new_customer',
                'RENEWAL': 'renewal',
                'FISSION': 'fission'
            };
            return claimScope && Array.isArray(claimScope) ? claimScope.map(scope => scopeMap[scope] || scope) : [];
        },
        
        
        // 构建查询参数
        buildQueryParams() {
            const params = {
                // 分页参数 - 改为integer类型空值
                current: null,
                size: null,
                
                // 基础查询字段 - 按照后端接口参数要求
                name: this.searchForm.activityName || '',
                code: this.searchForm.activityCode || '',
                productType: this.searchForm.productType || '',
                productName: this.searchForm.financingProduct || '',
                startTimeBegin: '',
                startTimeEnd: '',
                endTimeBegin: '',
                endTimeEnd: '',
                discountTarget: this.searchForm.discountObject || '',
                status: this.searchForm.activityStatus || '',
                creator: this.searchForm.creator || ''
            };
            
            // lenderIds 参数已移除
            
            // 处理时间范围参数
            if (this.searchForm.startTime) {
                params.startTimeBegin = this.searchForm.startTime;
            }
            if (this.searchForm.endTime) {
                params.startTimeEnd = this.searchForm.endTime;
                params.endTimeBegin = this.searchForm.startTime;
                params.endTimeEnd = this.searchForm.endTime;
            }
            
            return params;
        },
        
        // 搜索
        handleSearch() {
            console.log('执行搜索', this.searchForm);
            this.currentPage = 1; // 重置到第一页
            this.loadData(); // 重新加载数据
        },
        
        // 重置搜索表单
        handleReset() {
            console.log('重置搜索');
            // 重置搜索表单
            this.searchForm = {
                activityName: '',
                activityCode: '',
                productType: '',
                financingProduct: '',
                startTime: '',  // 改为独立的时间字段
                endTime: '',    // 改为独立的时间字段
                discountObject: '',
                discountForm: '',
                activityStatus: '',
                creator: ''
            };
            this.currentPage = 1; // 重置到第一页
            this.loadData(); // 重新加载数据
        },
        
        // 搜索筛选 (保留原有方法以兼容)
        handleFilter() {
            this.handleSearch();
        },
        
        // 创建活动
        handleCreate() {
            this.currentMode = 'create';
            this.currentActivityId = null;
            this.resetForm();
            // this.generateActivityCode(); // 后端生成编号，不再调用
            this.dialogVisible = true;
        },
        
        // 分页变化
        handlePageChange(page) {
            this.currentPage = page;
            this.loadData();
        },
        
        // 查看详情
        async handleViewDetail(row) {
            try {
            this.currentMode = 'view';
            this.currentActivityId = row.id;
                
                // 调用API获取活动详情
                const response = await getMarketingActivityDetail(row.id);
                console.log('活动详情数据:', response);
                
                // 将API数据映射到表单数据
                this.loadActivityDataFromApi(response.data);
            this.dialogVisible = true;
                
            } catch (error) {
                console.error('获取活动详情失败:', error);
                this.$message.error('获取活动详情失败，请稍后重试');
            }
        },
        
        // 编辑活动
        handleEditActivity(row) {
            this.currentMode = 'edit';
            this.currentActivityId = row.id;
            this.loadActivityData(row);
            this.dialogVisible = true;
        },
        
        // 上线活动
        handleOnlineActivity(row) {
            this.$confirm('确认要上线该活动吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    await this.updateActivityStatus(row.id, 'ONLINE');
                this.$message.success('活动已上线');
                this.loadData();
                } catch (error) {
                    console.error('上线活动失败:', error);
                    this.$message.error('上线失败，请稍后重试');
                }
            }).catch(() => {
                this.$message.info('已取消操作');
            });
        },
        
        // 下线活动
        handleOfflineActivity(row) {
            this.$confirm('确认要下线该活动吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    await this.updateActivityStatus(row.id, 'OFFLINE');
                this.$message.success('活动已下线');
                this.loadData();
                } catch (error) {
                    console.error('下线活动失败:', error);
                    this.$message.error('下线失败，请稍后重试');
                }
            }).catch(() => {
                this.$message.info('已取消操作');
            });
        },
        
        // 更新活动状态（上线/下线）
        async updateActivityStatus(activityId, status) {
            try {
                const apiData = {
                    id: activityId,
                    status: status
                };
                
                console.log('更新活动状态请求参数:', apiData);
                
                const response = await operateMarketingActivity(apiData);
                console.log('状态更新返回数据:', response);
                
                // 检查API响应
                if (response && response.success === true && response.code === 200) {
                    console.log('活动状态更新成功');
                    return response;
                } else {
                    const errorMsg = (response && response.message) || '活动状态更新失败';
                    throw new Error(errorMsg);
                }
            } catch (error) {
                console.error('更新活动状态失败:', error);
                throw error;
            }
        },
        
        // 弹窗关闭
        handleDialogClose() {
            this.dialogVisible = false;
            this.currentActivityId = null;
            this.currentMode = 'create';
            this.resetForm();
        },
        
        // 取消
        handleCancel() {
            this.handleDialogClose();
        },
        
        // 重置表单
        resetForm() {
            this.formData = {
                // 基本规则
                activityName: '',
                // activityCode: '', // 后端生成，不需要前端处理
                productType: '',
                productName: [],
                startTime: '',
                endTime: '',
                discountObject: '',
                discountForm: '',
                discountValue: '',
                paymentMethod: '',
                
                // 优惠领取规则
                receiveScope: [],
                singleCustomerLimit: '1',
                
                // 投放位置规则
                deploymentPosition: [],
                couponName: '',
                customerDisplayText: '',
                
                // 优惠使用规则
                useStartTime: '',
                useEndTime: ''
            };
            if (this.$refs.activityForm) {
                this.$refs.activityForm.clearValidate();
            }
        },
        
        // 生成活动编号 - 后端生成，前端不再生成
        // generateActivityCode() {
        //     const now = new Date();
        //     const year = now.getFullYear();
        //     const month = String(now.getMonth() + 1).padStart(2, '0');
        //     const day = String(now.getDate()).padStart(2, '0');
        //     const hour = String(now.getHours()).padStart(2, '0');
        //     const minute = String(now.getMinutes()).padStart(2, '0');
        //     const second = String(now.getSeconds()).padStart(2, '0');
        //     
        //     this.formData.activityCode = `YXYH${year}${month}${day}${hour}${minute}${second}`;
        // },
        
        // 加载活动数据（从表格行数据）
        loadActivityData(row) {
            // TODO: 调用API加载数据
            console.log('加载活动数据，ID:', row.id);
            
            // 模拟数据
            this.formData = {
                activityName: row.activityName || '2025年10月MCA优惠活动',
                activityCode: row.activityCode || 'YX001',
                productType: 'credit',
                productName: ['MCA'],
                startTime: '2021-11-16 03:48:07',
                endTime: '2022-07-29 23:48:11',
                discountObject: 'fee',
                discountForm: 'discount',
                discountValue: '10'
            };
        },
        
        // 从API数据加载活动详情
        loadActivityDataFromApi(apiData) {
            console.log('从API数据加载活动详情:', apiData);
            
            // 将API返回的数据映射到表单字段
            this.formData = {
                // 基本规则
                activityName: apiData.name || '',
                productType: apiData.productType || '',
                productName: apiData.productName || [],
                startTime: apiData.activityStartTime || '',
                endTime: apiData.activityEndTime || '',
                discountObject: this.reverseMapDiscountTarget(apiData.discountTarget),
                discountForm: this.reverseMapDiscountForm(apiData.discountType),
                discountValue: this.extractDiscountValue(apiData.discountType),
                paymentMethod: this.reverseMapRedemptionMethod(apiData.redemptionMethod),
                
                // 优惠领取规则（时间字段已移除）
                receiveScope: this.reverseMapClaimScope(apiData.claimScope),
                singleCustomerLimit: apiData.singleCustomerClaimLimit || '1',
                
                // 投放位置规则
                deploymentPosition: apiData.placementLocation || [],
                couponName: apiData.discountName || '',
                customerDisplayText: apiData.customerDescribe || '',
                
                // 优惠使用规则
                useStartTime: apiData.useStartTime || '',
                useEndTime: apiData.useEndTime || ''
            };
        },
        
        // 优惠形式变化处理
        handleDiscountFormChange(value) {
            if (value !== 'discount') {
                this.formData.discountValue = '';
            }
        },
        
        // 构建API提交的数据结构
        buildApiData(status = 'draft') {
            const formData = this.formData;
            
            // 构建折扣配置对象 - 修正为正确的嵌套结构
            let discountConfig = {};
            if (formData.discountForm === 'discount') {
                discountConfig = {
                    discountType: {
                        type: "DISCOUNT",
                        discount: {
                            percent: parseInt(formData.discountValue) || 0
                        }
                    }
                };
            }
            
            // 根据当前模式(创建/编辑)设置状态和参数
            const isCreateMode = this.currentMode === 'create';
            const activityStatus = isCreateMode ? 'CREATE' : 'DRAFT';
            
            const apiData = {
                // 基本规则字段 - 按后端字段映射
                name: formData.activityName,
                productType: "LENDING", // 固定为信贷
                discountTarget: this.mapDiscountTarget(formData.discountObject),
                status: activityStatus, // 创建为CREATE，编辑为DRAFT
                lenderIds: [78], // 写死为数组[78]
                
                redemptionMethod: this.mapRedemptionMethod(formData.paymentMethod),
                
                // 活动时间规则字段 - 基本规则时间映射到activityStartTime和activityEndTime
                activityStartTime: formData.startTime,
                activityEndTime: formData.endTime,
                claimScope: this.mapClaimScope(formData.receiveScope),
                singleCustomerClaimLimit: parseInt(formData.singleCustomerLimit) || 1,
                
                // 投放位置规则字段
                placementLocation: formData.deploymentPosition || [],
                discountName: formData.couponName, // 字段名变更：couponName → discountName
                customerDescribe: formData.customerDisplayText,
                
                // 优惠使用规则字段 - 新增字段
                useStartTime: formData.useStartTime,
                useEndTime: formData.useEndTime
            };
            
            // 编辑模式需要传递ID参数
            if (!isCreateMode && this.currentActivityId) {
                apiData.id = this.currentActivityId;
            }
            
            // 合并折扣配置到主数据对象中
            return {
                ...apiData,
                ...discountConfig
            };
        },
        
        // 保存
        async handleSave() {
            this.$refs.activityForm.validate(async (valid) => {
                if (valid) {
                    try {
                        const apiData = this.buildApiData('draft');
                        console.log('提交保存数据（草稿状态）:', apiData);
                        
                        const response = await operateMarketingActivity(apiData);
                        console.log('服务器返回数据:', response);
                        
                        // 检查响应是否成功
                        if (response && response.success === true && response.code === 200) {
                            // 优先使用后端返回的状态
                            const statusMessage = (response.data && response.data.status) || 'draft';
                            this.$message.success(`保存成功，活动状态为 ${statusMessage}`);
                            
                    this.handleDialogClose();
                    this.loadData(); // 刷新列表
                        } else {
                            const errorMsg = (response && response.message) || '保存失败';
                            throw new Error(errorMsg);
                        }
                        
                    } catch (error) {
                        console.error('保存活动失败:', error);
                        this.$message.error('保存失败，请稍后重试');
                    }
                } else {
                    this.$message.error('请完善必填信息');
                    return false;
                }
            });
        },
        
        // 创建领取池
        handleCreatePool(row) {
            console.log('创建领取池，活动ID:', row.id);
            this.currentPoolActivityId = row.id;
            this.poolFormData.activityName = row.activityName;
            this.poolFormData.totalQuantity = '';
            this.poolDialogVisible = true;
        },
        
        // 发放记录
        async handleDistributionRecord(row) {
            console.log('发放记录，活动ID:', row.id);
            this.currentDistributionActivityId = row.id;
            this.distributionActivityName = row.activityName;
            this.distributionDialogVisible = true;
            
            // 加载发放记录数据
            await this.loadDistributionList();
        },
        
        // 运营批量发放
        handleBatchIssue(row) {
            this.$confirm('确认要进行运营批量发放吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    console.log('运营批量发放，活动ID:', row.id);
                    const templateId = parseInt(row.id);
                    
                    const response = await batchIssue(templateId);
                    console.log('运营批量发放返回数据:', response);
                    
                    if (response && response.success === true && response.code === 200) {
                        this.$message.success('运营批量发放成功');
                        this.loadData(); // 刷新列表
                    } else {
                        const errorMsg = (response && response.message) || '运营批量发放失败';
                        this.$message.error(errorMsg);
                    }
                } catch (error) {
                    console.error('运营批量发放失败:', error);
                    this.$message.error('运营批量发放失败，请稍后重试');
                }
            }).catch(() => {
                this.$message.info('已取消操作');
            });
        },
        
        // 关闭领取池弹窗
        handlePoolDialogClose() {
            this.poolDialogVisible = false;
            this.currentPoolActivityId = null;
            this.poolFormData = {
                activityName: '',
                totalQuantity: ''
            };
            if (this.$refs.poolForm) {
                this.$refs.poolForm.clearValidate();
            }
        },
        
        // 确认创建领取池
        async handlePoolConfirm() {
            this.$refs.poolForm.validate(async (valid) => {
                if (valid) {
                    try {
                        const templateId = parseInt(this.currentPoolActivityId);
                        const totalQuantity = parseInt(this.poolFormData.totalQuantity);
                        
                        console.log('创建领取池请求参数:', { templateId, totalQuantity });
                        
                        const response = await createPool(templateId, totalQuantity);
                        console.log('创建领取池返回数据:', response);
                        
                        // 检查后端返回的业务状态码
                        if (response && response.success === true && response.code === 200) {
                            this.$message.success('创建领取池成功');
                            this.handlePoolDialogClose();
                            this.loadData(); // 刷新列表
                        } else {
                            const errorMsg = (response && response.message) || '创建领取池失败';
                            throw new Error(errorMsg);
                        }
                        
                    } catch (error) {
                        console.error('创建领取池失败:', error);
                        this.$message.error('创建领取池失败，请稍后重试');
                    }
                } else {
                    this.$message.error('请完善必填信息');
                    return false;
                }
            });
        },
        
        // 加载发放记录列表
        async loadDistributionList() {
            if (!this.currentDistributionActivityId) return;
            
            this.distributionLoading = true;
            try {
                const response = await getDistributionList(parseInt(this.currentDistributionActivityId));
                console.log('发放记录返回数据:', response);
                
                if (response && response.success === true && response.code === 200) {
                    this.distributionList = response.data || [];
                } else {
                    const errorMsg = (response && response.message) || '获取发放记录失败';
                    this.$message.error(errorMsg);
                    this.distributionList = [];
                }
            } catch (error) {
                console.error('获取发放记录失败:', error);
                this.$message.error('获取发放记录失败，请稍后重试');
                this.distributionList = [];
            } finally {
                this.distributionLoading = false;
            }
        },
        
        // 关闭发放记录弹窗
        handleDistributionDialogClose() {
            this.distributionDialogVisible = false;
            this.currentDistributionActivityId = null;
            this.distributionActivityName = '';
            this.distributionList = [];
        },
        
        // 发放状态映射
        mapDistributionStatus(status) {
            const statusMap = {
                'PENDING': '待发放',
                'PROCESSING': '发放中',
                'COMPLETED': '已完成',
                'FAILED': '发放失败'
            };
            return statusMap[status] || status || '';
        },
        
        // 发放类型映射
        mapIssueType(issueType) {
            const typeMap = {
                'CLAIM': '领取',
                'MANUAL': '手动发放'
            };
            return typeMap[issueType] || issueType || '';
        },
        
        // 目标客户类型映射
        mapTargetCustomerType(targetCustomerType) {
            const typeMap = {
                'ALL': '全部',
                'CUSTOM': '指定客户'
            };
            return typeMap[targetCustomerType] || targetCustomerType || '';
        },
        
        // 获取状态样式类
        getStatusClass(status) {
            const classMap = {
                'PENDING': 'status-pending',
                'PROCESSING': 'status-processing',
                'COMPLETED': 'status-completed',
                'FAILED': 'status-failed'
            };
            return classMap[status] || '';
        },
        
        // 映射放贷机构名称数组
        mapLenderNames(lenderNames) {
            if (!lenderNames || !Array.isArray(lenderNames)) {
                return '';
            }
            return lenderNames.join(', ');
        }
    }
};
</script>

<style scoped>
/* 搜索区域样式 */
.search-container {
    background: #fff;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-form {
    width: 100%;
}

.search-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 16px;
}

.search-row:last-child {
    margin-bottom: 0;
}

.search-row .el-form-item {
    margin-right: 24px;
    margin-bottom: 0;
}

.search-row .el-form-item:last-child {
    margin-right: 0;
}

/* 表格容器样式 */
.table-container {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 响应式布局 */
@media (max-width: 1400px) {
    .search-row {
        justify-content: flex-start;
    }
    
    .search-row .el-form-item {
        margin-right: 16px;
    }
}

@media (max-width: 1200px) {
    .search-row .el-form-item {
        margin-bottom: 16px;
    }
}

/* 表单弹窗样式 */
.marketing-activity-form {
    max-height: 70vh;
    overflow-y: auto;
}

.form-section {
    margin-bottom: 40px;
}

.section-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #f0f0f0;
}

.form-tip {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
}

.placeholder-content {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    text-align: center;
    color: #666;
}

.form-actions {
    text-align: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #e8e8e8;
}

.form-actions .el-button {
    width: 100px;
    margin: 0 10px;
}

/* 统一表单标签样式 */
::v-deep .el-form-item__label {
    font-weight: 500;
    min-width: 80px;
    text-align: right;
}

/* 搜索区域表单项间距 */
::v-deep .search-form .el-form-item {
    margin-bottom: 0;
}

/* 确保日期选择器的年份和月份可点击 */
::v-deep .el-picker-panel__header-label {
    cursor: pointer !important;
    user-select: none;
}

::v-deep .el-picker-panel__header-label:hover {
    color: #409EFF;
}

/* 选项描述样式 */
.option-desc {
    font-size: 12px;
    color: #999;
    line-height: 1.2;
    margin-top: 2px;
}

/* 操作按钮容器 - 一行布局 */
.operation-buttons-single-row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 0;
}

/* 操作按钮容器 - 两行布局 */
.operation-buttons-two-rows {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
}

/* 操作按钮容器 - 三行布局 */
.operation-buttons-three-rows {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
}

.operation-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
}

/* 操作按钮样式 */
.operation-btn {
    color: #F40064;
    cursor: pointer;
    font-size: 14px;
    padding: 4px 8px;
    transition: all 0.2s;
    white-space: nowrap;
}

.operation-btn:hover {
    color: #d60051;
    text-decoration: underline;
}

.operation-divider {
    color: #ddd;
    margin: 0 6px;
    user-select: none;
}

/* 发放状态样式 */
.status-pending {
    color: #E6A23C;
    font-weight: 500;
}

.status-processing {
    color: #409EFF;
    font-weight: 500;
}

.status-completed {
    color: #67C23A;
    font-weight: 500;
}

.status-failed {
    color: #F56C6C;
    font-weight: 500;
}
</style>