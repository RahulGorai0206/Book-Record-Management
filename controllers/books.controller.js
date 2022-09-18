const {BookModel,UserModel}=require("../models");
const IssuedBook=require("../dtos/book-dto");

exports.GetAllBooks=async(req,res)=>{// async await due to delay
    const books=await BookModel.find(); // get all the books
    if(books.length===0)
        res.status(404).json({
            success: false,
            message:"No book found", // get the all books 
        });
    res.status(200).json({
        success: true,
        data:books, // get the all books 
    });
};
exports.GetBookById=async (req,res)=>{ 
    const {id}=req.params;
    const book=await BookModel.findById(id); // search by id and save it on book variable
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
}
exports.GetAllIssuedBooks=async(req,res)=>{
    const users= await UserModel.find({
        issuedBook:{$exists:true}, // filter the users who have this field 
    }).populate("issuedBook"); // get the book data by the id and add thr details of the book in issuedBook key(FOR NOW WE ARE NOT USING IT)

    const issuedBooks=users.map((each)=>new IssuedBook(each));

    if(issuedBooks.length===0) // check the lenth if its empty or not
        return res.status(404).json({
            success: false,
            message:"No Book Issued Yet",
        });
    
    return res.status(200).json({
        success:true,
        data:issuedBooks, // return issued books
    });
};
exports.AddNewBook=async(req,res)=>{
    const {data}=req.body;
    if(!data){
        return res.status(404).json({
            success: false,
            message:"No Data Recived", // for no data thing
        });
    }
    await BookModel.create(data); // Create data
    const AllBooks=await BookModel.find();

    return res.status(200).json({
        success:true,
        data:AllBooks, // return books
    });
};
exports.UpdateBookById=async(req,res)=>{
    const {id}=req.params; // get the id
    const {data}=req.body; // get the data
    const UpdatedBook=await BookModel.findOneAndUpdate({
        _id:id,
    },data,{
        new:true, // for getting the new data after updating
    });
    return res.status(200).json({
        success:true,
        data:UpdatedBook, // return books
    });
};