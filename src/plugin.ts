/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import type { PluginAPI } from './types'

export default function pluginCreator({
  addUtilities,
  addVariant,
  matchUtilities,
  theme,
}: PluginAPI): void {
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

    // line-break
    '.line-break-normal': {
      'line-break': 'normal',
    },
    '.line-break-auto': {
      'line-break': 'auto',
    },
    '.line-break-loose': {
      'line-break': 'loose',
    },
    '.line-break-strict': {
      'line-break': 'strict',
    },
    '.line-break-anywhere': {
      'line-break': 'anywhere',
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
    // TODO: remove in v4
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

    '.border-1': {
      'border-width': '1px',
    },
    '.border-t-1': {
      'border-top-width': '1px',
    },
    '.border-r-1': {
      'border-right-width': '1px',
    },
    '.border-b-1': {
      'border-bottom-width': '1px',
    },
    '.border-l-1': {
      'border-left-width': '1px',
    },
    '.border-x-1': {
      'border-left-width': '1px',
      'border-right-width': '1px',
    },
    '.border-y-1': {
      'border-top-width': '1px',
      'border-bottom-width': '1px',
    },
    '.border-s-1': {
      'border-inline-start-width': '1px',
    },
    '.border-e-1': {
      'border-inline-end-width': '1px',
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
    'text-stroke': (value: string) => ({
      '-webkit-text-stroke-width': value,
    })
  }, {
    type: 'length',
    values: theme('borderWidth') as Record<string, string>
  })

  // FIXME: No color decorator
  matchUtilities({
    'text-stroke': (value) => {
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

  matchUtilities({
    'min-size': (value: string) => ({
      'min-height': value,
      'min-width': value,
    })
  }, {
    type: 'length',
    values: theme('spacing') as Record<string, string>
  })

  matchUtilities({
    'max-size': (value: string) => ({
      'max-height': value,
      'max-width': value,
    })
  }, {
    type: 'length',
    values: theme('spacing') as Record<string, string>
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