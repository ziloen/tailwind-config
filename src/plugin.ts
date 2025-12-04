/* eslint-disable @typescript-eslint/unbound-method */
import type { PluginAPI } from 'tailwindcss/plugin'

export default function pluginCreator({
  addUtilities,
  matchUtilities,
  matchVariant,
  theme,
}: PluginAPI): void {
  addUtilities({
    '.border-t-solid': {
      'border-top-style': 'solid',
    },
    '.border-r-solid': {
      'border-right-style': 'solid',
    },
    '.border-b-solid': {
      'border-bottom-style': 'solid',
    },
    '.border-l-solid': {
      'border-left-style': 'solid',
    },
    '.boder-x-solid': {
      'border-inline-style': 'solid',
    },
    '.boder-y-solid': {
      'border-block-style': 'solid',
    },
    '.border-s-solid': {
      'border-inline-start-style': 'solid',
    },
    '.border-e-solid': {
      'border-inline-end-style': 'solid',
    },

    '.divide-x-solid': {
      '& > :not([hidden]) ~ :not([hidden])': {
        'border-inline-style': 'solid'
      }
    },
    '.divide-y-solid': {
      '& > :not([hidden]) ~ :not([hidden])': {
        'border-block-style': 'solid'
      }
    },

    // https://github.com/w3c/csswg-drafts/issues/1724
    '.bg-gradient-to-start': {
      'background-image': 'linear-gradient(to left, var(--tw-gradient-stops))',

      ['&:where([dir="rtl"], [dir="rtl"] *)']: {
        'background-image': 'linear-gradient(to right, var(--tw-gradient-stops))'
      }
    },
    '.bg-gradient-to-end': {
      'background-image': 'linear-gradient(to right, var(--tw-gradient-stops))',

      ['&:where([dir="rtl"], [dir="rtl"] *)']: {
        'background-image': 'linear-gradient(to left, var(--tw-gradient-stops))'
      }
    },
  })

  // TODO: use v4 syntax
  // https://github.com/w3c/csswg-drafts/issues/1544
  matchUtilities({
    'translate-inline-flow': (value: string) => ({
      '@defaults transform': {},
      '--tw-translate-x': value,
      transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',

      "&:where([dir='rtl'], [dir='rtl'] *)": {
        '--tw-translate-x': `calc(${value} * -1)`,
      }
    }),
  }, {
    type: 'length',
    supportsNegativeValues: true,
    values: theme('translate') as Record<string, string>
  })



  // matchUtilities(
  //   {
  //     "bg-grid": (value: string) => ({
  //       backgroundImage: `url("${svgToDataUri(
  //         `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
  //       )}")`,
  //     }),
  //     "bg-checkerboard": (value: string) => ({
  //       backgroundImage: `url("${svgToDataUri(
  //         `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><path fill="${value}" stroke="none" d="M0 0h16v32h16v-16h-32z"/><path fill="#fff" stroke="none" d="M0 32h16v-32h16v16h-32z"/></svg>`
  //       )}")`,
  //     })
  //   },
  //   { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
  // )

  matchVariant('neighbors-nth', (value) => {
    const n = Number(value)
    if (Number.isNaN(n) || n <= 0) return ''

    return `&${' + *'.repeat(n)}, :has(${'+ * '.repeat(n - 1)}+ &)`
  }, {
    values: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
    }
  })
}