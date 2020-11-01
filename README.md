# NestJs Angular Test

Account list page and related row's detail page with Transactions.
Application is server-side rendered and run with NestJs.

## Development server

Run `ng serve` or `npm run start` for a dev server. 
Navigate to `http://localhost:4200/`.

To run locally with data, you need to change the accounts$ from server to local in data.service.ts as well as the exchangeRate timeout. 

## Build App

Clone repository, install dependencies `npm i` and build `npm run build:ssr`

## Run with NestJs

Once built, run `npm run serve:ssr` to kickstart server on port 4000.
Navigate to `http://localhost:4000` - Api endpoint available on `http://localhost:4000/api/accounts`

## Data

Test/Random data is generated at runtime - no Database connection.

## Running unit tests

Run `ng test` to execute the unit tests via Jest
Few tests set on Datable component and DataService service on Angular and Account Controller on NestJs.
