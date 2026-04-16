import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import { Message } from 'vue';
import md5 from 'js-md5';
import '../public/css/theme-green/index.css';
import i18n from './i18n';
import 'babel-polyfill';
// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';
Vue.component('icon', Icon);
import * as echarts from 'echarts';
import store from './store/store';
import { isArray } from '@vue/shared';
import { permissionList } from './api/user';


Vue.prototype.$md5 = md5;
Vue.prototype.$showBtn = function (code) {
    return code ? (JSON.parse(localStorage.getItem('codesArr')).indexOf(code) >= 0 ? true : false) : true;
};
Vue.prototype.$export = function (url, fileName, type) {
    const axios = require('axios');
    axios({
        methods: 'get',
        responseType: 'blob',
        url: `${process.env.VUE_APP_BASE_URL + '/lending' + url}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .then(function (res) {
            var blob = new Blob([res.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            var downloadElement = document.createElement('a');
            var href = window.URL.createObjectURL(blob);
            downloadElement.href = href;
            downloadElement.download = `${fileName || '导出'}.${type || 'xlsx'}`;
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(href);
        })
        .catch((error) => {
            Vue.prototype.$message.info(error);
        });
};
Vue.prototype.$exportWarehouse = function (url, fileName, type) {
    const axios = require('axios');
    axios({
        methods: 'get',
        responseType: 'blob',
        url: `${process.env.VUE_APP_BASE_URL + '/warehouse' + url}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .then(function (res) {
            var blob = new Blob([res.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            var downloadElement = document.createElement('a');
            var href = window.URL.createObjectURL(blob);
            downloadElement.href = href;
            downloadElement.download = `${fileName || '导出'}.${type || 'xlsx'}`;
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(href);
        })
        .catch((error) => {
            Vue.prototype.$message.info(error);
        });
};
Vue.prototype.$exportMerchant = function (url, fileName, type) {
    const axios = require('axios');
    axios({
        methods: 'get',
        responseType: 'blob',
        url: `${url}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .then(function (res) {
            var blob = new Blob([res.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            var downloadElement = document.createElement('a');
            var href = window.URL.createObjectURL(blob);
            downloadElement.href = href;
            downloadElement.download = `${fileName || '导出'}.${type || 'xlsx'}`;
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(href);
        })
        .catch((error) => {
            Vue.prototype.$message.info(error);
        });
};

Vue.prototype.$message = Message;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small',
    i18n: (key, value) => i18n.t(key, value)
});

// Vue.use(Vant);

var whiteArr = '/403/login/register';
function filterPath(menuList, path) {
    menuList.forEach((item) => {
        if (item.menuList && item.menuList.length) {
            filterPath(item.menuList, path);
        }
        if (path.includes(item.index)) {
            localStorage.setItem('btnPermission', JSON.stringify(item.buttonList));
            // localStorage.setItem('btnPermission2', JSON.stringify(item.editButtons))
        }
    });
}
function filterTreeDefaultChecked(data) {
    data.forEach((item) => {
        if (item.menuList && item.menuList.length) {
            filterTreeDefaultChecked(item.menuList);
        } else {
            whiteArr += '/' + item.index + '/';
        }
    });
}
let isNext = false;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    if (!localStorage.getItem('role') && to.path === '/login') {
        next();
        return false;
    }

    // permissionList(localStorage.getItem('role')).then(res => {
    // localStorage.setItem('menuList', JSON.stringify(res.data));
    document.title = `${to.meta.title} | 保险后台`;
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userName');
    let routers = JSON.parse(localStorage.getItem('menuList'));
    let num = 0;

    if (to.path === '/login') {
        next();
        return;
    }
    if (!role && to.path !== '/' && !token) {
        Vue.prototype.$message.info('请登录');
        next('/login');
        return;
    } else if (!role && to.path !== '/login' && !token) {
        Vue.prototype.$message.info('请登录');
        if(window.location.href)
        next('/login?backUrl=' + encodeURIComponent(window.location.href));
        return;
    } else {
        isNext = JSON.parse(localStorage.getItem('routersArr')).includes(to.path);
        if (isNext) {
            isNext = false;
            next();
        } else {
            document.title = `保险后台`;
            Vue.prototype.$message.info('跳转页面无权限或页面不存在');
            next('login'); //考虑添加403页面 返回首页或者登录页
        }
    }
    // })
});
var vue = new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');

export default vue;
