const express = require('express');
const router = express.Router();
const {handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser,} = require('../controllers/Users');


router.route("/")
.get(handleGetAllUsers)
.post(handleCreateUser);


router.route("/:id").
get(handleGetUserById).
patch(handleUpdateUserById).
delete(handleDeleteUserById);

/*app.get('/api/users/:id', (req,res)=>{
    const id= Number(req.params.id);
    const user = users.find((user)=>user.id===id);
    return res.json(user);
});*/


module.exports=router;



/* users.push({...body,id : users.length + 1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status:"success",id: users.length+1});
    });
    */