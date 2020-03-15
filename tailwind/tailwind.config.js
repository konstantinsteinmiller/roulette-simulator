const tailwindVariables = require('./tailwind-variables')

module.exports = {
  prefix: '',
  important: false,
  separator: ':',

  theme: {
    ...tailwindVariables,
  },
  /*
  |-----------------------------------------------------------------------------
  | Modules                  https://tailwindcss.com/docs/configuration#modules
  |-----------------------------------------------------------------------------
  |
  | Here is where you control which modules are generated and what variants are
  | generated for each of those modules.
  |
  | Currently supported variants:
  |   - responsive
  |   - hover
  |   - focus
  |   - active
  |   - group-hover
  |
  | To disable a module completely, use `false` instead of an array.
  |
  */

  variants: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover', 'focus', 'important'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColor: ['responsive', 'hover', 'focus', 'important'],
    borderRadius: ['responsive', 'important'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive', 'important'],
    cursor: ['responsive'],
    display: ['responsive'],
    flexDirection: ['responsive'],
    flexWrap: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    justifyContent: ['responsive'],
    alignContent: ['responsive'],
    flex: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive', 'important'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive', 'important'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive', 'important'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive', 'important'],
    opacity: ['responsive', 'hover'],
    outline: ['focus'],
    overflow: ['responsive'],
    padding: ['responsive', 'important'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    inset: ['responsive'],
    resize: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus'],
    fill: [],
    stroke: [],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus', 'important'],
    fontSize: ['responsive', 'important'],
    textStyle: ['responsive', 'hover', 'focus'],
    fontStyle: ['responsive', 'hover', 'focus'],
    fontSmoothing: ['responsive', 'hover', 'focus'],
    textDecoration: ['responsive', 'hover', 'focus'],
    textTransform: ['responsive', 'hover', 'focus'],
    letterSpacing: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    wordBreak: ['responsive'],
    width: ['responsive', 'important'],
    zIndex: ['responsive'],
  },
  corePlugins: {
    objectFit: false,
    objectPosition: false,
  },

  /*
  |-----------------------------------------------------------------------------
  | Plugins                                https://tailwindcss.com/docs/plugins
  |-----------------------------------------------------------------------------
  |
  | Here is where you can register any plugins you'd like to use in your
  | project. Tailwind's built-in `container` plugin is enabled by default to
  | give you a Bootstrap-style responsive container component out of the box.
  |
  | Be sure to view the complete plugin documentation to learn more about how
  | the plugin system works.
  |
  */

  plugins: [
    // eslint-disable-next-line
    require("tailwindcss-important")(),
    // eslint-disable-next-line
    require("tailwindcss-transition")({ // see: https://github.com/benface/tailwindcss-transitions
      standard: 'all .2s ease-in-out',
      transitions: {
        // eslint-disable-next-line
        slow: "all 1s ease-in-out",
        // eslint-disable-next-line
        fast: "all .1s ease-in-out"
      },
    }),
    function({ addUtilities }) {
      const wordBreak = {
        '.break-word': {
          'word-break': 'break-word',
        },
        '.break-all': {
          'word-break': 'break-all',
        },
      }
      addUtilities(wordBreak)
    },
    function({ addUtilities }) {
      const boxShadow = {
        '.card-shadow': {
          'box-shadow': `1px 5px 12px 3px ${tailwindVariables.colors['grey']}`,
        },
        '.dropdown-shadow': {
          'box-shadow': `1px 3px 5px 1px ${tailwindVariables.colors['grey']}`,
        },
      }
      addUtilities(boxShadow)
    },
    function({ addUtilities }) {
      const borders = {
        '.navbar-border': {
          'border-right': `1px solid rgba(0, 0, 0, 0.14)`,
        },
      }
      addUtilities(borders)
    },
  ],

  /*
  |-----------------------------------------------------------------------------
  | Advanced Options         https://tailwindcss.com/docs/configuration#options
  |-----------------------------------------------------------------------------
  |
  | Here is where you can tweak advanced configuration options. We recommend
  | leaving these options alone unless you absolutely need to change them.
  |
  */
}
