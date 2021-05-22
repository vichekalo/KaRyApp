<<<<<<< HEAD
// //show when we click on login bnt
// function showlogin(){
//     let x=document.querySelector('.feature3');
//     if (window.getComputedStyle(x).display==="none"){
//         x.style.display='block'
//     }
// }
// let btnlogin=document.querySelector('.log');
// btnlogin.addEventListener('click',showlogin);
=======
<<<<<<< HEAD
const fs= require('fs');

//show when we click on login bnt
// function showlogin(){
//     let x = document.querySelector('.feature3');
//     if (window.getComputedStyle(x).display === "none"){
//         x.style.display = 'block'
//     }
// }
// let btnlogin = document.querySelector('.log');
// btnlogin.addEventListener('click', showlogin);
=======
//show when we click on login bnt
function showlogin(){
    let x=document.querySelector('.feature3');
    if (window.getComputedStyle(x).display==="none"){
        x.style.display='block'
    }
}
let btnlogin=document.querySelector('.log');
btnlogin.addEventListener('click',showlogin);



>>>>>>> 3a991456090317086ad1a2e19f7e5c2f4b22a325

// //////////////////////////////////////


>>>>>>> b1028f60cb9077d929b17be40ddb0c972bebb039

// function login(e){
//     e.preventDefault();
    ////
//     let url="http://localhost:5000/login";
//     axios
//     .get(url)
//     .then((response) => {
//         const isValid = response.data;
//         const text = "Try Again !!!"
//         const color = "red";
//         if (isValid === true){
//             text = "Welcome To Our APP";
//             color = "green";
//         }
//         message.textContent = text;
//         message.style.color = color;
//     });
// }

// // Main-------------------------------------------
// let message = document.querySelector(".message");
// let userName = document.querySelector('#username');
// let passWord = document.querySelector('#password');
// let btnLogin = document.querySelector("#login");
// btnLogin.addEventListener('click',login);

// fruit

let fruitList = [];

function addFruit(fruitName,color,price){
    let dic = {}
    dic.name = fruitName;
    dic.color = color;
    dic.price = price;
    fruitList.push(dic);
    console.log("fruit added:"+dic.name);
}

function getColorOf(fruitName){
    for( dic of fruitList){
        if(dic.name === fruitName){
            return dic.color;
        }
    }
    return null
}
function getPriceOf(fruitName){
    for( dic of fruitList){
        if(dic.name === fruitName){
            return dic.price;
        }
    }
    return null
}


function listFruits(){
    let result = "Here is the fruit: \n";
    for (let dic of fruitList){
        console.log(dic.name+"\n");
    }
}

let save =() =>{
    fs.writeFileSync("users.json",JSON.stringify(fruitList));
}
let load =() =>{
    fruitList=JSON.parse(fs.readFileSync('users.json'));
}

module.exports ={
    getColorOf,
    getPriceOf,
    load
}


// {"users":[{"id":1,"first_name":"Adam","last_name":"Mini","favorite_color":"#ccc","username":"admin","password":"admin"},{"id":2,"first_name":"Sora","last_name":"KH","favorite_color":"#eee","username":"sorakh","password":"sorakh"}],"messages":[{"id":1,"user_id":1,"msg":"Hello World","user":{"id":1,"first_name":"Adam","last_name":"Mini","favorite_color":"#ccc","username":"admin","password":"admin"}},{"id":2,"user_id":1,"msg":"admin","user":{"id":1,"first_name":"Adam","last_name":"Mini","favorite_color":"#ccc","username":"admin","password":"admin"}},{"id":3,"user_id":2,"msg":"admin","user":{"id":2,"first_name":"Sora","last_name":"KH","favorite_color":"#eee","username":"sorakh","password":"sorakh"}},{"id":4,"user_id":2,"msg":"This is sorakh","user":{"id":2,"first_name":"Sora","last_name":"KH","favorite_color":"#eee","username":"sorakh","password":"sorakh"}}]}
