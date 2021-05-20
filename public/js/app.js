// const { response } = require("express");

function login(e){
    e.preventDefault();
    ////
    let url="http://localhost:5000/login";
    axios
    .get(url)
    .then((response)=>{
        let isValid=response.data;
        let text="Try Again !!!"
        let color="red";
        if (isValid===true){
            text="Welcome To Our APP";
            color="green";
        }
        message.textContent=text;
        message.style.color=color;
    });
}

//Main-------------------------------------------
let message=document.querySelector(".message");
let userName=document.querySelector('#username');
let passWord=document.querySelector('#password');
let btnLogin=document.querySelector("#login");
btnLogin.addEventListener('click',login);
