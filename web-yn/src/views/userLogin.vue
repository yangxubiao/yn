<template>
    <div>
            <div id="register">
             <div id="register-top">
                 <div class="register-top-letf">
                <a href="javascript:;" id="logo">
                    <img src="img/login/login.gif" alt="">
                </a>
                </div>
                <div class="register-top-right">
                    
                </div>
             </div>
             <div id="register-bottom-parent">
             <div id="register-bottom">
                <div class="register-bottom-left">
                  <div class="register-bottom-left-top">
                     <span>雅妮SPA欢迎您的登陆</span>
                  </div>
                  <div class="register-bottom-left-middle">
                        <a href="javascript:;">
                           账户登录
                        </a>
                  </div>
                  <table id="register-bottom-left-bottom">
                       <tr>
                           <td>
                               <div class="register-bottom-left-bottom-user">
                               </div>
                               <input type="text" autofocus  v-model="uname" placeholder="用户名"> 
                                  <p v-text="Nmsg"></p>
                          </td>
                       </tr>
                       <tr> 
                            <td>
                                <div class="register-bottom-left-bottom-upwd"></div>
                                <input type="password"  v-model="upwd" placeholder="密码"> 
                                <p v-text="Upwd"></p>
                            </td>
                        </tr>
                        <tr>
                                <td>   
                                    <router-link to="/userRegister">
                                    点此注册
                                  </router-link>

                                </td>
                         </tr>
                          <tr>
                             <td>
                                    <a href="javascript:;"  @click="login">登录</a>
                            </td>
                         </tr>
                    </table>
                </div>
             </div>
        </div>
    </div>
    </div>
    </template>
    
    <script>
    export default {
        data(){
            return {
                    uname:"",
                    upwd:"",
                    Nmsg:"",
                    Upwd:"",
            }
        },
        methods:{
         login(){
             if(this.uname.trim().length!=0&&this.upwd.trim().length!=0){
                    var url="/user/ulogin?uname="+this.uname+"&upwd="+this.upwd;
                      this.axios.get(url).then(res=>{
                         if(res.data.code==1){
                              var user=JSON.stringify(res.data.data[0]);
                               sessionStorage.setItem('user',user);
                               this.$notify({
                                  title: '成功',
                                  message: '登陆成功',
                                  type: 'success'
                                });
                               this.$router.push("/index");
                           }else{
                            this.$notify.error({
                                title: '错误',
                                message: '用户名或密码错误'
                            });
                         }
                  })
             }
         }
        },
        watch:{
           uname(){
              if(this.uname.trim().length<=8&&this.uname.trim().length>=2)
                this.Nmsg="用户名格式正确" 
                else
                this.Nmsg="用户名最少2~8个字母或数汉字";
           },
           upwd(){
              if(this.upwd.trim().length==11)
                this.Upwd="密码格式正确" 
                else
                this.Upwd="密码必须11数字";
           },
        }
    }
    </script>
    
    <style scoped>
     * {
      margin: 0;
      padding: 0; }
    
    ul {
      list-style: none; }
      #register{
          padding:3rem 0;
      }
      #logo img{
        width:400px;
        height:140px;
        margin-top:-10px;
      }
      #logoText{
        position:relative;
        top:70px;
        left:0px;
    }
    #register #register-top {
      width: 1190px;
      height: 100px;
      box-sizing: border-box;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px; }
    
    #register #register-top .register-top-letf a {
      float: left;margin-top:20px; }
    
    #register #register-top .register-top-letf h2 {
      float: left;
      margin-top: 20px;
      margin-left: 35px;
      color: #666;
      font: 500 25px "Arial,Verdana"; }
    
    #register #register-top .register-top-right {
      margin-top: 40px; }
    
    #register #register-top .register-top-right a {
      display: block;
      font: 500 12px "Arial,Verdana";
      color: #999;
      text-decoration: none; }
    
    #register #register-top .register-top-right a:hover {
      text-decoration: underline;
      color: #e83632; }
    
    #register #register-top .register-top-right a img {
      vertical-align: middle; }
    
    #register #register-middle {
      width: 100%;
      height: 40px;
      background: #fff8f0;
      text-align: center;
      box-sizing: border-box;
      padding: 12px 0; }
    
    #register #register-middle .register-middle-center {
      color: #999;
      font-size: 14px; }
    
    #register #register-middle .register-middle-center img {
      vertical-align: middle; }
    
    #register #register-middle .register-middle-center a {
      color: #222;
      text-decoration: none; }
    
    #register #register-middle .register-middle-center a:hover {
      text-decoration: underline; }
    
    #register #register-bottom:before {
      content: "";
      display: table; }
    
    #register #register-bottom {
      width: 1200px;
      height: 475px;
      margin: 0 auto;
      background: url("/img/login/Login.jpg") no-repeat;
      background-size:60% 100% ;
     
      }
   
    #register #register-bottom .register-bottom-left {
      width: 346px;
      height: 438px;
      background: #fff;
      margin-left: 50rem;
      margin-top: 1rem; }
    
    #register #register-bottom .register-bottom-left .register-bottom-left-top {
      width: 100%;
      height: 40px;
      background: #fff8f0;
      text-align: center;
      line-height: 40px; }
    
    #register #register-bottom .register-bottom-left .register-bottom-left-top span {
      color: #999;
      font-size: 18px; }
    
    #register #register-bottom .register-bottom-left .register-bottom-left-top img {
      vertical-align: middle; }
    
    #register #register-bottom .register-bottom-left .register-bottom-left-middle {
      width: 100%;
      height: 54px;
      border-bottom: 1px solid #f0f0f0; }
    
    #register #register-bottom .register-bottom-left .register-bottom-left-middle a {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      color: #666;
      text-decoration: none;
      text-align: center;
      line-height: 54px;
      font-size: 17px;
      font-weight: bold; }
    
    #register #register-bottom .register-bottom-left .register-bottom-left-middle a:visited {
      color: #e4393c; }
    
    #register #register-bottom .register-bottom-left #register-bottom-left-bottom {
      width: 100%;
      height: 55%;
      padding-top: 30px;
      padding-left: 20px;
      padding-right: 20px; }
      #register #register-bottom .register-bottom-left #register-bottom-left-bottom  td {
        width: 100%;
        height: 38px; }
        #register #register-bottom .register-bottom-left #register-bottom-left-bottom  td div {
          float: left;
          width: 38px;
          height: 38px;
          border-top: 1px solid #bdbdbd;
          border-bottom: 1px solid #bdbdbd;
          border-left: 1px solid #bdbdbd;
          background: url("/img/login/pwd-middle02.png") 0px 0px; }
        #register #register-bottom .register-bottom-left #register-bottom-left-bottom  td input {
          width: 85%;
          height: 36px;
          outline: none;
          font-size: 14px;
          text-indent: 0.6em;
          margin-bottom: 20px; }
      #register #register-bottom .register-bottom-left #register-bottom-left-bottom tr:first-child p {
        margin-top: -12px; color:firebrick;text-align:center}
      #register #register-bottom .register-bottom-left #register-bottom-left-bottom  tr:nth-child(2) td div {
        background: url("/img/login/pwd-middle02.png") -47px 0px; }
      #register #register-bottom .register-bottom-left #register-bottom-left-bottom  tr:nth-child(2) td p {
        margin-top: 6px;  color:firebrick;text-align:center}
      #register #register-bottom .register-bottom-left #register-bottom-left-bottom tr:nth-child(2) td input {
        margin-bottom: 0px; }
      #register #register-bottom .register-bottom-left #register-bottom-left-bottom  tr:nth-child(3) td a {
        display: block;
        font-size: 12px;
        color: #666;
        text-decoration: none;
        margin-left: 83%;
        padding: 20px 0px; }
        #register #register-bottom .register-bottom-left #register-bottom-left-bottom  tr:nth-child(3) td a:hover {
          color: #e4393c;
          text-decoration: underline; }
      #register #register-bottom .register-bottom-left #register-bottom-left-bottom  tr:nth-child(4) td a {
        display: block;
        width: 100%;
        height: 35px;
        font-size: 20px;
        color: #fff;
        text-decoration: none;
        text-align: center;
        line-height: 35px;
        background-image: linear-gradient(to left, #e85356 50%, #e4393c 100%);
        border: 1px solid #e85356;
        border: none; }
    
    #register #register-bottom-parent {
      width: 100%;
      height: 475px;
     background-image: linear-gradient(to  right bottom,    #983472 ,#221737); 
      margin:5rem 0;
       }
    </style>
    
    