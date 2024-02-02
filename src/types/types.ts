// export interface SingleTickerDetailsParams {
//   ticker: string;
//   date?: string;
// }

// export interface Address {
//   address1: string;
//   city: string;
//   postal_code: string;
//   state: string;
// }

// export interface Branding {
//   icon_url: string;
//   logo_url: string;
// }

// export interface SingleTickerDetails {
//   active: boolean;
//   address: Address;
//   branding: Branding;
//   cik: string;
//   composite_figi: string;
//   currency_name: string;
//   description: string;
//   homepage_url: string;
//   list_date: string;
//   locale: string;
//   market: string;
//   market_cap: number;
//   name: string;
//   phone_number: string;
//   primary_exchange: string;
//   round_lot: number;
//   share_class_figi: string;
//   share_class_shares_outstanding: number;
//   sic_code: string;
//   sic_description: string;
//   ticker: string;
//   ticker_root: string;
//   total_employees: number;
//   type: string;
//   weighted_shares_outstanding: number;
// }

// export interface SingleTickerDetailsResponse {
//   request_id: string;
//   results: SingleTickerDetails;
//   status: string;
// }

// get all tickers from input

export interface AllTickerDetails {
  active: boolean;
  cik: string;
  composite_figi: string;
  currency_name: string;
  last_updated_utc: string;
  locale: string;
  market: string;
  name: string;
  primary_exchange: string;
  share_class_figi: string;
  ticker: string;
  type: string;
}

export interface AllTickersResponse {
  count: number;
  next_url: string;
  request_id: string;
  results: AllTickerDetails[];
  status: string;
}

// SMA

export interface GetSmaParams {
  stockTicker: string;
  timestamp?: {
    gt?: string;
    gte?: string;
    lt?: string;
    lte?: string;
  };
  timespan?: string;
  adjusted?: boolean;
  window?: number;
  series_type?: string;
  expand_underlying?: boolean;
  order?: string;
  limit?: number;
}

export interface SmaValue {
  timestamp: number;
  value: number;
}

export interface SmaResponse {
  results: {
    values: SmaValue[];
  };
}

// Grouped Daily ( Bars)

export interface GroupedDailyParams {
  date: string;
  adjusted?: boolean;
  include_otc?: boolean;
}

export interface ResultItem {
  T: string;
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  otc: boolean;
  t: number;
  v: number;
  vw: number;
}

export interface GroupedDailyResponse {
  adjusted: boolean;
  queryCount: number;
  request_id: string;
  resultsCount: number;
  status: string;
  results: ResultItem[];
}

// News

export interface TickerNewsParams {
  ticker?: string;
  "ticker.gt"?: string;
  "ticker.gte"?: string;
  "ticker.lt"?: string;
  "ticker.lte"?: string;
  published_utc?: string;
  "published_utc.gt"?: string;
  "published_utc.gte"?: string;
  "published_utc.lt"?: string;
  "published_utc.lte"?: string;
  order?: string;
  limit?: number;
  sort?: string;
}

export interface TickerNewsResponse {
  count: number;
  next_url: string;
  request_id: string;
  results: TickerNewsResult[];
  status: string;
}

export interface Publisher {
  favicon_url: string;
  homepage_url: string;
  logo_url: string;
  name: string;
}

export interface TickerNewsResult {
  amp_url: string;
  article_url: string;
  author: string;
  description: string;
  id: string;
  image_url: string;
  keywords: string[];
  published_utc: string;
  publisher: Publisher;
  tickers: string[];
  title: string;
}
