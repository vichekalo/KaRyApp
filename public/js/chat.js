
if (!cache) window.location.href = "/view/login"

document.getElementById('account-name').innerHTML = cache.data.first_name + ' ' + cache.data.last_name

const userTxt = document.getElementById('user-message-form')
const emojiWrapper = document.getElementById('emojis-wrapper')
const emojiIcon = document.getElementById('emoji')

const MESSAGE_URL = "http://localhost:5000/api/v1/message"

const chatWrapper = document.getElementById('chat-wrapper')

// Logout
const logout = () => {
    resetCachedUser()
    window.location.href = "/view/login"
}
   