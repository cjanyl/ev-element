<template>
  <div>
    <el-card class="box-card" v-if="cardFlag" :class="cardClass">
      <div slot="header" v-if="titleFlag">
        <span>{{title}}</span>
        <span class="card-button">
            <slot name="button"></slot>
        </span>
      </div>
      <slot name="queryForm"></slot>
      <slot></slot>
    </el-card>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    cardFlag: {type: Boolean, default: true},   // 是否使用card组件作为根节点
    title: {type: String, default: '面板'},      // card name
    titleFlag: {type: Boolean, default: true},  // 是否展示card name
    cardClass: {type: String, default: null},   // card class
  },
  data(){
    return {};
  },
  computed: {},
  watch: {},
  methods: {},

  created() {},
}
</script>
