<template>
    <div>
        <div style="display:flex; align-items: center;padding:18px">
            <div style="color:rgba(0,0,0,.45);font-size:14px;display:flex; align-items: center;">
                <img
                    src="../../../../public/img/favicon.png"
                    style="width:17px;height:17px;margin-right:5px"
                    alt
                />豆沙包 /
            </div>
            <span
                style="color:rgba(0,0,0,.65);font-size:14px;padding-left:5px"
            >{{$route.query.id?'编辑活动':'创建活动'}}</span>
        </div>
        <img src alt />
        <div style="display:flex;">
            <el-card class="edit-card" ref="ads">
                <div class="edit-box">
                    <el-form ref="form" :model="form" label-width="110px">
                        <el-form-item label="活动名称">
                            <el-input v-model="form.eventName"></el-input>
                        </el-form-item>
                        <el-form-item label="活动代码">
                            <el-input v-model="form.eventCode"  style="width:230px"></el-input>
                        </el-form-item>
                        <el-form-item label="产品类型">
                            <el-select v-model="form.eventProductType" placeholder="请选择活动区域">
                                <el-option label="保险" value="1"></el-option>
                                <el-option label="贷款" value="2"></el-option>
                                <el-option label="贷款与保险" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="活动适配设备">
                            <el-radio-group v-model="form.eventTerminalType">
                                <el-radio label="2">PC端</el-radio>
                                <el-radio label="1">移动端</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动时间">
                            <el-date-picker
                                v-model="form.dates"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="制作流程">
                            <el-steps :active="moduleList.length" align-left>
                                <el-step
                                    v-for="(item,index) in moduleList"
                                    :key="item.id"
                                    :title="item.type?item.type=='1'?'图片':item.type=='2'?'表单':'编辑' :'编辑'"
                                    @click.native="openModule(index)"
                                ></el-step>
                            </el-steps>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="warning" @click="addModule">新增模块</el-button>
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>

            <el-dialog title="编辑" :visible.sync="showEdit" width="30%">
                <el-form ref="form" :model="editForm" label-width="110px">
                    <el-form-item label="模块类型：">
                        <el-select v-model="editForm.eventPageType" placeholder="请选择类型">
                            <el-option label="图片" value="1"></el-option>
                            <el-option label="表单" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="上传图片" v-if="editForm.eventPageType==1">
                        <div class="upload">
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                            >
                                <img
                                    v-if="editForm.eventPageImageUrl"
                                    :src="editForm.eventPageImageUrl"
                                    class="avatar"
                                />
                                <i
                                    v-if="!editForm.eventPageImageUrl"
                                    class="el-icon-plus avatar-uploader-icon"
                                    style="margin-top:65px"
                                ></i>
                            </el-upload>
                        </div>
                    </el-form-item>

                    <div v-if="editForm.eventPageType==2">
                        <el-form-item
                            v-for="(item,index) in editForm.list"
                            :key="item.id"
                            :label="'输入框'+(index+1)"
                        >
                            <el-input
                                v-model="item.placeholder"
                                placeholder="提示语"
                                style="width:250px"
                            ></el-input>
                            <div>
                                类型：
                                <el-radio-group v-model="item.btnEventType">
                                    <el-radio label="text" value="text">文本</el-radio>
                                    <el-radio label="phone" value="text">手机号</el-radio>
                                    <!-- <el-radio label="passWord" value="passWord">密码</el-radio> -->
                                    <el-radio label="phoneCode" value="phoneCode">验证码</el-radio>
                                </el-radio-group>
                            </div>

                            <div class="upload" @click="uploadIndex=index">
                                上传图标：
                                <el-upload
                                    class="avatar-uploader"
                                    :action="uploadUrl"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess2"
                                >
                                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                                    <i
                                        v-if="!item.icon"
                                        class="el-icon-plus avatar-uploader-icon"
                                        style="margin-top:65px"
                                    ></i>
                                </el-upload>
                            </div>
                        </el-form-item>
                    </div>
                    <el-button
                        type="primary"
                        v-if="editForm.eventPageType==2"
                        style="margin-left:110px"
                        @click="addInput"
                    >新增输入框</el-button>

                    <el-form-item label="按钮事件类型" v-if="editForm.eventPageType==2">
                        <el-radio-group v-model="editForm.btnEventType">
                            <el-radio label="1">消息框</el-radio>
                            <el-radio label="2">跳转</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        label="消息内容"
                        v-if="editForm.btnEventType==1 &&editForm.eventPageType==2"
                    >
                        <el-input v-model="editForm.btnEvent" placeholder style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="跳转地址"
                        v-if="editForm.btnEventType==2 && editForm.eventPageType==2"
                    >
                        <el-input v-model="editForm.btnEvent" placeholder style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="上传按钮图" v-if="editForm.eventPageType==2">
                        <div class="upload">
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess3"
                            >
                                <img
                                    v-if="editForm.btnImage"
                                    :src="editForm.btnImage"
                                    class="avatar"
                                />
                                <i
                                    v-if="!editForm.btnImage"
                                    class="el-icon-plus avatar-uploader-icon"
                                    style="margin-top:65px"
                                ></i>
                            </el-upload>
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="deleteModule">删除模块</el-button>
                    <el-button type="primary" @click="submitModule">确 定</el-button>
                    <el-button @click="showEdit = false">取 消</el-button>
                </span>
            </el-dialog>

            <div
                style="max-height:1000px;overflow:auto;width:400px;margin-left:30px;background:#fff"
            >
                <iframe
                    :src="iUrl"
                    style="height:4000px;zoom:0.5"
                    width="750"
                    frameborder="no"
                    border="0"
                    marginwidth="0"
                    marginheight="0"
                    scrolling="yes"
                    allowtransparency="yes"
                ></iframe>
            </div>
        </div>
        <div class="animate" id="circle"></div>
    </div>
