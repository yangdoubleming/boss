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
            redirect: '/loanDataBoard2',
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
                    name: 'risk-manage-list',
                    path: '/risk-manage-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/risk-manage/riskManage.vue'),
                    meta: {
                        title: '风控管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'mid-loan-monitoring',
                    path: '/mid-loan-monitoring',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/risk-manage/mid-loan-monitoring.vue'),
                    meta: {
                        title: '风控管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'black-list',
                    path: '/black-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/risk-manage/black-list.vue'),
                    meta: {
                        title: '黑名单列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'gray-list',
                    path: '/gray-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/risk-manage/gray-list.vue'),
                    meta: {
                        title: '灰名单列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'anti-fraud-rules',
                    path: '/anti-fraud-rules',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/risk-manage/anti-fraud-rules.vue'),
                    meta: {
                        title: '反欺诈规则',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'warning-list',
                    path: '/warning-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/risk-manage/warning-list.vue'),
                    meta: {
                        title: '准入监控',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'pufa-credit-audit',
                    path: '/pufa-credit-audit',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/risk-manage/pfCreditAudit.vue'),
                    meta: {
                        title: '浦发授信审批',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'xinwang-credit-audit',
                    path: '/xinwang-credit-audit',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/risk-manage/xinwangCreditAudit.vue'),
                    meta: {
                        title: '新网授信审批',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'list-of-funds',
                    path: '/list-of-funds',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/fund-manage/list-of-funds.vue'),
                    meta: {
                        title: '资金列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'Details-of-funds',
                    path: '/Details-of-funds',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/fund-manage/Details-of-funds.vue'),
                    meta: {
                        title: '资金详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'product-admin',
                    path: '/product-admin',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/financial-cloud/product-admin.vue'),
                    meta: {
                        title: '产品管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'loan-admin',
                    path: '/loan-admin',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/financial-cloud/loan-admin.vue'),
                    meta: {
                        title: '贷款管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'organizationManagement',
                    path: '/organizationManagement',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/financial-cloud/organizationManagement.vue'),
                    meta: {
                        title: '机构管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'organzationDetail',
                    path: '/organzationDetail',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/financial-cloud/organzationDetail.vue'),
                    meta: {
                        title: '资金详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'fadada',
                    path: '/fadada',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/minecraft/fadada.vue'),
                    meta: {
                        title: '法大大签约',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'search-store',
                    path: '/search-store',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/amazon/search-store.vue'),
                    meta: {
                        title: '店铺查询',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'store-detail',
                    path: '/store-detail',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/amazon/store-detail.vue'),
                    meta: {
                        title: '店铺详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'setting-email',
                    path: '/setting-email',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/setting-email.vue'),
                    meta: {
                        title: '邮箱配置',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'today-loan',
                    path: '/today-loan',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/today-loan.vue'),
                    meta: {
                        title: '贷款查询',
                        myKeepAlive: false,
                        color: '1'
                    }
                },

                {
                    name: 'offer-list',
                    path: '/offer-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/amazon/offer-list.vue'),
                    meta: {
                        title: '店铺查询',
                        myKeepAlive: false,
                        color: '1'
                    }
                },
                {
                    name: 'offer-detail',
                    path: '/offer-detail',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/amazon/offer-detail.vue'),
                    meta: {
                        title: '店铺详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'apiSaas',
                    path: '/apiSaas',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/apiSaas/apiSaas.vue'),
                    meta: {
                        title: 'XFCloud Api',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'banner-list',
                    path: '/banner-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/banner-list.vue'),
                    meta: {
                        title: 'banner列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'popup-list',
                    path: '/popup-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/popup-list.vue'),
                    meta: {
                        title: '弹窗列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'itemsBanner-admin',
                    path: '/itemsBanner-admin',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/itemsBanner-admin.vue'),
                    meta: {
                        title: '项目banner管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'examine',
                    path: '/examine',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/amazon/examine.vue'),
                    meta: {
                        title: '复核审批',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'add-white',
                    path: '/add-white',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/amazon/add-white.vue'),
                    meta: {
                        title: '加白管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'approve-page',
                    path: '/approve-page',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/market/approve-page.vue'),
                    meta: {
                        title: '渠道审批',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'channel-order',
                    path: '/channel-order',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/market/channel-order.vue'),
                    meta: {
                        title: '渠道订单',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'channel-operateData',
                    path: '/channel-operateData',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/market/channel-operateData.vue'),
                    meta: {
                        title: '渠道商运营数据',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'channel-admin',
                    path: '/channel-admin',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/market/channel-admin.vue'),
                    meta: {
                        title: '渠道商管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'loan-channel',
                    path: '/loan-channel',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/market/loan-channel.vue'),
                    meta: {
                        title: '贷款渠道商管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'source-channel',
                    path: '/source-channel',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/market/source-channel.vue'),
                    meta: {
                        title: '来源分类管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'channel-detail',
                    path: '/channel-detail',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/market/channel-detail.vue'),
                    meta: {
                        title: '渠道商管理详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'platform-list',
                    path: '/platform-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/platform-list.vue'),
                    meta: {
                        title: '渠道管理列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'file-managerment',
                    path: '/file-managerment',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/file-managerment.vue'),
                    meta: {
                        title: '文件管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'activity-list',
                    path: '/activity-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/activity-list.vue'),
                    meta: {
                        title: '活动管理列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'loanDataBoard',
                    path: '/loanDataBoard',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/loanDataBoard.vue'),
                    meta: {
                        title: '数据看板',
                        myKeepAlive: false,
                        color: '1'
                    }
                },
                {
                    name: 'loanDataBoard2',
                    path: '/loanDataBoard2',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/loanDataBoard2New.vue'),
                    meta: {
                        title: '首页',
                        myKeepAlive: false,
                        color: '2'
                    }
                },

                {
                    name: 'loan-user',
                    path: '/loan-user',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/loan-user.vue'),
                    meta: {
                        title: '用户查询',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'unified-applicationDetail',
                    path: '/unified-applicationDetail',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/unified-applicationDetail.vue'),
                    meta: {
                        title: '申请单详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'loanUser-detail',
                    path: '/loanUser-detail',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/loanUser-detail.vue'),
                    meta: {
                        title: '贷款用户详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'edu-manage',
                    path: '/edu-manage',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/edu-manage.vue'),
                    meta: {
                        title: '额度管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'edu-db-manage',
                    path: '/edu-db-manage',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/edu-db-manage.vue'),
                    meta: {
                        title: '额度管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'shops-detail',
                    path: '/shops-detail',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/edu-shops-detail.vue'),
                    meta: {
                        title: '店铺详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'setLenderPriority',
                    path: '/setLenderPriority',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/setLenderPriority.vue'),
                    meta: {
                        title: '额度管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'charge-list',
                    path: '/charge-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/charge-list.vue'),
                    meta: {
                        title: '收入管理列表',
                        myKeepAlive: true
                    }
                },

                {
                    name: 'throw-list',
                    path: '/throw-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/throw-list.vue'),
                    meta: {
                        title: '投放管理列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'serviceCharge-list',
                    path: '/serviceCharge-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/serviceCharge-list.vue'),
                    meta: {
                        title: '收费管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'serviceCharge-details',
                    path: '/serviceCharge-details',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/serviceCharge-details.vue'),
                    meta: {
                        title: '收费管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'partner-management',
                    path: '/partner-management',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/partner-management.vue'),
                    meta: {
                        title: '合伙人管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'multiple-investor',
                    path: '/multiple-investor',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/multiple-investor-apply.vue'),
                    meta: {
                        title: '多资方申请查询',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'multiple-list',
                    path: '/multiple-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/multiple-apply-list.vue'),
                    meta: {
                        title: '多资方申请单',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'multiple-detail',
                    path: '/multiple-detail',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/multiple-apply-detail.vue'),
                    meta: {
                        title: '多资方申请单详情',
                        myKeepAlive: false,
                        color: '1'
                    }
                },
                {
                    name: 'income-manage',
                    path: '/income-manage',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/pricing/income-manage.vue'),
                    meta: {
                        title: '成本配置管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'price-manage',
                    path: '/price-manage',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/pricing/price-manage.vue'),
                    meta: {
                        title: '价格调整管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'member-info',
                    path: '/member-info',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/member/basic-info.vue'),
                    meta: {
                        title: '基本信息管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'member-more',
                    path: '/member-more',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/member/basic-more.vue'),
                    meta: {
                        title: '更多基本信息',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'target-pm',
                    path: '/target-pm',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/member/target-pm.vue'),
                    meta: {
                        title: '每月目标管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'target-edit',
                    path: '/target-edit',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/member/target-edit.vue'),
                    meta: {
                        title: '目标修改',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'rank-management',
                    path: '/rank-management',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/member/rank-management.vue'),
                    meta: {
                        title: '职级管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'group-management',
                    path: '/group-management',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/member/group-management.vue'),
                    meta: {
                        title: '职级管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'crm-loan-list',
                    path: '/crm-loan-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/crm/loan-list.vue'),
                    meta: {
                        title: '贷款列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'customer-list',
                    path: '/customer-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/crm/customer-list.vue'),
                    meta: {
                        title: '客户列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'sea-pool',
                    path: '/sea-pool',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/crm/sea-pool.vue'),
                    meta: {
                        title: '公海池',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'application-list',
                    path: '/application-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/crm/application-list.vue'),
                    meta: {
                        title: '审批查询',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'deal-record',
                    path: '/deal-record',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/mfp/deal-record.vue'),
                    meta: {
                        title: '交易记录',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'authorized-store',
                    path: '/authorized-store',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/mfp/authorized-store.vue'),
                    meta: {
                        title: '授信店铺',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'upload-whitelist',
                    path: '/upload-whitelist',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/mfp/upload-whitelist.vue'),
                    meta: {
                        title: '上传白名单',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'block-white-list',
                    path: '/white-list',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/mfp/block-white-list/index.vue'),
                    meta: {
                        title: '盖帽白名单',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'customer-owner',
                    path: '/customer-owner',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/crm/customer-owner.vue'),
                    meta: {
                        title: '我的客户',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'customer-group',
                    path: '/customer-group',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/crm/customer-group.vue'),
                    meta: {
                        title: '本组客户',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'resignation-inheritance',
                    path: '/resignation-inheritance',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/crm/resignation-inheritance.vue'),
                    meta: {
                        title: '离职继承',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'former-employees-customer',
                    path: '/former-employees-customer',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/crm/former-employees-customer.vue'),
                    meta: {
                        title: '离职人员客户列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'product-manage',
                    path: '/product-manage',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/pricing/product-manage.vue'),
                    meta: {
                        title: '产品配置管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'partner-management-loan',
                    path: '/partner-management-loan',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/partner-management-loan.vue'),
                    meta: {
                        title: '贷款合伙人管理',
                        myKeepAlive: false
                    }
                },
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
                    name: 'activity-detail',
                    path: '/activity-detail',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/statistics/activity-detail.vue'),
                    meta: {
                        title: '活动详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "wp" */ '../components/page/Dashboard.vue'),
                    meta: {
                        title: '系统首页',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'minecraft',
                    path: '/minecraft',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/minecraft/index.vue'),
                    meta: {
                        title: '金融云-申请列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'loanAssistance',
                    path: '/loanAssistance',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/minecraft/loanAssistance.vue'),
                    meta: {
                        title: '人民币申请列表',
                        myKeepAlive: true
                    }
                },
                {
                    name: 'ca',
                    path: '/ca',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/minecraft/ca.vue'),
                    meta: {
                        title: 'CA签约',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'dhfq-index',
                    path: '/dhfq-index',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/dhfq/index.vue'),
                    meta: {
                        title: '跨易赊申请列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'dhfq-loanPage',
                    path: '/dhfq-loanPage',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/dhfq/loanPage.vue'),
                    meta: {
                        title: '跨易赊贷款管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'dhfq-dfWallet',
                    path: '/dhfq-dfWallet',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/dhfq/dfWallet.vue'),
                    meta: {
                        title: '豆服物流用户管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'dhfq-orderInfo',
                    path: '/dhfq-orderInfo',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/dhfq/orderInfo.vue'),
                    meta: {
                        title: '跨易赊贷款详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'dhfq-detail',
                    path: '/dhfq-detail',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/dhfq/detail.vue'),
                    meta: {
                        title: '跨易赊店铺详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'dhfq-user',
                    path: '/dhfq-user',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/dhfq/user.vue'),
                    meta: {
                        title: '豆花分期用户管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'approve-service-provider',
                    path: '/dhfq-approve-service-provider',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/dhfq/approve-service-provider.vue'),
                    meta: {
                        title: '认证服务商管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'provider-detail',
                    path: '/dhfq-provider-detail',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/dhfq/provider-detail.vue'),
                    meta: {
                        title: '服务商管理详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'ddb-user',
                    path: '/ddb-user',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/ddb/user.vue'),
                    meta: {
                        title: '订单宝用户管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'ddb-loanPage',
                    path: '/ddb-loanPage',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/ddb/loanPage.vue'),
                    meta: {
                        title: '订单宝贷款管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'repayment-history',
                    path: '/repayment-history',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/ddb/repayment-history.vue'),
                    meta: {
                        title: '订单宝还款管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'ddb-orderInfo',
                    path: '/ddb-orderInfo',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/ddb/orderInfo.vue'),
                    meta: {
                        title: '订单宝贷款详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'dhfq-service-provider',
                    path: '/dhfq-service-provider',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/dhfq/service-provider.vue'),
                    meta: {
                        title: '豆花分期服务商管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'kys-service-provider',
                    path: '/kys-service-provider',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/dhfq/kys-service-provider.vue'),
                    meta: {
                        title: '服务商管理',
                        myKeepAlive: true
                    }
                },
                {
                    name: 'pay-user',
                    path: '/pay-user',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/minecraft/pay-user.vue'),
                    meta: {
                        title: '广发支付用户管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'abnormal',
                    path: '/abnormal',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/minecraft/abnormal.vue'),
                    meta: {
                        title: '异常店铺查询',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'store-stats',
                    path: '/store-stats',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/statistics/store-stats.vue'),
                    meta: {
                        title: '店铺统计',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'lead',
                    path: '/lead',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/statistics/lead.vue'),
                    meta: {
                        title: '线索补录',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'credit',
                    path: '/credit',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/minecraft/credit.vue'),
                    meta: {
                        title: '授信管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'credit-detail',
                    path: '/credit-detail',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/minecraft/credit-detail.vue'),
                    meta: {
                        title: '授信管理详情',
                        myKeepAlive: false,
                        color: '1'
                    }
                },
                {
                    name: 'loanDataStatistics',
                    path: '/loanDataStatistics',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/minecraft/loanDataStatistics.vue'),
                    meta: {
                        title: '贷款数据统计',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'marketing-activity-config',
                    path: '/marketing-activity-config',
                    component: () =>
                        import(/* webpackChunkName: "marketing" */ '../components/page/marketing/marketing-activity-config.vue'),
                    meta: {
                        title: '营销活动配置',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'us-credit',
                    path: '/us-credit',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/us-loan/us-credit.vue'),
                    meta: {
                        title: '授信管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'us-credit-detail',
                    path: '/us-credit-detail',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/us-loan/us-credit-detail.vue'),
                    meta: {
                        title: '授信管理详情',
                        myKeepAlive: false,
                        color: '1'
                    }
                },
                {
                    name: 'user-stats',
                    path: '/user-stats',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/statistics/user-stats.vue'),
                    meta: {
                        title: '用户统计',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'loanUser-stats',
                    path: '/loanUser-stats',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/statistics/loanUser-stats.vue'),
                    meta: {
                        title: '用户统计',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'loaned',
                    path: '/loaned',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/minecraft/loaned.vue'),
                    meta: {
                        title: '贷后管理',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'loaned-detail',
                    path: '/loaned-detail',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/minecraft/loaned-detail.vue'),
                    meta: {
                        title: '支用单详情',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'minecraft-detail',
                    path: '/minecraft-detail',
                    component: () => import(/* webpackChunkName: "minecraft-detail" */ '../components/page/minecraft/detail.vue'),
                    meta: {
                        title: '店铺详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'loanAssitance-detail',
                    path: '/loanAssitance-detail',
                    component: () =>
                        import(/* webpackChunkName: "minecraft-detail" */ '../components/page/minecraft/loanAssitance-detail.vue'),
                    meta: {
                        title: '店铺详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'administrators-dataBlock',
                    path: '/administrators-dataBlock',
                    component: () =>
                        import(/* webpackChunkName: "minecraft-detail" */ '../components/page/minecraft/administrators-dataBlock.vue'),
                    meta: {
                        title: '管理层看板',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'conversion',
                    path: '/conversion',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/minecraft/conversion.vue'),
                    meta: {
                        title: '客户转化率',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'conversion_3',
                    path: '/conversion_3',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/minecraft/conversion_3.vue'),
                    meta: {
                        title: '客户转化率v3',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'new-conversion',
                    path: '/new-conversion',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/minecraft/new-conversion.vue'),
                    meta: {
                        title: '新客户转化率',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'loanPage',
                    path: '/loanPage',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/minecraft/loanPage.vue'),
                    meta: {
                        title: '贷款管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'loan-detail',
                    path: '/loan-detail',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/minecraft/loan-detail.vue'),
                    meta: {
                        title: '贷款管理详情',
                        myKeepAlive: false,
                        color: '1'
                    }
                },
                {
                    name: 'repaymentTest',
                    path: '/repaymentTest',
                    component: () => import(/* webpackChunkName: "minecraft" */ '../components/page/minecraft/repaymentTest.vue'),
                    meta: {
                        title: '还款测算',
                        myKeepAlive: false,
                        color: '1'
                    }
                },
                {
                    name: 'us-loanPage',
                    path: '/us-loanPage',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/us-loan/us-loanPage.vue'),
                    meta: {
                        title: '贷款管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'us-loan-detail',
                    path: '/us-loan-detail',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/us-loan/us-loan-detail.vue'),
                    meta: {
                        title: '贷款详情',
                        myKeepAlive: false,
                        color: '1'
                    }
                },
                {
                    name: 'payment-history',
                    path: '/payment-history',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/minecraft/payment-history.vue'),
                    meta: {
                        title: '还款明细',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'us-payment-history',
                    path: '/us-payment-history',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/us-loan/us-payment-history.vue'),
                    meta: {
                        title: '还款管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'us-detail',
                    path: '/us-detail',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/us-loan/us-detail.vue'),
                    meta: {
                        title: '店铺详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'us-orderInfo',
                    path: '/us-orderInfo',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/us-loan/us-orderInfo.vue'),
                    meta: {
                        title: '贷款详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'us-index',
                    path: '/us-index',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/us-loan/us-index.vue'),
                    meta: {
                        title: '贷款列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'repayment',
                    path: '/repayment',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/repayment/index.vue'),
                    meta: {
                        title: '浦发还款管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'monthly-report',
                    path: '/monthly-report',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/finance/monthly-report.vue'),
                    meta: {
                        title: '月度汇总',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'sassTrial',
                    path: '/sassTrial',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/finance/sass-trial.vue'),
                    meta: {
                        title: '产品定价',
                        myKeepAlive: true
                    }
                },
                {
                    name: 'loan-income',
                    path: '/loan-income',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/finance/loan-income.vue'),
                    meta: {
                        title: '贷款收入成本',
                        myKeepAlive: true
                    }
                },
                {
                    name: 'day-report',
                    path: '/day-report',
                    component: () => import(/* webpackChunkName: "repayment" */ '../components/page/finance/day-report.vue'),
                    meta: {
                        title: '每日余额',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'settlement-table',
                    path: '/settlement-table',
                    component: () => import(/* webpackChunkName: "settlement-table" */ '../components/page/finance/settlement-table.vue'),
                    meta: {
                        title: '结清明细表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'margin-details',
                    path: '/margin-details',
                    component: () => import(/* webpackChunkName: "margin-details" */ '../components/page/finance/margin-details.vue'),
                    meta: {
                        title: '保证金明细表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'margin-summary',
                    path: '/margin-summary',
                    component: () => import(/* webpackChunkName: "margin-summary" */ '../components/page/finance/margin-summary.vue'),
                    meta: {
                        title: '保证金汇总表',
                        myKeepAlive: true,
                        color: '1'
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
                {
                    path: '/rulesum',
                    component: () => import(/* webpackChunkName: "rulesum" */ '../components/page/rulesum/index.vue'),
                    meta: {
                        title: '规则集管理',
                        myKeepAlive: false
                    }
                },
                {
                    path: '/warningConfigurationSet',
                    component: () => import(/* webpackChunkName: "rulesum" */ '../components/page/rules/warningConfigurationSet.vue'),
                    meta: {
                        title: '贷中预警规则',
                        myKeepAlive: false
                    }
                },
                {
                    path: '/warningConfiguration',
                    component: () => import(/* webpackChunkName: "rulesum" */ '../components/page/rules/warningConfiguration.vue'),
                    meta: {
                        title: '贷中预警配置',
                        myKeepAlive: false
                    }
                },
                {
                    path: '/rules',
                    component: () => import(/* webpackChunkName: "rules" */ '../components/page/rules/index.vue'),
                    meta: {
                        title: '规则管理',
                        myKeepAlive: false
                    }
                },
                {
                    path: '/indicators',
                    component: () => import(/* webpackChunkName: "indicators" */ '../components/page/indicators/index.vue'),
                    meta: {
                        title: '指标管理',
                        myKeepAlive: false
                    }
                },
                {
                    name: 'amazon-data',
                    path: '/amazon-data',
                    component: () => import(/* webpackChunkName: "indicators" */ '../components/page/amazon/index.vue'),
                    meta: {
                        title: '亚马逊数据同步',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'seed-offer',
                    path: '/seed-offer',
                    component: () => import(/* webpackChunkName: "indicators" */ '../components/page/amazon/seed-offer.vue'),
                    meta: {
                        title: 'D盾Offer发送管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'seed-offer-online',
                    path: '/seed-offer-online',
                    component: () => import(/* webpackChunkName: "indicators" */ '../components/page/amazon/seed-offer-online.vue'),
                    meta: {
                        title: '线上Offer发送管理',
                        myKeepAlive: true,
                        color: '1'
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
                    name: 'widgets',
                    path: '/widgets',
                    component: () => import(/* webpackChunkName: "indicators" */ '../components/page/statistics/index.vue'),
                    meta: {
                        title: '运营工具',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'overdue-list',
                    path: '/overdue-list',
                    component: () => import('../components/page/statistics/overdue-list.vue'),
                    meta: {
                        title: '逾期管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'overdue-info',
                    path: '/overdue-info',
                    component: () => import('../components/page/statistics/overdue-info.vue'),
                    meta: {
                        title: '逾期管理详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'readboard-loanDetails',
                    path: '/readboard-loanDetails',
                    component: () => import('../components/page/statistics/readboard-loanDetails.vue'),
                    meta: {
                        title: '数据看板-贷款详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'readboard-insureDetails',
                    path: '/readboard-insureDetails',
                    component: () => import('../components/page/statistics/readboard-insureDetails.vue'),
                    meta: {
                        title: '数据看板-保险详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'readboard-technicalDetails',
                    path: '/readboard-technicalDetails',
                    component: () => import('../components/page/statistics/readboard-technicalDetails.vue'),
                    meta: {
                        title: '数据看板-科技详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'userInquire-userList',
                    path: '/userInquire-userList',
                    component: () => import('../components/page/statistics/userInquire-userList.vue'),
                    meta: {
                        title: '用户查询-用户列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'userInquire-userListDetail',
                    path: '/userInquire-userListDetail',
                    component: () => import('../components/page/statistics/userInquire-userListDetail.vue'),
                    meta: {
                        title: '用户查询-用户信息详情',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'repayment-wipe-flow-list',
                    path: '/repayment-wipe-flow-list',
                    component: () => import('../components/page/repayment/repayment-wipe-flow-list.vue'),
                    meta: {
                        title: '还款入账管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'product-config',
                    path: '/product-config',
                    component: () => import('../components/page/config/product-config.vue'),
                    meta: {
                        title: '产品配置',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'cost-list',
                    path: '/cost-list',
                    component: () => import('../components/page/cost/costList.vue'),
                    meta: {
                        title: '成本统计',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'cost-detail',
                    path: '/cost-detail',
                    component: () => import('../components/page/cost/costDetail.vue'),
                    meta: {
                        title: '成本统计',
                        myKeepAlive: true,
                        color: '1'
                    }
                },

                {
                    name: 'test-echarts',
                    path: '/test-echarts',
                    component: () => import('../components/page/testEcharts/test.vue'),
                    meta: {
                        title: '产品配置',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'monitor-shop',
                    path: '/monitor-shop',
                    component: () => import('../components/page/testEcharts/showShop.vue'),
                    meta: {
                        title: '监控报告',
                        myKeepAlive: true,
                        color: '2'
                    }
                },
                {
                    name: 'credit-shop',
                    path: '/credit-shop',
                    component: () => import('../components/page/testEcharts/showShopStart.vue'),
                    meta: {
                        title: '授信报告',
                        myKeepAlive: true,
                        color: '2'
                    }
                },
                {
                    name: 'hierarchical-allocation',
                    path: '/hierarchical-allocation',
                    component: () => import('../components/page/statistics/hierarchical-allocation.vue'),
                    meta: {
                        title: '裂变等级配置',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'examineList',
                    path: '/examineList',
                    component: () => import('../components/page/examine/examineList.vue'),
                    meta: {
                        title: '审批列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'waitExamine',
                    path: '/waitExamine',
                    component: () => import('../components/page/examine/waitExamine.vue'),
                    meta: {
                        title: '待审批',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'examineRecord',
                    path: '/examineRecord',
                    component: () => import('../components/page/examine/examineRecord.vue'),
                    meta: {
                        title: '审批记录',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'serviceManage',
                    path: '/serviceManage-list',
                    component: () => import('../components/page/serviceManage/serviceManage-list.vue'),
                    meta: {
                        title: '服务商管理',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'passWhiteList',
                    path: '/pass-whitelist',
                    component: () => import('../components/page/mfp/pass-whitelist.vue'),
                    meta: {
                        title: '准入白名单',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'clientApplylist',
                    path: '/client-applylist',
                    component: () => import('../components/page/mfp/client-applylist.vue'),
                    meta: {
                        title: '客户申请列表',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'priceAdjust',
                    path: '/price-adjust',
                    component: () => import('../components/page/mfp/price-adjust.vue'),
                    meta: {
                        title: '调价记录',
                        myKeepAlive: true,
                        color: '1'
                    }
                },
                {
                    name: 'overdueManage',
                    path: '/overdue-manage',
                    component: () => import('../components/page/mfp/overdue-manage.vue'),
                    meta: {
                        title: '逾期管理',
                        myKeepAlive: true,
                        color: '1',
                        
                    }
                }
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
