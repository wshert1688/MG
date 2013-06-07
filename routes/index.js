
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log(req.ip);
  res.render('index', { title: 'Express' });
};

exports.game = function(req,res){

    res.render('game',{title:'开始游戏'});
}