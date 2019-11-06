//引入express模板
const express=require("express");
//引入pool.js连接池
const pool=require("../pool")
//创建路由
var router=express.Router();


router.get("/login",(req,res)=>{
 var $uname=req.query.uname;
 var $upwd=req.query.upwd;          
pool.query("SELECT * FROM  yn_admin WHERE uname=? and upwd=?",[$uname,$upwd],(err,result)=>{
    if(err) throw err;
     if(result.length>0){
      res.send({code:1,data:result})
     }else{
       res.send({code:-1,data:"not User"});
     }
   })
})

router.get("/ulogin",(req,res)=>{
  var $uname=req.query.uname;
  var $upwd=req.query.upwd;          
 pool.query("SELECT * FROM  yn_user WHERE uname=? and upwd=?",[$uname,$upwd],(err,result)=>{
     if(err) throw err;
      if(result.length>0){
       res.send({code:1,data:result})
      }else{
        res.send({code:-1,data:"not User"});
      }
    })
 });


(function(){
   router.get("/register",(req,res)=>{
    var user=JSON.parse(req.query.user);
    var uname=user.name;
    var upwd=user.pass;
    var Rdate=user.date;
    var Cmoney=parseInt(user.money);
    new Promise((reslove,reject)=>{
      pool.query("SELECT uid FROM  yn_user where uname = ?",[uname],(err,result)=>{
        if(err) throw err;
         if(result.length>0){
               res.send({code:3,msg:"用户名已存在,请换您的大名或者其他名称"})
            }else{
              reslove();
            }
        })
    }).then(async function(){
      new Promise((reslove,reject)=>{
        pool.query("INSERT INTO yn_user VALUES(?,?,?,?,?)",[null,uname,upwd,Rdate,Cmoney],(err,result)=>{
          if(err)  throw err;
            if(result.affectedRows>0){
                   reslove();
            }else{
                res.send({code:-2,msg:"系统插入新用户失败,请联系技术人员来进行维护"})
            }
      })
    }).then(()=>{
      pool.query("SELECT * FROM  yn_user WHERE uname=? ",[uname],(err,result)=>{
        if(err) throw err;
          if(result.length>0){
                 res.send({code:1,data:result})
             }else{
                 res.send({code:-1,msg:"系统查找失败,请关闭浏览器页面,或者清理浏览器内存,之后在重新注册"})
            }
         })
    })  
    })
   });
})();



(function(){
  router.get("/",(req,res)=>{
    var arr={};
    new Promise((reslove,reject)=>{
    pool.query("SELECT * FROM  yn_user",(err,result)=>{
       if(err) throw err;
       else{
        arr.data=result;  
        reslove();
       } 
    })
  }).then(function(){
    pool.query("SELECT SUM(Cmoney) FROM  yn_user",(err,result)=>{
      if(err) throw err;
      arr.total=result;
      res.send(arr);
    })
  })
  })
})()


router.get("/isAll",(req,res)=>{
  let boolean=req.query.boolean;
    if(boolean==="1"){
      pool.query("SELECT * FROM yn_user ORDER BY Cmoney DESC",(err,result)=>{
        if(err) throw err;
        res.send(result)  
     })
    }else{
     pool.query("SELECT * FROM yn_user ORDER BY Cmoney ASC",(err,result)=>{
      if(err) throw err;
      res.send(result)  
   })
    }
});

(function(){
  router.get("/charge",(req,res)=>{
    var user=JSON.parse(req.query.form);
    var uname=user.name;
    var Rdate=user.date;
    var total=parseInt(user.monty);
    var auditor=user.auditor;
    new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM  yn_user where uname = ?",[uname],(err,result)=>{
          if(err) throw err;
          if(result.length>0){   
            debugger;
        var  Cmoney=(parseInt(result[0].Cmoney)+parseInt(total));
        result[0].Cmoney=Cmoney;
        var  newResult=result;    
        var obj = {
          newResult,
          Cmoney
        }
          resolve(obj);
          }else{
            res.send({code:-1,msg:"充值用户名不存在,请核实用户名称是否正确"})
          }
        })
    }).then(function(obj){
      new Promise((resolve,reject)=>{
            pool.query("UPDATE yn_user SET Cmoney=? WHERE uname=?",[obj.Cmoney,uname],(err,result)=>{
              if(err) throw err;
              if(result.affectedRows>0){
                  resolve(obj.newResult)
              }else{
                res.send({code:-2,msg:"系统更改失败,请联系技术人员来进行维护"})
              }
          })
      }).then(function(newResult){
        pool.query("INSERT INTO yn_charge VALUES(?,?,?,?,?)",[null,uname,Rdate,total,auditor],(err,result)=>{
          if(err) throw err;
          if(result.affectedRows>0){
            res.send({code:1,data:newResult})  
          }else{
            res.send({code:-2,msg:"系统充值失败,请联系技术人员来进行维护"})
          }
        })
      })
    })
  })
})();





