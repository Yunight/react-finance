# Challenge technique done with React + Vite + Typescript + Redux

- git clone https://github.com/Yunight/react-finance
- cd folder
- npm install
- npm run dev

create .env.local file and create and variable VITE_APP_SECRET = SECRET_TOKEN

get your SECRET_TOKEN from [https://api.polygon.io/](https://polygon.io/)

There are 3 pages :

 - Daily : get all the data from all Tickers from yesterday since we don't can't access to current day with free plan,
    - we can filter
    - navigate
    - datas are store to localstorage & redux until tomorrow to avoid repetitive calls since datas will be the same
 - Search : Search with auto completion to get data from a specific Ticker and his last stock value is updated every X mins ( configurable )
    - suggestions list is stored into redux
    - if input change we do an other call and store again in redux
    - once selected we call again an api in order to get Simple Moving Average (SMA) and display the graph
    - we display the latest stock value and update every x min configured 
 - News : get All news from the api related to tickers
   - data are the latests one everytime we access to it
   - data are stored in redux store


there is a const file for all the const values :
- export const BASE_TIMER = 1;
- export const NUMBER_OF_DAILY_PER_PAGE = 18;
- export const NUMBER_OF_NEWS = 18;
- export const ARTICLES_PER_PAGE = 6;

component folders with all the components, hooks folder for custom hooks, api folder for the api,
