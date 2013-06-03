/**
 * Created with JetBrains WebStorm.
 * User: neo
 * Date: 13-6-3
 * Time: 下午4:48
 * To change this template use File | Settings | File Templates.
 */


exports.index = function(req,res){
    res.render('extend/index', { title: "推广系统" });
}