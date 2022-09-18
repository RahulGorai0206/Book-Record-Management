const express=require("express");
const { GetAllUsers, GetUserById, DeleteUser, UpdateUser, CreateNewUser, GetSubcriptionDetails } = require("../controllers/users.controller");
const{users}=require("../data/users.json");
const router=express.Router(); // import router funtion to use as a router




/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Paramerers: None
 */

 router.get("/",GetAllUsers);
/**
 * Route: /users/id
 * Method: GET
 * Description: Get single users by id
 * Access: Public
 * Paramerers: id
 */
 router.get("/:id",GetUserById);
/**
 * Route: /users/
 * Method: POST
 * Description: Create user
 * Access: Public
 * Paramerers: none
 */
 router.post("/",CreateNewUser);
/**
 * Route: /users/:id
 * Method: PUT
 * Description: Update user
 * Access: Public
 * Paramerers: id
 */
 router.put("/:id",UpdateUser);
/**
 * Route: /users/:id
 * Method: PUT
 * Description: Delete user by id
 * Access: Public
 * Paramerers: id
 */
router.delete('/:id',DeleteUser);
/**
 * Route: /users/subcription-details/id
 * Method: GET
 * Description: Get subcription details
 * Access: Public
 * Paramerers: id
 */
router.get('/subcription-details/:id',GetSubcriptionDetails);


module.exports=router;