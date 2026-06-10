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

  // ================================================
  // Sibling variants using :nth-child() technique
  // Ref: https://chriskirknielsen.com/blog/nth-next-sibling-no-need/
  //
  //  | = target   # = styled siblings   . = unaffected
  //
  //  preceding           #####|.....   ALL before
  //  preceding-3         ..###|.....   first 3 before
  //  preceding-nth-2     ...#.|.....   2nd before
  //
  //  following           .....|#####   ALL after
  //  following-3         .....|###..   first 3 after
  //  following-nth-2     .....|.#...   2nd after
  //
  //  neighbors-2         ...##|##...   2 before + 2 after
  //  neighbors-nth-2     ...#.|.#...   2nd before + 2nd after
  // ================================================

  // preceding-N: first N siblings BEFORE the target
  // DEFAULT (no value): ALL siblings BEFORE the target
  matchVariant('preceding', (value) => {
    // DEFAULT: handle preceding:utility (ALL before)
    if (value === 'all') return ':has(~ &)'

    const n = Number(value)
    if (!Number.isInteger(n) || n <= 0) return ''

    if (n === 1) return ':has(+ &)'

    return `:nth-last-child(-n + ${n} of :has(~ &))`
  }, {
    values: {
      DEFAULT: 'all',
      1: '1', 2: '2', 3: '3',
    }
  })

  // preceding-nth-N: the Nth sibling BEFORE the target
  matchVariant('preceding-nth', (value) => {
    const n = Number(value)
    if (!Number.isInteger(n) || n <= 0) return ''
    if (n === 1) return ':has(+ &)'

    return `:nth-last-child(${n} of :has(~ &))`
  }, {
    values: {
      1: '1', 2: '2', 3: '3',
    }
  })

  // following-N: first N siblings AFTER the target
  // DEFAULT (no value): ALL siblings AFTER the target
  matchVariant('following', (value) => {
    // DEFAULT: handle following:utility (ALL after)
    if (value === 'all') return '& ~ *'

    const n = Number(value)
    if (!Number.isInteger(n) || n <= 0) return ''

    if (n === 1) return '& + *'

    return `:nth-child(-n + ${n} of & ~ *)`
  }, {
    values: {
      DEFAULT: 'all',
      1: '1', 2: '2', 3: '3',
    }
  })

  // following-nth-N: the Nth sibling AFTER the target
  matchVariant('following-nth', (value) => {
    const n = Number(value)
    if (!Number.isInteger(n) || n <= 0) return ''
    if (n === 1) return '& + *'

    return `:nth-child(${n} of & ~ *)`
  }, {
    values: {
      1: '1',
      2: '2',
      3: '3',
    }
  })

  // neighbors-N: N siblings BEFORE + N siblings AFTER the target
  // DEFAULT (no value): ALL siblings
  matchVariant('neighbors', (value) => {
    if (value === 'all') return [':has(~ &)', '& ~ *']

    const n = Number(value)
    if (!Number.isInteger(n) || n <= 0) return ''
    if (n === 1) return [':has(+ &)', '& + *']

    return [
      `:nth-child(-n + ${n} of & ~ *)`,
      `:nth-last-child(-n + ${n} of :has(~ &))`
    ]
  }, {
    values: {
      DEFAULT: 'all',
      1: '1',
      2: '2',
      3: '3',
    }
  })

  // neighbors-nth-N: the Nth sibling BEFORE + AFTER the target
  matchVariant('neighbors-nth', (value) => {
    const n = Number(value)
    if (!Number.isInteger(n) || n <= 0) return ''
    if (n === 1) return [':has(~ &)', '& + *']

    return [
      `:nth-child(${n} of & ~ *)`,
      `:nth-last-child(${n} of :has(~ &))`
    ]
  }, {
    values: {
      1: '1', 2: '2', 3: '3',
    }
  })
}

function svgToDataUri(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(collapseWhitespace(svg))}`
}

function collapseWhitespace(str: string) {
  return str.trim().replace(/\s+/g, ' ')
}