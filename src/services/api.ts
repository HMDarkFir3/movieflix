import Contants from 'expo-constants';
import axios from 'axios';

console.log(Contants.expoConfig.extra);

const apiImageUrl = 'https://image.tmdb.org/t/p/original';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '0c0022784169f05724bd271bfbac8521',
  },
});

export { api, apiImageUrl };