router.get("/update",(req,res)=>{
    var user=JSON.parse(req.query.user);
    var uname=user.uname;
    var upwd=user.pass;
    var Rdate=user.date;
    var uid=user.uid;
    var Cmoney=parseInt(user.money);
   pool.query("UPDATE yn_user SET uname=? , upwd=? , Rdate=? , Cmoney=? WHERE uid=?",[uname,upwd,Rdate,Cmoney,uid],(err,result)=>{
       if(err) throw err;
      if(result.affectedRows>0){
        res.send({code:1,msg:"修改成功"})
      }else{
        res.send({code:-1,msg:"系统更改失败,请关闭浏览器页面,或者清理浏览器内存,之后在重新注册"})
      } 

   })
});

(function(){

  router.get("/history",(req,res)=>{
    var user=JSON.parse(req.query.user);
    var uname=user.name; //用户名称
    var Rdate=user.date; //记录日期
    var descInfo=user.desc; //记录详情
    var total=user.money; //消费金额 
    var head=user.business; // 业务人员 
    new Promise((reslove,reject)=>{
    pool.query("SELECT * FROM  yn_user where uname = ?",[uname],(err,result)=>{
      if(err) throw err;
      if(result.length>0){
        var  Cmoney=(parseInt(result[0].Cmoney)-parseInt(total));
        result[0].Cmoney=Cmoney;
        var newResult=result;
        var obj = {
          newResult,
          Cmoney
        }
           reslove(obj)
       }else{
           res.send({code:-1,msg:"记录用户名不存在,请核实用户名称是否正确,或者重新登陆"})
       }

    })
  }).then(function(obj){
    new Promise((resolve,reject)=>{
    pool.query("UPDATE yn_user SET Cmoney=? WHERE uname=?",[obj.Cmoney,uname],(err,result)=>{
      if(err) throw err;
         if(result.affectedRows>0){
          resolve(obj.newResult)
      }else{
        res.send({code:-2,msg:"几率更改失败,请联系技术人员来进行维护,或者重新登陆"})
      }
     })
  }).then(function(newResult){
    pool.query("INSERT INTO yn_history VALUES(?,?,?,?,?,?)",[null,uname,Rdate,descInfo,total,head],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
        res.send({code:1,data:newResult})  
      }else{
        res.send({code:-2,msg:"系统查询失败,请联系技术人员来进行维护,或者重新登陆"})
      }
    })
  })    
})
});
})();


(function(){
  router.get("/u",(req,res)=>{
    var uname=req.query.uname;
    new Promise((reslove,reject)=>{
      pool.query("SELECT * FROM  yn_history WHERE uname=?",[uname],(err,result)=>{ 
        if(err) throw err;
          if(result.length>0){
             reslove(result)
          }else{
              res.send({code:-1,msg:"此用户目前没有消费记录"})
          }
      })
    }).then(function(result){
      var data=result;
      pool.query("SELECT SUM(total) FROM  yn_history WHERE uname=?",[uname],(err,result)=>{
          if(err) throw err;
          res.send({code:1,data:data,total:result})
        })
    })
  })
})();




(function(){
  router.get("/chargeAll",(req,res)=>{
    var arr={};
    new Promise((reslove,reject)=>{
      pool.query("SELECT * FROM  yn_charge",(err,result)=>{
        if(err) throw err;
        else{
        arr.data=result;
        reslove(); 
        } 
       })
    }).then(function(){
          pool.query("SELECT SUM(total) FROM  yn_charge",(err,result)=>{
            if(err) throw err;
            arr.total=result;
            res.send(arr);
          })
      })
    })
})();




router.get("/All",(req,res)=>{
  let boolean=req.query.boolean;
    if(boolean==="1"){
      pool.query("SELECT * FROM yn_charge ORDER BY total DESC",(err,result)=>{
        if(err) throw err;
        res.send(result)  
     })
    }else{
     pool.query("SELECT * FROM yn_charge ORDER BY total ASC",(err,result)=>{
      if(err) throw err;
      res.send(result)  
   })
    }
});


(function(){
  router.get("/c",(req,res)=>{
    var uname=req.query.uname;
  new Promise((relove,reject)=>{
      pool.query("SELECT * FROM  yn_charge WHERE uname=?",[uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
           relove(result)
        }else{
            res.send({code:-1,msg:"此用户目前没有充值记录"})
        }
    })
    }).then(function(result){
      var data=result;
      pool.query("SELECT SUM(total) FROM  yn_charge WHERE uname=?",[uname],(err,result)=>{
      if(err) throw err;
     res.send({code:1,data:data,total:result})
   })
    })
 })
})();

module.exports=router;
