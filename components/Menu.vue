<template>
  <div class="container--mypage">
  <p class="container--mypage--username">ようこそ{{$store.state.user.user_name}}さん</p>
    <div class="container--mypage--menu">
      <span v-bind:class="active__mylibrary"><a class="container--mypage--menu--list" @click="myLibraryList" >自分の辞書</a></span>
      <span v-bind:class="active__create"><a class="container--mypage--menu--list" @click="createLibrary">＋辞書を作成する</a></span>
      <span v-bind:class="active__favolist"><a class="container--mypage--menu--list" @click="favoriteLibrary">お気に入り</a></span>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return{
      active__mylibrary:"",
      active__create:"",
      active__favolist:"",
    }
  },
  props:["active_page"],
  methods:{
    myLibraryList(){
      this.$router.push({
        path:"/user/mypage",
      });
    },
    createLibrary(){
      this.$router.push({
        path:"/user/createlibrary",
      });
    },
    favoriteLibrary(){
      this.$router.push({
        path:"/user/favoritelibrary",
      });
    },
    activePage(){
      if(this.active_page === "mylibrary"){
        this.active__mylibrary = "active";
      }else if(this.active_page === "create"){
        this.active__create ="active";
      }else if(this.active_page === "favolist"){
        this.active__favolist = "active";
      }
    },
    checkLogin(){
      if(!this.$store.state.user.user_id){
        try {
          firebase
            .auth()
            .signOut()
            .then(()=>{
              alert("エラー：ログアウトしました。");
              this.$store.commit("user/logoutUser");
              this.$router.push("/login");
            });
        } catch (error) {
        console.log(error);
      }

      }
    },
  },
  created(){
    this.activePage();
    this.checkLogin();
  }
}
</script>

<style scoped>
.container--mypage{
  width: 100%;
  height: 130px;
  background: #fffafa;
  border: 1px #fffafa solid;
  text-align: center;
  box-shadow: 0px 8px 10px #c0c0c0;

}
.container--mypage--username{
  font-size: 20px;
  font-weight: bold;
}
.container--mypage--menu{
  font-size: 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
}
.container--mypage--menu--list{
  border: #191970 2px solid;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.active{
  background: #191970;
  color: #fff;
  border: #191970 2px solid;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

}

</style>
