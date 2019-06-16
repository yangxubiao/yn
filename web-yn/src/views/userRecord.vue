<template>
        <div>
           <my-header></my-header>
          <div id="userRecord">
            <el-form ref="form" :model="form" label-width="80px" id="form">
                <el-form-item label="用户名称" >
                  <el-input v-model="form.name" disabled autofocus placeholder="请输入用户名称" ></el-input>
                </el-form-item>
                <el-form-item label="记录日期">
                    <el-date-picker type="date" placeholder="记录日期" v-model="form.date" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                <el-form-item label="记录详情">
                  <el-input type="textarea" v-model="form.desc"  placeholder="请输业务内容"></el-input>
                </el-form-item>
                <el-form-item label="消费金额">
                    <el-input type="text"  placeholder="请确认消费金额" v-model="form.money" ></el-input>
                  </el-form-item>
                <el-form-item label="业务人员" >
                    <el-input placeholder="请输入业务人员" disabled  v-model="form.business"></el-input>
                  </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">立即提交</el-button>
                </el-form-item>
              </el-form>
            </div>
        </div>
      </template>
      
      <script>
         import myHeader from '@/components/header.vue'
        export default {
          data() {
            return {
              form: {
                name: '',  //用户名称
                date: '',  //记录日期
                desc:'',   //记录详情
                money:'',  //消费金额
                business:'', // 业务人员
              }
            }
         },
         components:{
              'my-header':myHeader
        },
        created(){
          let user=JSON.parse(sessionStorage.getItem('user'))
           if(user===null){
            this.$notify({
                title: '警告',
                 message: '请先登陆用户账户,之后在进入用户记录页面',
                 type: 'warning'
              });
              this.$router.push("/userLogin")
           }else{
              this.form.name=user.uname
           }
          let Admin=JSON.parse(sessionStorage.getItem('Admin'))
             if(Admin===null){
              this.$notify({
                title: '警告',
                 message: '请先登陆管理员账户,之后在进入用户记录页面',
                 type: 'warning'
               });
               this.$router.push("/")        
            }else{
              this.form.business=Admin.uname;
            }
                      
        },
         methods: {
            onSubmit() {
                let isArr=[];
                  let form=this.form
                  var date=new Date(form["date"])
                  date=date.toLocaleDateString();
                  form["date"]=date;
                  for(let i in form){
                    console.log(typeof form[i])
                    if(form[i].trim()!==""){
                          isArr.push(true)
                       }else{
                            isArr.push(false)
                        }
                  }
                isArr=isArr.every(prop=>{
                    return prop===true;
                  })
                if(isArr!==false){
                  const h = this.$createElement;
                        this.$msgbox({
                          title: '消息',
                          message: h('p', null, [
                            h('span', null, '再次确定是否'),
                            h('i', { style: 'color: teal' }, '更改')
                          ]),
                          showCancelButton: true,
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                              instance.confirmButtonLoading = true;
                              instance.confirmButtonText = '执行中...';
                              setTimeout(() => {
                                done();
                                setTimeout(() => {
                                  instance.confirmButtonLoading = false;
                                }, 300);
                              }, 1000);
                            } else {
                              done();
                            }
                          }
                        }).then(action => {
                           var user=JSON.stringify(form);
                            this.axios.get("user/history?user="+user).then(res=>{
                                 var encode=res.data.code;
                                 var msg=res.data.msg;
                                 if(encode===1){
                                    let user=JSON.stringify(res.data.data[0]);
                                 
                                    sessionStorage.setItem('user',user);
                                     this.$notify({
                                      title: '成功',
                                        message: '记录成功,返回首页',
                                      type: 'success'
                                  });
                                  var that=this;
                                  setTimeout(function(){
                                    that.$router.push("/index")
                                  },1500)
                                    
                                 }else if(encode===-1){
                                  this.$notify({
                                      title: '警告',
                                      message: msg,
                                      type: 'warning'
                                    });
                                 }else{
                                  this.$notify({
                                      title: '警告',
                                      message: msg,
                                      type: 'warning'
                                    });
                                 }
                            })
                        });
                }else{
                  this.$notify({
                  title: '警告',
                    message: '文本框必须全部输入,且必须充值金额为整数',
                    type: 'warning'
                  });
                }


            }
          },
        }
      </script>
      
      
      <style>
      #form{
          width:330px;
          height:330px;
          margin-left:20px;
        }
      #userRecord{
        width:400px;
        height:430px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 0px 10px 2px #fff;
      }
      </style>