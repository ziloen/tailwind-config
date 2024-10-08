/* eslint-disable @typescript-eslint/unbound-method */
import type { Config, PluginAPI, PresetsConfig } from 'tailwindcss/types/config'
import { containerQueries } from './containerQueries'

export { containerQueries } from './containerQueries'


export function pluginCreator({
  addBase,
  addComponents,
  addUtilities,
  addVariant,
  matchComponents,
  matchUtilities,
  matchVariant,
  theme,
}: PluginAPI) {
  // TODO: v4 use `staticUtility`
  addUtilities({
    // Flex
    '.flex-center': {
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
    },
    '.inline-flex-center': {
      display: 'inline-flex',
      'justify-content': 'center',
      'align-items': 'center',
    },
    '.flex-justify': {
      display: 'flex',
      'justify-content': 'center',
    },
    '.flex-align': {
      display: 'flex',
      'align-items': 'center',
    },
    '.flex-between': {
      display: 'flex',
      'justify-content': 'space-between',
    },

    // Scrollbar
    '.scrollbar-none': {
      'scrollbar-width': 'none',

      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    '.scrollbar-hidden': {
      'scrollbar-width': 'none',

      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    '.scrollbar-thin': {
      'scrollbar-width': 'thin',
    },
    '.scrollbar-gutter-auto': {
      'scrollbar-gutter': 'auto'
    },
    '.scrollbar-gutter-stable': {
      'scrollbar-gutter': 'stable'
    },
    '.scrollbar-gutter-both': {
      'scrollbar-gutter': 'stable both-edges'
    },


    // Leading trim simulate
    // text-box-trim: both;
    // https://www.w3.org/TR/css-inline-3/#leading-trim
    // https://www.w3.org/TR/css-inline-3/#text-box-edges
    // https://caniuse.com/css-text-box-trim
    // (1lh - 1em) / 2 * -1
    '.leading-trim-both': {
      '@supports (text-box-trim: both)': {
        'text-box-trim': 'both'
      },
      '@supports not (text-box-trim: both)': {
        'margin-block': 'calc(0.5em - 0.5lh)',
      }
    },
    // '.leading-trim-start': {
    //   'margin-block-start': 'calc(0.5em - 0.5lh)',
    // },
    // '.leading-trim-end': {
    //   'margin-block-end': 'calc(0.5em - 0.5lh)',
    // },

    // https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content#safe
    '.justify-safe-center': {
      'justify-content': 'safe center',
    },
    '.justify-safe-start': {
      'justify-content': 'safe start',
    },
    '.justify-safe-end': {
      'justify-content': 'safe end',
    },

    '.resizable': {
      resize: 'both',
      overflow: 'hidden',
    },
    '.resizable-x': {
      resize: 'horizontal',
      overflow: 'hidden'
    },
    '.resizable-y': {
      resize: 'vertical',
      overflow: 'hidden'
    },

    // Writing mode
    '.writing-vertical-rl': {
      'writing-mode': 'vertical-rl',
    },
    '.writing-vertical-lr': {
      'writing-mode': 'vertical-lr',
    },
    '.writing-horizontal-tb': {
      'writing-mode': 'horizontal-tb',
    },
    '.writing-sideways-rl': {
      'writing-mode': 'sideways-rl',
    },
    '.writing-sideways-lr': {
      'writing-mode': 'sideways-lr',
    },

    // overflow-anchor
    '.overflow-anchor-none': {
      'overflow-anchor': 'none',
    },
    '.overflow-anchor-auto': {
      'overflow-anchor': 'auto',
    },

    // Modern way to create block formatting context
    '.clear-fix': {
      display: 'flow-root',
    },



    // Extends tailwindcss default utility classes
    '.basis-max': {
      'flex-basis': 'max-content',
    },
    '.basis-min': {
      'flex-basis': 'min-content',
    },
    '.basis-fit': {
      'flex-basis': 'fit-content',
    },

    // In the default config, `outline` represents `outline-style: solid`, but `border` represents `border-width: 1px`, which is confusing
    '.outline-solid': {
      'outline-style': 'solid',
    },

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
      'border-left-style': 'solid',
      'border-right-style': 'solid',
    },
    '.boder-y-solid': {
      'border-top-style': 'solid',
      'border-bottom-style': 'solid',
    },

    '.h-stretch': {
      height: 'stretch'
    },
    '.w-stretch': {
      width: 'stretch'
    },
    '.size-stretch': {
      width: 'stretch',
      height: 'stretch'
    },

    // https://github.com/w3c/csswg-drafts/issues/1724
    '.bg-gradient-to-start': {
      'background-image': 'linear-gradient(to left, var(--tw-gradient-stops))',

      [`&:where([dir="rtl"], [dir="rtl"] *)`]: {
        'background-image': 'linear-gradient(to right, var(--tw-gradient-stops))'
      }
    },
    '.bg-gradient-to-end': {
      'background-image': 'linear-gradient(to right, var(--tw-gradient-stops))',

      [`&:where([dir="rtl"], [dir="rtl"] *)`]: {
        'background-image': 'linear-gradient(to left, var(--tw-gradient-stops))'
      }
    },
  })

  matchUtilities({
    'text-stroke': (value: string, { modifier }) => ({
      '-webkit-text-stroke-width': value,
    })
  }, {
    type: 'length',
    values: theme('borderWidth')
  })

  // FIXME: No color decorator
  matchUtilities({
    'text-stroke': (value, { modifier }) => {
      // return withAlphaVariable({
      //   color: value,
      //   property: '-webkit-text-stroke-color',
      //   variable: '--tw-text-stroke-color',
      // })

      return {
        '-webkit-text-stroke-color': value,
      }
    }
  }, {
    type: ['color', 'any'],
    values: flattenColorPalette(theme('colors')),
  })


  // TODO: use v4 syntax
  // https://github.com/w3c/csswg-drafts/issues/1544
  matchUtilities({
    'translate-inline-flow': (value: string, { modifier }) => ({
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
    values: theme('translate')
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

  // Webkit scrollbar pseudo
  addVariant('webkit-scrollbar', '&::-webkit-scrollbar')
  addVariant('webkit-scrollbar-thumb', '&::-webkit-scrollbar-thumb')
  addVariant('webkit-scrollbar-track', '&::-webkit-scrollbar-track')
  addVariant('webkit-scrollbar-track-piece', '&::-webkit-scrollbar-track-piece')
  addVariant('webkit-scrollbar-button', '&::-webkit-scrollbar-button')
  // addVariant('display-mode-fullscreen', '@media (display-mode: fullscreen)')

  // combine multiple variants
  addVariant('hover-focus', ['&:hover', '&:focus'])
  addVariant('hover-active', ['&:hover', '&:active'])
}

export const preset = {
  theme: {
    colors: {
      // Default colors
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',

      // Custom colors
      // https://mozilla.design/firefox/#color
      green: {
        50: '#e3fff3',
        100: '#D0FFED',
        200: '#B3FFE3',
        300: '#88FFD1',
        400: '#53FEBE',
        500: '#3fe1b0',
        600: '#2BC4A2',
        700: '#068989',
        800: '#005E5D',
        900: '#083F37',
      },
      blue: {
        50: '#ACF1FF',
        100: '#80EAFF',
        200: '#00DDFF',
        300: '#00B3F5',
        400: '#0290EE',
        500: '#0060E0',
        600: '#0250BC',
        700: '#063F96',
        800: '#073072',
        900: '#0A214D',
      },
      violet: {
        50: '#E6DFFF',
        100: '#D9BFFF',
        200: '#CC9EFF',
        300: '#C588FF',
        400: '#AC71FF',
        500: '#9059FF',
        600: '#7543E3',
        700: '#582ACB',
        800: '#46278E',
        900: '#321C64',
      },
      purple: {
        50: '#f7e3ff',
        100: '#F6B9FF',
        200: '#F690FF',
        300: '#F564FF',
        400: '#D64CF1',
        500: '#B933E1',
        600: '#962BB9',
        700: '#712290',
        800: '#4D1A69',
        900: '#2B1141',
      },
      pink: {
        50: '#FFDFF0',
        100: '#FFB4DB',
        200: '#FF8AC6',
        300: '#FF6BBB',
        400: '#FE4AA3',
        500: '#FF2A8A',
        600: '#E11586',
        700: '#C60184',
        800: '#7F165B',
        900: '#50134C',
      },
      red: {
        50: '#FFE0E8',
        100: '#FFBEC6',
        200: '#FF9AA2',
        300: '#FF848C',
        400: '#FF6A75',
        500: '#FF505F',
        600: '#E02950',
        700: '#C50143',
        800: '#800220',
        900: '#440307',
      },
      orange: {
        50: '#FFF4DE',
        100: '#FFD6B2',
        200: '#FFB588',
        300: '#FEA365',
        400: '#FE8A4F',
        500: '#FF7139',
        600: '#E25821',
        700: '#CD3D00',
        800: '#9D280C',
        900: '#7B1604',
      },
      yellow: {
        50: '#FFFFCD',
        100: '#FEFF95',
        200: '#FFEA7F',
        300: '#FFD567',
        400: '#FFBD4F',
        500: '#FFA537',
        600: '#E17F2E',
        700: '#C45A28',
        800: '#A7341F',
        900: '#960F18',
      },

      // https://protocol.mozilla.org/docs/fundamentals/color
      'light-gray': {
        50: '#ffffff',
        100: '#f9f9fb',
        200: '#f0f0f4',
        300: '#e0e0e6',
        400: '#cfcfd8',
        500: '#bfbfc9',
        600: '#afafba',
        700: '#9f9fad',
        800: '#8f8f9e',
        900: '#80808f',
      },
      'dark-gray': {
        50: '#5b5b66',
        100: '#52525e',
        200: '#4a4a55',
        300: '#42414d',
        400: '#3a3944',
        500: '#32313c',
        600: '#2b2a33',
        700: '#23222b',
        800: '#1c1b22',
        900: '#15141a',
      }
    },

    lineHeight: {
      none: '1',
    },

    zIndex: {
      auto: 'auto',
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      max: '2147483647',
    },

    extend: {
      supports: {
        'scrollbar-gutter': 'scrollbar-gutter: stable',
      },
    }
  },

  experimental: {
    // Remove unused global css variables, e.g. --tw-translate-x: 0;
    optimizeUniversalDefaults: true,

    // matchVariant: true,
  },

  /**
   * @satisfies {import("tailwindcss/types/config").PluginsConfig}
   */
  plugins: [pluginCreator, containerQueries],

  // https://tailwindcss.com/docs/theme#configuration-reference
  // https://github.com/tailwindlabs/tailwindcss/blob/main/src/corePlugins.js
  corePlugins: {},
} satisfies PresetsConfig

export type PresetTheme = typeof preset.theme

export function defineConfig<T extends Config>(config: T) {
  return config
}

// tailwindcss/lib/util/flattenColorPalette.js
function flattenColorPalette(colors: Record<string, unknown>): Record<string, string> {
  return Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) => {
      return typeof values === 'object'
        ? Object.entries(flattenColorPalette(values as Record<string, unknown>)).map(([number, hex]) => ({
          [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
        }))
        : [{ [color]: values }]
    })
  ) as Record<string, string>
}

function svgToDataUri(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(collapseWhitespace(svg))}`
}

function collapseWhitespace(str: string) {
  return str.trim().replace(/\s+/g, ' ')
}