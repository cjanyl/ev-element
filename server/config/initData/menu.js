/*
}\s* /\*     =>         },\n/*
"(updater|state|creator|creater|__v|updateTime|createTime)" : (\w|-|"|\(|\)|:|\.)*,?\n         =>
 */

module.exports = [
    /* 1 */
    {
        "_id": "82e687c8-5a71-4174-898c-d317bc22e3b8",
        "isLeaf": false,
        "name": "系统管理(DEV)",
        "code": "sysMgr",
        "sort": 100,
        "link": "/system",
        "icon": "setting",
    },
    /* 2 */
    {
        "_id": "33ee29c8-a240-43f0-abcd-4ec9c2142e65",
        "isLeaf": true,
        "name": "首页",
        "code": "index",
        "sort": 1,
        "link": "/index",
    },
    /* 3 */
    {
        "_id": "9ab26783-c1af-4e7d-ac91-13ddd6a64f78",
        "isLeaf": true,
        "name": "邮件发送记录",
        "code": "Mail",
        "link": "/system/notice/mailRecord",
        "icon": "mail",
        "sort": 5,
        "parent": "019c2179-c30d-4b57-a314-13507504e32e",
    },
    /* 4 */
    {
        "_id": "7c2f74e2-a9b9-499e-9604-6ea3c8b28a47",
        "isLeaf": true,
        "name": "数据字典",
        "code": "Dict",
        "link": "/system/dict",
        "sort": 7,
        "parent": "82e687c8-5a71-4174-898c-d317bc22e3b8",
        "icon": "book",
    },
    /* 5 */
    {
        "_id": "6926527e-7e1c-48c2-8995-ca0140b7deeb",
        "isLeaf": true,
        "code": "User",
        "link": "/system/auth/user",
        "name": "账号管理",
        "parent": "1b746d8b-f65c-4d91-9a60-8b72f6c0e090",
        "sort": 3,
        "icon": "user",
    },
    /* 6 */
    {
        "_id": "a58bb953-fd92-4869-9b94-36984179b774",
        "isLeaf": false,
        "name": "系统工具",
        "code": "systemTool",
        "link": "/system/tool",
        "icon": "tool",
        "sort": 3,
        "parent": "82e687c8-5a71-4174-898c-d317bc22e3b8",
    },
    /* 7 */
    {
        "_id": "b7b40e4e-9c1b-4368-962a-0be28a4a307d",
        "isLeaf": true,
        "name": "组织管理",
        "code": "Org",
        "link": "/system/auth/org",
        "icon": "heat-map",
        "sort": 4,
        "parent": "1b746d8b-f65c-4d91-9a60-8b72f6c0e090",
    },
    /* 8 */
    {
        "_id": "36d7c2f2-699a-4ff6-93b9-5ca84230241a",
        "isLeaf": true,
        "name": "角色管理",
        "code": "Role",
        "sort": 5,
        "link": "/system/auth/role",
        "parent": "1b746d8b-f65c-4d91-9a60-8b72f6c0e090",
        "icon": "user-add",
    },
    /* 9 */
    {
        "_id": "bb2b02ff-cc5f-4e70-a440-ccaf39f98df7",
        "isLeaf": true,
        "parent": "019c2179-c30d-4b57-a314-13507504e32e",
        "link": "/system/notice/message",
        "code": "notice",
        "name": "站内信",
        "icon": "message",
        "sort": 1,
    },
    /* 10 */
    {
        "_id": "50c0524c-e761-4689-9778-9a4a7ff17167",
        "isLeaf": true,
        "name": "评论管理",
        "code": "Comment",
        "link": "/article/comment",
        "icon": "align-center",
        "sort": 15,
        "parent": "f327e651-b3ee-41bf-b42b-b3f8817650f3",
    },
    /* 11 */
    {
        "_id": "26e9b9a6-2cbd-4a30-a426-673dd7259837",
        "isLeaf": true,
        "name": "定时任务",
        "code": "Job",
        "link": "/system/tool/job",
        "icon": "clock-circle",
        "sort": 2,
        "parent": "a58bb953-fd92-4869-9b94-36984179b774",
    },
    /* 12 */
    {
        "_id": "1b746d8b-f65c-4d91-9a60-8b72f6c0e090",
        "isLeaf": false,
        "name": "人员管理",
        "code": "UserMgr",
        "link": "/system/auth",
        "sort": 1,
        "parent": "82e687c8-5a71-4174-898c-d317bc22e3b8",
        "icon": "usergroup-add",
    },
    /* 13 */
    {
        "_id": "b424793f-e4c6-4634-8192-dae7c46ef465",
        "isLeaf": true,
        "name": "文件管理",
        "code": "U_File",
        "link": "/system/tool/file",
        "icon": "file",
        "sort": 1,
        "parent": "a58bb953-fd92-4869-9b94-36984179b774",
    },
    /* 14 */
    {
        "_id": "1b305391-5ae0-475a-adbe-dd78e54e49af",
        "isLeaf": true,
        "parent": "f327e651-b3ee-41bf-b42b-b3f8817650f3",
        "name": "文章列表",
        "code": "articleList",
        "link": "/article/article",
        "icon": "file",
        "sort": 50,
    },
    /* 15 */
    {
        "_id": "8bc31d0c-f2d9-4b7a-bb5c-b26672b7ed4c",
        "isLeaf": true,
        "parent": "f327e651-b3ee-41bf-b42b-b3f8817650f3",
        "name": "目录管理",
        "code": "bookcase",
        "link": "/article/bookcase",
        "icon": "folder",
        "sort": 45,
    },
    /* 16 */
    {
        "_id": "8910a997-e081-45a6-8dff-9ed1106c5456",
        "isLeaf": true,
        "code": "Menu",
        "link": "/system/menu",
        "name": "菜单管理",
        "parent": "82e687c8-5a71-4174-898c-d317bc22e3b8",
        "sort": 5,
        "icon": "menu-fold",
    },
    /* 17 */
    {
        "_id": "248bc1a4-aeef-4b1a-9baa-8bdbf3c08166",
        "isLeaf": true,
        "parent": "a58bb953-fd92-4869-9b94-36984179b774",
        "name": "验证码",
        "code": "IdentifyingCode",
        "link": "/system/tool/identifyingCode",
        "icon": "barcode",
        "sort": 3,
    },
    /* 18 */
    {
        "_id": "01e64751-d052-4484-9359-df3bc66174ef",
        "isLeaf": true,
        "name": "第三方Token",
        "code": "ThirdToken",
        "link": "/system/tool/thirdToken",
        "icon": "key",
        "sort": 20,
        "parent": "a58bb953-fd92-4869-9b94-36984179b774",
    },
    /* 19 */
    {
        "_id": "c1364d46-5be1-4975-8a2f-f177ea3e15a6",
        "isLeaf": true,
        "parent": "f327e651-b3ee-41bf-b42b-b3f8817650f3",
        "name": "报名管理",
        "code": "Sign",
        "link": "/article/sign",
        "icon": "user",
        "sort": 25,
    },
    /* 20 */
    {
        "_id": "0fedfdf8-d39a-4592-85bc-c6ec9abd0280",
        "isLeaf": true,
        "name": "租户管理",
        "code": "tenant",
        "link": "/system/tenant",
        "icon": "home",
        "sort": 2,
        "parent": "82e687c8-5a71-4174-898c-d317bc22e3b8",
    },
    /* 21 */
    {
        "_id": "1682c008-7611-482a-9269-8e9ec9b25686",
        "isLeaf": true,
        "parent": "f327e651-b3ee-41bf-b42b-b3f8817650f3",
        "name": "点赞管理",
        "code": "like",
        "link": "/article/like",
        "icon": "star",
        "sort": 20,
    },
    /* 22 */
    {
        "_id": "4e7212f4-9cc4-43f4-8c82-533b3b457171",
        "isLeaf": true,
        "code": "tenantCenter",
        "link": "/tenant/tenantCenter",
        "name": "个人中心",
        "icon": "laptop",
        "sort": 0,
        "parent": "68df74db-3fca-4484-89a9-37939e0e9a37",
    },
    /* 23 */
    {
        "_id": "a2879988-e71d-4569-9cd2-e89b0b1258a5",
        "isLeaf": true,
        "name": "个性配置",
        "code": "setting",
        "link": "/tenant/setting",
        "icon": "setting",
        "sort": 100,
        "parent": "68df74db-3fca-4484-89a9-37939e0e9a37",
    },
    /* 24 */
    {
        "_id": "f327e651-b3ee-41bf-b42b-b3f8817650f3",
        "isLeaf": false,
        "name": "文章管理",
        "code": "Article",
        "link": "/article",
        "icon": "book",
        "sort": 90,
    },
    /* 25 */
    {
        "_id": "68df74db-3fca-4484-89a9-37939e0e9a37",
        "isLeaf": false,
        "name": "租户配置",
        "code": "tenantMgr",
        "link": "/tenant",
        "icon": "home",
        "sort": 20,
    },
    /* 26 */
    {
        "_id": "61073d72-3e9f-4ffc-9466-eb6fda3d48d6",
        "isLeaf": true,
        "name": "文章管理",
        "code": "ArticleList",
        "link": "/article/articleList",
        "icon": "file-text",
        "sort": 10,
        "parent": "f327e651-b3ee-41bf-b42b-b3f8817650f3",
    },
    /* 27 */
    {
        "_id": "3ea5c6b3-fb9e-4dbb-aae6-1d0587a47396",
        "isLeaf": true,
        "link": "/system/systemConfig",
        "code": "systemConfig",
        "name": "系统配置",
        "icon": "setting",
        "sort": 50,
        "parent": "82e687c8-5a71-4174-898c-d317bc22e3b8",
    },
    /* 28 */
    {
        "_id": "dde716b0-b58d-4093-83c4-9ef6ca1d869b",
        "isLeaf": true,
        "name": "通知配置",
        "code": "noticeConfig",
        "link": "/tenant/noticeConfig",
        "icon": "message",
        "sort": 40,
        "parent": "68df74db-3fca-4484-89a9-37939e0e9a37",
    },
    /* 29 */
    {
        "_id": "c0ea9279-6a3f-4656-9186-f8fbe8ecd333",
        "isLeaf": true,
        "name": "短信发送记录",
        "code": "SmsRecord",
        "link": "/system/notice/smsRecord",
        "icon": "message",
        "sort": 15,
        "parent": "019c2179-c30d-4b57-a314-13507504e32e",
    },
    /* 30 */
    {
        "_id": "27fcbf48-f704-4b2c-a4ee-0783c3ba5ae3",
        "isLeaf": true,
        "name": "邮件发送记录",
        "code": "mailRecord",
        "link": "/tenant/mailRecord",
        "icon": "mail",
        "sort": 70,
        "parent": "68df74db-3fca-4484-89a9-37939e0e9a37",
    },
    /* 31 */
    {
        "_id": "8aec4048-31f6-4bab-8a42-756bf03671f5",
        "isLeaf": true,
        "link": "/system/tool/shortUrl",
        "code": "shortUrl",
        "name": "短地址",
        "parent": "a58bb953-fd92-4869-9b94-36984179b774",
        "icon": "link",
        "sort": 30,
    },
    /* 32 */
    {
        "_id": "ea998c76-5b30-45a4-8d83-54a1ff87dd64",
        "isLeaf": false,
        "name": "系统日志",
        "code": "log",
        "icon": "menu-unfold",
        "sort": 4,
        "parent": "82e687c8-5a71-4174-898c-d317bc22e3b8",
    },
    /* 33 */
    {
        "_id": "a94f4e01-8212-4896-96d3-5cee727fa9ee",
        "isLeaf": true,
        "name": "短信帐户",
        "icon": "laptop",
        "code": "smsAccount",
        "link": "/tenant/smsAccount",
        "sort": 50,
        "parent": "68df74db-3fca-4484-89a9-37939e0e9a37",
    },
    /* 34 */
    {
        "_id": "b81b4ffc-7bf0-4c32-9057-d9c0b9e14261",
        "isLeaf": true,
        "name": "操作日志",
        "link": "/system/log/operationLog",
        "code": "operationLog",
        "icon": "exception",
        "sort": 10,
        "parent": "ea998c76-5b30-45a4-8d83-54a1ff87dd64",
    },
    /* 35 */
    {
        "_id": "cca31f5f-b547-4bf9-8ccd-f3ba8e34c7a1",
        "isLeaf": true,
        "name": "登录日志",
        "code": "loginLog",
        "link": "/system/log/loginLog",
        "icon": "login",
        "sort": 1,
        "parent": "ea998c76-5b30-45a4-8d83-54a1ff87dd64",
    },
    /* 36 */
    {
        "_id": "2ea1d1eb-f5b4-467f-87ac-0a04084c2e77",
        "isLeaf": true,
        "name": "短信充值记录",
        "icon": "money-collect",
        "link": "/tenant/smsAccountCharge",
        "code": "smsAccountCharge",
        "sort": 50,
        "parent": "68df74db-3fca-4484-89a9-37939e0e9a37",
    },
    /* 37 */
    {
        "_id": "b4afcd59-6cd0-41d7-a72e-497bfd5aa1a5",
        "isLeaf": true,
        "name": "邮件模板配置",
        "link": "/system/notice/mailTemplate",
        "code": "mailTemplate",
        "icon": "mail",
        "sort": 7,
        "parent": "019c2179-c30d-4b57-a314-13507504e32e",
    },
    /* 38 */
    {
        "_id": "1427926c-bf9e-47e6-a770-7b850afe71f7",
        "isLeaf": true,
        "name": "短信模板配置",
        "link": "/system/notice/smsTemplate",
        "code": "smsTemplate",
        "icon": "message",
        "sort": 18,
        "parent": "019c2179-c30d-4b57-a314-13507504e32e",
    },
    /* 39 */
    {
        "_id": "0b0d1331-c59d-45ce-b8c7-41be77f876e1",
        "isLeaf": true,
        "link": "/tenant/smsRecord",
        "code": "tenantSmsRecord",
        "icon": "file",
        "name": "短信发送记录",
        "sort": 60,
        "parent": "68df74db-3fca-4484-89a9-37939e0e9a37",
    },
    /* 40 */
    {
        "_id": "5d0e1137-f55d-46cb-a513-705e7f693275",
        "isLeaf": true,
        "name": "--分隔线--",
        "code": "__divider__1",
        "sort": 1.5,
        "parent": "82e687c8-5a71-4174-898c-d317bc22e3b8",
    },
    /* 41 */
    {
        "_id": "81bed0f1-cbd8-402b-956a-488602645c7a",
        "isLeaf": true,
        "name": "--分隔线--",
        "code": "__divider__3",
        "sort": 95,
    },
    /* 42 */
    {
        "_id": "9f4c3561-5701-4a4f-8890-00f4debd4a9b",
        "isLeaf": false,
        "name": "CMS",
        "code": "cms",
        "icon": "home",
        "sort": 4.5,
        "parent": "82e687c8-5a71-4174-898c-d317bc22e3b8",
    },
    /* 43 */
    {
        "_id": "391b55f0-6dbf-40cb-9659-e52c8ca2ca81",
        "isLeaf": true,
        "name": "页面组件",
        "code": "pageComponent",
        "link": "/system/cms/pageComponent",
        "sort": 2,
        "parent": "9f4c3561-5701-4a4f-8890-00f4debd4a9b",
    },
    /* 44 */
    {
        "_id": "cac15862-2b3b-4932-80ae-316c3e1cb04e",
        "isLeaf": true,
        "link": "/system/cms/pageTemplate",
        "code": "pageTemplate",
        "name": "页面模板",
        "sort": 2,
        "parent": "9f4c3561-5701-4a4f-8890-00f4debd4a9b",
    },
    /* 45 */
    {
        "_id": "fa4b9873-bf92-4e3a-8628-cdfc4406ef28",
        "isLeaf": true,
        "name": "页面配置",
        "link": "/system/cms/pageConfig",
        "code": "pageConfig",
        "sort": 3,
        "parent": "9f4c3561-5701-4a4f-8890-00f4debd4a9b",
    },
    /* 46 */
    {
        "_id": "c157c534-2a64-4c91-ad94-20072fabe151",
        "isLeaf": true,
        "link": "/system/cms/pageConfigSetting",
        "code": "pageConfigSetting",
        "name": "配置页面",
        "sort": 5,
        "parent": "9f4c3561-5701-4a4f-8890-00f4debd4a9b",
    },
    /* 47 */
    {
        "_id": "019c2179-c30d-4b57-a314-13507504e32e",
        "isLeaf": false,
        "name": "通知管理",
        "sort": 40,
        "parent": "82e687c8-5a71-4174-898c-d317bc22e3b8",
        "icon": "message",
        "link": "/system/notice",
        "code": "f719745d-4b71-42c4-888b-220e0e52608b",
    }
];
