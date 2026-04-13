<template>
    <div v-loading="loadingAll">
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />{{ $t('common_dsb') }} / {{ $t('insure_data_bxgl') }} /
            </div>
            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <el-row :gutter="24" class="searchForm">
            <el-col :span="24">
                <el-card shadow="never" :body-style="{ padding: '0px' }" style="padding: 20px;padding-bottom: 10px;">
                    <el-form ref="ruleForm" :model="ruleForm" label-width="90px">
                        <el-row style="display: flex; flex-wrap: wrap;">
                            <el-form-item label="服务商名称">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="法人名字">
                                <el-input v-model="ruleForm.legalPersonName"></el-input>
                            </el-form-item>
                            <el-form-item label="服务商类型">
                                <el-select v-model="ruleForm.type" placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in typeList" :key="item" :label="item" :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                        <div class="button-box">
                            <div class="left-box">
                                <el-button type="primary" @click="searchData">搜索</el-button>
                                <el-button @click="reset">重置</el-button>
                            </div>
                            <div class="right-box">
                                <!-- 新增服务商按钮 -->
                                <addServiceDialog ref="addServiceDialog" @refreshData="getDataList"></addServiceDialog>
                            </div>
                        </div>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="dataList" style="margin-left: 0; margin-right: 0;margin-bottom: 20px;">
            <el-card shadow="never" :body-style="{ padding: '0px' }">
                <el-table :data="tableData" style="width: 100%; font-size: 14px;">
                    <el-table-column prop="name" label="服务商名称" align="center" />
                    <el-table-column prop="legalPersonName" label="法人名字" align="center" />
                    <el-table-column prop="legalPersonId" label="法人身份证" align="center" >
                        <!-- 身份证：无脱敏 -> 脱敏处理（“*”号隐藏7-24位数字） -->
                         <template slot-scope="scope">
                            <span v-if="scope.row.legalPersonId">
                                {{scope.row.legalPersonId.substring(0, 7)}}**********
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cooperationStatus" label="合作状态" align="center" />
                    <el-table-column prop="type" label="类型" align="center" />
                    <el-table-column prop="companyCertNo" label="公司证件号" align="center" >
                        <!-- 2. 公司证件号：无脱敏 ->脱敏后四位 -->
                         <template slot-scope="scope">
                            <span v-if="scope.row.companyCertNo">
                                {{scope.row.companyCertNo.substring(0, scope.row.companyCertNo.length - 4)}}****
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="businessRegistrationNo" label="商业登记证编号" align="center" />
                    <el-table-column prop="contactName" label="联系人" align="center" />
                    <el-table-column prop="contactPhone" label="联系人手机号" align="center" >
                        <!-- 3. 联系人手机号： 无脱敏 -> 脱敏第4-7位 -->
                         <template slot-scope="scope">
                            <span v-if="scope.row.contactPhone">
                                {{scope.row.contactPhone.substring(0, 3)}}****{{scope.row.contactPhone.substring(7)}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="" align="center">
                        <template slot-scope="scope">
                            <el-button @click="seeDetails(scope.row)" type="text" size="small">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background @size-change="handleSizeChange" layout="prev, pager, next" :total="total"
                    :page-size="pageSize" @current-change="currentChange" :current-page="ruleForm.current"
                    :page-sizes="[10, 20, 30, 50]" style="text-align: right; margin: 10px">
                </el-pagination>
            </el-card>
        </el-row>
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" v-loading="loading">
            <el-form :model="ruleFormEdit" :rules="rules" ref="ruleFormEdit" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机国际区号" prop="phoneCountryCode">
                    <el-input v-model="ruleFormEdit.phoneCountryCode"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phoneNumber">
                    <el-input v-model="ruleFormEdit.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="全名" prop="fullName">
                    <el-input v-model="ruleFormEdit.fullName"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleFormEdit.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleFormEdit')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { providerPage, providerPageDict, editUsersUpdate } from '@/api/index.js';
import addServiceDialog from './components/addServiceDialog.vue';
import { get } from 'lodash';
export default {
    name: 'userManage-usersList',
    components: {
        addServiceDialog,
    },
    data() {
        return {
            loading: false,
            loadingAll: false,
            dialogVisible: false,
            ruleFormEdit: {
                id: '',
                phoneCountryCode: '',
                phoneNumber: '',
                fullName: '',
                email: '',
            },
            rules: {
                phoneCountryCode: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                phoneNumber: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                fullName: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    {
                        pattern:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "邮箱格式不正确",
                        trigger: "blur",
                    },
                ],
            },
            ruleForm: {
                current: 1,
                size: 10
            },
            dateTimeCreated: [],
            dateTimeLogin: [],
            tableData: [],
            total: 0,
            pageSize: 10,
            typeList: [],
        };
    },
    created() {
        this.getDataList();
        // 获取数据字典
        this.getDict()
    },
    methods: {
        // 获取数据字典
        async getDict() {
            await providerPageDict().then((res) => {
                this.typeList = get(res, 'data.typeList', [])
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.ruleFormEdit.id = this.ruleFormEdit.id
                    editUsersUpdate(this.ruleFormEdit).then(res => {
                        this.loading = false
                        this.dialogVisible = false
                        this.$message.success('修改成功')
                        this.getDataList()
                    }).catch(err => {
                        this.loading = false
                        this.$message.error(err.message)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleClose(done) {
            this.dialogVisible = false;
            this.ruleFormEdit = {
                id: '',
                phoneCountryCode: '',
                phoneNumber: '',
                fullName: '',
                email: '',
            }
        },
        editUserInfo(item) {
            this.ruleFormEdit = {
                id: item.id || '',
                phoneCountryCode: item.phoneCountryCode || '',
                phoneNumber: item.phoneNumber || '',
                fullName: item.fullName || '',
                email: item.email || '',
            };
            this.dialogVisible = true
        },
        handleCreatedTimeChange() {
            if (this.dateTimeCreated.length === 2) {
                this.ruleForm.createdAtStart = this.dateTimeCreated[0]
                // 把最后面的00:00:00改成23:59:59
                this.ruleForm.createdAtEnd = this.dateTimeCreated[1].replace('00:00:00', '23:59:59')
            };
        },
        handleLoginTimeChange() {
            if (this.dateTimeLogin.length === 2) {
                this.ruleForm.lastLoginTimeStart = this.dateTimeLogin[0]
                this.ruleForm.lastLoginTimeEnd = this.dateTimeLogin[1].replace('00:00:00', '23:59:59')
            };
        },
        exportData() {
            const axios = require('axios');
            let obj = this.ruleForm
            obj.size = this.total
            axios({
                method: 'get',
                responseType: 'blob',
                url: `${process.env.VUE_APP_BASE_URL}/lending/users/export`,
                params: obj,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(function (res) {
                    var blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    var downloadElement = document.createElement('a');
                    var href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = `用户列表.xlsx`;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                })
                .catch((error) => {
                    this.$message.info(error.response.data.message);
                });
        },
        seeDetails(row) {
            this.$refs.addServiceDialog.showDrawer(row.id)
        },
        seeShopDetails(row) {
            this.$router.push({ path: '/authToken-list', query: { merchantId: row.merchantId } });
        },
        handleSizeChange(val) {
            this.ruleForm.size = val
            this.ruleForm.current = 1
            this.getDataList()
        },
        searchData() {
            this.ruleForm.current = 1;
            this.getDataList();
        },

        reset() {
            this.ruleForm = {
                current: 1,
                size: 10
            }
            this.getDataList();
        },
        getDataList() {
            this.loadingAll = true
            providerPage(this.ruleForm).then((res) => {
                this.tableData = res.data.records;
                this.total = res.data.total;
                this.loadingAll = false
            }).catch(err => {
                this.loadingAll = false
            });
        },
        // 点击下一页
        currentChange(index) {
            this.ruleForm.current = index;
            this.getDataList();
        }
    }
};
</script>

<style lang='less' scoped>
.searchForm {
    border-radius: 8px;

    .el-form-item {
        width: 23%;
        margin-right: 2%;
    }

    .timeC {
        .el-date-editor {
            width: 280px;
        }
    }

    .button-box {
        margin: 10px 0;
        margin-top: -15px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left-box {
            flex: 1;
            display: flex;
            justify-content: flex-start;
        }

        .right-box {
            display: flex;
            justify-content: flex-end;
        }
    }
}

.dataList {
    background-color: #fff;
    margin-top: 8px;
    padding: 20px;
    border-radius: 8px;
    min-height: 350px;

    /deep/.el-table th>.cell {
        color: #000;
    }

    /deep/.el-table__row {
        td:nth-child(1) {
            .cell {
                color: #fe1964;
            }
        }
    }
}
</style>