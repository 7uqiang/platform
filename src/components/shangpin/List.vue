<template>
  <div class="list">
    <p class="daohang">您当前的位置>商品管理><span style="color: rgb(65, 187, 238)">商品列表</span></p>
    <div class="hed">
      <router-link to="/List/Addlist" tag="button">添加商品</router-link>
      <img src="../../assets/delet.png" alt="" @click="del()">
      <div class="right">
        <p>商品名称</p>
        <input type="text" v-model="keys">
        <img src="../../assets/search.png" alt="" @click="search">
      </div>
    </div>
    <table>
      <tr>
        <th></th>
        <th style="width: 240px; text-align: left;">商品列表</th>
        <th>商品货号</th>
        <th>分类</th>
        <th>价格</th>
        <th>库存</th>
        <th>销量</th>
        <th style="width: 90px;">
          <select @change="fs($event)">
            <option>全部</option>
            <option>已上架</option>
            <option>未上架</option>
          </select>
        </th>
        <th style="width: 90px;">
          <select @change="fs2($event)">
            <option>全部</option>
            <option>待审核</option>
            <option>审核通过</option>
            <option>审核失败</option>
          </select>
        </th>
      </tr>

      <tr style="background: white;" v-for="(list,index) in lists" :key ='index'>
        <td><input type="checkbox" @click="check(index,list.id)" :checked="checkboxList.indexOf(index)>=0"></td>
        <td><img :src="'http://api.eawsp.com/'+list.image_thumbnail" alt="">
          <p style="text-align: left">{{list.name}}</p>
        </td>
        <td>{{list.num}}</td>
        <td>{{list.goods_ptype_name}}>{{list.goods_type_name}}</td>
        <td>{{list.shop_price}}</td>
        <td>{{list.stock}}</td>
        <td>{{list.sales}}</td>
        <td v-if="list.on_self == '0'">未上架</td><td v-else="list.on_self == '1'">已上架</td>
        <td v-if="list.audit_state == '0'">待审核</td>
        <td v-else-if="list.audit_state == '1'">审核通过</td>
        <td v-else="">审核失败</td>

      </tr>
    </table>
    <div class="fot">
      <input type="checkbox" :checked="checkboxList.length === lists.length" @click="checkedAll()">
      <p>全选</p>
      <button @click="shangjia()">上架</button>
      <button @click="xiajia()">下架</button>
    </div>
    <div class="fy" v-if="alldata1">
      <img src="../../assets/left.png" alt="" @click="prevpage">
      <p style="color: rgb(65, 187, 238);">{{alldata1.current_page}}<span style="color: rgb(51, 51, 51);">/{{alldata1.last_page}}</span>
      </p> <img src="../../assets/right.png" alt="" @click="nextpage">
      <p>跳至</p> <input type="text" v-model="NUM">
      <p>页</p>
      <button @click="toPage">GO</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'List',
    data() {
      return {
        lists:[],
        checkboxList:[],
        checked:false,
        alldata1:null,
        pno:1,
        last_page:'',
        NUM:'',
        id:[],
        on_self:'',
        audit_state:'',
        keys:''
      }
    },
    methods:{
      search:function(){
        console.log(this.keys);
        this.$axios.get("http://api.eawsp.com/api/commoditys/key_search",{
          params:{
            keys:this.keys,
            token:sessionStorage.getItem('token'),
            store_id:sessionStorage.getItem('store_id'),
            per_page:''
          }
        }).then((res)=>{
          console.log(res);
          this.lists = res.data.data.data
          this.last_page = res.data.data.last_page
          this.alldata1 = res.data.data;
          console.log(this.alldata1);
          this.pno = this.alldata1.current_page
        })
      },
      shangjia:function(){
        console.log(this.id);
        this.$axios.post('http://api.eawsp.com/api/commoditys/self_goods',{
          token:sessionStorage.getItem('token'),
          store_id:sessionStorage.getItem('store_id'),
          modify:this.id,
          on_self:1
        }).then((res)=>{
          console.log(res);
          this.$axios.get('http://api.eawsp.com/api/commoditys/list_store_goods',{
            params:{
              store_id:sessionStorage.getItem('store_id'),
              token:sessionStorage.getItem('token')
            }
          }).then((res)=>{
            this.checkboxList = []
            console.log(res);
            this.lists = res.data.data.data;
            this.last_page = res.data.data.last_page
            this.alldata1 = res.data.data;
            console.log(this.alldata1);
            this.pno = this.alldata1.current_page
          })
        })
      },
      xiajia:function(){
        this.$axios.post('http://api.eawsp.com/api/commoditys/self_goods',{
          token:sessionStorage.getItem('token'),
          store_id:sessionStorage.getItem('store_id'),
          modify:this.id,
          on_self:0
        }).then((res)=>{
          console.log(res);
          this.$axios.get('http://api.eawsp.com/api/commoditys/list_store_goods',{
            params:{
              store_id:sessionStorage.getItem('store_id'),
              token:sessionStorage.getItem('token')
            }
          }).then((res)=>{
            this.checkboxList = []
            console.log(res);
            this.lists = res.data.data.data;
            this.last_page = res.data.data.last_page
            this.alldata1 = res.data.data;
            console.log(this.alldata1);
            this.pno = this.alldata1.current_page
          })
        })
      },
      fs:function(e){
        console.log(e);
        if(e.target.value == '已上架'){
          this.on_self = 1
          console.log(this.on_self);
          this.$axios.get("http://api.eawsp.com/api/commoditys/list_store_goods",{
              params:{
                store_id:sessionStorage.getItem('store_id'),
                token:sessionStorage.getItem('token'),
                on_self:this.on_self,
                audit_state:this.audit_state,
                keys:this.keys
              }
            }).then((res)=>{
              console.log(res);
              this.lists = res.data.data.data;
              this.last_page = res.data.data.last_page
              this.alldata1 = res.data.data;
              console.log(this.alldata1);
              this.pno = this.alldata1.current_page
            })
        }else if(e.target.value == '未上架'){
          this.on_self = 0
          console.log(this.on_self);
          this.$axios.get("http://api.eawsp.com/api/commoditys/list_store_goods",{
            params:{
              store_id:sessionStorage.getItem('store_id'),
              token:sessionStorage.getItem('token'),
              on_self:this.on_self,
              audit_state:this.audit_state,
              keys:this.keys
            }
          }).then((res)=>{
            console.log(res);
            this.lists = res.data.data.data;
            this.last_page = res.data.data.last_page
            this.alldata1 = res.data.data;
            console.log(this.alldata1);
            this.pno = this.alldata1.current_page
          })
        }else if(e.target.value == '全部'){
          this.on_self = ""
          this.$axios.get("http://api.eawsp.com/api/commoditys/list_store_goods",{
            params:{
              store_id:sessionStorage.getItem('store_id'),
              token:sessionStorage.getItem('token'),
              on_self:this.on_self,
              audit_state:this.audit_state,
              keys:this.keys
            }
          }).then((res)=>{
            console.log(res);
            this.lists = res.data.data.data;
            this.last_page = res.data.data.last_page
            this.alldata1 = res.data.data;
            console.log(this.alldata1);
            this.pno = this.alldata1.current_page
          })
        }
        //
      },
      fs2(e){
        if(e.target.value == '待审核'){
          this.audit_state = '0'
          this.$axios.get("http://api.eawsp.com/api/commoditys/list_store_goods",{
            params:{
              store_id:sessionStorage.getItem('store_id'),
              token:sessionStorage.getItem('token'),
              audit_state:this.audit_state,
              on_self:this.on_self,
              keys:this.keys
            }
          }).then((res)=>{
            console.log(res);
            this.lists = res.data.data.data;
            this.last_page = res.data.data.last_page
            this.alldata1 = res.data.data;
            console.log(this.alldata1);
            this.pno = this.alldata1.current_page
          })
        }else if(e.target.value == '审核通过'){
          this.audit_state = '1'
          this.$axios.get("http://api.eawsp.com/api/commoditys/list_store_goods",{
            params:{
              store_id:sessionStorage.getItem('store_id'),
              token:sessionStorage.getItem('token'),
              audit_state:this.audit_state,
              on_self:this.on_self,
              keys:this.keys
            }
          }).then((res)=>{
            console.log(res);
            this.lists = res.data.data.data;
            this.last_page = res.data.data.last_page
            this.alldata1 = res.data.data;
            console.log(this.alldata1);
            this.pno = this.alldata1.current_page
          })
        }else if(e.target.value == '审核失败'){
          this.audit_state = '2'
          this.$axios.get("http://api.eawsp.com/api/commoditys/list_store_goods",{
            params:{
              store_id:sessionStorage.getItem('store_id'),
              token:sessionStorage.getItem('token'),
              audit_state:this.audit_state,
              on_self:this.on_self,
              keys:this.keys
            }
          }).then((res)=>{
            console.log(res);
            this.lists = res.data.data.data;
            this.last_page = res.data.data.last_page
            this.alldata1 = res.data.data;
            console.log(this.alldata1);
            this.pno = this.alldata1.current_page
          })
        }else if(e.target.value == '全部') {
          this.audit_state = ""
          this.$axios.get("http://api.eawsp.com/api/commoditys/list_store_goods", {
            params: {
              store_id: sessionStorage.getItem('store_id'),
              token: sessionStorage.getItem('token'),
              on_self:this.on_self,
              audit_state:this.audit_state,
              keys:this.keys
            }
          }).then((res) => {
            console.log(res);
            this.lists = res.data.data.data;
            this.last_page = res.data.data.last_page
            this.alldata1 = res.data.data;
            console.log(this.alldata1);
            this.pno = this.alldata1.current_page
          })
        }
        //
      },
      del(){
        this.$axios.post('http://api.eawsp.com/api/commoditys/trashed_goods?token='+sessionStorage.getItem('token'),{
          modify:this.id
        }).then((res)=>{
          if(res.data.code == 20000){
            this.$alert('请选择删除项','提示：',{
              confirmButtonText:'确定',
            })
          }
          this.checkboxList = []
          this.id = []
          console.log(res);
          this.$axios.get('http://api.eawsp.com/api/commoditys/list_store_goods',{
            params:{
              store_id:sessionStorage.getItem('store_id'),
              token:sessionStorage.getItem('token'),
            }
          }).then((res)=>{
            this.lists = res.data.data.data;
            this.last_page = res.data.data.last_page
            this.alldata1 = res.data.data;
            console.log(this.alldata1);
            this.pno = this.alldata1.current_page
          })
        })
      },
      check:function(id,sort_id){
        let idindex = this.checkboxList.indexOf(id)
        let sort_idindex = this.id.indexOf(sort_id)
        if(idindex>=0){
          this.checkboxList.splice(idindex,1)
          this.id.splice(sort_idindex,1)
          console.log(this.id)
          console.log(this.checkboxList);
        }else{
          this.checkboxList.push(id)
          console.log(sort_id);
          this.id.push(sort_id);
          console.log(this.id);
          console.log(this.checkboxList);
        }
      },
      checkedAll:function(){
        this.checked = !this.checked
        if(this.checked){
          this.checkboxList = []
          this.id = []
          let that = this
          this.lists.forEach(function(item,index){
            that.checkboxList.push(index)
            console.log(that.checkboxList);
          })
          console.log(this.lists)
          this.lists.forEach(function(item,index){
            that.id.push(item.id);
            console.log(that.id)
          })
        }else{
          this.checkboxList = []
          console.log(this.checkboxList);
        }
      },
      nextpage:function(){
        this.checkboxList = []
        if (this.pno < this.alldata1.last_page) {
          this.pno += 1
          this.$axios.get(`http://api.eawsp.com/api/commoditys/list_store_goods?page=${this.pno}`,{
            params:{
              token:sessionStorage.getItem('token'),
              store_id:sessionStorage.getItem('store_id'),
              on_self:this.on_self,
              audit_state:this.audit_state,
            }
          }).then((res) => {
            this.lists = res.data.data.data;
            this.alldata1 = res.data.data;
            console.log(this.alldata1);
            this.pno = this.alldata1.current_page
          })
        }
      },
      prevpage:function(){
        this.checkboxList = []
        if (this.pno > 1) {
          this.pno -= 1;
          this.$axios.get(`http://api.eawsp.com/api/commoditys/list_store_goods?page=${this.pno}`,{
            params:{
              token:sessionStorage.getItem('token'),
              store_id:sessionStorage.getItem('store_id'),
              on_self:this.on_self,
              audit_state:this.audit_state,
            }
          }).then((res) => {
            this.lists = res.data.data.data;
            // console.log(this.alldata);
            this.alldata1 = res.data.data;
            console.log(this.alldata1);
            this.pno = this.alldata1.current_page
          })
        }
      },
      toPage:function(){
        if(this.NUM > this.last_page || this.NUM <= 0){
          this.$alert('请输入正确的页数','提示：',{
            confirmButtonText:'确定',
          })
        }else{
          this.$axios.get(`http://api.eawsp.com/api/commoditys/list_store_goods?page=${this.pno}`,{
            params:{
              token:sessionStorage.getItem('token'),
              store_id:sessionStorage.getItem('store_id'),
              on_self:this.on_self,
              audit_state:this.audit_state,
            }
          }).then((res) => {
            this.lists = res.data.data.data;
            // console.log(this.alldata);
            this.alldata1 = res.data.data;
            console.log(this.alldata1);
            this.pno = this.alldata1.current_page
          })
        }

      }
    },
    created(){
      console.log(sessionStorage.getItem('token'));
      console.log(sessionStorage.getItem('store_id'));
      this.$axios.get('http://api.eawsp.com/api/commoditys/list_store_goods',{
        params:{
          store_id:sessionStorage.getItem('store_id'),
          token:sessionStorage.getItem('token')
        }
      }).then((res)=>{
        console.log(res);
        this.lists = res.data.data.data;
        console.log(this.lists);
        this.last_page = res.data.data.last_page
        this.alldata1 = res.data.data;
        console.log(this.alldata1);
        this.pno = this.alldata1.current_page
      })
    }
  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .daohang {
    text-align: left;
    font-size: 12px;
    width: 100%;
    line-height: 40px;
    border-bottom: 1px solid #e5e5e5;
  }

  .hed {
    width: 100%;
    height: 50px;
  }

  .hed button {
    width: 100px;
    height: 30px;
    float: left;
    margin-top: 10px;
    border: 1px solid #bfbfbf;
    background: #f5f7f8;
  }

  .hed > img {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
  }

  .right {
    width: 265px;
    height: 30px;
    float: right;
    margin-top: 10px;
  }

  .right p {
    width: 80px;
    height: 28px;
    float: left;
    display: block;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #bfbfbf;
  }

  .right input {
    width: 150px;
    height: 28px;
    float: left;
    border: 1px solid #bfbfbf;
    padding: 0;
    border-left: none;
    border-right: none;
  }

  .right img {
    float: left;
  }

  table {
    width: 100%;
    border: 1px solid #e5e5e5;
    border-collapse: collapse;
    border-bottom: none;
  }

  table tr {
    width: 100%;
    height: 40px;
    border-top: 1px solid #e5e5e5;
  }
  table tr td{
    font-size: 12px;
    text-align: center;
    line-height: 40px;
  }
  table tr td img{
    width: 40px;
    height: 40px;
    float: left;
  }
  table tr th {
    font-size: 14px;
    text-align: center;
  }
  table tr th select {
    height: 30px;
    font-size: 14px;
  }

  .fot {
    width: 978px;
    height: 40px;
    border: 1px solid #e5e5e5;
  }

  .fot input {
    float: left;
    margin-top: 15px;
    margin-left: 13px;
  }

  .fot p {
    display: block;
    width: 50px;
    float: left;
    line-height: 40px;
  }

  .fot button {
    width: 100px;
    height: 26px;
    background: #fff;
    border: 1px solid #d2d2d2;
    float: left;
    margin-top: 6px;
    margin-left: 15px;
  }

  .fy {
    width: 300px;
    height: 30px;
    float: left;
    margin-top: 50px;
    margin-left: 350px;
  }

  .fy img {
    width: 30px;
    height: 30px;
    float: left;
  }

  .fy p {
    display: block;
    width: 50px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
  }

  .fy input {
    width: 26px;
    height: 26px;
    float: left;
    padding: 0;
  }

  .fy button {
    width: 40px;
    height: 24px;
    border: 1px solid #a9a9a9;
    background: #fff;
    text-align: center;
    line-height: 24px;
    padding: 0;
    float: left;
    margin-top: 3px;
  }
</style>
