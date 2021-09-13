<template>
  <span>{{ text }}</span>
</template>

<script>
export default {
  name: 'ev-boolean',
  props: {
    value: {type: Boolean},
    trueText: {type: String, default: '是'},
    falseText: {type: String, default: '否'},
    nullText: {type: String, default: '否'},
  },
  computed: {
    text() {
      let text = '';
      if (typeof this.value !== 'undefined') {
        text = this.value ? this.trueText : this.falseText;
      } else {
        text = this.nullText
      }

      return text;
    }
  }
}
</script>
