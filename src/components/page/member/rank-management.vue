<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <el-card style="margin-bottom: 40px">
            <el-row class="date-row">
                <span>当前统计为：{{currentYear}}年{{currentMonth}}月</span>
                <el-button type="primary" class="set-button" @click="dialogDateVisible = true">设置</el-button>
            </el-row>
            <div v-for="(group, groupIndex) in groups" :key="groupIndex" class="group-section">
                <div class="score-title">{{ group.name }}</div>
              <div v-if="group.items.length!==0">
                  <el-row class="group-row" v-for="(item, index) in group.items" :key="index" >
                      <el-col :span="2">
                          <span>{{ item.name }}</span>
                      </el-col>
                      <el-col :span="3">
                          <el-input v-model="item.commissionRate" placeholder="%" size="small"></el-input>%
                      </el-col>
                      <el-col :span="5">
                          <el-input v-model="item.baseWage" placeholder="基本工资" size="small" style="min-width: 200px"></el-input>元
                      </el-col>
                      <el-col :span="4">
                          <el-button type="primary" size="small" @click="upDateLevel(item)">设置</el-button>
                      </el-col>
                      <el-col :span="5">
                          <div @click="openUserDialog(item)" style="cursor: pointer">该级别已设置<span style="color: #fc0255;margin: 0 3px">{{item.salesCount}}</span>人</div>
                      </el-col>
                  </el-row>
              </div>
                <el-empty description="当前月份未设置该类别职级" :image-size="60" v-else></el-empty>
                <el-button  type="text" icon="el-icon-plus"
                           @click="openAddGroup(group)">新增职级</el-button>
            </div>
          <div>  <span>未设置职级人数<span style="color: #fc0255;margin: 0 3px">{{unassignedCount}}</span>人</span>
              <el-button type="primary" class="set-button" @click="dialogUnassignedVisible=true">查看</el-button></div>
        </el-card>
        <el-card style="margin-bottom: 60px;padding: 50px 0">
            <div style="display: flex;align-items: center;gap: 20px">  <span>适用于特殊提成政策</span>
                <el-button type="primary" class="set-button" @click="openSpecialUserDialog">设置</el-button>
                <div @click="openSpecialUserDialog" style="cursor: pointer">该级别已设置<span @click="" style="color: #fc0255;margin: 0 3px">{{specialRuleUsersCount}}</span>人</div>
            </div>
        </el-card>
        <el-dialog :title="currentLevel+'人员选择'" :visible.sync="dialogVisible" width="400px">
            <div class="dialog-body">
                <div class="left-panel">
                    <el-checkbox-group v-model="checkedUsers" @change="updateSelectedUsers" style="display: flex;flex-direction: column">
                        <el-checkbox v-for="user in users" :label="user" :key="user.id">{{ user.name }}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="right-panel">
                    <div class="right-panel-title">已选</div>
                    <div v-for="user in selectedUsers" :key="user.id" class="selected-user">
                        {{ user.name }}
                        <el-button @click="removeUser(user)" type="text" size="mini">×</el-button>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmSelection" class="confirm-button">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="特殊提成人员选择" :visible.sync="dialogSpecialVisible" width="400px">
            <div class="dialog-body">
                <div class="left-panel">
                    <el-checkbox-group v-model="checkedUsers" @change="updateSelectedUsers" style="display: flex;flex-direction: column">
                        <el-checkbox v-for="user in users" :label="user" :key="user.salesName">{{ user.salesName }}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="right-panel">
                    <div class="right-panel-title">已选</div>
                    <div v-for="user in selectedUsers" :key="user.salesName" class="selected-user">
                        {{ user.salesName }}
                        <el-button @click="removeUser(user)" type="text" size="mini">×</el-button>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmSpecialSelection" class="confirm-button">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="设置月份" :visible.sync="dialogDateVisible" width="30%">
            <el-form  ref="form" style="padding-left:20px" label-width="150px" label-position="left">
                <el-form-item label="目标统计月份" style="margin-right:30px" prop="dates">
                    <el-date-picker
                        v-model="monthOfYear"
                        type="month"
                        placeholder="选择日期"
                        value-format="yyyy-MM"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="primary" @click="changeDate" style="width:80px;height:35px">设 置</el-button>
                <el-button @click="dialogDateVisible = false" style="width:80px;height:35px">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新增职级" :visible.sync="dialogLevelVisible" width="30%">
            <el-form  ref="form" style="padding-left:20px" label-width="150px" label-position="left">
                <el-form-item label="职级选择" style="margin-right:30px" prop="addLevelId">
                    <el-select v-model="addLevelId" placeholder="请选择职级" style="width:100%">
                        <el-option v-for="item in addLevelList" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="primary" @click="addLevelForMonth" style="width:80px;height:35px">新 建</el-button>
                <el-button @click="dialogLevelVisible = false" style="width:80px;height:35px">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="未设置职级人员" :visible.sync="dialogUnassignedVisible" width="400px">
            <div class="dialog-body">
                <div class="left-panel">
                    <div v-for="user in usSalesLevelRecordVoList" :key="user.id" style="padding:5px 0;">
                        {{ user.salesName }}
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogUnassignedVisible=false" class="confirm-button">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    deleteBatchLevel, getLevelRecords,
    getLevelUsers, salesAllLevelList,
    salesLevelList, saveOrUpdate,
    unassignedUsers,
    upDateBatchLevel,
    upDateLevel
} from '../../../api/member';

