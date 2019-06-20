<template>
        <div>
            <my-header></my-header>
            <el-table  :data="tableData" @cell-click="users($event)" id="user" height="400" border style="width:600px">
                  <el-table-column  prop="Rdate" label="充值时间" width="120"></el-table-column>  
                  <el-table-column prop="uname" label="用户名称" width="120"></el-table-column> 
                  <el-table-column prop="total" label="充值金额"> </el-table-column>
                  <el-table-column prop="auditor" label="充值人员"> </el-table-column>
           </el-table>
           <div id="footer">
            <el-select v-model="value" filterable placeholder="请选择">
                    <el-option 
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
            </el-select>
            <div id="total">
            <span v-text="'一共充值'+count+'次'"></span>
             <span>&nbsp;&nbsp;&nbsp;&nbsp;充值总额 : ￥ </span>
            <span v-text="total.toFixed(2)"></span>
                
            </div>
           </div> 
                </div>
          </template>
          
          <script>
             import myHeader from '@/components/header.vue'
        export default {
                data() {
          return {
            tableData: [],
            options: [{
              value: '选项1',
              label: '按金额升序'
            }, {
              value: '选项2',
              label: '按金额降序'
            }
          ],
            value: '',
            total:0,
            count:0
          }
        },
        components:{
         'my-header':myHeader
       },
        methods:{
          users(e){
            sessionStorage.setItem("c",e.uname)
            this.$router.push({name:'chage',params:{uname:e.uname}}) 
          },
           isAsc(boolean){
               console.log(boolean)
               this.axios.get('/user/All?boolean='+boolean).then(res=>{
                    let arr=res.data;
                    console.log(arr);
                      for(let i=0;i<arr.length;i++){
                           let Time=arr[i]["Rdate"]
                           let time=new Date(Time)
                           arr[i]["Rdate"]=time.toLocaleDateString();
                           arr[i]["total"]=arr[i]["total"].toFixed(2);
                      }
                  this.tableData=arr;
               })
          }
        },
        watch:{
           value(newStr){
             if(newStr.indexOf("2")!==-1){
                   this.isAsc(1);
             }else{
                   this.isAsc(-1)
             }
           }
        },
      created(){
        let Admin=JSON.parse(sessionStorage.getItem("Admin"))
             if(Admin===null || Admin.uid!==1){
                  this.$notify({
                    title: '警告',
                    message: '无法进入用户页面,请您从合理的路径访问',
                    type: 'warning'
                  });
                  this.$router.push("/index")
              }else if(Admin!==null && Admin.uid===1){
                  this.axios.get("/user/chargeAll").then(res=>{
                
                      if(res.data.data.length>0){
                        this.total=res.data.total[0]['SUM(total)']
                        this.count=res.data.data.length;
                        let arr=res.data.data;
                      for(let i=0;i<arr.length;i++){
                           let Time=arr[i]["Rdate"]
                           let time=new Date(Time)
                           arr[i]["Rdate"]=time.toLocaleDateString();
                           arr[i]["total"]=arr[i]["total"].toFixed(2);
                      }
                      console.log(arr);
                       this.tableData=arr;
                      }else{
                        this.$notify.info({
                        title: '消息',
                        message: '暂时没有用户,不能进入该页面'
                        });
                        this.$router.push("/userRegister")
                      }
                   })     
                }    
              }
            }
          </script>
          <style scoped>
        #footer{
           display:flex;
           width:100%;
           border:1px solid red;
           justify-content: space-between;
       }
       #total{
           height:100%;
           line-height:40px;
       }
       #total>span:nth-child(1){
           color:#fff;
       }
       #total>span:nth-child(2){
           color:#fff;
       }
       #total>span:nth-child(3){
           color:#f00;
       }
          </style>