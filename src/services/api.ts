import Constants from 'expo-constants';
import axios from 'axios';

const apiUrl = Constants.expoConfig.extra?.apiUrl;
const apiImageUrl = Constants.expoConfig.extra?.apiImageUrl;
const apiKey = Constants.expoConfig.extra?.apiKey;

const api = axios.create({
  baseURL: apiUrl,
  params: {
    api_key: apiKey,
  },
});

export { api, apiImageUrl };
