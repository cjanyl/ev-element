<script>
export default {
    name: 'evFormDialog',
    props: {
        visible: {type: Boolean, default: false},
        title: {type: String, default: '标题'},
        showCancel: {type: Boolean, default: true},
        closeOnClickModal: {type: Boolean, default: false},
        cancelText: {type: String, default: '取消'},
        showOk: {type: Boolean, default: true},
        okText: {type: String, default: '确定'},
        oKType: {type: String, default: 'primary'},
        dialogFooterClass: {type: String, default: 'test'},
        width: {type: String, default: '50%'},
        top: {type: String, default: '15vh'},

        // 全屏
        fullscreen: {type: Boolean, default: false},
        // 按钮loading
        btnLoading: {type: Boolean, default: false},

        eleRef: {type: String, default: 'dialog'},
        // 行内表单模式
        inline: {type: Boolean, default: true},
        // 是否显示必填字段的标签旁边的红色星号
        hideRequiredAsterisk: {type: Boolean, default: false},
        // 是否显示校验错误信息
        showMessage: {type: Boolean, default: true},
        // 是否以行内形式展示校验信息
        inlineMessage: {type: Boolean, default: false},
        // 是否在输入框中显示校验结果反馈图标
        statusIcon: {type: Boolean, default: false},
        // 是否在 rules 属性改变后立即触发一次验证
        validateOnRuleChange: {type: Boolean, default: true},
        // 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
        disabled: {type: Boolean, default: false},
        // 表单域标签的宽度
        labelWidth: {type: String, default: '80px'},
        // 用于控制该表单内组件的尺寸
        size: {type: String, default: ''},
        // 表单域标签的后缀
        labelSuffix: {type: String, default: ':'},
        // 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
        labelPosition: {type: String, default: 'right'},
        items: {
            type: Array, default: () => ([])
        },
        // 默认值
        formData: {
            type: Object, default: () => ({})
        },
        // 启用layout布局
        layout: {type: Boolean, default: true},
    },
    data() {
        return {
            form: {},
        }
    },
    render(createElement) {
        if (this.visible) {
            const evForm = createElement('ev-form', {
                props: {
                    items: this.items,
                    inline: this.inline,
                    formData: this.items.reduce((obj, val) => {
                        obj[val.code] = val.value || this.formData[val.code];
                        return obj;
                    }, {}),
                    layout: this.layout,
                    disabled: this.disabled,
                    showBorder: false,
                    queryBtnShow: false,
                    resetBtnShow: false,
                    hideRequiredAsterisk: this.hideRequiredAsterisk
                },
                key: Math.random(),
                ref: this.eleRef,
            });
            const close = () => {
                // 获取到form表单
                evForm.context.$refs[this.eleRef].$children[0].resetFields();
                this.$emit('close');
            }
            const dialogChildren = [];
            if (this.showCancel) {
                dialogChildren.push(createElement('el-button', {
                    props: {loading: this.btnLoading},
                    on: {click: close,}
                }, this.cancelText))
            }
            if (this.showOk) {
                dialogChildren.push(createElement('el-button', {
                    props: {
                        loading: this.btnLoading,
                        type: this.oKType
                    },
                    on: {
                        click: () => {
                            evForm.context.$refs[this.eleRef].$children[0].validate((valid) => {
                                if (valid) {
                                    // 验证通过
                                    // form表单数据
                                    const data = evForm.context.$refs[this.eleRef].$data.form;
                                    this.$emit('submit', (() => {
                                        console.log(data);
                                        return {
                                            data,
                                            callback: () => evForm.context.$refs[this.eleRef].$children[0].resetFields()
                                        }
                                    })())
                                } else {
                                    // 验证未通过
                                }
                            })
                        }
                    }
                }, this.okText))
            }
            const evDialog = {
                name: 'el-dialog',
                params: {
                    props: {
                        title: this.title,
                        top: this.top,
                        fullscreen: this.fullscreen,
                        visible: this.visible,
                        width: this.width,
                        closeOnClickModal: this.closeOnClickModal,
                        modalAppendToBody: false,
                    },
                    on: {
                        close
                    }
                },
                children: [
                    createElement('div', {
                        class: `dialog-footer ${this.dialogFooterClass}`,
                        slot: 'footer'
                    }, dialogChildren)
                ]
            }
            evDialog.children.unshift(evForm);
            return createElement(evDialog.name, evDialog.params, evDialog.children);
        } else {
            return {};
        }
    }
}
</script>
<style lang="less" scoped>
/deep/ .el-dialog__wrapper {
    .el-dialog {
        .el-dialog__body {
            padding: 16px 20px;
        }
    }
}

.form-bottom {
    width: 100%;
    display: flex;
    padding-bottom: 16px;
    justify-content: space-between;
}

.form-bottom::before, .form-bottom::after {
    content: none;
}

</style>
