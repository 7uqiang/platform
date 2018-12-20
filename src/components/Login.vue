<template>
    <div class="login">
        <header>
            <img src="../assets/logo.png" alt="">
        </header>
        <div class="article">
            <div class="bg_banner">
                <div class="box">
                    <div class="login_box">
                        <p class="lg_login">商户登录</p>
                        <div id="form">
                            <form action="#" method="get">
                                <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                                    <tr>
                                        <td><label><img src="../assets/1.png"/></label></td>
                                        <td><input type="text" style="width: 90%" name="" id="card" v-model="num" placeholder="请输入18位信用卡号"/></td>
                                    </tr>
                                </table>
                                <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                                    <tr>
                                        <td><label><img src="../assets/2.png"/></label></td>
                                        <td><input type="password" style="width: 90%" name="" id="password" v-model="password" placeholder="请输入登录密码"/></td>
                                    </tr>
                                </table>

                                <table border="0" cellspacing="0" cellpadding="0" id="tab">
                                    <tr>
                                        <td><input type="text" id="t1" v-model="yzm" placeholder="请输入验证码" style="text-indent: 0.5em;"/></td>
                                        <img id="discode" :src="tp" alt="">
                                    </tr>
                                </table>
                                <table border="0" cellspacing="0" cellpadding="0" style="border: 0;">
                                    <tr style="height: 20px;">

                                        <td style="float: right;"><a class="for_card" href="#">忘记密码</a></td>
                                    </tr>
                                </table>
                                <button @click.prevent="login">立即登录</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div id="ftConw">
                <p id="lh">
                    <a href="#">关于我们</a>|<a href="#">联系我们</a>|<a href="#">商家入驻</a>|<a href="#">友情链接</a>|<a href="#">站点地图</a>|<a href="#">手机商城</a>|<a href="#">销售联盟</a>|<a href="">商城社区</a>|<a href="">帮助中心</a></p> <p class="cp">©2015-2018&nbsp;四川优智优品网络技术有限公司&nbsp;&nbsp;并保留所有版权</p> <p class="cp color"><a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">蜀ICP备18028427-1号</a>
                </p>
            </div>
         </div>
    </div>
</template>

<script>
    export default{
        name:'Login',
        data(){
            return{
              num:'',
              password:'',
              yzm:'',
              tp:'',
              captcha_token: ''
            }
        },
      created(){
        let e = new Date()
        this.$axios.get("http://api.eawsp.com/api/code/captcha/create/"+ e).then((res)=>{
          console.log(res);
          this.tp = res.data.data.captcha;
          this.captcha_token = res.data.data.captcha_token
        })
      },
      methods:{
          login:function(){
            let t = this
            this.$axios.post('http://api.eawsp.com/api/shop_admin_login?captcha_token='+t.captcha_token,{
                name:t.num,
                password:t.password,
                captcha:t.yzm
            }).then((res)=>{
              console.log(res);
              if(res.data.code == 20001){
                this.$alert('验证码错误','提示：',{
                  confirmButtonText:'确定',
                })
              }
              sessionStorage.setItem('store_id',res.data.data.data.store_id)
              // this.$root.token = res.data.data.token
              sessionStorage.setItem('token',res.data.data.token)
              if(res.data.code == 0){
                this.$router.push('/Home')
              }
            })
          }
      }
    }
</script>


<style scoped>
*{
    margin: 0;
    padding: 0;
    list-style: none;
}
header{
    margin: 0 auto;
    max-width: 1200px;
    height: 70px;
    line-height: 90px
}
.article{
    width: 100%;
    height: 600px;
}
.bg_banner{
    width: 100%;
    height: auto;
    background: url('../assets/shanghudenglubanner.png') 50% no-repeat;
    overflow: hidden;
}
.box{
    width: 75%;
    height: 600px;
    margin: 0 auto;
    position: relative;
}
@media screen and (max-width: 1200px){
    .box{
        width: 986px;
        overflow: hidden;
    }
}
.lg_login{
    margin: 36px 0;
    text-align: center;
}
.login_box{
        width: 400px;
        height: 454px;
        position: absolute;
        top: 10%;
        right: 0;
        background-color: #ffffff;
    }

    .login_box p{
        width: 100%;
        margin: 36px 0;
        text-align: center;
        font-family: "微软雅黑";
        font-size: 20px;
        color: #41bbee;
    }

    table{
        width: 355px;
        margin: 0 auto;
        border: 2px solid #c8e3fa;
    }
    #tab{
        margin: 23px;
        width: 216px;
        border: none;
    }
    #tab tr>td>input{
        width: 216px;
        height: 50px;
        border: 2px solid #c8e3fa;
        float: left;
    }
    #discode{
        width: 120px;
        height: 54px;
        float: right;
        margin-right: 24px;
        line-height: 50px;
        display: inline-block;
        text-align: center;
    }
    tr{
        width: 355px;
        height: 50px;
        text-indent:1em;
    }

    input{
        font-size: 14px;
        font-family: "微软雅黑";
        color: #999999;
        border: 0px;
        outline:none;
        cursor: pointer
    }
    button{
        display: block;
        width: 355px;
        height: 50px;
        margin: 40px auto 0;
        border: 0;
        color: #ffffff;
        font-size: 20px;
        background-color: #41BBEE;
    }

    .for_card{
        text-decoration: none;
        color: #41BBEE;
    }
    .for_card:hover{
        text-decoration: underline;
    }

     .footer{
        width: 100%;
        margin:86px auto 0;
    }

    .footer #ftConw{
        font-size: 14px;
        font-family: 微软雅黑;
        color: #666666;
    }
    .footer #ftConw #lh{
        margin-top: 10px;
        text-align: center;
    }
    .footer #ftConw .cp{
        margin: 5px 0 10px;
        text-align: center;
    }
    .footer #ftConw .color a{
        color: #0000ff;
    }
    .footer #ftConw a{
        margin: 0 7px;
        display: inline-block;
        text-decoration: none;
        color: #666666;
    }
    .footer #ftConw a:hover{
        text-decoration:underline;
    }

    .footer #ftConw{
        width: 80%;
        margin: 0 auto;
        font-size: 14px;
        font-family: 微软雅黑;
        color: #666666;
    }
    .footer #ftConw #lh{
        margin-top: 10px;
        text-align: center;
    }
    .footer #ftConw .cp{
        margin:10px 0 10px;
        text-align: center;
    }
    .footer #ftConw a{
        margin: 0 7px;
        display: inline-block;
        text-decoration: none;
        color: #666666;
    }
    .footer #ftConw a:hover{
        text-decoration:underline;
    }
</style>
