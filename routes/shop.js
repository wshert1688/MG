var db = require('../DB');
var core = require('../core');

exports.index = function(req,res)
{
    db.getshop(function(err,data){
        res.render('shop/index', { title: "网站商城",data:data });
    })
}


exports.buy = function(req,res){
    var item = {id:req.query.itemId,count:req.query.count};
    db.buyItem({name:req.session.name,
                itemId:item.id,
                count:item.count},function(data){
        res.redirect('/shop');
    });

}
