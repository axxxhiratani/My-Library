<template>
  <div class="container--store">
    <form @submit.prevent="storelibrary">
      <div class="container--store__input"></div>
        <div class="container--store__input">
          <validation-provider v-slot="{ errors }" rules="required">
            <label for="name">辞書名</label><br>
            <input v-model="name" id="name" type="text" name="辞書名" class="input--text"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <div class="container--store__input">
          <validation-provider v-slot="{ errors }" rules="required">
            <label for="language_id">使用言語</label><br>
            <select name="使用言語" v-model="language_id" id="language_id" class="input--select">
              <option v-bind:value="language.id" v-for="language in languageList" :key="language.id">
                {{language.name}}
              </option>
            </select><br>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>


        <div class="container--store__input">
          <validation-provider v-slot="{ errors }" rules="required">
            <label for="view_permit">公開設定</label><br>
            <input v-model="view_permit" type="radio" name="view_permit" value="1" checked>公開
            <input v-model="view_permit" type="radio" name="view_permit" value="0">非公開
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>



        <div class="container--store__button">
          <button
            type="submit"
            class="input--button">
            作成
          </button>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_id:this.$store.state.user.user_id,
      user_name:this.$store.state.user.user_name,
      language_id:"",
      name:"",
      view_permit:0,
      languageList:[],
    }
  },
  props:[],
  methods:{

    async storelibrary(){
      if(this.name === "" || this.language_id === "" || this.view_permit === ""){
        alert("入力漏れがあります。");
        return;
      }
      $('.input--button').css('display','none');
      const sendData = {
        user_id:this.user_id,
        language_id:this.language_id,
        name:this.name,
        view_permit:Number(this.view_permit)
      };
      console.log(sendData);
      await this.$axios.post("https://blooming-sierra-76216.herokuapp.com/api/v1/library",sendData);
      $('.input--button').css('display','inline-block');
      this.$router.push("/user/mypage");

    },
    async getLanguage(){
      const resData = await this.$axios.get(
        "https://blooming-sierra-76216.herokuapp.com/api/v1/language"
      );
      console.log(resData);
      this.languageList = resData.data.languages;
    },
  },
  created(){
    this.getLanguage();
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
    display: inline-block;
  }
.input--button:hover{
  background: #191970;
  color: #e6e6fa;
}


</style>


