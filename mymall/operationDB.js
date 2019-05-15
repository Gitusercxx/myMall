var mongodb = require('mongodb');
var dburl = 'mongodb://127.0.0.1:27017/myMall';

var db_Operation = {
    add:function(collection,data,fn){
        mongodb.connect(dburl,{ useNewUrlParser: true },function(err,db){
            if(err){
                fn(err,null);
            }else{
                var basepath = db.db('myMall');
                basepath.collection(collection).insertOne(data, function(err, result){
                    fn(err,result);
                })
                db.close();
            }
            
        })
    },
    read:function(collection,data,fn){
        mongodb.connect(dburl,{ useNewUrlParser: true },function(err,db){
            if(err){
                fn(err,null);
            }else{
                var basepath = db.db('myMall');
                basepath.collection(collection).find(data).toArray(function(err,result){
                    fn(err,result);
                });
                db.close();
            }
        })
    },
    changepass:function(collection,data,fn){
        mongodb.connect(dburl,{ useNewUrlParser: true },function(err,db){
            if(err){
                fn(err,null);
            }else{
                var basepath = db.db('myMall');
                var tel = data._id;
                var changetext = data.password
                basepath.collection(collection).updateOne({'_id':tel},{$set:{'password':changetext}},function(err,result){
                    fn(err,result);
                });
                db.close();
            }
        })
    },
    change:function (collection,data,fn){
        mongodb.connect(dburl,{ useNewUrlParser: true },function(err,db){
            if(err){
                fn(err,null);
            }else{
                var id = data.id;
                var changedat = data.change
                var basepath = db.db('myMall');
                console.log({'_id':id},{$set: changedat})
                basepath.collection(collection).updateOne({'_id':id},{$set: changedat},function(err,result){
                    fn(err,result);
                });
                db.close();
            }
        })
    },
    changeArr:function (collection,data,fn){
        mongodb.connect(dburl,{ useNewUrlParser: true },function(err,db){
            if(err){
                fn(err,null);
            }else{
                var id = data.id;
                var control = data.control;
                var changearr = data.change[0];
                var changeval = data.change[1];
                var basepath = db.db('myMall');
                if(changearr == 'like'){
                    if(control == 'add'){
                        basepath.collection(collection).updateOne({'_id':id},{$push:{"like":changeval}},function(err,result){
                            fn(err,result);
                        });
                    }else{
                        basepath.collection(collection).updateOne({'_id':id},{$pull:{"like":changeval}},function(err,result){
                            fn(err,result);
                        });
                    }
                } else if(changearr == 'order'){
                    if(control == 'add'){
                        basepath.collection(collection).updateOne({'_id':id},{$push:{"order":changeval}},function(err,result){
                            fn(err,result);
                        });
                    }else{
                        basepath.collection(collection).updateOne({'_id':id},{$pull:{"order":changeval}},function(err,result){
                            fn(err,result);
                        });
                    }
                }else if(changearr == 'buy'){
                    basepath.collection(collection).updateOne({'_id':id},{$push:{"buy":changeval}},function(err,result){
                        fn(err,result);
                    });
                }
                
                
                db.close();
            }
        })
    },

};
module.exports=db_Operation;
