<template>
    <div>
        <my-header></my-header>
  <div id="userRegister">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" id="form">
        <el-form-item label="更改用户名称" >
            <el-input v-model="ruleForm.uname" autofocus placeholder="请输入更改名称" ></el-input>
          </el-form-item>
       <el-form-item label="更该注册日期">
              <el-date-picker type="date" placeholder="请输入更该日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="更该充值金额">
          <el-input type="number"  placeholder="请输入更该金额" v-model="ruleForm.money" ></el-input>
     </el-form-item>
    <el-form-item label="更改原始密码" prop="pass">
        <el-input type="password" placeholder="请输入原始密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
  
      <el-form-item label="确定更改密码" prop="checkPass">
        <el-input type="password"  placeholder="请确认更改密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
  
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认更改</el-button>
     </el-form-item>
    </el-form>
    </div>
  </div>
    </template>
  
  
    <script>
      import myHeader from '@/components/header.vue'
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
            uname:'',
            date:'',
            money:"",
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
                message: '无法进入修改用户信息页面,请联系店长',
                type: 'warning'
              });
              this.$router.push("/index")
          }else if(Admin!==null && Admin.uid===1){
            
       let user=JSON.parse(sessionStorage.getItem("user"))
            if(user===null){
              this.$notify({
                title: '警告',
                message: '请先登陆用户,在进入修改页面',
                type: 'warning'
              });
              this.$router.push("/userLogin")
            }else{
            this.ruleForm.money=user.Cmoney;
            this.ruleForm.pass=user.upwd;
            this.ruleForm.checkPass=user.upwd;
            this.ruleForm.uname=user.uname;
            this.ruleForm.date=user.Rdate;
              this.$notify({
                 title: '成功',
                 message: '欢迎店长来到修改信息页面',
                 type: 'success'
              });
           }
          }
        },
      components:{
              'my-header':myHeader
       },
      methods: {
        submitForm(formName) {
          let isArr=[];
        let ruleForm=this.ruleForm;
             var date=new Date(ruleForm["date"])
               date=date.toLocaleDateString();
                ruleForm["date"]=date;
                ruleForm["money"]=(ruleForm["money"]+"")
        for(let i in ruleForm){
               if(ruleForm[i].trim()!==""){
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
              var  user=JSON.parse(sessionStorage.getItem("user"))
                      ruleForm.uid=user.uid;
                user=JSON.stringify(ruleForm);
                  this.axios.get("/user/update?user="+user).then(res=>{
                        if(res.data.code===1){
                          this.$notify({
                              title: '成功',
                              message: '更改成功,用户名失效,请重新登陆',
                              type: 'success'
                         });
                          sessionStorage.removeItem('user');
                          var that=this
                          setTimeout(function(){
                            that.$router.push("/userLogin")
                           },1500)
                         }else{
                          this.$notify.error({
                            title: '错误',
                            message:"系统更改失败,请关闭浏览器页面,或者清理浏览器内存,之后在重新注册"
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