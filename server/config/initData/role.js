/*
}\s* /\*     =>         },\n/*
"(updater|state|creator|creater|__v|updateTime|createTime)" : (\w|-|"|\(|\)|:|\.)*,?\n         =>
 */

module.exports = [
    /* 1 */
    {
        "_id": "admin",
        "menus": [],
        "code": "b8fa6284-6990-4798-84e6-2082fdbd4d3f",
        "name": "超级管理员",
    },
    /* 2 */
    {
        "_id": "system_admin",
        "menus": [
            "33ee29c8-a240-43f0-abcd-4ec9c2142e65",
            "f327e651-b3ee-41bf-b42b-b3f8817650f3",
            "61073d72-3e9f-4ffc-9466-eb6fda3d48d6",
            "82e687c8-5a71-4174-898c-d317bc22e3b8",
            "1b746d8b-f65c-4d91-9a60-8b72f6c0e090",
            "6926527e-7e1c-48c2-8995-ca0140b7deeb",
            "36d7c2f2-699a-4ff6-93b9-5ca84230241a",
            "a58bb953-fd92-4869-9b94-36984179b774",
            "b424793f-e4c6-4634-8192-dae7c46ef465",
            "9ab26783-c1af-4e7d-ac91-13ddd6a64f78",
            "26e9b9a6-2cbd-4a30-a426-673dd7259837",
            "248bc1a4-aeef-4b1a-9baa-8bdbf3c08166",
            "8910a997-e081-45a6-8dff-9ed1106c5456",
            "7c2f74e2-a9b9-499e-9604-6ea3c8b28a47",
            "bb2b02ff-cc5f-4e70-a440-ccaf39f98df7",
            "b999bab8-11dd-44bc-abef-a9a77d52a929"
        ],
        "name": "系统管理员",
        "code": "3be5ba57-dfd0-45f2-82b4-2f01ff4c4874",
    },
    /* 3 */
    {
        "_id": "normal",
        "menus": [
            "33ee29c8-a240-43f0-abcd-4ec9c2142e65"
        ],
        "name": "普通用户",
        "code": "f587137e-1ca8-4246-96ba-4cf2d4557cac",
    },
    /* 4 */
    {
        "_id": "robot",
        "menus": [],
        "name": "系统自动",
        "code": "8ae49832-2bea-471b-bfa8-269c5a411f75",
    }
];
