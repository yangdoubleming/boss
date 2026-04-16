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
@import '../public/css/main.css';
@import '../public/css/color-dark.css';
::selection {
    color: #fff;
    background: #409EFF;
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
