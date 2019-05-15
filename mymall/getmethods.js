var db_Operation = require('./operationDB');
function getmethods(req,res){
    console.log(req.path)
    switch(req.path){
        case '/mallData':
            db_Operation.read('mallData',{},mallData)
            function mallData(err,result){
                if(err){
                    res.writeHead(500,{ 'Content-Type': 'text/html'});
                    res.end(err.toString());
                }else {
                        res.writeHead(200,{ 'Content-Type': 'text/html'});
                        res.end(JSON.stringify(result));
                }
            }
            break;
        case '/allgoods':
        db_Operation.read('goods',{},allgoods)
        function allgoods (err,result){
            if(err){
                res.writeHead(500,{ 'Content-Type': 'text/html' });
                res.end(err.toString());
            }else {
                res.writeHead(200,{ 'Content-Type': 'text/html' });
                res.end(JSON.stringify(result));
            }
        }
        break;
        case '/addstar':
        db_Operation.change('mallData',{id:"888",change:{"star":req.query.starnum}},addstar)
        function addstar (err,result){
            if(err){
                res.writeHead(500,{ 'Content-Type': 'text/html' });
                res.end(err.toString());
            }else {
                res.writeHead(200,{ 'Content-Type': 'text/html' });
                res.end(JSON.stringify(result));
            }
        }
        break;
        case '/like':
        var id = req.query.id;
        var control = req.query.control;
        var number = req.query.number;
        db_Operation.changeArr('user',{id,control,change:["like",number]},like);
        db_Operation.read('goods', { "_id": number }, function (err, result) {
            if(control == 'add'){
                var like = parseInt(result[0].like) + 1;
            }else {
                var like = parseInt(result[0].like) - 1;
            }
                db_Operation.change('goods', { id:number, change: { like } }, function (err, result) {});
        });

        function like (err,result){
            if(err){
                res.writeHead(500,{ 'Content-Type': 'text/html' });
                res.end(err.toString());
            }else {
                res.writeHead(200,{ 'Content-Type': 'text/html' });
                res.end(JSON.stringify(result));
            }
        }
        break;
        case '/order':
        var id = req.query.id;
        var control = req.query.control;
        var order = req.query.order;
        console.log(order)
        db_Operation.changeArr('user',{id,control,change:["order",order]},like);
        function like (err,result){
            if(err){
                res.writeHead(500,{ 'Content-Type': 'text/html' });
                res.end(err.toString());
            }else {
                res.writeHead(200,{ 'Content-Type': 'text/html' });
                res.end(JSON.stringify(result));
            }
        }
        break;
        case '/buy':
        var id = req.query.id;
        var control = req.query.control;
        var order = req.query.order;
        console.log(order)
        db_Operation.changeArr('user',{id,control,change:["buy",order]},like);
        function like (err,result){
            if(err){
                res.writeHead(500,{ 'Content-Type': 'text/html' });
                res.end(err.toString());
            }else {
                res.writeHead(200,{ 'Content-Type': 'text/html' });
                res.end(JSON.stringify(result));
            }
        }
        break;
        case '/getuser':
        var id = req.query.id;
        db_Operation.read('user',{"_id":id},getuser);
        function getuser (err,result){
            if(err){
                res.writeHead(500,{ 'Content-Type': 'text/html' });
                res.end(err.toString());
            }else {
                res.writeHead(200,{ 'Content-Type': 'text/html' });
                res.end(JSON.stringify(result));
            }
        }
        break;
        default:
        res.writeHead(404,{ 'Content-Type': 'text/html' });
        res.end('sorry not fond');break;
    }

}
module.exports = getmethods;