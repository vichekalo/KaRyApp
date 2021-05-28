// If cache or 'right conditions' user can access to chat file
if (cache) window.location.href = "/view/chat"
// create veriable for store API to request DATA
const LOGIN_URL = '/api/v1/login'
const REGISTER_URL = '/api/v1/register'
// create veriable for getElement from register file
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const username = document.getElementById('username')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword')

async function login () {
    const uname = username.value
    const pass = password.value
    // if user doesn't complete username and password will alert message 
    if (!uname || !pass) return alert('Field required!!')
    // create veriable object keyword username store uname and password store pass
    const payload = {
        username: uname,
        password: pass
    }
// async-await if the function when we want to request data from database that acceses to network or API, 
//we need to wait 2,3s , and the waiting not specific
    try {
        // request data from API 
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

    // if password and confirmPassword difference will alert message below
    if (pass !== conPass) return alert('Confirm password does not match with a new password')

    const payload = {
        firstname: fname,
        lastname: lname,
        username: uname,
        password: pass
    }

    try {
        const { data } = await axios.post(REGISTER_URL, payload)
        //consol.log(data.data)
        setCachedUser(data)
        window.location.href = "/view/chat"
    } catch (err) {
        alert('Opp, Something went wrong!!!')
    }
}

