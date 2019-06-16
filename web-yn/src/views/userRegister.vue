<template>
  <div>
<div id="userRegister">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" id="form">
      <el-form-item label="注册名称" >
          <el-input v-model="ruleForm.name" autofocus placeholder="请输入注册名称" ></el-input>
        </el-form-item>
       <el-form-item label="注册日期">
            <el-date-picker type="date" placeholder="注册日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="充值金额">
          <el-input type="number"  placeholder="请确认充值金额" v-model="ruleForm.money" ></el-input>
     </el-form-item>
  <el-form-item label="输入密码" prop="pass">
      <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>


  <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password"  placeholder="请确认密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>


    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="userAll" >所有用户</el-button>
   </el-form-item>
  </el-form>
  </div>
</div>
  </template>


  <script>
   export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
         }
      };
      return {


        ruleForm: {
          pass: '',
          checkPass: '',
          name:'',
          date:'',
          money:""
        },



        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    created(){
      let Admin=JSON.parse(sessionStorage.getItem("Admin"))
         if(Admin===null || Admin.uid!==1){
              this.$notify({
                title: '警告',
                message: '无法进入注册页面,请联系店长',
                type: 'warning'
              });
              this.$router.push("/index")
          }else if(Admin!==null && Admin.uid===1){
            this.$notify({
                title: '成功',
                message: '欢迎店长来到注册页面',
                 type: 'success'
              });
          }
    },


    methods: {
      userAll(){
          this.$router.push("/userList")
      },
      submitForm(formName) {
        let isArr=[];
        let ruleForm=this.ruleForm
         for(let item in ruleForm){
           if(typeof ruleForm[item]==="object"){
              var date=ruleForm[item];
              date=date.toLocaleDateString(new Date(date));
              ruleForm[item]=date;
            }
         };
        for(let i in ruleForm){
               if(ruleForm[i].trim()!==""){
                   isArr.push(true)
              }else{
                   isArr.push(false)
               }
        }
       isArr=isArr.every(prop=>{
           return prop===true;
        })
        if(isArr===true){
         this.$refs[formName].validate((valid) => {
            if (valid) {
               let user=JSON.stringify(ruleForm);
                var url="/user/register?user="+user
                  this.axios.get(url).then(res=>{
                     let result=res.data;
                      if(result.code===1){
                        const h = this.$createElement;
                            this.$msgbox({
                              title: '消息',
                              message: h('p', null, [
                                h('span', null, '新用户创建成功---- '),
                                h('i', { style: 'color: teal' }, `账号${result.data[0].uname}--密码${result.data[0].upwd}--点击确定返回首页`)
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
                                  }, 3000);
                                } else {
                                  done();
                                }
                              }
                            }).then(action => {
                              var user=JSON.stringify(result.data[0]);
                                sessionStorage.setItem('user',user);
                                  this.$router.push("/index")
                            });
                      }else if(result.code===3){
                        this.$notify.info({
                            title: '消息',
                            message: result.msg,
                          });
                      }else{
                        this.$notify({
                            title: '警告',
                            message:result.msg,
                            type: 'warning'
                        });
                      }
                  })
              } else {
                    this.$notify.error({
                    title: '错误',
                    message: '两次密码不一样,请重新输入'
              });
                     return false;
               }
            });
        }else{
          this.$notify({
          title: '警告',
             message: '文本框必须全部输入,且必须充值金额为整数',
             type: 'warning'
        });
       }
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
  
  
  </script>


<style>
       #form{
          width:330px;
          height:330px;
          margin-left:20px;
        }
      #userRegister{
        width:400px;
        height:400px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 0px 10px 2px #fff;
      }
</style>