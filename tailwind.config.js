module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // false or 'media'

  theme: {
    extend: {
      fontFamily: {
        Merriweather: "Merriweather",
        Ubuntu: "Ubuntu Mono",
        Monoton: "Monoton",
      },
      colors: {
        "black-p": "#1E1E28",
        "black-p-l": "#2D2F33",
        "black-s": "#FFC107",
        "white-c": "#F7F8FB",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.black-s'),
              '&:hover': {
                color: theme('colors.black-s'),
                textDecoration: 'underline',
              },
            },
            h1: {
              color: theme('colors.gray.900'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            p: {
              color: theme('colors.gray.900'),
            },
            strong: {
              color: theme('colors.gray.900'),
            },
            li: {
              color: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.indigo.500'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.25rem',
              borderRadius: '0.25rem',
              fontFamily: 'Ubuntu Mono',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'currentColor',
              padding: '0',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.black-s'),
              '&:hover': {
                color: theme('colors.black-s'),
                textDecoration: 'underline',
              },
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            p: {
              color: theme('colors.gray.300'),
            },
            strong: {
              color: theme('colors.gray.200'),
            },
            li: {
              color: theme('colors.gray.300'),
            },
            code: {
              color: theme('colors.indigo.400'),
              backgroundColor: theme('colors.gray.800'),
            },
            blockquote: {
              color: theme('colors.gray.400'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
