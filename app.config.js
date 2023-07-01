export default ({ config }) => {
  switch (process.env.APP_ENV) {
    case 'development': {
      return {
        ...config,
        name: 'Movieflix (DEVELOPMENT)',
        android: {
          package: 'com.hmdarkfire.movieflix.development',
        },
        extra: {
          apiUrl: process.env.API_URL,
          apiImageUrl: process.env.API_IMAGE_URL,
          apiKey: process.env.API_KEY,
          eas: {
            projectId: 'f41a3d04-83f8-49ae-8627-299d5af7636c',
          },
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
        extra: {
          apiUrl: process.env.API_URL,
          apiImageUrl: process.env.API_IMAGE_URL,
          apiKey: process.env.API_KEY,
          eas: {
            projectId: 'f41a3d04-83f8-49ae-8627-299d5af7636c',
          },
        },
      };
    }
    default: {
      return {
        ...config,
        extra: {
          apiUrl: process.env.API_URL,
          apiImageUrl: process.env.API_IMAGE_URL,
          apiKey: process.env.API_KEY,
          eas: {
            projectId: 'f41a3d04-83f8-49ae-8627-299d5af7636c',
          },
        },
      };
    }
  }
};
