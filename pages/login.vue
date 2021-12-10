<template>
  <div class="container--register">
    <form @submit.prevent="login">
      <div class="container--register__input"></div>
      <validation-observer ref="obs" v-slot="ObserverProps">

        <div class="container--register__input">
          <validation-provider v-slot="{ errors }" rules="required|email">
            <label for="email">メールアドレス</label><br>
            <input v-model="email" id="email" type="text" name="メールアドレス" class="input--text"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <div class="container--register__input">
          <validation-provider v-slot="{ errors }" rules="required">
            <label for="password">パスワード</label><br>
            <input v-model="password" id="password" type="password" name="パスワード" class="input--text"/>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <div class="container--register__button">
          <button
            type="submit"
            :disabled="ObserverProps.invalid || !ObserverProps.validated"
            class="input--button">
            ログイン
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
      email: null,
      password: null,
    };
  },
  methods: {
    async login() {
      try {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          this.$router.push('/')
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
        });
        this.$router.push("/");
      } catch {
        alert("メールアドレスまたはパスワードが間違っております");
      }
    },
  },
};
</script>
<style scoped>
  .error {
    color: red;
  }
  .container--register{
    margin: 30px auto;
    padding: 30px auto;
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
    color: #003366;
    font-weight: bold;
    cursor: pointer;
  }
  .input--button:hover{
    background: #191970;
    color: #e6e6fa;
  }

</style>
