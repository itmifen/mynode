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
var users = [];

server.listen(process.env.port || config.main_port);

io.sockets.on('connection', function (client){
    clients.push(client);

    client.on('online',function(data){
        var data = JSON.parse(data);
        console.log(data);
        //检查是否是已经登录绑定
        if(!clients[data.user])
        {
            //新上线用户，需要发送用户上线提醒,需要向客户端发送新的用户列表
            users.unshift(data.user);

            for(var index in clients)
            {
                clients[index].emit('system',JSON.stringify({type:'online',msg:data.user,time:(new Date()).getTime()}));
                clients[index].emit('userflush',JSON.stringify({users:users}));
            }
            client.emit('system',JSON.stringify({type:'in',msg:'',time:(new Date()).getTime()}));
            client.emit('userflush',JSON.stringify({users:users}));
        }
        clients[data.user] = client;
        client.emit('userflush',JSON.stringify({users:users}));
    });

    client.on('message', function (msg) {
        console.log(msg);

        for(var index in clients)
        {
            clients[index].emit('message',msg);
        }
      //   client.broadcast.emit('message', msg);
    }) ;

    client.on('disconnect', function () {
        setTimeout(userOffline,5000);
        function userOffline()
        {
            for(var index in clients)
            {
                if(clients[index] == client)
                {
                    users.splice(users.indexOf(index),1);
                    delete clients[index];
                    for(var index_inline in clients)
                    {
                        clients[index_inline].emit('system',JSON.stringify({type:'offline',msg:index,time:(new Date()).getTime()}));
                        clients[index_inline].emit('userflush',JSON.stringify({users:users}));
                    }
                    break;
                }
            }
        }
    });

});





app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser({uploadDir:'./public/tmp'}));
  app.use(express.methodOverride());
  app.use(express.cookieParser());
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