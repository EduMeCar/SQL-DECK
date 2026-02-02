// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SQL-DECK',
  tagline: 'Un mazo de cartas educativas para dominar SQL desde cero, paso a paso',
  favicon: 'img/favicon.ico',

  url: 'https://EduMeCar.github.io',
  baseUrl: '/SQL-DECK/',
  organizationName: 'EduMeCar',
  projectName: 'SQL-DECK',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/EduMeCar/SQL-DECK/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/sql-deck-social-card.jpg',
      navbar: {
        title: 'SQL-DECK',
        logo: {
          alt: 'SQL-DECK Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Cartas',
          },
          {
            href: 'https://github.com/EduMeCar/SQL-DECK',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Recursos',
            items: [
              {
                label: 'Cartas SQL',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Comunidad',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/EduMeCar/SQL-DECK',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} EduMeCar. Built with Docosaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['sql'],
      },
    }),
};

module.exports = config;
