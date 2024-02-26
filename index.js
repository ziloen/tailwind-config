/**
 * @param {import("tailwindcss/types/config").PluginAPI} api
 */
export function pluginCreator({ addUtilities, addVariant, matchUtilities, theme }) {
  addUtilities({
    // Flex
    '.flex-center': {
      display: 'flex',
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
  })

  // Webkit scrollbar pseudo
  addVariant('scrollbar', '&::-webkit-scrollbar')
  addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb')
  addVariant('scrollbar-track', '&::-webkit-scrollbar-track')
  addVariant('scrollbar-button', '&::-webkit-scrollbar-button')
}