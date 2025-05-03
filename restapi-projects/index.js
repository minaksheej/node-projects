//const users = require('./MOCK_DATA.json');
const express = require('express');
const {connectMongoDB} = require('./connection');


const userRouter = require('./routes/user');

const {logReqRes} = require('./middlewares');

const app = express();
const PORT = 8000;


//connection to mongoDB
connectMongoDB('mongodb://127.0.0.1:27017/youtube-app-1').then(()=>{
    console.log("MongoDB Connected!")
});

//using middleware
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));

//Router
app.use('/api/user',userRouter);

app.listen(PORT, ()=> console.log(`server started at port ${PORT}`));
/* routes
app.get('/users', async (req,res)=>{
    const allDbUsers = await User.find({});
    const html = `
      <ul>
      ${allDbUsers.map((user)=> `<li>${user.first_name} - ${user.email} </li>`).join("")}
      </ul>
    `;
    return res.send(html);
});
*/


/*app.patch('/api/users/:id', (req,res)=>{
    //TODO: create user
    res.json({status: "pending"});
});

app.delete('api/users/:id', (req,res)=>{
    res.json({status: "pending"});
});
*/

