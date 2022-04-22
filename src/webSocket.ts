import { io } from "./http"

let userList:string[] = []

io.on("connection", (socket) => {
    console.log(socket.id)
    
    socket.on("join-request", (socketUsername: string, socketAvatar: string) => { // entrar no chat
        socket.data.username = socketUsername 
        socket.data.avatar = socketAvatar
        userList.push(socketUsername)
        console.log(socketUsername)

        let data:object = {
          join: socket.data.username,
          username: socket.data.username,
          avatar: socket.data.avatar,
          list: userList,
        }
        socket.emit("user-list", data)
        socket.broadcast.emit("users-update", data)
        console.log(data)
    })
    socket.on("send-message" , (messageContent) => {
      let data:object = {
        username: socket.data.username,
        message: messageContent,
        avatar: socket.data.avatar,
      }

      socket.emit("message-list", data)
      socket.broadcast.emit("messages-update", data)
    })
    socket.on("disconnect", () => {
      userList = userList.filter(username => username != socket.data.username)
      console.log (userList)
      let data:object = {
        left: socket.data.username,
        list: userList,
        avatar: socket.data.avatar
      }
      socket.broadcast.emit("users-update", data)
    
    })
})

