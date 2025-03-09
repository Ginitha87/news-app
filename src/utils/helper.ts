import { Filter } from "../components/Filters/FilterTypes";

//  function to map API response to the article format
export const mapArticles = (articles: any[], source: string) =>
  articles.map((article: any) => ({
    title: article.title || article.webTitle || article.headline?.main,
    description:
      article.description || article.fields?.body || article.snippet || "",
    author:
      article.author ||
      article.tags?.[0]?.webTitle ||
      article.keywords?.find((keyword: any) => keyword.name === "persons")
        ?.value ||
      "",
    source: source,
    url: article.url || article.webUrl || article.webUrl,
    imageUrl:
      article.urlToImage ||
      article.byline ||
      article.fields?.thumbnail ||
      article.multimedia?.[0]?.url,
    publishedAt:
      article.publishedAt ||
      article.webPublicationDate ||
      article.pub_date ||
      "",
  }));

//  function to build query params and determine the endpoint
export const buildParams = (
  filters: Filter,
  apiKey: string,
  apiType: string
): Record<string, string> => {
  const { searchQuery, category, source, date, author } = filters;

  // Initialize common parameters
  const params: Record<string, string> = {
    [apiType === "news-api" ? "apiKey" : "api-key"]: apiKey,
    q:
      searchQuery?.toLowerCase() ||
      (apiType === "news-api" && !searchQuery
        ? "general"
        : category?.toLowerCase()) ||
      undefined,
  };

  // Helper to format author for different API types
  const formatAuthor = (
    author: string | undefined,
    apiType: string
  ): string | undefined => {
    if (!author) return undefined;
    return apiType === "guardian-api"
      ? `profile/${author.replace(/\s+/g, "").toLowerCase()}`
      : author.toLowerCase();
  };

  // Add date parameter
  const addDateParam = (date: string | undefined, apiType: string): void => {
    if (!date) return;
    const dateParamKey =
      apiType === "guardian-api"
        ? "from-date"
        : apiType === "newyork-api"
        ? "begin_date"
        : "from"; // Default for other APIs
    params[dateParamKey] = date;
  };

  // Add author parameter
  const addAuthorParam = (
    author: string | undefined,
    apiType: string
  ): void => {
    if (author) {
      params[apiType === "guardian-api" ? "tag" : "author"] = formatAuthor(
        author,
        apiType
      );
    }
  };

  // Add category parameter
  const addCategoryParam = (
    category: string | undefined,
    apiType: string
  ): void => {
    if (category) {
      params[
        apiType === "guardian-api"
          ? "section"
          : apiType === "newyork-api"
          ? "fq"
          : "category"
      ] = category.toLowerCase();
    }
  };

  // Add source parameter
  const addSourceParam = (
    source: string | undefined,
    apiType: string
  ): void => {
    // if (apiType !== "news-api" && source) {
    //   params.source = source;
    // }
    if (source) {
      params.source = source;
    }
  };

  // Add additional parameters specific to certain APIs
  const addApiSpecificParams = (apiType: string): void => {
    if (apiType === "guardian-api") {
      params["show-fields"] = "byline,thumbnail";
    }
  };

  // Populate parameters
  addDateParam(date, apiType);
  addAuthorParam(author, apiType);
  addCategoryParam(category, apiType);
  addSourceParam(source, apiType);
  addApiSpecificParams(apiType);
  return params;
};

// export const buildParams = (
//   filters: Filter,
//   apiKey: string,
//   sourceKey: string,
//   apiType: string
// ) => {
//   const { searchQuery, category, source, date, author } = filters;

//   const params: Record<string, string> = {
//     [apiType === "news-api" ? "apiKey" : "api-key"]: apiKey,
//     q:
//       searchQuery.toLowerCase() ||
//       (category ? category.toLowerCase() : undefined),
//     ...(date && {
//       [apiType === "guardian-api"
//         ? "from-date"
//         : apiType === "newyork-api"
//         ? "begin_date"
//         : "from"]: date,
//     }),
//     ...(author && {
//       [apiType === "guardian-api" ? "tag" : "author"]:
//         apiType === "guardian-api"
//           ? `profile/${author.replace(/\s+/g, "").toLowerCase()}`
//           : author.toLowerCase(),
//     }),
//     ...(apiType === "guardian-api" && { "show-fields": "byline,thumbnail" }),
//     ...(category && {
//       [apiType === "guardian-api"
//         ? "section"
//         : apiType === "newyork-api"
//         ? "fq"
//         : "category"]: category.toLowerCase(),
//     }),
//     ...(apiType !== "news-api" && source && { source: source }),
//   };

//   let endpoint = "/everything"; // Default to 'everything'

//   return { params };
// };

export const getEndpoint = (filters: Filter): string => {
  const { category, source } = filters;
  // let endpoint = "/articles";
  // if (category && !source) {
  //   return "/top-headlines";
  // }

  // return "/everything";
  let endpoint = "/everything"; // Default endpoint for both APIs
  console.log(filters);
  if (source && !category) {
    endpoint = "/top-headlines"; // Use everything if source is present
  } else if (category) {
    endpoint = "/top-headlines"; // Use top-headlines if category is present
  }
  return endpoint;
};
