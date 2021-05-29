
if (!cache) window.location.href = "/" 

document.getElementById('account-name').innerHTML = cache.data.first_name + ' ' + cache.data.last_name

const userTxt = document.getElementById('user-message-form')
const emojiWrapper = document.getElementById('emojis-wrapper')
const emojiIcon = document.getElementById('emoji')

const MESSAGE_URL = '/api/v1/message'
var isBold = false
var isItalic = false

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

// sound
let getsound = document.querySelector(".myAudio")

// get contact message
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

    // bold and italic
    if (value.isBold && value.isItalic) {
        contactMessageBoxPClone.innerHTML = value.msg.bold().italics()
    } else if (value.isItalic) {
        contactMessageBoxPClone.innerHTML = value.msg.italics()
    } else if (value.isBold) {
        contactMessageBoxPClone.innerHTML = value.msg.bold()
    } else {
        contactMessageBoxPClone.innerHTML = value.msg
    }

    return contactMessageWrapperClone
    // play sound
    getsound.play();
}

// get own message
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

    // bold and italic
    if (value.isBold && value.isItalic) {
        messageBoxPClone.innerHTML = value.msg.bold().italics()
    } else if (value.isItalic) {
        messageBoxPClone.innerHTML = value.msg.italics()
    } else if (value.isBold) {
        messageBoxPClone.innerHTML = value.msg.bold()
    } else {
        messageBoxPClone.innerHTML = value.msg
    }

    return messageWrapperClone
}


setInterval(async () => {
    await getMessage(false)
}, 1000);

// get all message
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

// send message
async function sendMessage () {
    // play sound
    getsound.play();
    if (userTxt.value.trim()) {
        

        const payload = {
            msg: userTxt.value,
            user_id: cache.data.id,
            isBold: isBold,
            isItalic: isItalic
        }

        try {
            await axios.post(MESSAGE_URL, payload)
            userTxt.value = ''
            isBold = false
            isItalic = false
            await getMessage()
        } catch (error) {
            alert('Opp, Something went wrong!!!')
        }
        emojiWrapper.className = 'emojis-wrapper'
        emojiIcon.style.color = '#a4b0be' 
    }
}

// emoji
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
    } else if (emojiCode == 11) {
        userTxt.value+= '\u{1F642}'
    }else if (emojiCode == 12) {
        userTxt.value+= '\u{1F970}'
    }else if (emojiCode == 13) {
        userTxt.value+= '\u{1F61B}'
    }else if (emojiCode == 14) {
        userTxt.value+= '\u{1F625}'
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

//Bold  Italic

function bold () {
    if (isBold) {
        isBold = false
    } else {
        isBold = true
    } 
}

function setItalicLetter () {
    if (isItalic) {
        isItalic = false
    } else {
        isItalic = true
    }  
}


