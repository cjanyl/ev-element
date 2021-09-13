let initDataConfig = [];

initDataConfig.push({service: require('../../service/system/auth/UserService'), data: require('./user')});
initDataConfig.push({service: require('../../service/system/auth/RoleService'), data: require('./role')});
initDataConfig.push({service: require('../../service/system/DictService'), data: require('./dict')});
initDataConfig.push({service: require('../../service/system/MenuService'), data: require('./menu')});
initDataConfig.push({service: require('../../service/system/SystemConfigService'), data: require('./systemConfig')});
initDataConfig.push({service: require('../../service/system/tool/JobService'), data: require('./job')});
initDataConfig.push({service: require('../../service/system/notice/SmsTemplateService'), data: require('./smsTemplate')});
initDataConfig.push({service: require('../../service/system/notice/MailTemplateService'), data: require('./mailTemplate')});

module.exports = initDataConfig;