/*
}\s* /\*     =>         },\n/*
"(_id|updater|state|creator|creater|__v|updateTime|createTime)" : (\w|-|"|\(|\)|:|\.)*,?\n         =>
 */

module.exports = [
    /* 1 */
    {
        "state": 1,
        "creator": "30204941-8858-4ec0-b4e1-ea44de7f6089",
        "params": [
            {
                "key": "testField",
                "value": "1"
            }
        ],
        "name": "系统测试",
        "code": "test",
    },

    /* 2 */
    {
        "state": 1,
        "creator": "30204941-8858-4ec0-b4e1-ea44de7f6089",
        "params": [
            {
                "key": "lastest",
                "value": "1.0.8"
            },
            {
                "key": "mustLastest",
                "value": "1.0.7"
            }
        ],
        "name": "版本管理",
        "code": "appVersion",
    },

    /* 3 */
    {
        "state": 1,
        "creator": "30204941-8858-4ec0-b4e1-ea44de7f6089",
        "params": [
            {
                "key": "key",
                "value": ""
            },
            {
                "key": "secret",
                "value": ""
            },
            {
                "key": "name",
                "value": ""
            },
            {
                "key": "signName",
                "value": ""
            }
        ],
        "name": "短信网关",
        "code": "sms",
    },

    /* 5 */
    {
        "state": 1,
        "creator": "30204941-8858-4ec0-b4e1-ea44de7f6089",
        "params": [
            {
                "key": "service",
                "value": ""
            },
            {
                "key": "auth.user",
                "value": ""
            },
            {
                "key": "auth.pass",
                "value": ""
            }
        ],
        "name": "系统邮箱",
        "code": "systemEmail",
    }
];