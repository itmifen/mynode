/**
 * Created with JetBrains WebStorm.
 * User: lih
 * Date: 13-2-22
 * Time: 下午3:19
 * To change this template use File | Settings | File Templates.
 */
function regchatname()
{
    var username=$("#username").val();
    $("#usernamecontent").css("display","none");
    $("#logok").html("当前登录的用户名为:"+username+"<br/><br/>");
    $("#msgdiv").css("display","block");
}

