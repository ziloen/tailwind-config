import type { Config } from 'tailwindcss'
import type { default as createPlugin } from 'tailwindcss/plugin'

export type PluginFn = Parameters<typeof createPlugin>[0]
export type PluginAPI = Parameters<PluginFn>[0]
export type PluginWithConfig = {
  handler: PluginFn
  config?: Config
  /** @internal */
  reference?: boolean
}