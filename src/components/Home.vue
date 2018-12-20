<template>
    <div class="home">
        <div class="div">
            <div class="header">
                <div class="hed">
                    <img src="../assets/logo_1.png" alt="" style=" margin-top:6px">
                    <div class="Right">
                        <div class="right">
                          <div @click="exit()">
                            <img src="../assets/tuichu.png" alt="" style="margin-top:8px;">
                            <p style="color:#ffffff;">退出</p>
                          </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="Div">
                <div class="left" id="left">
                    <ul>
                        <li @click.prevent="toggle()">
                            <img src="../assets/shangpingguanli.png" alt="">商品管理<img src="../assets/zuo.png" alt="">
                        </li>
                        <div v-show='isActive'>
                            <router-link to="/List" tag="p">商品列表</router-link>
                            <router-link to="/Category" tag="p">商品分类</router-link>
                        </div>
                        <li @click.prevent="toggle1()">
                            <img src="../assets/dianpushezhi.png" alt="">店铺设置<img src="../assets/zuo.png" alt="">
                        </li>
                        <div v-show="isActive1">
                            <router-link to="/Common" tag="p">基本设置</router-link>
                        </div>
                    </ul>
                </div>
                <div class="box">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name:'Home',
        data(){
            return{
                isActive:false,
                isActive1:false
            }
        },
        methods:{
            exit(){
              sessionStorage.clear()
              this.$router.push('/Login')
            },
            toggle:function(){
                this.isActive = !this.isActive
            },
            toggle1:function(){
                this.isActive1 = !this.isActive1
            },
        },
    }
</script>


<style scoped>
*{
    margin: 0;
    padding: 0;
    list-style: none;
}
.div{
    width: 100%;
    margin: 0 auto;
}
.header{
    width:100%;
    height: 65px;
    background: #41bbee;
}
.hed{
    width:1200px;
    margin: 0 auto;
    background: #41bbee; 
}
.Right{
    width: 400px;
    height: 65px;
    float: right;
}
.right{
    width: 100px;
    height: 65px;
    text-align: center;
    float: right;
}
.Div{
    width: 1200px;
    margin: 0 auto;
}
.left{
    float: left;
}
.left ul{
    width: 200px;
}
.left ul li{
    width: 200px;
    line-height: 40px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    background: #fff;
}
.left ul li img{
    display: block;
    float: left;
}
.left ul li img:nth-child(2){
    display: block;
    float: right;
    margin-top: 14px;
    margin-right: 10px;
}
.left ul div{
    background: #edeaea;
}
.left ul div p{
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-indent: 45px;  
    font-size: 12px;
    background: #edeaea;
}
.left ul div p:hover{
    background: #fff
}
.box{
    width: 980px;
    float: right;
}
</style>
