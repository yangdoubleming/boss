<template>
    <div>
        <div style='display:flex; align-items: center;padding:18px'>
            <div style='color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;'>
                <img src='../../../../public/img/favicon.png' style='width:17px;height:17px;margin-right:5px' alt />保险后台
                /
            </div>

            <span style='color:rgba(0,0,0,.65);font-size:14px;padding-left:5px'>{{ $route.meta.title }}</span>
        </div>
        <div style='text-align:right;margin-bottom:10px'>
            <el-button type='primary' icon='el-icon-user' @click='dialogFormVisible = true'>新增用户</el-button>
        </div>
        <table-page :tableData='tableData' :showFilterRadio='false' :tableOperate='tableOperate'
            :filterOptions='filterOptions' :columns='columns' :totalSize='totalSize'
            @conditional-query='handleColumnsFilter' :current='currentPage' @conditional-reset='handleConditionalReset'
            @page-change='handlePageChange' @changeSelects='changeSelects'
            @filter-item-change='changeRoleSearchSelect' />
        <el-dialog title='新增用户' :visible.sync='dialogFormVisible' width='20%'>
            <el-form :model='form' style='padding-left:20px' label-width='60px'>
                <el-form-item label='用户名'>
                    <el-input v-model='form.userName' autocomplete='off' style='width:200px'></el-input>
                </el-form-item>
                <el-form-item label='密码'>
                    <el-input v-model='form.password' autocomplete='off' style='width:200px'></el-input>
                </el-form-item>
            </el-form>
            <div slot='footer' class='dialog-footer'>
                <el-button @click='dialogFormVisible = false'>取 消</el-button>
                <el-button type='primary' @click='addUser'>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import { userList, roleAll, roleAllocat, addUser, updateUser } from '../../../api/user';

export default {
    name: 'user-list',
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            form: {
                userName: '',
                password: ''
            },
            dialogFormVisible: false,
            roleList: [],
            tableOperate: [],
            tableData: [],
            filterOptions: [
                {
                    type: 'input',
                    value: '',
                    placeholder: '用户名',
                    filterable: true,
                    options: []
                },
                {
                    type: 'select',
                    value: '',
                    filterable: true,
                    options: []
                }
            ],
            dialogFormVisible2: false,
            columns: [
                {
                    label: '用户名',
                    prop: 'userName'
                },
                {
                    label: '邮箱',
                    prop: 'email'
                },
                {
                    label: '最后登录ip',
                    prop: 'lastLoginIp'
                },
                {
                    label: '最后登录时间',
                    prop: 'lastLoginTime'
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime'
                },
                {
                    label: this.$t('loan_search_status'),
                    prop: 'status'
                },
                {
                    label: '角色',
                    prop: 'roleIdList',
                    cellEdit: 'selects',
                    width: '160',
                    options: []
                }

                // {
                //     label: this.$t('loan_search_cz'),
                //     prop: '',
                //     width: '120',
                //     operates: [
                //         {
                //             event: 'quote',
                //             text: '修改密码',
                //             type: 'primary'
                //         }
                //     ],
                //     fixed: 'right'
                // }
            ]
        };
    },
    created() {
        roleAll(1).then((res) => {
            this.columns[6].options = res.data;
            this.filterOptions[1].options = res.data.map(x => {
                x['label'] = x.name;
                x['value'] = x.id;
                return x;
            });
        });
    },
    methods: {


        // 新增用户
        addUser() {
            var pubkeyHex =
                '0415bc58a0212dff04128a8caa46d8256267432cb2eba4db162d45bbc44c8d4e0c257bd712ed05889790eee39b641f55a8ebe7100dc044d8a34dba923f2aa7fbf0';
            let obj = JSON.parse(JSON.stringify(this.form));
            obj.password = sm2Encrypt(this.form.password, pubkeyHex, 0);
            addUser(obj).then((res) => {
                this.$message.success('新增成功');
                this.dialogFormVisible = false;
                this._getList();
                Object.keys(this.form).forEach((key) => {
                    this.form[key] = '';
                });
            });
        },
        // 角色下拉选择
        changeSelects(val, row) {
            console.log(val);
            console.log(row);
            roleAllocat({
                userId: row.id,
                roleIdList: val.join(',')
                // permissionIdList:
            }).then((res) => {
                this.$message.success('操作成功');
                this.dialogFormVisible2 = false;
                //  this.$refs.tree.setCheckedKeys([]);
            });
        },
        changeRoleSearchSelect(val, prop) {
            this.filterOptions[1].value = val;
        },
        _getList() {
            userList(this.filterOptions[0].value, this.filterOptions[1].value, this.currentPage).then((res) => {
                this.tableData = res.data.records;
                this.totalSize = res.data.total;
            });
        }

    }
};
</script>

<style>
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