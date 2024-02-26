import axios from "axios";

const isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
export const MEDIA_ROOT = isDev ? "http://localhost:8001" : "https://dronet.propulsion-learn.ch"

export const api = axios.create({
    baseURL: `${MEDIA_ROOT}/backend`
});