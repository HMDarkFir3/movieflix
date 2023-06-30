export default ({ config }) => {
  const { APP_ENV, API_URL, API_IMAGE_URL, API_KEY } = process.env;

  switch (APP_ENV) {
    case 'development': {
      return {
        ...config,
        name: 'Movieflix (DEVELOPMENT)',
        android: {
          package: 'com.hmdarkfire.movieflix.development',
        },
        extra: {
          eas: {
            projectId: 'f41a3d04-83f8-49ae-8627-299d5af7636c',
          },
          apiUrl: API_URL,
          apiImageUrl: API_IMAGE_URL,
          apiKey: API_KEY,
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
          eas: {
            projectId: 'f41a3d04-83f8-49ae-8627-299d5af7636c',
          },
          apiUrl: API_URL,
          apiImageUrl: API_IMAGE_URL,
          apiKey: API_KEY,
        },
      };
    }
    default: {
      return {
        ...config,
        extra: {
          eas: {
            projectId: 'f41a3d04-83f8-49ae-8627-299d5af7636c',
          },
          apiUrl: API_URL,
          apiImageUrl: API_IMAGE_URL,
          apiKey: API_KEY,
        },
      };
    }
  }
};
