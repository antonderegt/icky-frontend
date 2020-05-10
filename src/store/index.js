import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index.js";
import login from "@/gateways/auth.js";
import api from "@/gateways/api.js";
import axios from "axios";

Vue.use(Vuex);

function checkCookieName(name) {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  else return null;
}

function removeCookie(sKey, sPath, sDomain) {
  document.cookie =
    encodeURIComponent(sKey) +
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
    (sDomain ? "; domain=" + sDomain : "") +
    (sPath ? "; path=" + sPath : "");
}

export default new Vuex.Store({
  state: {
    status: "",
    token: checkCookieName("Token") || "",
    user: {},
    problem: {},
    problemList: []
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    get_problem_list_success(state, problems) {
      state.status = "success";
      state.problemList = problems;
    },
    get_problem_success(state, problem) {
      state.status = "success";
      state.problem = problem;
    },
    add_category(state, category) {
      state.status = "success";
      state.problem.categories.push(category);
    },
    change_problem_name(state, newName) {
      state.status = "success";
      state.problem.problem = newName;
    },
    change_category_name(state, catPk, newName) {
      state.status = "success";
      state.problem.categories.filter(cat => {
        if (cat.pk === catPk) cat.category = newName;
      });
    },
    delete_category(state, catPk) {
      state.status = "success";
      state.problem.categories.filter(cat => {
        if (cat.pk !== catPk) return cat;
      });
    },
    change_item_name(state, catPk, itemPk, newName) {
      state.status = "success";
      state.problem.categories.filter(cat => {
        if (cat.pk === catPk) {
          cat.items.filter(item => {
            if (item.pk === itemPk) item.item = newName;
          });
        }
      });
    },
    add_item(state, catPk, newItem) {
      state.status = "success";
      state.problem.categories.filter(cat => {
        if (cat.pk === catPk) cat.items.push(newItem);
      });
    },
    delete_item(state, catPk, itemPk) {
      state.status = "success";
      state.problem.categories.filter(cat => {
        if (cat.pk === catPk) {
          cat.items.filter(item => {
            if (item.pk !== itemPk) return item;
          });
        }
      });
    },
    api_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        if (user.password.length > 0 && user.username.length > 0) {
          login
            .post({
              username: user.username,
              password: user.password
            })
            .then(res => {
              const token = res.token;
              // const user = res.user;

              // SET COOKIE:
              let d = new Date();
              d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
              let expires = "expires=" + d.toUTCString();
              document.cookie = "Token=" + token + ";" + expires + ";path=/";

              axios.defaults.headers.common["Authorization"] = "Token " + token;

              // CHECK COOKIE:
              const tokenCookie = checkCookieName("Token");
              if (tokenCookie == null) {
                commit("auth_error");
                removeCookie("Token");
                reject("FAILED COOKIE");
              }

              commit("auth_success", token, user);
              resolve(res);
            })
            .catch(error => {
              commit("auth_error");
              removeCookie("Token");
              reject(error);
            });
        } else {
          commit("auth_error");
          reject("Wrong data entered");
        }
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        router.push("/login");
        commit("logout");
        removeCookie("Token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    getProblems({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("/")
          .then(res => {
            commit("get_problem_list_success", res.data);
            resolve(res.data);
          })
          .catch(error => {
            commit("api_error");
            reject(error);
          });
      });
    },
    getProblem({ commit }, pk) {
      return new Promise((resolve, reject) => {
        api
          .get(`/getall/${pk}`)
          .then(res => {
            commit("get_problem_success", res);
            resolve(res);
          })
          .catch(error => {
            commit("api_error");
            reject(error);
          });
      });
    },
    addCategory({ commit }, pk) {
      return new Promise((resolve, reject) => {
        api
          .put(`/${pk}/new`, {
            category: "New category"
          })
          .then(res => {
            commit("add_category", res);
            resolve();
          })
          .catch(error => {
            commit("api_error");
            reject(error);
          });
      });
    },
    changeProblemName({ commit }, updatedProblem) {
      return new Promise((resolve, reject) => {
        api
          .put(`/${updatedProblem.pk}`, {
            problem: updatedProblem.problem
          })
          .then(() => {
            commit("change_problem_name", updatedProblem.problem);
            resolve();
          })
          .catch(error => {
            commit("api_error");
            reject(error);
          });
      });
    },
    changeCategoryName({ commit }, updatedCategory) {
      return new Promise((resolve, reject) => {
        api
          .put(`/${updatedCategory.problemPk}/${updatedCategory.catPk}`, {
            category: updatedCategory.category
          })
          .then(() => {
            commit("change_category_name", updatedCategory.category);
            resolve();
          })
          .catch(error => {
            commit("api_error");
            reject(error);
          });
      });
    },
    deleteCategory({ commit }, toBeDeletedCategory) {
      return new Promise((resolve, reject) => {
        api
          .delete(
            `/${toBeDeletedCategory.problemPk}/${toBeDeletedCategory.catPk}`
          )
          .then(() => {
            commit("delete_category", toBeDeletedCategory.catPk);
            resolve();
          })
          .catch(error => {
            commit("api_error");
            reject(error);
          });
      });
    },
    changeItemName({ commit }, updatedItem) {
      return new Promise((resolve, reject) => {
        api
          .put(
            `/${updatedItem.problemPk}/${updatedItem.catPk}/${updatedItem.itemPk}`,
            {
              item: updatedItem.item
            }
          )
          .then(() => {
            commit(
              "change_item_name",
              updatedItem.catPk,
              updatedItem.itemPk,
              updatedItem.item
            );
            resolve();
          })
          .catch(error => {
            commit("api_error");
            reject(error);
          });
      });
    },
    addItem({ commit }, newItem) {
      return new Promise((resolve, reject) => {
        api
          .put(`/${newItem.problemPk}/${newItem.catPk}/new`, {
            item: newItem.item
          })
          .then(res => {
            commit("add_item", newItem.catPk, res);
            resolve(res);
          })
          .catch(error => {
            commit("api_error");
            reject(error);
          });
      });
    },
    deleteItem({ commit }, item) {
      return new Promise((resolve, reject) => {
        api
          .delete(`/${item.problemPk}/${item.catPk}/${item.itemPk}`)
          .then(() => {
            commit("delete_item", item.catPk, item.itemPk);
            resolve();
          })
          .catch(error => {
            commit("api_error");
            reject(error);
          });
      });
    }
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!state.token,
    tokenCookie: state => state.token,
    authStatus: state => state.status,
    problem: state => state.problem,
    problemList: state => state.problemList
  }
});
