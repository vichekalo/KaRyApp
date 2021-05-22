// ------------------***********************  LOGIN  **********************----------------------------------
<<<<<<< HEAD
// const express = require('express');
// const app = express();
=======
const express = require('express');
const app = express();
>>>>>>> b1028f60cb9077d929b17be40ddb0c972bebb039

// code will work with port 5000
// app.listen(process.env.PORT || 5000,() => console.log('server running'))
// app.use(express.json());
// app.use(express.urlencoded())

//list of users and password for login.
<<<<<<< HEAD
// let users = [
//     {username:"VichVich",password:"0101"},
//     {username:"Nary ",password:"0202"},
//     {username:"Kun",password:"168"},
// ];

=======
let users = [
    {username:"SandVich",password:"0101"},
    {username:"Nary ",password:"0202"},
    {username:"Kun",password:"168"},
];
>>>>>>> b1028f60cb9077d929b17be40ddb0c972bebb039
// app.get('/login',(req,res)=>res.send(users));

// app.get("/login", (req, res) => {

    // to get the username and password from the query of the request.
    // let Username = req.query.username;
    // let Password = req.query.password;
    // const condition = false;

    // Check user and password if valid return true otherwise return false.
//     for (let user of users){
//         if (user.username === Username && user.password === Password){
//             condition = true;
//         }
//     }
//     res.send(condition);
// });
// app.use(express.static('public')); 

// 
const{getColorOf, getPriceOf, load} = require('./app')
load();
console.log("mango color is :" + getColorOf("mango"));
console.log("banana price is :" + getPriceOf("banana")); 

