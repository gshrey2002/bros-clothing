const express=require("express");
const app =express();
const middleware=require("../backend/middleware/error")

app.use(express.json());


//route import
const products=require("./route/productroute")
const user=require("./route/userroute")

app.use("/api/v1",products)
app.use("/api/v1",user)

//middleware
app.use(middleware)


module.exports=app