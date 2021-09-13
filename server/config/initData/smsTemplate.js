/*
}\s* /\*     =>         },\n/*
"(_id|updater|state|creator|creater|__v|updateTime|createTime)" : (\w|-|"|\(|\)|:|\.)*,?\n         =>
 */

module.exports = [
    /* 1 */
    {
        "state" : 1,
        "params" : [
            {
                "label" : "验证码",
                "code" : "code"
            },
            {
                "label" : "时间",
                "code" : "time"
            },
        ],
        "name" : "手机验证码模板",
        "code" : "phoneCheckCode",
        "thirdCode" : "",
        "template" : "【风起】您的手机验证码为${code}，${time}内有效。若非本人操作，请注意帐户安全。",
    },

    /* 2 */
    {
        "state" : 1,
        "params" : [
            {
                "code" : "newPassword",
                "label" : "新密码"
            },
        ],
        "name" : "忘记密码",
        "code" : "forgetPassword",
        "thirdCode" : "",
        "template" : "【风起】您的新密码为${newPassword}，请尽快登录后修改。若非本人操作，请注意帐户安全。",
    },
];
