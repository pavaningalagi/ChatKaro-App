const express = require('express');
const socket = require('socket.io');
const path = require('path');

// App setup
const app = express();
const server = app.listen(8080,()=>{
    console.log('Server is running on port 8080....');
});

// sending html page on live server
app.use(express.static(path.join(__dirname, './public')));
// console.log(path.join(__dirname, './public/index.html'));

// Socket Setup
const io = socket(server);

io.on("connection",(socket)=>{
    console.log(`Connection established with socket: ${socket.id}`);
    console.log("new user connected");

    socket.on("sentmessage",(data)=>{
        // console.log(data);
        socket.broadcast.emit("reviceddata",data);
    });

    socket.on("typing",(data)=>{
        socket.broadcast.emit("typing",data);
    });
});






































// const express  = require('express');
// const app = express();
// const http  = require('http');
// const server = http.createServer(app);
// const {Server} = require('socket.io');

// //attached http server to the socket.io 
// const io =new Server(server);

// //route
// app.get('/', (req, res)=> {
//     res.send("Welcome to the SendIT App!");
// });

// // let obj={};

// //create a new connection
// let onlineuser = 0;

// io.on("connection",(socket)=>{

//     onlineuser++;

//     console.log(`New User Connected, TOTAL-USERS:${onlineuser}`);

//     socket.on("message",(msg)=>{
//         // socket.broadcast.emit("msgfromsender",msg);
//         console.log(msg);
//     })

//     socket.on("disconnect",()=>{
//         onlineuser--;
//         socket.broadcast.emit("onlineuser",onlineuser);
//         console.log("User Disconnected");
//     });

//     socket.broadcast.emit("onlineuser",onlineuser);

// });

// server.listen(8080,()=>{
//     console.log(`server listening on port:8080...`);
// });

