<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />保险后台 / 保险管理 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <table-page @clickCell="clickCell" :tableData="tableData" :showFilterRadio="true" :tableOperate="tableOperate"
            :filterOptions="filterOptions" :columns="columns" :totalSize="totalSize" @update="toDeal"
            @updateHistory="toDetail" @conditional-query="handleColumnsFilter"
            @conditional-reset="handleConditionalReset" :current="currentPage" @page-change="handlePageChange"
            :isShowSelection="true" :isShowIndex="true" />
        <el-dialog center title="申请批改" width="60%" :visible.sync="applyUpdate" :close-on-click-modal="false">
            <div class="title">当前保单号<span style="margin-left: 30px">{{ policyNum }}</span><span
                    style="color: red;font-size: 16px;margin-left: 20px">（注意：暂不支持变更投保类型个人/企业）</span></div>
            <div class="title">投保人信息</div>
            <div style="padding-left: 20px;margin-top: 20px">
                <el-form ref="form" :model="customForm" :rules="rules" label-width="180px" label-position="right">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="公司名/姓名(中文)">
                                <el-input v-model="customForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="公司名/姓名(英文)">
                                <el-input v-model="customForm.nameEn"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="证件类型">
                                <el-select v-model="customForm.cardType" placeholder="请选择" :disabled="true">
                                    <el-option value="01G" label="身份证"></el-option>
                                    <el-option value="04T" label="统一社会信用代码"></el-option>
                                    <el-option value="08B" label="其他"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="证件号码">
                                <el-input v-model="customForm.cardNumber"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="注册地址(中文)">
                                <el-input v-model="customForm.registerAddress"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="注册地址(英文)">
                                <el-input v-model="customForm.registerAddressEn"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="联系人姓名">
                                <el-input v-model="customForm.contactName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="联系人手机号">
                                <el-input v-model="customForm.contactPhoneNumber"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="联系人邮箱">
                                <el-input v-model="customForm.contactEmail"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="title">被保人信息
                <span style="margin-left: 30px">
                    <span>
                        <el-switch v-model="radio" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                        <span style="line-height: 20px;font-size: 14px;margin-left: 10px;color: #606266">同投保人</span>
                    </span></span>
            </div>
            <div class="title">
                <div style="display: flex;align-items: center;justify-content: space-between;">
                    <div>被保产品</div>
                    <div>
                        <el-button @click="clearProducts">一键清除</el-button>
                        <el-button style="
                    color: #fff;
                    background: linear-gradient(to top right, #e10453, #ff575a);
                  " @click="batchDialog = true;">批量上传</el-button>
                    </div>
                </div>
                <span style="margin-left: 30px">
                    <el-table :data="tableProductData" border style="width: 90%; margin: 0 auto">
                        <el-table-column prop="type" label="产品类型" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.type" placeholder=""
                                    @focus="getNowProductItem(scope.$index, 'type')"
                                    @change="setProductInputVal"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="产品名称（英文）" align="center">
                            <template slot-scope="scope">
                                <div>
                                    <el-input v-model="scope.row.name" placeholder=""
                                        @focus="getNowProductItem(scope.$index, 'name')"
                                        @change="setProductInputVal"
                                        @blur="validateProductName(scope.row, scope.$index)"
                                        @input="clearProductError(scope.$index)"></el-input>
                                    <div 
                                        v-if="scope.row.nameError" 
                                        style="color: red; font-size: 12px; margin-top: 5px;">
                                        不可含{{ scope.row.nameError }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="model" label="操作" align="center">
                            <template slot-scope="scope">
                                <a @click="handleDelete(scope.row)" style="color: red;cursor: pointer;">删除</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <a href="javascript:void(0)" @click="addInput" style="
                color: #409EFF;
                margin-top: 10px;
                margin-left: 50px;
                font-size: 14px;
              "><i class="el-icon-circle-plus-outline" style="vertical-align: middle; margin-right: 3px"></i>
                        添加新的产品</a>
                </span>
            </div>
            <div style="padding-left: 20px;margin-top: 20px" v-if="!radio">
                <el-form ref="form" :model="customForm2" :rules="rules" label-width="180px" label-position="right">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="公司名/姓名(中文)">
                                <el-input v-model="customForm2.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="公司名/姓名(英文)">
                                <el-input v-model="customForm2.nameEn"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="证件类型">
                                <el-select v-model="customForm2.cardType" placeholder="请选择" :disabled="true">
                                    <el-option value="01G" label="身份证"></el-option>
                                    <el-option value="04T" label="统一社会信用代码"></el-option>
                                    <el-option value="08B" label="其他"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="证件号码">
                                <el-input v-model="customForm2.cardNumber"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="注册地址(中文)">
                                <el-input v-model="customForm2.registerAddress"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="注册地址(英文)">
                                <el-input v-model="customForm2.registerAddressEn"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="联系人姓名">
                                <el-input v-model="customForm2.contactName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="联系人手机号">
                                <el-input v-model="customForm2.contactPhoneNumber"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="联系人邮箱">
                                <el-input v-model="customForm2.contactEmail"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="applyUpdate = false">取消</el-button>
                <el-button type="primary" @click="update">确认</el-button>
            </div>
        </el-dialog>
        <el-dialog ref="dialog" center title="批改记录" width="800px" :visible.sync="updateHistory">
            <div class="title">当前保单号<span style="margin-left: 30px">{{ policyNum }}</span></div>
            <div style="padding-left: 20px;position: relative">
                <el-table :data="tableHisData" @cell-mouse-enter="handleMouseOver" @cell-mouse-leave="handleMouseOut">
                    <el-table-column prop="id" label="批改号" width="100">
                    </el-table-column>
                    <el-table-column prop="endorsementNumber" label="批单号">
                    </el-table-column>
                    <el-table-column prop="status" width="100px" label="批改状态">
                    </el-table-column>
                    <el-table-column prop="applicationTime" label="申请批改时间">
                    </el-table-column>
                    <el-table-column prop="reviewTime" label="批改审核时间">
                    </el-table-column>
                </el-table>
                <!-- 鼠标悬浮显示的弹窗 -->
                <div v-show="isHovered" id="tooltip" class="custom-hover-box" :style="hoverBoxStyle">
                    <div class="title_hover">保单变更内容: </div>
                    <div class="contain_box">
                        <div class="li">
                            <span>变更字段</span>
                            <span>原内容</span>
                            <span>变更后内容</span>
                        </div>
                        <div class="li" v-if="compare1.cardNumber || compare2.cardNumber">
                            <span>投保人证件号码</span>
                            <span>{{ compare1.cardNumber }}</span>
                            <span class="after">{{ compare2.cardNumber }}</span>
                        </div>
                        <div class="li" v-if="compare1.cardType || compare2.cardType">
                            <span>投保人证件类型</span>
                            <span>{{ compare1.cardType }}</span>
                            <span class="after">{{ compare2.cardType }}</span>
                        </div>
                        <div class="li" v-if="compare1.contactEmail || compare2.contactEmail">
                            <span>投保人邮箱</span>
                            <span>{{ compare1.contactEmail }}</span>
                            <span class="after">{{ compare2.contactEmail }}</span>
                        </div>
                        <div class="li" v-if="compare1.contactName || compare2.contactName">
                            <span>投保人</span>
                            <span>{{ compare1.contactName }}</span>
                            <span class="after">{{ compare2.contactName }}</span>
                        </div>
                        <div class="li" v-if="compare1.contactPhoneNumber || compare2.contactPhoneNumber">
                            <span>投保人电话</span>
                            <span>{{ compare1.contactPhoneNumber }}</span>
                            <span class="after">{{ compare2.contactPhoneNumber }}</span>
                        </div>
                        <div class="li" v-if="compare1.name || compare2.name">
                            <span>投保人公司名(中文)</span>
                            <span>{{ compare1.name }}</span>
                            <span class="after">{{ compare2.name }}</span>
                        </div>
                        <div class="li" v-if="compare1.nameEn || compare2.nameEn">
                            <span>投保人公司名(英文)</span>
                            <span>{{ compare1.nameEn }}</span>
                            <span class="after">{{ compare2.nameEn }}</span>
                        </div>
                        <div class="li" v-if="compare1.registerAddress || compare2.registerAddress">
                            <span>投保人注册地址(中文)</span>
                            <span>{{ compare1.registerAddress }}</span>
                            <span class="after">{{ compare2.registerAddress }}</span>
                        </div>
                        <div class="li" v-if="compare1.registerAddressEn || compare2.registerAddressEn">
                            <span>投保人注册地址(英文)</span>
                            <span>{{ compare1.registerAddressEn }}</span>
                            <span class="after">{{ compare2.registerAddressEn }}</span>
                        </div>
                        <!--被保人-->
                        <div class="li" v-if="compare3.cardNumber || compare4.cardNumber">
                            <span>被保人证件号码</span>
                            <span>{{ compare3.cardNumber }}</span>
                            <span class="after">{{ compare4.cardNumber }}</span>
                        </div>
                        <div class="li" v-if="compare3.cardType || compare4.cardType">
                            <span>被保人证件类型</span>
                            <span>{{ compare3.cardType }}</span>
                            <span class="after">{{ compare4.cardType }}</span>
                        </div>
                        <div class="li" v-if="compare3.contactEmail || compare4.contactEmail">
                            <span>被保人邮箱</span>
                            <span>{{ compare3.contactEmail }}</span>
                            <span class="after">{{ compare4.contactEmail }}</span>
                        </div>
                        <div class="li" v-if="compare3.contactName || compare4.contactName">
                            <span>被保人</span>
                            <span>{{ compare3.contactName }}</span>
                            <span class="after">{{ compare4.contactName }}</span>
                        </div>
                        <div class="li" v-if="compare3.contactPhoneNumber || compare4.contactPhoneNumber">
                            <span>被保人电话</span>
                            <span>{{ compare3.contactPhoneNumber }}</span>
                            <span class="after">{{ compare4.contactPhoneNumber }}</span>
                        </div>
                        <div class="li" v-if="compare3.name || compare4.name">
                            <span>被保人公司名(中文)</span>
                            <span>{{ compare3.name }}</span>
                            <span class="after">{{ compare4.name }}</span>
                        </div>
                        <div class="li" v-if="compare3.nameEn || compare4.nameEn">
                            <span>被保人公司名(英文)</span>
                            <span>{{ compare3.nameEn }}</span>
                            <span class="after">{{ compare4.nameEn }}</span>
                        </div>
                        <div class="li" v-if="compare3.registerAddress || compare4.registerAddress">
                            <span>被保人注册地址(中文)</span>
                            <span>{{ compare3.registerAddress }}</span>
                            <span class="after">{{ compare4.registerAddress }}</span>
                        </div>
                        <div class="li" v-if="compare3.registerAddressEn || compare4.registerAddressEn">
                            <span>被保人注册地址(英文)</span>
                            <span>{{ compare3.registerAddressEn }}</span>
                            <span class="after">{{ compare4.registerAddressEn }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateHistory = false">取消</el-button>
                <el-button type="primary">确认</el-button>
            </div>
        </el-dialog>
        <!-- 批量上传 -->
        <el-dialog title="批量上传产品清单：" :visible.sync="batchDialog" width="550px" class="uploand"
            :close-on-press-escape="false" :close-on-click-modal="false">
            <div>
                注意：请根据提供模板填写后上传
                <span @click="downloadTemplate" class="down">（批量投保模板下载）</span>
            </div>
            <el-form :model="ruleForm" :rules="rules" label-width="93px" style="margin-top: 20px">
                <el-form-item label="附件上传：" prop="upload">
                    <el-upload class="upload-demo" :action="uploadUrl" :limit="1" name="file"
                        :on-success="handleAvatarSuccess" icon="el-icon-link" :before-upload="beforeAvatarUpload"
                        :auto-upload="false" ref="upload" :on-error="handleAvatarError" :file-list="fileList"
                        :on-exceed="handleExceed">
                        <div style="display: flex; width: 220px">
                            <el-button size="small" type="primary">浏览</el-button>
                            <div style="
                  font-size: 13px;
                  color: #999;
                  width: 120px;
                  height: 30px;
                  line-height: 30px;
                ">
                                仅支持.xlsx格式
                            </div>
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle" style="margin-right: 15px; color: #409EFF; border-color: #409EFF">取
                    消</el-button>
                <el-button type="primary" @click="sureUpload" :disabled="disabledSuer"
                    style="background: linear-gradient(to top right, #e10453, #ff575a)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import tablePage from '@/components/common/tablePage.vue';
import { getInsureByOrderNo, orderList, updateInsureByOrderNo, updateInsureByOrderNoHistory, orderDetail } from '@/api/insur';

export default {
    name: 'asset-protection-change',
    components: { tablePage },
    data() {
        return {
            batchDialog: false,
            uploadUrl: process.env.VUE_APP_INSURE + "/dadiLine/dadi-zrx/excelImport",
            disabledSuer: false,
            fileList: [],
            loadData: {
                file: "",
            },
            compare1: {
            },
            compare2: {
            },
            compare3: {
            },
            compare4: {
            },
            hoveredRow: null,
            isHovered: false,
            hoverBoxStyle: {
                top: '0px',
                left: '0px',
            },
            tableHisData: [],
            customForm2: {

            },
            policyNum: '',
            orderNo: '',
            radio: true,
            applyUpdate: false,
            updateHistory: false,
            cardTypeMapping: {
                '04T': 1,
                '01G': 2,
                '08B': 3
            },
            ruleForm:{

            },
            rules: {
                processingStatus: [
                    { required: true, message: '请选择预警处理', trigger: 'blur' },
                ],
            },
            customForm: {
            },
            changeDialog: false,
            batchDialog: false,
            fileList: [],
            disabledSuer: false,
            tableOperate: [],
            tableData: [
            ],
            tableProductData: [],
            // 禁保产品列表
            forbiddenProducts: [
                'Asbestos', 'Crane', 'Fireproof board', 'Elevator', 'lift', 'Chemical', 'toxic',
                'Fuel', 'Dye', 'Gas', 'software', 'fireworks', 'firecrackers', 'Foldable',
                'Hot water', 'heating', 'Cosmetic products', 'string light', 'Pressure cooker',
                'Electric pressure cooker', 'Beauty device', 'phototherapy device', 'Ebike',
                'E-bike', 'ebike', 'scooter', 'lawn mower', 'Automobile', 'seat belt', 'brake',
                'steering wheel', 'reaview mirror', 'handbrake', 'clutch', 'engine', 'transmission',
                'tire', 'gear', 'brake pad', 'bumper', 'horn', 'radar', 'navigation', 'bicycles',
                'bike', 'balance bike', 'vehicles', 'wheel', 'motorcycle', 'Car', 'Genetically Modified',
                'Food additives', 'Wine', 'Tobacco', 'E-cigarettes', 'Dyeing hair', 'Weight-loss',
                'semiconductor', 'Perming', 'Chip', 'Waterproof', 'baby', 'toddler', 'newborn',
                'infant', 'battery', 'cell', 'batteries', 'Power bank', 'Weapon', 'Ammunition',
                'drone', 'faucet', 'pipe', 'tap', 'valve', 'flange', 'pump', 'Mower', 'Helmet',
                'Blood', 'Medical', 'Pesticide', 'Cement', 'Electronic anti-theft lock', 'railway',
                'skating', 'skiing', 'diving', 'surfing', 'Tap'
            ],
            currentPage: 1,
            pageSize: 10,
            totalSize: 0,
            filterOptions: [
                {
                    type: 'input',
                    value: null,
                    placeholder: '请输入保单号',
                    filterable: true,
                    options: []
                },
            ],
            columns: [
                {
                    label: '保单号',
                    prop: 'policyNum',
                    color: '#409EFF',
                    width: 230
                },
                {
                    label: '保险公司',
                    prop: 'comanyName',
                    color: '#409EFF',
                    width: 250
                },
                {
                    label: '被保企业名称（中文）',
                    prop: 'insName',
                    color: '#409EFF',
                    width: 250
                },
                {
                    label: '保险起期',
                    prop: 'policyStatr',
                    color: '#409EFF',
                    width: 150
                },
                {
                    label: '保险止期',
                    prop: 'policyEndTime',
                    color: '#409EFF',
                    width: 150
                },
                {
                    label: '保单状态',
                    prop: 'policyStatus',
                    color: '#409EFF',
                    width: 200
                },
                {
                    label: '批改状态',
                    prop: 'updateStatus',
                    color: '#409EFF',
                    width: '120'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    operates: [
                        {
                            event: 'update',
                            text: "申请批改",
                            type: 'primary',
                        },
                        {
                            event: 'updateHistory',
                            text: "批改记录",
                            type: 'primary',
                        }
                    ],
                    fixed: 'right'
                }
            ],
            beforeData: {},
            afterData: {},
            propertiesToCompare: [
                'cardNumber',
                'cardType',
                'cardTypeCode',
                'contactEmail',
                'contactName',
                'contactPhoneNumber',
                'nameEn',
                'name',
                'registerAddress',
                'registerAddressEn',
            ],
            nowProductIndex: '',
            nowProductType: '',
        }
    },
    methods: {
        // 一键清除
        clearProducts() {
            this.$confirm('是否清除所有产品信息？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableProductData = [];
                this.$message({
                    type: 'success',
                    message: '清除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消清除'
                });
            });
        },
        // 删除table
        handleDelete(item) {
            const index = this.tableProductData.indexOf(item);
            if (index !== -1) {
                this.tableProductData.splice(index, 1);
            }
        },
        // 添加新的input
        addInput() {
            this.tableProductData.push({
                name: "",
                type: "",
                model: "",
            });
        },
        // 批量投保模板下载
        downloadTemplate() {
            window.open(process.env.VUE_APP_INSURE + `/dadiLine/dadi-zrx/templateDownload`);
        },
        // 批量投保上传
        handleAvatarSuccess(res, file) {
            console.log(res.data);
            this.disabledSuer = false;
            this.batchDialog = false;
            this.fileList = [];
            if (res.code === 200) {
                this.$message({
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: res.msg,
                    type: "success",
                    customClass: "specific",
                });
                let newData = this.tableProductData.concat(res.data)
                this.$nextTick(() => {
                    this.tableProductData = newData
                })
            } else {
                this.$message({
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: res.msg,
                    type: "error",
                    customClass: "specific",
                });
            }
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
                } 个文件`
            );
        },
        beforeAvatarUpload(file) {
            this.loadData.file = file;
            let extension = file.name.split(".")[1];
            let extensionList = ["xlsx"];
            if (extensionList.indexOf(extension) < 0) {
                this.$message.error("只能上传xlsx文件");
                return false;
            }
        },
        sureUpload() {
            this.disabledSuer = true;
            console.log(this.loadData);
            this.$refs.upload.submit();
            setData("close", "batchUpload", this);
        },
        cancle() {
            this.batchDialog = false;
            this.fileList = [];
        },
        handleAvatarError(error) {
            this.$message.error(error.message);
            this.disabledSuer = false;
        },

        getNowProductItem(index, type) {
            console.log("🚀 ~ getNowProductItem ~ index,type:", index, type)
            this.nowProductIndex = index;
            this.nowProductType = type;
        },
        setProductInputVal(val) {
            console.log("🚀 ~ setProductInputVal ~ val:", val)
            // 修改当前input的值
            if (this.nowProductType === 'type') {
                this.tableProductData[this.nowProductIndex].type = val;
            } else if (this.nowProductType === 'name') {
                this.tableProductData[this.nowProductIndex].name = val;
            } else if (this.nowProductType === 'model') {
                this.tableProductData[this.nowProductIndex].model = val;
            }
            // 更新表格数据
            this.tableProductData = [...this.tableProductData];
        },
        handleMouseOver(row, column, cell, event) {
            this.compare1 = {}
            this.compare2 = {}
            if (column.property === 'status') {
                this.hoveredRow = row;
                this.isHovered = true;
                // 获取当前行的 DOM 元素
                const rowElement = cell;
                // 处理json
                this.beforeData = JSON.parse(row.beforeJson);
                this.afterData = JSON.parse(row.afterJson)
                this.beforeData.handler.cardType = this.cardTypeMapping[this.beforeData.handler.cardType];
                this.beforeData.insured.cardType = this.cardTypeMapping[this.beforeData.insured.cardType];

                //证件号码
                if (this.beforeData.handler.cardNumber !== this.afterData.handler.cardNo) {
                    this.compare1.cardNumber = this.beforeData.handler.cardNumber;
                    this.compare2.cardNumber = this.afterData.handler.cardNo;
                }
                //证件类型
                if (this.beforeData.handler.cardType !== this.afterData.handler.cardType) {
                    this.compare1.cardType = this.beforeData.handler.cardType;
                    this.compare2.cardType = this.afterData.handler.cardType;
                }
                // 邮件
                if (this.beforeData.handler.contactEmail !== this.afterData.handler.contactEmail) {
                    this.compare1.contactEmail = this.beforeData.handler.contactEmail;
                    this.compare2.contactEmail = this.afterData.handler.contactEmail;
                }
                // 联系人
                if (this.beforeData.handler.contactName !== this.afterData.handler.contact) {
                    this.compare1.contactName = this.beforeData.handler.contactName;
                    this.compare2.contactName = this.afterData.handler.contact;
                }
                // 公司名中文
                if (this.beforeData.handler.name !== this.afterData.handler.nameZH) {
                    this.compare1.name = this.beforeData.handler.name;
                    this.compare2.name = this.afterData.handler.nameZH;
                }
                //公司名 英文
                if (this.beforeData.handler.nameEn !== this.afterData.handler.nameEN) {
                    this.compare1.nameEn = this.beforeData.handler.nameEn;
                    this.compare2.nameEn = this.afterData.handler.nameEN;
                }
                //联系人电话
                if (this.beforeData.handler.contactPhoneNumber !== this.afterData.handler.contactTel) {
                    this.compare1.contactPhoneNumber = this.beforeData.handler.contactPhoneNumber;
                    this.compare2.contactPhoneNumber = this.afterData.handler.contactTel;
                }
                //地址中文
                if (this.beforeData.handler.registerAddress !== this.afterData.handler.addressZH) {
                    this.compare1.registerAddress = this.beforeData.handler.registerAddress;
                    this.compare2.registerAddress = this.afterData.handler.addressZH;
                }
                //地址英文
                if (this.beforeData.handler.registerAddressEn !== this.afterData.handler.addressEN) {
                    this.compare1.registerAddressEn = this.beforeData.handler.registerAddressEn;
                    this.compare2.registerAddressEn = this.afterData.handler.addressEN;
                }

                //------------------------------------被保人------------------------------------------
                //证件号码
                if (this.beforeData.insured.cardNumber !== this.afterData.insured.cardNo) {
                    this.compare3.cardNumber = this.beforeData.insured.cardNumber;
                    this.compare4.cardNumber = this.afterData.insured.cardNo;
                }
                //证件类型
                if (this.beforeData.insured.cardType !== this.afterData.insured.cardType) {
                    this.compare3.cardType = this.beforeData.insured.cardType;
                    this.compare4.cardType = this.afterData.insured.cardType;
                }
                // 邮箱
                if (this.beforeData.insured.contactEmail !== this.afterData.insured.contactEmail) {
                    this.compare3.contactEmail = this.beforeData.insured.contactEmail;
                    this.compare4.contactEmail = this.afterData.insured.contactEmail;
                }
                // 联系人
                if (this.beforeData.insured.contactName !== this.afterData.insured.contact) {
                    this.compare3.contactName = this.beforeData.insured.contactName;
                    this.compare4.contactName = this.afterData.insured.contact;
                }
                // 公司名中文
                if (this.beforeData.insured.name !== this.afterData.insured.nameZH) {
                    this.compare3.name = this.beforeData.insured.name;
                    this.compare4.name = this.afterData.insured.nameZH;
                }
                //公司名 英文
                if (this.beforeData.insured.nameEn !== this.afterData.insured.nameEN) {
                    this.compare3.nameEn = this.beforeData.insured.nameEn;
                    this.compare4.nameEn = this.afterData.insured.nameEN;
                }
                //联系人手机号
                if (this.beforeData.insured.contactPhoneNumber !== this.afterData.insured.contactTel) {
                    this.compare3.contactPhoneNumber = this.beforeData.insured.contactPhoneNumber;
                    this.compare4.contactPhoneNumber = this.afterData.insured.contactTel;
                }
                //注册地址中文
                if (this.beforeData.insured.registerAddress !== this.afterData.insured.addressZH) {
                    this.compare3.registerAddress = this.beforeData.insured.registerAddress;
                    this.compare4.registerAddress = this.afterData.insured.addressZH;
                }
                //注册地址英文
                if (this.beforeData.insured.registerAddressEn !== this.afterData.insured.addressEN) {
                    this.compare3.registerAddressEn = this.beforeData.insured.registerAddressEn;
                    this.compare4.registerAddressEn = this.afterData.insured.addressEN;
                }
                // 计算悬浮框的位置
                const position = rowElement.getBoundingClientRect();
                this.hoverBoxStyle = {
                    position: 'absolute',
                    top: `${position.bottom - 320}px`, // 悬浮框显示在行的下方
                    left: `${380}px`, // 悬浮框与当前行对齐
                };
            } else {
                this.isHovered = false;
            }

        },
        handleMouseOut(row, column) {
            let timeout
            this.compare1 = {}
            this.compare2 = {}
            this.compare3 = {}
            this.compare4 = {}
            if (column.property !== 'status') {
                this.hoveredRow = row;
                this.isHovered = false;
            }
        },
        _getList() {
            const params = {
                policyNum: this.filterOptions[0].value,
                current: this.currentPage,
                size: 10,
            }
            orderList(params).then(res => {
                let Data = res.data.records;
                updateInsureByOrderNoHistory({ policyNumber: this.filterOptions[0].value }).then(res => {
                    const num = res.data.records.length;
                    if (num <= 0 && Data.length === 1) {
                        Data[0].updateStatus = "未批改"; // 添加新属性并赋值
                        this.tableData = Data
                    } else if (num >= 1 && Data.length === 1) {
                        Data[0].updateStatus = "批改成功"; // 添加新属性并赋值
                        this.tableData = Data
                        console.log(this.tableData);
                    } else {
                        this.tableData = Data
                    }
                })

                this.totalSize = res.data.total;
            })
        },
        clickCell(row) {
        },
        //查询
        handleColumnsFilter(val) {
            this.currentPage = 1;
            this._getList();
        },
        //重置
        handleConditionalReset() {
            this.filterOptions.forEach((item) => {
                if (item.value !== null && item.value !== undefined && item.value !== '') {
                    if (Array.isArray(item.value)) {
                        item.value = [];
                    } else {
                        item.value = null;
                    }
                }
            });
        },
        //申请批改
        async toDeal(val) {
            this.policyNum = val.policyNum
            this.orderNo = val.orderNo
            const policyNum = val.policyNum;
            const orderNo = val.orderNo;
            this.applyUpdate = true;
            await this.getOrderDetail(val);
            getInsureByOrderNo({ orderNo, policyNum }).then(res => {
                if (res.code === 200) {
                    this.customForm = res.data.handler;
                    this.customForm2 = res.data.insured;
                    this.radio = this.inferIsSame()

                }
            })

        },
        async getOrderDetail(item) {
            let result = []
            await orderDetail(
                {
                    orderNo: item.orderNo,
                    productCode: "DD"
                }
            ).then(res => {
                console.log("🚀 ~ getOrderDetail ~ res:", res)
                this.tableProductData = res.data.product;
                result = res.data.product;
            })
            return result;
        },
        inferIsSame() {
            return (
                this.customForm.cardNumber === this.customForm2.cardNumber &&
                this.customForm.cardType === this.customForm2.cardType &&
                this.customForm.cardTypeCode === this.customForm2.cardTypeCode &&
                this.customForm.name === this.customForm2.name &&
                this.customForm.contactEmail === this.customForm2.contactEmail &&
                this.customForm.contactName === this.customForm2.contactName &&
                this.customForm.contactPhoneNumber === this.customForm2.contactPhoneNumber &&
                this.customForm.nameEn === this.customForm2.nameEn &&
                this.customForm.registerAddress === this.customForm2.registerAddress &&
                this.customForm.registerAddressEn === this.customForm2.registerAddressEn
            )
        },
        //批改记录
        toDetail(val) {
            console.log(val);
            this.policyNum = val.policyNum;
            const policyNum = val.policyNum
            this.updateHistory = true;
            updateInsureByOrderNoHistory({ policyNumber: policyNum }).then(res => {
                this.tableHisData = res.data.records;
            })
        },
        // 分页
        handlePageChange(page) {
            this.currentPage = page;
            this._getList()
        },
        // 清理字符串中的不可见字符和特殊字符
        cleanText(text) {
            if (!text) return '';
            return String(text)
                .replace(/\u200B/g, '')   // 零宽空格
                .replace(/\u200C/g, '')   // 零宽非连字符  
                .replace(/\u200D/g, '')   // 零宽连字符
                .replace(/\uFEFF/g, '')   // 字节顺序标记
                .replace(/\u00A0/g, ' ')  // 非断行空格
                .replace(/\u2000/g, ' ')  // En Quad
                .replace(/\u2001/g, ' ')  // Em Quad
                .replace(/\u2002/g, ' ')  // En Space
                .replace(/\u2003/g, ' ')  // Em Space
                .replace(/\u2004/g, ' ')  // Three-Per-Em Space
                .replace(/\u2005/g, ' ')  // Four-Per-Em Space
                .replace(/\u2006/g, ' ')  // Six-Per-Em Space
                .replace(/\u2007/g, ' ')  // Figure Space
                .replace(/\u2008/g, ' ')  // Punctuation Space
                .replace(/\u2009/g, ' ')  // Thin Space
                .replace(/\u200A/g, ' ')  // Hair Space
                .replace(/\u202F/g, ' ')  // Narrow No-Break Space
                .replace(/\u205F/g, ' ')  // Medium Mathematical Space
                .replace(/\u3000/g, ' ')  // Ideographic Space
                .replace(/\s+/g, ' ')     // 多个空格转单个
                .trim();                  // 去除首尾空格
        },

        // 将文本清洗并切分为词元（仅字母数字），用于精确匹配整词/词组
        tokensFrom(text) {
            const cleaned = this.cleanText(text).toLowerCase();
            if (!cleaned) return [];
            return cleaned
                .replace(/[^a-z0-9]+/g, ' ')
                .trim()
                .split(/\s+/)
                .filter(Boolean);
        },

        // 验证产品名称是否包含禁保产品（整词匹配 + 词组所有词都需命中）
        validateProductName(row, index) {
            if (!row.name) {
                row.nameError = '';
                return;
            }
            
            const productTokens = new Set(this.tokensFrom(row.name));
            const matchedForbiddenWords = [];
            
            for (let i = 0; i < this.forbiddenProducts.length; i++) {
                const forbiddenItem = this.forbiddenProducts[i];
                
                // 将禁保词组拆分成单词（用空格和连字符分割）
                const words = forbiddenItem.toLowerCase().split(/[\s\-]+/).filter(Boolean);
                
                // 检查是否所有单词都在产品名称中以整词形式出现
                const allWordsFound = words.every(word => productTokens.has(word));
                
                if (allWordsFound) {
                    matchedForbiddenWords.push(forbiddenItem);
                }
            }
            
            // 设置所有匹配的禁保词，用顿号分隔
            this.$set(row, 'nameError', matchedForbiddenWords.join('、'));
        },
        
        // 清除产品错误提示
        clearProductError(index) {
            const row = this.tableProductData[index];
            if (row && row.nameError) {
                this.$set(row, 'nameError', '');
            }
        },
        
        // 验证产品列表（整词匹配 + 词组所有词都需命中）
        validateUploadedProducts(productList) {
            const errors = [];
            productList.forEach((product, index) => {
                if (product.name) {
                    const productTokens = new Set(this.tokensFrom(product.name));
                    
                    for (let i = 0; i < this.forbiddenProducts.length; i++) {
                        const forbiddenItem = this.forbiddenProducts[i];
                        
                        // 将禁保词组拆分成单词（用空格和连字符分割）
                        const words = forbiddenItem.toLowerCase().split(/[\s\-]+/).filter(Boolean);
                        
                        // 检查是否所有单词都在产品名称中以整词形式出现
                        const allWordsFound = words.every(word => productTokens.has(word));
                        
                        if (allWordsFound) {
                        errors.push({
                                line: index + 2, // +2 是因为Excel第1行是表头，数据从第2行开始
                                forbidden: forbiddenItem
                        });
                            break; // 找到一个匹配就退出循环
                        }
                    }
                }
            });
            return errors;
        },
        
        // 添加新产品
        addInput() {
            this.tableProductData.push({
                type: "",
                name: "",
                model: ""
            });
        },
        
        // 删除产品
        handleDelete(item) {
            const index = this.tableProductData.indexOf(item);
            if (index !== -1) {
                this.tableProductData.splice(index, 1);
            }
        },
        
        
        handleAvatarSuccess(res, file) {
            console.log(res.data);
            this.disabledSuer = false;
            this.batchDialog = false;
            this.fileList = [];
            if (res.code === 200) {
                // 验证上传的产品是否包含禁保产品
                const errors = this.validateUploadedProducts(res.data);
                if (errors.length > 0) {
                    // 构建错误提示信息HTML
                    let errorMessageHtml = '';
                    errors.forEach((error, index) => {
                        if (index > 0) errorMessageHtml += '<br/>';
                        errorMessageHtml += `<span style="color: #f56c6c;">第${error.line}行包含${error.forbidden}，请删除</span>`;
                    });
                    
                    // 包装错误信息，添加滚动容器
                    const wrappedErrorHtml = `<div style="max-height: 300px; overflow-y: auto;">${errorMessageHtml}</div>`;
                    
                    this.$alert(wrappedErrorHtml, '发现禁保产品', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        dangerouslyUseHTMLString: true,
                        customClass: 'overflow-auto-alert',
                        callback: () => {
                            // 用户确认后不设置产品列表，保持原有数据
                        }
                    });
                    return; // 不设置产品列表
                }
                
             
                this.$message({
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: res.msg,
                    type: "success",
                    customClass: "specific",
                });
                this.tableProductData = res.data;
            } else {
                this.$message({
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: res.msg,
                    type: "error",
                    customClass: "specific",
                });
            }
        },
        
        handleAvatarError(error) {
            this.$message.error(error.message);
            this.disabledSuer = false;
        },
        
        beforeAvatarUpload(file) {
            this.disabledSuer = true;
            return true;
        },
        
        
        //确定修改
        update() {
            // 验证产品列表中是否包含禁保产品
            const forbiddenErrors = this.validateUploadedProducts(this.tableProductData);
            if (forbiddenErrors.length > 0) {
                let errorMessageHtml = '<p style="margin-bottom: 10px; color: #333;">产品清单中包含禁保产品：</p>';
                forbiddenErrors.forEach((error, index) => {
                    if (index > 0) errorMessageHtml += '<br/>';
                    errorMessageHtml += `<span style="color: #f56c6c;">第${error.line}行包含${error.forbidden}，请删除</span>`;
                });
                
                this.$alert(errorMessageHtml, '发现禁保产品', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    dangerouslyUseHTMLString: true
                });
                return false;
            }
            
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            const handler = {
                addressEN: this.customForm.registerAddressEn,
                addressZH: this.customForm.registerAddress,
                cardNo: this.customForm.cardNumber,
                cardType: this.cardTypeMapping[this.customForm.cardType],
                nameZH: this.customForm.name,
                nameEN: this.customForm.nameEn,
                contact: this.customForm.contactName,
                contactTel: this.customForm.contactPhoneNumber,
                contactEmail: this.customForm.contactEmail
            }
            const insured = {
                addressEN: this.customForm2.registerAddressEn,
                addressZH: this.customForm2.registerAddress,
                cardNo: this.customForm2.cardNumber,
                cardType: this.cardTypeMapping[this.customForm2.cardType],
                nameZH: this.customForm2.name,
                nameEN: this.customForm2.nameEn,
                contact: this.customForm2.contactName,
                contactTel: this.customForm2.contactPhoneNumber,
                contactEmail: this.customForm2.contactEmail
            }
            if (this.radio !== true) {
                updateInsureByOrderNo({ handler, insured, policyNum: this.policyNum, orderNo: this.orderNo, insuredProducts: this.tableProductData }).then(res => {
                    if (res.code === 200) {
                        this.$message.success('修改成功！')
                        this.applyUpdate = false;
                    }
                    loading.close();
                }).catch(err => {
                    loading.close();
                })
            } else {
                updateInsureByOrderNo({ handler, insured: handler, policyNum: this.policyNum, orderNo: this.orderNo, insuredProducts: this.tableProductData }).then(res => {
                    loading.close();
                    if (res.code === 200) {
                        this.$message.success('修改成功！')
                        this.applyUpdate = false;
                    }
                }).catch(err => {
                    loading.close();
                })
            }

        }
    }
};
</script>
<style scoped lang="less">
.title {
    color: #303133;
    font-size: 16px;
    margin-bottom: 40px;
}

/deep/ .el-dialog__body {
    padding: 10px 20px;
}

.custom-hover-box {
    position: absolute !important;
    width: 80%;
    z-index: 9999;
    background: rgba(30, 31, 34, .8);

    .title_hover {
        color: #fff;
        line-height: 30px;
        padding: 20px;
    }
}

.contain_box {
    box-sizing: border-box;
    padding-left: 10px;
    padding-bottom: 30px;
    padding-right: 10px;
    color: #FFFFFF;
    width: 100%;

    .li {
        display: flex;
        justify-content: space-between;

        span {
            flex: 1;
            text-align: center;
        }
    }
}

.after {
    color: red;
}
</style>