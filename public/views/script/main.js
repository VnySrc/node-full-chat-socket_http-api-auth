const socket = io()

let avatar = ""
let username = ""
let connectedUserList = []
let messageContent = ""

const mainPage = document.getElementById("mainPage")
const loginPage = document.getElementById("containerLogin")
const inputText = document.getElementById("inputText")
const messagesList = document.getElementById("messages")
const userList = document.getElementById("userList")

/*usernameInput.addEventListener("keyup" , (e) => {
    if (e.code === "Enter") {
        const name = inputName.value.trim()
        if (name !== "") {
            username = name
            loginPage.style.display = "none"
            mainPage.style.display = "grid"
            document.title = `Chat ${username}`

            informationExchage.joinChat()
            informationExchage.userList()
           
            addMessage("status", null, "Conectado!")
        }
    }
}) */
inputText.addEventListener("keyup" , (e)  => {
    if (e.code === "Enter") {
        messageContent = ""
        messageContent = inputText.value.trim()
        if (messageContent !== "") {
          informationExchage.sendMessage()

          inputText.value = ""
        }
    }
})


const informationExchage = {
//Emit
    joinChat: () => {
        console.log(username)
        socket.emit ("join-request", username, avatar)
    },
    sendMessage: () => {
        socket.emit("send-message", messageContent)
    },
//Recive
    userList: () => {
        socket.on("user-list", (data) => {
            connectedUserList = data.list
            loadUserList()
        })
    },
    userBroadcastUpdate: () => {
        socket.on("users-update", (data) => {
            connectedUserList = data.list
            loadUserList()   
        if (data.join) {
            addMessage("msg", data.join, "Entou no chat", data.avatar, )
        }
        else{
            if (data.left !== undefined) {
            addMessage("msg", data.left, "Saiu do chat", data.avatar)
            }
        }
            
        })   
    },
    messageList: () => {
        socket.on("message-list", (data) => {
            username = data.username
            message = data.message
            avatar = data.avatar
console.log(data)
            addMessage("msg",username, message, avatar)
        })
    },
    messageListBroadcastUpdate: () => {
        socket.on("messages-update", (data) => {
            console.log(data.avatar)
            addMessage('msg', data.username, data.message, data.avatar);
        })
    },
    disconnect: () => {
        socket.on("disconnect", () => {
            addMessage("status", null, "Você foi desconectado")
            addMessage("status", null, "Você será redirecionado para tela de login")
            setTimeout(() => {
                window.location.replace("/")
            }, 5000);
    })
    },
}
// call recive functions
informationExchage.userList()
informationExchage.userBroadcastUpdate()
informationExchage.messageList()
informationExchage.messageListBroadcastUpdate()
informationExchage.disconnect()
const loadUserList = () => {
    userList.innerHTML = ""

    connectedUserList.forEach(user => {
         addUser(user)
    });

    inputText.focus()
}

function addMessage(type, user, msg, userAvatar) {

    switch(type) {
        case 'status':
            messagesList.innerHTML += `<li class="m-status">${msg}</li>`
        break;
        case 'msg':
            if(username == user) {
                messagesList.innerHTML += `<li class="m-txt"><img class="userAvatarImageChat" src="../../media/users/avatar/${userAvatar}"><span class="me"> ${user} </span> ${msg} </li>`;
            } else {
                messagesList.innerHTML += `<li class="m-txt"><img class="userAvatarImageChat" src="../../media/users/avatar/${userAvatar}"><span> ${user} </span> ${msg} </li>`;
            }
        break;
    }

    messagesList.scrollTop = messagesList.scrollHeight;
}
function addUser(user) {
    if(username == user) {
        userList.innerHTML += `<li class="m-txt" ><span class="me">${user} <i> - você </i></span></li>`;
    } else {
        userList.innerHTML += `<li class="m-txt"><span>${user}</span></li>`;
    }
}


// Authentication

onload = async () => {
    let token = localStorage.getItem("token")
    if (token) {
        let loggedUserEmail = {
            email: localStorage.getItem("loggedUserEmail")
        }
        const result = await fetch("http://127.0.0.1:3000/users",{
            method:"POST",
            body: JSON.stringify(loggedUserEmail),
            headers: {
                "Content-Type": "application/json",
            }
        }) 
        var userData = await result.json()
        avatar = userData.user.avatar
        username = userData.user.username
        informationExchage.joinChat()
        informationExchage.userList()
    }
    else{
        window.location.replace("/")
    }
}

window.addEventListener("beforeunload", function (event) {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedUserEmail')
});