<template>
    <div class="common">
         <p class="daohang">您当前的位置>商品管理><span style="color: rgb(65, 187, 238)">基本设置</span></p>
          <div class="main"><img :src="src1" alt=""style="width: 120px; height: 120px; background: rgb(105, 204, 225); display: block; float: left; margin-left: 20px;">
            <input type="file" @change="uploading($event)">
            <button @click="submit">上传logo</button>
          </div>
    </div>
</template>

<script>
    export default{
        name:'Common',
        data(){
            return{
              src1:require('../../assets/zhutu.png'),
              file:''
            }
        },
      methods:{
        uploading:function(event) {
          console.log(event);
          var that = this;
          this.file = event.target.files[0];
          var reader = new FileReader();

          //获取文件
          if(this.file.type.split('/')[1] == "jpeg" || "png" || "jpg") {
            var windowURL = window.URL || window.webkitURL;
            //创建图片文件的url
            this.src1 = windowURL.createObjectURL(event.target.files[0]);//获取SRC1
            console.log(this.file);
            reader.readAsDataURL(this.file);//
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
        submit:function(){
          var formdata = new FormData();
          formdata.append('id', this.$root.store_id);
          formdata.append('token',this.$root.token)
          formdata.append('image', this.blob);
          console.log(this.$root.token);
          console.log(this.$root.store_id);
          let config = {
            headers: {

              'Content-Type': 'multipart/form-data' //之前说的以表单传数据的格式来传递fromdata

            }

          };
          this.$axios.post('http://api.eawsp.com/api/index/head', formdata, config).then((res) => {
            console.log(res);
            if(res.data.code == 0){
              this.$alert('上传成功','提示：',{
                confirmButtonText:'确定',
              })
            }
          })

        }
      },
    }
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    list-style: none;
}
.daohang{
    text-align: left;
    font-size: 12px;
    width: 100%;
    line-height: 40px;
    border-bottom: 1px solid #e5e5e5;
}
  .main{
    width: 100%;
    float: left;
    overflow: hidden;
    border-bottom: 50px solid #fff;
    border-top: 20px solid #fff;
    background: #fff;
  }
  .main input{
    display: block;
    width: 120px;
    height: 120px;
    float: left;
    margin-left: -120px;
    opacity: 0;
  }
  .main button{
    width: 70px;
    height: 22px;
    display: block;
    background: rgb(65, 187, 238);
    border: none; color: white;
    border-radius: 5px;
    float: left;
    margin-left: -90px;
    text-align: center;
    margin-top: 130px;
  }
</style>
