import { createElement, type ComponentType } from 'react'
import type {
  ApplicationConfig,
  ApplicationInstance,
  Desktop,
  WindowConfig,
  WindowInstance,
} from '@owdproject/core'

/** Runtime props shared by React application windows, independently of a theme. */
export interface ReactApplicationWindowProps {
  desktop: Desktop
  window: WindowInstance
  application: ApplicationInstance
  /** Closes through the owning application, including its cancellable hooks. */
  close: () => Promise<boolean>
}

export interface ReactApplicationWindowConfig extends Omit<WindowConfig, 'component'> {
  component: ComponentType<ReactApplicationWindowProps>
}

export interface ReactApplicationConfig extends Omit<ApplicationConfig, 'windows'> {
  windows?: Record<string, ReactApplicationWindowConfig>
}

/** Registration and launch retain the engine's lifecycle and singleton behavior. */
export function registerReactApplication(desktop: Desktop, config: ReactApplicationConfig): ApplicationInstance {
  return desktop.applications.register(config)
}

export async function closeReactApplicationWindow(desktop: Desktop, window: WindowInstance): Promise<boolean> {
  const application = window.applicationId ? desktop.applications.get(window.applicationId) : undefined
  return application ? application.closeWindow(window.id) : desktop.windows.closeWindow(window.id)
}

/** Render the component from this window's registered model, without a theme app catalog. */
export function ReactApplicationWindow({ desktop, window }: { desktop: Desktop; window: WindowInstance }) {
  const application = window.applicationId ? desktop.applications.get(window.applicationId) : undefined
  const Component = window.config.component as ComponentType<ReactApplicationWindowProps> | undefined
  if (!application || !Component) return null

  return createElement(Component, {
    desktop,
    window,
    application,
    close: () => closeReactApplicationWindow(desktop, window),
  })
}
