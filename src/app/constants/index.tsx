import axios from 'axios';

export const ACCESS_TOKEN ='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODNkZGQ3N2YxZDIzZmFlNDdjNzZkMjcxNGYyNTk1YiIsIm5iZiI6MTc0MTU3OTgxNy4xMjgsInN1YiI6IjY3Y2U2NjI5ZjlhNDg2OThlMmUyZjcyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Awc-UZsZxm7Gj7grVjVavxaZttay507GxaqvEwilIYM';

export const BASE_URL = 'https://api.themoviedb.org/3'

export const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'

export const API_KEY = '683ddd77f1d23fae47c76d2714f2595b'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: 'application/json',
  },
});
