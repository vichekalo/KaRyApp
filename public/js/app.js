//show when we click on login bnt
function showlogin(){
    let x=document.querySelector('.feature3');
    if (window.getComputedStyle(x).display==="none"){
        x.style.display='block'
    }
}
let btnlogin=document.querySelector('.log');
btnlogin.addEventListener('click',showlogin);
















// function login(e){
//     e.preventDefault();
//     ////
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
