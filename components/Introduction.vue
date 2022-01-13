<template>
<div class="main">


  <div class="title">
    <div class="title--content">
      <p class="title--message">世界に1つだけのプログラミング辞書を作ろう</p>
    </div>
  </div>


  <div class="introduction--container">
    <div class="introduction--overview">
      <p class="introduction--overview--title"><span class="introduction--overview--title--span">MyLibrary</span>とは</p>
      <p class="introduction--overview--content">プログラミングのコードやIT用語をまとめた自分だけの辞書を作成できるサービスです。</p>
    </div>
    <div class="introduction--detail">
      <div class="introduction--detail--box">
        <div class="introduction--detail--box--img">
          <img src="https://d1jsua0yydl5v7.cloudfront.net/img/study.png" alt="">
        </div>
        <div class="introduction--detail--box--content">
          <p class="introduction--detail--box--content--title">辞書の作成</p>
          <p class="introduction--detail--box--content--content">コード、意味、備考の3つの項目を入力してまとめていきます。辞書は複数作成する事ができ、用途に合わせて使い分けることができます。</p>
        </div>
      </div>

      <div class="introduction--detail--box">
        <div class="introduction--detail--box--img">
          <img src="https://d1jsua0yydl5v7.cloudfront.net/img/share.png" alt="">
        </div>
        <div class="introduction--detail--box--content">
          <p class="introduction--detail--box--content--title">辞書の共有</p>
          <p class="introduction--detail--box--content--content">他のユーザーが作成した辞書を閲覧することができます。また、気に入った辞書をブックマークに保存することができます。</p>
        </div>
      </div>
    </div>
      <div class="introduction--guest">
        <a v-show="!user" @click="login" class="introduction--guest--link">ゲストログイン</a>
      </div>
  </div>

</div>
</template>
<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return{
      user:null,
      email:"guest@gmail.com",
      password:"16jfa2719j19ed",
      uid:null,
    }
  },
  methods:{
    async login(){
      await this.getFirebase();
      await this.getUserId();
    },
    authenticationUser(){
      firebase.auth().onAuthStateChanged((user) => {
        this.user=user;
      })
    },
    async getFirebase() {
      try {
        await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.uid = data.user.uid;
          this.$router.push('/');
          alert("ログインが完了しました");
          return;
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
          location.reload();
        });
      } catch {
        alert("メールアドレスまたはパスワードが間違っております");
      }
    },
    async getUserId(uid){
      const sendData = {
        uuid:this.uid,
      };
      const resData = await this.$axios.get("https://blooming-sierra-76216.herokuapp.com/api/v1/investigate/userid",
      {
        params:sendData
      });
      this.$store.commit("user/loginUser",resData.data.user[0]);
    },
  },
  created(){
    this.authenticationUser();
  }
}
</script>
<style scoped>
.main{
  background: #fff;
  width: 100%;
}

.title{
  background-image: url("https://d1jsua0yydl5v7.cloudfront.net/img/top.jpg");
  background-size: cover;
  width: 100%;
  height: 250px;
  margin: 0 auto;
  text-align: center;
}
.title--content{
  width: 80%;
  height: auto;
  margin: 0 auto;
  text-align: center;
  color          : #ffffff;            /* 文字の色 */
  font-size      : 50px;               /* 文字のサイズ */
  letter-spacing : 4px;                /* 文字間 */
  text-shadow    :
       2px  2px 1px #003366,
      -2px  2px 1px #003366,
       2px -2px 1px #003366,
      -2px -2px 1px #003366,
       2px  0px 1px #003366,
       0px  2px 1px #003366,
      -2px  0px 1px #003366,
       0px -2px 1px #003366;        /* 文字の影 */
}
.title--message{
  display: inline-block;
  font-size: 22px;
  font-weight: bold;
  width: 100%;
  margin-top: 90px;
}

.introduction--container{
  width: 100%;
  border-bottom: #e6e6fa 2px solid;
}
.introduction--overview{
  text-align: center;
}
.introduction--overview--title{
  font-size: 40px;
}
.introduction--overview--title--span{
  font-size: 50px;
  font-weight: bold;
}
.introduction--overview--content{
  font-size: 15px;
}
.introduction--detail{
  width: 90%;
  margin: 50px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.introduction--detail--box{
  width: 25%;
}
.introduction--detail--box--img{
  width: 100%;
}
.introduction--detail--box--img > img{
  width: 100%;
  height: 200px;
}
.introduction--detail--box--content--title{
  font-weight: bold;
  font-size: 20px;
}
.introduction--detail--box--content--content{
  font-size: 10px;
}
.introduction--guest{
  margin: 50px auto;
  text-align: center;
}

.introduction--guest--link{
  display: inline-block;
  width: 30%;
  text-align: center;
  border: #003366 2px solid;
  text-decoration: none;
  color: #000;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
}
.introduction--guest--link:hover{
  background: #003366;
  color: #fff;
}
@media screen and (max-width: 768px) {
  .introduction--detail--box{
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    border: 1px #fffafa solid;
    border-radius: 3px;
    box-shadow: 0px 8px 10px #c0c0c0;

  }
.introduction--detail--box--img{
  padding: 45px 15px;
  width: 100%;
}
.introduction--detail--box--img > img{
  width: 100%;
  height: 100px;
}
.introduction--detail--box--content{
  width: 100%;
  margin: 15px 0px;
  padding: 0 15px;
  border-left: #e6e6fa 2px solid;
}
.introduction--detail--box--content--content{
  font-size: 10px;
}
}

</style>
