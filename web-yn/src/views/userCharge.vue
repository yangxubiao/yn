<template>
    <div>
      <my-header></my-header>
      
      <div id="userRecord">
        <el-form ref="form" :model="form" label-width="80px" id="form">
            <el-form-item label="用户名称" >
              <el-input v-model="form.name" autofocus placeholder="请输入用户名称" ></el-input>
            </el-form-item>
            <el-form-item label="充值日期">
                <el-date-picker type="date" placeholder="充值日期" v-model="form.date" style="width: 100%;"></el-date-picker>
              </el-form-item>

              <el-form-item label="充值金额">
                  <el-input type="number" placeholder="请确认充值金额" v-model="form.monty" style="width: 100%;"></el-input>
                </el-form-item>

              <el-form-item label="审批人">
                  <el-input v-model="form.auditor"  disabled placeholder="审批人"></el-input>
                </el-form-item>
        
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即提交</el-button>
              <el-button @click="chargeAll" >充值记录</el-button>
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
            name: '',     
            date: '',
            auditor:'',
            monty:''
          }
        }
     },
     created(){
      let Admin=JSON.parse(sessionStorage.getItem("Admin"))
         if(Admin===null || Admin.uid!==1){
              this.$notify({
                title: '警告',
                message: '无法进入充值页面,请联系店长',
                type: 'warning'
              });
              this.$router.push("/index")
          }else if(Admin!==null && Admin.uid===1){
            this.form.auditor=Admin.uname;
            this.$notify({
                title: '成功',
                message: '欢迎店长来到充值页面',
                 type: 'success'
              });
          }
    },
     components:{
              'my-header':myHeader
       },
     methods: {
        chargeAll(){
          this.$router.push("/chargeAll")
         },
        onSubmit() {
          let isArr=[];
           let form=this.form
           for(let item in form){
            if(typeof form[item]==="object"){
              var date=form[item];
              date=date.toLocaleDateString(new Date(date));
              form[item]=date;
            }
         };
         for(let i in form){
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
                      h('span', null, '确认充值'),
                      h('i', { style: 'color: teal' },this.form.monty+"元")
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
                   form=JSON.stringify(form);
                     this.axios.get("/user/charge?form="+form).then(res=>{
                       var result=res.data
                           if(result.code===-1){
                            this.$notify({
                                 title: '警告',
                                 message: result.msg,
                                 type: 'warning'
                              });
                           }else if(result.code===-2){
                             this.$notify({
                                  title: '警告',
                                   message: result.msg,
                                  type: 'warning'
                              });
                           }else if(result.code===1){
                            this.$notify({
                                  title: '成功',
                                  message:"充值成功",
                                  type: 'success'
                              });
                              console.log(result.data)
                         var user=JSON.stringify(result.data[0]); 
                     
                         sessionStorage.setItem('user',user);  

                             this.$router.push("/index")
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
      }
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