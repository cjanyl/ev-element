<template>
    <div class="page-content">
        <ev-list
            :form-item="item"
            :columns="columns"
            :default-data="list"
            :hideDetailButton="false"
            :hideEditButton="false"
            :hideDeleteButton="false"
            :pageSizeOption="[5,10,20, 50, 100]"
            source="local"
            title="列表"
            @edit="edit"
            @detail="showDetail">
            <template v-slot:id="{row}">
                id插槽自定义数据显示：{{ row._id }}
            </template>
            <!--            <template slot="operation">-->
            <!--                <el-button>测试按钮自定义</el-button>-->
            <!--            </template>-->
            <template v-slot:queryFormTailPlug>
                <el-button @click="test(123)">test</el-button>
            </template>
        </ev-list>
        <ev-form-dialog
            :visible="detailVisible"
            :items="detailVal.item"
            :title="detailVal.title"
            :showCancel="detailVal.showCancel"
            width="80vw"
            :btn-loading="dialogFlag"
            :formData="detail"
            :disabled="false"
            @close="closeDialog('detailVisible')"
            @submit="(res) => dialogSubmit(res, 'detailVisible')"/>
    </div>
</template>

<script>
import moment from "moment";

let operatingTime = moment();
if (operatingTime.get('date') < 26) {
    operatingTime = operatingTime.subtract(1, "month");
}
operatingTime = operatingTime.toDate();
// let val = 'userName';
export default {
    name: "Form",
    data() {
        return {
            item: [
                {
                    formType: 'dataPicker', type: 'month', code: 'searchMonth', label: '结算月份', valueFormat: 'yyyy-MM',
                    placeholder: '请选择',
                    pickerOptions: {
                        disabledDate: (time) => {
                            return time.getTime() > operatingTime.getTime()
                        }
                    }
                },
                {
                    formType: 'dataPicker',
                    code: 'dataPicker',
                    type: 'daterange',
                    label: '时间段测试',
                    labelWidth: '130px',
                    pickerOptions: {shortcuts: [{
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }]}
                },
                {
                    formType: 'select',
                    code: 'trueOrFalse',
                    label: '布尔值测试',
                    labelWidth: '130px',
                    options: 'trueOrFalse'
                },
                {
                    formType: 'input',
                    code: 'input',
                    label: 'input测试',
                    placeholder: '请填写开票申请号',
                    labelWidth: '130px'
                },
                {
                    formType: 'select',
                    code: 'multipleChoiceTest',
                    label: '多选测试',
                    placeholder: '请选择',
                    multiple: true,
                    options: 'multipleChoiceTest'
                },
            ],
            columns: [
                {name: '序号', width: '50', fixed: 'left', scopedSlots: 'rowIndex'},
                {code: '_id', name: 'id', width: '200', scopedSlots: "id"},
                {code: 'list', name: '数组测试', width: '200', fixed: 'left', scopedSlots: 'array'},
                {code: 'name', name: '密码测试', width: '100', scopedSlots: 'password'},
                {code: 'boolean', name: '布尔值测试', width: '100', scopedSlots: 'boolean'},
                {code: 'html', name: 'html测试', width: '200', scopedSlots: 'html'},
                {code: 'percent', name: '百分比测试', width: '100', scopedSlots: 'percent'},
                {code: 'zip', name: '数字测试', width: '100', scopedSlots: 'number'},
                {code: 'object', name: 'Object测试', width: '200', scopedSlots: 'objectEach'},
                {code: 'dict', name: 'dict测试', width: '200', dictCode: 'multipleChoiceTest', scopedSlots: 'localDict'},
                {code: 'address', name: '地址', width: '220'},
                {code: 'province', name: '省', width: '100'},
                {code: 'city', name: '市', width: '100'},
                {code: 'date', name: '时间', width: '100'},
                {name: '操作', width: '300', fixed: 'right', scopedSlots: 'operation'},
            ],
            list: [
                {
                    _id: 1,
                    date: '2016-05-02',
                    name: '王小虎王小虎',
                    province: '上海',
                    city: '普陀区',
                    html: '<span>span<span><h1>h1</h1>',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333,
                    percent: 15,
                    boolean: true,
                    list: [1, 'a', 3],
                    object: {
                        code: '123',
                        name: '测试',
                    },
                    dict: 0,
                },
                {
                    _id: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    html: '<span>span<span><h1>h1</h1>',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    percent: 12,
                    boolean: true,
                    list: ['a', 'b', 'c', 'd', 'ererere'],
                    object: {
                        code: '123',
                        name: '测试',
                    },
                    dict: 1,
                },
                {
                    _id: 3,
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    html: '<span>span<span><h1>h1</h1>',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333,
                    percent: 40,
                    boolean: false,
                    list: [],
                    object: {
                        code: '123',
                        name: '测试',
                    },
                    dict: 2,
                },
                {
                    _id: 4,
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    html: '<span>span<span><h2>h2</h2>',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333,
                    percent: 40,
                    boolean: false,
                    list: [],
                    object: {
                        code: '123',
                        name: '测试',
                    },
                    dict: 2,
                },
                {
                    _id: 5,
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    html: '<span>span<span><h1>h1</h1>',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333,
                    percent: 40,
                    boolean: false,
                    list: [],
                    object: {
                        code: '123',
                        name: '测试',
                    },
                    dict: 2,
                },
                {
                    _id: 6,
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    html: '<span>span<span><h1>h1</h1>',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333,
                    percent: 40,
                    boolean: false,
                    list: [],
                    object: {
                        code: '123',
                        name: '测试',
                    },
                    dict: 2,
                },
                {
                    _id: 7,
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    html: '<span>span<span><h1>h1</h1>',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333,
                    percent: 40,
                    boolean: false,
                    list: [],
                    object: {
                        code: '123',
                        name: '测试',
                    },
                },
                {
                    _id: 8,
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    html: '<span>span<span><h1>h1</h1>',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333,
                    percent: 40,
                    boolean: false,
                    list: [],
                    object: {
                        code: '123',
                        name: '测试',
                    },
                },
                {
                    _id: 9,
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    html: '<span>span<span><h1>h1</h1>',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333,
                    percent: 40,
                    boolean: false,
                    list: [],
                    object: {
                        code: '123',
                        name: '测试',
                    },
                    dict: 2,
                },
                {
                    _id: 10,
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    html: '<span>span<span><h1>h1</h1>',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333,
                    percent: 40,
                    boolean: false,
                    list: [],
                    object: {
                        code: '123',
                        name: '测试',
                    },
                },
                {
                    _id: 11,
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    html: '<span>span<span><h1>h1</h1>',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333,
                    percent: 40,
                    boolean: false,
                    list: [],
                    object: {
                        code: '123',
                        name: '测试',
                    },
                },
                {
                    _id: 12,
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    html: '<span>span<span><h1>h1</h1>',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333,
                    percent: 40,
                    boolean: false,
                    list: [],
                    object: {
                        code: '123',
                        name: '测试',
                    },
                }
            ],
            visible: true,
            detailVisible: false,
            // prependSelectVal: {
            //     val,
            // },
            detailVal: {
                title: '详情',
                showCancel: false,
                item: [
                    {formType: 'title', title: 'col 24'},
                    {formType: 'input', code: '_id', label: '_id', span: 24},
                    {formType: 'title', title: 'col 12'},
                    {formType: 'input', code: 'name', label: '姓名（带图标）', span: 12, suffixIcon: 'el-icon-eleme',},
                    {formType: 'input', code: 'province', label: '省',labelWidth: '100', span: 12},
                    {formType: 'title', title: 'col 8'},
                    {formType: 'input', code: 'city', label: '市', span: 8},
                    {formType: 'list', code: 'list', label: '数组测试', span: 8},
                    {formType: 'input', code: 'html', label: 'html测试', span: 8},
                    {formType: 'input', code: 'zip', label: '数字测试', span: 8, prepend: '前缀测试'},
                    {formType: 'input', code: 'percent', label: '百分比测试',labelWidth: '100', append: '%', span: 8},
                    {formType: 'select', code: 'boolean', label: 'Boolean测试',labelWidth: '100', options: 'tOrF', span: 8},
                    {formType: 'select', code: 'dict', label: 'dict测试',labelWidth: '100', options: 'multipleChoiceTest', span: 8},
                    // {formType: 'input', code: 'test', label: '多来源测试',labelWidth: '100', prependSelect: this.prependSelectVal, span: 8,
                    //     prependSelectChange: (val) => {
                    //         this.prependSelectVal.val = val;
                    //     },
                    //     prepend: [{name: '姓名', value: 'userName'}, {name: '性别', value: 'gender'}]}
                ],
            },
            detail: {},
            dialogFlag: false,
        }
    },
    methods: {
        edit(row){
            console.log(row);
        },
        showDetail(row){
            console.log(row);
            this.detailVisible = true;
            this.detail = row;
        },
        // 关闭弹窗
        closeDialog(type) {
            this[type] = false;
        },
        // 点击弹窗确定
        // eslint-disable-next-line no-unused-vars
        dialogSubmit({data, callback}, type) {
            console.log(data);
            this[type] = false;
            callback();
        },

        test(val){
            console.log(val)
        },
    },
}
</script>

<style scoped>

</style>