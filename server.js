// ------------------***********************  LOGIN  **********************----------------------------------
// TODO: Create a server.
const express = require('express');
const app = express();

// code will work with port 5000
app.listen(process.env.PORT || 5000,() => console.log('server running'))

app.use(express.json());
app.use(express.urlencoded())
//list of users and password for login.
let users = [
    {username:"VichVich",password:"0101"},
    {username:"Nary ",password:"0202"},
    {username:"Kun",password:"168"},
];
// app.get('/login',(req,res)=>res.send(users));
app.get("/login", (req,res) => {
    // to get the username and password from the query of the request.
    let Username = req.query.username;
    let Password = req.query.password;
    let condition = false;
    // Check user and password if valid return true otherwise return false.
    for (let user of users){
        if (user.username === Username && user.password === Password){
            condition = true;
        }
    };
    res.send(condition);
});
app.use(express.static('public')); 
