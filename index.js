const express=require("express");
const{users}=require("./data/users.json"); // importing data


const app =express();
const port=8080; // http://localhost:8080/

app.use(express.json());

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Paramerers: None
 */

app.get("/users",(req,res)=>{
    res.status(200).json({
        success: true,
        data:users,
    });
});
/**
 * Route: /users/id
 * Method: GET
 * Description: Get single users by id
 * Access: Public
 * Paramerers: id
 */
 app.get("/users/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message: "user not found"
        });
    }else{
        res.status(200).json({
            success: true,
            data: user,
        });
    };
});
/**
 * Route: /users/
 * Method: POST
 * Description: Create user
 * Access: Public
 * Paramerers: none
 */
 app.post("/users/",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate}=req.body;
    const user=users.find((each)=>each.id===id);
    if(user){
        return res.status(404).json({
            success:false,
            message: "user already present"
        });

    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionDate,
        subscriptionType
    });
    return res.status(201).json({
        success: true,
        data: users,
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
