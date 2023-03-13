# Planty of Food API 🥬

REST API for a plant based application.

## :question: Why

This project is the final practice for start2impact Node.js course.

## :bulb: How it works

This API has three data Models:

- Users: data of the subscripted users
- Products: data of the subscripted products
- Orders: the join table whit the data of orders

Using the correct [endpoints](#endpoints) you can Create, Read, Update ore Delete (CRUD) what do you want.
Finally, you can search through the users, products and orders with some queries.

## 🧪 Built with 
- Node.js
- MySQL
- Sequelize

## Framework
- Express js

## :floppy_disk: Installation

1) Clone the repo :
 ``` 
 git clone https://github.com/MrRobot-fm/PlantyFoodAPI-NodeJs-MySql.git
```
2) Setup a MySQL Database;
3) Import the migration file migration.sql
4) Create a .env file and fill it with your DB data:
```
  NODE_LISTEN_PORT= ""
  NODE_DATABASE= ""
  NODE_DATABASE_USER= ""
  NODE_DATABASE_PW=""
  NODE_DATABASE_URL= "" 
```
5) Install project dependencies :
```
  npm install 
```
6) Start the server :
```
  npm run dev
```

## :open_file_folder: Endpoints

### Users

You can get the entire users list with a GET request:

`/users`

or GET data for a specific user:

`/users/:userId`
  
You can PATCH or DELETE user data with the same endpoint.

Finally, you can add a new user with a POST request:

`/users`

```json
{
    "firstName": "insert an alphanumeric string",
    "lastName": "insert an alphanumeric string"
    "email": "insert a valid email"
}
```

### Products

You can get the entire product list with a GET request:

`/products`

or GET data for a specific product:

`/products/:productId`

 
You can PATCH or DELETE a product with the same endpoint.

Finally, you can add a new product with a POST request:

`/product`

```json
{
    "product": "insert an alphanumeric string",
}
```

### Orders

You can get all the available orders with a GET request

`/orders`

or GET data for a specific order:

`/orders/:orderId`

You can PATCH or DELETE a target with the same endpoint.

For a new order, before we have to create a new user and product then we can use a POST request:

`/orders`

```json
{
  "orderUserName": "insert an alphanumeric string",
  "orderProduct": "insert an alphanumeric string",
}
```

Alternatively we can create the user and product directly while creating the order:

`/orders/new-order`

```json
{
  "user_name": "insert an alphanumeric string",
  "product_name": "insert an alphanumeric string",
  "firstName": "insert an alphanumeric string",
  "lastName": "insert an alphanumeric string",
  "email": "insert a valid email",
  "product":"insert an alphanumeric string"
}
```



## :e-mail: Contact Me

Any questions? Send me an e-mail here: federicomiglioredev@gmail.com <br>
You can find my Linkedin profile here: https://www.linkedin.com/in/federicomigliore/
