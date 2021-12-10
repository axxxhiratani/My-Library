<template>
  <div>
    <div class="container--mypage">
      <p class="container--mypage--username">ようこそ{{user_name}}さん</p>
      <div class="container--mypage--menu">
        <a class="container--mypage--menu--list" @click="myLibraryList">自分の辞書</a>
        <a class="container--mypage--menu--list" @click="createLibrary">＋辞書を作成する</a>
        <a class="container--mypage--menu--list active">お気に入り</a>
      </div>
    </div>


    <div class="container--library">
      <div class="box--library" v-for="library in myLibrary" :key="library.id">
        <a @click="showLibrary(library.library_id[0].id)">
          <img v-bind:src="library.library_id[0].language_id[0].image" alt="">
          <p class="container--library--name">{{library.library_id[0].name}}</p>
          <p class="container--library--text">使用言語：{{library.library_id[0].language_id[0].name}}</p>
        </a>
      </div>
    </div>




  </div>
</template>

<script>
export default {
  data() {
    return {
      user_id:this.$route.query.user_id,
      user_name:this.$route.query.user_name,
      myLibrary:[],
      allFavorite:[],
    }
  },
  methods:{
    async getLibrary(){

      const sendData={
        user_id:this.user_id,
      };
      const resData = await this.$axios.get(
          `https://blooming-sierra-76216.herokuapp.com/api/v1/investigate/favoritelist`,
          {
            params:sendData
          }
        );
      console.log("get");
      console.log(resData.data.library_id);
      console.log("all");
      console.log(resData.data.favorite);

      this.myLibrary = resData.data.favorite;
    },
    async getFavorite(){
      const resData = await this.$axios.get("https://blooming-sierra-76216.herokuapp.com/api/v1/favorite");
      this.allFavorite = resData.data.favorites;
    },
    showLibrary(id){
      console.log("show"+id);
      this.$router.push({
        path:"/guest/library",
        query:{
          library_id:id,
        }
      });
    },
    myLibraryList(){
      console.log("mypage");
      this.$router.push({
        path:"/user/mypage",
        query:{
          user_id:this.user_id,
          user_name:this.user_name,
        }
      });
    },
    createLibrary(){
      this.$router.push({
        path:"/user/createlibrary",
        query:{
          user_id:this.user_id,
          user_name:this.user_name,
        }
      });
    },
    favoriteLibrary(){
      this.$router.push({
        path:"/user/favoritelibrary",
        query:{
          user_id:this.user_id
        }
      });
    },

  },
  filters:{
      changedate(date){
        const dt = Date.parse(date);
        return dt;
    }

  },
  mounted(){
    setTimeout(() => {
      this.getLibrary();
    }, 1000);
  }
}
</script>


<style scoped>
.main{
  background: #f5f5f5;
}
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
}

.container--library{
  width: 100%;
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
    width: 80%;
    height: 40px;
    margin: 10px auto;
    border-radius: 5px;
    border: solid 2px #e6e6fa;
  }
  .input--button{
    background: #e6e6fa;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    font-weight: bold;
  }
  .input--button:hover{
    background: #b0c4de;
    color: #e6e6fa;
  }

  .box--library > a >img{
    width: 80%;
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
    font-size: 5px;
  }
  @media screen and (max-width: 768px) {
    .box--library{
      width: 95%;
    }
  }

</style>
