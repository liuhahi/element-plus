import { onMounted, ref, unref, watch } from 'vue'
import { isClient, unrefElement } from '@vueuse/core'
import { isNil } from 'lodash-unified'
import { arrow as arrowCore, computePosition } from '@floating-ui/dom'

import { buildProps } from '@element-plus/utils'

import type { Ref, ToRefs } from 'vue'
import type {
  ComputePositionReturn,
  Middleware,
  Placement,
  SideObject,
  Strategy,
  VirtualElement,
} from '@floating-ui/dom'

export const useFloatingProps = buildProps({} as const)

export type UseFloatingProps = ToRefs<{
  middleware: Array<Middleware>
  placement: Placement
  strategy: Strategy
}>

type ElementRef = Parameters<typeof unrefElement>['0']

const unrefReference = (
  elRef: ElementRef | Ref<VirtualElement | undefined>
) => {
  if (!isClient) return
  if (!elRef) return elRef
  const unrefEl = unrefElement(elRef as ElementRef)
  if (unrefEl) return unrefEl
  return elRef as VirtualElement
}

export const getPositionDataWithUnit = <T extends Record<string, number>>(
  record: T | undefined,
  key: keyof T
) => {
  const value = record?.[key]
  return isNil(value) ? '' : `${value}px`
}

export const useFloating = ({
  middleware,
  placement,
  strategy,
}: UseFloatingProps) => {
  const referenceRef = ref<HTMLElement | VirtualElement>()
  const contentRef = ref<HTMLElement>()
  const x = ref<string>()
  const y = ref<string>()
  const middlewareData = ref<ComputePositionReturn['middlewareData']>({})

  const states = {
    x,
    y,
    placement,
    strategy,
    middlewareData,
  } as const

  const update = async () => {
    if (!isClient) return

    const referenceEl = unrefReference(referenceRef)
    const contentEl = unrefElement(contentRef)

    if (!referenceEl || !contentEl) return

    const data = await computePosition(referenceEl, contentEl, {
      placement: unref(placement),
      strategy: unref(strategy),
      middleware: unref(middleware),
    })

    ;['x', 'y'].forEach(
      (key) => (data[key] = getPositionDataWithUnit(data as any, key))
    )

    Object.keys(states).forEach((key) => {
      states[key].value = data[key]
    })
  }

  watch(referenceRef, () => update())

  watch(contentRef, () => update())

  onMounted(() => update())

  return {
    ...states,
    update,
    referenceRef,
    contentRef,
  }
}

export type ArrowMiddlewareProps = {
  arrowRef: Ref<HTMLElement | undefined>
  padding?: number | SideObject
}

export const arrowMiddleware = ({
  arrowRef,
  padding,
}: ArrowMiddlewareProps): Middleware => {
  return {
    name: 'arrow',
    options: {
      element: arrowRef,
      padding,
    },

    fn(args) {
      const arrowEl = unref(arrowRef)
      if (!arrowEl) return {}

      return arrowCore({
        element: arrowEl,
        padding,
      }).fn(args)
    },
  }
}
