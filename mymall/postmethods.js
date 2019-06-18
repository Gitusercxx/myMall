var db_Operation = require('./operationDB');
function postmethods(req, res) {
    console.log(req.path)
    switch (req.path) {
        case '/userlog':
            var posttel = req.body._id;
            var postpass = req.body.password
            db_Operation.read('user', { '_id': posttel }, check_log);
            function check_log(err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end(err.toString());
                } else {
                    if (result[0]) {
                        if (result[0].password == postpass) {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(JSON.stringify(result));
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(JSON.stringify(['password_mistake']));
                        }
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(JSON.stringify(['unregistered']));
                    }
                    console.log(result)
                }
            }
            break;
        case '/userreg':
            var postdat = req.body;
            db_Operation.add('user', postdat, function (err, result) {
                if (err) {
                    console.log(err.code)
                    if (err.code == 11000) {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(JSON.stringify(['reg_fail_repeat']));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(JSON.stringify(['reg_fail']));
                    }
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(JSON.stringify(['reg_success']));
                }
            })
            break;
        case '/getuser':
            var tel = req.body;
            db_Operation.read('user', tel, get_user);
            function get_user(err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end(err.toString());
                } else {
                    if (result[0]) {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(JSON.stringify(result));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(JSON.stringify(['unregistered']));
                    }
                    console.log(result)
                }
            }
            break;
        case '/changepass':
            var dat = req.body;
            console.log(dat)
            db_Operation.changepass('user', dat, change_pass);
            function change_pass(err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end(err.toString());
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(JSON.stringify(result));
                }
            }
            break;
        case '/change':
            var dat = req.body;
            console.log(dat)
            db_Operation.change('user', dat, change);
            function change(err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end(err.toString());
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(JSON.stringify(result));
                }
            }
            break;
        case '/buy':
            var dat = req.body;
            var goods = dat.goods;
            add_allorder(dat);
            var obj = { id: dat.id, change: ['buy', { ordernumber: dat.ordernumber, goods: goods, address: dat.address }] };
            for (let i = 0; i < goods.length; i++) {
                db_Operation.read('goods', { "_id": goods[i].number }, function (err, result) {
                    var residue = parseInt(result[0].residue) - parseInt(goods[i].num);
                    if (residue >= 0) {
                        db_Operation.change('goods', { id: goods[i].number, change: { residue } }, function (err, result) { });
                        if (i == goods.length - 1) {
                            addbuy();
                        }
                    } else {
                        console.log(result)
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end('抱歉,第' + (i + 1) + '款商品库存不足');
                    }
                });

            }
            function addbuy() {
                db_Operation.changeArr('user', obj, buy);
                function buy(err, result) {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/html' });
                        res.end(err.toString());
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(JSON.stringify(result));
                    }
                }
            }
            function add_allorder(dat) {
                var obj = {};
                obj._id = dat.id.toString() + new Date().getTime();
                obj.ordernumber = dat.ordernumber;
                obj.goods = dat.goods;
                obj.address = dat.address;
                db_Operation.add('allorder', obj, add_allorder);
                function add_allorder(err, result) {
                }
            }
            break;
        case '/order':
            var dat = req.body;
            var obj = { id: dat.id, control: dat.control, change: ['order', dat.goods] }
            db_Operation.changeArr('user', obj, addorder);
            function addorder(err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end(err.toString());
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(JSON.stringify(result));
                }
            }
            break;
        case '/history':
            var dat = req.body;
            db_Operation.change('user', { id: dat.id, change: dat.change }, history);
            function history(err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end(err.toString());
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(JSON.stringify(result));
                }
            }
            break;
        case '/mallchange':
            var dat = req.body;
            db_Operation.change('mallData', dat, mallchange);
            function mallchange(err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end(err.toString());
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(JSON.stringify(result));
                }
            }
            break;
        case '/goodschange':
            var dat = req.body.dat;
            var flag = 0;
            for (var i = 0; i < dat.length; i++) {
                db_Operation.change('goods', { id: dat[i].id, change: dat[i].goods }, function (err, result) {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/html' });
                        res.end(err.toString());
                    } else {
                        flag++;
                        if (flag == dat.length) {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(JSON.stringify(result));
                        }
                    }
                })
            }
            break;
        case '/delete':
            var dat = req.body;
            var flag = 0;

            db_Operation.delete('goods', dat, function (err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end(err.toString());
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(JSON.stringify(result));
                }
            })
            break;
        case '/addgoods':
            var dat = req.body.addgoods;
            var flag = 0;
            console.log(dat)
            for (var i = 0; i < dat.length; i++) {
                console.log(dat[i])
                db_Operation.add('goods', dat[i], function (err, result) {
                    if (err) {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(JSON.stringify(err));
                    } else {
                        flag++;
                        if (flag == dat.length) {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(JSON.stringify(['add~ok']));
                        }

                    }
                })
            }
            break;
        case '/pay_check':
            var dat = req.body;
            db_Operation.change('allorder', dat, pay_check);
            function pay_check(err, result) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end(err.toString());
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(JSON.stringify(result));
                }
            }
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('sorry not fond'); break;
    }

}
module.exports = postmethods;