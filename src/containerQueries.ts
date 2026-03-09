/* eslint-disable @typescript-eslint/unbound-method */
import type { PluginAPI } from 'tailwindcss/plugin'

function parseValue(value: string): [string, string] | null {
  const [, operator, numericValue] = value.match(/^([><]=?)?((?:\d+\.\d+|\d+|\.\d+)[a-zA-Z]+)$/) ?? []
  if (!numericValue) return null

  return [operator, numericValue]
}

export default function containerQueries({ matchVariant }: PluginAPI): void {
  // TODO: Add support for multiple conditions e.g. `@[>=900px,<1200px]`
  // TODO: Add support for calc() e.g. `@[>=calc(900px+1rem)]`
  matchVariant(
    '@',
    (value, { modifier }) => {
      const [operator = '>=', parsed] = parseValue(value || '') ?? []

      if (!parsed) return []

      return `@container ${modifier ? `${modifier} ` : ''}(width ${operator} ${parsed})`
    },
  )
}

