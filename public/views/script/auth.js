const containerLogin = document.getElementById("containerLogin")
const containerRegister = document.getElementById("containerRegister")
const btnToRegister = document.getElementById("btnToRegister")
const btnToLogin = document.getElementById("btnToLogin")

const asdasd = {
    user1: {
        username: "vinyhmaxter",
        avatar: "eamail.png"
    },
    user: {
        username: "vinyhmaxter2",
        avatar: "eamail.png2"
    }
}
 for (let i in asdasd) {
     console.log(asdasd[i])
 }


// form
const emailLogin = document.getElementById("emailLogin")
const passwordLogin = document.getElementById("passwordLogin")

const avatarRegister = document.getElementById("avatarRegister")
const usernameRegister = document.getElementById("usernameRegister")
const emailRegister = document.getElementById("emailRegister")
const passwordRegister = document.getElementById("passwordRegister")

const btnLogin = document.getElementById("btnLogin")
const btnRegister = document.getElementById("btnRegister")

btnToRegister.addEventListener("click", (e) => {
    e.preventDefault()
    containerLogin.style.display = "none"
    containerRegister.style.display = "block"
})

btnToLogin.addEventListener("click", (e) => {
    e.preventDefault()
    containerLogin.style.display = "block"
    containerRegister.style.display = "none"
    console.log("feito")
})

btnLogin.addEventListener("click", async (e) => {
    e.preventDefault()
    if (emailLogin.value && passwordLogin.value) {
        let userData = {
            email: emailLogin.value,
            password: passwordLogin.value,
        }
        await getTokenJWT(userData)
    }
    else{
        alert("Preencha todos os campos")
    }
})
btnRegister.addEventListener("click", async (e) => {
    e.preventDefault()
    
    if (avatarRegister.value && usernameRegister.value && emailRegister.value && passwordRegister.value) {
        let userData = {
            username: usernameRegister.value,
            email: emailRegister.value,
            password: passwordRegister.value,
        }
                
        var formData = new FormData();
        formData.append("avatar", avatarRegister.files[0]);
        formData.append("username", JSON.stringify(usernameRegister.value));
        formData.append("email", JSON.stringify(emailRegister.value));
        formData.append("password", JSON.stringify(passwordRegister.value));
        //formData.append("userData", JSON.stringify(userData));

        console.log(userData)
        console.log(formData)
       await registerUser(formData)
    }
    else{
        alert("Preencha todos os campos")
    }
})


const getTokenJWT = async (userData) => {
    
    const result = await fetch("http://127.0.0.1:3000/login", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    })
        let json = await result.json()
        if(json.token) {
            localStorage.setItem("token", `Bearer ${json.token}`)
            localStorage.setItem("loggedUserEmail", json.email)
            window.location.replace("/views/chat.html")
        }
        else{
            alert("Usuario nao cadastrado")
            return
        }
        
}
const registerUser = async (userdata) => {
    const userData = userdata
    const result = await fetch("http://127.0.0.1:3000/register", {
        method: "POST",
        body: userData
         /*headers: {
            "Content-Type": "application/json",
        },*/
    })
    const data = await result.json()
    if (data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("loggedUserEmail", data.newUser.email)
        window.location.replace("/views/chat.html")
    }
    else{
        alert("Ocorreu um erro no servidor, porfavor tente novamente")
        return
    }
    
}




