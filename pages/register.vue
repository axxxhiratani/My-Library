<template>
  <div class="container--register">
    <form @submit.prevent="register">
      <validation-observer ref="obs" v-slot="ObserverProps">
        <div class="container--register__input">
        <validation-provider v-slot="{ errors }" rules="required|min:4|alpha">
          <label for="name">ユーザー名</label><br>
          <input v-model="name" id="name" type="text" name="ユーザー名" class="input--text"/>
          <div class="error">{{ errors[0] }}</div>
        </validation-provider>
        </div>

        <div class="container--register__input">
          <validation-provider v-slot="{ errors }" rules="required">
            <label for="work_id">職業</label><br>
            <select  v-model="work_id" id="work_id" name="職業" class="input--select">
            <option v-bind:value="work.id" v-for="work in workList" :key="work.id">
              {{work.name}}
            </option>
            </select>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <div class="container--register__input">
          <validation-provider v-slot="{ errors }" rules="required">
            <label for="language_id">得意言語</label><br>
            <select name="得意言語" v-model="language_id" id="language_id" class="input--select">
              <option v-bind:value="language.id" v-for="language in languageList" :key="language.id">
                {{language.name}}
              </option>
            </select><br>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <div class="container--register__input">
          <validation-provider v-slot="{ errors }" rules="required|email">
            <label for="email">メールアドレス</label><br>
            <input v-model="email" id="メールアドレス" type="email" name="メールアドレス" class="input--text"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <div class="container--register__input">
          <validation-provider v-slot="{ errors }" vid="passwordConfirm" rules="required|min:8|alpha_dash">
            <label for="password">パスワード</label><br>
            <input
              v-model="password"
              id="password"
              type="password"
              name="パスワード"
              class="input--text"
            />
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <div class="container--register__input">
          <validation-provider v-slot="{ errors }" rules="confirmed:passwordConfirm">
            <label for="passwordConfirm">パスワード（確認）</label><br>
            <input
              v-model="passwordConfirm"
              id="passwordConfirm"
              type="password"
              name="確認パスワード"
              class="input--text"
            />
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <div class="container--register__input">
          <validation-provider v-slot="{ errors }" rules="required|min:4">
            <label for="introduction">一言</label><br>
            <input v-model="introduction" id="introduction" type="text" name="一言" class="input--text"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <div class="container--register__button">
          <button
            type="submit"
            :disabled="ObserverProps.invalid || !ObserverProps.validated"
            class="input--button"
          >
            登録
          </button>
        </div>
      </validation-observer>
    </form>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  auth: false,
  data() {
    return {
      name: null,
      email: null,
      password: null,
      user_id:null,
      uuid:null,
      work_id:null,
      language_id:null,
      introduction:null,
      workList:[],
      languageList:[],
    };
  },
  methods: {
    async register() {
      try {

        firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            this.uuid = data.user.uid;
            this.insertUserDatabase();
            this.$router.replace('/')
          })
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        });
      } catch {
        alert("エラーが発生しました");
      }
    },
    async insertUserDatabase(){
      try{
        await this.$axios.post("https://blooming-sierra-76216.herokuapp.com/api/v1/user",{
          name:this.name,
          uuid:this.uuid,
          work_id:this.work_id,
          language_id:this.language_id,
          introduction:this.introduction,
        });
        alert("登録が完了しました");
        this.$router.push("/");

      }catch{
        alert("メールアドレスがすでに登録されています");
      }
    },
    async getWork(){
      const resData = await this.$axios.get(
        "https://blooming-sierra-76216.herokuapp.com/api/v1/work"
      );
      console.log(resData);
      this.workList = resData.data.works;
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
    this.getWork();
    this.getLanguage();
  }
};
</script>

<style scoped>
  .error {
    color: red;
  }
  .container--register{
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
  .container--register__input{
    margin: 30px auto;
    padding: 0 10%  0 10%;
    font-weight: bold;
  }
  .container--register__button{
    margin: 30px auto;
    font-weight: bold;
    text-align: center;
  }
  .input--button{
    background: #fff;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    border: #191970 solid 2px;
    font-weight: bold;
    cursor: pointer;
  }
.input--button:hover{
  background: #191970;
  color: #e6e6fa;
}


</style>
