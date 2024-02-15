
module.exports = {
    extends: [
      'react-app',
      'react-app/jest',
    ],
    globals: {
      self: true,
    },
    overrides: [
      {
        files: ['src/service-worker.js'],
        rules: {
          'no-restricted-globals': ['error', 'self'],
        },
      },
    ],
  };
  