
# Technical Challenge: React Finance Dashboard

This project is built using React, Vite, TypeScript, Redux and DaisyUI. 

## Getting Started

To get started, follow these steps:

```bash
git clone https://github.com/Yunight/react-finance.git 
cd react-finance 
npm install 
npm run dev
```

Create a `.env.local` file and add the following variable:

```makefile
VITE_APP_SECRET=SECRET_TOKEN
```

Obtain your `SECRET_TOKEN` from [Polygon.io](https://polygon.io/) API. 
> Attention Polygon.io API. allows only 5 API calls per min for the free plan, once reached you'll have the error 429, just wait a min and you'll be good to try again

## Features

The application consists of three main pages and one feature:

### Daily

- Retrieves all ticker data from the previous day, as the current day's data is unavailable with the free plan.
- Allows filtering and navigation.
- Data are stored in both local storage and Redux to minimize redundant API calls and kept after refreshing the page, as the data remains unchanged until the next day.

### Search

- Implements search with auto-completion for retrieving data from a specific ticker.
- Suggestions are stored in Redux.
- A new API call is made if the input changes after 500ms to avoid many calls at each input change, with the results stored in Redux.
- Upon selection, the application makes another API call to fetch the Simple Moving Average (SMA) and displays the graph.
- Displays the latest stock value and updates it at a user-configured interval.
- You can change page and the value will be kept however since we clear the interval everytime to avoid any side effect in useEffect, next update timing is also updated to have the correct value

### News

- Fetches all news related to tickers from the API.
- Ensures data are the latest every time the page is accessed.
- Stores data in the Redux store.

### Theme Manager

- on the top right of the screen there are 2 lists, one is for switching to a light theme and the other dark, try to play with them !
- one toggle switch is also here, must choose one of the light theme first "light","cupecake","bumblebee","emerald" or "corporate" by default the Dark Theme "Dark" will be the default Dark Theme, you can configure inside tailwind.config.js
## Configuration

A constants file contains all the constant values for the application:

```arduino
export const BASE_TIMER = 1; 
export const NUMBER_OF_DAILY_PER_PAGE = 18; 
export const NUMBER_OF_NEWS = 18; 
export const ARTICLES_PER_PAGE = 6;
```

## Errors handling
 - Errors are stored in redux store, and displayed with a toast 

## Project Structure


- - `src`
  - `api`
    - `polygonApi.ts`
  - `assets`
    - `bourse.png`
    - `react.svg`
  - `components`
    - `ui`
      - `card.tsx`
    - `separator.tsx`
    - `ContentTitleDisplay.tsx`
    - `DailyTickersDisplay.tsx`
    - `DailyTickersTable.tsx`
    - `Header.tsx`
    - `NewsCardDisplay.tsx`
    - `NewsCardItem.tsx`
    - `Pages.tsx`
    - `Pagination.tsx`
    - `ThemeSelector.tsx`
    - `TickerSearchChart.tsx`
    - `TickerSearchDetails.tsx`
    - `TickerSearchInput.tsx`
    - `TickerSearchValue.tsx`
  - `consts`
    - `consts.ts`
  - `hooks`
    - `useDailyTickers.ts`
    - `useFetchDailyData.ts`
    - `useNews.ts`
    - `usePagination.ts`
    - `useTickersSearchInput.ts`
  - `lib`
    - `utils.ts`
  - `redux`
    - `store.ts`
    - `tickerSlice.ts`
  - `types`
    - `types.ts`
---
