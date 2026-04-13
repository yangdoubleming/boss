<template>
    <div class="login-wrap">
        <Language style="float: right;margin-right: 30px;margin-top: 20px;" />
        <div class="ms-login" v-if="isPhone==2">
            <div class="ms-title">BOSS V3.0</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">{{$t('common_login')}}</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 。</p> -->
            </el-form>
        </div>

        <div
            v-if="isPhone==1"
            class="ms-login"
            style="width:90%;left:0;right:0;top:0;bottom:0;margin:auto auto;height:500px;padding:0 1%;box-sizing:border-box"
        >
            <div
                class="ms-title"
                style="font-size:30px;height:60px;margin-top:50px; line-height:30px;"
            >BOSS V3.0</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item>
                    <div class="inputc">
                        <el-input v-model="param.username" placeholder="username"></el-input>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="inputc">
                        <el-input
                            type="password"
                            placeholder="password"
                            v-model="param.password"
                            @keyup.enter.native="submitForm()"
                        ></el-input>
                    </div>
                </el-form-item>
                <div class="login-btn">
                    <el-button
                        type="primary"
                        @click="submitForm()"
                        style="height:70px;font-size:33px;margin-top:20px;border-radius:15px"
                    >{{$t('common_login')}}</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
import { login } from '../../api/login';
import { permissionList } from '../../api/user';
import Language from '../../components/common/language.vue';
export default {
    components: {
        Language
    },
    data: function () {
        return {
            param: {
                username: '',
                password: ''
            },
            isPhone: 3,
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            routersArr: [],
            codesArr: []
        };
    },
    created() {
        // console.log(document.body.clientWidth);
        // console.log(document.body);
        // this.isPhone=document.body.clientWidth<1800?1:2
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';
        var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
        var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
        var bIsAndroid = sUserAgent.match(/android/i) == 'android';
        var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
        var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            this.isPhone = 1;
        } else {
            this.isPhone = 2;
        }
    },
    methods: {
        filterList(list) {
            if (!list && !list.length) return;

            list.forEach((item) => {
                this.filterList(item.childen);
                this.arr.push(item);
            });
        },

        filterPath(menuList) {
            menuList.forEach((item) => {
                if (item.childrenButton.length) {
                    this.filterPath(item.childrenButton);
                }
                if (item.childrenPage.length) {
                    this.filterPath(item.childrenPage);
                }
                if (item.path != '/' && item.path) {
                    if (!item.path.includes('/')) {
                        // 判断path是否自带斜杠/
                        this.routersArr.push('/' + item.path);
                    }else{
                        this.routersArr.push(item.path);
                    }
                }
            });
        },
        getDeepestPath(menuItem) {
            if (!menuItem.childrenPage || menuItem.childrenPage.length === 0) {
                return menuItem.path;
            }
            return this.getDeepestPath(menuItem.childrenPage[0]);
        },
        getAllDeepestPaths(menuList) {
            if (!menuList || menuList.length === 0) return null;
            return this.getDeepestPath(menuList[0]);
        },
        filterCode(menuList) {
            menuList.forEach((item) => {
                if (item.childrenPage.length) {
                    this.filterCode(item.childrenPage);
                }
                if (item.childrenButton.length) {
                    this.filterCode(item.childrenButton);
                }
                if (item.type != 'PAGE') {
                    this.codesArr.push(item.code);
                }
            });
        },
        submitForm() {
            this.$refs.login.validate((valid) => {
                if (valid) {
                    var pubkeyHex =
                        '0415bc58a0212dff04128a8caa46d8256267432cb2eba4db162d45bbc44c8d4e0c257bd712ed05889790eee39b641f55a8ebe7100dc044d8a34dba923f2aa7fbf0';

                    let obj = {};
                    obj.username = 'ACCOUNT:' + this.param.username;
                    obj.password = this.param.password;
                    obj.password = sm2Encrypt(this.param.password, pubkeyHex, 0);
                    login(obj).then((res) => {
                        let isSale = false
                        if (res.type == 'sale') {
                            isSale = true
                        }
                        localStorage.removeItem('menuList');
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('userId', res.userId);
                        localStorage.setItem('userName', this.param.username);
                        localStorage.setItem('role', res.role[0]);
                        if (res.role && res.role.length) {
                            permissionList(res.role[0]).then((res) => {
                                this.routersArr = [];
                                this.codesArr = [];
                                this.filterPath(res.data);
                                this.filterCode(res.data);
                                localStorage.setItem('routersArr', JSON.stringify(this.routersArr));
                                localStorage.setItem('codesArr', JSON.stringify(this.codesArr));
                                let defaultM = []
                                localStorage.setItem('menuList', JSON.stringify(defaultM.concat(res.data)));
                                this.$store.dispatch('setTopTitleName', defaultM.concat(res.data));
                                if (this.$route.query.backUrl) {
                                    window.location.href = decodeURIComponent(this.$route.query.backUrl);
                                } else {
                                    if (res.data.length > 0) {
                                        // 进第一个子菜单
                                        let firstPath = this.getAllDeepestPaths(res.data)
                                        console.log(firstPath, 'firstPath');
                                        if (!firstPath.includes('/')) {
                                            // 判断path是否自带斜杠/
                                            firstPath = '/' + firstPath
                                        }
                                        this.$router.push(firstPath)
                                    } else {
                                        this.$message.warning('您暂未分配菜单，请联系管理员');
                                    }
                                }
                            });
                        } else {
                            this.$message.info('账号暂无权限请联系管理员！');
                        }
                    });
                } else {
                    this.$message.error('请输入账号和密码');
                    return false;
                }
            });
        }
    }
};
</script>

<style lang='less' scoped>
.inputc {
    /deep/.el-input--small .el-input__inner {
        height: 60px !important;
        font-size: 22px;
        border-radius: 15px;
        margin-top: 20px;
    }
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../../public/img/login-bgi.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.4);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>