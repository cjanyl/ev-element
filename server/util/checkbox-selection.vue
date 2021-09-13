<!--<template>-->
<!--  <div-->
<!--    class="checkbox-selection"-->
<!--    ref="box"-->
<!--    @mousedown="onMousedown"-->
<!--    @mousemove="onmousemove"-->
<!--  >-->
<!--    <el-checkbox-group-->
<!--      :value="value"-->
<!--      @input="onInput"-->
<!--    >-->
<!--      <el-row :gutter="10">-->
<!--        <el-col-->
<!--          v-for="(item) in options"-->
<!--          :key="item.value"-->
<!--          :span="24 / cols"-->
<!--        >-->
<!--          <el-checkbox v-position="item.value" :label="item.value">{{ item.label }}</el-checkbox>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-checkbox-group>-->
<!--    <div-->
<!--      v-if="show"-->
<!--      class="checkbox-selection__area"-->
<!--      :style="boxStyle"-->
<!--    ></div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--function debounce (fn, delay) {-->
<!--  let timer = null-->
<!--  return function () {-->
<!--    const args = arguments-->
<!--    timer && clearTimeout(timer)-->
<!--    timer = setTimeout(() => fn.apply(this, args), delay)-->
<!--  }-->
<!--}-->

<!--/**-->
<!-- * @param {HTMLElement} el-->
<!-- * @param {DirectiveBinding} binding-->
<!-- * @param {VNode} vnode-->
<!-- */-->
<!--function bindPosition (el, binding, vnode) {-->
<!--  const { width, height } = el.getBoundingClientRect()-->
<!--  const x = el.offsetLeft-->
<!--  const y = el.offsetTop-->
<!--  const value = binding.value-->
<!--  const data = { x, y, width, height, value }-->
<!--  const index = vnode.context.points.findIndex(item => item.value === value)-->
<!--  if (index >= 0) {-->
<!--    vnode.context.points.splice(index, 1, data)-->
<!--  } else {-->
<!--    vnode.context.points.push(data)-->
<!--  }-->
<!--}-->

