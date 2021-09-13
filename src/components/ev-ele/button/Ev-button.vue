<template>
  <span v-if="title">
    <el-button v-if="!isLink" :type="type" :icon="icon" :size="size" :circle="circle" :round="round" @click="click">{{ title }}</el-button>
    <el-link v-else :type="type" :icon="icon" :size="size" @click="click">{{ title }}</el-link>
  </span>
  <span v-else>
    <el-button v-if="!isLink" :type="type" :icon="icon" :size="size" :circle="circle" :round="round" @click="click" />
    <el-link v-else :type="type" :icon="icon" :size="size" @click="click">请点击</el-link>
  </span>
</template>

<script>
export default {
  name: "ev-button",
  props: {
    title: {type: String},                      //提示信息
    circle: {type: Boolean, default: false},    //是否圆形按钮
    round: {type: Boolean, default: false},     //是否圆角按钮
    size: {type: String, default: 'small'},     //尺寸
    type: {type: String, default: ''},   //类型
    icon: {type: String},                       //图标
    disabled: {type: Boolean, default: false},  //是否可用
    loading: {type: Boolean, default: false},   //加载状态
    isLink: {type: Boolean, default: false},    //文字链接
  },
  methods: {
    click() {
      this.$emit('click')
    }
  },
  created() {
  }

}
</script>

<style scoped>

</style>
