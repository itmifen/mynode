var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    config = require('./config').config,
    db=require('./common/db');
var sql = db.sql;

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var clients=[];

server.listen(process.env.port || config.main_port);

io.sockets.on('connection', function (client){

   // client.send ( '已经建立连接!' );
    clients.push(client);

    client.on('online',function(data){
       console.log(data);
    })

    client.on('message', function (msg) {
        console.log(msg);
        for(var index in clients)
        {
            clients[index].emit('message',msg);
        }
      //   client.broadcast.emit('message', msg);
    }) ;

    client.on('disconnect', function () {
    });

});





app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser({uploadDir:'./public/tmp'}));
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});


app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/reg', routes.reg);
app.post('/doreg', routes.doreg);
app.get('/list', routes.list);
app.get('/upload', routes.upload);
app.post('/doupload', routes.doupload);
app.get('/chat', routes.chat);


//app.listen(process.env.port || config.main_port);
console.log("Express server listening");