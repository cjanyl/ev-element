/*
}\s* /\*     =>         },\n/*
"(_id|updater|state|creator|creater|__v|updateTime|createTime)" : (\w|-|"|\(|\)|:|\.)*,?\n         =>
 */

module.exports = [
    /* 1 */
    {
        "name": "文件业务类型",
        "code": "fileFolder",
        "options": [
            {
                "text": "无",
                "code": ""
            },
            {
                "text": "测试",
                "code": "test"
            },
            {
                "code": "systemConfig",
                "text": "系统配置"
            },
            {
                "code": "articleIcon",
                "text": "文章图标"
            },
            {
                "code": "articleImg",
                "text": "文章封面"
            },
            {
                "code": "bookcaseIcon",
                "text": "目录图标"
            },
            {
                "code": "bookcaseBanner",
                "text": "目录轮播"
            },
            {
                "text": "电子签名",
                "code": "sign"
            }
        ],
    },
    /* 2 */
    {
        "code": "validateType",
        "name": "验证类型",
        "options": [
            {
                "code": "EMAIL",
                "text": "企业邮箱"
            },
            {
                "code": "PIN",
                "text": "安全码"
            }
        ],
    },
    /* 3 */
    {
        "code": "Boolean",
        "name": "布尔值",
        "options": [
            {
                "code": "1",
                "text": "是"
            },
            {
                "code": "0",
                "text": "否"
            }
        ],
    },
    /* 4 */
    {
        "code": "identifyingCodeType",
        "name": "验证码类型",
        "options": [
            {
                "text": "手机",
                "code": "phone"
            },
            {
                "text": "邮箱",
                "code": "email"
            },
            {
                "text": "网页",
                "code": "web"
            }
        ],
    },
    /* 5 */
    {
        "code": "orgCategory",
        "name": "组织级别",
        "options": [
            {
                "code": "1",
                "text": "购货方"
            },
            {
                "code": "2",
                "text": "站点"
            },
            {
                "code": "3",
                "text": "服务线"
            }
        ],
    },
    /* 6 */
    {
        "code": "formInputType",
        "name": "表单输入类型",
        "options": [
            {
                "text": "文本",
                "code": "string"
            },
            {
                "text": "选择",
                "code": "select"
            },
            {
                "text": "数字",
                "code": "number"
            }
        ],
    },
    /* 7 */
    {
        "code": "articleTag",
        "name": "文章标签",
        "options": [
            {
                "code": "test",
                "text": "测试"
            },
            {
                "code": "html",
                "text": "HTML"
            }
        ],
    },
    /* 8 */
    {
        "code": "attributeBelong",
        "name": "属性类型",
        "options": [
            {
                "code": "inherit",
                "text": "继承"
            },
            {
                "code": "self",
                "text": "自有"
            }
        ],
    },
    /* 9 */
    {
        "code": "newsStatus",
        "name": "消息状态",
        "options": [
            {
                "text": "草稿",
                "code": "draft"
            },
            {
                "text": "发布中",
                "code": "active"
            },
            {
                "text": "已过期",
                "code": "expired"
            }
        ],
    },
    /* 10 */
    {
        "code": "bookcasePageType",
        "name": "目录展现类型",
        "options": [
            {
                "code": "common",
                "text": "通用"
            }
        ],
    },
    /* 11 */
    {
        "code": "companyType",
        "name": "公司类型",
        "options": [
            {
                "code": "personal",
                "text": "个体"
            },
            {
                "code": "enterprise",
                "text": "企业"
            }
        ],
    },
    /* 12 */
    {
        "code": "articleType",
        "name": "文章类型",
        "options": [
            {
                "code": "local",
                "text": "本地文章"
            },
            {
                "code": "third",
                "text": "第三方链接"
            }
        ],
    },
    /* 13 */
    {
        "code": "noticeStatus",
        "name": "通知状态",
        "options": [
            {
                "code": "read",
                "text": "已读"
            },
            {
                "code": "unread",
                "text": "未读"
            }
        ],
    },
    /* 14 */
    {
        "options": [
            {
                "code": "wechat",
                "text": "微信"
            }
        ],
        "code": "thirdType",
        "name": "第三方类型",
    },
    /* 15 */
    {
        "options": [
            {
                "code": "created",
                "text": "已创建"
            },
            {
                "code": "unpay",
                "text": "待支付"
            },
            {
                "code": "active",
                "text": "生效中"
            },
            {
                "code": "disabled",
                "text": "已失效"
            }
        ],
        "code": "tenantStatus",
        "name": "租户状态",
    },
    /* 16 */
    {
        "options": [
            {
                "code": "approve",
                "text": "批准"
            },
            {
                "code": "reject",
                "text": "拒绝"
            },
            {
                "code": "approveAll",
                "text": "批量批准"
            },
            {
                "code": "rejectAll",
                "text": "批量拒绝"
            }
        ],
        "code": "operationType",
        "name": "操作类型",
    },
    /* 17 */
    {
        "options": [
            {
                "code": "163",
                "text": "@163.com"
            },
            {
                "code": "sina",
                "text": "@sina.com"
            },
            {
                "code": "qq",
                "text": "@qq.com"
            }
        ],
        "name": "邮件后缀",
        "code": "emailSuffix",
    },
    /* 18 */
    {
        "options": [
            {
                "code": "test",
                "text": "系统测试"
            },
            {
                "text": "忘记密码",
                "code": "forgetPwd"
            },
            {
                "code": "visit",
                "text": "访客业务"
            }
        ],
        "code": "mailType",
        "name": "邮件类型",
    },
    /* 19 */
    {
        "options": [
            {
                "code": "approve",
                "text": "批准"
            },
            {
                "code": "reject",
                "text": "拒绝"
            }
        ],
        "code": "noticeScene",
        "name": "通知场景",
    },
    /* 20 */
    {
        "options": [
            {
                "code": "staff",
                "text": "员工"
            },
            {
                "code": "system",
                "text": "系统帐号"
            },
            {
                "code": "tenantStaff",
                "text": "企业员工"
            }
        ],
        "code": "userType",
        "name": "帐号类型",
    },
    /* 21 */
    {
        "code": "gender",
        "name": "性别",
        "options": [
            {
                "code": "male",
                "text": "男"
            },
            {
                "code": "female",
                "text": "女"
            }
        ],
    },
    /* 22 */
    {
        "options": [
            {
                "code": "visitor",
                "text": "访客模板"
            },
            {
                "code": "interviewee",
                "text": "被访人模板"
            }
        ],
        "code": "smsTemplate",
        "name": "短信模板",
    },
    /* 23 */
    {
        "options": [
            {
                "code": "auto",
                "text": "自动登录"
            },
            {
                "code": "user",
                "text": "手工登录"
            }
        ],
        "code": "loginType",
        "name": "登录方式",
    },
    /* 24 */
    {
        "options": [
            {
                "code": "token",
                "text": "Token"
            },
            {
                "code": "ticket",
                "text": "Ticket"
            }
        ],
        "code": "tokenType",
        "name": "Token类型",
    },
    /* 25 */
    {
        "code": "noticeType",
        "name": "通知类型",
        "options": [
            {
                "code": "sms",
                "text": "短信"
            },
            {
                "code": "email",
                "text": "邮件"
            }
        ],
    },
    /* 26 */
    {
        "options": [
            {
                "code": "tenant",
                "text": "租户可见"
            }
        ],
        "code": "roleType",
        "name": "角色类型",
    },
    /* 27 */
    {
        "options": [
            {
                "code": "padding",
                "text": "待发送"
            },
            {
                "code": "sending",
                "text": "发送中"
            },
            {
                "code": "success",
                "text": "发送成功"
            },
            {
                "code": "failed",
                "text": "发送失败"
            }
        ],
        "code": "mailStatus",
        "name": "邮件状态",
    },
    /* 28 */
    {
        "options": [
            {
                "code": "visitor",
                "text": "访客"
            },
            {
                "code": "interviewee",
                "text": "被访人"
            }
        ],
        "code": "noticeTarget",
        "name": "通知目标",
    },
    /* 29 */
    {
        "options": [
            {
                "code": "day",
                "text": "按天"
            },
            {
                "code": "week",
                "text": "按周"
            },
            {
                "code": "month",
                "text": "按月"
            }
        ],
        "code": "ldapSyncRate",
        "name": "LDAP更新频率",
    },
    /* 30 */
    {
        "options": [
            {
                "code": "plate",
                "text": "系统平台"
            },
            {
                "code": "ldap",
                "text": "LDAP"
            }
        ],
        "code": "dataSource",
        "name": "数据来源",
    },
    /* 31 */
    {
        "options": [
            {
                "code": "user",
                "text": "用户"
            }
        ],
        "code": "operationLogModel",
        "name": "操作模块",
    },
    /* 32 */
    {
        "options": [
            {
                "text": "周一",
                "code": "1"
            },
            {
                "text": "周二",
                "code": "2"
            },
            {
                "text": "周三",
                "code": "3"
            },
            {
                "text": "周四",
                "code": "4"
            },
            {
                "text": "周五",
                "code": "5"
            },
            {
                "text": "周六",
                "code": "6"
            },
            {
                "text": "周天",
                "code": "0"
            }
        ],
        "code": "weekDay",
        "name": "星期",
    }
];