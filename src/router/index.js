import Vue from 'vue';
import Router from 'vue-router';
import Watermark from '../directives';
const originalPush = Router.prototype.push;

Vue.use(Router);

let router = new Router({
    // mode: 'history',
    // base:'/v3',
    routes: [
        // {
        //     path: '/',
        //     redirect: '/dashboard',
        //     meta: {
        //         title: '',
        //         myKeepAlive: false
        //     }
        // },
        {
            path: '/',
            redirect: '/asset-protection-change',
            meta: {
                title: '',
                myKeepAlive: false
            }
        },

        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: '',
                myKeepAlive: false
            },
            children: [
              
                {
                    name: 'partner-management-insurance',
                    path: '/partner-management-insurance',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/partner-management-insurance.vue'),
                    meta: {
                        title: '保险合伙人管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'rebate-water',
                    path: '/rebate-water',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/rebate-water.vue'),
                    meta: {
                        title: '返佣流水',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'rebate-water-loan',
                    path: '/rebate-water-loan',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/rebate-water-loan.vue'),
                    meta: {
                        title: '贷款返佣流水',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'rebate-coefficient',
                    path: '/rebate-coefficient',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/rebate-coefficient.vue'),
                    meta: {
                        title: '返佣系数',
                        myKeepAlive: true
                    }
                },
                {
                    name: 'rebate-water-insurance',
                    path: '/rebate-water-insurance',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/rebate-water-insurance.vue'),
                    meta: {
                        title: '保险返佣流水',
                        myKeepAlive: false
                    }
                },

                {
                    name: 'rebate-detail',
                    path: '/rebate-detail',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/rebate-detail.vue'),
                    meta: {
                        title: '返佣详情',
                        myKeepAlive: false
                    }
                },

                {
                    name: 'loan-customer',
                    path: '/loan-customer',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/loan-customer.vue'),
                    meta: {
                        title: '贷款客户',
                        myKeepAlive: false
                    }
                },

                {
                    name: 'commission-settlement',
                    path: '/commission-settlement',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/commission-settlement .vue'),
                    meta: {
                        title: '贷款佣金结算',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'insure-commisson-settlement',
                    path: '/insure-commisson-settlement',
                    component: () =>
                        import(/* webpackChunkName: "loanDataBoard" */ '../components/page/statistics/insure-commisson-settlement.vue'),
                    meta: {
                        title: '保险佣金结算',
                        myKeepAlive: false
                    }
                },

                {
                    name: 'settlement-records',
                    path: '/settlement-records',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/settlement-records.vue'),
                    meta: {
                        title: '结算记录',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'settlt-loan',
                    path: '/settlt-loan',
                    component: () => import(/* webpackChunkName: "loanDataBoard" */ '../components/page/statistics/settlt-loan.vue'),
                    meta: {
                        title: '结算详情',
                        myKeepAlive: false
                    }
                },

                {
                    name: 'insure-rebate',
                    path: '/insure-rebate',
                    component: () => import(/* webpackChunkName: "loanDataBoard" */ '../components/page/statistics/insure-rebate.vue'),
                    meta: {
                        title: '保险返佣排行榜',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'insure-',
                    path: '/insure-statistics',
                    component: () => import(/* webpackChunkName: "loanDataBoard" */ '../components/page/statistics/insure-statistics.vue'),
                    meta: {
                        title: '保险数据统计',
                        myKeepAlive: false
                    }
                },

                {
                    name: 'settlement-records-detail',
                    path: '/settlement-records-detail',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/settlement-records-detail.vue'),
                    meta: {
                        title: '保险结算详情',
                        myKeepAlive: false
                    }
                },

                {
                    path: '/dataBoard',
                    name: 'dataBoard',
                    component: () => import('../components/page/insurance/dataBoard.vue'),
                    meta: {
                        title: '数据看板',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'insurOrderReview',
                    path: '/insurOrderReview',
                    component: () => import('../components/page/insurance/insurOrderReview.vue'),
                    meta: {
                        title: '订单复核',
                        myKeepAlive: true
                    }
                },
                {
                    path: '/collectionData',
                    name: 'collectionData',
                    component: () => import('../components/page/insurance/collectionData.vue'),
                    meta: {
                        title: '补录资料',
                        myKeepAlive: false
                    }
                },

                {
                    path: '/collection-detail',
                    name: 'collectionDetail',
                    component: () => import('../components/page/insurance/collectionDetail.vue'),
                    meta: {
                        title: '补录资料详情',
                        myKeepAlive: false
                    }
                },

                {
                    path: '/insurance',
                    name: 'insurance',
                    component: () => import('../components/page/insurance/insurance.vue'),
                    meta: {
                        title: '订单管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    path: '/channelList',
                    name: 'channelList',
                    component: () => import('../components/page/insurance/channelList.vue'),
                    meta: {
                        title: '渠道管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    path: '/channelExamine',
                    name: 'channelExamine',
                    component: () => import('../components/page/insurance/channelExamine.vue'),
                    meta: {
                        title: '渠道审核',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    path: '/channelCommission',
                    name: 'channelCommission',
                    component: () => import('../components/page/insurance/channelCommission.vue'),
                    meta: {
                        title: '渠道返佣流水',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    path: '/insuranceCommission',
                    name: 'insuranceCommission',
                    component: () => import('../components/page/insurance/insuranceCommission.vue'),
                    meta: {
                        title: '保司返佣流水',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'starrDetail',
                    path: '/insurance-detail-starr',
                    component: () => import('../components/page/insurance/starrDetail.vue'),
                    meta: {
                        title: 'starr订单详情',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'pnDetail',
                    path: '/insurance-detail-pn',
                    component: () => import('../components/page/insurance/pnDetail.vue'),
                    meta: {
                        title: '订单详情',
                        myKeepAlive: false
                    }
                },

                {
                    name: 'insuranceUser',
                    path: '/insuranceUser',
                    component: () => import('../components/page/insurance/insuranceUser.vue'),
                    meta: {
                        title: '用户管理',
                        myKeepAlive: false
                    }
                },

                {
                    name: 'statementStatistics',
                    path: '/statementStatistics',
                    component: () => import('../components/page/insurance/statementStatistics.vue'),
                    meta: {
                        title: '报表统计',
                        myKeepAlive: false
                    }
                },

                {
                    name: 'companyManagement',
                    path: '/companyManagement',
                    component: () => import('../components/page/insurance/companyManagement.vue'),
                    meta: {
                        title: '保司管理',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'asset-protection-change',
                    path: '/asset-protection-change',
                    component: () => import('../components/page/insurance/asset-protection-change.vue'),
                    meta: {
                        title: '保全变更',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'insurCompanyDetail',
                    path: '/insurCompanyDetail',
                    component: () => import('../components/page/insurance/insurCompanyDetail.vue'),
                    meta: {
                        title: '保司详情',
                        myKeepAlive: false
                    }
                },

                {
                    path: '/user-list',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/administrative/user-list.vue'),
                    meta: {
                        title: '用户管理',
                        myKeepAlive: false
                    }
                },
                {
                    path: '/role-list',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/administrative/role-list.vue'),
                    meta: {
                        title: '角色管理',
                        myKeepAlive: false
                    }
                },
              
            ]
        },

        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: {
                title: '登录',
                myKeepAlive: false
            }
        }
    ]
});
const outWatermark = (id) => {
    if (document.getElementById(id) !== null) {
        const div = document.getElementById(id);
        div.style.display = 'none';
    }
};

router.afterEach((to) => {
    if (to.path == '/' || to.path == '/login') {
        Watermark.out(); // 清除水印
    } else {
        // Watermark.set(localStorage.getItem('userName')) // 设置水印title
    }
});

export default router;
