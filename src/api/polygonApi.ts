import { NUMBER_OF_NEWS } from "@/consts/consts";
import {
  AllTickerDetails,
  AllTickersResponse,
  GetSmaParams,
  GroupedDailyParams,
  GroupedDailyResponse,
  SmaResponse,
  TickerNewsParams,
  TickerNewsResponse,
} from "@/types/types";

import axios, { CancelToken } from "axios";

const BASE_URL = "https://api.polygon.io/";
const apiKey = "WV4Eua2SmUqufXFHNaP6FpA7NiFpD2JQ";

// export async function getTickerDetails(
//   params: SingleTickerDetailsParams
// ): Promise<SingleTickerDetailsResponse> {
//   const url = `${BASE_URL}/${params.ticker}`;

//   try {
//     const response = await axios.get<SingleTickerDetailsResponse>(url, {
//       params: {
//         apiKey,
//         date: params.date,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     throw new Error(`API request failed with status ${error}`);
//   }
// }

export async function getTickers(
  search: string,
  cancelToken: CancelToken,
  params?: AllTickerDetails
): Promise<AllTickersResponse> {
  const url = `${BASE_URL}v3/reference/tickers`;

  try {
    const response = await axios.get<AllTickersResponse>(url, {
      cancelToken,
      params: {
        ...params,
        search,
        active: true,
        apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API request failed with status ${error.message}`);
    } else {
      throw new Error(`API request failed with status ${error}`);
    }
  }
}

export async function getSma(
  stockTicker: string,
  otherParams?: Partial<GetSmaParams>
) {
  const url = `${BASE_URL}v1/indicators/sma/${stockTicker}?timespan=week&adjusted=true&window=50&series_type=close&order=desc`;

  try {
    const response = await axios.get<SmaResponse>(url, {
      params: {
        ...otherParams,
        apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API request failed with status ${error.message}`);
    } else {
      throw new Error(`API request failed with status ${error}`);
    }
  }
}

export async function getGroupedDaily(
  params: GroupedDailyParams
): Promise<GroupedDailyResponse> {
  const { date, adjusted = true, include_otc = false } = params;
  const url = `${BASE_URL}v2/aggs/grouped/locale/us/market/stocks/${date}`;

  try {
    const response = await axios.get<GroupedDailyResponse>(url, {
      params: {
        adjusted,
        include_otc,
        apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API request failed with status ${error.message}`);
    } else {
      throw new Error(`API request failed with status ${error}`);
    }
  }
}

export async function getTickerNews(
  params?: TickerNewsParams
): Promise<TickerNewsResponse> {
  const url = `${BASE_URL}v2/reference/news`;

  try {
    const response = await axios.get<TickerNewsResponse>(url, {
      params: {
        order: "desc",
        limit: NUMBER_OF_NEWS,
        ...params,
        apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API request failed with status ${error.message}`);
    } else {
      throw new Error(`API request failed with status ${error}`);
    }
  }
}
