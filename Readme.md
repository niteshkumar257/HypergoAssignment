# Hypergo.io Backend intern assignment

## Table of Contents

- [Installation](#installation)

## Installation

```bash
npm install
npm start

// set up for reddis
install docker 
docker pull redis/redis-stack
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```
#### How to use Api's
-[ Reegister User](#register-user-create-user)
-[ Add Favourite stock](#add-favourite-stock)
-[ All Favourite stock](#get-all-favourite-stock)
-[ Delete Favourite stock](#delete-favourite-stock)
-[ Find stock by name](#find-stock-by-name)
-[ Top 10 stocks](#find-top-10-stocks)
-[ UI of Stocks](#ui-plot-for-the-stocks)

#### Register user (create user)
 /register 
provide username and password in body
![Alt text](./public/image.png)

output:
![Alt text](./public/image-4.png)

##### Add favourite stock
 /addFavorite
provide userId and stockId in body
![Alt text](./public/image-1.png)

output:
![Alt text](./public/image-5.png)

#### Get All favourite stock
 /allFavorite
provide userId in body
![Alt text](./public/image-2.png)

output:
![Alt text](./public/image-7.png)

#### Delete favourite stock
/deleteFavorite
provide UserId and stock id in body 
![Alt text](./public/image-3.png)

output:
![Alt text](./public/image-9.png)



#### Find Stock by Name
/sotckByName
Provide stock_name in query paramter
![Alt text](./public/image-10.png)

Ouput:
![Alt text](./public/image-11.png)

#### Find Top 10 stocks
/top10stocks
Provide the parameter 
![Alt text](./public/image-12.png)

output :
![Alt text](./public/image-13.png)


#### Ui plot for the Stocks
I did able to store multiple days stock so ,I am not able to make a route to send json data from handling graph of stocks with respect to time


#### Implemented caching using redis
#### hosted the backend in render.com https://niteshkumar11.onrender.com



