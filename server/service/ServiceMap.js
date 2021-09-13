//updated by dolphin framework on 2020-10-23 5:48:13 ├F10: PM┤.

"use strict";
const ServiceMap = {"system":{"test":require('./system/TestService'),"auth":{"OrgService":require('./system/auth/OrgService'),"UserService":require('./system/auth/UserService'),"RoleService":require('./system/auth/RoleService')},"MenuService":require('./system/MenuService'),"log":{"LoginLogService":require('./system/log/LoginLogService'),"InterfaceLogService":require('./system/log/InterfaceLogService')},"DictService":require('./system/DictService'),"TenantService":require('./system/TenantService'),"tool":{"FileService":require('./system/tool/FileService'),"JobService":require('./system/tool/JobService'),"JobLogService":require('./system/tool/JobLogService'),"ShortUrlService":require('./system/tool/ShortUrlService'),"ThirdTokenService":require('./system/tool/ThirdTokenService'),"IdentifyingCodeService":require('./system/tool/IdentifyingCodeService')},"SystemConfigService":require('./system/SystemConfigService'),"notice":{"MessageService":require('./system/notice/MessageService'),"SmsTemplateService":require('./system/notice/SmsTemplateService'),"SmsRecordService":require('./system/notice/SmsRecordService'),"MailTemplateService":require('./system/notice/MailTemplateService'),"MailRecordService":require('./system/notice/MailRecordService'),"VoiceTemplateService":require('./system/notice/VoiceTemplateService'),"VoiceRecordService":require('./system/notice/VoiceRecordService')},"baseData":{"CustomerService":require('./system/baseData/CustomerService'),"ShipToService":require('./system/baseData/ShipToService'),"SupplierService":require('./system/baseData/SupplierService'),"WarehouseService":require('./system/baseData/WarehouseService'),"FactoryService":require('./system/baseData/FactoryService')}},"order":{"BucketService":require('./order/BucketService'),"DeliveryOrderService":require('./order/DeliveryOrderService'),"DeliveryOrderLineService":require('./order/DeliveryOrderLineService'),"BackOrderService":require('./order/BackOrderService'),"BackOrderLineService":require('./order/BackOrderLineService'),"BalanceOrderService":require('./order/BalanceOrderService')},"count":{"customerBucketCountService":require('./count/customerBucketCountService'),"factoryBucketCountService":require('./count/factoryBucketCountService')}};

module.exports = ServiceMap;