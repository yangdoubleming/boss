import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import router from '../router/index.js';
let base = window.location.hostname.includes('.com') ? process.env.VUE_APP_BASE_URL : '/api/';
let num = 0;

const service = axios.create({
    baseURL: base
    //
    // baseURL: '/api',
    // timeout: 20000
});
let showMsg = true;
service.interceptors.request.use(
    (config) => {
        config.headers.token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        console.log('config',config)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
service.interceptors.response.use(
    (response) => {
        const res = response.data;

        if (res.code !== 200 && res.code !== '200' && !response.config.headers.apisass) {
            if (res.code == 2010) {
                num = num + 1;
                if (num == 1) {
                    return (window.location.href = window.location.origin + '/#/login?backUrl=' + encodeURIComponent(window.location.href));
                }
            }
            if (res.code === 2011) {
                num = num + 1;
                if (num == 1) {
                    return (window.location.href = window.location.origin + '/#/login?backUrl=' + encodeURIComponent(window.location.href));
                }
            }
            if (showMsg) {
                Message({
                    message: res.message || res.msg,
                    type: 'error',
                    duration: 2.5 * 1000
                });
                showMsg = false;
                setTimeout(() => {
                    showMsg = true;
                }, 2000);
            }

            return Promise.reject(res.message || res.msg || 'ErrorError');
        } else {
            return res;
        }
    },

    (error) => {
        console.log(error.response);
        if (showMsg && !error.response.config.headers.apisass) {
            if (error.response.data.message) {
                Message({
                    message: error.response.data.message || error.response.data.msg,
                    type: 'error',
                    duration: 2 * 1000
                });
            } else {
                Message({
                    message: error,
                    type: 'error',
                    duration: 2 * 1000
                });
            }

            showMsg = false;
            setTimeout(() => {
                showMsg = true;
            }, 2000);
        }

        return Promise.reject(error);
    }
);

export default service;
