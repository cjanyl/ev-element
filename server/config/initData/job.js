/*
}\s* /\*     =>         },\n/*
"(_id|updater|state|creator|creater|__v|updateTime|createTime)" : (\w|-|"|\(|\)|:|\.)*,?\n         =>
 */

module.exports = [
    /* 1 */
    {
        "status" : "stopped",
        "name" : "测试无参数",
        "func" : "test",
        "schedule" : "*/30 * * * * *",
        "param" : [],
    },

    /* 2 */
    {
        "status" : "stopped",
        "param" : [
            {
                "key" : "a",
                "value" : "1"
            },
            {
                "key" : "b",
                "value" : "2"
            }
        ],
        "name" : "测试有参数的",
        "func" : "testParam",
        "schedule" : "*/30 * * * * *",
    },

    /* 3 */
    {
        "state" : 1,
        "status" : "stopped",
        "param" : [
            {
                "key" : "amount",
                "value" : ""
            },
            {
                "key" : "unit",
                "value" : ""
            }
        ],
        "name" : "自动清除日志数据",
        "func" : "clearLog",
        "schedule" : "0 0 0 * * *",
    }
];