// whole logic for connecting to database
const mongoose=require("mongoose");
function DbConnection(){
const DB_URL=process.env.MONGO_URI;
mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
const db=mongoose.connection; // store the database connection status
db.on("error",console.error.bind(console,"Connection error: ")) // to show the error
db.once("open",function(){ // for successfull connection
    console.log("\nDataBase Connected\n");
});
};
module.exports= DbConnection;