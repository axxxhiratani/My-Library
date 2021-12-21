<template>
<div class="main">

  <div class="title--columu">
    <p class="title--everyone">
      みんなの辞書
    </p>
  </div>
  <div class="container--search">
    <form @submit.prevent="searchLibrary">
      <input type="text" v-model="searchName" class="input--text">
      <button type="submit" class="input--button">検索</button>
    </form>
  </div>
  <div class="container--library">
    <div v-show="message" class="message">{{message}}</div>
    <div class="box--library" v-for="library in myLibrary" :key="library.id" v-show="library.view_permit">
        <a @click="showLibrary(library.id)">
          <img v-bind:src="library.language_id.image" alt="">
            <p class="container--library--name">{{library.name}}</p>
          <p class="container--library--text">使用言語：{{library.language_id.name}}</p>
          <p class="container--library--text">作成者：{{library.user_id.name}}</p>
        </a>
          <div class="container--library--infomation">
            <p @click="countUpFavorite(library.id)"  class="container--library--infomation--favorite">
              <span v-bind:class="decorationFavorite(library.id)">
                👍 {{countFavorite(library.id)}}
              </span>

            </p>
            <p class="container--library--infomation--create">作成日:{{library.created_at | changedate}}</p>
          </div>
      </div>
    </div>
    <div class="pagination--container">
      <a v-for="page in pagination" :key="page" @click="getPage(page)" class="pagination--link">
        {{page}}
      </a>
    </div>
  </div>
</template>


