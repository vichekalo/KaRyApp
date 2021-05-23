
//show when we click on login bnt
function showlogin(){
    let x=document.querySelector('.feature3');
    if (window.getComputedStyle(x).display==="none"){
        x.style.display='block'
    }
}
let btnlogin=document.querySelector('.log');
btnlogin.addEventListener('click',showlogin);


