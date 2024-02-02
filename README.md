
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

Obtain your `SECRET_TOKEN` from Polygon.io API. 

## Features

The application consists of three main pages and one feature:

### Daily

- Retrieves all ticker data from the previous day, as the current day's data is unavailable with the free plan.
- Allows filtering and navigation.
- Data are stored in both local storage and Redux to minimize redundant API calls, as the data remains unchanged until the next day.

### Search

- Implements search with auto-completion for retrieving data from a specific ticker.
- Suggestions are stored in Redux.
- A new API call is made if the input changes after 500ms to avoid many calls at each input change, with the results stored in Redux.
- Upon selection, the application makes another API call to fetch the Simple Moving Average (SMA) and displays the graph.
- Displays the latest stock value and updates it at a user-configured interval.

### News

- Fetches all news related to tickers from the API.
- Ensures data are the latest every time the page is accessed.
- Stores data in the Redux store.

### Theme Manager

- on the top right of the screen there are 2 lists, one is for switching to a light theme and the other dark, try to play with them !

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

- `components` folder contains all UI components.
- `hooks` folder for custom React hooks.
- `api` folder for API integration.

---
