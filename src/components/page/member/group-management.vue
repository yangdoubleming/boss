<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <el-radio-group v-model="tableType" style="margin: 30px 0;">
            <el-radio-button label="group">BU分组</el-radio-button>
            <el-radio-button label="level1">KA职级</el-radio-button>
            <el-radio-button label="level2">SA职级</el-radio-button>
        </el-radio-group>
        <div style="display:flex; align-items:flex-end;width:100%; justify-content: flex-end;margin-bottom:15px">
            <el-button style="float:right" type="primary" icon="el-icon-document-add" @click="dialogAddVisible = true">新增</el-button>
        </div>
        <table-page :tableData="tableDataGroup"
                    :columns="columnsGroup" :totalSize="totalSizeGroup" @edit="editGroup" @delete="deleteGroup" :detailTable="true"
                    @conditional-query="handleColumnsFilter" :current="currentPageGroup" @conditional-reset="handleConditionalReset"
                    @page-change="handlePageChangeA" v-if="tableType==='group'"/>
        <table-page :tableData="tableDataLevelOne"
                    :columns="columnsLevel" :totalSize="totalSizeLevelOne" @edit="editGroup" @delete="deleteGroup" :detailTable="true"
                    @conditional-query="handleColumnsFilter" :current="currentPageLevelOne" @conditional-reset="handleConditionalReset"
                    @page-change="handlePageChangeB" v-else-if="tableType==='level1'"/>
        <table-page :tableData="tableDataLevelTwo"
                    :columns="columnsLevel" :totalSize="totalSizeLevelTwo" @edit="editGroup" @delete="deleteGroup" :detailTable="true"
                    @conditional-query="handleColumnsFilter" :current="currentPageLevelTwo" @conditional-reset="handleConditionalReset"
                    @page-change="handlePageChangeC" v-else-if="tableType==='level2'"/>
        <el-dialog title="新建分组" :visible.sync="dialogAddVisible" width="30%">
            <el-form :model="formGroup" ref="form" style="padding-left:20px" label-width="150px" label-position="left">
                <el-form-item label="名称" style="margin-right:30px" prop="name">
                    <el-input v-model="formGroup.name" style="width:200px" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="类别" style="margin-right:30px" prop="type">
                    <el-select v-model="formGroup.type" placeholder="请选择类别" style="width:200px">
                        <el-option label="BU" value="BU"></el-option>
                        <el-option label="KA" value="KA"></el-option>
                        <el-option label="SA" value="SA"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="级别" style="margin-right:30px" prop="level">
                    <el-input v-model="formGroup.level" style="width:200px" placeholder="请输入级别"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="primary" @click="_addGroup" style="width:80px;height:35px">新建</el-button>
                <el-button @click="dialogAddVisible = false" style="width:80px;height:35px">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改分组" :visible.sync="dialogUpdateVisible" width="30%">
            <el-form :model="formGroupE" ref="form" style="padding-left:20px" label-width="150px" label-position="left">
                <el-form-item label="名称" style="margin-right:30px" prop="name">
                    <el-input v-model="formGroupE.name" style="width:200px" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="级别" style="margin-right:30px" prop="level">
                    <el-input v-model="formGroupE.level" style="width:200px" placeholder="请输入级别" v-if="tableType==='group'"></el-input>
                    <el-input v-model="formGroupE.grade" style="width:200px" placeholder="请输入级别" v-else></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="primary" @click="_updateGroup" style="width:80px;height:35px">修改</el-button>
                <el-button @click="dialogUpdateVisible = false;formGroupE={}" style="width:80px;height:35px">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import {
    deleteGroup, deleteLevel,
    salesGroupList,
    salesLevelList,
    saveGroup,
    saveLevel,
    updateGroup,
    updateLevel
} from '../../../api/member';
import _ from 'lodash';
import { deleteOffer } from '@/api';
export default {
    name: 'target-pm',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            dialogAddVisible: false,
            dialogUpdateVisible: false,
            formGroup: {
                name: "",
                type: "",
                code: "",
                level: ''
            },
            formGroupE: {
            },
            tableOperate: [],
            tableType:'group',
            tableDataGroup: [],
            currentPageGroup: 1,//页码
            totalSizeGroup: 0,//数据总条数
            tableDataLevelOne: [],
            currentPageLevelOne: 1,//页码
            totalSizeLevelOne: 0,//数据总条数
            tableDataLevelTwo: [],
            currentPageLevelTwo: 1,//页码
            totalSizeLevelTwo: 0,//数据总条数
            showEnable: false,
            multipleSelection: [],
            choose: '',
            enbleData: [],
            columnsGroup: [
                {
                    label: '名称',
                    prop: 'name'
                },
                {
                    label: '类别',
                    prop: 'type'
                },
                {
                    label: '级别',
                    prop: 'level'
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
                            event: 'delete',
                            text: '删除',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
            columnsLevel: [
                {
                    label: '名称',
                    prop: 'name'
                },
                {
                    label: '类别',
                    prop: 'type'
                },
                {
                    label: '级别',
                    prop: 'grade'
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
                            event: 'delete',
                            text: '删除',
                            type: 'primary'
                        }
                    ],
                    fixed: 'right'
                }
            ],
        };
    },
    created() {
        this._getGroup()
        this.getKAList()
        this.getSAList()
    },
    methods: {
        handlePageChangeA(page){
            this.currentPageGroup = page;
            this._getGroup()
        },
        handlePageChangeB(page){
            this.currentPageLevelOne = page;
            this.getKAList()
        },
        handlePageChangeC(page){
            this.currentPageLevelTwo = page;
            this.getSAList()
        },
        deleteGroup(val){
            this.$confirm('此操作将删除该组别, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                if(this.tableType==='group'){
                    deleteGroup({id: val.id}).then(res => {
                        this.$message.success('删除成功!')
                        this._getGroup()
                    })
                }else{
                    deleteLevel({id: val.id}).then(res => {
                        this.$message.success('删除成功!')
                        this._getGroup()
                    })
                }
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        editGroup(val){
            this.formGroupE = _.cloneDeep(val)
            this.dialogUpdateVisible = true
        },
        _updateGroup(){
            if(this.tableType==='group'){
                updateGroup(this.formGroupE).then(res => {
                    this.dialogUpdateVisible = false
                    this.$message.success('修改成功!')
                    this._getGroup()
                })
            }else{
                updateLevel(this.formGroupE).then(res => {
                    this.dialogUpdateVisible = false
                    this.$message.success('修改成功!')
                    this.getKAList()
                    this.getSAList()
                })
            }
        },
        _addGroup() {
            if(this.formGroup.type==='BU'){
                saveGroup(this.formGroup).then(res => {
                    this.formGroup = {}
                    this.dialogAddVisible = false
                    this.$message.success('新增成功!')
                    this._getGroup()
                })
            }else{
                this.formGroup.grade = this.formGroup.level
                if(this.formGroup.type==='KA'){
                    this.formGroup.code = 'K'
                }else{
                    this.formGroup.code = 'S'
                }
                saveLevel(this.formGroup).then(res => {
                    this.formGroup = {}
                    this.dialogAddVisible = false
                    this.$message.success('新增成功!')
                    this.getKAList()
                    this.getSAList()
                })
            }
        },
        //获取组别
        _getGroup(){
            salesGroupList({
                current: this.currentPageGroup,
                size: 10,
            }).then((res) => {
                this.tableDataGroup = res.data.records
                this.totalSizeGroup = res.data.total;
            });
        },
        handleSelectionChange(val) {

            this.multipleSelection = val;
        },
        getKAList(){
            salesLevelList({
                code: 'K',
                current: this.currentPageLevelOne,
                size: 10,
            }).then(res=>{
                this.tableDataLevelOne = res.data.records
                this.totalSizeLevelOne = res.data.total
            })
        },
        getSAList(){
            salesLevelList({
                code: 'S',
                current: this.currentPageLevelTwo,
                size: 10,
            }).then(res=>{
                this.tableDataLevelTwo = res.data.records
                this.totalSizeLevelTwo = res.data.total
            })
        },
        _getList() {

        },
        toDetail(val) {
            this.$router.push({
                path: '/target-edit',
                query: val
            });
        }
    }
};
</script>

<style lang='less' scoped>
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