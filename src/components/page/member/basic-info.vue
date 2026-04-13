<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px" alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>

        <div style="display: flex; align-items: flex-end; width: 100%; justify-content: flex-end; margin-bottom: 15px">
            <!--            <el-button style="float:right" type="primary" icon="el-icon-document-add" @click="dialogFormVisible = true">新增BU分组</el-button>-->
            <el-button style="float: right" type="primary" icon="el-icon-document-add" @click="addFormVisible = true">新增人员</el-button>
        </div>
        <table-page
            :tableData="tableData"
            :tableOperate="tableOperate"
            :filterOptions="filterOptions"
            :columns="columns"
            :totalSize="totalSize"
            @edit="openEdit"
            @more="goMore"
            @conditional-query="handleColumnsFilter"
            :current="currentPage"
            @conditional-reset="handleConditionalReset"
            @page-change="handlePageChange"
        />
        <el-dialog title="新增BU分组" :visible.sync="dialogFormVisible" width="30%">
            <div
                style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: Source Han Sans SC;
                    font-size: 20px;
                    font-weight: 400;
                    line-height: 52.13px;
                    text-align: left;
                "
            >
                是否新增组别 <span style="color: #ff5663">BU{{ groupLength + 1 }}</span>
            </div>

            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_addGroup" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新增人员信息" :visible.sync="addFormVisible" width="30%">
            <el-form :model="addForm" ref="form" style="padding-left: 20px" label-width="100px" label-position="left">
                <el-form-item label="姓名" style="margin-right: 30px" prop="name">
                    <el-input v-model="addForm.name" style="width: 100%"></el-input>
                </el-form-item>
                <el-form-item label="内部名" style="margin-right: 30px" prop="internalName">
                    <el-input v-model="addForm.internalName" style="width: 100%"></el-input>
                </el-form-item>
                <el-form-item label="手机号" style="margin-right: 30px" prop="phone">
                    <el-input v-model="addForm.phone" style="width: 100%"></el-input>
                </el-form-item>
                <el-form-item label="组别" style="margin-right: 30px" prop="salesGroupId">
                    <el-select v-model="addForm.salesGroupId" placeholder="请选择组别" style="width: 100%">
                        <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" style="margin-right: 30px" prop="email">
                    <el-input v-model="addForm.email" style="width: 100%" placeholder="请输入邮箱">
                        <template slot="append">@dowsure.com</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="职位" style="margin-right: 30px" prop="position">
                    <el-select v-model="addForm.position" placeholder="请选择职位" style="width: 100%">
                        <el-option label="KA" value="KA"></el-option>
                        <el-option label="SA" value="SA"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="addFormVisible = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_addSales" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改人员信息" :visible.sync="editFormVisible" width="30%">
            <el-form :model="editForm" ref="form" style="padding-left: 20px" label-width="150px" label-position="left">
                <el-form-item label="姓名" style="margin-right: 30px" prop="name">
                    <el-input v-model="editForm.name" style="width: 100%"></el-input>
                </el-form-item>
                <el-form-item label="内部名" style="margin-right: 30px" prop="internalName">
                    <el-input v-model="editForm.internalName" style="width: 100%"></el-input>
                </el-form-item>
                <el-form-item label="手机号" style="margin-right: 30px" prop="phone">
                    <el-input v-model="editForm.phone" style="width: 100%"></el-input>
                </el-form-item>
                <el-form-item label="推荐码" style="margin-right: 30px" prop="referralCode">
                    <el-input v-model="editForm.referralCode" style="width: 100%"></el-input>
                </el-form-item>
                <el-form-item label="组别" style="margin-right: 30px" prop="salesGroupId">
                    <el-select v-model="editForm.salesGroupId" placeholder="请选择组别" style="width: 100%">
                        <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" style="margin-right: 30px" prop="email">
                    <el-input v-model="editForm.email" style="width: 100%" placeholder="请输入邮箱">
                        <template slot="append">@dowsure.com</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="职位" style="margin-right: 30px" prop="position">
                    <el-select v-model="editForm.position" placeholder="请选择职位" style="width: 100%">
                        <el-option label="KA" value="KA"></el-option>
                        <el-option label="SA" value="SA"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="在职情况" style="margin-right: 30px" prop="positionStatus">
                    <el-select v-model="editForm.positionStatus" placeholder="请选择在职情况" style="width: 100%">
                        <el-option label="在职" value="WORK"></el-option>
                        <el-option label="离职" value="RESIGN"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="离职时间"
                    style="margin-right: 30px"
                    prop="resignationTime"
                    v-if="editForm.positionStatus === 'RESIGN'"
                >
                    <el-date-picker
                        style="width: 100%"
                        v-model="editForm.resignationTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择离职时间"
                    ></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="editFormVisible = false" style="width: 80px; height: 35px">取 消</el-button>
                <el-button type="primary" @click="_updateSales" style="width: 80px; height: 35px">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { salesAllGroupList, salesGroupSave, salesList, salesSave, salesUpdate } from '../../../api/member';
