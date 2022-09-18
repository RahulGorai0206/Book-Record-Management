const e = require("express");
const express=require("express");
const{books}=require("../data/books.json"); // importing books data
const{users}=require("../data/users.json"); // importing users data
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
        data:books, // get the all books 
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
    const book=books.find((each)=>each.id===id); // search by id and save it on book variable
    if(!book){
        return res.status(404).json({
            success:false,
            message: "Book not found"
        });
    }else{
        res.status(200).json({
            success: true,
            data: book, // get the book by id
        });
    };
});
/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get books that all issued
 * Access: Public
 * Paramerers: none
 */
 router.get("/issued/by-user",(req,res)=>{
    const UserWithBooks=users.filter((each)=>{ // filter the user that have issued books and save in a variable
        if(each.issuedBook) return each;
    });
    const issuedBooks=[];
    UserWithBooks.forEach((each)=>{
        const book=books.find((book)=>book.id===each.issuedBook); // get the book by their id
        book.IssuedBy=each.name; // add some extra parameters
        book.IssuedDate=each.issuedDate;
        book.ReturnDate=each.returnDate;
        issuedBooks.push(book); // save it to book variable
    });

    if(issuedBooks.length===0) // check the lenth if its empty or not
        return res.status(404).json({
            success: false,
            message:"No Book Issued Yet",
        });
    
    return res.status(200).json({
        success:true,
        data:issuedBooks, // return issued books
    });
});
/**
 * Route: /books
 * Method: POST
 * Description: Create new book
 * Access: Public
 * Paramerers: none
 * Data : author, name, genre, price, publisher, id
 */
router.post('/',(req,res)=>{
    const {data}=req.body;
    if(!data){
        return res.status(404).json({
            success: false,
            message:"No Data Recived", // for no data thing
        });
    }
    const book=books.find((each)=>each.id===data.id); // match the id
    if(book){
        return res.status(404).json({
            success:false,
            message: "Book id already exist", // for exiting book id
        });
    }

    const AllBooks=[...books,data];
    return res.status(200).json({
        success:true,
        data:AllBooks, // return books
    });
});
/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update book details
 * Access: Public
 * Paramerers: id
 * Data : author, name, genre, price, publisher, id
 */
router.put('/:id',(req,res)=>{
    const {id}=req.params; // get the id
    const {data}=req.body; // get the data
    const UpdateBook=books.find((each)=>each.id===id); // get the book on thr basis of id
    if(!UpdateBook){
        return res.status(404).json({
            success: false,
            message:"No book found on this id", // for no data thing
        });
    }
    const UpdateData=books.map((each)=>{
        if(each.id===id){
            return{...each, ...data}; // updating the data
        }
        return each;
    });
    return res.status(200).json({
        success:true,
        data:UpdateData, // return books
    });
});
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