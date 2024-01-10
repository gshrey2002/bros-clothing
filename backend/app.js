const express=require("express");
const app =express();
const middleware=require("../backend/middleware/error")

app.use(express.json());


//route import
const products=require("./route/productroute")
app.use("/api/v1",products)

//middleware
app.use(middleware)


module.exports=app