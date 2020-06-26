import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/article/:id",
    name: "article",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "article" */ "../views/article/Article.vue")
  },
  {
    path: "/articleCreate",
    name: "articleCreate",
    component: () =>
      import(/* webpackChunkName: "articleCreate" */ "../views/newArticle/ArticleCreate.vue")
  },
  {
    path: "/mb",
    name: "mb",
    component: () =>
      import(/* webpackChunkName: "mb" */ "../views/home/MbHome.vue")
  },
  {
    path: "/mb/login",
    name: "mbLogin",
    component: () =>
      import(/* webpackChunkName: "mbLogin" */ "../components/MbLoginPage.vue")
  },
  {
    path: "/mb/article/:id",
    name: "mbArticle",
    component: () =>
      import(/* webpackChunkName: "mbArticle" */ "../views/article/MbArticle.vue")
  },
  {
    path: "/mb/articleCreate",
    name: "MbArticleCreate",
    component: () =>
      import(/* webpackChunkName: "MbArticleCreate" */ "../views/newArticle/MbArticleCreate.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;