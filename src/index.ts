import type { PluginAPI, PresetsConfig, Config } from "tailwindcss/types/config"
import containerQueries from "@tailwindcss/container-queries"

export function pluginCreator({ addUtilities, addVariant, matchUtilities, theme }: PluginAPI) {
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
    '.flex-column': {
      display: 'flex',
      'flex-direction': 'column',
    },

    // Scrollbar
    '.scrollbar-none': {
      'scrollbar-width': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    '.scrollbar-thin': {
      'scrollbar-width': 'thin',
    },

    // Leading trim simulate
    // text-box-trim: both;
    // https://caniuse.com/css-text-box-trim
    // (1lh - 1em) / 2 * -1
    '.leading-trim-both': {
      'margin-block': 'calc(0.5em - 0.5lh)',
    },
    '.leading-trim-start': {
      'margin-block-start': 'calc(0.5em - 0.5lh)',
    },
    '.leading-trim-end': {
      'margin-block-end': 'calc(0.5em - 0.5lh)',
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


    '.outline-solid': {
      'outline-style': 'solid',
    },

    '.h-stretch': {
      'height': 'stretch'
    },
    '.w-stretch': {
      'width': 'stretch'
    },

  })

  // Webkit scrollbar pseudo
  addVariant('scrollbar', '&::-webkit-scrollbar')
  addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb')
  addVariant('scrollbar-track', '&::-webkit-scrollbar-track')
  addVariant("scrollbar-track-piece", "&::-webkit-scrollbar-track-piece")
  addVariant('scrollbar-button', '&::-webkit-scrollbar-button')
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
        '50': '#e3fff3',
        '100': '#D0FFED',
        '200': '#B3FFE3',
        '300': '#88FFD1',
        '400': '#53FEBE',
        '500': '#3fe1b0',
        '600': '#2BC4A2',
        '700': '#068989',
        '800': '#005E5D',
        '900': '#083F37',
      },
      blue: {
        '50': '#ACF1FF',
        '100': '#80EAFF',
        '200': '#00DDFF',
        '300': '#00B3F5',
        '400': '#0290EE',
        '500': '#0060E0',
        '600': '#0250BC',
        '700': '#063F96',
        '800': '#073072',
        '900': '#0A214D',
      },
      violet: {
        '50': '#E6DFFF',
        '100': '#D9BFFF',
        '200': '#CC9EFF',
        '300': '#C588FF',
        '400': '#AC71FF',
        '500': '#9059FF',
        '600': '#7543E3',
        '700': '#582ACB',
        '800': '#46278E',
        '900': '#321C64',
      },
      purple: {
        '50': '#f7e3ff',
        '100': '#F6B9FF',
        '200': '#F690FF',
        '300': '#F564FF',
        '400': '#D64CF1',
        '500': '#B933E1',
        '600': '#962BB9',
        '700': '#712290',
        '800': '#4D1A69',
        '900': '#2B1141',
      },
      pink: {
        '50': '#FFDFF0',
        '100': '#FFB4DB',
        '200': '#FF8AC6',
        '300': '#FF6BBB',
        '400': '#FE4AA3',
        '500': '#FF2A8A',
        '600': '#E11586',
        '700': '#C60184',
        '800': '#7F165B',
        '900': '#50134C',
      },
      red: {
        '50': '#FFE0E8',
        '100': '#FFBEC6',
        '200': '#FF9AA2',
        '300': '#FF848C',
        '400': '#FF6A75',
        '500': '#FF505F',
        '600': '#E02950',
        '700': '#C50143',
        '800': '#800220',
        '900': '#440307',
      },
      orange: {
        '50': '#FFF4DE',
        '100': '#FFD6B2',
        '200': '#FFB588',
        '300': '#FEA365',
        '400': '#FE8A4F',
        '500': '#FF7139',
        '600': '#E25821',
        '700': '#CD3D00',
        '800': '#9D280C',
        '900': '#7B1604',
      },
      yellow: {
        '50': '#FFFFCD',
        '100': '#FEFF95',
        '200': '#FFEA7F',
        '300': '#FFD567',
        '400': '#FFBD4F',
        '500': '#FFA537',
        '600': '#E17F2E',
        '700': '#C45A28',
        '800': '#A7341F',
        '900': '#960F18',
      },

      // https://protocol.mozilla.org/docs/fundamentals/color
      "light-gray": {
        50: "#ffffff",
        100: "#f9f9fb",
        200: "#f0f0f4",
        300: "#e0e0e6",
        400: "#cfcfd8",
        500: "#bfbfc9",
        600: "#afafba",
        700: "#9f9fad",
        800: "#8f8f9e",
        900: "#80808f",
      },
      "dark-gray": {
        50: "#5b5b66",
        100: "#52525e",
        200: "#4a4a55",
        300: "#42414d",
        400: "#3a3944",
        500: "#32313c",
        600: "#2b2a33",
        700: "#23222b",
        800: "#1c1b22",
        900: "#15141a",
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
  },

  experimental: {
    // Remove unused global css variables, e.g. --tw-translate-x: 0;
    optimizeUniversalDefaults: true,

    // matchVariant: true,
  },

  /**
   * @satisfies {import("tailwindcss/types/config").PluginsConfig}
   */
  plugins: [
    pluginCreator,
    containerQueries,
  ],

  // https://tailwindcss.com/docs/theme#configuration-reference
  // https://github.com/tailwindlabs/tailwindcss/blob/master/src/corePlugins.js
  corePlugins: {},
} satisfies PresetsConfig

export type PresetTheme = typeof preset.theme

export function defineConfig<T extends Config>(config: T) {
  return config
}

