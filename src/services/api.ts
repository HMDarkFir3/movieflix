import axios from 'axios';

const { EXPO_PUBLIC_TMDB_API_URL, EXPO_PUBLIC_TMDB_API_URL_IMAGE, EXPO_PUBLIC_TMDB_API_KEY } =
  process.env;

const apiImageUrl = EXPO_PUBLIC_TMDB_API_URL_IMAGE;

const api = axios.create({
  baseURL: EXPO_PUBLIC_TMDB_API_URL,
  params: {
    api_key: EXPO_PUBLIC_TMDB_API_KEY,
  },
});

export { api, apiImageUrl };