export default {
    name: 'rank-management',
    data() {
        return {
            groups: [
                {
                    name: "KA",
                    items: []
                },
                {
                    name: "SA",
                    items: []
                }
            ],
            addLevelList: [],
            addLevelId:'',
            dialogVisible: false,
            dialogDateVisible: false,
            dialogLevelVisible: false,
            dialogUnassignedVisible: false,
            dialogSpecialVisible: false,
            currentMonth: '08',
            currentYear: '2024',
            monthOfYear: '2024-08',
            users: [],
            checkedUsers: [],
            selectedUsers: [],
            currentLevel: '',
            unassignedCount: '',
            usSalesLevelRecordVoList: [],
            currentLevelInfo: {},
            ids: [],
            specialRuleUsersCount: 0
        };
    },
    created() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

        this.currentYear = String(currentYear);
        this.currentMonth = currentMonth;
        this.monthOfYear = `${currentYear}-${currentMonth}`;
        this.getAllList()
        this.getUnassignedUsers()
        this.getSpecialUsers()
    },
    methods: {
        addLevelForMonth(){
            const selectedLevel = this.addLevelList.find(item => item.id === this.addLevelId);
            saveOrUpdate({
                salesLevelId: selectedLevel.id,
                commissionRate:  selectedLevel.commissionRate,
                baseWage: selectedLevel.baseWage,
                year: this.currentYear,
                month: this.currentMonth,
                monthOfYear: this.monthOfYear
            }).then(res=>{
                this.$message.success('新增成功!')
                this.dialogLevelVisible = false
                this.getAllList()
            })
        },
        openAddGroup(group){
            this.dialogLevelVisible = true
            salesLevelList({
                type: group.name,
            }).then(res=>{
                this.addLevelList = res.data.records
            })
        },
        getAllList(){
            salesAllLevelList({monthOfYear: this.monthOfYear}).then(res=>{
                this.groups[0].items = res.data.filter(item => item.type === 'KA');
                this.groups[1].items = res.data.filter(item => item.type === 'SA');
            })
        },
        openUserDialog(val){
            this.currentLevelInfo = val
            this.currentLevel = val.name
            this.dialogVisible = true
            this._getUsers(val.id)
        },
        openSpecialUserDialog(){
            this.dialogSpecialVisible = true
            this.getSpecialUsers()
        },
        //查询所有组别人员
        _getUsers(id){
            this.users = []
            this.checkedUsers = []
            this.selectedUsers = []
            getLevelUsers({
                salesLevelId: id,
                monthOfYear: this.monthOfYear
            }).then(res=>{
                this.users = res.data
                this.users.forEach(item => {
                    if (item.isCurrLevel) {
                        this.checkedUsers.push(item);
                    }
                });
                this.selectedUsers = [...this.checkedUsers];
            })
        },
        //查询所有组别人员
        getSpecialUsers(){
            this.users = []
            this.checkedUsers = []
            this.selectedUsers = []
            getLevelRecords({
                monthOfYear: this.monthOfYear
            }).then(res=>{
                this.users = res.data
                this.specialRuleUsersCount = 0
                this.users.forEach(item => {
                    if (item.isSpecialRule) {
                        this.checkedUsers.push(item);
                        this.specialRuleUsersCount = this.specialRuleUsersCount + 1
                    }
                });
                this.selectedUsers = [...this.checkedUsers];
            })
        },
        getUnassignedUsers(){
            unassignedUsers({monthOfYear: this.monthOfYear}).then(res=>{
                this.unassignedCount = res.data.unassignedCount
                this.usSalesLevelRecordVoList = res.data.salesLevelRecordVoList
            })
        },
        changeDate(){
            const [year,month] = this.monthOfYear.split('-')
            this.currentYear = year
            this.currentMonth = month
            this.getAllList()
            this.getUnassignedUsers()
            this.getSpecialUsers()
            this.dialogDateVisible = false
        },
        updateSelectedUsers() {
            this.selectedUsers = [...this.checkedUsers];
        },
        removeUser(user) {
            this.checkedUsers = this.checkedUsers.filter(u => u !== user);
            this.selectedUsers = this.selectedUsers.filter(u => u !== user);
        },
        confirmSpecialSelection(){
            this.users.forEach(checkedUser => {
                let existsInSelectedUsers = this.selectedUsers.some(selectedUser => selectedUser.id === checkedUser.id);
                if (existsInSelectedUsers) {
                    checkedUser.isSpecialRule = true
                }else{
                    checkedUser.isSpecialRule = false
                }
            });
            if(this.users.length>0){
                upDateBatchLevel(this.users).then(res=>{
                    this.$message.success('设置成功!')
                    this.getSpecialUsers()
                })
            }
            this.dialogSpecialVisible = false;
        },
        confirmSelection() {
            this.ids = []
            this.users.forEach(checkedUser => {
                let existsInSelectedUsers = this.selectedUsers.some(selectedUser => selectedUser.id === checkedUser.id);
                if (!existsInSelectedUsers&& checkedUser.isCurrLevel) {
                    this.ids.push(checkedUser.salesLevelRecordId);
                }
            });
            if(this.ids.length > 0){
                deleteBatchLevel(this.ids).then(res=>{
                    this.$message.success('设置成功!')
                    this.getAllList()
                    this.getUnassignedUsers()
                })
            }
            const processedData = this.selectedUsers.map(item => ({
                salesId: item.id,
                salesLevelId: this.currentLevelInfo.id,
                year: this.currentYear,
                month: this.currentMonth,
                monthOfYear: this.monthOfYear,
                name: item.name,
                code: this.currentLevelInfo.code || "",
                grade: this.currentLevelInfo.grade || "",
                type: this.currentLevelInfo.type || "",
                isSpecialRule: false,
                commissionRate: this.currentLevelInfo.commissionRate || 0,
                baseWage: this.currentLevelInfo.baseWage || 0,
            }));
            if(processedData.length!==0){
                upDateBatchLevel(processedData).then(res=>{
                    this.$message.success('设置成功!')
                    this.getAllList()
                    this.getUnassignedUsers()
                })
            }

            this.dialogVisible = false;
        },
        upDateLevel(row){
            saveOrUpdate({
                salesLevelId: row.id,
                commissionRate:  row.commissionRate,
                baseWage: row.baseWage,
                year: this.currentYear,
                month: this.currentMonth,
                monthOfYear: this.monthOfYear
            }).then(res=>{
                this.$message.success('设置成功!')
            })
        }
    }
};
</script>

