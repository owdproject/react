/**
 * @owdproject/react
 * Official React 18/19 reactive adapter for @owdproject/core using useSyncExternalStore.
 */

import { useSyncExternalStore, useCallback } from 'react'
import {
  DesktopPointerSession,
  type Desktop,
  type DesktopSnapshot,
  type WindowManager,
  type WindowInstance,
  type WindowState,
  type WindowBounds,
  type DesktopWorkareaRect,
  type SnapZoneHint,
  type ResizeDirection,
} from '@owdproject/core'

export * from '@owdproject/core'

export function useDesktop(desktop: Desktop): DesktopSnapshot & { desktop: Desktop } {
  const subscribe = useCallback(
    (onStoreChange: () => void) => desktop.subscribe(onStoreChange),
    [desktop],
  )
  const getSnapshot = useCallback(() => desktop.getSnapshot(), [desktop])
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  return {
    desktop,
    ...snapshot,
  }
}

export function useWindowManager(manager: WindowManager): {
  windows: WindowInstance[]
  focused: WindowInstance | undefined
  manager: WindowManager
} {
  const subscribe = useCallback(
    (onStoreChange: () => void) => manager.subscribe(onStoreChange),
    [manager],
  )
  const getSnapshot = useCallback(() => manager.getSnapshot(), [manager])
  const windows = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const focused = windows.find((w) => w.state.focused)

  return {
    windows,
    focused,
    manager,
  }
}

export function useWindowInstance(instance: WindowInstance): {
  state: WindowState
  instance: WindowInstance
} {
  const subscribe = useCallback(
    (onStoreChange: () => void) => instance.subscribe(onStoreChange),
    [instance],
  )
  const getSnapshot = useCallback(() => instance.getSnapshot(), [instance])
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  return {
    state,
    instance,
  }
}

export interface ReactDesktopDragOptions {
  getBounds: () => WindowBounds
  getWorkarea?: () => DesktopWorkareaRect | undefined
  onStart?: () => void
  onMove?: (bounds: WindowBounds, snapZone: SnapZoneHint | null) => void
  onEnd?: (finalBounds: WindowBounds, snapZone: SnapZoneHint | null) => void
  onCancel?: () => void
}

export function useDesktopDrag(options: ReactDesktopDragOptions) {
  const startDrag = useCallback(
    (event: PointerEvent) => {
      return DesktopPointerSession.startDrag(event, {
        initialBounds: options.getBounds(),
        workarea: options.getWorkarea?.(),
        onStart: options.onStart,
        onMove: options.onMove,
        onEnd: options.onEnd,
        onCancel: options.onCancel,
      })
    },
    [options],
  )

  return { startDrag }
}

export interface ReactDesktopResizeOptions {
  getBounds: () => WindowBounds
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  onStart?: () => void
  onMove?: (bounds: WindowBounds) => void
  onEnd?: (finalBounds: WindowBounds) => void
  onCancel?: () => void
}

export function useDesktopResize(options: ReactDesktopResizeOptions) {
  const startResize = useCallback(
    (event: PointerEvent, direction: ResizeDirection) => {
      return DesktopPointerSession.startResize(event, {
        direction,
        initialBounds: options.getBounds(),
        minWidth: options.minWidth,
        minHeight: options.minHeight,
        maxWidth: options.maxWidth,
        maxHeight: options.maxHeight,
        onStart: options.onStart,
        onMove: options.onMove,
        onEnd: options.onEnd,
        onCancel: options.onCancel,
      })
    },
    [options],
  )

  return { startResize }
}
