export default ({ config }) => {
  switch (process.env.APP_ENV) {
    case 'development': {
      return {
        ...config,
        name: 'Movieflix (DEVELOPMENT)',
        android: {
          package: 'com.hmdarkfire.movieflix.development',
        },
      };
    }
    case 'preview': {
      return {
        ...config,
        name: 'Movieflix (PREVIEW)',
        android: {
          package: 'com.hmdarkfire.movieflix.preview',
        },
      };
    }
    default: {
      return {
        ...config,
      };
    }
  }
};
