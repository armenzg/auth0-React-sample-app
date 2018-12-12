module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    '@neutrinojs/airbnb',
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'Auth0 React sample app',
        },
      },
    ],
    '@neutrinojs/jest',
  ],
};
