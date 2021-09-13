/*
}\s* /\*     =>         },\n/*
"(_id|updater|state|creator|creater|__v|updateTime|createTime)" : (\w|-|"|\(|\)|:|\.)*,?\n         =>
 */

module.exports = [
    /* 1 */
    {
        "state" : 1,
        "name" : "忘记密码",
        "code" : "forgetPassword",
        "subject" : "忘记密码",
        "content" : "<div>Dear ${user.name}</div>\n<br/>\n<p>您的新密码为${newPassword}，请尽快登录后修改。</p>\n<p>谢谢</p>",
        "__v" : 0,
        "type" : "forgetPwd"
    }
];
