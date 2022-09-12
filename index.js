const express=require("express");
const app =express();
const port=8080; // http://localhost:8080/

app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).send({
        Message:"Server is up"
    });
});
app.all("*",(req,res)=>{
    res.status(404).send({
        Message:"Invalid URL"
    });
})



app.listen(port,()=>{
    console.log(`Server started in port: ${port}`);
});
