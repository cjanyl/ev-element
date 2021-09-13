<template>
  <el-dialog :visible.sync="visibleSync" :title="title" :width="width" :top="top">
    <ev-list
      ref="evDialogList"
      :columns="columns"
      :default-data="defaultData"
      :pagination="pagination"
      :source="source"
      :selected="selected"
      :titleFlag="false"
      :query-function="queryFunction"/>
  </el-dialog>
</template>

<script>
export default {
  name: "Ev-list-dialog",
  props: {
    source: {type: String, default: 'server'},
    selected: {type: String, default: 'noSelected'},
    width: {type: String, default: '60vw'},
    top: {type: String, default: '5vh'},
    title: {type: String, default: '标题'},
    visible: {type: Boolean, default: false},
    pagination: {type: Boolean, default: false},
    columns: {type: Array, default: () => []},
    defaultData: {type: Array, default: () => []},
    queryFunction: {type: String},                                  //请求function
  },
  data() {
    return {
      visibleSync: false,
    }
  },
  watch: {
    visible: {
      handler: function (n) {
        this.visibleSync = n;
      },
      immediate: true,
    },
    visibleSync: {
      handler: function (n) {
        this.$emit('update:visible', n);
      },
      immediate: true,
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__wrapper {
  .el-dialog {
    .el-dialog__body {
      padding: 8px 20px 16px;
    }
  }
}

/deep/ .ev-list .el-card {
  max-height: 75vh;

  .el-card__body {
    height: 100%;
  }
}
</style>
