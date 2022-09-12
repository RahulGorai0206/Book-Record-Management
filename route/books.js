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
/**
 * Route: /books/:id
 * Method: GET
 * Description: Get books by id
 * Access: Public
 * Paramerers: id
 */
 router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const book=books.find((each)=>each.id===id);
    if(!book){
        return res.status(404).json({
            success:false,
            message: "Book not found"
        });
    }else{
        res.status(200).json({
            success: true,
            data: book,
        });
    };
});





module.exports=router;