<template>
  <div class="container--library">
    <div class="box--library" v-for="library in myLibrary" :key="library.id">
      <a @click="showLibrary(library.library_id.id)">
        <img v-bind:src="library.library_id.language_id.image" alt="">
        <p class="container--library--name">{{library.library_id.name}}</p>
        <p class="container--library--text">使用言語：{{library.library_id.language_id.name}}</p>
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

      const sendData={
        user_id:this.user_id,
      };
      const resData = await this.$axios.get(
          `https://blooming-sierra-76216.herokuapp.com/api/v1/investigate/favoritelist`,
          {
            params:sendData
          }
        );

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

  },
  filters:{
      changedate(date){
        const dt = Date.parse(date);
        return dt;
    }

  },
  mounted(){
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
    height: 200px;
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
