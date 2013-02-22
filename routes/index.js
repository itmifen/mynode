var db = require('../common/db');
var fs = require('fs');
var sql = db.sql;

exports.index = function (req, res) {
    res.render('index', {
        title: '首页'
    });
};



exports.reg = function (req, res) {
    var usernametip = '请填写用户名';
    res.render('reg', {
        title: '注册', tip: usernametip, regtip: ''
    });
};


exports.upload = function (req, res) {
    res.render('upload', {
        title: 'upload'
    });
};

exports.doreg = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var regtiptxt = "";
    var usernametip = '请填写用户名';
    if (username.length < 4) {
        regtiptxt = "用户名不得少于4位";
    }
    if (password.length < 6) {
        regtiptxt = "密码不得少于6位";
    }

    sql.open(db.conn_str, function (err, conn) {
        if (err) {
            console.log(err);
        }
        sql.queryRaw(db.conn_str, "select count(0) from users where username='" + username + "'", function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                if (parseInt(results.rows[0][0]) > 0) {
                    regtiptxt = "用户名已经被注册啦!!!";
                    console.log(regtiptxt);
                    res.render('reg', {
                        title: '注册', tip: usernametip, regtip: regtiptxt
                    });
                }
                else {
                    regtiptxt = "注册成功";
                    conn.queryRaw("insert into users (username,password) values ('" + username + "','" + password + "')"), function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            regtiptxt = "注册成功";
                        }
                    }
                    res.render('reg', {
                        title: '注册', tip: usernametip, regtip: regtiptxt
                    });
                    console.log(regtiptxt);
                }
            }
        })
    });



};

exports.list = function (req, res) {
    console.log('链接数据库');
    var userlist = [];
    sql.open(db.conn_str, function (err, conn) {
        if (err) {
            console.log('发生错误');
        }

        sql.queryRaw(db.conn_str, "select  * from users", function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(results.rows.length);
                for (var i = 0; i < results.rows.length; i++) {
                    userlist.push({username:results.rows[i][1],password:results.rows[i][2]})
                }
                console.log(userlist);
                res.render('list', {
                    title: 'list',
                    users: userlist
                });
            }
        })

    })


}

exports.doupload = function (req, res) {
// 获得文件的临时路径
    var tmp_path = req.files.upload.path;
    var target_path = './public/upload/' + req.files.upload.name;
    // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
        if (err)
        {
            console.log(err);
        }
       // 删除临时文件夹文件,
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.upload.size + ' bytes');
        });
    });
}


exports.chat = function (req, res) {
    res.render('chat', {
        title: 'chat'
    });
}