# React integration contract

This contract applies to `@owdproject/react` and React host integrations. Engine behavior is described by the [core contract](https://github.com/owdproject/core/blob/main/docs/behavioral-contract.md); Nuxt registration and controllers have a separate [extension contract](https://github.com/owdproject/nuxt/blob/main/docs/extension-contract.md).

## Current adapter boundary

The adapter re-exports core and provides hooks subscribing to a supplied desktop, window manager or window instance using React's external-store API. Keep the supplied instance stable for the intended host lifetime; read the hook's actual returned shape rather than inferring it from Nuxt composables. See [src/index.ts:1](../src/index.ts#L1).

The same source exports pointer drag/resize bindings backed by core pointer sessions. Connect browser Pointer Events to those APIs, apply updates through supported engine actions, and use the documented cancellation/cleanup behavior of the installed adapter version. State flags and method names must be verified against its exports. See [src/index.ts](../src/index.ts).

`registerReactApplication` registers a React app config through the supplied desktop's application manager. Window models carry React components; `ReactApplicationWindow` renders the registered component with desktop, window, application and an application-aware close action. `closeReactApplicationWindow` uses the owning application's cancellable close path when present. See [src/applications.ts:10](../src/applications.ts#L10), [src/applications.ts:28](../src/applications.ts#L28), [src/applications.ts:32](../src/applications.ts#L32), [src/applications.ts:38](../src/applications.ts#L38).

The inspected entry points provide explicit registration and rendering helpers, rather than a Nuxt-style package/config installer or Vue shell. A host supplies desktop instances, rendering placement and service setup. Shared core primitives do not prove complete behavioral parity with Nuxt's controllers. See [src/index.ts](../src/index.ts), [src/applications.ts](../src/applications.ts).

## Extension responsibilities

| Kind and package convention | Owns | Required host agreement |
| --- | --- | --- |
| App: `@owdproject/react-app-*` | Identity, entries, commands, window content and resource cleanup | Register with `registerReactApplication` and provide React components in window models; the shell renders them via `ReactApplicationWindow`. |
| Theme: `@owdproject/react-theme-*` | Chrome, layout, accessibility, styles and shell controls | Render engine state and dispatch supported actions; document integration with the host renderer and workarea. |
| Module: `@owdproject/react-module-*` | Optional services, readiness, failures and teardown | Explicit service API, registration order and capability checks in the host. |
| Kit: `@owdproject/react-kit-*` | Shared UI/build tooling and dependency setup | Explicit installation, target React/adapter versions and required provider or style setup. |

These names express intended responsibility; they do not imply automatic discovery, a published loader or a standard React extension manifest. Nuxt's metadata assertion and build helpers must not be treated as React registration APIs.

Each integration must state compatible React, core and adapter versions, required versus optional capabilities and dependencies. Apps own cleanup of their effects, subscriptions and external resources. The host coordinates startup and shutdown; use the installed engine's real launch/window/termination APIs rather than assuming closing a window terminates every app resource.

Optional filesystem, persistence, authentication and network services must be explicitly supplied and checked. A kit or theme cannot assume another host installs its UI stack. Core's service registry can support an agreed protocol; it does not negotiate versions or grant access. See the [core service implementation](https://github.com/owdproject/core/blob/main/src/Desktop.ts#L149).

Themes are free to choose their visual language and shell structure. There are no compulsory tokens, taskbar, dock or OS layout. Keep business logic portable when useful; React components and providers still need the target host integration. Iframe apps require a bridge specifying protocol/version, allowed origins, capabilities and lifecycle cleanup.

## Verification and remaining work

Verify hooks and window actions against a standalone React host using the installed package exports and explicitly supplied services. Use local packs or Verdaccio snapshots for package integration, never a public npm release as a test. Reject the deprecated unscoped `nuxt-desktop` in the dependency graph.

Any common extension installer, automatic capability negotiation or cross-adapter parity is future work until implemented and verified. Repository guidance must travel through each adapter/extension's own entry point; package imports do not load another repository's AGENTS.md.
