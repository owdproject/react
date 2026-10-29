<div align="center">

  <h1>@owdproject/react</h1>

  <p>
    <strong>Official React 18 & 19 Adapter for Open Web Desktop.</strong><br /><br />
    Concurrent-safe <code>useSyncExternalStore</code> hooks and pointer drag/resize<br />
    bindings powered by <code>@owdproject/core</code>.
  </p>

  <br />

  <p>
    <a href="https://npmjs.com/package/@owdproject/react"><img src="https://img.shields.io/npm/v/@owdproject/react/alpha.svg?style=flat&colorA=020420&colorB=00DC82" alt="npm version" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-020420?logo=react" alt="React" /></a>
    <a href="https://github.com/owdproject/core/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-00DC82.svg?style=flat&colorA=020420&colorB=00DC82" alt="License" /></a>
  </p>

</div>

---

## Overview

`@owdproject/react` (`4.0.0-alpha.0`) connects [`@owdproject/core`](https://npmjs.com/package/@owdproject/core)'s frozen immutable snapshots (`Object.freeze`) directly to React 18/19 `useSyncExternalStore` with zero state tearing.

---

## Quick Start

```bash
pnpm add @owdproject/core@4.0.0-alpha.0 @owdproject/react@4.0.0-alpha.0
```

```tsx
import { createDesktop, useDesktop, useWindowInstance, useDesktopDrag } from '@owdproject/react'

const desktop = createDesktop()

export function DesktopShell() {
  const { windows, focusedWindow } = useDesktop(desktop)
  return (
    <div>
      {windows.map((win) => (
        <div key={win.id}>{win.config.title}</div>
      ))}
    </div>
  )
}
```

---

## Exported Hooks

| Hook | Description |
| :--- | :--- |
| **`useDesktop(instanceOrOptions?)`** | Subscribes to a `Desktop` instance via `useSyncExternalStore`. |
| **`useWindowManager(manager?)`** | Subscribes to `WindowManager` window lists and focus state. |
| **`useWindowInstance(instance)`** | Subscribes to an individual `WindowInstance` actor. |
| **`useDesktopDrag(options)`** | Returns `{ isDragging, activeSnapZone, startDrag, cancelDrag }`. |
| **`useDesktopResize(options)`** | Returns `{ isResizing, startResize, cancelResize }`. |

---

## License

[MIT](https://opensource.org/licenses/MIT)
