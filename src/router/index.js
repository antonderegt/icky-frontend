import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: {
      guest: true
    }
  },
  {
    path: "/problem/:problemPk",
    name: "Problem",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Problem.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

function getCookie(name) {
  var match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  if (match) {
    return match[2];
  } else {
    return null;
  }
};

router.beforeEach((to, from, next) => {
  console.log("from: " + from.fullPath);
  console.log("to: " + to.fullPath);
  console.log("next: " + next.fullPath);
  const tokenCookie = getCookie("Token");
  if(to.matched.some(record => record.meta.requiresAuth)) {
    console.log("reqAuth");
    if(tokenCookie == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next();
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(tokenCookie == null) {
      next();
    } else {
      next();
    }
  } else {
    next()
  }
});



export default router;
