<template>
<div class="main">
  <div class="edit--title" @click="back">
    <a>戻る</a>
  </div>

  <div class="container--search">
    <div class="container--register__input">
      <validation-provider v-slot="{ errors }" rules="required">
        <label for="libraryName">辞書名</label><br>
        <input type="text" id="libraryName" v-model="libraryName" class="input--text" name="辞書名">
        <div class="error">{{ errors[0] }}</div>
      </validation-provider>
    </div>

    <div class="container--register__input">
      <validation-provider v-slot="{ errors }" rules="required">
        <label for="libraryLanguage">言語</label><br>
        <select name="使用言語" v-model="libraryLanguage" id="libraryLanguage" class="input--select">
          <option v-bind:value="language.id" v-for="language in languageList" :key="language.id">
            {{language.name}}
          </option>
        </select><br>
        <div class="error">{{ errors[0] }}</div>
      </validation-provider>
    </div>



    <div class="container--register__input">
      <validation-provider v-slot="{ errors }" rules="required">
        <label for="libraryPermit">公開設定</label><br>

        <input v-model="libraryPermit" type="radio" name="公開設定" value="1" checked>公開
        <input v-model="libraryPermit" type="radio" name="公開設定" value="0">非公開




        <div class="error">{{ errors[0] }}</div>
      </validation-provider>
    </div>


    <div class="container--register__button">
      <button
        @click="editLibrary"
        class="input--button">
        変更
      </button>
      <button @click="deleteLibrary" class="input--button">
        削除
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return{
      library_id:this.$route.query.library_id,
      languageList:"",
      libraryName:"",
      libraryLanguage:"",
      libraryPermit:"",
    }
  },
  methods:{
    async getLibrary(){
      const resData = await this.$axios.get(`https://blooming-sierra-76216.herokuapp.com/api/v1/library/${this.library_id}`);
      this.libraryName = resData.data.library[0].name;
      this.libraryLanguage = resData.data.library[0].language_id;
      this.libraryPermit = resData.data.library[0].view_permit;
    },
    async editLibrary(){
      const sendData = {
        language_id:this.libraryLanguage,
        name:this.libraryName,
        view_permit:this.libraryPermit
      };
      await this.$axios.put(`https://blooming-sierra-76216.herokuapp.com/api/v1/library/${this.library_id}`,sendData);
      this.getLibrary();
      alert("辞書を編集しました。");
    },
    async deleteLibrary(){

      if(window.confirm("本当に削除しますか？")){
        await this.$axios.delete(`https://blooming-sierra-76216.herokuapp.com/api/v1/library/${this.library_id}`);
        alert("辞書を削除しました。");
        this.$router.push("/user/mypage");
      }
    },

    async getLanguage(){
      const resData = await this.$axios.get(
        "https://blooming-sierra-76216.herokuapp.com/api/v1/language"
      );
      this.languageList = resData.data.languages;
    },
    back(){
      this.$router.push({
        path:"/user/library",
        query:{
          library_id:this.library_id
        }
      });
    },
  },
  created(){
    this.getLanguage();
    this.getLibrary();
  }
}
</script>
<style scoped>
.main{
  background: #4169e1;
  padding-bottom: 20px;
}
.edit--title{
  font-size: 30px;
  background: #fff;
  display: inline-block;
  border-radius: 5px;
  color: #003366;
  border: #191970 solid 2px;
  margin: 20px 50px;
  padding: 10px 20px;
  cursor: pointer;
}
.edit--title:hover{
  background: #191970;
  color: #fff;
}
.edit--title--a{
  text-decoration: none;
}
.edit--title--a:hover{
  color: #fff;
}

  .table{
    border-collapse: collapse;
    width: 80%;
    margin: 20px auto;
    background: #fff;
    padding: 10px 10px;
    border-radius: 5px;
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
    width: 28%;
    text-align: center;
    font-weight: bold;
    font-size: 17px;
    padding: 11px 0;
  }
  .td{
    display: inline-block;
    width: 30%;
    height: auto;
    text-align: center;
    padding: 5px 0;
  }
  .button{
    color:red;
    display: inline-block;
    width: 30px;
    height: 15px;
    font-size: 8px;
    font-weight: bold;
    text-align: center;
    padding: 5px 3px;
    margin-top: 20px;
    cursor: pointer;
  }

  .container--search{
  margin: 10px auto;
  width: 80%;
}

  .tr--text{
    height: 50px;
    width: 100%;
    border: solid 2px #e6e6fa;
    border-radius: 5px;
  }
  .button--updata{
    background: #fff;
    border: #4169e1 solid 2px;
    border-radius: 5px;
    padding: 3px 3px;
  }
  .button--delete{
    background: #fff;
    border: #4169e1 solid 2px;
    border-radius: 5px;
    padding: 3px 3px;

  }
  .button--menu{
    display: flex;
    justify-content: space-around;
    width: 15%;
  }

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
    height: 50px;
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
    font-weight: bold;
    color: #003366;
    border: #191970 solid 2px;
    cursor: pointer;
  }
  .input--button:hover{
    background: #191970;
    color: #e6e6fa;
  }


 @media screen and (max-width: 768px) {
    .copy{
      display: none;
    }
    .button{
      margin-top:0px;
      width: 50px;
    }
    .button--menu{
      display:flex;
      flex-flow: column;
    }
    .button--updata{
    /* border: none; */
  }
  .button--delete{
    /* border: none; */
  }

 }

</style>
