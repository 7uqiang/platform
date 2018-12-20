<template>
  <div class="addlist">
    <p class="daohang">您当前的位置>商品管理><span style="color: rgb(65, 187, 238)">商品列表</span></p>
    <div class="hed">
      <p>商品信息</p>
    </div>

    <div class="mian">
      <table style="margin-top: 25px;"><p><span >*</span>商品名称
      </p><input style="width: 300px;" v-model="name"></table>
      <table ><p ><span >*</span>商品描述</p><input style="width: 300px;" v-model="discripe">
      </table>
      <table >
        <p ><span >*</span>类目</p>
        <select v-model="selected" @change="f1()" name="Shop_class" >
          <option v-for="(f,index) in class1">{{f.name}}</option>
          <!--<option value="">服装服饰</option>-->
          <!--<option value="">个护化妆</option>-->
          <!--<option value="">手机数码</option>-->
          <!--<option value="">家用电器</option>-->
          <!--<option value="">家纺家居</option>-->
          <!--<option value="">酒类饮料</option>-->
          <!--<option value="">母婴用品</option>-->
        </select>
        <select v-model="selected2" @change="f2()" name="Shop_class">
          <option v-for="(tmp,index) in class2[0]">{{tmp.name}}</option>
        </select>
        <select v-model="selected3" @change="f3()" name="Shop_class">
          <option v-for="tmp in class3[0]">{{tmp.name}}</option>
        </select>
      </table>
      <table><p><span >*</span>品牌</p><input v-model="brand">
      </table>
      <table><p><span >*</span>价格</p><input v-model="price">
      </table>
      <table><p><span >*</span>是否新品</p>
        <p style="width: 20px; margin-left: 20px;">是</p>
        <input value="1" v-model="is_new" type="radio" name="new" style="width: 15px; height: 15px; margin-top: 9px;">
        <p style="width: 20px;">否</p>
        <input value="0" v-model="is_new" type="radio" name="new" style="width: 15px; height: 15px; margin-top: 9px;">
      </table>
      <table >
        <p ><span >*</span>是否推荐</p>
        <p style="width: 20px; margin-left: 20px;">是</p>
        <input value="1" v-model="is_quality" type="radio" name="tui" style="width: 15px; height: 15px; margin-top: 9px;">
        <p style="width: 20px;">否</p>
        <input value="0" v-model="is_quality" type="radio" name="tui" style="width: 15px; height: 15px; margin-top: 9px;">
      </table>
      <table ><p ><span >*</span>是否热销</p>
        <p style="width: 20px; margin-left: 20px;">是</p>
        <input value="1" v-model="is_hot" type="radio" name="hot" style="width: 15px; height: 15px; margin-top: 9px;">
        <p style="width: 20px;">否</p>
        <input value="0" v-model="is_hot" type="radio" name="hot" style="width: 15px; height: 15px; margin-top: 9px;">
      </table>
      <div class="table">
        <p ><span >*</span>商品图片</p>
        <i>商品主图不能超过1M图片支持JPG，PNG，JPEG格式</i><br >
        <div class="add" id="one1"><img :src="img1" alt=""><input type="file" @change="uploading1($event)"></div>
        <div class="add"><img :src="img2" alt=""> <input type="file" @change="uploading2($event)"></div>
        <div class="add"><img :src="img3" alt=""> <input type="file" @change="uploading3($event)"></div>
        <div class="add"><img :src="img4" alt=""> <input type="file" @change="uploading4($event)"></div>
        <div class="add"><img :src="img5" alt=""> <input type="file" @change="uploading5($event)"></div>
      </div>
      <div class="table" style="height: 510px;">
        <p><span>*</span>详情页面描述</p>
        <i>商品主图不能超过1M图片支持JPG，PNG，JPEG格式</i>
        <textarea class="quill" v-model="description"></textarea>
      </div>
      <table><p>商品重量</p><input oninput="value=value.replace(/[^\d]/g,'')" v-model="weight"><i>KG</i></table >
      <table><p>商品库存</p><input oninput="value=value.replace(/[^\d]/g,'')" v-model="stock"></table >
      <table><p>库存警告数量</p><input oninput="value=value.replace(/[^\d]/g,'')" v-model="stock_warning">
      </table >
      <table ><p>商品口味</p><input v-model="goods_taste"><i>如有多种请用中文逗号分割</i>
      </table>
      <table ><p>商品规格</p><input v-model="specifications"><i>如有多种请用中文逗号分割</i>
      </table>
      <table ><p>商品颜色</p><input v-model="color"><i>如有多种请用中文逗号分割</i>
      </table>
      <div class="FL">
        <p>店铺中的分类</p>
        <div class="fl">
          <div v-for="list in lists">
            <p style="font-size: 14px;">{{list.name}}</p>
            <div v-for="list1 in list.son">
              <p style="text-indent: 20px;"><input name="radio" type="radio" v-model="this_sorts_id" :value="list1.id">{{list1.name}}</p>
            </div>
          </div>
        </div>
      </div>
      <table >
        <p><span>*</span>商家备注</p>
        <input style="width: 300px;"><i>仅供商家自己看的信息</i>
      </table>
      <button @click="baocun">保存</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Addlist",
    data(){
      return{
        name:'',
        discripe:'',
        sorts_id:'',
        this_sorts_id:'',
        brand:'',
        price:'',
        description:'',
        weight:'',
        stock:'',
        stock_warning:'',
        goods_taste:'',
        specifications:'',
        color:'',
        note:'',
        is_quality:'',
        is_new:'',
        is_hot:'',
        img1:require('../../assets/zhutu.png'),
        img2:require('../../assets/zhutu.png'),
        img3:require('../../assets/zhutu.png'),
        img4:require('../../assets/zhutu.png'),
        img5:require('../../assets/zhutu.png'),
        file1:'',
        file2:'',
        file3:'',
        file4:'',
        file5:'',
        A:'',
        B:'',
        C:'',
        class1:[],
        class2:[],
        class3:[],
        selected: "",
        selected2: "",
        selected3: "",
        lists:[]
      }
    },
    methods:{
      f3(){
        for (var i = 0; i < this.class3[0].length; i ++) {
          if (this.class3[0][i].name == this.selected3) {
            this.sorts_id = this.class3[0][i].id
          }
        }
        console.log(this.sorts_id);
      },
      f2(){
        console.log(this.selected2);
        this.class3 = [];
        console.log(this.class2);
        for (var i = 0; i < this.class2[0].length; i ++) {
          if (this.class2[0][i].name == this.selected2) {
            this.class3.push(this.class2[0][i].son);
          }
        }
        console.log(this.class3);
      },
      f1(){
        this.class3 = [];
        this.class2 = [];
        for (var i = 0; i < this.class1.length; i ++) {
          if (this.class1[i].name == this.selected) {
            this.class2.push(this.class1[i].son);
          }
        }
        console.log(this.class2);
      },
      uploading1: function(event) {
        console.log(event);
        var that = this;
        this.file1 = event.target.files[0];
        var reader = new FileReader();

        //获取文件
        if(this.file1.type.split('/')[1] == "jpeg" || "png" || "jpg") {
          var windowURL = window.URL || window.webkitURL;
          //创建图片文件的url
          this.img1 = windowURL.createObjectURL(event.target.files[0]);//获取SRC1
          // console.log(this.file);
          reader.readAsDataURL(this.file1);//
          reader.onload = function() {
            that.blob = that.dataURItoBlob(reader.result);
          }
          // console.log(this.uploadImg);
        } else {
          that.$alert('图片必须是JPEG，PNG，JPG格式，请重新选择', '优智优品网', {
            confirmButtonText: '确定',
          })
        }
      },
      uploading2: function(event) {
        console.log(event);
        var that = this;
        this.file2 = event.target.files[0];
        var reader = new FileReader();

        //获取文件
        if(this.file2.type.split('/')[1] == "jpeg" || "png" || "jpg") {
          var windowURL = window.URL || window.webkitURL;
          //创建图片文件的url
          this.img2 = windowURL.createObjectURL(event.target.files[0]);//获取SRC1
          console.log(this.file2);
          reader.readAsDataURL(this.file2);//
          reader.onload = function() {
            that.blob = that.dataURItoBlob(reader.result);
          }
          // console.log(this.uploadImg);
        } else {
          that.$alert('图片必须是JPEG，PNG，JPG格式，请重新选择', '优智优品网', {
            confirmButtonText: '确定',
          })
        }
      },
      uploading3: function(event) {
        console.log(event);
        var that = this;
        this.file3 = event.target.files[0];
        var reader = new FileReader();

        //获取文件
        if(this.file3.type.split('/')[1] == "jpeg" || "png" || "jpg") {
          var windowURL = window.URL || window.webkitURL;
          //创建图片文件的url
          this.img3 = windowURL.createObjectURL(event.target.files[0]);//获取SRC1
          console.log(this.file3);
          reader.readAsDataURL(this.file3);//
          reader.onload = function() {
            that.blob = that.dataURItoBlob(reader.result);
          }
          // console.log(this.uploadImg);
        } else {
          that.$alert('图片必须是JPEG，PNG，JPG格式，请重新选择', '优智优品网', {
            confirmButtonText: '确定',
          })
        }
      },
      uploading4: function(event) {
        console.log(event);
        var that = this;
        this.file4 = event.target.files[0];
        var reader = new FileReader();

        //获取文件
        if(this.file4.type.split('/')[1] == "jpeg" || "png" || "jpg") {
          var windowURL = window.URL || window.webkitURL;
          //创建图片文件的url
          this.img4 = windowURL.createObjectURL(event.target.files[0]);//获取SRC1
          console.log(this.file4);
          reader.readAsDataURL(this.file4);//
          reader.onload = function() {
            that.blob = that.dataURItoBlob(reader.result);
          }
          // console.log(this.uploadImg);
        } else {
          that.$alert('图片必须是JPEG，PNG，JPG格式，请重新选择', '优智优品网', {
            confirmButtonText: '确定',
          })
        }
      },
      uploading5: function(event) {
        console.log(event);
        var that = this;
        this.file5 = event.target.files[0];
        var reader = new FileReader();

        //获取文件
        if(this.file5.type.split('/')[1] == "jpeg" || "png" || "jpg") {
          var windowURL = window.URL || window.webkitURL;
          //创建图片文件的url
          this.img5 = windowURL.createObjectURL(event.target.files[0]);//获取SRC1
          console.log(this.file5);
          reader.readAsDataURL(this.file5);//
          reader.onload = function() {
            that.blob = that.dataURItoBlob(reader.result);
          }
          // console.log(this.uploadImg);
        } else {
          that.$alert('图片必须是JPEG，PNG，JPG格式，请重新选择', '优智优品网', {
            confirmButtonText: '确定',
          })
        }
      },
      dataURItoBlob: function(dataURI) {
        // base64 解码
        let byteString = window.atob(dataURI.split(',')[1]);
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        let T = mimeString.split('/')[1]
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for(let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {
          type: mimeString
        });
      },
      baocun:function(){
        console.log(this.img1);
        console.log(this.img2);
        console.log(this.is_new);
        console.log(this.selected3);
        console.log(this.this_sorts_id);

        var formdata = new FormData();
        formdata.append('name', this.name);//商品名称
        formdata.append('goods_describe', this.discripe);//商品描述
        formdata.append('goods_sorts_id',this.sorts_id);//商品分类id
        formdata.append('goods_brand', this.brand);//品牌
        formdata.append('shop_price', this.price);//价格
        formdata.append('is_new',this.is_new);
        formdata.append('is_quality',this.is_quality);
        formdata.append('is_hot',this.is_hot);
        formdata.append('goods_img1',this.file1);
        formdata.append('goods_img2',this.file2);
        formdata.append('goods_img3',this.file3);
        formdata.append('goods_img4',this.file4);
        formdata.append('goods_img5',this.file5);
        formdata.append('details_page_description', this.description);
        formdata.append('weight',this.weight);
        formdata.append('stock',this.stock);
        formdata.append('stock_warning',this.stock_warning);
        formdata.append('goods_taste',this.goods_taste);
        formdata.append('goods_specifications',this.specifications);
        formdata.append('goods_color',this.color);
        formdata.append('this_sorts_id',this.this_sorts_id);
        formdata.append('note', this.note);
        formdata.append('store_id',sessionStorage.getItem('store_id'))

        // formdata.append('')
        let config = {
          headers: {

            'Content-Type': 'multipart/form-data' //之前说的以表单传数据的格式来传递fromdata

          }
        };
        this.$axios.post('http://api.eawsp.com/api/commoditys/add_goods?token=' + sessionStorage.getItem("token"), formdata, config).then((res) => {
          console.log(res);
          if(res.data.code == '0'){
            this.$alert('添加成功','提示：',{
              confirmButtonText:'确定',
            })
          }
        })
      }
    },
    created(){
      this.$axios.get('http://api.eawsp.com/api/commoditys/get_types',{
        params:{
          store_id:sessionStorage.getItem('store_id'),
          token:sessionStorage.getItem('token')
        }
      }).then((res)=>{
        console.log(res);
        this.lists = res.data.data
      });
        this.$axios.get("http://api.eawsp.com/api/advertising/get_advertising").then((res)=>{
        console.log(res);
        this.class1 = res.data.data
      })
    },

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
    height: 40px;
    outline: 1px solid #e5e5e5;
    font-size: 14px;
  }
  #one1{
    margin-left: 260px;
  }
  .hed p {
    width: 100px;
    display: block;
    height: 20px;
    border-left: 5px solid #000;
    text-indent: 10px;
    float: left;
    margin-top: 10px;
    margin-left: 20px;
  }
  .mian{
    width: 100%;
    height: 1300px;
    background: #fff;
    border-bottom: 100px solid #fff;
  }
  table{
    width: 100%;
    height: 30px;
    float: left;
    line-height: 30px;
    margin-top: 7px;
  }
  .FL>p,.table p,table p{
    width: 250px;
    display: block;
    float: left;
    text-align: right;
    font-size: 14px;
  }
  table p{
    float: left;
    height: 25px;
    margin-left: 10px;
    border: none;
  }
  table select{
    width: 100px;
  }
  table input,table select{
    float: left;
    height: 25px;
    margin-left: 10px;
    /*border: none;*/
    border: 1px solid #bfbfbf;
  }
  .table{
    height: 160px;
  }
  .table,table{
    width: 100%;
    float: left;
    line-height: 30px;
    margin-top: 7px;
  }
  .FL>p,.table p{
    width: 250px;
    display: block;
    float: left;
    text-align: right;
    font-size: 14px;
  }
  .table p span,table p span{
    color: red;
  }
  .table i,table i{
    font-style: normal;
    width: 300px;
    /*float: left;*/
    height: 25px;
    margin-left: 10px;
    color: #b8b8b8;
    font-size: 12px;
  }
  .add{
    width: 100px;
    height: 100px;
    float: left;
    position: relative;
    margin-top: 10px;
    margin-left: 30px;
  }
  .table img,.table input{
    position: absolute;
    width: 100px;
    height: 100px;
    top: 0;
    left: 0;
  }
  .table input{
    opacity: 0;
  }
  .FL{
    width: 100%;
    height: 160px;
    float: left;
    line-height: 30px;
    margin-top: 7px;
  }
  .fl{
    width: 200px;
    height: 150px;
    background: #ebf1f6;
    float: left;
    margin-left: 10px;
    overflow: scroll;
  }
  .mian button{
    display: block;
    width: 100px;
    height: 40px;
    background: #41bbee;
    border: none;
    border-radius: 5px;
    float: left;
    margin-top: 20px;
    margin-left: 440px;
    color: #fff;
  }
  .quill{
    float: left;
    width: 70%;
    height: 400px;
    margin-left: 150px;
    resize:none;
  }
</style>
