var db_Operation = require('./operationDB');
function getmethods(req,res){
    console.log(req.path)
    switch(req.path){
        case '/mallData':
            db_Operation.read('mallData',{"mallname" : "CXX小店"},mallData)
            function mallData(err,result){
                if(err){
                    res.writeHead(500,{ 'Content-Type': 'text/html'});
                    res.end(err.toString());
                }else {
                        res.writeHead(200,{ 'Content-Type': 'text/html'});
                        res.end(JSON.stringify(result));
                    console.log(result)
                }
            }
            break;
        case '/getnum':
            res.writeHead(200,{ 'Content-Type': 'text/html' });
            res.end('get unum');break;
        default:
        res.writeHead(404,{ 'Content-Type': 'text/html' });
        res.end('sorry not fond');break;
    }

}
module.exports = getmethods;