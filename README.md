# Challenge technique

- git clone https://github.com/Yunight/react-finance
- cd folder
- npm install
- npm run dev

create .env file and create and variable VITE_APP_SECRET = SECRET_TOKEN

get your SECRET_TOKEN from [https://api.polygon.io/](https://polygon.io/)

There are 3 pages :

 - Daily : get all the data from all Tickers from yesterday since we don't can't access to current day with free plan
 - Search : Search with auto completion to get data from a specific Ticker and his last stock value is updated every X mins ( configurable )
 - News : get All news from the api related to tickers
