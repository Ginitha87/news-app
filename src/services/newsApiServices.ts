import { buildParams, getEndpoint } from "../utils/helper";
import { API_KEYS, API_BASE_URLS } from "../config/apiConfig";
import { fetchArticles } from "./apiService";

export const fetchFromTheNewsApi = async (filters: any) => {
  const params = buildParams(filters, API_KEYS.NEWS_API_KEY, "news-api");
  const endpoint = getEndpoint(filters);

  return fetchArticles(
    `${API_BASE_URLS.NEWS_API_BASE_URL}${endpoint}`,
    params,
    "NewsAPI"
  );
};

export const fetchFromTheGuardianApi = async (filters: any) => {
  const params = buildParams(
    filters,
    API_KEYS.GUARDIAN_API_KEY,
    "guardian-api"
  );

  return fetchArticles(
    API_BASE_URLS.GUARDIAN_API_BASE_URL,
    params,
    "The Guardian"
  );
};

export const fetchFromTheNYApi = async (filters: any) => {
  const params = buildParams(filters, API_KEYS.NEW_YORK_API_KEY, "newyork-api");
  return fetchArticles(
    API_BASE_URLS.NEW_YORK_API_BASE_URL,
    params,
    "The New York Times"
  );
};
