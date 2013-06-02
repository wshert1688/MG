
/*
 * GET users listing.
 */
var db = require('../db');
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
            req.session.id = user.id;
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
    res.render('reg', { title: "注册" });
}
exports.postreg=function(req,res){

    if(r)
    res.render('reg', { title: "注册" });
}