import _ from 'lodash';
export default {
    name: 'platform-list',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            dialogFormVisible: false,
            addFormVisible: false,
            editFormVisible: false,
            form: {
                current: 0,
                size: 0,
                id: 0,
                name: '',
                type: 'BU',
                code: 'BU',
                level: 0
            },
            addForm: {
                current: 0,
                size: 0,
                id: 0,
                name: '',
                internalName: '',
                phone: '',
                email: '',
                salesGroupId: '',
                position: '',
                positionStatus: '',
                referralCode: '123456'
            },
            editForm: {
                current: 0,
                size: 0,
                id: 0,
                name: '',
                internalName: '',
                phone: '',
                email: '',
                salesGroupId: '',
                position: '',
                positionStatus: '',
                referralCode: '123456'
            },
            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '姓名',
                    filterable: true,
                    options: []
                },
                {
                    type: 'input',
                    value: '',
                    placeholder: '手机号',
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    placeholder: '组别',
                    filterable: true,
                    options: []
                }
            ],
            showEnable: false,
            multipleSelection: [],
            choose: '',
            enbleData: [],
            groupLength: 0,
            columns: [
                {
                    label: '姓名',
                    prop: 'name'
                },
                {
                    label: '内部名',
                    prop: 'internalName'
                },
                {
                    label: '手机号',
                    prop: 'phone'
                },
                {
                    label: '推荐码',
                    prop: 'referralCode'
                },
                {
                    label: '邮箱',
                    prop: 'email'
                },
                {
                    label: '职位',
                    prop: 'position'
                },
                {
                    label: '创建时间',
                    prop: 'createTime'
                },
                {
                    label: '在职情况',
                    prop: 'positionStatusMap'
                },
                {
                    label: '组别',
                    prop: 'salesGroupName'
                },
                {
                    label: '修改',
                    prop: '',
                    width: '90',
                    operates: [
                        {
                            event: 'edit',
                            text: '修改',
                            type: 'primary'
                        },
                        {
                            event: 'more',
                            text: '更多',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            groupList: []
        };
    },
    watch: {
        '$route.query': {
            handler(newQuery) {
                if (this.$route.path === '/member-info') {
                    this._getGroup();
                }
            },
            immediate: false
        }
    },
    created() {
        this._getGroup();
    },
    methods: {
        goMore(val) {
            this.$router.push({
                path: '/member-more',
                query: val
            });
        },
        _addSales() {
            if (this.addForm.email.indexOf('@dowsure.com') === -1) {
                this.addForm.email = this.addForm.email + '@dowsure.com';
            }
            salesSave(this.addForm).then((res) => {
                this.addFormVisible = false;
                this.$message.success('操作成功!');
                this.addForm = {
                    current: 0,
                    size: 0,
                    id: 0,
                    name: '',
                    internalName: '',
                    phone: '',
                    email: '',
                    salesGroupId: '',
                    position: '',
                    positionStatus: '',
                    referralCode: '123456'
                };
                this._getList();
            });
        },
        _addGroup() {
            this.form.name = 'BU' + (this.groupLength + 1);
            this.form.level = this.groupLength + 1;
            console.log(this.form);
            salesGroupSave(this.form).then((res) => {
                this.dialogFormVisible = false;
                this.$message.success('操作成功!');
                this._getList();
            });
        },
        openEdit(val) {
            this.editForm = _.cloneDeep(val);
            this.editForm.salesGroupIdCopy = this.editForm.salesGroupId;
            this.editForm.salesGroupId = this.editForm.salesGroupName;
            this.editForm.email = this.editForm.email.split('@')[0];
            this.editFormVisible = true;
        },
        _updateSales() {
            if (this.containsUppercase(this.editForm.salesGroupId)) {
                this.editForm.salesGroupId = this.editForm.salesGroupIdCopy;
            }
            if (this.editForm.email.indexOf('@dowsure.com') === -1) {
                this.editForm.email = this.editForm.email + '@dowsure.com';
            }
            salesUpdate(this.editForm).then((res) => {
                this.editFormVisible = false;
                this.$message.success('操作成功!');
                this._getList();
            });
        },
        containsUppercase(str) {
            const regex = /[A-Za-z\u4e00-\u9fa5]/;
            return regex.test(str);
        },
        _getList() {
            salesList({
                name: this.filterOptions[0].value,
                phone: this.filterOptions[1].value,
                salesGroupId: this.filterOptions[2].value,
                current: this.currentPage,
                size: 10
            }).then((res) => {
                res.data.records.map((item) => {
                    item.positionStatusMap = item.positionStatus === 'WORK' ? '在职' : '离职';
                });
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        },

        _getGroup() {
            salesAllGroupList({}).then((res) => {
                this.groupList = res.data;
                this.filterOptions[2].options = this.groupList.map((item) => ({
                    value: item.id,
                    label: item.name
                }));
                this.groupLength = res.data.length;
            });
        }
    }
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 360px;
    height: 178px;
    display: block;
}

.clearfix {
    font-size: 18px;
    // padding-left: 18px;
    padding-bottom: 20px;
}

/deep/.el-form-item .form-margin .el-form-item--small .form-margin {
    margin-right: 30px !important;
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

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>