<!--export default {-->
<!--  name: 'CheckboxSelection',-->

<!--  props: {-->
<!--    value: Array,-->
<!--    options: {-->
<!--      type: Array,-->
<!--      default: () => []-->
<!--    },-->
<!--    cols: {-->
<!--      type: Number,-->
<!--      default: 3,-->
<!--      validator (value) {-->
<!--        const val = 24 / value-->
<!--        return ((val | 0) === val)-->
<!--      }-->
<!--    }-->
<!--  },-->

<!--  directives: {-->
<!--    position: {-->
<!--      inserted: bindPosition,-->
<!--      update: bindPosition-->
<!--    }-->
<!--  },-->

<!--  created () {-->
<!--    this.onkeydown = e => {-->
<!--      if (e.keyCode === 16) {-->
<!--        this.shiftKey = true-->
<!--      }-->
<!--    }-->
<!--    this.onkeyup = e => {-->
<!--      if (e.keyCode === 16) {-->
<!--        this.shiftKey = false-->
<!--      }-->
<!--    }-->
<!--    window.addEventListener('keydown', this.onkeydown)-->
<!--    window.addEventListener('keyup', this.onkeyup)-->
<!--    window.addEventListener('mouseup', this.onMouseup)-->
<!--  },-->

<!--  beforeDestroy () {-->
<!--    window.removeEventListener('mouseup', this.onMouseup)-->
<!--    window.removeEventListener('keydown', this.onkeydown)-->
<!--    window.removeEventListener('keyup', this.onkeyup)-->
<!--  },-->

<!--  data () {-->
<!--    return {-->
<!--      points: [],-->
<!--      x: 0,-->
<!--      y: 0,-->
<!--      boxStyle: {-->
<!--        top: 0,-->
<!--        left: 0,-->
<!--        width: 0,-->
<!--        height: 0-->
<!--      },-->
<!--      onmousemove: debounce(this.moveHandler, 5),-->
<!--      show: false-->
<!--    }-->
<!--  },-->

<!--  methods: {-->
<!--    onInput (value) {-->
<!--      if (this.shiftKey) {-->
<!--        console.log(this.shiftKey)-->
<!--        value = value.pop()-->
<!--        const index = this.options.findIndex(item => item.value === value)-->
<!--        let i = index - 1-->
<!--        while (i > 0) {-->
<!--          const { value } = this.options[i]-->
<!--          if (this.value && this.value.includes(value)) break-->
<!--          i&#45;&#45;-->
<!--        }-->
<!--        i = Math.max(0, i)-->
<!--        value = this.options.slice(i, index + 1).map(item => item.value)-->
<!--      }-->
<!--      this.$emit('input', value)-->
<!--    },-->
<!--    onMousedown (e) {-->
<!--      const { top, left } = this.$refs.box.getBoundingClientRect()-->
<!--      this.rect = { top, left }-->
<!--      const x = e.pageX - left-->
<!--      const y = e.pageY - top-->
<!--      this.startPoint = { x, y }-->
<!--      this.x = x-->
<!--      this.y = y-->
<!--      this.boxStyle.left = x + 'px'-->
<!--      this.boxStyle.top = y + 'px'-->
<!--      this.begin = true-->
<!--      this.isMoved = false-->
<!--    },-->
<!--    moveHandler (e) {-->
<!--      if (!this.begin) return-->
<!--      this.isMoved = true-->
<!--      this.ctrlKey = e.ctrlKey-->
<!--      const { top, left } = this.$refs.box.getBoundingClientRect()-->
<!--      this.rect = { top, left }-->
<!--      const x = e.pageX - left-->
<!--      const y = e.pageY - top-->
<!--      if (Math.abs(this.x - x) < 10 && Math.abs(this.y - y) < 10) return-->
<!--      this.show = true-->
<!--      if (x < this.x) {-->
<!--        this.boxStyle.left = x + 'px'-->
<!--        this.boxStyle.width = (this.x - x) + 'px'-->
<!--      } else {-->
<!--        this.boxStyle.width = (x - this.x) + 'px'-->
<!--      }-->
<!--      if (y < this.y) {-->
<!--        this.boxStyle.top = y + 'px'-->
<!--        this.boxStyle.height = (this.y - y) + 'px'-->
<!--      } else {-->
<!--        this.boxStyle.height = (y - this.y) + 'px'-->
<!--      }-->
<!--      this.endPoint = { x, y }-->
<!--    },-->
<!--    onMouseup () {-->
<!--      this.begin = this.show = false-->
<!--      if (!this.isMoved) return-->
<!--      this.setChoiceItem()-->
<!--      this.ctrlKey = false-->
<!--      this.startPoint = this.endPoint = null-->
<!--      this.boxStyle.top = this.boxStyle.left = this.boxStyle.width = this.boxStyle.height = 0-->
<!--    },-->
<!--    collide (rect1, rect2) {-->
<!--      if (!rect1 || !rect2) return false-->
<!--      const x1 = Math.max(rect1.x + rect1.width, rect2.x + rect2.width)-->
<!--      const x = Math.min(rect1.x, rect2.x)-->
<!--      const y1 = Math.max(rect1.y + rect1.height, rect2.y + rect2.height)-->
<!--      const y = Math.min(rect1.y, rect2.y)-->
<!--      return x1 - x <= rect1.width + rect2.width && y1 - y <= rect1.height + rect2.height-->
<!--    },-->
<!--    setChoiceItem () {-->
<!--      const st = this.startPoint-->
<!--      const ed = this.endPoint-->
<!--      if (!st || !ed) return-->
<!--      const width = Math.abs(st.x - ed.x)-->
<!--      const height = Math.abs(st.y - ed.y)-->
<!--      if (width < 5 && height < 5) return-->
<!--      const rect = {-->
<!--        x: Math.min(st.x, ed.x),-->
<!--        y: Math.min(st.y, ed.y),-->
<!--        width,-->
<!--        height-->
<!--      }-->
<!--      const result = [].concat(this.ctrlKey && Array.isArray(this.value) ? this.value : [])-->
<!--      for (const item of this.points) {-->
<!--        if (this.collide(item, rect)) {-->
<!--          const index = result.indexOf(item.value)-->
<!--          if (index >= 0) {-->
<!--            result.splice(index, 1)-->
<!--          } else {-->
<!--            result.push(item.value)-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--      this.$emit('input', result)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--  .checkbox-selection {-->
<!--    position: relative;-->
<!--    border: 1px solid #ccc;-->
<!--  }-->
<!--  .checkbox-selection__area {-->
<!--    position: absolute;-->
<!--    border: 1px dashed #e7e7e7;-->
<!--    background-color: #409efe;-->
<!--    opacity: 0.4;-->
<!--    z-index: 9999;-->
<!--  }-->
<!--</style>-->
