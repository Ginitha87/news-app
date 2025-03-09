import axios from "axios";
import { mapArticles } from "../utils/helper";

const fetchArticles = async (
  url: string,
  params: Record<string, string>,
  sourceName: string
) => {
  try {
    const response = await axios.get(url, { params });
    return mapArticles(
      response.data.articles ||
        response.data.response?.results ||
        response.data.response?.docs ||
        [],
      sourceName
    );
  } catch (error) {
    console.error(`Error fetching ${sourceName} articles:`, error);
    return [];
  }
};

export { fetchArticles };
