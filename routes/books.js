const express=require("express");
const{books}=require("../data/books.json"); // importing books data
const{users}=require("../data/users.json"); // importing users data
const router=express.Router(); // import router funtion to use as a router
const {
    GetAllBooks,
    GetBookById,
    GetAllIssuedBooks,
    AddNewBook,
    UpdateBookById
}=require("../controllers/books.controller");
 

/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Paramerers: None
 */
 router.get("/",GetAllBooks);
/**
 * Route: /books/:id
 * Method: GET
 * Description: Get books by id
 * Access: Public
 * Paramerers: id
 */
 router.get("/:id",GetBookById);
/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get books that all issued
 * Access: Public
 * Paramerers: none
 */
 router.get("/issued/by-user",GetAllIssuedBooks);
/**
 * Route: /books
 * Method: POST
 * Description: Create new book
 * Access: Public
 * Paramerers: none
 * Data : author, name, genre, price, publisher, id
 */
router.post('/',AddNewBook);
/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update book details
 * Access: Public
 * Paramerers: id
 * Data : author, name, genre, price, publisher, id
 */
router.put('/:id',UpdateBookById);
/**
 * Route: /books/issued/withFine
 * Method: PUT
 * Description: Get all issued book with fine
 * Access: Public
 * Paramerers: none
 */
router.get('/issued/withFine',(req,res)=>{
    const UserWithBooks=users.filter((each)=>{ // filter the user that have issued books and save in a variable
        if(each.issuedBook) return each;
    });
    const GetDateInDays=(data="")=>{
    let date;
    if(data===""){
        date= new Date(); // get current date
    }else{
        date=new Date(data); // get on the basis of data variable
    }
    let days=Math.floor(date/(1000*60*60*42)); // convert date in to days by dividing with miliseconds*seconds*minuites*hours
    return days;
    };
    
        let CurrentDate=GetDateInDays();
    const UserWithFine=UserWithBooks.filter((each)=>{
        let GetSubscriptionType=(date)=>{
            if(each.subscriptionType==="Basic"){
                date=date+90;
            } else if(each.subscriptionType==="Standard"){
                date=date+180;
            } else{
                date=date+365;
            }
            return date;
        };
        if(GetDateInDays(each.returnDate)>CurrentDate ||GetSubscriptionType(GetDateInDays(each.subscriptionDate))<CurrentDate){
            return {
                ...each,
            };
        }
    });
    const BooksWithFine=books.filter((each)=>{
        let comp=UserWithFine.map((eacj)=>{
            if(each.id===eacj.issuedBook)
            console.log(each.id)
            return each;
        });
        return comp;
    })
    return res.status(200).json({
        success:true,
        ...BooksWithFine, // return books
    });
});

module.exports=router;