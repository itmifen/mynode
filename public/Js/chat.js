var connection = new WebSocket('ws://localhost:3000');

function regchatname()
    {
           var username=$("#username").val();
    $("#usernamecontent").css("display","none");
    $("#logok").html("当前登录的用户名为:"+username+"<br/><br/>");
    $("#msgdiv").css("display","block");
}


function sendmsg()
{
    var detail=$("#msgdetail").val();
    if(msg)
    {
        connection.send(msg);
    }

}

input.keydown(function(e) {
    if (e.keyCode === 13) {
        var msg = $(this).val();
        if (!msg)    return;
        connection.send(msg);
        $(this).val('');
        if (myName === false) {
            myName = msg;
        }
    }
});
