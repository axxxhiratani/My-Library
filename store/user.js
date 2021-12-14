export const state = () => ({
  user:null,
  user_id: null,
  user_name:null,
});

export const mutations = {
  loginUser(state, user) {
    state.user = user;
    state.user_id = user.id;
    state.user_name = user.name;
    },
  logoutUser(state) {
    state.user = null;
    state.user_id = null;
    state.user_name = null;
    },
}
