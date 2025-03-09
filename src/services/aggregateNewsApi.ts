import {
  fetchFromTheGuardianApi,
  fetchFromTheNewsApi,
  fetchFromTheNYApi,
} from "./newsApiServices";

export const aggregateNewsApi = async (filters: any) => {
  const fetchApis = [
    fetchFromTheNewsApi(filters),
    fetchFromTheGuardianApi(filters),
    fetchFromTheNYApi(filters),
  ];

  try {
    const results = await Promise.allSettled(fetchApis);
    return results
      .filter(
        (result): result is PromiseFulfilledResult<any> =>
          result.status === "fulfilled"
      )
      .flatMap((result) => result.value);
  } catch (error) {
    console.error("Error fetching aggregated news:", error);
    return [];
  }
};
