const mongoose=require("mongoose");
const Schema=mongoose.Schema; // create a schema
const BookSchema=new Schema( // create a object of schema
    {
        name:{
            type: String,
            require:true,
        },
        author:{
            type: String,
            require:true,
        },
        genre:{
            type: String,
            require:true,
        },
        price:{
            type: String,
            require:true,
        },
        publisher:{
            type: String,
            require:true,
        },
    },
    {
        timestamps:true,
    }
);
// this collection of books will be called as "books"
module.exports=mongoose.model("Book",BookSchema); // export the model/onject