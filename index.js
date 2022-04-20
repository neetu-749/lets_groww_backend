const express = require("express");
const dotenv = require("dotenv");
const app = express();
var cors = require('cors')



var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));



//  scoket

const server = require('http').createServer(app);

const io = require("socket.io")(server,{
  cors:{
      // origin : "http://localhost:3000",
      origin : "*",
      credentials: true
  },
});

let users = [];

const adduser = (userId, SocketId)=>{
    !users.some((user)=>user.userId===userId)&&
    users.push({userId,SocketId});
};
const removeUser = (SocketId)=>{
    users = users.filter(user=>user.SocketId !== SocketId);
};

const getUsers = (userId)=>{
    return users.find(user=>user.userId === userId);
};


io.on("connection",(Socket)=>{
  console.log("user connected..");

  Socket.on("adduser", (userId)=>{
      adduser(userId, Socket.id);
      io.emit("getUsers",users);
  });


  Socket.on("sendMessage",({senderId,receiverId,text})=>{
      const user = getUsers(receiverId);
      io.to(user?.SocketId).emit("getMessage",{
          senderId,
          text,
      });
  });

  Socket.on("disconnect",()=>{
      console.log("user disconnected");
      removeUser(Socket.id);
      io.emit("getUsers",users);

  });

});




// 
const authRoute = require("./routers/auth");
const investorRoute = require("./routers/investor");
const CompanyRoute = require("./routers/company");
const ConversationRoute = require("./routers/conversation");
const messageRoute = require("./routers/message")

const mongoose = require("mongoose");

dotenv.config();
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connection Successfull!"))
.catch((err) => {
  console.log(err);
});



app.use("/api/auth",authRoute);
app.use("/api/investor", investorRoute);
app.use("/api/company",CompanyRoute);
app.use("/api/conversation",ConversationRoute);
app.use("/api/message",messageRoute);


// app.listen("5000",()=>{
//     console.log("backend is running...");
// });

server.listen(process.env.PORT ||5000,()=>{
  console.log("backend is running...");
});

// Anil kumar
// set git remote heroku to https://git.heroku.com/letsgroww.git