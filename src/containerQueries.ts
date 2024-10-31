import type { Config, PluginCreator } from 'tailwindcss/types/config'

function parseValue(value: string) {
  const [, operator, numericValue] = value.match(/^([><]=?)?((?:\d+\.\d+|\d+|\.\d+)[a-zA-Z]+)$/) ?? []
  if (!numericValue) return null

  return [operator, numericValue]
}

export const containerQueries: { handler: PluginCreator; config?: Partial<Config> } = {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  handler: ({ matchUtilities, matchVariant, theme }) => {
    const values: Record<string, string> = theme('containers') ?? {}

    matchUtilities(
      {
        '@container': (value, { modifier }) => {
          return {
            'container-type': value,
            'container-name': modifier,
          }
        },
      },
      {
        values: {
          DEFAULT: 'inline-size',
          normal: 'normal',
        },
        modifiers: 'any',
      }
    )

    // TODO: Add support for multiple conditions e.g. `@[>=900px<1200px]`
    matchVariant(
      '@',
      (value, { modifier }) => {
        const [operator = '>=', parsed] = parseValue(value || '') ?? []

        if (!parsed) return []

        return `@container ${modifier ? `${modifier} ` : ''}(width ${operator} ${parsed})`
      },
      {
        values,
        sort(aVariant, zVariant) {
          const a = parseFloat(aVariant.value)
          const z = parseFloat(zVariant.value)

          if (a === null || z === null) return 0

          // Sort values themselves regardless of unit
          if (a - z !== 0) return a - z

          const aLabel = aVariant.modifier ?? ''
          const zLabel = zVariant.modifier ?? ''

          // Explicitly move empty labels to the end
          if (aLabel === '' && zLabel !== '') {
            return 1
          } else if (aLabel !== '' && zLabel === '') {
            return -1
          }

          // Sort labels alphabetically in the English locale
          // We are intentionally overriding the locale because we do not want the sort to
          // be affected by the machine's locale (be it a developer or CI environment)
          return aLabel.localeCompare(zLabel, 'en', { numeric: true })
        },
      }
    )
  },
  config: {
    theme: {
      containers: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
      },
    },
  }
}


