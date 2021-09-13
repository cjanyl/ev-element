/*
}\s* /\*     =>         },\n/*
"(_id|updater|state|creator|creater|__v|updateTime|createTime)" : (\w|-|"|\(|\)|:|\.)*,?\n         =>
 */

module.exports = [
    /* 1 */
    {
        name : "管理员",
        code : "admin",
        password : "admin123",
        role : ["admin"],
        tenant : "33f0fe38-fcd1-4f11-8a55-1831821b38c5",
    },

    /* 2 */
    {
        _id : "f07ffe71-7235-4231-8246-d64aaaadcc14",
        name : "系统自动",
        code : "robot",
        password : "system123",
        role : ["robot"]
    },
];
