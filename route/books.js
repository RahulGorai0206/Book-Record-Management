const express=require("express");
const{books}=require("../data/books.json"); // importing users data

const router=express.Router(); // import router funtion to use as a router

/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Paramerers: None
 */
 router.get("/",(req,res)=>{
    res.status(200).json({
        success: true,
        data:books,
    });
});


module.exports=router;