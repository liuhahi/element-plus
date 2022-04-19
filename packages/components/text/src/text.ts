import { buildProps } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'
import type Text from './text.vue'

export const textProps = buildProps({
  type: {
    type: String,
    values: ['h1', 'h2', 'h3', 'default'],
    default: 'default',
  },
} as const)
export type TextProps = ExtractPropTypes<typeof textProps>

export const textEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type TextEmits = typeof textEmits

export type TextInstance = InstanceType<typeof Text>
