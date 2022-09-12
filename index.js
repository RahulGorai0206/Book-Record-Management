const express=require("express");

// importing routes
const UserRoute=require("./route/users");
const BooksRoute=require("./route/books");


const app =express();
const port=8080; // http://localhost:8080/

app.use(express.json());
app.use("/users",UserRoute); // use user file for all user requests
app.use("/books",UserRoute); // use book file for all book requests

app.all("*",(req,res)=>{
    res.status(404).send({
        Message:"Invalid URL"
    });
})

app.listen(port,()=>{
    console.log(`Server started in port: ${port}`);
});
