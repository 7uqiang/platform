<template>
  <div class="category">
    <p class="daohang">您当前的位置>商品管理><span style="color: rgb(65, 187, 238)">商品分类</span></p>
    <div class="hed">
      <button @click="addCategory()">添加分类</button>
      <img @click="drop()" src="../../assets/delet.png" alt="">
      <div class="mian">
        <div class="div" v-for="(list,index) in lists">
          <input v-model="list.allselected" type="checkbox" style="float: left;" @click="checkall(index)">
          <div class="father" @click.prevent="isclick(index)">{{list.name}}<img src="../../assets/xiugai.png" alt="" @click="xiugai(list.id)"><span>{{list.updated_at}}</span></div>
          <br >
          <div class="div" v-show="list.isdisplay">
            <div class="zi" v-for="(list1,index2) in list.son">
              <input v-model="list1.selected" type="checkbox" @click="check(index,index2)">
              <img src="../../assets/bor.png" alt="">
              <div class="son">{{list1.name}}<img src="../../assets/xiugai.png" alt="" @click="xiugai2(list1.id)"><span>{{list1.updated_at}}</span>
              </div>
            </div>
            <div class="zi">
              <img src="../../assets/bor.png" alt="" style="margin-left: 100px;">
              <div class="son" @click="addson(list.id)"><p>+添加子分类</p></div>
            </div>
          </div>
        </div>
        <!--<div class="div"><input type="checkbox" style="float: left;">-->
          <!--<div class="father">0<img src="../../assets/xiugai.png" alt=""><span>2018-11-09 11:01:47</span></div>-->
          <!--<br> &lt;!&ndash;&ndash;&gt;-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    data() {
      return {
        isActive:false,
        lists:[],
        lists1:[],
        pid:'',
        checklist:[],
        id:[],
        checked:false
      }
    },
    methods:{
      drop(){
        var arr = [];
        for (var i = 0; i < this.lists.length; i ++) {
          console.log(this.lists[i]);
          if (this.lists[i].allselected == true) {
            arr.push(this.lists[i].id);
          }
          for (var j = 0; j < this.lists[i].son.length; j ++) {
            if (this.lists[i].son[j].selected == true) {
              arr.push(this.lists[i].son[j].id);
            }
          }
        }
        this.$axios.post("http://api.eawsp.com/api/commoditys/del_types?token="+sessionStorage.getItem("token"),{modify: arr}).then((res) => {
          console.log(res);
          this.$axios.get('http://api.eawsp.com/api/commoditys/get_types',{
            params:{
              token:sessionStorage.getItem('token'),
              store_id:sessionStorage.getItem("store_id")
            }
          }).then((res)=>{
            console.log(res);
            this.lists = res.data.data
            console.log(this.lists);
            for (var i = 0; i < this.lists.length; i ++) {
              this.lists[i].allselected = false;
              this.lists[i].isdisplay = false;
              for (var j = 0; j < this.lists[i].son.length; j ++) {
                this.lists[i].son[j].selected = false;
              }
            }
          })

        })
      },
      check(index,index2){
        this.lists[index].son[index2].selected = ! this.lists[index].son[index2].selected;
        var x = 0;
        for (var i = 0; i < this.lists[index].son.length; i ++) {
          if (this.lists[index].son[i].selected == true) {
            x ++;
          }
        }
        if (this.lists[index].son.length != x) {
          this.lists[index].allselected = false;
        }
        this.$forceUpdate();
      },
      checkall(index){
        if (this.lists[index].allselected == false) {
          for (var i = 0; i < this.lists[index].son.length; i++) {
            this.lists[index].son[i].selected = true;
          }
        }
        else {
          for (var i = 0; i < this.lists[index].son.length; i++) {
            this.lists[index].son[i].selected = false;
          }
        }
        this.$forceUpdate();
      },
      //修改父级分类名字
      xiugai(id){
        this.$prompt('请输入修改过后的分类','提示：',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
        }).then(({value})=>{
          this.$axios.post('http://api.eawsp.com/api/commoditys/modify_types',{
            store_goods_type_id:id,
            name:value,
            token:sessionStorage.getItem('token'),
            // store_id:sessionStorage.getItem('store_id')
          }).then((res)=>{
            console.log(res);
            this.$axios.get('http://api.eawsp.com/api/commoditys/get_types',{
              params:{
                token:sessionStorage.getItem('token'),
                store_id:sessionStorage.getItem("store_id")
              }
            }).then((res)=>{
              console.log(res);
              this.lists = res.data.data
              this.lists1 = res.data.data.son
              console.log(this.lists);
            })
          })
        })
      },
      isclick(index){
        console.log(index);
        this.lists[index].isdisplay = !this.lists[index].isdisplay;
        console.log(this.lists[index].isdisplay);
        this.$forceUpdate();
      },
      //修改子分类
      xiugai2(id){
        this.$prompt('请输入修改过后的分类','提示：',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
        }).then(({value})=>{
          this.$axios.post('http://api.eawsp.com/api/commoditys/modify_types',{
            store_goods_type_id:id,
            name:value,
            token:sessionStorage.getItem('token'),
            // store_id:sessionStorage.getItem('store_id')
          }).then((res)=>{
            console.log(res);
            this.$axios.get('http://api.eawsp.com/api/commoditys/get_types',{
              params:{
                token:sessionStorage.getItem('token'),
                store_id:sessionStorage.getItem("store_id")
              }
            }).then((res)=>{
              console.log(res);
              this.lists = res.data.data
              this.lists1 = res.data.data.son
            })
          })
        })
      },

      //添加分类
      addCategory(){
        this.$prompt('请输入新分类','提示：',{
          confirmButtonText:'确定',
          cancleButtonText:'取消',
        }).then(({value})=>{
          this.$axios.post('http://api.eawsp.com/api/commoditys/add_types',{
            pid:'',
            name:value,
            store_id:sessionStorage.getItem('store_id'),
            token:sessionStorage.getItem('token'),
          }).then((res)=>{
            console.log(res);
          })
        });
      },
      addson:function(pid){
        this.$prompt('请输入子分类','提示：',{
          confirmButtonText:'确定',
          cancleButtonText:'取消',
        }).then(({value})=>{
          this.$axios.post('http://api.eawsp.com/api/commoditys/add_types',{
            pid:pid,
            name:value,
            store_id:sessionStorage.getItem('store_id'),
            token:sessionStorage.getItem('token'),
          }).then((res)=>{

            console.log(res);
          })
        });
      },
    },
    created(){
      this.$axios.get('http://api.eawsp.com/api/commoditys/get_types',{
        params:{
          token:sessionStorage.getItem('token'),
          store_id:sessionStorage.getItem("store_id")
        }
      }).then((res)=>{
        console.log(res);
        this.lists = res.data.data
        console.log(this.lists);
        for (var i = 0; i < this.lists.length; i ++) {
          this.lists[i].allselected = false;
          this.lists[i].isdisplay = false;
          for (var j = 0; j < this.lists[i].son.length; j ++) {
            this.lists[i].son[j].selected = false;
          }
        }
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
  .mian{
    width: 100%;
    float: left;
    overflow: hidden;
    border-bottom: 50px solid #fff;
    border-top: 20px solid #fff;
    background: #fff;
  }
  .div{
    float: left;
    width: 960px;
    overflow: hidden;
  }
  .div>input{
    float: left;
    margin-top: 20px;
    margin-left: 40px;
  }
  .father{
    width: 890px;
  }
  .father,.son{
    float: right;
    background: #f9f9f9;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    border: 1px solid #e5e5e5;
    margin-top: 9px;
    text-indent: 40px;
  }
  .father img,.son img{
    float: right;
    margin-top: 12px;
    margin-right: 20px;
  }
  .father span,.son span{
    float: right;
    color: #999;
    font-size: 12px;
    margin-right: 10px;
  }
  .zi{
    width: 100%;
    height: 40px;
    float: left;
    margin-top: 5px;
  }
  .zi input{
    float: left;
    margin-top: 20px;
    margin-left: 70px;
  }
  .zi>img{
    float: left;
    margin-top: 13px;
    margin-left: 15px;
  }
  .son{
    width: 820px;
  }
  .div>input{
    float: left;
    margin-top: 20px;
    margin-left: 40px;
  }
</style>
