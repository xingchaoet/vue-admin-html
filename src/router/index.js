import Vue from "vue";
import VueRouter from "vue-router";

if (process.env.NODE_ENV === "development") {
    Vue.use(VueRouter);
}

import {ROUTER_MODE} from "../config/app";

import Home from "../views/home/index.vue";

// 管理组相关
import adminRouter from "../views/userManage/admin/router.vue";
import authAdmin from "../views/userManage/admin/authAdmin.vue";
import authRole from "../views/userManage/admin/authRole.vue";
import authPermissionRule from "../views/userManage/admin/authPermissionRule.vue";
// import supplierRouter from "../views/userManage/admin/router.vue";

// 上传相关
import tinymce from "../views/components/tinymce-demo.vue";
import upload from "../views/components/upload-demo.vue";

// 商戶管理
import supplier from "../views/supplier/supplier.vue";

// 财务管理
import finance from "../views/finance/finance.vue";

// 用户管理
import users from "../views/users/users.vue";

//rotation管理
import rotation from "../views/rotation/rotation.vue";

//充值优惠活动管理
import rechargediscount from "../views/rechargediscount/rechargediscount.vue";

//提现管理
import withdraw from "../views/withdraw/withdraw.vue";

//意见反馈管理
import feedback from "../views/feedback/feedback.vue";

//消息管理
import message from "../views/message/message.vue";

//订单管理
import order from "../views/order/order.vue";

//售后管理
import aftersale from "../views/aftersale/aftersale.vue";

//商品管理
import goods from "../views/goods/goods.vue";

//分类管理
import category from "../views/category/category.vue";

//品牌管理
import brand from "../views/brand/brand.vue";

//版本信息
import version from "../views/version/version.vue";
//关于我们
import aboutus from "../views/aboutus/aboutus.vue";
//充值协议
import agreement from "../views/agreement/agreement.vue";
//用户协议
import useragreement from "../views/useragreement/useragreement.vue";
//用户隐私声明
import userprivacystatement from "../views/userprivacystatement/userprivacystatement.vue";
//常见问题分类
import qacategory from "../views/qacategory/qacategory.vue";
//常见问题
import qa from "../views/qa/qa.vue";


// 广告管理
import adSite from "../views/adManage/adSite.vue";
import ad from "../views/adManage/ad.vue";

// Vue.use(VueRouter);

const err401 = r =>
    require.ensure([], () => r(require("../views/error/err401.vue")), "home");
const err404 = r =>
    require.ensure([], () => r(require("../views/error/err404.vue")), "home");
const login = r =>
    require.ensure([], () => r(require("../views/login/index.vue")), "home");
const main = r =>
    require.ensure([], () => r(require("../views/home/main.vue")), "home");

// 注意 权限字段 authRule （严格区分大小写）
export const constantRouterMap = [
    {
        path: "*",
        component: err404,
        hidden: true
    },
    {
        path: "/401",
        component: err401,
        name: "401",
        hidden: true
    },
    {
        path: "/404",
        component: err404,
        name: "404",
        hidden: true
    },
    {
        path: "/500",
        component: err404,
        name: "500",
        hidden: true
    },
    {
        path: "/login",
        component: login,
        name: "登录",
        hidden: true
    },
    {
        path: "/",
        component: Home,
        redirect: "/readme",
        name: "首页",
        hidden: true
    },
    {
        path: "/readme",
        component: Home,
        redirect: "/readme/main",
        icon: "shouye",
        name: "控制台",
        noDropdown: true,
        children: [
            {
                path: "main",
                component: main
            }
        ]
    },
    {
        path: "/components",
        redirect: "/components/uploadList",
        component: Home,
        name: "components",
        icon: "tongyong",
        children: [
            {
                path: "uploadList",
                name: "上传图片的展示",
                component: r =>
                    require.ensure(
                        [],
                        () => r(require("../views/components/uploadList.vue")),
                        "home"
                    )
            },
            {
                path: "tinymce",
                name: "tinymce富文本编辑器",
                component: tinymce
            },
            {
                path: "upload",
                name: "上传的demo",
                component: upload
            }
        ]
    }
];

