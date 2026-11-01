# @owdproject/react — agent entry point

This repository owns React bindings to the framework-independent engine. Core's AGENTS.md does not automatically apply to adapter or extension repositories.

- Read [the integration contract](docs/integration-contract.md). React extension repositories need their own AGENTS.md linking to `https://github.com/owdproject/react/blob/main/docs/integration-contract.md` (or the supported release revision) and listing their own integration requirements.
- Consult the engine's [behavioral contract](https://github.com/owdproject/core/blob/main/docs/behavioral-contract.md) for shared primitives; do not claim full parity with Nuxt's controllers.
- Keep React hooks/components here and engine behavior in `@owdproject/core`. Use React tooling for this layer; Nuxt module metadata/loading is not a React runtime API.
- Extension names are `@owdproject/react-{app,module,kit,theme}-*`. The engine and adapter are not extensions. No deprecated unscoped `nuxt-desktop` dependencies/imports; the scoped Nuxt distribution is allowed for Nuxt hosts, not required by React.
- Themes own visuals and shell composition; require no universal tokens or OS layout. Preserve existing changes, verify supported exports and use local verification without public npm publication.
