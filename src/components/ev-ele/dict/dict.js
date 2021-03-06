module.exports = {
  // 开票状态
  invoicingStatus: {
    1: '已创建',
    2: '提交失败',
    3: '已提交',
    4: '已完成',
    5: '已作废'
  },
  // 发票来源
  invoiceSource: {
    1: '自动',
    2: '手动',
  },
  // 操作类型
  cancelType: {
    1: '作废',
    2: '红冲',
  },
  // 推送SAP状态
  multipleChoiceTest: {
    0: '测试0',
    1: '测试1',
    2: '测试2'
  },
  // 发票类型
  invoiceType: {
    1: '纸质普票',
    2: '纸质专票',
    3: '增值税电子发票',
    4: '增值税电子专用发票'
  },
  // 是否对接百旺
  isInvoicingOnline: {
    0: '未对接百望',
    1: '对接百望'
  },
  // 反记账标识
  antiAccountingIndicator: {
    0: '否',
    1: '是'
  },
  // 结算状态
  settlementStatus: {
    1: '已结算',
    2: '已冲销'
  },
  trueOrFalse: {
    0: '否',
    1: '是'
  },
  tOrF: {
    true: '否',
    false: '是'
  },
  // 日志类型
  logType: {
    1: '创建开票申请单',
    2: '执行开票',
    3: '手动开票',
    4: '修改开票信息',
    5: '修改发票信息',
    6: '作废发票',
    7: '红冲发票',
    8: '开票申请单状态回传',
    9: '发票数据回传',
    10: '发票状态回传',
  },
}
