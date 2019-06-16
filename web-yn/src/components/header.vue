<template>
       <div id="header">
          <div v-if="isLogin==false" class="userInfo">
            <el-button  class="history"  type="success"  @click="history">返回首页</el-button>
            <el-button class="back" type="primary"  @click="back">返回</el-button>
            <el-button type="info" class="Admin" @click="Admin">切换管理员</el-button>
            <el-button type="warning"  @click="isel(1)">请登录</el-button>&nbsp;&nbsp;
            <el-button type="warning"  @click="isel(0)">注册</el-button>  
          </div>
          <div v-else class="userInfo">
                <el-button type="primary" class="history"  @click="history">返回首页</el-button>
                <el-button class="back" type="primary"  @click="back">返回</el-button>
                <el-button type="info" class="Admin"  @click="Admin">切换管理员</el-button>
                <span>Welcome&nbsp;&nbsp;</span>
                <span>{{user.uname}}&nbsp;&nbsp;</span>
                <span>余额&nbsp;￥</span>
               <span class="info" v-text="user.Cmoney.toFixed(2)"></span>
               <span class="task" @click="destroy">&nbsp;&nbsp;注销</span>
          </div>
       </div>    
</template>

<script>
   export default {
    inject:['reload'],
       data(){
           return {
              isLogin:false,
              user:{}
           }
       },
       created(){
            let user=JSON.parse(sessionStorage.getItem("user"))
            if(user!==null){
             user.Cmoney=parseInt(user.Cmoney)
                this.user=user;
                this.isLogin=true
            }else{
              this.isLogin=false
            }
       },
       methods:{
        back(){
          this.$router.go(-1)
        },
        destroy(){
            const h = this.$createElement;
            this.$msgbox({
              title: '消息',
              message: h('p', null, [
                h('span', null, '请确认是否要切换用户'),
                h('i', { style: 'color: teal' }, this.user.uname)
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
               this.isLogin=false;
                sessionStorage.removeItem('user');
                this.reload();
            })    
        },
        history(){
            this.$router.push("/index")
         },
         isel(key){
             if(key!==1)
                this.$router.push("/userRegister")
            else   
                this.$router.push("/userLogin")
         },
         Admin(){
            this.$router.push("/")
         }
       }
   }
</script>

<style>
 #header{
     position:fixed;
     width:1200px;
     height:50px;
     top:0;
     left:0;
     right:0;
     margin:0 auto;
  }
button.history{
      position:absolute;
      left:140px;
      top:5px;
  }
  button.back{
    position:absolute;
      left:0px;
      top:5px;
  }
  button.Admin{
    position:absolute;
      left:380px;
      top:5px;
  }
  #header .userInfo{
    float:right;
    line-height:50px;
  }
  #header .userInfo a,#header .userInfo span{
      color:#fff;
  }
  #header .userInfo a.task:hover,#header .userInfo span.task:hover{
     color:#f00;
     cursor: pointer;
  }
  #header .userInfo span.info{
      color:#f00;
  }
</style>