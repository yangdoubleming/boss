<template>
    <div id="app" ref="app">
        <router-view></router-view>
    </div>
</template>
<script>
import Watemark from './directives';
export default {
    computed: {
        userName() {
            const name = localStorage.getItem('hahaha');
            return name && name.length > 0 ? name : '未获取到用户名';
        }
    },
    mounted() {
        // console.log();
        // var reg = /[\u4e00-\u9fa5]+/g;
        // console.log(document.getElementById('app').innerHTML);
        // console.log(document.getElementById('app').innerHTML.match(reg));
        // console.log(typeof document.getElementById('app').innerHTML);
        // document.getElementById('app').innerHTML = document.getElementById('app').innerHTML.replace('登录', 'denglu');
    }
    // mounted() {
    //     // Watermark.set(this.userName);
    // }
};
</script>

<style lang="less">
/deep/.el-button--primary {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6px 24px;
    gap: 10px;

    /* 1 */

    background: linear-gradient(326.82deg, #ff2472 -5.17%, #ff5f61 85.53%) !important;
    border-radius: 150px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
}
@import '../public/css/main.css';
@import '../public/css/color-dark.css';
::selection {
    color: #fff;
    background: #fe1964;
}
/* 谷歌 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}
/* 火狐 */
input {
    -moz-appearance: textfield;
}
</style>
