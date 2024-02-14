const express=require("express");
const app =express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const middleware=require("../backend/middleware/error")


app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));



//route import
const products=require("./route/productroute")
const user=require("./route/userroute")
const order=require("./route/orderroute")

app.use("/api/v1",products)
app.use("/api/v1",user)
app.use("/api/v1",order)


//middleware
app.use(middleware)


module.exports=app