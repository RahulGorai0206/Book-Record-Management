const express=require("express");
const dotenv = require("dotenv");

const DbConnection=require("./DatabaseConnection"); // database connection

// importing routes
const UserRoute=require("./routes/users");
const BooksRoute=require("./routes/books");

dotenv.config();

const app =express();
DbConnection(); // connect database after starting express
const port=8080; // http://localhost:8080/

app.use(express.json());
app.use("/users",UserRoute); // use user file for all user requests
app.use("/books",BooksRoute); // use book file for all book requests

// app.all("*",(req,res)=>{
//     res.status(404).send({
//         Message:"Invalid URL"
//     });
// })

app.listen(port,()=>{
    console.log(`Server started in port: ${port}`);
});
