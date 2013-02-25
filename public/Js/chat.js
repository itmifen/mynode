$(function () {
alert("aa");

})


function regchatname()
{
    var username=$("#username").val();
    $("#usernamecontent").css("display","none");
    $("#logok").html("当前登录的用户名为:"+username+"<br/><br/>");
    $("#msgdiv").css("display","block");
}


function sendmsg()
{
    var connection = new WebSocket('ws://localhost:3001');
    alert(connection.readyState);
    connection.onopen = function (event) {
        alert("打开连接");
    };

    var detail=$("#msgdetail").val();
    if(detail)
    {
        connection.send(detail);
    }
    else
    {
        alert('error');
    }
}
