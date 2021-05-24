const fs = require('fs');
const DB_PART = 'public/db/db.json'
const CHAT_DB = (JSON.parse(fs.readFileSync(DB_PART)));
const USERS = CHAT_DB.users
const MESSAGES = CHAT_DB.messages

const express = require('express')
const app = express()
const PORT = 5000

app.listen(process.env.PORT || PORT, () => console.log("Server starting..."))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))

// Write file db
const writeFile = (value) => {
    fs.writeFile(DB_PART ,JSON.stringify(value), function(err) {
        if(err) throw err;
    })
}

// Login
app.post('/api/v1/login', (req, res) => {
    const USERNAME = req.body.username
    const PASSWORD = req.body.password
    let index = -1

    USERS.forEach((user, i) => {
        if (user.username === USERNAME && user.password === PASSWORD) {
            index = i
        }
    });

    let response = {
        data: null,
        status: {
            errorCode: 0,
            errorMessage: ''
        }
    }
    
    if (index >= 0) {
        response.data = USERS[index]
        res.send(response)
    } else {
        response.status.errorMessage = 'Inconnect username and password'
        response.status.errorCode = 10
        res.status(400)
        res.send(response)
    }
})
