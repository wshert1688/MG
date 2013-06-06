var mysql = require('mysql');
var async = require('async');
var core = require('./core');

var pool = mysql.createPool({
    host     : '60.173.14.34',
    user     : '44424322',
    password : '44424322'
});
var query = function(sql,param,cb)
{
    pool.getConnection(function(err, connection) {
        var q = connection.query(sql,param, function(err, rows) {

            if(cb!=undefined)
            {
                cb(err,rows);
            }
            connection.end();
        });
        console.log(q.sql);
    });
}
exports.getAlluser = function(cb)
{
    query("select * from fanren2.account;",null,cb);
}

exports.getuserById = function (obj,cb)
{
    query("select * from fanren2.account where name=?",obj,cb);
}

exports.validatelogin = function(obj,cb)
{
    query("select * from fanren2.account where name=? and password=?",obj,cb);
}
exports.getExtend = function(obj,cb)
{
    query("select * from fanren2.extsys where tid=? and ip=?",obj,cb);
}
exports.addExtend = function(obj,cb)
{
    query("INSERT INTO `fanren2`.`extsys` set ?",obj,cb);
}
exports.regUser = function(obj,cb)
{
    query("INSERT INTO `fanren2`.`account` set ?",obj,cb);
}
exports.getshop = function(cb)
{
    query("select * from `fanren2`.`shop` ",cb);
}
exports.buyItem = function(obj,cb)
{

    async.parallel({
            player:function(cb){
                query("select player_id,name from fanren2.t_player where username=?;",[obj.name],function(err,data){
                    var player_id = core.getDataValueToInt(data,'player_id');
                    var name = core.getDataValue(data,'name');
                    cb(err,{player_id:player_id,name:name});
                });
            },
            crystal:function(cb){
                query("select CRYSTAL from fanren2.account where name=?;",[obj.name],function(err,data){
                    var count = core.getDataValueToInt(data,'CRYSTAL');
                    console.log(count);
                    cb(err,count);
                })
            },
            price:function(cb){
                query("SELECT price FROM fanren2.shop where itemid=?;",[obj.itemId],function(err,data){
                    var price = core.getDataValueToInt(data,'price');
                    cb(err,price);
                })
            }
        },
        function(err,data){
            console.log(data);
            var finalPrice = (data.price*obj.count);
            if(finalPrice>data.crystal){
                cb({msg:'没有足够的水晶了亲'});
                return;
            }
            var finalcrystal = data.crystal-finalPrice;
            query("update fanren2.account set crystal=? where name=?",[finalcrystal,obj.name],function(err,data){

            });
            //INSERT INTO `t_player_mail` VALUES ('自动递增ID', '0', '系统', '人物ID', '游戏人物名字', '1', '1', '游戏商城购买物品名字,
            // '游戏商城购买物品名字', '1', '0', '0', '[{\"amount\":物品数量,\"extend\":null,\"item\":物品ID,\"uid\":\"18927954-3123-3411-3874-277931986502\"}]',
            // '获取时间', '630');
            query("INSERT INTO `fanren2`.`t_player_mail` set ?",{
                from_player_id:0,from_player_name:'系统',to_player_id:data.player.player_id,to_player_name:data.player.name,type:1,status:1,
                title:'商城',content:'1',had_attachment:'0',attachment_coin:'0',attachment_gold:'0',
                attachment_items:'[{\"amount\":'+obj.count+',\"extend\":null,\"item\":'+obj.itemId+',\"uid\":\"18927954-3123-3411-3874-277931986502\"}]',
                mail_dt:new Date(),update_code:630
            },function(err,data){

            })
            cb({msg:'购买成功'});
        });
}