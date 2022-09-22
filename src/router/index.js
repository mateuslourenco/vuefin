import app from "../../firebase.config";
import { createRouter, createMemoryHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresLogin: true,
      icon: "home",
      title: "Home",
    },
  },
  {
    path: "/lista-gastos",
    name: "lista-gastos",
    component: () =>
      import(
        /* webpackChunkName: "lista-gastos" */ "../views/lista-gastos/ListaGastosView.vue"
      ),
    meta: {
      requiresLogin: true,
      icon: "list-ul",
      title: "Lista Gastos",
    },
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/LoginView.vue"),
    meta: {
      requiresLogin: false,
      title: "Login",
    },
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

//Global navigation guard called before entering each and every one of the routes. Used to guard routes where login/especial permission are needed.
router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title} - VueFin`;
  const requiresLogin = to.matched.some((record) => record.meta.requiresLogin); //Return either true or false if this route needs login or not.
  if (requiresLogin && !(await app.getCurrentUser())) {
    //Check if current route requires login and there isn't a user logged in using firebase.auth.js function.
    next("/login"); //Pushes navigation to login page again.
  } else {
    next(); //Let user proceed with their navigation.
  }
});

export default router;
