<template>
<div class="main">
  <div class="container--menu">
    <div class="menu--library">
      <p class="menu--library--title">{{library_name}}</p>
      <div class="menu--library--list">
        <a class="menu--library--list--link" @click="editWord">単語管理</a>
        <a class="menu--library--list--link" @click="editLibrary">辞書編集</a>
        <NuxtLink class="menu--library--list--link" to="/user/mypage">戻る</NuxtLink>
      </div>
    </div>
  </div>


  <div class="container--search">
    <form @submit.prevent="searchWord">
      <input type="text" v-model="searchName" class="input--text">
      <button type="submit" class="input--button">検索</button>
    </form>
  </div>

  <div>
    <div class="table">
      <div class="tr">
        <div class="th">単語</div>
        <div class="th">意味</div>
        <div class="th">備考</div>
      </div>
      <div class="tr" v-for="word in words" :key="word.id">
        <div class="td">
          <textarea wrap="hard" row="5" type="text" v-bind:value="word.name" v-bind:id="word.id" class="tr--text"></textarea>
        </div>
        <div class="copy"><a @click="copyWord(word.id)" class="copy--button">コピー</a></div>
        <div class="td">
          <textarea wrap="hard" row="5" type="text" v-bind:value="word.meaning" class="tr--text"></textarea>
          </div>
        <div class="td">
          <textarea wrap="hard" row="5" type="text" v-bind:value="word.note" class="tr--text"></textarea>

          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return{
      library_id:this.$route.query.library_id,
      library_name:"",
      words:[],
      searchName:"",
    }
  },
  methods:{
    async getLibrary(){
      const resData = await this.$axios.get(`https://blooming-sierra-76216.herokuapp.com/api/v1/library/${this.library_id}`);
      this.library_name = resData.data.words[0].name;
      this.words=resData.data.words[0].words;
    },
    async searchWord(){
      const sendData = {
        library_id:this.library_id,
        name:this.searchName
      };
      const resData = await this.$axios.get("https://blooming-sierra-76216.herokuapp.com/api/v1/investigate/wordname",
      {
        params:sendData
      });
      this.words = resData.data.words;
    },
    copyWord(id){
      var copyTarget = document.getElementById(id);
      copyTarget.select();
      document.execCommand("Copy");
    },
    editWord(){
      this.$router.push({
        path:"/user/editword",
        query:{
          library_id:this.library_id
        }
      });
    },
    editLibrary(){
      this.$router.push({
        path:"/user/editlibrary",
        query:{
          library_id:this.library_id,
        }
      });
    },
  },
  created(){
    this.getLibrary();
  }
}
</script>
<style scoped>
.main{
  background: #4169e1;
  padding-bottom: 20px;
}
.container--menu{
  width: 100%;
  text-align: center;
}

.menu--library{
  width: 40%;
  display: inline-block;
  background: #b0c4de;
  border-radius: 5px;
  padding: 10px 30px;
  margin: 30px auto;
}
.menu--library--title{
  display: inline-block;
  color: #191970;
  font-size: 50px;
  width: 100%;
}
.menu--library--list{
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.menu--library--list--link{
  display: inline-block;
  color: #191970;
  width: 20%;
  font-size: 20px;
  font-weight: bold;
  border: #191970 solid 2px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  padding: 5px 7px;
  margin: 5px 5px;
}

.menu--library--list--link:hover{
  background: #191970;
  color: #fff;
}

.table{
    border-collapse: collapse;
    width: 80%;
    margin: 20px auto;
    background: #fff;
    padding: 10px 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .tr{
    display: flex;
    width: 100%;
    height: auto;
    background: #fff;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .tr:first-child{
    display: flex;
    color:#e6e6fa;
    width: 100%;
    height: 50px;
    background: #191970;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .th{
    display: inline-block;
    width: 32%;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    padding: 11px 0;
  }
  .td{
    display: inline-block;
    width: 40%;
    height: auto;
    text-align: center;
    margin: 0 2px;
    padding: 5px 0;
  }
  .copy{
    color:red;
    display: inline-block;
    width: 50px;
    height: 15px;
    padding: 5px 2px;
    margin-top: 21px;
    margin-left:5px;
    font-size: 8px;
    text-align: center;
    padding: 5px 3px;
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
    border: #191970 solid 2px;
    color: #003366;
    font-weight: bold;
    cursor: pointer;
  }
  .input--button:hover{
    background: #003366;
    color: #e6e6fa;
  }

  .tr--text{
    height: 50px;
    width: 90%;
    border: solid 2px #e6e6fa;
    border-radius: 5px;
  }
  .copy--button{
    background: #fff;
    border: red solid 2px;
    border-radius: 5px;
  }
 @media screen and (max-width: 768px) {
   .copy{
     display: none;
   }
   .menu--library--list--link{
     width: 90%;
   }
 }

</style>
