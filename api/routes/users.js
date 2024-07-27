const express = require('express');
const { upadteUser, deleteUser, getUser, getUsers } = require('../controllers/user');
const {verifyToken,verifyUser,verifyAdmin} = require('../utils/verifyToken.js');
const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send("Hello user, you are logged in");
// });

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send("Hello user, you are logged in and authorized to delete");
// });  
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send("Hello user, you are logged in and you can  delete all account");
// });  
router.get('/',getUsers)
//update
router.put('/:id',verifyUser,upadteUser)
//delete
//verifyadmin in last 2 
router.delete('/:id',deleteUser)
//get
router.get('/:id',getUser)
//get all


module.exports=router