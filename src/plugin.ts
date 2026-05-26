/* eslint-disable @typescript-eslint/unbound-method */
import type { PluginAPI } from 'tailwindcss/plugin'

export default function pluginCreator({
  addUtilities,
  matchUtilities,
  matchVariant,
  theme,
}: PluginAPI): void {
  addUtilities({
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

  // FIXME: Not working in v4
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

  matchUtilities({
    'filter-change-color': (value: string) => ({
      filter: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="f"><feFlood flood-color="${encodeURIComponent(value)}" result="f"/><feComposite in="f" in2="SourceGraphic" operator="in"/></filter></svg>#f')`
    })
  }, {
    type: 'color',
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

function svgToDataUri(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(collapseWhitespace(svg))}`
}

function collapseWhitespace(str: string) {
  return str.trim().replace(/\s+/g, ' ')
}