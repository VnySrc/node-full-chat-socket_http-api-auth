

const data = {
    email: "emailteste@gmail.com",
    password: "171717"
}

const getTokenJWT = async () => {
    
    const result = await fetch("http://127.0.0.1:3000/login", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    
        let json = await result.json()
        localStorage.setItem("token", `Bearer ${json.token}`)
        console.log(json.token)
    
}
const loginWithJWT = async () => {
    document.open()
    const result = await fetch("http://127.0.0.1:3000/chat", {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsdGVzdGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxNzE3MTciLCJpYXQiOjE2NTA1NDQxODIsImV4cCI6MTY1MDU0Nzc4Mn0.gzzzelbptcsU_36jI_JKbcVJ-rKyEmwN9UtnrTRa-oA"
        },
        redirect: "follow"
    })
    console.log("Rodou o segundo comando")
   // const dat a = await result.json()


}

sendBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
     getTokenJWT()
     loginWithJWT()
})