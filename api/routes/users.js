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

//update
router.put('/:id',verifyUser,upadteUser)
//delete
router.delete('/:id',verifyAdmin,deleteUser)
//get
router.get('/:id',verifyAdmin,getUser)
//get all
router.get('/',verifyAdmin,getUsers)

module.exports=router