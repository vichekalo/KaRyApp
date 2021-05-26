
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const express = require('express')

const DB_PART = './public/db/db.json'
const CHAT_DB = (JSON.parse(fs.readFileSync(DB_PART)));
const USERS = CHAT_DB.users
const MESSAGES = CHAT_DB.messages

const app = express()
const PORT = 5000

app.listen(process.env.PORT || PORT, () => console.log("Server starting..."))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))

// Get new message id
const getNewMsgId = () => {
    let id = MESSAGES.length > 0 ? MESSAGES[0].id : 0

    MESSAGES.forEach(item => {
        id = id < item.id ? item.id : id
    })

    return id + 1
}

// Write file db
const writeFile = (value) => {
    fs.writeFile(DB_PART ,JSON.stringify(value), function(err) {
        if (err) throw err;
    })
}

// get generate color
const getColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16)
    
    return randomColor
}

// Get all message from db
app.get('/api/v1/message', (_, res) => {
    let chats = []
    MESSAGES.forEach(msg => {
        let user
        let message = msg
        USERS.forEach(item => {
            if (item.id === message.user_id) {
                user = item
            }
        });
        message.user = user
        chats.push(message)
    });
    res.send(chats)
})

// Create a new message
app.post('/api/v1/message', (req, res) => {
    let message = {
        id: getNewMsgId(),
        user_id: req.body.user_id,
        msg: req.body.msg
    }

    const chats = CHAT_DB
    chats.messages.push(message)

    writeFile(chats)

    MESSAGES.forEach((element, i) => {
        if (message.id === element.id) {
            res.send(MESSAGES[i])
        }
    });
})

// Update existing message
app.put('/api/v1/message/:id', (req, res) => {
    const messageId = req.params.id
    let messages = MESSAGES
    let index = -1
    MESSAGES.forEach((element, i) => {
        if (Number(messageId) === element.id) {
            index = i
            messages[i].msg = req.body.msg

            const chats = CHAT_DB
            chats.messages = messages

            writeFile(chats)
        }
    });

    if (index >= 0) { 
        res.send(MESSAGES[index])
    } else {
        res.status(404)
        res.send({
            error: 'ID ' + messageId + ': not found!!!'
        })
    }
})

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

app.post('/api/v1/register', (req, res) => {
    const user = {
        id: uuidv4(),
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        favorite_color: getColor(),
        username: req.body.username,
        password: req.body.password
    }

    let response = {
        data: null,
        status: {
            errorCode: 0,
            errorMessage: ''
        }
    }

    let index = -1

    const chats = CHAT_DB
    chats.users.push(user)

    writeFile(chats)

    chats.users.forEach((element, i) => {
        if (user.id === element.id) {
            index = i
        }
    });

    if (index >= 0) {
        response.data = USERS[index]
        res.send(response)
    } else {
        response.status.errorMessage = 'Cannot Register for now!!!'
        response.status.errorCode = 10
        res.status(400)
        res.send(response)
    }
})
