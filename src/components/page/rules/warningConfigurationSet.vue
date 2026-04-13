<template>
    <div>
        <div style="display: flex; align-items: center; padding: 18px">
            <div style="color: rgba(0, 0, 0, 0.45); font-size: 14px; display: flex; align-items: center">
                <img src="../../../../public/img/favicon.png" style="width: 17px; height: 17px; margin-right: 5px"
                    alt />豆沙包 /
            </div>

            <span style="color: rgba(0, 0, 0, 0.65); font-size: 14px; padding-left: 5px">{{ $route.meta.title }}</span>
        </div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">当前资方</span>
                                    <span class="grid-num2">{{ lenderName }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <span class="grid-num">生效规则</span>
                                    <span class="grid-num2">{{ turnOnCount }}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <div style="display: flex;justify-content: flex-end;width: 100%;margin-bottom: 20px;">
            <el-button type="primary" @click="getConfig">新增</el-button>
        </div>
        <el-card>

            <el-table :data="tableData" style="width: 100%">
                <!-- 规则编号列 -->
                <el-table-column type="index" width="120" label="规则编号" style="font-size: 14px"> </el-table-column>

                <!-- 规则名称列 -->
                <el-table-column label="规则名称" width="280">
                    <template slot-scope="scope">
                        <div style="line-height: 36px; font-size: 14px">{{ scope.row.riskRuleName }}</div>
                    </template>
                </el-table-column>

                <!-- 触发条件列 -->
                <el-table-column label="触发条件" width="400">
                    <template slot-scope="scope">
                        <div style="line-height: 36px; font-size: 14px">{{ scope.row.triggerCondition }}</div>
                    </template>
                </el-table-column>

                <!-- 自定义阈值列 -->
                <el-table-column label="自定义阈值">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.riskRuleName !== '数据授权失效' && scope.row.riskRuleName !== '额度冻结'"
                            v-model="scope.row.threshold" placeholder="请输入" size="small"></el-input>
                        <span v-else>-</span>
                    </template>
                </el-table-column>

                <!-- 是否启用列 -->
                <el-table-column label="是否启用">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isTurnOn"></el-switch>
                    </template>
                </el-table-column>

                <!-- 是否推送至客户经理列 -->
                <el-table-column label="是否推送至客户经理">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isSend"></el-switch>
                    </template>
                </el-table-column>

                <!-- 风险等级列 -->
                <el-table-column label="风险等级">
                    <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.grade" size="small">
                            <el-radio-button label="LOW">低</el-radio-button>
                            <el-radio-button label="MIDDLE">中</el-radio-button>
                            <el-radio-button label="HIGH">高</el-radio-button>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
            <div style="float: right; padding: 20px">
                <el-button type="primary" @click="updateRiskRule">保存</el-button>
            </div>
        </el-card>
        <el-dialog :visible.sync="dialogTableVisible" center width="600px" :before-close="closeConfig">
            <div>
                <el-table ref="multipleTable" :data="configList" tooltip-effect="dark" style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="id" label="Id">
                    </el-table-column>
                    <el-table-column prop="triggerCondition" label="触发条件">
                    </el-table-column>
                </el-table>
                <div style="display: flex; justify-content: flex-end;margin-top: 20px;">
                    <el-button @click="closeConfig">取消</el-button>
                    <el-button type="primary" @click="addCofig" :loading="addLoading">确定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// import { tableMixin } from '../../../utils/mixin';
import tablePage from '../../common/tablePage.vue';
import xtable from '../../common/Xtable.vue';
import { riskRuleList, ruleList, updateRiskRule, ruleLenderList, ruleLenderAdd } from '@/api/risk';
export default {
    name: 'us-payment-history',
    // mixins: [tableMixin],
    components: {
        tablePage,
        xtable
    },
    data() {
        return {
            addLoading: false,
            dialogTableVisible: false,
            tableOperate: [],
            totalSize: 0,
            currentPage: 0,
            // 0 等待  1成功 2失败
            tableData: [],
            lenderName: '',
            lenderId: '',
            turnOnCount: '',
            configList: [], //店铺表格
            configIds: [], //配置id
            checkConfig: [],//选中的配置
        };
    },
    watch: {
        '$route.query': {
            handler(newQuery) {
                this.lenderId = newQuery.lenderId;
                this.lenderName = newQuery.lenderName;
                this.turnOnCount = newQuery.turnOnCount;
                this.getList();
            },
            immediate: false,
            deep: false
        }
    },
    mounted() {
        this.lenderId = this.$route.query.lenderId;
        this.lenderName = this.$route.query.lenderName;
        this.turnOnCount = this.$route.query.turnOnCount;
        this.getList();
    },
    methods: {
        //获取配置
        getConfig() {
            ruleLenderList({ lenderId: this.lenderId }).then((res) => {
                this.configList = res.data || [];
                this.dialogTableVisible = true
            })
        },
        handleSelectionChange(val) {
            this.checkConfig = val;
        },
        //确定配置
        addCofig() {
            this.addLoading = true
            this.configIds = []
            this.checkConfig.forEach((item) => {
                this.configIds.push(item.id);
            })
            ruleLenderAdd({
                lenderId: this.lenderId,
                ruleIds: this.configIds
            }).then((res) => {
                this.dialogTableVisible = false;
                this.getList();
                this.addLoading = false
            }).catch(() => {
                this.addLoading = false

            })
        },
        //关闭列表
        closeConfig() {
            this.dialogTableVisible = false;
        },
        getList() {
            ruleList({ lenderId: this.lenderId }).then((res) => {
                this.tableData = res.data || [];
                this.totalSize = res.data.length || 0;
            });
        },
        updateRiskRule() {
            updateRiskRule(this.tableData).then((res) => {
                this.getList();
                this.$message.success('保存成功！');
            });
        },
        saveChanges() {
            console.log('保存表格更改', this.tableData);
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
