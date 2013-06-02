
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();


var MemStore = express.session.MemoryStore;
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.cookieParser());
app.use(express.session({secret: 'alessios', store: MemStore({
    reapInterval: 60000 * 10
})}));


//设置脚手架
app.use(function (req, res, next) {
    var origRender = res.render;
    res.render = function (view, locals, callback) {
        if ('function' == typeof locals) {
            callback = locals;
            locals = undefined;
        }
        if (!locals) {
            locals = {};
        }
        locals.req = req;
        locals.session = req.session;
        origRender.call(res, view, locals, callback);
    };
    next();
});
app.use(app.router);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login', user.login);
app.post('/login', user.postlogin);
app.get('/reg', user.reg);
app.post('/reg', user.postreg);


app.get('/logout', function(req, res){
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function(){
        res.redirect('/');
    });
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
