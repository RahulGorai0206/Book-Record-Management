const mongoose=require("mongoose");
const Schema=mongoose.Schema; // create a schema
const UserSchema=new Schema( // create a object of schema
    {
        name:{
            type: String,
            require:true,
        },
        surname:{
            type: String,
            require:true,
        },
        email:{
            type: String,
            require:true,
        },
        issuedBook:{
            type: mongoose.Schema.Types.ObjectId, // defining objectID type data
            ref:"Book", // setting a referance that it can connect to book database
            require:false,
        },
        issuedDate:{
            type: String,
            require:false,
        },
        returnDate:{
            type: String,
            require:false,
        },
        subscriptionType:{
            type: String,
            require:true,
        },
        subscriptionDate:{
            type: String,
            require:true,
        },
    },
    {
        timestamps:true,
    }
);
// this collection of users will be called as "users"
module.exports=mongoose.model("User",UserSchema); // export the model/onject