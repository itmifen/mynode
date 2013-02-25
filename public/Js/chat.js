var connection;

$(function () {
})


function regchatname()
{
    var username=$("#username").val();
    $("#usernamecontent").css("display","none");
    $("#logok").html("当前登录的用户名为:"+username+"<br/><br/>");
    $("#msgdiv").css("display","block");
    connection = new WebSocket('ws://localhost:3001');

    alert(connection.readyState);
}


function sendmsg()
{
    var detail=$("#msgdetail").val();



    connection.send("hello");//向服务器发送消息
    alert(connection.readyState);//查看websocket当前状态
    connection.onopen = function (evt) {
        //已经建立连接
        alert(connection.readyState);
    };
    connection.onclose = function (evt) {
        //已经关闭连接
        alert(connection.readyState);
    };
    connection.onmessage = function (evt) {
        //收到服务器消息，使用evt.data提取
        alert(connection.readyState);
    };
    connection.onerror = function (evt) {
        //产生异常
        alert(connection.readyState);
    };

}