</template>

<script>
import { createActivity } from '../../../api/statistics';
export default {
    name:'activity-detail',
    data() {
        return {
            iUrl: 'http://117.78.7.112:8227/module',
             defaultUrl: 'http://117.78.7.112:8227/module',
            uploadUrl:process.env.VUE_APP_ACTIVITY_UPLOAD+ '/uploadImg/activity', //上传基地址
            showEdit: false,
            uploadIndex: '',
            editForm: {
                eventPageType: '', //1图片   2表单
                eventPageImageUrl: '', // 图片路径
                eventPageImageSort: '', //模块序号
                btnImage: ''

                // list: [
                //     {
                //         id: 1321,
                //         placeholder: '',
                //         icon: '',
                //         btnEventType: '' //按钮事件类型
                // btnEvent:''
                //     }
                // ]
            },
            form: {
                dates: [],
                eventName: '',
                eventProductType: '',
                eventTerminalType: '',
                eventStarTime: '',
                eventCode: '',
                eventEndTime: ''
            },
            moduleList: [
                {
                    id: 1,
                    eventPageType: '', //0图片   1表单
                    eventPageImageUrl: '', // 图片路径
                    eventPageImageSort: '', //模块序号
                    list: [
                        {
                            id: 2,
                            placeholder: '',
                            icon: '',
                            btnEventType: '', //按钮事件类型
                            btnEvent: '',
                            btnImage: ''
                        }
                    ]
                }
            ],
            editingIndex: '', //正在编辑的模块
           
        };
    },
   
    created() {
        if (this.$route.query.eventCode) {
            getEvent(this.$roue.query).then((res) => {});
        }
    },
    methods: {
        editI() {
            console.log(this.moduleList);
            this.iUrl = this.defaultUrl;
            this.iUrl=this.iUrl+'?data='+JSON.stringify(this.moduleList)
            // this.iUrl = this.iUrl + '?data=' + JSON.stringify(this.moduleList);
            console.log(this.iUrl);
        },
        deleteModule() {
            this.moduleList.splice(this.editingIndex, 1);
            this.showEdit = false;
        },
        addModule() {
            this.moduleList.push({
                id: Math.ceil(Math.random() * 99999),
                eventPageType: '', //0图片   1表单
                eventPageImageUrl: '', // 图片路径
                eventPageImageSort: '', //模块序号
                list: [
                    {
                        id: 2,
                        placeholder: '',
                        icon: '',
                        btnEventType: '', //按钮事件类型
                        btnEvent: '',
                        btnImage: ''
                    }
                ]
            });
        },
        submitModule() {
            this.editForm.id = Math.ceil(Math.random() * 99999);
            this.$set(this.moduleList, this.editingIndex, JSON.parse(JSON.stringify(this.editForm)));
            console.log(this.moduleList);
            this.showEdit = false;
            this.editI();
        },
        openModule(index) {
            this.editingIndex = index;
            this.editForm = JSON.parse(JSON.stringify(this.moduleList[index]));
            // console.log(this.moduleList[index])
            this.showEdit = true;
        },
        addInput() {
            this.editForm.list.push({
                id: Math.ceil(Math.random() * 99999),
                placeholder: '',
                icon: '',
                btnEventType: '', //按钮事件类型
                btnEvent: ''
            });
        },
        handleClose() {},
        onSubmit() {
            this.form.eventStarTime = this.form.dates.length ? this.form.dates[0] : '';
            this.form.eventEndTime = this.form.dates.length ? this.form.dates[1] : '';
            this.form.eventCreateBossName = localStorage.getItem('userName');
            let obj = JSON.parse(JSON.stringify(this.form));
            obj.list = this.moduleList;
            obj.list.forEach((item, index) => {
                item.eventPageSize = index;
                item.eventTerminalType = this.form.eventTerminalType;
                if (item.eventPageType == 2) {
                    item.eventPageImageUrl = JSON.stringify(item.list)
                 
                }
            });

            createActivity(obj).then((res) => {
                this.$message.success('编辑成功！');
            });
        },
        handleAvatarSuccess(res) {
            this.editForm.eventPageImageUrl = res.data.fullFilePath;
        },
        handleAvatarSuccess2(res) {
            if (res) {
                console.log(res);
                console.log(this.uploadIndex);
                this.editForm.list[this.uploadIndex].icon = res.data.fullFilePath;
                console.log(this.editForm);
            }
        },
        handleAvatarSuccess3(res) {
            this.$set(this.editForm, 'btnImage', res.data.fullFilePath);
            console.log(this.editForm);
        }
    }
};
</script>

<style lang='less' scoped>
.upload {
    /deep/.el-upload {
        width: 150px !important;
        height: 150px !important;
    }
}
/deep/.el-upload .el-upload--text {
    width: 150px !important;
    height: 150px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}
/deep/.edit-card {
    width: 70%;
}
</style>