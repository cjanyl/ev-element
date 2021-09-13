<template>
    <div class="page-content">
        <ev-list
            title="用户"
            ref="list"
            :form-item="item"
            :columns="columns"
            :pageSizeOption="[5,10,20, 50, 100]"
            :hideDetailButton="false"
            :hideEditButton="false"
            :hideDeleteButton="false"
            :defaultPageNumber="0"
            @edit="edit"
            @detail="detail"
            remove-function="removeTest"
            query-function="getTestList">
            <template v-slot:createTime="{row}">
                {{ row.createTime && $moment(row.createTime).format('YYYY-MM-DD HH:mm:ss') || '' }}
            </template>
            <template v-slot:updateTime="{row}">
                {{ row.updateTime && $moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss') || '' }}
            </template>
            <template v-slot:role="{row}">
                <template v-if="row.role">
                    <el-tag v-for="item of row.role" :key="item.id">
                        {{ item.name }}
                    </el-tag>
                </template>
            </template>
            <template v-slot:queryFormTailPlug>
                <div></div>
                <div>
                    <el-button type="primary" @click="add">新增</el-button>
                </div>
            </template>
<!--            <template v-slot:queryForm>-->
<!--                <el-form class="el-query-form" :inline="true" v-model="queryForm">-->
<!--                    <el-form-item label="账号名称">-->
<!--                        <el-input placeholder="请输入" v-model="queryForm.name"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item>-->
<!--                        <el-button type="primary" @click="query">查询</el-button>-->
<!--                    </el-form-item>-->
<!--                </el-form>-->
<!--                <div class="el-query-form-bottom">-->
<!--                    <el-button type="primary" @click="add">新增</el-button>-->
<!--                </div>-->
<!--            </template>-->
        </ev-list>

        <ev-form-dialog
            :visible="addVisible"
            :items="addVal.item"
            :title="addVal.title"
            :okText="addVal.okText"
            :formData="addData"
            :disabled="addDisabled"
            :btn-loading="dialogFlag"
            @close="closeDialog('addVisible')"
            @submit="(res) => dialogSubmit(res, dialogType)"/>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "user",
    data() {
        return {
            queryForm: {},
            item: [
                {formType: 'input', code: 'name', label: '账号名称', labelWidth: '130px'},
            ],
            columns: [
                {name: '序号', width: '50', fixed: 'left', scopedSlots: 'rowIndex'},
                {code: 'name', name: '账号名称', width: '100'},
                {code: 'createTime', name: '创建时间', scopedSlots: 'createTime'},
                {code: 'updateTime', name: '更新时间', scopedSlots: 'updateTime'},
                {code: 'role', name: '角色', scopedSlots: 'role'},
                {name: '操作', width: '300', fixed: 'right', scopedSlots: 'operation'},
            ],
            addVisible: false,
            addVal: {
                title: '新增用户',
                okText: '保存',
                item: [
                    // {
                    //     formType: 'select',
                    //     code: 'taxName',
                    //     label: '税务名称',
                    //     labelWidth: '120px',
                    //     placeholder: '请选择税务名称',
                    //     options: [],
                    //     rules: [
                    //         {required: true, message: '请选择税务名称', trigger: 'change'},
                    //     ]
                    // },
                    {
                        formType: 'input', code: 'name', label: '账号名称', labelWidth: '120px', span: 12, placeholder: '请输入账号名称',
                        rules: [
                            {required: true, message: '请输入账号名称', trigger: 'blur'},
                        ]
                    },
                    {
                        formType: 'input', code: 'password', type: 'password', label: '密码', span: 12,
                        labelWidth: '120px', placeholder: '请输入密码',
                        rules: [
                            {max: 12, message: '长度不超过 12 个字符', trigger: 'blur'},
                            {min: 6, message: '长度不少于 6 个字符', trigger: 'blur'}
                        ]
                    }
                ],
            },
            addData: {},
            addDisabled: false,
            dialogFlag: false,
            dialogType: 'add',
        }
    },
    methods: {
        ...mapActions(['addTest', 'updateByIdTest']),
        query(){
            this.$refs.list.query(this.queryForm);
        },
        // 关闭弹窗
        closeDialog(type) {
            this[type] = false;
        },
        // 开启弹窗
        openDialog(type) {
            this[type] = true;
        },
        // 点击弹窗确定
        dialogSubmit({data, callback}, type) {
            this.dialogFlag = true;
            switch (type) {
                case 'add':
                    this.addTest({data}).then(() => {
                        this.dialogFlag = false;
                        callback();
                        this.$refs['list'].query();
                        this.closeDialog('addVisible');
                    });
                    break;
                case 'edit':
                    this.updateByIdTest({pathData: {id: this.addData._id}, data}).then(() => {
                        this.dialogFlag = false;
                        callback();
                        this.$refs['list'].query();
                        this.closeDialog('addVisible');
                    });
                    break;
                    case 'detail':
                        this.dialogFlag = false;
                        callback();
                        this.closeDialog('addVisible');
                        break;
            }
        },
        add() {
            console.log(this.$refs['list']);
            this.addVal.title = '新增';
            this.addVal.okText = '保存';
            this.addDisabled = false;
            this.dialogType = 'add'
            this.addVisible = true;
        },
        edit(row) {
            this.addVal.title = '编辑';
            this.addVal.okText = '保存';
            this.addDisabled = false;
            this.dialogType = 'edit'
            this.addData = row;
            this.openDialog('addVisible');
        },
        detail(row){
            this.addVal.title = '详情';
            this.addVal.okText = '确定';
            this.addDisabled = true;
            this.dialogType = 'detail'
            this.addData = row;
            this.openDialog('addVisible');
        },
    },
}
</script>

<style scoped>

</style>