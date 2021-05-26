
if (cache) window.location.href = "/view/chat"

const LOGIN_URL = '/api/v1/login'
const REGISTER_URL = '/api/v1/register'

const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const username = document.getElementById('username')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword')

async function login () {
    const uname = username.value
    const pass = password.value

    if (!uname || !pass) return alert('Field required!!')

    const payload = {
        username: uname,
        password: pass
    }

    try {
        const { data } = await axios.post(LOGIN_URL, payload)
    
        setCachedUser(data)
        window.location.href = "/view/chat"
    } catch (err) {
        alert('Incorrect username and password')
    }
}

async function register () {
    const fname = firstname.value
    const lname = lastname.value
    const uname = username.value
    const pass = password.value
    const conPass = confirmPassword.value

    if (!fname || !lname || !uname || !pass || !conPass) return alert('Field required!!')

    if (pass !== conPass) return alert('Confirm password does not match with a new password')

    const payload = {
        firstname: fname,
        lastname: lname,
        username: uname,
        password: pass
    }

    try {
        const { data } = await axios.post(REGISTER_URL, payload)
    
        setCachedUser(data)
        window.location.href = "/view/chat"
    } catch (err) {
        alert('Opp, Something went wrong!!!')
    }
}

