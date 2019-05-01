var db_Operation = require('./operationDB');
function postmethods(req,res){
    console.log(req.path)
    switch (req.path){
        case '/userlog':
            var posttel = req.body._id;
            var postpass = req.body.password
            db_Operation.read('user',{'_id':posttel},check_log);
            function check_log(err,result){
                if(err){
                    res.writeHead(500,{ 'Content-Type': 'text/html'});
                    res.end(err.toString());
                }else {
                    if(result[0]){
                        if(result[0].password == postpass){
                            res.writeHead(200,{ 'Content-Type': 'text/html'});
                            res.end(JSON.stringify(result));
                        }else{
                            res.writeHead(200,{ 'Content-Type': 'text/html'});
                            res.end(JSON.stringify(['password_mistake']));
                        }
                    }else{
                        res.writeHead(200,{ 'Content-Type': 'text/html'});
                        res.end(JSON.stringify(['unregistered']));
                    }
                    console.log(result)
                }
            }
            break;
        case '/userreg':
            var postdat = req.body;
            db_Operation.add('user',postdat,function(err,result){
                if(err){
                    console.log(err.code)
                    if(err.code == 11000){
                        res.writeHead(200,{ 'Content-Type': 'text/html'});
                        res.end(JSON.stringify(['reg_fail_repeat']));
                    }else{
                        res.writeHead(200,{ 'Content-Type': 'text/html'});
                        res.end(JSON.stringify(['reg_fail']));
                    }
                }else{
                    res.writeHead(200,{ 'Content-Type': 'text/html'});
                    res.end(JSON.stringify(['reg_success']));
                }
            })
            break;
        case '/getuser':
            var tel = req.body;
            db_Operation.read('user',tel,get_user);
            function get_user(err,result){
                if(err){
                    res.writeHead(500,{ 'Content-Type': 'text/html'});
                    res.end(err.toString());
                }else {
                    if(result[0]){
                            res.writeHead(200,{ 'Content-Type': 'text/html'});
                            res.end(JSON.stringify(result));
                    }else{
                        res.writeHead(200,{ 'Content-Type': 'text/html'});
                        res.end(JSON.stringify(['unregistered']));
                    }
                    console.log(result)
                }
            }
            break;
        case '/changepass':
            var dat = req.body;
            console.log(dat)
            db_Operation.changepass('user',dat,change_pass);
            function change_pass(err,result){
                if(err){
                    res.writeHead(500,{ 'Content-Type': 'text/html'});
                    res.end(err.toString());
                }else{
                    res.writeHead(200,{ 'Content-Type': 'text/html'});
                    res.end(JSON.stringify(result));
                }
            }
            break;
        default:
        res.writeHead(404,{ 'Content-Type': 'text/html' });
        res.end('sorry not fond');break;
    }
    
}
module.exports = postmethods;