<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      user:this.$store.state.user.user_id,
      myLibrary:[],
      searchName:"",
      allFavorite:[],
      message:null,
      pagination:[],
    }
  },
  methods:{

    // 存在する辞書を全て抽出する
    async getLibrary(){
      const resData = await this.$axios.get(
          "https://blooming-sierra-76216.herokuapp.com/api/v1/library"
        );
      this.myLibrary = resData.data.libraries;
      for(let i = 1; i <= resData.data.count; i++){
        this.pagination.push(i);
      }
    },

    async getPage(numPage){
      const sendData = {
        page:numPage
      };
      const resData = await this.$axios.get(
          "https://blooming-sierra-76216.herokuapp.com/api/v1/library",
          {
            params:sendData
          }
        );
      this.myLibrary = resData.data.libraries;
    },

    // 存在するイイネを全て抽出する
    async getFavorite(){
      const resData = await this.$axios.get("https://blooming-sierra-76216.herokuapp.com/api/v1/favorite");
      this.allFavorite = resData.data.favorites;
    },

    //単語で辞書を検索する。
    async searchLibrary(){
      this.pagination = [];
      this.message = null;
      if(this.searchName ===""){
        this.getLibrary();
        return;
      }
      const sendData = {
        name:this.searchName
      };
      const resData = await this.$axios.get("https://blooming-sierra-76216.herokuapp.com/api/v1/investigate/libraryname",
      {
        params:sendData
      });
      this.myLibrary = resData.data.libraries;
      if(resData.data.libraries.length == 0){
        this.message = "見つかりませんでした";
      }else{
        this.message = null;
      }
    },

    //辞書を表示するページに遷移させる。
    showLibrary(id){
      this.$router.push({
        path:"/guest/library",
        query:{
          library_id:id,
        }
      });
    },
    //各辞書のイイネ数を集計
    countFavorite(id){
      let count = 0;
      this.allFavorite.forEach(value => {
        let target = value.library_id;
        if(target == id){
          count++;
        }
      });
      return count;
    },
    //イイネを増やす/減らす
    async countUpFavorite(id){
      let message_favo = "";
      if(this.user){
        if(this.checkFavorite(id)){
          const sendData = {
            library_id:id,
            user_id:this.user
          };
          await this.$axios.post("https://blooming-sierra-76216.herokuapp.com/api/v1/favorite",sendData);
          message_favo = "ブックマークに登録しました";
        }else{
            const favorite_id = this.getFavariteId(id);
            await this.$axios.delete("https://blooming-sierra-76216.herokuapp.com/api/v1/favorite/" + favorite_id);
            message_favo = "ブックマークから消去しました";
        }
        // this.pagination = [];
        // this.getLibrary();
        this.getFavorite();
        alert(message_favo);
      }else{
        alert("ログインしてください");
      }
    },

    //イイネされているかチェックする
    checkFavorite(id){
      let flg = true;
      this.allFavorite.forEach(value => {
        let target_library = value.library_id;
        let target_user = value.user_id;
        if(target_library == id && target_user == this.user){
          flg = false;
        }
      });
      return flg;
    },

    //消去されるイイネのidを取り出す
    getFavariteId(id){
      let favorite_id = "";
      this.allFavorite.forEach(value => {
        let target_library = value.library_id;
        let target_user = value.user_id;
        if(target_library == id && target_user == this.user){
          favorite_id = value.id;
        }
      });
      return favorite_id;
    },

    //イイネの装飾
    decorationFavorite(id){
      if(this.checkFavorite(id)){
        return "";
      }else{
        return "favorite";
      }
    },
    // ユーザー情報の取得
    async authenticationUser(){
      if(this.user){
        return;
      }
      await firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.getUserId(user.uid);
        }
      })
    },

    //uidをidに変換
    async getUserId(uid){
      const sendData = {
        uuid:uid,
      };
      const resData = await this.$axios.get("https://blooming-sierra-76216.herokuapp.com/api/v1/investigate/userid",
      {
        params:sendData
      });
      this.user = resData.data.user[0].id;
    },

    async prepare(){
      await this.authenticationUser();
      await this.getLibrary();
      await this.getFavorite();
    }
  },

  filters:{
    changedate(date){
      const dt = Date.parse(date);
      var date = new Date(dt);
      return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    },
  },
  computed:{
  },
  created(){
    // this.authenticationUser();
    // this.getLibrary();
    // this.getFavorite();
    this.prepare();
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

.title--everyone{
  font-size: 50px;
}
.title--columu{
  width: 100%;
  margin: 0 auto;
  text-align: center;

}
.container--library{
  width: 100%;
  margin: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.box--library{
  height: auto;
  width: 30%;
  background: #fffafa;
  border: 1px #fffafa solid;
  border-radius: 3px;
  padding: 10px auto;
  margin: 10px 0;
  text-align: center;
  box-shadow: 0px 8px 10px #c0c0c0;
  cursor: pointer;
}
.container--search{
  margin: 10px auto;
  width: 80%;
}
.input--text{
    width: 75%;
    height: 40px;
    margin: 10px auto;
    border-radius: 5px;
    border: solid 2px #e6e6fa;
  }
  .input--button{
    background: #fff;
    width: 15%;
    height: 40px;
    border-radius: 5px;
    color: #003366;
    border: #003366 solid 2px;
    font-weight: bold;
    cursor: pointer;
  }
  .input--button:hover{
    background: #003366;
    color: #e6e6fa;
  }
  .box--library > a > img{
    width: 80%;
    height: 250px;
    display: inline-block;
    border: 3px solid #fffafa;
    margin-top:10px;
    box-shadow: 0px 5px 10px #c0c0c0;
  }

  .container--library--name{
    color: #cc7000;
    font-size: 30px;
    font-weight: bold;
  }

  .container--library--text{
    color: #696969;
    font-weight: bold;
  }

  .container--library--infomation{
    display: flex;
    justify-content: space-between;
  }
  .container--library--infomation--create{
    color: #696969;
    font-size: 15px;
    margin-right: 5px;
  }

  .favorite{
    color: red;
    font-weight: bold;
    font-size: 15px;
  }
  .pagination--container{
    text-align: center;
    margin: 50px;
  }
  .pagination--link{
    display: inline-block;
    width: 50px;
    border: #003366 1px solid;
    cursor: pointer;
  }

  .pagination--link:hover{
    background: #003366;
    color: #ffffff;
  }

  @media screen and (max-width: 768px) {
    .box--library{
      width: 90%;
    }
  }
</style>
