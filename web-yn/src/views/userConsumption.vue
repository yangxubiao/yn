<template>
    <div>
            <my-header></my-header>
    <el-table
      :data="tableData"
      style="width: 700px"
      height="400px">
      <el-table-column prop="Rdate" label="消费日期"  width="150">
      </el-table-column>
      <el-table-column  prop="uname" label="消费用户"  width="120">
      </el-table-column>
      <el-table-column prop="descInfo" label="服务内容" width="120">
      </el-table-column>
      <el-table-column prop="total" label="消费金额" width="120">
      </el-table-column>
      <el-table-column prop="head" label="服务人员" width="120">
      </el-table-column>
    </el-table>
    <div id="footer">
        <div id="total">
         <span>&nbsp;&nbsp;&nbsp;&nbsp;总额 : ￥ </span>
          <span v-text="total"></span>
            
        </div>
       </div> 
    </div>
  </template>
  

  <script>
      import myHeader from '@/components/header.vue'
    export default {
      data() {
        return {
            tableData:[],
            total:0
        }
      },
      components:{
     'my-header':myHeader
   },
      created(){
          var u=sessionStorage.getItem('u');
      
        if(u!==null){
             this.axios.get("/user/u?uname="+u).then(res=>{
                 if(res.data.code===1){
                   var arr=res.data.data;
                   for(let i=0;i<arr.length;i++){
                       let Time=arr[i]["Rdate"]
                       let time=new Date(Time)
                       arr[i]["Rdate"]=time.toLocaleDateString();
                       arr[i]["total"]=arr[i]["total"].toFixed(2);
                  }
                     this.tableData=arr;
                   this.total=res.data.total[0]['SUM(total)'].toFixed(2)
                 }else{
                    this.$notify.info({
                    title: '消息',
                    message: res.data.msg
                    });
                 }
             })
          }else{
            this.$notify({
                title: '警告',
                message: '请先从用户列表中进入改页面',
                type: 'warning'
         });
            this.$router.push("/userList")
        }
      }
    }
  </script>


<style>
      #footer{
           display:flex;
           width:100%;
           border:1px solid red;
           justify-content: center;
       }
       #total{
           height:100%;
           line-height:40px;
       }
       #total>span:nth-child(1){
           color:#fff;
       }
       #total>span:nth-child(2){
           color:#f00 !important;
       }

</style>