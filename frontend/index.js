// Make connection
const container = document.getElementById("container");
const sendbtn = document.getElementById("sendbtn");
const messageInp = document.getElementById("messageInp");
const userdata = document.getElementById("userdata");

const socket = io();


let username = prompt(`Welcome to ChartKaro App! \n \n Please enter your username: `);
console.log(username);
userdata.innerHTML = `<h1>${username}</h1>`
socket.on("connect", ()=>{
    // console.log(socket.id);
    console.log("New User Connected");

    sendbtn.onclick =()=>{
        let sent_msg = document.createElement("div");
            sent_msg.setAttribute("id","right");
            sent_msg.setAttribute("class","message");
        let sentmsgdata = document.createElement("p");
        sentmsgdata.innerText = messageInp.value;
        sent_msg.append(sentmsgdata);
        container.append(sent_msg);
        socket.emit("sentmessage", {name:username,data:messageInp.value});
        messageInp.value="";
    };

    messageInp.addEventListener("keypress",() => {
        socket.emit("typing",username);
    });

    socket.on("reviceddata",(data)=>{
        userdata.innerHTML= `<h1>${username}</h1>`
        let recivedmsg = document.createElement("div");
        recivedmsg.setAttribute("id","left");
        recivedmsg.setAttribute("class","message");
        let user = document.createElement("p");
            user.innerText=`${data.name}:\n`;
        let revivedmsgdata = document.createElement("p");
        revivedmsgdata.innerText = data.data;
        recivedmsg.append(user,revivedmsgdata);
        container.append(recivedmsg);

        socket.emit("message", {msg:messageInp.value,
                                name:username});
        messageInp.value="";
    });

    socket.on("typing",(data)=>{
        userdata.innerHTML = `<p>${data} is typing...</p>`;
    });

   

});


socket.on("disconnect",()=>{
        console.log("User Disconnected");
});