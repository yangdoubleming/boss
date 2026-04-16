<template>
    <div class="sidebar">
        <div style="background: #282829;height: 80px;" v-if="!collapse">
            <img style="float: left;margin-top: 18px;margin-left: 7px;transition: margin-left .3s;border-radius: 10px;height: 48px;"
                src="../../../public/img/icon-dun.png" />
            <div style="margin:0 15px;margin-left:10px;transition: margin-left .3s;margin-top: 31px;float: left;font-size: 16px;color:white;">保险后台管理系统</div>
        </div>
        <div style="background: #282829;height: 80px;" v-else>
            <img style="float: left;margin-top: 18px;margin-left: 7px;transition: margin-left .3s;border-radius: 10px;height: 48px;"
                src="../../../public/img/icon-dun.png" />
                <div style="margin:0 15px;margin-left:10px;transition: margin-left .3s;margin-top: 31px;float: left;font-size: 16px;color:white;">保险后台管理系统</div>
        </div>
        <el-menu class="sidebar-el-menu" :default-active="show" :collapse="collapse" background-color="#282829"
            text-color="rgb(152, 158, 173)" active-text-color="#409EFF" unique-opened router @select="handleSelect">
            <template v-for="item in menuList">
                <template v-if="item.childrenPage.length">
                    <el-submenu :index="item.createTime" :key="item.id">
                        <template #title>
                            <i :class="item.icon" style="color: rgb(152, 158, 173)"></i>
                            <span>{{ item.name }}</span>
                        </template>

                        <template v-for="subItem in item.childrenPage">
                            <el-submenu v-if="subItem.childrenPage.length" :index="subItem.path" :key="subItem.id">
                                <template #title>
                                    {{ subItem.name }}
                                </template>

                                <el-menu-item v-for="(threeItem, i) in subItem.childrenPage" :key="i"
                                    :index="threeItem.path">
                                    {{ threeItem.name }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else-if="subItem.type" :index="subItem.path" :key="subItem.id">
                                <!-- <span class="red-dots dot-little" v-if="subItem.path == 'waitExamine'">{{$store.state.examineListNum}}</span> -->

                                <span>{{ subItem.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else-if="item.type">
                    <el-menu-item :index="item.path" :key="item.id">
                        <i :class="item.icon" style="color: rgb(152, 158, 173)"></i>
                        <template #title>{{ item.name }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import { changeList } from '../../utils/lan';
export default {
    data() {
        return {
            collapse: false,
            show: null,
            navs: [],
            menu: []
        };
    },
    computed: {
        menuList() {
            return this.$store.state.stateMenuList;
        }
    },
    watch: {
        $route(n) {
            this.changeMenu();
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            if (key == 'waitExamine') {

            }
        },
        iconP(num) {
            let x = 0;
            let s = 0;

            let d = (num / 13).toFixed(2).toString().split('.');
            x = d[0] > 0 ? (d[1] > 0 ? d[0] : d[0] - 1) : 0;
            s = num % 13 == 0 ? 13 : num % 13;
            s = s == 0 ? 1 : s;
            //    console.log(x);
            let n = [];

            n[0] = 28 + (s - 1) * 35.2 || 0;
            n[1] = 98 + x * 35.5 || 0;
            // console.log(n);
            return '-' + n[0] + 'px' + ' ' + '-' + n[1] + 'px';
        },
        changeMenu() {
            try {
                let route = this.$route.path.split('/');
                let vueRouter = this.$router.options.routes.filter((router) => {
                    return router.path == '/';
                })[0].childrenPage;
                let filterVuerouter = vueRouter.filter((router) => {
                    return '/' + route[1] == router.path;
                });
                this.navs = filterVuerouter[0].childrenPage;
                let router = '/' + route[1] + '/' + route[2];
                this.show = router;
            } catch (e) {
                console.log('eeeeee', e);
                this.show = this.$route.path.replace('/', '');
            }
        },
        changeMenuList() {
            this.menu = JSON.parse(localStorage.getItem('menuList'));
            this.mapTree(this.menu);
        },
        mapTree(data) {
            if (sessionStorage.getItem('locale') == 'en') {
                data.forEach((items) => {
                    //
                    if (items.name) {
                        changeList.forEach((ele) => {
                            if (items.name == ele.cn) {
                                items.name = ele.en;
                            }
                        });
                    }
                    if (items.childrenPage.length === 0) {
                        localStorage.setItem('menuList', JSON.stringify(this.menu));
                        return false;
                    }
                    if (items.childrenPage.length > 0) {
                        this.mapTree(items.childrenPage);
                    }
                })
            } else {
                data.forEach(items => {    //
                    if (items.name) {
                        changeList.forEach((ele) => {
                            if (items.name == ele.en) {
                                items.name = ele.cn;
                            }
                        });
                    }
                    if (items.childrenPage.length === 0) {
                        localStorage.setItem('menuList', JSON.stringify(this.menu));
                        return false;
                    }
                    if (items.childrenPage.length > 0) {
                        this.mapTree(items.childrenPage);
                    }
                });
            }
        }
    },
    created() {

        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        this.changeMenuList();
        this.$store.state.stateMenuList = JSON.parse(localStorage.getItem('menuList'));
        localStorage.setItem('menuList', JSON.stringify(this.$store.state.stateMenuList));
        bus.$on('collapse', (msg) => {
            this.collapse = msg;

            bus.$emit('collapse-content', msg);
        });
        this.changeMenu();
    }
};
</script>

<style scoped>
.submenu-icon {
    width: 19px;
    height: 20px;
    display: inline-block;
    background: url('../../assets/111.svg') no-repeat;
    /* background-position: -170px -110px; */
    margin-right: 5px;
    /* background-size: 738px 522px; */
    background-size: 500px 500px;
}

.el-menu {
    border: 0 !important;
}

.el-menu-item {
    background-color: rgba(0, 0, 0, 0.1);
}

.el-menu-item>li {
    border-right: none;
}

.el-menu-item .is-active {
    /* background-color: #409EFF !important; */
}

.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 0px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
    border-right: none;
}

.sidebar>ul {
    height: 100%;
}

.red-dots {
    display: inline-block;
    color: white;
    position: relative;
    top: -3px;
    left: 0px;
    width: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    border-radius: 14px;
    font-size: 10px;
    background-color: rgb(206, 43, 43);
}
</style>
