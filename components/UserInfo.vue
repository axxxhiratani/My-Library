<template>
  <div class="container--store">
    <form @submit.prevent="updataUser">
      <div class="container--store__input"></div>
      <validation-observer ref="obs" v-slot="ObserverProps">

        <div class="container--store__input">
          <validation-provider v-slot="{ errors }" rules="required">
            <label for="user_name">name</label><br>
            <input v-model="user_name" id="user_name" type="text" name="辞書名" class="input--text"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <div class="container--store__input">
          <validation-provider v-slot="{ errors }" rules="required">
            <label for="user_work">職業</label><br>
            <select name="使用言語" v-model="user_work" id="user_work" class="input--select">
              <option v-bind:value="work.id" v-for="work in workList" :key="work.id">
                {{work.name}}
              </option>
            </select><br>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>



        <div class="container--store__input">
          <validation-provider v-slot="{ errors }" rules="required">
            <label for="user_language">得意言語</label><br>
            <select name="使用言語" v-model="user_language" id="user_language" class="input--select">
              <option v-bind:value="language.id" v-for="language in languageList" :key="language.id">
                {{language.name}}
              </option>
            </select><br>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>


        <div class="container--store__input">
          <validation-provider v-slot="{ errors }" rules="required">
            <label for="user_introduction">一言</label><br>
            <input v-model="user_introduction" id="user_introduction" type="text" name="辞書名" class="input--text"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>



        <div class="container--store__button">
          <button
            type="submit"
            class="input--button">
            変更
          </button>
        </div>
      </validation-observer>
    </form>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      user_id:this.$store.state.user.user_id,
      language_id:"",
      name:"",
      view_permit:"",
      languageList:[],
      workList:[],

      user_name:"",
      user_work:"",
      user_language:"",
      user_introduction:"",

    }
  },
  props:[],
  methods:{

    async updataUser(){
      const sendData = {
        name:this.user_name,
        work_id:this.user_work,
        language_id:this.user_language,
        introduction:this.user_introduction,
      };
      await this.$axios.put(`https://blooming-sierra-76216.herokuapp.com/api/v1/user/${this.user_id}`,sendData);
        try {
          firebase
            .auth()
            .signOut()
            .then(()=>{
              alert("変更が完了しました,再度ログインしてください。");
              this.$store.commit("user/logoutUser");
              this.$router.push("/login");
            });
        } catch (error) {
        console.log(error);
      }

    },
    async getUser(){
      const resData = await this.$axios.get(
        `https://blooming-sierra-76216.herokuapp.com/api/v1/user/${this.user_id}`
      );
      this.user_name = resData.data.user[0].name;
      this.user_work = resData.data.user[0].work_id;
      this.user_language = resData.data.user[0].language_id;
      this.user_introduction = resData.data.user[0].introduction;
    },

    async getLanguage(){
      const resData = await this.$axios.get(
        "https://blooming-sierra-76216.herokuapp.com/api/v1/language"
      );
      this.languageList = resData.data.languages;
    },

    async getWork(){
      const resData = await this.$axios.get(
        "https://blooming-sierra-76216.herokuapp.com/api/v1/work"
      );
      this.workList = resData.data.works;
    },
  },
  created(){
    this.getUser();
    this.getLanguage();
    this.getWork();
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
}
  .error {
    color: red;
  }
  .container--store{
    margin: 30px auto;
    padding: 30px 10px;
    width: 80%;
    background: #f0f8ff;
    border-radius: 5px;
    border: #e6e6fa solid 3px;
  }
  .input--text{
    width: 100%;
    height: 20px;
    margin: 10px auto;
    border-radius: 5px;
    border: solid 2px #e6e6fa;
  }
  .input--select{
    width: 40%;
    height: 20px;
    margin: 10px auto;
    border-radius: 5px;
    border: solid 2px #e6e6fa;
  }
  .container--store__input{
    margin: 30px auto;
    padding: 0 10%  0 10%;
    font-weight: bold;
  }
  .container--store__button{
    margin: 30px auto;
    font-weight: bold;
    text-align: center;
  }
  .input--button{
    background: #fff;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    color: #003366;
    border: #191970 2px solid;
    font-weight: bold;
    cursor: pointer;
  }
.input--button:hover{
  background: #191970;
  color: #e6e6fa;
}


</style>


