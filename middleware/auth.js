import firebase from '../plugins/firebase'
export default function ({ route, redirect, store }) {
  const flg = route.fullPath.match("/user");
  if (flg !== null) {
    if(!store.state.user.user_id){
      try {
        firebase
          .auth()
          .signOut()
          .then(()=>{
            alert("エラー：ログアウトしました。");
            store.commit("user/logoutUser");
            redirect("/login");
          });
      } catch (error) {
      console.log(error);
      }
    }
  }
}
