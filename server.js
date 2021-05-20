// LOGIN
const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();

app.listen(process.env.PORT || 5000, () => console.log("server runnig"))
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());


let users = [{
    username: "kaka",
    password: "1"
}, {
    username: "nary",
    password: "12"
}, {
    username: "rady",
    password: "123"
}];

app.get('/api/users', (req, res) => res.send(users));

app.post('/api/users', (req, res) => {
    console.log(req.body);
    if (!req.body.password) {

        res.status(400)
        return res.send({ error: "Password Required" })
    }
    let user = {
        id: users.length + 1,
        username: req.body.username,
        password: req.body.password,
    };
    users.push(user);
    res.send(users);
});
// --------------- delete ------------------
app.delete('/api/users/:id', (req, res) => {
    let id = req.params.id;
    console.log(username, password)
    let index = -1;

    for (let user of users){
        if (user.id === parseInt(id)){
            index = user.id - 1;
        }
    }
    if (index >= 0){
        let user = users[index];
        users.splice(index, 1);
        res.send(user);
    }else{
        res.status(404);
        res.send({error: " not valid user id"})
    }
})

// ----------------------- put --------------------------------
app.put('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password)
    let index = -1;

    for (let user of users){
        if (user.id=== parseInt(id)){
            index = user.id - 1;
        }
    }
    if (index >= 0){
        let user = users[index];
        user.username = username;
        user.password = password;
        users.splice(index, 1);
        res.send(user);
    }else{
        res.status(404);
        res.send({error: " not valid user id"})
    }
})