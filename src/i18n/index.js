import Vue from "vue"; //引入vue
import VueI18n from 'vue-i18n';
import elementEnLocale from 'element-ui/lib/locale/lang/en' //element英文包
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'//中文包
import enLocale from "./en";
import zhLocale from "./zh";
 
Vue.use(VueI18n) // 通过插件的形式挂载
 
// 引入本地
const messages = {
    en: {
     message: 'hello',
     ...enLocale,
     ...elementEnLocale
    },
    zh: {
    message: '你好',
    ...zhLocale,
    ...elementZhLocale
    }
}
 
// 创建国际化实例
const i18n = new VueI18n({
    // 设置默认语言
    locale: 'zh' || sessionStorage.getItem('locale'),
    messages,
})
export default i18n