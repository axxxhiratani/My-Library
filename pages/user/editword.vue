<template>
<div class="main">

  <div class="loader-wrap">
    <div class="loader">Loading...</div>
  </div>

  <div class="edit--title" @click="back" @reset.prevent="onReset">
    <a>戻る</a>
  </div>

  <div class="container--search">
    <form name="form" @submit.prevent="addWord" @reset.prevent="onReset">


      <div class="container--register__input">
        <validation-provider v-slot="{ errors }" ref="obs" rules="required|max:191">
          <label for="wordName">単語</label><br>
          <textarea wrap="hard" row="5" v-model="wordName" id="wordName" type="text" name="単語" class="input--text"></textarea>
          <div class="error">{{ errors[0] }}</div>
        </validation-provider>
      </div>

      <div class="container--register__input">
        <validation-provider v-slot="{ errors }" ref="obsmore" rules="required|max:191">
          <label for="wordMean">意味</label><br>
          <textarea wrap="hard" row="5" v-model="wordMean" id="wordMean" type="text" name="意味" class="input--text"></textarea>
          <div class="error">{{ errors[0] }}</div>
        </validation-provider>
      </div>



      <div class="container--register__input">
        <validation-provider v-slot="{ errors }" rules="max:191">
          <label for="wordNote">備考</label><br>
          <textarea wrap="hard" row="5" v-model="wordNote" id="wordNote" type="text" name="備考" class="input--text"></textarea>
          <div class="error">{{ errors[0] }}</div>
        </validation-provider>
      </div>


      <div class="container--register__button">
        <button
          type="submit"
          class="input--button">
          追加
        </button>
      </div>



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
          <textarea wrap="hard" row="5" v-model="word.name" v-bind:id="word.id" class="tr--text"></textarea>
        </div>
        <div class="td">
          <textarea wrap="hard" row="5" v-model="word.meaning" class="tr--text"></textarea>
          </div>
        <div class="td">
          <textarea wrap="hard" row="5" v-model="word.note" class="tr--text"></textarea>
        </div>
        <div class="button--menu">
          <div class="button">
            <a @click="updateWord(word.id,word.name,word.meaning,word.note)" class="button--updata">更新</a>
          </div>
          <div class="button">
            <a @click="deleteWord(word.id)" class="button--delete">消去</a>
          </div>
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
      wordName:"",
      wordMean:"",
      wordNote:"",
    }
  },
  methods:{
    async getLibrary(){
      const resData = await this.$axios.get(`https://blooming-sierra-76216.herokuapp.com/api/v1/library/${this.library_id}`);
      this.library_name = resData.data.words[0].name;
      this.words=resData.data.words[0].words;
      this.load();
    },
    async addWord(){
      if(this.wordName === "" || this.wordMean === ""){
        alert("入力漏れがあります。");
        return;
      }
      var loader = $('.loader-wrap');
      loader.fadeIn();
      if(this.wordNote === ""){
        this.wordNote = "-";
      }
      const sendData = {
        library_id:this.library_id,
        name:this.wordName,
        meaning:this.wordMean,
        note:this.wordNote,
      };
      await this.$axios.post("https://blooming-sierra-76216.herokuapp.com/api/v1/word",sendData);
      this.getLibrary();
      document.form.reset();
      loader.fadeOut();
    },
    async updateWord(id,name,meaning,note){
      if(window.confirm("変更を更新しますか？")){
        const sendData = {
          library_id:this.library_id,
          name:name,
          meaning:meaning,
          note:note,
        };
        await this.$axios.put("https://blooming-sierra-76216.herokuapp.com/api/v1/word/" + id,sendData);
        this.getLibrary();
        alert("変更を更新しました。");
      }

    },
    async deleteWord(id){

      if(window.confirm("消去しますか？")){
        await this.$axios.delete("https://blooming-sierra-76216.herokuapp.com/api/v1/word/" + id);
        alert("単語を消去しました。");
        this.getLibrary();
      }
    },
    copyWord(id){
      var copyTarget = document.getElementById(id);
      copyTarget.select();
      document.execCommand("Copy");
      alert("Copied: " + copyTarget.value);
    },
    editWord(){
      this.$router.push({
        path:"",
        query:{
        }
      });
    },
    onReset() {
      this.wordName = '';
      this.wordMean = '';
      this.wordNote = '';
      console.log("reset");
      this.$refs.obs.reset();
      this.$refs.obsmore.reset();
    },

    back(){
      this.$router.push({
        path:"/user/library",
        query:{
          library_id:this.library_id
        }
      });
    },

    load(){
      var loader = $('.loader-wrap');
      loader.fadeOut();
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
    width: 90%;
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
    display: inline-block;
  }
  .input--button:hover{
    background: #191970;
    color: #e6e6fa;
  }

/*▼▼ ここから追加する ▼▼*/
.loader-wrap {
	position: fixed;
	display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #fff;
  left: 0%;
  top: 0%;
}
/*▲▲ ここまで追加する ▲▲*/

.loader,
.loader:before,
.loader:after {
	background: #ff8c00;
	-webkit-animation: load1 1s infinite ease-in-out;
	animation: load1 1s infinite ease-in-out;
	width: 1em;
	height: 4em;
}
.loader {
	color: #ff8c00;
	text-indent: -9999em;
	margin: 88px auto;
	position: relative;
	font-size: 11px;
	-webkit-transform: translateZ(0);
	-ms-transform: translateZ(0);
	transform: translateZ(0);
	-webkit-animation-delay: -0.16s;
	animation-delay: -0.16s;
}
.loader:before,
.loader:after {
	position: absolute;
	top: 0;
	content: '';
}
.loader:before {
	left: -1.5em;
	-webkit-animation-delay: -0.32s;
	animation-delay: -0.32s;
}
.loader:after {
	left: 1.5em;
}
@-webkit-keyframes load1 {
	0%,
	80%,
	100% {
		box-shadow: 0 0;
		height: 4em;
	}
	40% {
		box-shadow: 0 -2em;
		height: 5em;
	}
}
@keyframes load1 {
	0%,
	80%,
	100% {
		box-shadow: 0 0;
		height: 4em;
	}
	40% {
		box-shadow: 0 -2em;
		height: 5em;
	}
}
  @media screen and (max-width: 768px) {
    .box--library{
      width: 90%;
    }
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
