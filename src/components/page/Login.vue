<template>
    <div class="login-wrap">
        <div class="top-menu">
            <a href="https://www.dowsure.com/" target="_blank"><img src="../../../public/img/dowsure-new.svg"
                    style="margin-left: 40px; margin-top: 13px" /></a>
            <Language style="float: right; margin-right: 40px; margin-top: -13px" />
        </div>
        <div class="ms-login" v-if="isPhone == 2">
            <div class="ms-login-box">
                <div class="ms-loginto">{{ $t('common_login2') }}</div>
                <div class="ms-title">BOSS V3.0</div>
                <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <el-input v-model="param.username" placeholder="username">
                            <el-button slot="prepend" icon="el-icon-user"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="password" v-model="param.password"
                            @keyup.enter.native="submitForm()">
                            <el-button slot="prepend" icon="el-icon-unlock"></el-button>
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm()">{{ $t('common_login') }}</el-button>
                    </div>
                    <!-- <p class="login-tips">Tips : 。</p> -->
                </el-form>
            </div>
        </div>

        <div v-if="isPhone == 1" class="ms-login" style="
                width: 90%;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto auto;
                height: 500px;
                padding: 0 1%;
                box-sizing: border-box;
            ">
            <div class="ms-title" style="font-size: 30px; height: 60px; margin-top: 50px; line-height: 30px">BOSS V3.0
            </div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item>
                    <div class="inputc">
                        <el-input v-model="param.username" placeholder="username"></el-input>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="inputc">
                        <el-input type="password" placeholder="password" v-model="param.password"
                            @keyup.enter.native="submitForm()"></el-input>
                    </div>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()"
                        style="height: 70px; font-size: 33px; margin-top: 20px; border-radius: 15px">{{
                            $t('common_login') }}</el-button>
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
<style>
.login-wrap .drop-title {
    height: 40px !important;
    margin-top: 22px;
}
</style>
<style lang="less" scoped>
.el-input-group {
    width: 320px;
    height: 40px;
    margin-bottom: 10px;
}

.ms-login-box {
    /deep/.el-input--small .el-input__inner {
        height: 40px !important;
        line-height: 40px !important;
        border-radius: 0 20px 20px 0;
        background: none !important;
        border: 1px solid #999999;
        border-left: none;
        color: white;
    }

    /deep/.el-input-group__prepend {
        padding: 0px 20px;
        border-radius: 20px 0px 0px 20px;
        background: none !important;
        border: 1px solid #999999;
        border-right: none;
    }

    /deep/input {
        background-color: rgba(255, 255, 255, 0) !important;
    }

    /deep/input:-webkit-autofill {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: #fff !important;
    }

    /deep/input:-webkit-autofill:focus {
        -webkit-text-fill-color: #333 !important;
    }
}

.inputc {
    /deep/.el-input--small .el-input__inner {
        height: 60px !important;
        font-size: 22px;
        border-radius: 15px;
        margin-top: 20px;
    }
}

.top-menu {
    position: absolute;
    height: 56px;
    width: 100%;
    left: 0px;
    right: 0px;
    top: 0px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
}

.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../../public/img/login-bgi.jpg);
    background-size: cover;
}

.ms-login-box {
    margin-top: 270px;
    margin-left: 88px;
}

.ms-loginto {
    color: #fff;
    font-size: 36px;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    font-size: 36px;
    color: #f40064;
}

.ms-login {
    width: 650px;
    height: 100vh;
    float: right;
    background: rgba(26, 26, 29, 0.9);
    box-shadow: 0px 4px 30px rgba(233, 218, 230, 0.2);
}

.ms-content {
    padding: 30px 0;
}

.login-btn {
    // text-align: center;
}

.login-btn button {
    width: 320px;
    height: 40px;
    line-height: 26px;
    margin-bottom: 10px;
    border-radius: 20px;
    background: linear-gradient(326.82deg, #ff2472 -5.17%, #ff5f61 85.53%);
    box-shadow: 3px 3px 10px rgba(225, 4, 83, 0.3);
    border: none;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
