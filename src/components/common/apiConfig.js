"use strict";
const API = {
  "base": {
    "login": {
      "login": "/login",
      "refresh": "/system/auth/user/refresh",
      "autoLogin": "/login/autoLogin/{id}",
      "register": "/login/register",
      "forgetPassword": "/login/forgetPassword"
    }
  },
  "report": {
    "customerTotal": "@/customerTotal",
    "bucketGroupType": "@/bucketGroupType",
    "customerOutingTop": "@/customerOutingTop",
    "indexTotal": "@/indexTotal",
  },
  "system": {
    "auth": {
      "user": {
        "@extend": "list",
        "importData": "@/import",
        "exportDataAsync": "@/exportAsync",
        "changePwd": "@/changePwd"
      }, "role": {"@extend": "list"}, "org": {"@extend": "tree"}
    },
    "tool": {
      "file": {"@extend": "list"},
      "mail": {"@extend": "list", "send": "/system/tool/mail/send"},
      "job": {
        "@extend": "list",
        "jobMethods": "@/getJobList",
        "start": "@/start/{id}",
        "stop": "@/stop/{id}",
        "run": "@/run/{id}",
        "clearLog": "@/clearLog/{id}",
        "logList": "/system/tool/jobLog/list"
      },
      "identifyingCode": {"@extend": "list", "generate": "@/generate"},
      "thirdToken": {"@extend": "list"},
      "shortUrl": {"@extend": "list"}
    },
    "menu": {"@extend": "tree"},
    "dict": {"@extend": "list"},
    "notice": {
      "message": {"@extend": "list"},
      "smsTemplate": {"@extend": "list"},
      "smsRecord": {"@extend": "list", "send": "@/send"},
      "mailTemplate": {"@extend": "list"},
      "mailRecord": {"@extend": "list", "send": "@/send"},
      "voiceTemplate": {"@extend": "list"},
      "voiceRecord": {"@extend": "list", "send": "@/send"}
    },
    "test": {"@extend": "list"},
    "tenant": {"@extend": "list"},
    "systemConfig": {"@extend": "list"},
    "log": {"loginLog": {"@extend": "list"}, "interfaceLog": {"@extend": "list"}},
  },

};

export default API
