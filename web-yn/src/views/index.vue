<template>
  <div>  
    <my-header></my-header>
      <el-carousel :interval="2000" height="420px" type="card">
          <el-carousel-item>
            <img src="image/banner1.jpg" class="carousel_image_type">
          </el-carousel-item>
          <el-carousel-item>
            <img src="image/banner2.jpg" class="carousel_image_type">
          </el-carousel-item>
          <el-carousel-item>
            <img src="image/banner3.jpg" class="carousel_image_type">
          </el-carousel-item>
          <el-carousel-item>
            <img src="image/banner4.jpg" class="carousel_image_type">
          </el-carousel-item>
          <el-carousel-item>
              <img src="image/banner5.jpg" class="carousel_image_type">
            </el-carousel-item>
        </el-carousel>
    <div id="menu">
      <ul>
           <li title="用户登陆">   <!--用户登陆-->
              <router-link to="/userLogin">
                <img src="image/userLogin.png" alt="">
              </router-link>
            </li>
            <li title="用户注册" >     <!--用户注册-->
              <router-link to="/userRegister">
                <img src="image/userRegister.png" alt="">
              </router-link>
            </li>
            <li title="用户记录">    <!--用户每次记录-->
                <router-link to="/userRecord">
                  <img src="image/userRecord.png" alt="">
                </router-link>
              </li>
          <li title="用户充值"> <!--用户充值-->
                <router-link to="/userCharge">
                  <img src="image/userCharge.png" alt="">
                </router-link>
          </li>
          <li title="用户修改">    <!--用户修改-->
              <router-link to="/userUpdate">   
                <img src="image/userUpdate.png" alt="">
              </router-link>
          </li>
        </ul>
     </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header.vue'
  export default {
    data() {
      return {
        
      }
   },
   components:{
     'my-header':myHeader
   },
   methods: {
     
    }
  }
</script>


<style scoped>

.carousel_image_type{
  width:100%;
  height:400px;
}
 #menu{
     width:1200px;
     margin:4rem auto;
 }
 #menu ul{
   display:flex;
   flex-wrap:wrap;
   justify-content: space-between;
 }
 body{
   background-color:rgba(0.3,0.6,0.3,.7)
 }

</style>