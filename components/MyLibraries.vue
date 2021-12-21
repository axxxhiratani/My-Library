<template>
  <div class="container--library">
    <div class="box--library" v-for="library in myLibrary" :key="library.id">
      <a @click="showLibrary(library.id)">
        <img v-bind:src="library.language_id[0].image" alt="">
        <p class="container--library--name">{{library.name}}</p>
        <p class="container--library--text">使用言語：{{library.language_id[0].name}}</p>
        <div class="container--library--infomation">
          <p class="container--library--infomation--create">作成日：{{library.created_at | changedate}}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_id:this.$store.state.user.user_id,
      user_name:this.$store.state.user.user_name,
      myLibrary:[],
      allFavorite:[],
    }
  },
  props:[],
  methods:{
    async getLibrary(){
      const resData = await this.$axios.get(
          `https://blooming-sierra-76216.herokuapp.com/api/v1/user/${this.user_id}`
        );
      this.myLibrary = resData.data.libraries[0].libraries;
    },
    async getFavorite(){
      const resData = await this.$axios.get("https://blooming-sierra-76216.herokuapp.com/api/v1/favorite");
      this.allFavorite = resData.data.favorites;
    },
    showLibrary(id){
      this.$router.push({
        path:"/user/library",
        query:{
          library_id:id,
        }
      });
    },
  },
  filters:{
      changedate(date){
      const dt = Date.parse(date);
      var date = new Date(dt);
      return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    }

  },
  mounted(){

    //settimeoutしたほうが良い？？
    this.getLibrary();
  }
}
</script>


<style scoped>
.main{
  background: #f5f5f5;
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
    /* display: flex;
    justify-content: space-between; */
    text-align: center;
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