export default new VueRouter({
    // mode: 'history', //后端支持可开
    mode: ROUTER_MODE,
    routes: constantRouterMap,
    strict: process.env.NODE_ENV !== "production"
});

export const asyncRouterMap = [
    {
        path: "/financeManage",
        // redirect: "/supplierManage/index",
        component: Home,
        icon: "caiwu1",
        name: "财务管理",
        meta: {
            authRule: ["finance_manage"]
        },
        noDropdown: true,
        children: [
            {
                path: "finance",
                component: finance,
                // redirect: "/supplierManage/authSupplier/index",
                name: "财务管理",
                icon: "0",
                meta: {
                    authRule: ["admin/finance.manage/index"]
                },
            }
        ]
    },
    {
        path: "/usersManage",
        // redirect: "/supplierManage/index",
        component: Home,
        icon: "yonghu1",
        name: "用户管理",
        meta: {
            authRule: ["users_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "users",
                component: users,
                // redirect: "/supplierManage/authSupplier/index",
                name: "用户管理",
                icon: "0",
                meta: {
                    authRule: ["admin/users.manage/index"]
                },
            }
        ]
    },
    {
        path: "/supplierManage",
        // redirect: "/supplierManage/index",
        component: Home,
        icon: "dianpu1",
        name: "店铺管理",
        meta: {
            authRule: ["supplier_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "supplier",
                component: supplier,
                // redirect: "/supplierManage/authSupplier/index",
                name: "站內店铺管理",
                icon: "0",
                meta: {
                    authRule: ["admin/supplier.manage/index"]
                },
            }
        ]
    },
    {
        path: "/rotationManage",
        // redirect: "/supplierManage/index",
        component: Home,
        icon: "rotation1",
        name: "轮播图管理",
        meta: {
            authRule: ["rotation_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "rotation",
                component: rotation,
                // redirect: "/supplierManage/authSupplier/index",
                name: "轮播图管理",
                icon: "0",
                meta: {
                    authRule: ["admin/rotation.manage/index"]
                },
            }
        ]
    },


    {
        path: "/goodsManage",
        // redirect: "/goodsManage/goodsManage/index",
        component: Home,
        icon: "goods",
        name: "商品管理",
        meta: {
            authRule: ["goods_manage"]
        },
        // noDropdown: true,

        children: [
            {
                path: "goods",
                component: goods,
                name: "商品管理",
                icon: "0",
                meta: {
                    authRule: ["admin/goods_manage.goods/index"]
                }
            },
            {
                path: "category",
                component: category,
                name: "分类管理",
                icon: "0",
                meta: {
                    authRule: ["admin/goods_manage.category/index"]
                }
            },
            {
                path: "brand",
                component: brand,
                name: "品牌管理",
                icon: "0",
                meta: {
                    authRule: ["admin/goods_manage.brand/index"]
                }
            }
        ]
    },

    {
        path: "/orderManage",
        // redirect: "/orderManage/adSite",
        component: Home,
        icon: "order1",
        name: "订单相关",
        meta: {
            authRule: ["order_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "order",
                component: order,
                name: "订单管理",
                icon: "0",
                meta: {
                    authRule: ["admin/order.manage/index"]
                }
            },
            {
                path: "aftersale",
                component: aftersale,
                name: "售后管理",
                icon: "0",
                meta: {
                    authRule: ["admin/order.aftersale/index"]
                }
            }
        ]
    },
    {
        path: "/rechargediscountManage",
        // redirect: "/supplierManage/index",
        component: Home,
        icon: "rechargediscount1",
        name: "充值优惠活动管理",
        meta: {
            authRule: ["rechargediscount_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "rechargediscount",
                component: rechargediscount,
                // redirect: "/supplierManage/authSupplier/index",
                name: "充值优惠活动管理",
                icon: "0",
                meta: {
                    authRule: ["admin/rechargediscount.manage/index"]
                },
            }
        ]
    },


    {
        path: "/withdrawManage",
        // redirect: "/supplierManage/index",
        component: Home,
        icon: "withdraw1",
        name: "提现管理",
        meta: {
            authRule: ["withdraw_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "withdraw",
                component: withdraw,
                // redirect: "/supplierManage/authSupplier/index",
                name: "提现管理",
                icon: "0",
                meta: {
                    authRule: ["admin/withdraw.manage/index"]
                },
            }
        ]
    },
    {
        path: "/feedbackManage",
        // redirect: "/supplierManage/index",
        component: Home,
        icon: "feedback1",
        name: "反馈管理",
        meta: {
            authRule: ["feedback_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "feedback",
                component: feedback,
                // redirect: "/supplierManage/authSupplier/index",
                name: "反馈管理",
                icon: "0",
                meta: {
                    authRule: ["admin/feedback.manage/index"]
                },
            }
        ]
    },
    {
        path: "/messageManage",
        // redirect: "/supplierManage/index",
        component: Home,
        icon: "message1",
        name: "消息管理",
        meta: {
            authRule: ["message_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "message",
                component: message,
                // redirect: "/supplierManage/authSupplier/index",
                name: "消息管理",
                icon: "0",
                meta: {
                    authRule: ["admin/message.manage/index"]
                },
            }
        ]
    },



    {
        path: "/settingManage",
        // redirect: "/goodsManage/goodsManage/index",
        component: Home,
        icon: "setting",
        name: "系统设置",
        meta: {
            authRule: ["setting_manage"]
        },
        // noDropdown: true,

        children: [
            {
                path: "version",
                component: version,
                name: "版本信息",
                icon: "0",
                meta: {
                    authRule: ["admin/setting_manage.version/index"]
                }
            },
            {
                path: "aboutus",
                component: aboutus,
                name: "关于我们",
                icon: "0",
                meta: {
                    authRule: ["admin/setting_manage.aboutus/index"]
                }
            },
            {
                path: "agreement",
                component: agreement,
                name: "充值协议",
                icon: "0",
                meta: {
                    authRule: ["admin/setting_manage.agreement/index"]
                }
            },
            {
                path: "useragreement",
                component: useragreement,
                name: "用户协议",
                icon: "0",
                meta: {
                    authRule: ["admin/setting_manage.useragreement/index"]
                }
            },
            {
                path: "userprivacystatement",
                component: userprivacystatement,
                name: "用户隐私声明",
                icon: "0",
                meta: {
                    authRule: ["admin/setting_manage.userprivacystatement/index"]
                }
            },
            {
                path: "qacategory",
                component: qacategory,
                name: "常见问题分类",
                icon: "0",
                meta: {
                    authRule: ["admin/setting_manage.qacategory/index"]
                }
            },
            {
                path: "qa",
                component: qa,
                name: "常见问题",
                icon: "0",
                meta: {
                    authRule: ["admin/setting_manage.qa/index"]
                }
            }
        ]
    },

    {
        path: "/userManage",
        redirect: "/userManage/adminManage/index",
        component: Home,
        icon: "guanliyuan1",
        name: "用户权限管理",
        meta: {
            authRule: ["user_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "/userManage/adminManage",
                component: adminRouter,
                redirect: "/userManage/authAdmin/index",
                name: "管理组",
                icon: "0",
                meta: {
                    authRule: ["user_manage/admin_manage"]
                },
                children: [
                    {
                        path: "authAdmin",
                        component: authAdmin,
                        name: "管理员管理",
                        icon: "0",
                        meta: {
                            authRule: ["admin/auth.admin/index"]
                        }
                    },
                    {
                        path: "authRole",
                        component: authRole,
                        name: "角色管理",
                        icon: "0",
                        meta: {
                            authRule: ["admin/auth.role/index"]
                        }
                    },
                    {
                        path: "authPermissionRule",
                        component: authPermissionRule,
                        name: "权限管理",
                        icon: "0",
                        meta: {
                            authRule: ["admin/auth.permission_rule/index"]
                        }
                    }
                ]
            }
        ]
    },

    {
        path: "/adManage",
        redirect: "/adManage/adSite",
        component: Home,
        icon: "guanggao",
        name: "广告相关",
        meta: {
            authRule: ["ad_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "adSite",
                component: adSite,
                name: "广告位管理",
                icon: "0",
                meta: {
                    authRule: ["admin/ad.site/index"]
                }
            },
            {
                path: "ad",
                component: ad,
                name: "广告管理",
                icon: "0",
                meta: {
                    authRule: ["admin/ad.ad/index"]
                }
            }
        ]
    }
];
