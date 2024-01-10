const app=require("./app");

const dotenv=require("dotenv")

const connectdb=require("./config/database");

//handling uncaught exception
process.on("uncaughtException",err=>{
    console.log(`Error:${err.message}`)
    console.log("shutting down the server due to unhadle uncaught exception ")
    process.exit(1);

})


// config

dotenv.config({path:"backend/config/config.env"});

//db connection call

connectdb();
const server=app.listen(process.env.PORT,()=>{
    console.log(`server working on http://localhost:${process.env.PORT}`)
})

//unhandle promise rejction

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log("shutting down the server due to unhadle promise rejection")
    server.close(()=>{
        process.exit(1);
    })
} )