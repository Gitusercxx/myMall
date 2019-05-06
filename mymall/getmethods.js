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
        default:
        res.writeHead(404,{ 'Content-Type': 'text/html' });
        res.end('sorry not fond');break;
    }

}
module.exports = getmethods;