
/*
 * GET users listing.
 */
var db = require('../DB');
var core = require('../core');
var async = require('async');


exports.list = function(req, res){
    res.send("respond with a resource");
};

exports.login = function(req,res){
    res.render('login', { title: "登录" });
}

exports.postlogin = function(req,res)
{
    db.validatelogin([req.body.username,req.body.password],function(err,rows){

        if(rows!=undefined&&rows.length>0&&rows[0].name==req.body.username)
        {
            var user = rows[0];
            req.session.tid = user.id;
            req.session.name = user.name;
            res.redirect('/');
        }
        else
        {
            res.redirect('login');
        }
    })

}
exports.reg=function(req,res){
    res.render('reg', { title: "注册"});
}
exports.postreg=function(req,res){
    var user = req.body;

    if(core.isJsonNotNull(user)&& user.password==user.repassword)
    {
        async.parallel({
            user: function(cb){
                db.getuserById([user.name],function(err,rows){
                    cb(err,rows);
                });
            },
            extend: function(cb){
                db.getExtend([user.tid,req.ip],function(err,rows){
                    cb(err,rows);
                })
            }
        },
        function(err, results) {
            if(core.isHasData(results.user))
            {
                res.redirect('back');
                return;
            }
            if(!core.isHasData(results.extend))
            {
                db.addExtend({tid:user.tid,ip:req.ip});
            }
            db.regUser({name:user.name,
                password:user.password,
                createtime:new Date(),
                regip:req.ip},
                function(err,rows){
                    res.redirect('login');
            });
        });
    }
    else
    {
        res.redirect('back');
    }
}