const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const PORT = 8000;
//using middleware
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    fs.appendFile("log.txt",`\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`,(err,data)=>{
        next();
    });
});
// routes
app.get('/users', (req,res)=>{
    const html = `
      <ul>
      ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
      </ul>
    `;
    return res.send(html);
});

app.get('/api/users', (req,res)=>{
    return res.json(users);
});


app.route('/api/users/:id').get((req,res)=>{
    const id= Number(req.params.id);
    const user = users.find((user)=>user.id===id);
    return res.json(user);
}).put((req,res)=>{
   return  res.json({status: "update pending"});
}).delete((req,res)=>{
    return  res.json({status: "delete pending"});
 });

/*app.get('/api/users/:id', (req,res)=>{
    const id= Number(req.params.id);
    const user = users.find((user)=>user.id===id);
    return res.json(user);
});*/

app.post('/api/users', (req,res)=>{
    const body= req.body;
    users.push({...body,id : users.length + 1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status:"success",id: users.length+1});
    });
});

/*app.patch('/api/users/:id', (req,res)=>{
    //TODO: create user
    res.json({status: "pending"});
});

app.delete('api/users/:id', (req,res)=>{
    res.json({status: "pending"});
});
*/


app.listen(PORT, ()=> console.log(`server started at port ${PORT}`));