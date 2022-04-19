<template>
  <div :class="[ns.b(), ns.m(type)]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@element-plus/hooks'
import { textProps } from './text'

defineOptions({
  name: 'ElLink',
})
const props = defineProps(textProps)

const ns = useNamespace('text')
</script>
