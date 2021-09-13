<template>
    <el-form-item :label="label" :prop="prop" :label-width="labelWidth">
        <div v-if="formType === 'div'">
            {{ value && value.toString() }}
        </div>
        <el-button v-else-if="formType === 'el-button'" :type="type" :icon="icon" @click="click">
            <slot/>
        </el-button>
        <component
            v-else
            :is="formType"
            :value="value"
            :type="type"
            :placeholder="placeholder"
            :rangeSeparator="rangeSeparator"
            :startPlaceholder="startPlaceholder"
            :endPlaceholder="endPlaceholder"
            :clearable="clearable"
            :disabled="disabled"
            :readonly="readonly"
            :multiple="multiple"
            :multiple-limit="multipleLimit"
            :collapse-tags="collapseTags"
            :valueFormat="valueFormat"
            :picker-options="pickerOptions"
            :min="min"
            :max="max"
            :suffix-icon="suffixIcon"
            @input="input"
            @change="change"
            @blur="blur">
            <slot/>
            <template v-if="append" slot="append">{{ append }}</template>
            <template v-if="prepend">
                <template v-if="typeof prepend === 'string'" slot="prepend">{{ prepend }}</template>
                <template v-if="typeof prepend === 'object'">
                    <el-select :style="`min-width: ${prependWidth}px`" v-model="prependSelectVal" @change="prependSelectChange" slot="prepend">
                        <el-option v-for="item of prepend" :key="item.value" :label="item.name"
                                   :value="item.value"></el-option>
                    </el-select>
                </template>
            </template>
        </component>
    </el-form-item>
</template>

<script>
export default {
    name: "ev-form-item",
    props: {
        formType: {type: String, default: ''},
        prop: {type: String, default: ''},
        label: {type: String, default: ''},
        type: {type: String, default: 'text'},
        labelWidth: {type: String, default: ''},
        placeholder: {type: String, default: ''},
        // button icon
        icon: {type: String, default: ''},
        // 尾部图标
        suffixIcon: {type: String, default: ''},
        // 输入框后缀
        append: {type: String, default: ''},
        // 输入框前缀
        prepend: {type: [String, Array], default: ''},
        // 前缀下拉选择
        prependSelect: {type: [String, Number], default: ''},
        prependWidth: {type: String, default: '80'},
        prependSelectChange: {type: Function},

        // select
        valueKey: {type: String, default: 'id'},
        // 多选
        multiple: {type: Boolean, default: false},
        // 多选时，将选中的值按文字的形式展示
        collapseTags: {type: Boolean, default: false},
        // 选择项目数  0为不限制
        multipleLimit: {type: Number, default: 0},

        clearable: {type: Boolean, default: true},
        disabled: {type: Boolean, default: false},
        readonly: {type: Boolean, default: false},

        loading: {type: Boolean, default: false},

        /* 日期范围选择器使用 */
        // 至
        rangeSeparator: {type: String},
        // 开始
        startPlaceholder: {type: String},
        // 结束
        endPlaceholder: {type: String},
        // 输出时间格式
        valueFormat: {type: String},
        pickerOptions: {type: Object, default: () => ({})},

        min: {type: Number},
        max: {type: Number},

        value: {type: [String, Number, Boolean, Object, Array, Date], default: undefined},
    },
    data() {
        return {
            prependSelectVal: '',
        }
    },
    methods: {
        input(event) {
            this.$emit("input", event)
        },
        change(event) {
            this.$emit("change", event)
        },
        click(event) {
            this.$emit("click", event)
        },
        blur(event) {
            this.$emit("blur", event)
        },
    },
    updated() {
        if (this.prependSelect && this.prependSelectVal !== this.prependSelect.val) {
            this.prependSelectVal = this.prependSelect.val;
        }
    }
}
</script>

<style lang="less" scoped>

/deep/ .el-button--primary,
/deep/ .el-button--success,
/deep/ .el-button--info,
/deep/ .el-button--warning,
/deep/ .el-button--danger {
    [class^="el-icon"], span {
        color: white;
    }
}

/deep/ .el-select {
    .el-input .el-select__caret {
        line-height: unset;
    }
}

/*重置disabled的样式, 字体改为默认颜色 黑色*/
/deep/ .el-input.is-disabled .el-input__inner {
    color: unset;
}
</style>
