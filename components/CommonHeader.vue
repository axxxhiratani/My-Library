<template>
<div class="container--menu">
  <header class="header">
    <h1 class="title">My Library</h1>
    <nav class="nav">
      <ul class="menu-group">
        <li class="menu-item">
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li class="menu-item" v-if="user">
          <NuxtLink to="/user/mypage">MyPage</NuxtLink>
        </li>
        <li class="menu-item" v-if="!user">
          <NuxtLink to="/register">Register</NuxtLink>
        </li>
        <li class="menu-item" v-if="!user">
          <NuxtLink to="/login">Login</NuxtLink>
        </li>
        <li class="menu-item" v-if="user">
          <a @click="logout">Logout</a>
        </li>
      </ul>
    </nav>
  </header>


    <nav class="nav--draw" id="nav--draw">
      <ul class="menu-group--draw">
        <li class="menu-item--draw" @click="showMenu">
          <NuxtLink class="menu-item--draw--list" to="/">Home</NuxtLink>
        </li>
        <li class="menu-item--draw" v-if="user" @click="showMenu">
          <NuxtLink class="menu-item--draw--list" to="/user/mypage">MyPage</NuxtLink>
        </li>
        <li class="menu-item--draw" v-if="!user" @click="showMenu">
          <NuxtLink class="menu-item--draw--list" to="/register">Register</NuxtLink>
        </li>
        <li class="menu-item--draw" v-if="!user" @click="showMenu">
          <NuxtLink class="menu-item--draw--list" to="/login">Login</NuxtLink>
        </li>
        <li class="menu-item--draw" v-if="user" @click="showMenu">
          <a class="menu-item--draw--list" @click="logout">Logout</a>
        </li>
      </ul>
    </nav>

    <div class="menu" id="menu" @click="showMenu">
      <span class="menu__line--top"></span>
      <span class="menu__line--middle"></span>
      <span class="menu__line--bottom"></span>
    </div>

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
  methods: {
    async logout() {
      try {
        firebase
          .auth()
          .signOut()
          .then(()=>{
            alert("ログアウトが完了しました。");
            this.$store.commit("user/logoutUser");

            this.$router.push("/login");
          });
      } catch (error) {
        console.log(error);
      }
    },
    setViewport: function() {
      let changeWindowSize = 375
      let viewportContent = "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
      if (window.innerWidth < changeWindowSize ) {
          viewportContent = "width=375,user-scalable=no,viewport-fit=cover"
      }
      document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent)
    },
    authenticationUser(){
      firebase.auth().onAuthStateChanged((user) => {
        this.user=user;
      })
    },
    showMenu(){
      const target = document.getElementById("menu");
      const nav = document.getElementById("nav--draw");
      target.classList.toggle('open');
      nav.classList.toggle('in');
    }
  },
  created(){
    this.setViewport();
    this.authenticationUser();
  }
};
</script>

<style scoped>
.container--menu{
  height: 90px;
  width: 100%;
}
header {
  display: flex;
  justify-content: space-around;
  height: 100px;
  width: 100%;
  background-color: #ff8c00;
  position: fixed;
  top: 0%;
  left: 0%;
}
.title {
  margin-right: auto;
  margin-left: 10px;
  color: #191970;
}
.menu-item {
  list-style: none;
  display: inline-block;
  padding: 10px;
}
.menu-item a {
  color: #191970;
  text-decoration: none;
  cursor: pointer;
}
.menu {
    display: none;
    width: 36px;
    height: 32px;
    cursor: pointer;
    position: fixed;
    right:5%;
    top: 40px;
  }

  .menu__line--top,
  .menu__line--middle,
  .menu__line--bottom {
    display: inline-block;
    width: 100%;
    height: 4px;
    background-color: #000;
    position: absolute;
    transition: 0.5s;
  }

  .menu__line--top {
    top: 0%;
  }

  .menu__line--middle {
    top: 14px;
  }

  .menu__line--bottom {
    bottom: 0%;
  }

  .menu.open span:nth-of-type(1) {
    top: 14px;
    transform: rotate(45deg);
  }
  .menu.open span:nth-of-type(2) {
    opacity: 0;
  }
  .menu.open span:nth-of-type(3) {
    top: 14px;
    transform: rotate(-45deg);
  }

.nav{
  display: inline-block;
  margin-right: 5px;
  font-weight: bold;
}
.menu-group{
  display: inline-block;
}
.nav--hamburger{
  display: none;
}
.nav--draw{
  position: fixed;
  height: 100%;
  width: 100%;
  left: -100%;
  background: #ff8c00;
  transition: .5s;
  text-align: center;
}
.menu-group--draw{
  padding-top: 80px;
}

.menu-item--draw{
  list-style-type: none;
  margin-top: 50px;
  text-decoration: none;
}
.menu-item--draw--list{
  text-decoration: none;
  font-weight: bold;
  color: #191970;

}
.in{
  transform: translateX(100%);
}
  @media screen and (max-width: 768px) {
    .nav{
      display: none;
    }
    .menu{
      display: inline-block;
    }
  }

</style>
