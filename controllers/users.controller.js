const {BookModel,UserModel}=require("../models");



exports.GetAllUsers=async(req,res)=>{
    const users=await UserModel.find();
    if(users.length===0){
        res.status(404).json({
            success:true,
            message:"No User Found"
        });
    }
    res.status(200).json({
        success: true,
        data:users,
    });
};
exports.GetUserById=async(req,res)=>{
    const {id}=req.params;
    const user=await UserModel.findById(id);
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
};
exports.UpdateUser=async(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const user=await UserModel.findOneAndUpdate({
        _id:id,
    },
    {
        $set:{
            ...data, // another method of updating the data
        }
    },
    {
        new:true,
    }
    );
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
    }
};
exports.CreateNewUser=async(req,res)=>{
    const {data}=req.body;
    const newuser= await UserModel.create(data);
    return res.status(201).json({
        success: true,
        data: newuser,
    });
};
exports.DeleteUser=async(req,res)=>{
    const {id}=req.params;
    const user=await UserModel.deleteOne({
        _id:id,
    });

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Deleted Successfully"
    });

};
exports.GetSubcriptionDetails=async(req,res)=>{
    const {id}=req.params;
    const user=await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
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
        ...user._doc,
        subscriptionExpired:SubscriptionExpired<CurrentDate,
        daysLeftForExpiration:SubscriptionExpired<=CurrentDate ?0:SubscriptionExpired-CurrentDate,
        fine: ReturnDate>CurrentDate && SubscriptionExpired<=CurrentDate?200
        :SubscriptionExpired<CurrentDate? 100
        :ReturnDate>CurrentDate? 100
        :0,
    };
    return res.status(200).json({
        success:true,
        data,
    });

};