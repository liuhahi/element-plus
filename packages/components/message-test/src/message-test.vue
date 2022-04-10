<template>
  <div>
    <slot />
    test...
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElMessageTest',
  props: {},
  setup(props) {
    // init here
  },
})
</script>
<style></style>
