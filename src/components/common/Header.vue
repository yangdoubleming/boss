<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold" style="color: #74686b"></i>
            <i v-else class="el-icon-s-unfold" style="color: #74686b"></i>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link dorp-down-title">
                        <img src="../../../public/img/profilePicture.svg" height="32px" />
                        <span>{{ username }}</span>
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible2" width="20%">
            <el-form style="padding-left: 20px" label-width="60px">
                <el-form-item label="旧密码">
                    <el-input v-model="editForm.oldPassword" type="passWord" autocomplete="off"
                        style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="editForm.newPassword" type="passWord" autocomplete="off"
                        style="width: 200px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="changePassword">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import bus from '../common/bus';
import { loginOut } from '../../api/login';
import { userList, roleList, roleAllocat, addUser, updateUser } from '../../api/user';
export default {
    components: {
    },
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: '',
            message: 2,
            dialogFormVisible2: false,
            editForm: {
                id: '',
                newPassword: '',
                oldPassword: ''
            }
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('userName');
            return username ? username : this.name;
        }
    },
    methods: {
        changePassword() {
            var pubkeyHex =
                '0415bc58a0212dff04128a8caa46d8256267432cb2eba4db162d45bbc44c8d4e0c257bd712ed05889790eee39b641f55a8ebe7100dc044d8a34dba923f2aa7fbf0';
            let obj = JSON.parse(JSON.stringify(this.editForm));
            obj.id = localStorage.getItem('userId');
            obj.newPassword = sm2Encrypt(this.editForm.newPassword, pubkeyHex, 0);
            obj.oldPassword = sm2Encrypt(this.editForm.oldPassword, pubkeyHex, 0);
            updateUser(obj).then((res) => {
                this.$message.success('修改成功！');
                this.dialogFormVisible2 = false;
                loginOut().then((res) => {
                    // 保留 warningListColumns 缓存
                    const warningListColumns = localStorage.getItem('warningListColumns');
                    localStorage.clear();
                    if (warningListColumns) {
                        localStorage.setItem('warningListColumns', warningListColumns);
                    }
                    this.$router.push('/login');
                });
            });
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                loginOut().then((res) => {
                    // 保留 warningListColumns 缓存
                    const warningListColumns = localStorage.getItem('warningListColumns');
                    localStorage.clear();
                    if (warningListColumns) {
                        localStorage.setItem('warningListColumns', warningListColumns);
                    }
                    this.$router.push('/login');
                });
            } else if (command == 'changePassword') {
                this.dialogFormVisible2 = true;
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.dorp-down-title {
    color: #fe1964;
    display: flex;
    align-items: center;
    margin-top: 16px;
}

.dorp-down-title * {
    display: inline-block;
}

.dorp-down-title span {
    margin: 0 10px;
    font-size: 16px;
}

.dorp-down-title i {
    display: inline-block;
    font-size: 20px;
    color: #f40064;
}

.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    font-size: 22px;
    color: #fff;
    background-color: #282829;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
}

.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 80px;
}

.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}

.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}

.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}

.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}

.btn-bell .el-icon-bell {
    color: #fff;
}

.user-name {
    margin-left: 10px;
}

.user-avator {
    margin-left: 20px;
}

.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>
