<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  provide(){
        return {
            reload:this.reload
         }
       },
     data(){
         return {
               isRouterAlive:true
               }
          },
  methods:{
        reload(){
        this.isRouterAlive=false
        this.$nextTick(function(){
        this.isRouterAlive = true
        })
       }
     }
  }
  </script>

<style>

 *{margin:0;padding:0}
 a,ul,ol,dl{
    list-style:none;
    text-decoration:none;
 }
 body{            
   background-color:rgba(0,0,0,.8);
   position:fixed;
   height:100%;
   width:100%;
   display:flex;
   justify-content: center;
   align-items:center;
 }
</style>
