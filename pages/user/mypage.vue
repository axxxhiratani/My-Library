<template>
  <div>
    <MyLibraries v-bind:user_id="user"/>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data(){
    return{
      user:null,
    }
  },
  methods:{
    async authenticationUser(){
      await firebase.auth().onAuthStateChanged((user) => {
        this.user=this.getUserId(user.uid);
      })
    },
    async getUserId(uid){
      const sendData = {
        uuid:uid,
      };
      console.log("api");
      console.log(sendData);
      const resData = await this.$axios.get("https://blooming-sierra-76216.herokuapp.com/api/v1/investigate/userid",
      {
        params:sendData
      });
      this.user = resData.data.user[0].id;
    },
  },
  created(){
    this.authenticationUser();
    this.getUserId(this.user);
  }
}
</script>
