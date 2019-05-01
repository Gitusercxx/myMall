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
                console.log(data)
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
                basepath.collection(collection).updateOne({'_id':id},{$set: changedat},function(err,result){
                    fn(err,result);
                });
                db.close();
            }
        })
    }

};
module.exports=db_Operation;
