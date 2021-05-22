
if (cache) window.location.href = "/view/chat"

const LOGIN_URL = 'http://localhost:5000/api/v1/login'

var usernameTextfield = document.getElementById('username')
var passwordextfield = document.getElementById('password')

async function login () {
    const uname = usernameTextfield.value
    const pass = passwordextfield.value

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

