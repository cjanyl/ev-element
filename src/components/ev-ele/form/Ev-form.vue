<script>
export default {
    name:'evForm',
    props: {
        eleRef: {type: String, default: (Math.random().toFixed(5) * 100000).toString()},
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
        // 表单项
        items: {
            type: Array, default: () => ([
                {
                    formType: 'input',
                }
            ])
        },
        // 按钮是否换行
        btnWrap: {type: Boolean, default: true},
        // 显示查询按钮
        queryBtnShow: {type: Boolean, default: true},
        // 显示重制按钮
        resetBtnShow: {type: Boolean, default: true},


        // 表单初始化数据
        formData: {type: Object, default: () => ({})},

        // 启用layout布局
        layout: {type: Boolean, default: false},
        // 是否显示form的border
        showBorder: {type: Boolean, default: true},
    },
    data() {
        return {
            form: {},
            rules: {},
            resetForm: {},
        };
    },
    computed: {},
    watch: {},
    methods: {
        getFormParams() {
            return this.form;
        },
    },
    created() {
        this.form = this.items.reduce((obj, val) => {
            switch (Object.prototype.toString.call(this.formData[val.code])) {
                case '[object Undefined]':
                    obj[val.code] = val.value;
                    break;
                case '[object Boolean]' :
                    obj[val.code] = this.formData[val.code] + '';
                    break;
                default:
                    obj[val.code] = this.formData[val.code];
            }
            return obj;
        }, {});
        this.rules = this.items.reduce((obj, val) => {
            if (val.rules) obj[val.code] = val.rules;
            return obj;
        }, {});
    },
    render(createElement) {
        const eleObj = {
            'input': 'el-input',
            'dataPicker': 'el-date-picker',
            'timePicker': 'el-time-picker',
            'button': 'el-button',
            'select': 'el-select',
            'upload': 'el-upload',
            'list': 'div',
        };
        const evForm = {
            name: 'el-form',
            params: {
                props: {
                    inline: true,
                    rules: this.rules,
                    labelWidth: this.labelWidth,
                    model: this.form,
                },
                ref: this.eleRef,
            },
            children: [
                createElement('template', {slot: 'queryForm'}, this.$slots.queryForm),
            ],
        };
        {
            if (this.labelSuffix) evForm.params.props.labelSuffix = this.labelSuffix;
            if (this.labelPosition) evForm.params.props.labelPosition = this.labelPosition;
            if (Object.prototype.toString.call(this.hideRequiredAsterisk) === '[object Boolean]') evForm.params.props.hideRequiredAsterisk = this.hideRequiredAsterisk;
            if (this.showMessage) evForm.params.props.showMessage = this.showMessage;
            if (this.inlineMessage) evForm.params.props.inlineMessage = this.inlineMessage;
            if (this.statusIcon) evForm.params.props.statusIcon = this.statusIcon;
            if (this.validateOnRuleChange) evForm.params.props.validateOnRuleChange = this.validateOnRuleChange;
            if (this.size) evForm.params.props.size = this.size;
            if (this.disabled) evForm.params.props.disabled = this.disabled;
        }
        let formChildren = [];
        const onClick = (item) => {
            return () => {
                item.type === 'reset' && formNode.context.$refs[this.eleRef].resetFields();
                item.onClick && item.onClick(this.form);
            }
        };
        // 非按钮，或非另起一行的按钮（默认按钮另起一行）
        this.items.filter(item => !['button', 'hide'].includes(item.formType)).forEach(item => {
            if (item.formType === 'title') {
                if (this.layout) {
                    const elCol = {
                        name: 'el-col',
                        params: {
                            props: {
                                span: item.span || 24,
                                offset: item.offset || 0,
                                push: item.push || 0,
                                pull: item.pull || 0,
                            },
                            style: "padding-left: 16px"
                        },
                        children: [createElement('h3', {}, item.title)]
                    }
                    formChildren.push(createElement(elCol.name, elCol.params, elCol.children))
                } else {
                    formChildren.push(createElement('el-row', {}, item.title))
                }
            } else {
                const props = {
                    label: item.label || '',
                    formType: eleObj[item.formType],
                    disabled: item.disabled,
                    readonly: item.readonly,
                    type: item.type,
                    placeholder: item.placeholder,
                    clearable: item.clearable || true,
                };
                // 数字类型
                if (item.type === 'number') {
                    if (typeof item.min === 'number') {
                        props.min = item.min;
                    }
                    if (typeof item.max === 'number') {
                        props.max = item.max;
                    }
                }
                // item的事件
                const on = {
                    input: (event) => {
                        if (item.code) {
                            this.$set(this.form, item.code, event);
                            item.input && item.input(event);
                        }
                    },
                    change: (event) => {
                        item.onChange && item.onChange(event);
                        this.$emit("change", this.form)
                    },
                    blur: (event) => {
                        this.$emit("blur", event)
                    }
                }
                // 时间选择器
                if (item.pickerOptions) {
                    props.pickerOptions = item.pickerOptions;
                }

                /*日期范围选择器使用 */
                if (item.type === 'daterange') {
                    props.rangeSeparator = item.rangeSeparator || '~';
                    props.startPlaceholder = item.rangeSeparator || '开始时间';
                    props.endPlaceholder = item.endPlaceholder || '结束时间';
                }

                if (item.code) {
                    props.value = this.form[item.code];
                    props.prop = item.code;
                }
                if (item.valueFormat) {
                    props.valueFormat = item.valueFormat; // 时间格式
                }
                if (item.formType === 'select') {
                    props.placeholder = props.placeholder || '请选择';
                    // 是否多选
                    props.multiple = !!item.multiple;
                    // 多选时，将选中的值按文字的形式展示
                    props.collapseTags = !!item.collapseTags;
                    // 选择项目数  0为不限制
                    props.multipleLimit = Number(item.multipleLimit || 0) || 0;
                }
                if (item.labelWidth) {
                    props.labelWidth = item.labelWidth;
                }
                if (item.icon) {
                    props.icon = item.icon;
                }
                if (item.suffixIcon) {
                    props.suffixIcon = item.suffixIcon;
                }
                if (item.append) {
                    props.append = item.append;
                }
                if (item.prepend) {
                    props.prepend = item.prepend;
                    if (typeof item.prepend === 'object') {
                        props.prependSelect = item.prependSelect;
                        props.prependSelectChange = item.prependSelectChange;
                    }
                }

                let formItemChildren;
                // 下拉列表
                if (item.options) {
                    formItemChildren = [];
                    switch (Object.prototype.toString.call(item.options)) {
                        case '[object Array]':
                            formItemChildren = item.options;
                            break;
                        case '[object String]':
                            formItemChildren = Object.entries(this.$dict[item.options]).map(obj => {
                                let value = Number(obj[0]);
                                if (isNaN(value)) value = obj[0];
                                return {label: obj[1], value};
                            });
                            break;
                    }
                    formItemChildren = formItemChildren.map(option => {
                        return createElement('el-option', {
                            props: {
                                label: option.label,
                                value: option.value,
                            }
                        })
                    });
                }
                if (this.layout) {
                    const elCol = {
                        name: 'el-col',
                        params: {
                            props: {
                                span: item.span || 12,
                                offset: item.offset || 0,
                                push: item.push || 0,
                                pull: item.pull || 0,
                            }
                        },
                        children: [createElement('ev-form-item', {
                            props,
                            on,
                        }, formItemChildren)]
                    }
                    formChildren.push(createElement(elCol.name, elCol.params, elCol.children))
                } else {
                    formChildren.push(createElement('ev-form-item', {
                        props,
                        on,
                    }, formItemChildren))
                }
            }
        })
        const btnItem = [];
        if (this.queryBtnShow) {
            btnItem.push(createElement('el-button', {
                props: {
                    type: 'primary',
                },
                on: {
                    click: () => {
                        formNode.context.$refs[this.eleRef].validate((valid) => {
                            if (valid) {
                                // 验证通过
                                this.$emit('query', this.form)
                            } else {
                                // 验证未通过
                            }
                        })
                    }
                }
            }, '查询'))
        }
        if (this.resetBtnShow) {
            btnItem.push(createElement('el-button', {
                on: {
                    click: () => {
                        formNode.context.$refs[this.eleRef].resetFields()
                    },
                }
            }, '重置'))
        }
        this.items.filter(item => item.formType === 'button').forEach((item = {btnText: '请配置', type: ''}) => {
            btnItem.push(createElement('el-button', {
                props: {
                    type: item.type,
                },
                on: {
                    click: onClick(item),
                }
            }, item.btnText))
        })
        if (this.layout) {
            evForm.children.push(createElement('el-row', {}, formChildren))
        } else {
            evForm.children = formChildren;
        }
        if (btnItem.length) {
            evForm.children.push(createElement('el-row', {
                props: {
                    type: "flex",
                    justify: "end"
                }
            }, [createElement('el-col', {
                props: {
                    span: btnItem.length * 2
                },
                class: 'form-search-btn'
            }, btnItem)]));
        }
        const formBottom = {
            name: 'el-row',
            params: {
                class: 'form-bottom',
            },
        };
        const formNode = createElement(evForm.name, evForm.params, evForm.children);
        return createElement('div', {
            class: this.showBorder ? 'ev-form-border' : ''
        }, [
            formNode,
            this.$scopedSlots.default
                ? createElement(formBottom.name, formBottom.params, this.$scopedSlots.default())
                : '',
        ]);
    }
}
</script>
<style lang="less" scoped>
.ev-form-border {
    border: 1px solid #EBEEF5;
    padding: 8px;
    border-radius: 8px;
    margin-bottom: 8px;
}

/deep/ .el-form-item {
    margin-bottom: 16px;

    .el-form-item__error {
        font-size: 12px;
        padding-top: 2px;
    }
}

.form-search-btn {
    display: flex;
    justify-content: flex-end;
}

.form-bottom {
    padding-top: 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.form-bottom::before, .form-bottom::after {
    content: none;
}
</style>
