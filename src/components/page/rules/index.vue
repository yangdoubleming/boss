<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>

        <div style="text-align:right">
            <el-button type="primary" @click="dialogFormVisible = true">新增规则</el-button>
        </div>
        <table-page :tableData="tableData" :showFilterRadio="false" :columns="columns" :totalSize="totalSize"
            @quote="deleteList" @seeRules="showRules" @page-change="handlePageChange" />
        <!-- ====================================================新增规则========================================================= -->
        <el-dialog title="新增规则" :visible.sync="dialogFormVisible" width="600px" :before-close="cancelAdd">
            <el-form :model="form" style="padding-left:20px" label-width="150px">
                <el-form-item label="规则名称">
                    <el-input v-model="form.ruleName" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="规则类型">
                    <el-select v-model="form.ruleType" :placeholder="$t('loan_detail_choose')" style="width:300px">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="指标选择">
                    <el-select v-model="form.zbChoose" :placeholder="$t('loan_detail_choose')" style="width:300px">
                        <el-option v-for="item in options3" :key="item.indicatorsName" :label="item.indicatorsName"
                            :value="item.indicatorsName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="启用状态">
                    <el-select v-model="form.openStatus" :placeholder="$t('loan_detail_choose')" style="width:300px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="比较门限">
                    <el-button type="primary" icon="el-icon-plus" circle @click="add"></el-button>
                    <div v-show="this.u.length > 0">
                        <table class="gridtable">
                            <tr>
                                <th>运算符</th>
                                <th>门限</th>
                                <th>动作</th>
                            </tr>
                            <tr v-for="item in u" :key="item.x">
                                <td>
                                    <el-select v-model="item.x" placeholder="" style="width:80px">
                                        <el-option label=">" value="1"></el-option>
                                        <el-option label="<" value="2"></el-option>
                                        <el-option label="=" value="3"></el-option>
                                        <el-option label=">=" value="4"></el-option>
                                        <el-option label="<=" value="5"></el-option>
                                    </el-select>
                                </td>
                                <td><el-input v-model="item.y" autocomplete="off" style="width:80px"></el-input></td>
                                <td>
                                    <el-select v-model="item.z" placeholder="" style="width:80px">
                                        <el-option label="拒绝" value="拒绝"></el-option>
                                        <el-option label="通过" value="通过"></el-option>
                                    </el-select>
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addRoleEvent">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';

export default {
    mixins: [tableMixin],
    components: {
        tablePage
    },
    data() {
        return {
            form: {
                id: '',
                ruleName: '',
                ruleType: '',
                zbChoose: '',
                openStatus: '',
                createTime: ''
            },
            dialogFormVisible: false, //新增角色
            currentPage: 1,
            totalSize: 10,
            tableData: [
                { id: '0', ruleName: "年龄规则", ruleType: "准入", zbChoose: "年龄", openStatus: '启用', createTime: '2021-05-01' },
                { id: '1', ruleName: "店铺经营时长规则", ruleType: "准入", zbChoose: "店铺经营时长", openStatus: '启用', createTime: '2021-05-01' },
                { id: '2', ruleName: "年销售额规则", ruleType: "准入", zbChoose: "年销售额", openStatus: '启用', createTime: '2021-05-01' },
                { id: '3', ruleName: "月均退款率规则", ruleType: "准入", zbChoose: "月均退款率", openStatus: '启用', createTime: '2021-05-01' },
                { id: '4', ruleName: "年订单量规则", ruleType: "准入", zbChoose: "年订单量", openStatus: '启用', createTime: '2021-05-01' },
            ],
            options: [{
                value: '启用',
                label: '启用'
            }, {
                value: '停用',
                label: '停用'
            }],
            options2: [
                {
                    value: '准入',
                    label: '准入'
                }, {
                    value: '评分',
                    label: '评分'
                }
            ],
            options3: [

            ],
            options4: [

            ],
            value: '',
            columns: [
                {
                    label: '规则名称',
                    prop: 'ruleName'
                },
                {
                    label: '规则类型',
                    prop: 'ruleType'
                },
                {
                    label: '指标选择',
                    prop: 'zbChoose'
                },
                {
                    label: '启用状态',
                    prop: 'openStatus'
                },
                {
                    label: this.$t('loan_detail_cjsj'),
                    prop: 'createTime'
                },
                {
                    label: this.$t('loan_search_cz'),
                    prop: '',
                    width: '240',
                    operates: [
                        {
                            event: 'quote',
                            text: this.$t('loan_detail_delete'),
                            type: 'primary'
                        },
                    ],
                    fixed: 'right'
                }
            ],
            u: []
        };
    },
    mounted() {
        localStorage.setItem("ruleList", JSON.stringify(this.tableData))
        this.options3 = JSON.parse(localStorage.getItem("indicators"))
        this._getList()
    },
    methods: {
        random(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        // 新增角色
        addRoleEvent() {
            this.dialogFormVisible = false;
            this.tableData.unshift({
                id: String(this.random(5, 100)),
                ruleName: this.form.ruleName,
                ruleType: this.form.ruleType,
                zbChoose: this.form.zbChoose,
                openStatus: this.form.openStatus,
                createTime: this.formatDate(new Date())
            })
            localStorage.setItem("ruleList", JSON.stringify(this.tableData))
            this._getList();
            this.$message.success('新增成功！');
            this.cancelAdd()
        },
        _getList() {
            this.tableData = JSON.parse(localStorage.getItem("ruleList")) || this.tableData
        },
        // 新增规则弹框
        deleteList(val) {
            let list = []
            this.tableData.forEach((item, index) => {
                if (val.id != item.id) {
                    list.push(item)
                }
            })
            this.tableData = list
            localStorage.setItem("ruleList", JSON.stringify(this.tableData))
            this._getList();
        },
        cancelAdd() {
            this.dialogFormVisible = false
            this.form = {
                id: '',
                ruleName: '',
                ruleType: '',
                zbChoose: '',
                openStatus: '',
                createTime: ''
            }
            this.options4 = []
        },
        showRules(val) {
            this.$router.push(`/rules?id=${val.id}`);
        },
        formatDate(date) {
            var date = new Date(date);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            return YY + MM + DD
        },
        add() {
            this.u.push({ x: '', y: '', z: '' })
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

/* gridtable */
table.gridtable {
    margin-top: 10px;
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
}

table.gridtable th {
    border-width: 1px;
    width: 83px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
}

table.gridtable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
}

/* /gridtable */
</style>