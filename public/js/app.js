// --------------------------------***********  LOG IN  **********------------------------------
function displayUser(respone){
    console.log(respone.data);
    let users = respone.data;
    let userList = document.querySelector('.user-list');
    let ul = document.querySelector('ul');
    if (ul !== null){
        ul.remove();
    }
    const newUl = document.createElement('ul');
    for (let user of users){
        const li = document.createElement('li');
        li.textContent = "userid: " + user.id + " " + user.username + " " + user.password;
        newUl.appendChild(li);
        userList.appendChild(newUl);
    }
}

function save(event){
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;


    let user = {username: username, password: password}
    const url = "http://localhost:5000/api/users";
    axios
    .post(url, user)
    .then(displayUser)
}

function deleteUser(){
    
}

function updateUser(){

}

function loadData(){
    const url = "http://localhost:5000/api/users";
    axios
    .get()
    .then(displayUser)
}

const saveUser = document.querySelector("#save");
saveUser.addEventListener('click', save);
loadData();


