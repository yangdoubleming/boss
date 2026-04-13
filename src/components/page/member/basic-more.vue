<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img src="../../../../public/img/favicon.png" style="width:17px;height:17px;margin-right:5px" alt />豆沙包
                /
            </div>

            <span style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px">{{ $route.meta.title }}</span>
        </div>
        <el-card>
            <div>
                <div class="link-header">
                        <el-col :span="8"><span>拜访记录链接</span></el-col>
                        <el-col :span="4"><span class="link-type-header">类型</span></el-col>
                </div>
                <div v-if="linkList.length>0">
                    <div v-for="(link, index) in linkList" :key="index" class="link-row" >
                        <el-row :gutter="20" style="display: flex;align-items: center">
                            <el-col :span="8">
                                <el-input v-model="link.resourceCode" type="text" placeholder="输入链接" class="link-input" />
                            </el-col>
                            <el-col :span="4">
                                <el-select v-model="link.resourceType" class="link-type">
                                    <el-option value="VISIT_RECORD" label="卖家">卖家</el-option>
                                    <el-option value="CHANEEL_VISIT_RECORD" label="渠道">渠道</el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2">
                                <el-button @click="saveLink(index)" type="text">
                                    保存
                                </el-button>
                                <el-button @click="deleteLink(index)" type="text" v-if="link.createTime">
                                    删除
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <el-empty description="无记录" :image-size="60" v-else></el-empty>
                <el-button @click="addLink" class="add-link-btn" type="text">+ 添加链接</el-button>
            </div>

<!--            <div>-->
<!--                <div class="link-header">-->
<!--                    <el-col :span="8"><span>离职日期   </span></el-col>-->
<!--                </div>-->
<!--                <el-date-picker-->
<!--                    v-model="leaveDate"-->
<!--                    type="date"-->
<!--                    placeholder="选择日期">-->
<!--                </el-date-picker>-->
<!--            </div>-->
<!--            <div>-->

<!--            </div>-->
<!--            <el-button type="primary">保存</el-button>-->
        </el-card>
    </div>
</template>

<script>
import { deleteSheet, saveSheet, sheetList, updateSheet } from '../../../api/member';
import { permissionDelete } from '../../../api/user';

export default {
    name: 'platform-list',
    data() {
        return {
            linkList: [
            ],
            leaveDate: '',
            salesId: null
        };
    },
    watch: {
        '$route.query': {
            handler(newQuery) {
                if(this.$route.path.indexOf('/member-more')!==-1){
                    this.salesId = this.$route.query.id;
                    this.getSheetList()
                }
            }
        }
    },
    created() {
        this.salesId = this.$route.query.id;
        this.getSheetList()
    },
    methods: {
        getSheetList(){
            sheetList({salesId: this.salesId}).then(res=>{
                this.linkList = res.data
                console.log(this.linkList.length);
            })
        },
        addLink() {
            this.linkList.push({
                salesId: this.salesId,
                resourceCode: '',
                resourceType: "CHANEEL_VISIT_RECORD"});
        },
        saveLink(index) {
            const link = this.linkList[index]
            if(!link.resourceCode){
                this.$message.error('拜访记录链接不能为空！');
                return
            }
            if (!link.createTime) {
                saveSheet({
                    salesId: this.salesId,
                    resourceCode: link.resourceCode,
                    resourceType: link.resourceType
                }).then(res=>{
                    this.$message.success('添加成功！');
                    this.getSheetList()
                })
            } else {
                updateSheet(
                {
                    id: link.id,
                    salesId: link.salesId,
                    resourceCode: link.resourceCode,
                    resourceType: link.resourceType
                }
                ).then(res=>{
                    this.$message.success('保存成功！');
                })
            }
        },
        deleteLink(index){
            this.$confirm('将删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    deleteSheet({id:this.linkList[index].id}).then(res=>{
                        this.$message.success('删除成功！');
                        this.getSheetList()
                    })
                })
                .catch(() => { });
        }
    }
};
</script>

<style lang='less' scoped>
.link-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-weight: bold;
    gap: 10px;
    color: #666666;
}


.link-row {
    margin-bottom: 10px;
}

.link-input {
    flex: 2;
    margin-right: 10px;
    padding: 5px;
}

.link-type {
    margin-right: 10px;
    flex: 1;
}

</style>