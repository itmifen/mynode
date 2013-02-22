var express = require('express'),
    routes = require('./routes'),
    config = require('./config').config,
    db=require('./common/db');
var sql = db.sql;

var app = express();

var http=require('http');
var server=http.createServer(app);
var WebSocketServer=require('ws').Server;
var wss=new WebSocketServer({server:server});
var clients=[];
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
wss.on('connection',function(ws){
    clients.push(ws);
    var username=false;
    var usercolor=false;
    ws.on('message',function(msg){
        if(!username)
        {
            username=msg;
            usercolor=colors.shift();
            ws.send(JSON.stringify({ type:'color', data: userColor }));
            console.log(userName + ' login');
        }else{
            console.log(userName + ' say: ' + msg);
            var obj = {
                time: (new Date()).getTime(),
                text: msg,
                author: userName,
                color: userColor
            };
            var json = JSON.stringify({type:'message', data: obj});
            for (var i=0; i < clients.length; i++) {
                clients[i].send(json);
            }
        }

    })

    ws.on('close', function(ws){
        if(userName !== false && userColor != false){
            var index = clients.indexOf(ws);
            clients.splice(index, 1);
            colors.push(userColor);
        }
    });

})



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


app.listen(process.env.port || config.main_port);
console.log("Express server listening");