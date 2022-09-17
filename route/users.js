const express=require("express");
const{users}=require("../data/users.json");
const router=express.Router(); // import router funtion to use as a router



/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Paramerers: None
 */

 router.get("/",(req,res)=>{
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
 router.get("/:id",(req,res)=>{
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
 router.post("/",(req,res)=>{
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
/**
 * Route: /users/:id
 * Method: PUT
 * Description: Update user
 * Access: Public
 * Paramerers: id
 */
 router.put("/:id",(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message: "user not found"
        });
    }else{
        const UpdateData=users.map((each)=>{ // map through all the data
            if(each.id==id){
                return{
                    ...each,
                    ...data,
                };
            }
            return each;
        })
        res.status(200).json({
            success: true,
            data: UpdateData,
        });
    };
});
/**
 * Route: /users/:id
 * Method: PUT
 * Description: Delete user by id
 * Access: Public
 * Paramerers: id
 */
router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        });
    }
    const index=users.indexOf(user)
    users.splice(index,1);
    return res.status(200).json({
        success:true,
        data:users
    });

});
/**
 * Route: /users/subcription-details/id
 * Method: GET
 * Description: Get subcription details
 * Access: Public
 * Paramerers: id
 */
router.get('/subcription-details/:id',(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not foundddd"
        });
    }
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
    const GetSubscriptionType=(date)=>{
        if(user.subscriptionType==="Basic"){
            date=date+90;
        } else if(user.subscriptionType==="Standard"){
            date=date+180;
        } else{
            date=date+365;
        }
        return date;
    };
    let ReturnDate=GetDateInDays(user.returnDate);
    let CurrentDate=GetDateInDays();
    let SubscriptionDate=GetDateInDays(user.subscriptionDate);
    let SubscriptionExpired=GetSubscriptionType(SubscriptionDate);
    const data={
        ...user,
        subscriptionExpired:SubscriptionExpired<CurrentDate,
        daysLeftForExpiration:SubscriptionExpired<=CurrentDate ?0:SubscriptionExpired-CurrentDate,
        fine: ReturnDate>CurrentDate && SubscriptionExpired<=CurrentDate?200
        :SubscriptionExpired<CurrentDate? 100
        :ReturnDate>CurrentDate? 100
        :0,
    };
    console.log(ReturnDate);
    console.log(CurrentDate);
    console.log(SubscriptionDate);
    console.log(SubscriptionExpired);
    return res.status(200).json({
        success:true,
        data,
    });

});


module.exports=router;