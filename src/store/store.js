import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        firstData: 10,
        routers: [],
        whiteArr: '',
        stateMenuList: [],
        searchList: {},
        placeholderArr: [],
        isCollapse: false, //是否折叠,
        examineListNum:0
    }, //状态管理
    mutations: {
        changeDataFun(state, value) {
            state.firstData += value;
        },
        changeRouters(state, value) {
            state.routers = value;
        },
        changeWhiteArr(state, value) {
            state.whiteArr = value;
        },
        setTitleName(state, payload) {
            state.stateMenuList = payload;
        },
        changeCollapse(state, payload) {
            state.isCollapse = payload;
        },
        changeexamineListNum(state, examineListNum) {
            state.examineListNum = examineListNum;
        }   
    }, //修改state
    actions: {
        // commit('changeDataFun',10)
        setTopTitleName(context, payload) {
            context.commit('setTitleName', payload); //context提交
        }
    }, //异步操作
    getters: {
        whiteArr(state) {
            return state.whiteArr;
        },
        firstData(state) {
            return state.firstData++;
        },
        routers(state) {
            return state.routers;
        }
    }, //计算属性
    modules: {} //模块
});
export default store;
