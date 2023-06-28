export default ({ config }) => {
  const { APP_ENV } = process.env;

  switch (APP_ENV) {
    case "development": {
      return {
        ...config,
        name: "Movieflix (DEVELOPMENT)",
        android: {
          package: "com.hmdarkfire.movieflix.development",
        },
      };
    }
    case "preview": {
      return {
        ...config,
        name: "Movieflix (PREVIEW)",
        android: {
          package: "com.hmdarkfire.movieflix.preview",
        },
      };
    }
    default: {
      return {
        ...config,
        extra: {
          eas: {
            projectId: "34a8fb7a-cd46-4b36-aeca-375e5fb0f1f5",
          },
          apiUrl: "https://api.themoviedb.org/3",
          apiImageUrl: "https://image.tmdb.org/t/p/original",
          apiKey: "0c0022784169f05724bd271bfbac8521",
        },
      };
    }
  }
};
