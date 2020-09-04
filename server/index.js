const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// var jwt = require('jsonwebtoken');

const user = require('./routes/user');
const mail = require('./routes/mail');

const port = 3000;
//initiate express and cors


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(cors());
app.options('*', cors());

//DB CONNECTION
mongoose.connect('mongodb://localhost:27017/mockmail', {
  useNewUrlParser: true
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("connected to db");
});

db.on("error", () => {
  console.log("unable to connect");
});

//ROUTES
app.use('/api/user', user);
app.use('/api/mail', mail);

// app.use(express.static(__dirname + '/node_modules'));

io.on('connection', (socket) => {
  console.log("user connected");
  // socket.emit('test', 'hello from testing');
  socket.on('join', function (data) {
    console.log(data);
    socket.emit('messages', data);
  })
})
//SERVER PORT
server.listen(port, () => {
  console.log("node server is running")
});