<style lang='less' scoped>
.container {
}

.dialog-body {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    height: 300px; /* 调整高度以适应滚动条 */
}

.left-panel {
    flex: 1;
    overflow-y: auto;
    max-height: 100%;
    margin-right: 20px; /* 增加右边距以分隔两栏 */
}

.right-panel {
    flex: 1;
    padding-left: 20px;
    border-left: 1px solid #ebeef5;
    overflow-y: auto;
}

.right-panel-title {
    margin-bottom: 10px;
    font-weight: bold;
}

.selected-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    background: #f0f0f0;
    padding: 5px;
    max-width: 150px;
    border-radius: 5px;
}

.selected-user .el-button {
    margin-left: 10px;
    padding: 0;
}

.dialog-footer {
    text-align: center;
}

.confirm-button {
    background-color: #ff3366;
    border-color: #ff3366;
    color: #fff;
}

.score-title {
    height: 16px;
    font-size: 18px;
    display: block;
    line-height: 16px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #333333;
    padding-left: 9px;
    border-left: 3px solid #fe0255;
    margin-bottom: 20px;
}


.set-button {
    margin-left: 20px;
}

.group-section {
    margin: 30px 0;
}

.group-row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.group-row span,
.group-row .el-input,
.group-row .el-button {
    margin-right: 10px;
}

.group-row .el-input {
    width: 80px;
}

.group-row .el-button {
    width: 60px;
}

.group-row .el-col {
    display: flex;
    align-items: center;
}
</style>