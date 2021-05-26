
if (!cache) window.location.href = "/"

document.getElementById('account-name').innerHTML = cache.data.first_name + ' ' + cache.data.last_name

const userTxt = document.getElementById('user-message-form')
const emojiWrapper = document.getElementById('emojis-wrapper')
const emojiIcon = document.getElementById('emoji')

const MESSAGE_URL = '/api/v1/message'

const chatWrapper = document.getElementById('chat-wrapper')

// contact message element
const contactMessageWrapper = document.createElement('div')
contactMessageWrapper.className = 'contact-message-wrapper'
const contactMessageBox = document.createElement('div')
contactMessageBox.className = 'contact-message-box'
const contactMessageBoxP = document.createElement('p')
contactMessageBoxP.className = 'contact-message-box-p'
const contactProfile = document.createElement('div')
contactProfile.className = 'contact-message-profile'

// own message element
const messageWrapper = document.createElement('div')
messageWrapper.className = 'message-wrapper'
const messageBox = document.createElement('div')
messageBox.className = 'message-box'
const messageBoxP = document.createElement('p')
messageBoxP.className = 'message-box-p'
const profile = document.createElement('div')
profile.className = 'message-profile'

const getContactMessage = value => {
    let contactMessageWrapperClone = contactMessageWrapper.cloneNode(true)
    let contactMessageBoxClone = contactMessageBox.cloneNode(true)
    let contactMessageBoxPClone = contactMessageBoxP.cloneNode(true)
    let contactProfileClone = contactProfile.cloneNode(true)
    contactProfileClone.style.backgroundColor = value.user.favorite_color

    contactMessageWrapperClone.appendChild(contactProfileClone)
    contactMessageWrapperClone.appendChild(contactMessageBoxClone)
    contactMessageBoxClone.appendChild(contactMessageBoxPClone)

    contactProfileClone.textContent = value.user.first_name.charAt(0)
    contactMessageBoxPClone.textContent = value.msg

    return contactMessageWrapperClone
}

const getOwnMessage = value => {
    let messageWrapperClone = messageWrapper.cloneNode(true)
    let messageBoxClone = messageBox.cloneNode(true)
    let messageBoxPClone = messageBoxP.cloneNode(true)
    let profileClone = profile.cloneNode(true)
    profileClone.style.backgroundColor = value.user.favorite_color

    messageWrapperClone.appendChild(messageBoxClone)
    messageWrapperClone.appendChild(profileClone)
    messageBoxClone.appendChild(messageBoxPClone)
    chatWrapper.appendChild(messageWrapperClone)

    profileClone.textContent = value.user.first_name.charAt(0)
    messageBoxPClone.innerHTML = value.msg

    return messageWrapperClone
}


setInterval(async () => {
    await getMessage(false)
}, 1000);

async function getMessage(isScroll = true) {
    const { data } = await axios.get(MESSAGE_URL)

    const chatDashboard = document.getElementById('chat-dashboard')

    if (chatWrapper) chatWrapper.removeChild(chatDashboard)

    const chatElement = document.createElement('span')
    chatElement.setAttribute('id', 'chat-dashboard')
    data.forEach(item => {
        if (item.user_id === cache.data.id) {
            chatElement.appendChild(getOwnMessage(item))
        } else {
            chatElement.appendChild(getContactMessage(item))
        }
    });
    chatWrapper.appendChild(chatElement)

    if (isScroll) chatWrapper.scrollTop = 9999999999
}

getMessage()

async function sendMessage () {
    if (userTxt.value.trim()) {
        const payload = {
            msg: userTxt.value,
            user_id: cache.data.id
        }

        try {
            await axios.post(MESSAGE_URL, payload)
            userTxt.value = ''
            await getMessage()
        } catch (error) {
            alert('Opp, Something went wrong!!!')
        }

        emojiWrapper.className = 'emojis-wrapper'
        emojiIcon.style.color = '#a4b0be' 
    }
}

function emojiWindow () {
  if (emojiWrapper.className == 'emojis-wrapper'){
    emojiIcon.style.color = '#747d8c' 
    emojiWrapper.className = 'close-emoji-wrapper'
  } else if (emojiWrapper.className == 'close-emoji-wrapper'){
    emojiIcon.style.color = '#a4b0be' 
    emojiWrapper.className = 'emojis-wrapper'
  }  
}

function insertEmoji (emojiCode) {
    
    if (emojiCode == 1) {
        userTxt.value+= '\u{1F600}'
    } else if (emojiCode == 2) {
        userTxt.value+= '\u{1F604}'
    } else if (emojiCode == 3) {
        userTxt.value+= '\u{1F605}'
    } else if (emojiCode == 4) {
        userTxt.value+= '\u{1F602}'
    } else if (emojiCode == 5) {
        userTxt.value+= '\u{1F609}'
    } else if (emojiCode == 6) {
        userTxt.value+= '\u{1F618}'
    } else if (emojiCode == 7) {
        userTxt.value+= '\u{1F620}'
    } else if (emojiCode == 8) {
        userTxt.value+= '\u{1F49B}'
    } else if (emojiCode == 9) {
        userTxt.value+= '\u{1F44D}'
    } else if (emojiCode == 10) {
        userTxt.value+= '\u{1F44E}'
    }

}

// key enter
userTxt.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        sendMessage()
    }
})

// Logout
const logout = () => {
    resetCachedUser()
    window.location.href = "/"
}
   